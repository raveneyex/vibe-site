type Props = { label: string; accent?: 'cyan' | 'magenta' };

export default function SkillChip({ label, accent = 'cyan' }: Props) {
  const border = accent === 'cyan' ? 'border-neon-cyan/40' : 'border-neon-magenta/40';
  const glow = accent === 'cyan' ? 'hover:neon-glow-cyan' : 'hover:neon-glow-magenta';
  const text = accent === 'cyan' ? 'text-neon-cyan' : 'text-neon-magenta';
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full border ${border} ${glow} text-xs font-mono ${text} bg-white/5 transition-shadow`}
    >
      {label}
    </span>
  );
}

