export const LANGUAGE_KEY = 'preferredLanguage';
export const LANGUAGE_CHANGE_EVENT = 'preferredLanguageChange';

export type LanguageCode = 'en' | 'es';

export const LANGUAGE_LABEL: Record<LanguageCode, string> = {
  en: 'english',
  es: 'español',
};

export function getStoredLanguage(): LanguageCode | null {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem(LANGUAGE_KEY);
  return stored === 'en' || stored === 'es' ? stored : null;
}

export function setStoredLanguage(value: LanguageCode) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(LANGUAGE_KEY, value);
  window.dispatchEvent(new CustomEvent<LanguageCode>(LANGUAGE_CHANGE_EVENT, { detail: value }));
}

export const LANGUAGE_OPTIONS: Array<{ code: LanguageCode; label: string }> = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
];
