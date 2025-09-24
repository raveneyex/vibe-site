import data from "@/data.json";
import useDevProfile from "@/hooks/useDevProfile";
import type { CSSProperties } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProCardSVG, MagickCardSVG, TattooCardSVG } from "./SectionIcons";
import { NavCardVariant, NavDeckContent, type HoverCard } from "./types";
import useBackgroundTintOnHover from "@/hooks/useBackgroundTintOnHover";
import useTypewriter from "@/hooks/useTypewriter";
import NavCard from "./NavCard";
import clsx from "clsx";

const navDeckContent = data.navDeck as NavDeckContent;

const { dev: devCard, magick: magickCard, tattoo: tattooCard, subtitle: subtitleContent } = navDeckContent;

const hoverTitles: Record<Exclude<HoverCard, null>, string> = {
  dev: devCard.hoverTitle,
  magick: magickCard.hoverTitle,
  tattoo: tattooCard.hoverTitle
};

export default function NavDeck() {
  const nav = useNavigate();
  const { devOnly } = useDevProfile();

  const [hoverCard, setHoverCard] = useState<HoverCard>(null);
  
  const hoverTarget = hoverCard ? hoverTitles[hoverCard] : hoverTitles['dev'];
  const { text: titleText, announce } = useTypewriter({
    defaultText: hoverTitles['dev'],
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
            ariaLabel={`Enter ${devCard.title}`}
            text={devCard.title}
            subtitle={devCard.subtitle}
            cta={devCard.cta}
          />
          {!devOnly && (
            <NavCard
              onClick={() => nav('/magickal')}
              onMouseEnter={() => setHoverCard('magick')}
              onMouseLeave={() => setHoverCard(null)}
              variant={NavCardVariant.Purple}
              logo={<MagickCardSVG />}
              className={clsx('text-left hover:neon-glow-purple transition-shadow focus:outline-none focus-visible:focus-outline')}
              ariaLabel={`Enter ${magickCard.title}`}
              text={magickCard.title}
              subtitle={magickCard.subtitle}
              cta={magickCard.cta}
            />
          )}
          {!devOnly && (
            <NavCard
              onClick={() => nav('/tattoo')}
              onMouseEnter={() => setHoverCard('tattoo')}
              onMouseLeave={() => setHoverCard(null)}
              variant={NavCardVariant.Magenta}
              logo={<TattooCardSVG />}
              className={clsx('text-left hover:neon-glow-magenta transition-shadow focus:outline-none focus-visible:focus-outline')}
              ariaLabel={`Enter ${tattooCard.title}`}
              text={tattooCard.title}
              subtitle={tattooCard.subtitle}
              cta={tattooCard.cta}
            />
          )}
        </div>
      </div>
      <p className="sr-only">
        Select a portal card: {devOnly ? devCard.title : `${devCard.title}, ${magickCard.title}, or ${tattooCard.title}`}
      </p>
    </section>
  );
}
