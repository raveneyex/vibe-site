import { useMemo } from 'react';
import labels from '@/labels.json';
import type { LanguageCode } from '@/utils/language';
import usePreferredLanguage from './usePreferredLanguage';

type LabelCatalog = typeof labels;
type Labels = LabelCatalog[keyof LabelCatalog];

const FALLBACK_LANGUAGE: LanguageCode = 'en';

export default function useLabels() {
  const language = usePreferredLanguage();

  return useMemo(() => {
    const catalog = labels as Record<LanguageCode, Labels>;
    return catalog[language] ?? catalog[FALLBACK_LANGUAGE];
  }, [language]);
}

export type { Labels };
