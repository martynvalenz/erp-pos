import { useLocale } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { toast } from "@/components/ui/toast";

interface BeforeInstallPromptEvent extends Event {
  /**
   * An array of string items containing the platforms on which the event was dispatched.
   * This is provided for user agents that want to present a choice of versions to the user.
   */
  readonly platforms: Array<string>;

  /**
   * Returns a Promise that resolves to an object describing the user's choice.
   */
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;

  /**
   * Shows the prompt inviting the user to install the PWA.
   * This method can only be called once.
   */
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }

  interface Navigator {
    standalone?: boolean;
  }
}

export type InstallPromptStatus =
  | "checking"
  | "ready"
  | "installing"
  | "installed"
  | "unavailable";

const isRunningAsInstalledApp = () => {
  if (typeof window === "undefined") {
    return false;
  }

  const displayModes = ["standalone", "fullscreen", "minimal-ui"];

  return (
    displayModes.some(
      (mode) => window.matchMedia(`(display-mode: ${mode})`).matches,
    ) ||
    navigator.standalone === true ||
    document.referrer.startsWith("android-app://")
  );
};

export function useInstallPrompt() {
  const [promptEvent, setPromptEvent] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [status, setStatus] = useState<InstallPromptStatus>("checking");
  const lang = useLocale();

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setPromptEvent(e);
      setStatus("ready");
    };

    const installedHandler = () => {
      setPromptEvent(null);
      setIsInstalled(true);
      setStatus("installed");
    };

    const displayModeHandler = () => {
      if (isRunningAsInstalledApp()) {
        installedHandler();
      }
    };

    if (isRunningAsInstalledApp()) {
      installedHandler();
    } else {
      // `beforeinstallprompt` is not available in every browser. The event
      // listener below can still move this state to `ready` if it arrives
      // after the initial effect runs.
      setStatus("unavailable");
    }

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", installedHandler);

    const displayModeQueries = [
      "(display-mode: standalone)",
      "(display-mode: fullscreen)",
      "(display-mode: minimal-ui)",
    ].map((mode) => window.matchMedia(mode));

    for (const query of displayModeQueries) {
      query.addEventListener("change", displayModeHandler);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);

      for (const query of displayModeQueries) {
        query.removeEventListener("change", displayModeHandler);
      }
    };
  }, []);

  const promptToInstall = useCallback(async () => {
    if (!promptEvent) {
      toast.add({
        type: "info",
        title:
          lang === "es"
            ? "La instalación no está disponible en este momento"
            : "Installation is not available right now",
      });
      return false;
    }

    setStatus("installing");

    try {
      await promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;

      if (outcome === "accepted") {
        // The browser has accepted the install request. `appinstalled` and
        // display-mode changes below provide the final confirmation when
        // the browser emits them.
        setIsInstalled(true);
        setStatus("installed");
        toast.add({
          type: "success",
          title:
            lang === "es"
              ? "Aplicación instalada correctamente"
              : "App installed successfully",
        });
      } else {
        setStatus("unavailable");
        toast.add({
          type: "info",
          title:
            lang === "es" ? "Aplicación no instalada" : "App not installed",
        });
      }

      return outcome === "accepted";
    } catch {
      setStatus("ready");
      toast.add({
        type: "error",
        title:
          lang === "es"
            ? "No se pudo iniciar la instalación"
            : "Could not start the installation",
      });
      return false;
    } finally {
      // The prompt event can only be used once.
      setPromptEvent(null);
    }
  }, [promptEvent, lang]);

  return {
    status,
    isReady: status === "ready" && !!promptEvent,
    isInstalling: status === "installing",
    isInstalled,
    isInstallable: status === "ready" && !!promptEvent,
    promptToInstall,
  };
}
