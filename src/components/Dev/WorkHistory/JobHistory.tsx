import { useMemo, useState, useId } from 'react';
import clsx from 'clsx';
import { FiChevronDown } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import Job from './Job';
import type { TimelineExperience } from './types';
import { parseDateToTime } from '@/utils/dates';

interface JobHistoryProps {
  experience: TimelineExperience[]
}

export default function JobHistory(props: JobHistoryProps) {
  const { experience } = props;
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

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

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold neon-text-cyan">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex w-full items-center justify-between gap-3 text-left focus:outline-none focus-visible:focus-outline"
          aria-expanded={isOpen}
          aria-controls={contentId}
        >
          <span>Professional Experience</span>
          <FiChevronDown
            className={clsx(
              'shrink-0 text-base text-slate-300 transition-transform duration-200 ease-out transform',
              isOpen ? 'rotate-0' : '-rotate-90'
            )}
            aria-hidden
          />
        </button>
      </h2>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            key="job-history"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="relative overflow-hidden"
            aria-hidden={!isOpen}
          >
            <div className="absolute left-[0.55rem] top-0 bottom-0 w-px bg-neon-cyan/30" aria-hidden></div>
            <div className="space-y-6 pl-6 py-1">
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
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
