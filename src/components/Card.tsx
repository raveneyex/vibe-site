import HudFrame from './HudFrame';

type Props = {
  title: string;
  children: React.ReactNode;
  cta?: { label: string; href: string };
  accent?: 'cyan' | 'magenta' | 'purple';
};

export default function Card({ title, children, cta, accent = 'cyan' }: Props) {
  const glow = accent === 'cyan' ? 'hover:neon-glow-cyan' : accent === 'magenta' ? 'hover:neon-glow-magenta' : 'hover:neon-glow-purple';
  const btn =
    accent === 'cyan'
      ? 'text-noir-900 bg-neon-cyan/90 hover:bg-neon-cyan'
      : accent === 'magenta'
      ? 'text-white bg-neon-magenta/90 hover:bg-neon-magenta'
      : 'text-white bg-[#a855f7]/90 hover:bg-[#a855f7]';
  return (
    <HudFrame accent={accent} className={`p-5 transition-shadow ${glow}`}>
      <h3 className="text-lg font-semibold mb-2 tracking-wide">{title}</h3>
      <div className="text-sm text-slate-300 mb-4">{children}</div>
      {cta && (
        <a
          href={cta.href}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md font-medium text-sm transition-colors focus:outline-none focus-visible:focus-outline ${btn}`}
        >
          {cta.label}
          <span aria-hidden>→</span>
        </a>
      )}
    </HudFrame>
  );
}
