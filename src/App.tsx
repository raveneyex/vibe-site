import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Landing from './pages/Landing';
import Dev from './pages/Dev';
import Magickal from './pages/Magickal';
import Tattoo from './pages/Tattoo';
import PageShell from './components/Layout/PageShell';
import BackgroundEffects from './components/Layout/BackgroundEffects';

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-noir-900 relative crt-flicker">
      <BackgroundEffects />
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
