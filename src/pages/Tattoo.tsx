import HudFrame from '@/components/NavDeck/HudFrame';
import SkillChip from '@/components/SkillChip';
import { Link } from 'react-router-dom';
import data from '@/data.json';
import usePageBranding from '@/hooks/usePageBranding';

const { links } = data;

export default function Tattoo() {
  usePageBranding({
    tint: 'rgba(255,56,100,0.14)',
    crtRgb: '255,56,100',
    title: 'Tattoo — Ojo de Cuervo',
    description: 'Custom sigil tattoos and experimental flash sets.',
  });
  return (
    <section className="mx-auto max-w-5xl space-y-10 font-sans">
      <header className="relative pb-4 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-wide text-slate-100 neon-text-magenta">Tattoo</h1>
          <p className="mt-2 text-slate-300 max-w-3xl">
            Custom sigil tattoos and exploratory flash, blending craft and intent.
          </p>
        </div>
        <Link to="/" className="font-mono text-sm text-slate-300 neo-link focus:outline-none focus-visible:focus-outline">← back to nexus</Link>
        <div className="absolute left-0 right-0 -bottom-px h-px bg-gradient-to-r from-transparent via-neon-magenta/50 to-transparent" aria-hidden="true"></div>
      </header>

      <section>
        <HudFrame accent="magenta" className="p-5 glass-border-magenta">
          <div className="grid sm:grid-cols-3 gap-4 text-sm text-slate-300">
            <div>
              <div className="text-slate-400 uppercase tracking-wider text-[10px]">focus</div>
              <div className="font-mono">sigils, blackwork, linework</div>
            </div>
            <div>
              <div className="text-slate-400 uppercase tracking-wider text-[10px]">approach</div>
              <div className="font-mono">intent-led, collaborative, clean</div>
            </div>
            <div>
              <div className="text-slate-400 uppercase tracking-wider text-[10px]">booking</div>
              <div className="font-mono">by request (dm/instagram)</div>
            </div>
          </div>
          <div className="mt-4 tick-divider-magenta" aria-hidden="true"></div>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Sigil design', 'Stencil prep', 'Aftercare'].map((s) => (
              <SkillChip key={s} label={s} accent="magenta" />
            ))}
          </div>
        </HudFrame>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Offerings</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <article className="rounded-xl p-5 hover:neon-glow-magenta transition-shadow glass glass-border-magenta">
            <h3 className="text-lg font-semibold mb-2 tracking-wide">Custom Sigil Tattoos</h3>
            <p className="text-sm text-slate-300">Personal sigils designed from your intent; minimal and precise linework.</p>
          </article>
          <article className="rounded-xl p-5 hover:neon-glow-magenta transition-shadow glass glass-border-magenta">
            <h3 className="text-lg font-semibold mb-2 tracking-wide">Flash & Studies</h3>
            <p className="text-sm text-slate-300">Experimental sets exploring protection glyphs, geometry, and motion.</p>
          </article>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Booking</h2>
        <p className="text-slate-300 leading-relaxed">
          Interested in a piece? Reach me via Instagram DM at
          {' '}<a href={links.instagram.url} className="underline decoration-dotted underline-offset-4 neo-link" target="_blank" rel="noopener noreferrer">{links.instagram.handle}</a>{' '}with a short note about the intention, placement, and size.
        </p>
      </section>
    </section>
  );
}
