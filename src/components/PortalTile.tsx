import React from 'react';

type Props = {
  side: 'left' | 'right';
  label: string;
  onClick: () => void;
  children: React.ReactNode;
};

export default function PortalTile({ side, label, onClick, children }: Props) {
  const cyan = side === 'left';
  const accentHud = cyan ? 'hud-cyan' : 'hud-magenta';
  const border = cyan ? 'glass-border-cyan' : 'glass-border-magenta';
  const neonText = cyan ? 'neon-text-cyan text-neon-cyan' : 'neon-text-magenta text-neon-magenta';
  return (
    <button
      onClick={onClick}
      className={
        `group hud ${accentHud} relative isolate w-[min(34rem,90vw)] h-[min(22rem,60vw)] rounded-2xl overflow-hidden ` +
        `transition-all duration-300 ease-snappy will-change-transform focus:outline-none focus-visible:focus-outline scan-sweep glass ${border} ` +
        `hover:scale-[1.03] hover:${cyan ? 'neon-glow-cyan' : 'neon-glow-magenta'}`
      }
      aria-label={label}
    >
      <span aria-hidden="true" className="corner tl" />
      <span aria-hidden="true" className="corner tr" />
      <span aria-hidden="true" className="corner bl" />
      <span aria-hidden="true" className="corner br" />
      <div
        className={
          'absolute inset-0 opacity-80 mix-blend-screen pointer-events-none ' +
          (cyan ? 'text-neon-cyan' : 'text-neon-magenta')
        }
        aria-hidden="true"
      >
        {children}
      </div>
      <div className="absolute inset-0" aria-hidden="true">
        <div className={'absolute inset-0 blur-2xl opacity-40 ' + (cyan ? 'bg-neon-cyan/40' : 'bg-neon-magenta/40')} />
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent" />
        <div className="absolute -inset-24 rotate-12 opacity-10 bg-[radial-gradient(30%_60%_at_50%_50%,white,transparent)]" />
      </div>
      <span
        className={
          `absolute bottom-3 left-3 font-mono text-sm tracking-wide px-2 py-1 rounded bg-noir-900/70 border border-white/10 ` +
          `backdrop-blur transition-opacity opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 ${neonText}`
        }
      >
        [ {label} <span aria-hidden>▸</span> ]
      </span>
    </button>
  );
}

