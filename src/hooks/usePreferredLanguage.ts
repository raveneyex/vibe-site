import { useEffect, useState } from 'react';
import {
  LANGUAGE_CHANGE_EVENT,
  LANGUAGE_KEY,
  type LanguageCode,
  getStoredLanguage,
} from '@/utils/language';

export default function usePreferredLanguage(defaultLanguage: LanguageCode = 'en') {
  const [language, setLanguage] = useState<LanguageCode>(() => getStoredLanguage() ?? defaultLanguage);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleLanguage = (event: Event) => {
      const { detail } = event as CustomEvent<LanguageCode | undefined>;
      if (!detail) return;
      setLanguage(detail);
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key && event.key === LANGUAGE_KEY) {
        const next = getStoredLanguage();
        if (next) {
          setLanguage(next);
        }
      }
    };

    window.addEventListener(LANGUAGE_CHANGE_EVENT, handleLanguage);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener(LANGUAGE_CHANGE_EVENT, handleLanguage);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return language;
}
