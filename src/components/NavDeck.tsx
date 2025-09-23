import useDevProfile from "@/hooks/useDevProfile";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HudFrame from "./HudFrame";
import { ProCardSVG, MagickCardSVG, TattooCardSVG } from "./SectionIcons";
import useNavDeckTypewriter from "@/hooks/useNavDeckTypewriter";
import type { HoverCard } from "./NavDeck/types";
import useBackgroundTintOnHover from "@/hooks/useBackgroundTintOnHover";

export default function NavDeck() {
  const nav = useNavigate();

  const [hoverCard, setHoverCard] = useState<HoverCard>(null);
  const { devOnly } = useDevProfile();

  const { titleText, announce } = useNavDeckTypewriter(hoverCard);
  useBackgroundTintOnHover(hoverCard);
  

  return (
    <section
      className="relative flex flex-col items-center gap-10"
      style={{ transformStyle: 'preserve-3d' }}
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
        style={{
          perspective: '800px',
          transform: 'rotateY(var(--parallax-x, 0)) rotateX(var(--parallax-y, 0))',
        }}
      >
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 place-items-stretch">
          <button
            type="button"
            onClick={() => nav(devOnly ? '/dev?from=professionalProfile' : '/dev')}
            onMouseEnter={() => setHoverCard('dev')}
            onMouseLeave={() => setHoverCard(null)}
            onFocus={() => setHoverCard('dev')}
            onBlur={() => setHoverCard(null)}
            className={`text-left hover:neon-glow-cyan transition-shadow focus:outline-none focus-visible:focus-outline ${devOnly ? 'sm:col-start-2' : ''}`}
            aria-label="Enter Dev"
          >
            <HudFrame accent="cyan" className="p-5 h-full flex flex-col items-stretch justify-between glass-border-cyan-pure">
              <div className="text-slate-300">
                <div className="w-full mb-3 text-neon-cyan/90" aria-hidden="true"><ProCardSVG /></div>
                <h3 className="text-lg font-semibold tracking-wide mb-1 neon-text-cyan">Dev Work</h3>
                <p className="text-sm text-neon-cyan">Frontend development, javascript, user interfaces, and systems design.</p>
              </div>
              <div className="mt-4 text-xs font-mono text-neon-cyan">[ Explore ▸ ]</div>
            </HudFrame>
          </button>
          {!devOnly && (
            <button
              type="button"
              onClick={() => nav('/magickal')}
              onMouseEnter={() => setHoverCard('mag')}
              onMouseLeave={() => setHoverCard(null)}
              onFocus={() => setHoverCard('mag')}
              onBlur={() => setHoverCard(null)}
              className="text-left hover:neon-glow-purple transition-shadow focus:outline-none focus-visible:focus-outline"
              aria-label="Enter Magickal"
            >
              <HudFrame accent="purple" className="p-5 h-full flex flex-col items-stretch justify-between glass-border-purple">
                <div className="text-slate-300">
                  <div className="w-full mb-3 text-neon-purple/90" aria-hidden="true"><MagickCardSVG /></div>
                  <h3 className="text-lg font-semibold tracking-wide mb-1 neon-text-purple">Magickal</h3>
                  <p className="text-sm text-neon-purple">Sigils, ritual diagrams, and esoteric explorations.</p>
                </div>
                <div className="mt-4 text-xs font-mono text-neon-purple">[ Enter ▸ ]</div>
              </HudFrame>
            </button>
          )}
          {!devOnly && (
            <button
              type="button"
              onClick={() => nav('/tattoo')}
              onMouseEnter={() => setHoverCard('tat')}
              onMouseLeave={() => setHoverCard(null)}
              onFocus={() => setHoverCard('tat')}
              onBlur={() => setHoverCard(null)}
              className="text-left hover:neon-glow-magenta transition-shadow focus:outline-none focus-visible:focus-outline"
              aria-label="Enter Tattoo"
            >
              <HudFrame accent="magenta" className="p-5 h-full flex flex-col items-stretch justify-between glass-border-magenta">
                <div className="text-slate-300">
                  <div className="w-full mb-3 text-neon-magenta/90" aria-hidden="true"><TattooCardSVG /></div>
                  <h3 className="text-lg font-semibold tracking-wide mb-1 neon-text-magenta">Tattoo</h3>
                  <p className="text-sm text-neon-magenta">Custom sigil tattoos and experimental flash sets.</p>
                </div>
                <div className="mt-4 text-xs font-mono text-neon-magenta">[ Discover ▸ ]</div>
              </HudFrame>
            </button>
          )}
        </div>
      </div>
      <p className="sr-only">Select a portal card: {devOnly ? 'Dev' : 'Dev, Magickal, or Tattoo'}</p>
    </section>
  );
}