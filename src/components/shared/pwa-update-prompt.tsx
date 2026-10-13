"use client";

import { Button } from "@/components/ui/button";
import { usePwaUpdate } from "@/hooks/usePwaUpdate";
import { useLocale } from "next-intl";

export const PwaUpdatePrompt = () => {
  const lang = useLocale();
  const { newVersionWaiting, reloadPage } = usePwaUpdate();

  if (!newVersionWaiting) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 w-64 rounded-lg p-4 shadow-lg flex flex-col gap-2">
      <p className="font-bold">
        {lang === "es"
          ? "Hay una actualización disponible"
          : "There is an update available"}
      </p>
      <Button onClick={reloadPage}>
        {lang === "es" ? "Actualizar" : "Update"}
      </Button>
    </div>
  );
};
