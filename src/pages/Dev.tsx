import { Link } from 'react-router-dom';
import HudFrame from '../components/Layout/HudFrame';
import data from '@/data.json';
import useDevProfile from '@/hooks/useDevProfile';
import usePageBranding from '@/hooks/usePageBranding';
import type { IconType } from 'react-icons';
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiVite,
  SiReactrouter,
  SiRedux,
  SiVitest,
  SiCypress,
  SiGithub,
  SiLinkedin,
} from 'react-icons/si';
import { FiDownload, FiMail } from 'react-icons/fi';
import JobHistory from '@/components/WorkHistory/JobHistory';

const techStack: { icon: IconType; label: string }[] = [
  { icon: SiReact, label: 'react' },
  { icon: SiTypescript, label: 'ts' },
  { icon: SiTailwindcss, label: 'tailwind' },
  { icon: SiNodedotjs, label: 'node' },
  { icon: SiVite, label: 'vite' },
  { icon: SiReactrouter, label: 'react-router' },
  { icon: SiRedux, label: 'redux' },
  { icon: SiVitest, label: 'vitest' },
  { icon: SiCypress, label: 'cypress' },
];

const { links, dev: devData } = data;

const contactLinks: {
  icon: IconType;
  label: string;
  href: string;
  external?: boolean;
  download?: boolean;
}[] = [
  { icon: SiGithub, label: 'github', href: links.github, external: true },
  { icon: SiLinkedin, label: 'linkedin', href: links.linkedin, external: true },
  { icon: FiMail, label: 'email', href: `mailto:${links.email.address}` },
  { icon: FiDownload, label: 'download cv', href: '/AndresOssa-CV-2025.pdf', download: true },
];

export default function Dev() {
  const { returnTo } = useDevProfile();
  usePageBranding({
    tint: 'rgba(0,255,163,0.12)',
    crtRgb: '0,255,163',
    title: devData.metadata.title,
    description: devData.metadata.description
  });

  const summaryParagraphs = devData.summary
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  
  return (
    <section className="mx-auto max-w-5xl space-y-10">
      <header className="relative pb-4 flex items-end justify-between gap-4">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-wide text-slate-100 neon-text-cyan">{devData.title}</h1>
          <p className="text-slate-300 max-w-3xl">{devData.subtitle}</p>
          <div className="flex flex-wrap items-center gap-3">
            {contactLinks.map(({ icon: Icon, label, href, external, download }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                download={download ? '' : undefined}
                className="font-mono text-xs sm:text-sm px-3 py-1.5 rounded-md glass glass-border-cyan neo-link inline-flex items-center gap-2"
              >
                <Icon size={18} className="shrink-0" aria-hidden="true" />
                <span className="leading-none">{label}</span>
              </a>
            ))}
          </div>
        </div>
        <Link to={returnTo} className="font-mono text-sm text-slate-300 neo-link focus:outline-none focus-visible:focus-outline">← back to nexus</Link>
        <div className="absolute left-0 right-0 -bottom-px h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" aria-hidden></div>
      </header>

      <section>
        <HudFrame accent="cyan" className="p-5">
          <div className="grid sm:grid-cols-3 gap-4 text-sm text-slate-300">
            <div>
              <div className="text-slate-400 uppercase tracking-wider text-[10px]">experience</div>
              <div className="font-mono">11+ years</div>
            </div>
            <div>
              <div className="text-slate-400 uppercase tracking-wider text-[10px]">industries</div>
              <div className="font-mono">media, entertainment, gambling, travel</div>
            </div>
            <div>
              <div className="text-slate-400 uppercase tracking-wider text-[10px]">focus</div>
              <div className="font-mono">react, typescript, design systems, a11y, perf</div>
            </div>
          </div>
          <div className="mt-4 tick-divider-cyan" aria-hidden></div>
          <div className="mt-4 grid sm:grid-cols-3 gap-4 text-sm text-slate-300">
            <div>
              <div className="text-slate-400 uppercase tracking-wider text-[10px]">tooling</div>
              <div className="font-mono">vite, pnpm/npm, eslint, prettier</div>
            </div>
            <div>
              <div className="text-slate-400 uppercase tracking-wider text-[10px]">testing</div>
              <div className="font-mono">testing library, vitest/jest, cypress</div>
            </div>
            <div>
              <div className="text-slate-400 uppercase tracking-wider text-[10px]">approach</div>
              <div className="font-mono">ux minded, component-first, scalable</div>
            </div>
          </div>
        </HudFrame>
      </section>

      <article className="space-y-4 text-slate-300 leading-relaxed">
        {summaryParagraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </article>

      <section>
        <h2 className="text-xl font-semibold mb-3 neon-text-cyan">Tech Stack</h2>
        <HudFrame accent="cyan" className="p-4">
          <div className="grid grid-flow-col auto-cols-fr gap-4 text-slate-300 place-items-center">
            {techStack.map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <Icon className="text-neon-cyan" size={28} />
                <span className="text-[11px] font-mono">{label}</span>
              </div>
            ))}
          </div>
        </HudFrame>
      </section>

      <JobHistory />

    </section>
  );
}
