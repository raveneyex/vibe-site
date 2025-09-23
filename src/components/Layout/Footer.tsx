import data from '@/data.json';

const { links } = data;

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-noir-900/70 backdrop-blur relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-neon-cyan/30 via-white/10 to-neon-magenta/30" aria-hidden="true"></div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-between">
        <div className="font-mono text-sm text-slate-400">
          <span className="text-neon-cyan">$</span> email:
          <a
            href={`mailto:${links.email.address}`}
            className="ml-2 underline decoration-dotted underline-offset-4 neo-link focus:outline-none focus-visible:focus-outline"
          >
            {links.email.display}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a
            className="text-slate-400 neo-link focus:outline-none focus-visible:focus-outline"
            href={links.github}
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.48c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.17-1.12-1.48-1.12-1.48-.92-.63.07-.62.07-.62 1.02.07 1.56 1.06 1.56 1.06.9 1.55 2.36 1.1 2.94.84.09-.65.35-1.1.64-1.36-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.28.1-2.66 0 0 .85-.27 2.78 1.02a9.7 9.7 0 0 1 5.06 0c1.92-1.29 2.77-1.02 2.77-1.02.56 1.38.21 2.41.11 2.66.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.69.92.69 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>
          </a>
          <a
            className="text-slate-400 neo-link focus:outline-none focus-visible:focus-outline"
            href={links.instagram.url}
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2.2A2.8 2.8 0 1 0 12 15.8 2.8 2.8 0 0 0 12 9.2ZM17.5 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
