import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import HudFrame from '@/components/HudFrame';
import { ProCardSVG, MagickCardSVG, TattooCardSVG } from '@/components/SectionIcons';

// Images moved to components/HeroImages

export default function Landing() {
  const nav = useNavigate();
  const reduce = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [bootDone, setBootDone] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [titleText, setTitleText] = useState('Andres Ossa');

  useEffect(() => {
    const skip = () => {
      sessionStorage.setItem('booted', '1');
      setBootDone(true);
    };
    if (sessionStorage.getItem('booted') || reduce) {
      setBootDone(true);
      return;
    }
    const hex = (n: number) => n.toString(16).padStart(4, '0');
    const devId = hex(Math.floor(Math.random() * 0xffff));
    const mac = Array.from({ length: 6 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join(':');
    const kb = 8192 + Math.floor(Math.random() * 8192);
    const sigilCount = 8 + Math.floor(Math.random() * 16);
    const msgs = [
      '> booting up...',
      '> bios v0.8 — raveneyex',
      `> device id: 0x${devId}`,
      '> checking memory...',
      `> memory: ${kb} kb ok`,
      '> probing buses: isa ok, pci ok',
      '> dma: enabled',
      `> net: disabled (mac ${mac})`,
      '> init video: crt/mono ok',
      '> init input: ps/2 ok',
      '> scanning modules...',
      '> setting up tattoo equipment...',
      '> sterilizing: autoclave cycle ok',
      '> needles: sterile packs verified',
      '> inks: black/grey set loaded',
      '> machine: coil calibration ok',
      '> power supply: stable 6.5v',
      '> stencil: transfer gel ready',
      '> loading magick systems...',
      '> grimoire: loaded',
      `> sigils: compiled (${sigilCount})`,
      '> circle: charged',
      '> intent: bound',
      '> wards: enabled',
      '> banishing: protocol armed',
      '> modules: ui, router, sigils, hud ok',
      '> filesystem: mounted / (ro)',
      '> entropy: seeded',
      '> ready',
      '> press any key to enter',
    ];
    let i = 0;
    const interval = setInterval(() => {
      setBootLines((prev) => [...prev, msgs[i]]);
      i += 1;
      if (i >= msgs.length) {
        clearInterval(interval);
        setTimeout(() => {
          sessionStorage.setItem('booted', '1');
          setBootDone(true);
        }, 500);
      }
    }, 300);
    const onKey = () => skip();
    const onClick = () => skip();
    window.addEventListener('keydown', onKey);
    window.addEventListener('click', onClick);
    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('click', onClick);
    };
  }, [reduce]);

  // Animated CLI typing/erasing for the title
  useEffect(() => {
    const phrases = ['Andres Ossa', 'Raveneyex', 'Ojo de Cuervo'];
    if (reduce) {
      setTitleText(phrases[0]);
      return;
    }
    let current = 0;
    let pos = 0;
    let phase: 'typing' | 'pause' | 'erasing' = 'typing';
    let timer: number | undefined;
    const TYPE = 80;
    const ERASE = 50;
    const PAUSE = 2300;
    const schedule = (ms: number) => {
      if (timer) clearTimeout(timer);
      timer = window.setTimeout(run, ms);
    };
    const run = () => {
      const full = phrases[current];
      if (phase === 'typing') {
        if (pos < full.length) {
          pos += 1;
          setTitleText(full.slice(0, pos));
          schedule(TYPE);
        } else {
          phase = 'pause';
          schedule(PAUSE);
        }
      } else if (phase === 'erasing') {
        if (pos > 0) {
          pos -= 1;
          setTitleText(full.slice(0, pos));
          schedule(ERASE);
        } else {
          current = (current + 1) % phrases.length;
          phase = 'typing';
          schedule(TYPE);
        }
      } else {
        // pause complete -> start erasing
        phase = 'erasing';
        schedule(ERASE);
      }
    };
    schedule(400);
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [reduce]);

  useEffect(() => {
    if (reduce) return;
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / r.width;
      const dy = (e.clientY - cy) / r.height;
      el.style.setProperty('--parallax-x', `${dx * 6}deg`);
      el.style.setProperty('--parallax-y', `${-dy * 6}deg`);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduce]);

  // Hover state removed; PortalTile handles hover/focus UI internally

  if (!bootDone) {
    return (
      <section className="fixed inset-0 z-50 grid place-items-center bg-noir-900/98">
        <div className="font-mono text-[#00ffa3] text-sm sm:text-base leading-relaxed w-[min(90vw,40rem)] glass glass-border-cyan p-6">
          {bootLines.map((l, idx) => (
            <div key={idx} className="whitespace-pre">
              {l}
            </div>
          ))}
          {bootLines.length === 0 && <div>&gt; BOOTING...</div>}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col items-center gap-10"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <h1 className="text-2xl sm:text-3xl font-mono text-center text-slate-200 cursor-blink rgb-split" aria-live="polite">
        {titleText}
      </h1>
      {(() => {
        const subtitle = 'Front-End Developer & Magickal Tattoo Artist';
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
          perspective: reduce ? undefined : '800px',
          transform: reduce ? undefined : 'rotateY(var(--parallax-x, 0)) rotateX(var(--parallax-y, 0))',
        }}
      >
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 place-items-stretch">
          <button
            type="button"
            onClick={() => nav('/professional')}
            className="text-left hover:neon-glow-cyan transition-shadow focus:outline-none focus-visible:focus-outline"
            aria-label="Enter Professional"
          >
            <HudFrame accent="cyan" className="p-5 h-full flex flex-col items-stretch justify-between glass-border-cyan-pure">
              <div className="text-slate-300">
                <div className="w-full mb-3 text-neon-cyan/90" aria-hidden="true"><ProCardSVG /></div>
                <h3 className="text-lg font-semibold tracking-wide mb-1">Professional</h3>
                <p className="text-sm">Frontend development, design systems, and performance.</p>
              </div>
              <div className="mt-4 text-xs font-mono text-neon-cyan">[ Explore ▸ ]</div>
            </HudFrame>
          </button>
          <button
            type="button"
            onClick={() => nav('/magickal')}
            className="text-left hover:neon-glow-purple transition-shadow focus:outline-none focus-visible:focus-outline"
            aria-label="Enter Magickal"
          >
            <HudFrame accent="purple" className="p-5 h-full flex flex-col items-stretch justify-between glass-border-purple">
              <div className="text-slate-300">
                <div className="w-full mb-3 text-neon-purple/90" aria-hidden="true"><MagickCardSVG /></div>
                <h3 className="text-lg font-semibold tracking-wide mb-1 neon-text-purple">Magickal</h3>
                <p className="text-sm">Sigils, ritual diagrams, and esoteric explorations.</p>
              </div>
              <div className="mt-4 text-xs font-mono text-neon-purple">[ Enter ▸ ]</div>
            </HudFrame>
          </button>
          <button
            type="button"
            onClick={() => nav('/tattoo')}
            className="text-left hover:neon-glow-magenta transition-shadow focus:outline-none focus-visible:focus-outline"
            aria-label="Enter Tattoo"
          >
            <HudFrame accent="magenta" className="p-5 h-full flex flex-col items-stretch justify-between glass-border-magenta">
              <div className="text-slate-300">
                <div className="w-full mb-3 text-neon-magenta/90" aria-hidden="true"><TattooCardSVG /></div>
                <h3 className="text-lg font-semibold tracking-wide mb-1 neon-text-magenta">Tattoo</h3>
                <p className="text-sm">Custom sigil tattoos and experimental flash sets.</p>
              </div>
              <div className="mt-4 text-xs font-mono text-neon-magenta">[ Discover ▸ ]</div>
            </HudFrame>
          </button>
        </div>
      </div>
      <p className="sr-only">Select a portal card: Professional, Magickal, or Tattoo</p>
    </section>
  );
}
