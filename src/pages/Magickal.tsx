import { Link } from 'react-router-dom';
import usePageBranding from '@/hooks/usePageBranding';
import data from '@/data.json';

import EsotericInterests from '@/components/Magickal/EsotericInterests';
import DailyMagickalAspects from '@/components/Magickal/DailyMagickalAspects';
import MagickSummary from '@/components/Magickal/MagickSummary';
import ThoughtFormsSlider from '@/components/Magickal/ThoughtFormsSlider';

export default function Magickal() {
  const { magick } = data;

  usePageBranding({
    tint: 'rgba(168,85,247,0.14)',
    crtRgb: '168,85,247',
    title: magick.metadata.title,
    description: magick.metadata.description,
  });

  return (
    <section className="mx-auto max-w-5xl space-y-10 font-mono">
      <header className="relative pb-4 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-wide text-slate-100 neon-text-purple">{magick.title}</h1>
          <p className="mt-2 text-slate-300 max-w-3xl">{magick.subtitle}</p>
        </div>
        <Link to="/" className="font-mono text-sm text-slate-300 neo-link focus:outline-none focus-visible:focus-outline">← back to nexus</Link>
        <div className="absolute left-0 right-0 -bottom-px h-px bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent" aria-hidden></div>
      </header>

      <DailyMagickalAspects />

      <MagickSummary summary={magick.summary} />

      <EsotericInterests interests={magick.interests} />

      <ThoughtFormsSlider />
      
    </section>
  );
}
