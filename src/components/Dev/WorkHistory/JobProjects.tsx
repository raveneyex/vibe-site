import SkillChip from '@/components/SkillChip';
import type { TimelineProject } from './types';
import { formatDateRange } from '@/utils/dates';

interface JobProjectsProps {
  projects: TimelineProject[];
}

export default function JobProjects({ projects }: JobProjectsProps) {
  return (
    <div className="mt-5 space-y-4 border-t border-white/5 pt-4">
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
    </div>
  );
}
