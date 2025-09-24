import SkillChip from '@/components/SkillChip';

interface JobTechnologiesProps {
  technologies?: string[];
  itemKey: string;
  accent?: 'cyan' | 'magenta' | 'purple';
}

export default function JobTechnologies({ technologies, itemKey, accent = 'cyan' }: JobTechnologiesProps) {
  if (!technologies?.length) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {technologies.map((tech, index) => (
        <SkillChip key={`${itemKey}-tech-${tech}-${index}`} label={tech} accent={accent} />
      ))}
    </div>
  );
}
