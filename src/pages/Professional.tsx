import SkillChip from '../components/SkillChip';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import HudFrame from '../components/HudFrame';
import { useEffect } from 'react';
import { setMeta } from '@/utils/meta';
import { ReactIcon, TypeScriptIcon, TailwindIcon, NodeIcon, TestingIcon, ViteIcon, RouterIcon, ReduxIcon, VitestIcon, CypressIcon } from '../components/icons';

export default function Professional() {
  useEffect(() => {
    document.documentElement.style.setProperty('--tint', 'rgba(0,255,163,0.12)');
    document.documentElement.style.setProperty('--crt-rgb', '0,255,163');
    setMeta('Professional — Andres Ossa', 'Frontend development, design systems, and performance.');
  }, []);
  return (
    <section className="mx-auto max-w-5xl space-y-10">
      <header className="relative pb-4 flex items-end justify-between gap-4">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-wide text-slate-100 neon-text-cyan">Andres Ossa - FrontEnd Developer</h1>
          <p className="text-slate-300 max-w-3xl">
            Turning complex ideas into intuitive digital experiences for over a decade.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/raveneyex"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs sm:text-sm px-3 py-1.5 rounded-md glass glass-border-cyan neo-link inline-flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.48c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.17-1.12-1.48-1.12-1.48-.92-.63.07-.62.07-.62 1.02.07 1.56 1.06 1.56 1.06.9 1.55 2.36 1.1 2.94.84.09-.65.35-1.1.64-1.36-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.28.1-2.66 0 0 .85-.27 2.78 1.02a9.7 9.7 0 0 1 5.06 0c1.92-1.29 2.77-1.02 2.77-1.02.56 1.38.21 2.41.11 2.66.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.69.92.69 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>
              github
            </a>
            <a
              href="https://www.linkedin.com/in/aossaara/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs sm:text-sm px-3 py-1.5 rounded-md glass glass-border-cyan neo-link inline-flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8.98h5V24H0V8.98zM8.34 8.98h4.79v2.05h.07c.67-1.27 2.3-2.6 4.74-2.6 5.07 0 6 3.34 6 7.68V24h-5v-6.68c0-1.59-.03-3.63-2.21-3.63-2.21 0-2.55 1.73-2.55 3.52V24h-5V8.98z"/></svg>
              linkedin
            </a>
            <a
              href="/AndresOssa-CV-2025.pdf"
              download
              className="font-mono text-xs sm:text-sm px-3 py-1.5 rounded-md glass glass-border-cyan neo-link inline-flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3a1 1 0 0 1 1 1v9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4.007 4.007a1 1 0 0 1-1.414 0L7.279 12.707a1 1 0 1 1 1.414-1.414L11 13.586V4a1 1 0 0 1 1-1Zm-7 14a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1Z"/></svg>
              download cv
            </a>
          </div>
        </div>
        <Link to="/" className="font-mono text-sm text-slate-300 neo-link focus:outline-none focus-visible:focus-outline">← back to nexus</Link>
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
        <p>
          I’m Andres Ossa, a Frontend Developer with more than 11 years of experience turning complex ideas into clean,
          functional interfaces. My work lives at the intersection of detail and usability: I care about writing
          maintainable code as much as I care about creating experiences that feel intuitive to real people.
        </p>
        <p>
          I’ve built products across a wide range of industries including media, entertainment, online gambling, and
          travel. That variety has sharpened my ability to adapt quickly, learn domain-specific challenges, and design
          solutions that balance technical requirements with user needs.
        </p>
        <p>
          My focus is on modern web technologies, scalable frontends, and thoughtful UI design. I approach development
          with discipline, curiosity, and a habit of solving problems at both the architectural and pixel level.
        </p>
        <p>
          When I’m not debugging or shipping features, I’m usually experimenting with design, exploring new frameworks,
          or honing my craft in other creative mediums.
        </p>
      </article>

      <section>
        <h2 className="text-xl font-semibold mb-3 neon-text-cyan">Selected Skills</h2>
        <div className="flex flex-wrap gap-2">
          {['React', 'TypeScript', 'Tailwind', 'Node.js', 'Testing Library', 'Vite', 'React Router'].map((s) => (
            <SkillChip key={s} label={s} accent="cyan" />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3 neon-text-cyan">Tech Stack</h2>
        <HudFrame accent="cyan" className="p-4">
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-10 gap-4 place-items-center text-slate-300">
            <div className="flex flex-col items-center gap-1">
              <ReactIcon className="text-neon-cyan" />
              <span className="text-[11px] font-mono">react</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <TypeScriptIcon className="text-neon-cyan" />
              <span className="text-[11px] font-mono">ts</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <TailwindIcon className="text-neon-cyan" />
              <span className="text-[11px] font-mono">tailwind</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <NodeIcon className="text-neon-cyan" />
              <span className="text-[11px] font-mono">node</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <TestingIcon className="text-neon-cyan" />
              <span className="text-[11px] font-mono">testing</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ViteIcon className="text-neon-cyan" />
              <span className="text-[11px] font-mono">vite</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RouterIcon className="text-neon-cyan" />
              <span className="text-[11px] font-mono">router</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ReduxIcon className="text-neon-cyan" />
              <span className="text-[11px] font-mono">redux</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <VitestIcon className="text-neon-cyan" />
              <span className="text-[11px] font-mono">vitest</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <CypressIcon className="text-neon-cyan" />
              <span className="text-[11px] font-mono">cypress</span>
            </div>
          </div>
        </HudFrame>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Work</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card title="Media Platform Redesign" cta={{ label: 'View case study', href: '#' }} accent="cyan">
            Led a component-driven redesign improving performance and accessibility across a large React app.
          </Card>
          <Card title="Realtime Analytics Dashboard" cta={{ label: 'View case study', href: '#' }} accent="cyan">
            Delivered a fast, legible dashboard with virtualized tables and responsive charts.
          </Card>
        </div>
      </section>
    </section>
  );
}
