import type { Locale } from '@/i18n/config';
import { setUserLocale } from '@/services/locale';
import { startTransition } from 'react';
import useOverlay from './useOverlay';
import { useRouter } from 'next/navigation';

export const useLanguageChange = () => {
  const { setOverlayOpen: setOpenLangLoader, setMessage } =
    useOverlay();
  const router = useRouter();

  const onLangChange = (value: Locale) => {
    setUserLocale(value);
    setOpenLangLoader(true);
    setMessage(
      value === 'es' ? 'Cambiando idioma...' : 'Changing language...',
    );
    startTransition(() => {
      setTimeout(() => {
        setUserLocale(value as 'en' | 'es');
        setOpenLangLoader(false);
        router.refresh();
      }, 1200);
    });
  };

  return {
    onLangChange,
  };
};
