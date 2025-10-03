import HudFrame from '@/components/Layout/HudFrame';
import SkillChip from '@/components/Layout/SkillChip';
import { Link } from 'react-router-dom';
import data from '@/data.json';
import usePageBranding from '@/hooks/usePageBranding';
import useLabels from '@/hooks/useLabels';

const { links } = data;

export default function Tattoo() {
  const labels = useLabels();
  const tattooLabels = labels.tattoo;
  const [bookingBefore, bookingAfter = ''] = tattooLabels.bookingDescription.split('{handle}');
  usePageBranding({
    tint: 'rgba(255,56,100,0.14)',
    crtRgb: '255,56,100',
    title: tattooLabels.metaTitle,
    description: tattooLabels.metaDescription,
  });
  return (
    <section className="mx-auto max-w-5xl space-y-10 font-sans">
      <header className="relative pb-4 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-wide text-slate-100 neon-text-magenta">{tattooLabels.title}</h1>
          <p className="mt-2 text-slate-300 max-w-3xl">
            {tattooLabels.subtitle}
          </p>
        </div>
        <Link to="/" className="font-mono text-sm text-slate-300 neo-link focus:outline-none focus-visible:focus-outline">{labels.shared.backToNexus}</Link>
        <div className="absolute left-0 right-0 -bottom-px h-px bg-gradient-to-r from-transparent via-neon-magenta/50 to-transparent" aria-hidden="true"></div>
      </header>

      <section>
        <HudFrame accent="magenta" className="p-5 glass-border-magenta">
          <div className="grid sm:grid-cols-3 gap-4 text-sm text-slate-300">
            <div>
              <div className="text-slate-400 uppercase tracking-wider text-[10px]">{tattooLabels.focus.label}</div>
              <div className="font-mono">{tattooLabels.focus.value}</div>
            </div>
            <div>
              <div className="text-slate-400 uppercase tracking-wider text-[10px]">{tattooLabels.approach.label}</div>
              <div className="font-mono">{tattooLabels.approach.value}</div>
            </div>
            <div>
              <div className="text-slate-400 uppercase tracking-wider text-[10px]">{tattooLabels.booking.label}</div>
              <div className="font-mono">{tattooLabels.booking.value}</div>
            </div>
          </div>
          <div className="mt-4 tick-divider-magenta" aria-hidden="true"></div>
          <div className="mt-4 flex flex-wrap gap-2">
            {tattooLabels.services.map((service) => (
              <SkillChip key={service} label={service} accent="magenta" />
            ))}
          </div>
        </HudFrame>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{tattooLabels.offeringsTitle}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {tattooLabels.offerings.map((offering) => (
            <article key={offering.title} className="rounded-xl p-5 hover:neon-glow-magenta transition-shadow glass glass-border-magenta">
              <h3 className="text-lg font-semibold mb-2 tracking-wide">{offering.title}</h3>
              <p className="text-sm text-slate-300">{offering.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{tattooLabels.bookingTitle}</h2>
        <p className="text-slate-300 leading-relaxed">
          {bookingBefore}
          <a
            href={links.instagram.url}
            className="underline decoration-dotted underline-offset-4 neo-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {links.instagram.handle}
          </a>
          {bookingAfter}
        </p>
      </section>
    </section>
  );
}
