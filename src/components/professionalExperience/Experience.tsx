import { formatDateRange } from '@/utils/dates';
import SkillChip from '@/components/SkillChip';
import type { TimelineExperience } from './types';
import Projects from './Projects';

interface ExperienceProps {
  experience: TimelineExperience;
  itemKey: string;
  isVisible?: boolean;
  transitionDelay?: string;
}

export default function Experience({ experience, itemKey, isVisible, transitionDelay = '0ms' }: ExperienceProps) {
  return (
    <article
      key={itemKey}
      data-exp-item
      data-key={itemKey}
      className={`relative glass glass-border-cyan rounded-xl p-5 transition-all duration-500 ease-snappy will-change-transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay }}
    >
      <span
        className="absolute -left-[1.32rem] top-5 w-3 h-3 rounded-full border border-neon-cyan/70 bg-noir-900 shadow-[0_0_0_4px_rgba(0,255,163,0.12)]"
        aria-hidden
      ></span>
      <header className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-slate-100">{experience.company}</h3>
          <div className="text-sm text-slate-300 font-mono flex flex-wrap gap-2">
            <span>{experience.title}</span>
            {experience.team && <span className="text-neon-cyan/70">• Team {experience.team}</span>}
            {experience.project && <span className="text-neon-cyan/70">• {experience.project}</span>}
            {experience.client && (
              <span className="text-neon-cyan/70">
                •
                {' '}
                {experience.clientUrl ? (
                  <a
                    href={experience.clientUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-dotted underline-offset-4"
                  >
                    {experience.client}
                  </a>
                ) : (
                  experience.client
                )}
              </span>
            )}
          </div>
          {experience.location && <div className="text-xs font-mono uppercase tracking-wider text-slate-400">{experience.location}</div>}
        </div>
        <div className="text-xs sm:text-sm font-mono text-slate-400 whitespace-nowrap">
          {formatDateRange(experience.start, experience.end)}
        </div>
      </header>

      {experience.responsibilities?.length ? (
        <ul className="mt-3 space-y-1.5 text-sm text-slate-300 list-disc list-inside">
          {experience.responsibilities.map((item, idx) => (
            <li key={`${item}-${idx}`}>{item}</li>
          ))}
        </ul>
      ) : null}

      {experience.technologies?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {experience.technologies.map((tech, idx) => (
            <SkillChip key={`${experience.company}-tech-${tech}-${idx}`} label={tech} accent="cyan" />
          ))}
        </div>
      ) : null}

      {experience.projects?.length ? <Projects projects={experience.projects} /> : null}
    </article>
  );
}
