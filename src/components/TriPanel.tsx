import React from 'react';

type TriProps = {
  left: { label: string; onClick?: () => void; children: React.ReactNode };
  rightTop: { label: string; onClick?: () => void; children: React.ReactNode };
  bottom: { label: string; onClick?: () => void; children: React.ReactNode };
  className?: string;
};

// A rectangular panel divided into 3 triangles via CSS clip-path.
// Triangles: left (A-D-P), right-top (P-B-C), bottom wedge (P-D-C) where P is ~45% along top edge.
export default function TriPanel({ left, rightTop, bottom, className = '' }: TriProps) {
  return (
    <div
      className={`relative isolate w-[min(48rem,95vw)] h-[min(28rem,60vw)] rounded-2xl overflow-hidden glass ${className}`}
      style={{ background: 'rgba(15,17,21,0.4)' }}
      aria-label="section selector"
    >
      {/* background glows */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(40%_60%_at_35%_45%,rgba(45,226,230,0.35),transparent_60%)]" aria-hidden="true" />
        <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(40%_60%_at_70%_30%,rgba(255,42,109,0.35),transparent_60%)]" aria-hidden="true" />
        <div className="absolute inset-0 pointer-events-none opacity-15 bg-[radial-gradient(60%_40%_at_60%_85%,rgba(0,255,163,0.35),transparent_60%)]" aria-hidden="true" />
      </div>

      {/* Left triangle */}
      <button
        type="button"
        aria-label={left.label}
        onClick={left.onClick}
        className="group absolute inset-0 focus:outline-none focus-visible:focus-outline transition-transform"
        style={{
          clipPath: 'polygon(0% 0%, 0% 100%, 45% 0%)',
        }}
      >
        <div className="absolute inset-0 mix-blend-screen text-neon-cyan opacity-80 pointer-events-none" aria-hidden="true">
          {left.children}
        </div>
        <span className="absolute top-2 left-2 font-mono text-xs px-2 py-1 rounded bg-noir-900/70 border border-white/10 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity text-neon-cyan">
          [ {left.label} ]
        </span>
      </button>

      {/* Right-top triangle */}
      <button
        type="button"
        aria-label={rightTop.label}
        onClick={rightTop.onClick}
        className="group absolute inset-0 focus:outline-none focus-visible:focus-outline transition-transform"
        style={{
          clipPath: 'polygon(45% 0%, 100% 0%, 100% 100%)',
        }}
      >
        <div className="absolute inset-0 mix-blend-screen text-neon-magenta opacity-80 pointer-events-none" aria-hidden="true">
          {rightTop.children}
        </div>
        <span className="absolute top-2 right-2 font-mono text-xs px-2 py-1 rounded bg-noir-900/70 border border-white/10 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity text-neon-magenta">
          [ {rightTop.label} ]
        </span>
      </button>

      {/* Bottom wedge triangle */}
      <button
        type="button"
        aria-label={bottom.label}
        onClick={bottom.onClick}
        className="group absolute inset-0 focus:outline-none focus-visible:focus-outline transition-transform"
        style={{
          clipPath: 'polygon(45% 0%, 0% 100%, 100% 100%)',
        }}
      >
        <div className="absolute inset-0 mix-blend-screen text-[rgba(0,255,163,1)] opacity-80 pointer-events-none" aria-hidden="true">
          {bottom.children}
        </div>
        <span className="absolute bottom-2 right-1/2 translate-x-1/2 font-mono text-xs px-2 py-1 rounded bg-noir-900/70 border border-white/10 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity text-[rgba(0,255,163,1)]">
          [ {bottom.label} ]
        </span>
      </button>
    </div>
  );
}

