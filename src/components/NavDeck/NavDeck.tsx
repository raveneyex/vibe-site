import useDevProfile from "@/hooks/useDevProfile";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProCardSVG, MagickCardSVG, TattooCardSVG } from "./SectionIcons";
import type { HoverCard } from "./types";
import useBackgroundTintOnHover from "@/hooks/useBackgroundTintOnHover";
import useTypewriter from "@/hooks/useTypewriter";
import NavCard, { NavCardVariant } from "./NavCard";

const getHoverCardTitle = (h: HoverCard) => (h === 'mag' ? 'Raveneyex' : h === 'tat' ? 'Ojo de Cuervo' : 'Andres Ossa');

export default function NavDeck() {
  const nav = useNavigate();

  const [hoverCard, setHoverCard] = useState<HoverCard>(null);
  
  const { devOnly } = useDevProfile();
  const { text: titleText, announce } = useTypewriter({ 
    defaultText: 'Andres Ossa', 
    target: hoverCard ? getHoverCardTitle(hoverCard) : null 
  });

  useBackgroundTintOnHover(hoverCard);
  

  return (
    <section
      className="relative flex flex-col items-center gap-10"
    >
      <h1 className="text-2xl sm:text-3xl font-mono text-center text-slate-200 cursor-blink rgb-split">
        {titleText}
      </h1>
      <span className="sr-only" aria-live="polite" role="status">{announce}</span>
      {(() => {
        const subtitle = devOnly ? 'Front-End Developer' : 'Front-End Developer & Magickal Tattoo Artist';
        type CSSVars = React.CSSProperties & Record<'--chars' | '--chars-ch', string | number>;
        const vars: CSSVars = { '--chars': subtitle.length, '--chars-ch': `calc(${subtitle.length} * 1ch)` };
        return (
          <p className="-mt-6 text-sm sm:text-base text-slate-300 text-center">
            <span className="typewriter typewriter-animate font-mono" style={vars}>
              {subtitle}
            </span>
          </p>
        );
      })()}
      <div
        className="relative w-full"
      >
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 place-items-stretch">
          <NavCard
            onClick={() => nav(devOnly ? '/dev?from=professionalProfile' : '/dev')}
            onMouseEnter={() => setHoverCard('dev')}
            onMouseLeave={() => setHoverCard(null)}
            variant={NavCardVariant.Cyan}
            logo={<ProCardSVG />}
            className={`text-left hover:neon-glow-cyan transition-shadow focus:outline-none focus-visible:focus-outline ${devOnly ? 'sm:col-start-2' : ''}`}
            ariaLabel="Enter Dev"
            text="Dev Work"
            subtitle="Frontend development, javascript, user interfaces, and systems design."
            cta="Explore ▸"
          />
          {!devOnly && (
            <NavCard
              onClick={() => nav('/magickal')}
              onMouseEnter={() => setHoverCard('mag')}
              onMouseLeave={() => setHoverCard(null)}
              variant={NavCardVariant.Purple}
              logo={<MagickCardSVG />}
              className="text-left hover:neon-glow-purple transition-shadow focus:outline-none focus-visible:focus-outline"
              ariaLabel="Enter Magickal"
              text="Magick"
              subtitle="Sigils, rituals, and esoteric explorations"
              cta="Enter ▸"
            />
          )}
          {!devOnly && (
            <NavCard
              onClick={() => nav('/tattoo')}
              onMouseEnter={() => setHoverCard('tat')}
              onMouseLeave={() => setHoverCard(null)}
              variant={NavCardVariant.Magenta}
              logo={<TattooCardSVG />}
              className="text-left hover:neon-glow-magenta transition-shadow focus:outline-none focus-visible:focus-outline"
              ariaLabel="Enter Tattoo"
              text="Tattoos"
              subtitle="Custom blackwork tattoos"
              cta="Discover ▸"
            />
          )}
        </div>
      </div>
      <p className="sr-only">Select a portal card: {devOnly ? 'Dev' : 'Dev, Magickal, or Tattoo'}</p>
    </section>
  );
}