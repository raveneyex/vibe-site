import type { LanguageCode } from '@/utils/language';

export type HoverCard = null | 'dev' | 'magick' | 'tattoo';

export enum NavCardVariant {
  Cyan = 'cyan',
  Purple = 'purple',
  Magenta = 'magenta'
}

export type NavDeckCard = {
  title: string;
  subtitle: string;
  cta: string;
  hoverTitle: string;
};

export type NavDeckSubtitle = {
  default: string;
  devOnly: string;
};

export type NavDeckContent = Record<'dev' | 'magick' | 'tattoo', NavDeckCard> & {
  subtitle: NavDeckSubtitle;
};

export type NavDeckTranslations = Record<LanguageCode, NavDeckContent>;

