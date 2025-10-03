import data from '@/data.json';
import useDevProfile from '@/hooks/useDevProfile';
import usePreferredLanguage from '@/hooks/usePreferredLanguage';
import useLabels from '@/hooks/useLabels';
import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProCardSVG, MagickCardSVG, TattooCardSVG } from './SectionIcons';
import { NavCardVariant, type NavDeckTranslations, type NavDeckContent, type HoverCard } from './types';
import useBackgroundTintOnHover from '@/hooks/useBackgroundTintOnHover';
import useTypewriter from '@/hooks/useTypewriter';
import NavCard from './NavCard';
import clsx from 'clsx';
import formatTemplate from '@/utils/formatTemplate';
import type { LanguageCode } from '@/utils/language';

function formatOptionsList(options: string[], language: LanguageCode) {
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

export default function NavDeck() {
  const nav = useNavigate();
  const { devOnly } = useDevProfile();
  const language = usePreferredLanguage();
  const labels = useLabels();
  const translations = data.navDeck.translations as NavDeckTranslations;
  const navDeckContent: NavDeckContent = translations[language] ?? translations.en;
  const { dev: devCard, magick: magickCard, tattoo: tattooCard, subtitle: subtitleContent } = navDeckContent;
  const navLabels = labels.navDeck;

  const hoverTitles = useMemo<Record<Exclude<HoverCard, null>, string>>(() => ({
    dev: devCard.hoverTitle,
    magick: magickCard.hoverTitle,
    tattoo: tattooCard.hoverTitle,
  }), [devCard.hoverTitle, magickCard.hoverTitle, tattooCard.hoverTitle]);

  const [hoverCard, setHoverCard] = useState<HoverCard>(null);
  
  const hoverTarget = hoverCard ? hoverTitles[hoverCard] : hoverTitles.dev;
  const { text: titleText, announce } = useTypewriter({
    defaultText: hoverTitles.dev,
    target: hoverTarget
  });

  useBackgroundTintOnHover(hoverCard);

  const deckSubtitle = devOnly ? subtitleContent.devOnly : subtitleContent.default;

  return (
    <section className="relative flex flex-col items-center gap-10">
      <h1 className="text-2xl sm:text-3xl font-mono text-center text-slate-200 cursor-blink rgb-split">
        {titleText}
      </h1>
      <span className="sr-only" aria-live="polite" role="status">{announce}</span>
      {(() => {
        type CSSVars = CSSProperties & Record<'--chars' | '--chars-ch', string | number>;
        const vars: CSSVars = { '--chars': deckSubtitle.length, '--chars-ch': `calc(${deckSubtitle.length} * 1ch)` };
        return (
          <p className="-mt-6 text-sm sm:text-base text-slate-300 text-center">
            <span className="typewriter typewriter-animate font-mono" style={vars}>
              {deckSubtitle}
            </span>
          </p>
        );
      })()}
      <div className="relative w-full">
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 place-items-stretch">
          <NavCard
            onClick={() => nav(devOnly ? '/dev?from=professionalProfile' : '/dev')}
            onMouseEnter={() => setHoverCard('dev')}
            onMouseLeave={() => setHoverCard(null)}
            variant={NavCardVariant.Cyan}
            logo={<ProCardSVG />}
            className={clsx(
              'text-left hover:neon-glow-cyan transition-shadow focus:outline-none focus-visible:focus-outline',
              devOnly && 'sm:col-start-2'
            )}
            ariaLabel={formatTemplate(navLabels.ariaEnter, { title: devCard.title })}
            text={devCard.title}
            subtitle={devCard.subtitle}
            cta={devCard.cta}
          />
          {!devOnly && (
            <NavCard
              onClick={() => nav('/tattoo')}
              onMouseEnter={() => setHoverCard('tattoo')}
              onMouseLeave={() => setHoverCard(null)}
              variant={NavCardVariant.Magenta}
              logo={<TattooCardSVG />}
              className={clsx('text-left hover:neon-glow-magenta transition-shadow focus:outline-none focus-visible:focus-outline')}
              ariaLabel={formatTemplate(navLabels.ariaEnter, { title: tattooCard.title })}
              text={tattooCard.title}
              subtitle={tattooCard.subtitle}
              cta={tattooCard.cta}
            />
          )}
          {!devOnly && (
            <NavCard
              onClick={() => nav('/magick')}
              onMouseEnter={() => setHoverCard('magick')}
              onMouseLeave={() => setHoverCard(null)}
              variant={NavCardVariant.Purple}
              logo={<MagickCardSVG />}
              className={clsx('text-left hover:neon-glow-purple transition-shadow focus:outline-none focus-visible:focus-outline')}
              ariaLabel={formatTemplate(navLabels.ariaEnter, { title: magickCard.title })}
              text={magickCard.title}
              subtitle={magickCard.subtitle}
              cta={magickCard.cta}
            />
          )}
          
        </div>
      </div>
      <p className="sr-only">
        {(() => {
          const options = devOnly ? [devCard.title] : [devCard.title, magickCard.title, tattooCard.title];
          const optionsText = formatOptionsList(options, language);
          return formatTemplate(navLabels.srSelect, { options: optionsText });
        })()}
      </p>
    </section>
  );
}
