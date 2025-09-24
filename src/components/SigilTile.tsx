import clsx from 'clsx';

type Props = {
  label: string;
  accent?: 'cyan' | 'magenta' | 'purple';
  className?: string;
  size?: number;
};

export default function SigilTile({ label, accent = 'magenta', className, size = 1 }: Props) {
  const hudClass = accent === 'cyan' ? 'hud-cyan' : accent === 'magenta' ? 'hud-magenta' : 'hud-purple';
  const borderClass = accent === 'cyan' ? 'glass-border-cyan' : accent === 'magenta' ? 'glass-border-magenta' : 'glass-border-purple';
  const glowClass = accent === 'cyan' ? 'hover:neon-glow-cyan' : accent === 'magenta' ? 'hover:neon-glow-magenta' : 'hover:neon-glow-purple';
  const textClass = accent === 'cyan' ? 'text-neon-cyan/90' : accent === 'magenta' ? 'text-neon-magenta/90' : 'text-neon-purple/90';
  const dimension = 96 * size;
  const svgDimension = 48 * size;
  return (
    <div
      className={clsx(
        'hud group relative w-24 h-24 rounded-lg glass grid place-items-center transition-shadow scan-sweep',
        hudClass,
        borderClass,
        glowClass,
        className
      )}
      style={size !== 1 ? { width: `${dimension}px`, height: `${dimension}px` } : undefined}
      role="img"
      aria-label={label}
    >
      <span aria-hidden="true" className="corner tl" />
      <span aria-hidden="true" className="corner tr" />
      <span aria-hidden="true" className="corner bl" />
      <span aria-hidden="true" className="corner br" />
      <svg
        width={svgDimension}
        height={svgDimension}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={textClass}
        aria-hidden="true"
      >
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
        <path d="M10 30L24 8l14 22" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 28h16l-8 12-8-12Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">[{label}]</span>
    </div>
  );
}
