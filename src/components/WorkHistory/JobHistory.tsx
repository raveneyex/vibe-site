import { useMemo } from 'react';
import data from '@/data.json';
import Job from './Job';
import type { TimelineExperience } from './types';
import { parseDateToTime } from '@/utils/dates';

export default function JobHistory() {
  const experiences = useMemo(() => {
    const raw = Array.isArray((data as { professionalExperience?: TimelineExperience[] }).professionalExperience)
      ? (data as { professionalExperience?: TimelineExperience[] }).professionalExperience!
      : [];
    return raw
      .slice()
      .sort((a, b) => {
        const aTime = parseDateToTime(a.start);
        const bTime = parseDateToTime(b.start);
        if (aTime === null && bTime === null) return 0;
        if (aTime === null) return 1;
        if (bTime === null) return -1;
        return bTime - aTime;
      });
  }, []);

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold mb-3 neon-text-cyan">Professional Experience</h2>
      <div className="relative">
        <div className="absolute left-[0.55rem] top-0 bottom-0 w-px bg-neon-cyan/30" aria-hidden></div>
        <div className="space-y-6 pl-6">
          {experiences.map((experience, index) => {
            const itemKey = `${experience.company}-${experience.title}-${experience.start}-${index}`;
            const animationDelay = Math.min(index, 6) * 0.07;
            return (
              <Job
                key={itemKey}
                itemKey={itemKey}
                experience={experience}
                animationDelay={animationDelay}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
