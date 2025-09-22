import { useEffect, useMemo, useRef, useState } from 'react';
import data from '@/data.json';
import Experience from '@/components/professionalExperience/Experience';
import type { ExperienceVisibilityMap, TimelineExperience } from '@/components/professionalExperience/types';
import { parseDateToTime } from '@/utils/dates';

export default function ProfessionalExperience() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visibleItems, setVisibleItems] = useState<ExperienceVisibilityMap>({});

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
              <Experience
                key={itemKey}
                itemKey={itemKey}
                experience={experience}
                isVisible={isVisible}
                transitionDelay={transitionDelay}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
