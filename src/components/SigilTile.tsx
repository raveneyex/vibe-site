type Props = {
  label: string;
};

export default function SigilTile({ label }: Props) {
  return (
    <div className="hud hud-magenta group relative w-24 h-24 rounded-lg glass glass-border-magenta grid place-items-center hover:neon-glow-magenta transition-shadow scan-sweep" role="img" aria-label={label}>
      <span aria-hidden className="corner tl" />
      <span aria-hidden className="corner tr" />
      <span aria-hidden className="corner bl" />
      <span aria-hidden className="corner br" />
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-neon-magenta/90"
        aria-hidden
      >
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
        <path d="M10 30L24 8l14 22" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 28h16l-8 12-8-12Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">[{label}]</span>
    </div>
  );
}
