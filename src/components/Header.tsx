import { NavLink, Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur bg-noir-900/60 border-b border-white/5" role="banner">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-neon-magenta/40 via-white/10 to-neon-cyan/40" aria-hidden="true"></div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="font-mono text-slate-200 text-sm tracking-wider hover:text-white focus:outline-none focus-visible:focus-outline rgb-split">
          Andres Ossa
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-6">
          <NavLink
            to="/professional"
            className={({ isActive }: { isActive: boolean }) =>
              'neo-link text-sm font-medium transition-colors focus:outline-none focus-visible:focus-outline ' +
              (isActive ? 'text-neon-cyan neon-text-cyan' : 'text-slate-300 hover:text-white')
            }
          >
            Professional
          </NavLink>
          <NavLink
            to="/magickal"
            className={({ isActive }: { isActive: boolean }) =>
              'neo-link text-sm font-medium transition-colors focus:outline-none focus-visible:focus-outline ' +
              (isActive ? 'text-neon-purple neon-text-purple' : 'text-slate-300 hover:text-white')
            }
          >
            Magickal
          </NavLink>
          <NavLink
            to="/tattoo"
            className={({ isActive }: { isActive: boolean }) =>
              'neo-link text-sm font-medium transition-colors focus:outline-none focus-visible:focus-outline ' +
              (isActive ? 'text-neon-magenta neon-text-magenta' : 'text-slate-300 hover:text-white')
            }
          >
            Tattoo
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
