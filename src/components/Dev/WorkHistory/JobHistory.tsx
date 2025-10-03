import { useMemo, useState, useId } from 'react';
import clsx from 'clsx';
import { FiChevronDown } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import Job from './Job';
import type { TimelineExperience } from './types';
import { parseDateToTime } from '@/utils/dates';
import useLabels from '@/hooks/useLabels';

interface JobHistoryProps {
  experience: TimelineExperience[]
}

export default function JobHistory(props: JobHistoryProps) {
  const { experience } = props;
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();
  const labels = useLabels();
  const experienceLabels = labels.dev.experience;

  const experiences = useMemo(() => {
    return experience
      .slice()
      .sort((a, b) => {
        const aTime = parseDateToTime(a.start);
        const bTime = parseDateToTime(b.start);
        if (aTime === null && bTime === null) return 0;
        if (aTime === null) return 1;
        if (bTime === null) return -1;
        return bTime - aTime;
      });
  }, [experience]);

  const [primaryExperience, ...restExperiences] = experiences;

  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold neon-text-cyan">{experienceLabels.title}</h2>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center gap-2 rounded-md border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-mono tracking-wide text-slate-100 transition hover:bg-cyan-500/20 focus:outline-none focus-visible:focus-outline"
          aria-expanded={isOpen}
          aria-controls={contentId}
        >
          <FiChevronDown
            className={clsx(
              'transition-transform duration-200 ease-out transform',
              isOpen ? 'rotate-0' : '-rotate-90'
            )}
            aria-hidden
          />
          <span>{isOpen ? experienceLabels.hide : experienceLabels.show}</span>
        </button>
      </header>
      <div className="relative">
        <div className="absolute left-[0.55rem] top-0 bottom-0 w-px bg-neon-cyan/30" aria-hidden></div>
        <div className="space-y-6 pl-6 py-1">
          {primaryExperience && (
            <Job
              itemKey={`${primaryExperience.company}-${primaryExperience.title}-${primaryExperience.start}-primary`}
              experience={primaryExperience}
              animationDelay={0}
            />
          )}
          <AnimatePresence initial={false}>
            {isOpen && restExperiences.length > 0 && (
              <motion.div
                id={contentId}
                key="job-history-expanded"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="space-y-6"
                style={{ overflow: 'visible' }}
              >
                {restExperiences.map((experience, index) => {
                  const itemKey = `${experience.company}-${experience.title}-${experience.start}-${index + 1}`;
                  const animationDelay = Math.min(index + 1, 6) * 0.07;
                  return (
                    <Job
                      key={itemKey}
                      itemKey={itemKey}
                      experience={experience}
                      animationDelay={animationDelay}
                    />
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
