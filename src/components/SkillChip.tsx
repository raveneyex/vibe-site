import clsx from 'clsx';

type Props = { label: string; accent?: 'cyan' | 'magenta' | 'purple' };

export default function SkillChip({ label, accent = 'cyan' }: Props) {
  const border = accent === 'cyan' ? 'border-neon-cyan/40' : accent === 'magenta' ? 'border-neon-magenta/40' : 'border-neon-purple/40';
  const glow = accent === 'cyan' ? 'hover:neon-glow-cyan' : accent === 'magenta' ? 'hover:neon-glow-magenta' : 'hover:neon-glow-purple';
  const text = accent === 'cyan' ? 'text-neon-cyan' : accent === 'magenta' ? 'text-neon-magenta' : 'text-neon-purple';
  return (
    <span
      className={clsx(
        'inline-flex items-center px-3 py-1 rounded-full border text-xs font-mono bg-white/5 transition-shadow',
        border,
        glow,
        text
      )}
    >
      {label}
    </span>
  );
}
