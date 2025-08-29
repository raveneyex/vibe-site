import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import PortalTile from '@/components/PortalTile';

function ProSVG() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" y="0" width="400" height="400" fill="none" />
      <g stroke="#2de2e6" strokeOpacity="0.85" strokeWidth="1.2">
        {Array.from({ length: 10 }).map((_, i) => (
          <path key={i} d={`M ${40 + i*30} 40 L ${380 - i*18} 60 L ${360 - i*16} ${340 - i*18} L 40 ${360 - i*12} Z`} fill="none" />
        ))}
        <circle cx="200" cy="200" r="110" fill="none" />
        <circle cx="200" cy="200" r="70" fill="none" />
        <circle cx="200" cy="200" r="35" fill="none" />
      </g>
      <g stroke="#00ffa3" strokeOpacity="0.5">
        {Array.from({ length: 16 }).map((_, i) => (
          <line key={i} x1="200" y1="200" x2={200 + 110*Math.cos((i*Math.PI)/8)} y2={200 + 110*Math.sin((i*Math.PI)/8)} />
        ))}
      </g>
    </svg>
  );
}

function MagickSVG() {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <g fill="none" stroke="#ff2a6d" strokeWidth="1.4" filter="url(#glow)">
        <path d="M110 310c40-130 90-210 90-210s50 80 90 210c-20-15-43-25-90-25s-70 10-90 25z" />
        <circle cx="200" cy="120" r="18" />
        <path d="M160 230c10-12 28-20 40-20s30 8 40 20" />
        <path d="M140 270c20-18 40-18 60-18s40 0 60 18" />
        <path d="M200 100 v-25" />
        <path d="M190 90 h20" />
      </g>
      <g fill="#ff2a6d" fillOpacity="0.08"><circle cx="200" cy="120" r="12"/></g>
    </svg>
  );
}

export default function Landing() {
  const nav = useNavigate();
  const reduce = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [bootDone, setBootDone] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);

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
      <h1 className="text-2xl sm:text-3xl font-mono text-center text-slate-200 cursor-blink rgb-split">
        Andres Ossa
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
        className="relative grid place-items-center w-full"
        style={{
          perspective: reduce ? undefined : '800px',
          transform: reduce ? undefined : 'rotateY(var(--parallax-x, 0)) rotateX(var(--parallax-y, 0))',
        }}
      >
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
          <div className={`transition-transform`}>
            <PortalTile side="left" onClick={() => nav('/professional')} label="Enter Professional">
              <ProSVG />
            </PortalTile>
          </div>
          <div className={`transition-transform`}>
            <PortalTile side="right" onClick={() => nav('/magickal')} label="Enter Magickal">
              <MagickSVG />
            </PortalTile>
          </div>
        </div>
      </div>
      <p className="sr-only">Select a portal: Professional or Magickal</p>
    </section>
  );
}
