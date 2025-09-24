import { useState, useId } from 'react';
import clsx from 'clsx';
import { FiChevronDown } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import SkillChip from '@/components/Layout/SkillChip';
import type { TimelineProject } from './types';
import { formatDateRange } from '@/utils/dates';

interface JobProjectsProps {
  projects: TimelineProject[];
}

export default function JobProjects({ projects }: JobProjectsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  if (!projects?.length) {
    return null;
  }

  return (
    <div className="mt-5 border-t border-white/5 pt-4">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 text-left text-sm font-semibold text-slate-200 focus:outline-none focus-visible:focus-outline"
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span>Projects</span>
        <FiChevronDown
          className={clsx(
            'shrink-0 text-slate-400 transition-transform duration-200 ease-out transform',
            isOpen ? 'rotate-0' : '-rotate-90'
          )}
          aria-hidden
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            key="projects"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="mt-4 space-y-4 overflow-hidden"
            aria-hidden={!isOpen}
          >
            {projects.map((project, index) => {
              const projectKey = `${project.name}-${index}`;
              return (
                <div key={projectKey} className="space-y-2">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-slate-200">{project.name}</h4>
                      <div className="text-xs text-slate-400 font-mono flex flex-wrap gap-2">
                        {project.role && <span>{project.role}</span>}
                        {project.client && (
                          <span>
                            {project.clientUrl ? (
                              <a
                                href={project.clientUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline decoration-dotted underline-offset-4"
                              >
                                {project.client}
                              </a>
                            ) : (
                              project.client
                            )}
                          </span>
                        )}
                        {project.notes && <span className="text-neon-cyan/60">{project.notes}</span>}
                      </div>
                      {project.responsibilities?.length ? (
                        <ul className="space-y-1 text-sm text-slate-300 list-disc list-inside">
                          {project.responsibilities.map((item, idx) => (
                            <li key={`${projectKey}-resp-${idx}`}>{item}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                    {(project.start || project.end) && (
                      <div className="text-[11px] font-mono text-slate-400 whitespace-nowrap">
                        {formatDateRange(project.start, project.end)}
                      </div>
                    )}
                  </div>
                  {project.technologies?.length ? (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <SkillChip key={`${projectKey}-tech-${tech}-${idx}`} label={tech} accent="cyan" />
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
