import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Dev from './pages/Dev';
import Magickal from './pages/Magickal';
import Tattoo from './pages/Tattoo';
import { useEffect, useRef, useState } from 'react';
import usePrefersReducedMotion from './hooks/usePrefersReducedMotion';

function PageShell({ children }: { children: React.ReactNode }) {
  const reduce = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);
  useEffect(() => {
    // Move focus to main content on route change for a11y
    mainRef.current?.focus();
  }, []);
  return (
    <main
      id="content"
      tabIndex={-1}
      ref={mainRef}
      role="main"
      className={
        'min-h-[calc(100vh-6rem)] px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative overflow-hidden'
      }
    >
      <div
        className={
          'route-enter transition-all duration-500 ease-snappy will-change-transform' +
          (ready && !reduce
            ? ' opacity-100 translate-y-0'
            : ' opacity-0 translate-y-2')
        }
      >
        {children}
      </div>
    </main>
  );
}

export default function App() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-noir-900 relative crt-flicker">
      {/* Skip link for keyboard users */}
      <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] bg-noir-900/90 border border-white/10 px-3 py-2 rounded-md">Skip to content</a>
      <div className="bg-tint pointer-events-none" aria-hidden="true"></div>
      <div className="vignette pointer-events-none" aria-hidden="true"></div>
      <div className="crt-phosphor pointer-events-none" aria-hidden="true"></div>
      <div className="crt-grille pointer-events-none" aria-hidden="true"></div>
      <div className="noise pointer-events-none" aria-hidden="true"></div>
      <div className="scanlines pointer-events-none" aria-hidden="true"></div>
      <div className="global-sweep pointer-events-none" aria-hidden="true"></div>
      <Header />
      <Routes location={location}>
        <Route
          path="/"
          element={
            <PageShell>
              <Landing />
            </PageShell>
          }
        />
        <Route
          path="/professionalProfile"
          element={
            <PageShell>
              <Landing />
            </PageShell>
          }
        />
        <Route
          path="/dev"
          element={
            <PageShell>
              <Dev />
            </PageShell>
          }
        />
        <Route
          path="/magickal"
          element={
            <PageShell>
              <Magickal />
            </PageShell>
          }
        />
        <Route
          path="/tattoo"
          element={
            <PageShell>
              <Tattoo />
            </PageShell>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}
