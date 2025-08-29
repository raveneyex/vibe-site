import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Professional from './pages/Professional';
import Magickal from './pages/Magickal';
import { useEffect, useState } from 'react';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);
  return reduced;
}

function PageShell({ children }: { children: React.ReactNode }) {
  const reduce = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <main
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
          path="/professional"
          element={
            <PageShell>
              <Professional />
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
      </Routes>
      <Footer />
    </div>
  );
}
