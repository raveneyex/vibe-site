import { Link } from 'react-router-dom';
import data from '@/data.json';
import useDevProfile from '@/hooks/useDevProfile';
import usePageBranding from '@/hooks/usePageBranding';
import TechStack from '@/components/Dev/TechStack';
import DevSummary from '@/components/Dev/DevSummary';
import ContactBar from '@/components/Dev/ContactBar';
import WorkStatsHud from '@/components/Dev/WorkStatsHud';
import JobHistory from '@/components/Dev/WorkHistory/JobHistory';
import Education from '@/components/Dev/Education';

const { links, dev: devData } = data;

export default function Dev() {
  const { returnTo } = useDevProfile();
  
  usePageBranding({
    tint: 'rgba(0,255,163,0.12)',
    crtRgb: '0,255,163',
    title: devData.metadata.title,
    description: devData.metadata.description
  });

  return (
    <section className="mx-auto max-w-5xl space-y-10">
      <header className="relative pb-4 flex items-end justify-between gap-4">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-wide text-slate-100 neon-text-cyan">{devData.title}</h1>
          <p className="text-slate-300 max-w-3xl">{devData.subtitle}</p>
          <ContactBar links={links}/>
        </div>
        <Link to={returnTo} className="font-mono text-sm text-slate-300 neo-link focus:outline-none focus-visible:focus-outline">← back to nexus</Link>
        <div className="absolute left-0 right-0 -bottom-px h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" aria-hidden></div>
      </header>

      <WorkStatsHud stats={devData.stats} />

      <DevSummary summary={devData.summary} />

      <TechStack />

      <JobHistory experience={devData.professionalExperience}/>

      <Education education={devData.education} />

    </section>
  );
}
