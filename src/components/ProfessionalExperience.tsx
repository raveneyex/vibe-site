import { useEffect, useMemo, useRef, useState } from 'react';
import data from '@/data.json';
import SkillChip from '@/components/SkillChip';

type TimelineProject = {
  name: string;
  client?: string;
  clientUrl?: string;
  role?: string;
  start?: string;
  end?: string | null;
  notes?: string;
  responsibilities?: string[];
  technologies?: string[];
};

type TimelineExperience = {
  company: string;
  location?: string;
  title: string;
  start: string;
  end?: string | null;
  responsibilities?: string[];
  technologies?: string[];
  team?: string;
  project?: string;
  client?: string;
  clientUrl?: string;
  projects?: TimelineProject[];
};

const formatter = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' });

function formatDate(value?: string | null) {
  if (!value) return 'Present';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return formatter.format(date);
}

function formatRange(start?: string, end?: string | null) {
  if (!start && !end) return '';
  const startText = start ? formatDate(start) : '';
  const endText = end === null || !end ? 'Present' : formatDate(end);
  return startText ? `${startText} – ${endText}` : endText;
}

export default function ProfessionalExperience() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visibleItems, setVisibleItems] = useState<Record<string, boolean>>({});

  const experiences = useMemo(() => {
    const raw = Array.isArray((data as { professionalExperience?: TimelineExperience[] }).professionalExperience)
      ? (data as { professionalExperience?: TimelineExperience[] }).professionalExperience!
      : [];
    return raw
      .slice()
      .sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const nodes = Array.from(container.querySelectorAll('[data-exp-item]'));
    if (!nodes.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const key = entry.target.getAttribute('data-key');
          if (!key) return;
          setVisibleItems((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [experiences.length]);

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold mb-3 neon-text-cyan">Professional Experience</h2>
      <div className="relative" ref={containerRef}>
        <div className="absolute left-[0.55rem] top-0 bottom-0 w-px bg-neon-cyan/30" aria-hidden></div>
        <div className="space-y-6 pl-6">
          {experiences.map((experience, index) => {
            const itemKey = `${experience.company}-${experience.title}-${experience.start}-${index}`;
            const isVisible = visibleItems[itemKey];
            const transitionDelay = `${Math.min(index, 6) * 70}ms`;
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
                  className="absolute -left-[0.64rem] top-5 w-3 h-3 rounded-full border border-neon-cyan/70 bg-noir-900 shadow-[0_0_0_4px_rgba(0,255,163,0.12)]"
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
                    {formatRange(experience.start, experience.end)}
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

                {experience.projects?.length ? (
                  <div className="mt-5 space-y-4 border-t border-white/5 pt-4">
                    {experience.projects.map((project, projectIndex) => {
                      const projectKey = `${experience.company}-${project.name}-${projectIndex}`;
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
                                  {project.responsibilities.map((item, respIndex) => (
                                    <li key={`${projectKey}-resp-${respIndex}`}>{item}</li>
                                  ))}
                                </ul>
                              ) : null}
                            </div>
                            {(project.start || project.end) && (
                              <div className="text-[11px] font-mono text-slate-400 whitespace-nowrap">
                                {formatRange(project.start, project.end)}
                              </div>
                            )}
                          </div>
                          {project.technologies?.length ? (
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech, techIndex) => (
                                <SkillChip
                                  key={`${projectKey}-tech-${tech}-${techIndex}`}
                                  label={tech}
                                  accent="cyan"
                                />
                              ))}
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
