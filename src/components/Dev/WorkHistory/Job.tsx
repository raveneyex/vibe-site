import { motion } from 'framer-motion';
import { formatDateRange } from '@/utils/dates';
import type { TimelineExperience } from '@/components/Dev/WorkHistory/types';
import JobProjects from '@/components/Dev/WorkHistory/JobProjects';
import JobResponsibilities from '@/components/Dev/WorkHistory/JobResponsibilities';
import JobTechnologies from '@/components/Dev/WorkHistory/JobTechnologies';
import TimelineJobMarker from '@/components/Dev/WorkHistory/TimelineJobMarker';

interface JobProps {
  experience: TimelineExperience;
  itemKey: string;
  animationDelay?: number;
}

export default function Job({ experience, itemKey, animationDelay = 0 }: JobProps) {
  return (
    <motion.article
      className="relative glass glass-border-cyan rounded-xl p-5 transition-all duration-500 ease-snappy will-change-transform"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: animationDelay }}
    >
      <TimelineJobMarker />
      <header className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-slate-100">{experience.company}</h3>
          <div className="text-sm text-slate-300 font-mono flex flex-wrap gap-2">
            <span>{experience.title}</span>
            {experience.team && <span className="text-neon-cyan/70">• Team {experience.team}</span>}
            {experience.project && <span className="text-neon-cyan/70">• {experience.project}</span>}
          </div>
          {experience.location && <div className="text-xs font-mono uppercase tracking-wider text-slate-400">{experience.location}</div>}
        </div>
        <div className="text-xs sm:text-sm font-mono text-slate-400 whitespace-nowrap">
          {formatDateRange(experience.start, experience.end)}
        </div>
      </header>

      <JobResponsibilities responsibilities={experience.responsibilities} itemKey={itemKey} />

      <JobTechnologies technologies={experience.technologies} itemKey={itemKey} />

      {experience.projects?.length ? <JobProjects projects={experience.projects} /> : null}
    </motion.article>
  );
}
