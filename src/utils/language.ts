export const LANGUAGE_KEY = 'preferredLanguage';
export const LANGUAGE_CHANGE_EVENT = 'preferredLanguageChange';

export type LanguageCode = 'en' | 'es';

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

export function formatOptionsList(options: string[], language: LanguageCode) {
  if (options.length <= 1) {
    return options[0] ?? '';
  }

  const conjunction = language === 'es' ? 'o' : 'or';

  if (options.length === 2) {
    return `${options[0]} ${conjunction} ${options[1]}`;
  }

  const head = options.slice(0, -1).join(', ');
  const tail = options[options.length - 1];
  return `${head}, ${conjunction} ${tail}`;
}