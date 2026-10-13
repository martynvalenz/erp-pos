import { useCallback, useEffect, useState } from 'react';

/**
 * Hook to detect a new service worker version and prompt the user to reload.
 */
export const usePwaUpdate = () => {
  const [newVersionWaiting, setNewVersionWaiting] = useState(false);
  const [waitingWorker, setWaitingWorker] =
    useState<ServiceWorker | null>(null);

  const reloadPage = useCallback(() => {
    // Send a message to the waiting Service Worker to tell it to activate immediately.
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    }

    // Listen for the Service Worker to fully activate before reloading the page.
    // This is often handled implicitly by `skipWaiting`, but it's safer to ensure a reload.
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }, [waitingWorker]);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !('serviceWorker' in navigator)
    ) {
      return;
    }

    // A registration object may already exist if the worker was registered previously
    navigator.serviceWorker
      .getRegistration()
      .then((initialRegistration) => {
        // 1. Initial check on load
        if (initialRegistration?.waiting) {
          setNewVersionWaiting(true);
          setWaitingWorker(initialRegistration.waiting);
          return;
        }

        // 2. Listen for new Service Workers being installed
        const onUpdateFound = (
          registration: ServiceWorkerRegistration,
        ) => {
          const newWorker = registration.installing;
          if (newWorker) {
            // Listen for the state change of the installing worker
            newWorker.onstatechange = () => {
              if (
                newWorker.state === 'installed' &&
                navigator.serviceWorker.controller
              ) {
                // A new worker is installed and waiting to activate, meaning an update is available
                setNewVersionWaiting(true);
                setWaitingWorker(newWorker);
              }
            };
          }
        };

        // Ensure we listen for updates on the existing or newly registered worker
        navigator.serviceWorker.addEventListener(
          'updatefound',
          (event) => {
            onUpdateFound(event.target as ServiceWorkerRegistration);
          },
        );
      });
  }, []);

  return { newVersionWaiting, reloadPage, isIisInstallable: true };
};
