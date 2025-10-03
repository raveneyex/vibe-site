import { useEffect, useState } from 'react';
import NavDeck from '@/components/NavDeck/NavDeck';
import HudFrame from '@/components/Layout/HudFrame';

const BOOT_KEY = 'booted';
const LANGUAGE_KEY = 'preferredLanguage';

type LanguageCode = 'en' | 'es';

const LANGUAGE_LABEL: Record<LanguageCode, string> = {
  en: 'english',
  es: 'español',
};

function getBootMessages(language: LanguageCode) {
  const hex = (n: number) => n.toString(16).padStart(4, '0');
  const devId = hex(Math.floor(Math.random() * 0xffff));
  const mac = Array.from({ length: 6 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join(':');
  const kb = 8192 + Math.floor(Math.random() * 8192);
  const sigilCount = 8 + Math.floor(Math.random() * 16);
  const msgs = [
    '> booting up...',
    '> bios v0.8 — raveneyex',
    `> device id: 0x${devId}`,
    '> checking memory...',
    `> memory: ${kb} kb ok`,
    '> probing buses: isa ok, pci ok',
    '> dma: enabled',
    `> net: disabled (mac ${mac})`,
    '> init video: crt/mono ok',
    '> init input: ps/2 ok',
    '> scanning modules...',
    '> setting up tattoo equipment...',
    '> sterilizing: autoclave cycle ok',
    '> needles: sterile packs verified',
    '> inks: black/grey set loaded',
    '> machine: coil calibration ok',
    '> power supply: stable 6.5v',
    '> stencil: transfer gel ready',
    `> locale: ${LANGUAGE_LABEL[language]}`,
    '> loading magick systems...',
    '> grimoire: loaded',
    `> sigils: compiled (${sigilCount})`,
    '> circle: charged',
    '> intent: bound',
    '> wards: enabled',
    '> banishing: protocol armed',
    '> modules: ui, router, sigils, hud ok',
    '> filesystem: mounted / (ro)',
    '> entropy: seeded',
    '> ready',
    '> press any key to enter',
  ];

  return msgs;
}

export default function Landing() {
  const [language, setLanguage] = useState<LanguageCode | null>(() => {
    if (typeof window === 'undefined') return null;
    const stored = window.localStorage.getItem(LANGUAGE_KEY);
    return stored === 'en' || stored === 'es' ? stored : null;
  });
  const [bootDone, setBootDone] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.sessionStorage.getItem(BOOT_KEY) === '1';
  });
  const [bootLines, setBootLines] = useState<string[]>([]);

  useEffect(() => {
    if (bootDone || !language) {
      return;
    }

    if (typeof window === 'undefined') {
      return;
    }

    if (window.sessionStorage.getItem(BOOT_KEY)) {
      setBootDone(true);
      return;
    }

    setBootLines([]);

    const msgs = getBootMessages(language);
    let i = 0;
    let cancelled = false;
    let intervalId: number | null = null;
    let timeoutId: number | null = null;

    const skip = () => {
      if (cancelled) return;
      cancelled = true;
      if (intervalId !== null) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
      window.sessionStorage.setItem(BOOT_KEY, '1');
      setBootDone(true);
    };

    intervalId = window.setInterval(() => {
      if (cancelled) {
        if (intervalId !== null) {
          window.clearInterval(intervalId);
          intervalId = null;
        }
        return;
      }
      setBootLines((prev) => [...prev, msgs[i]]);
      i += 1;
      if (i >= msgs.length) {
        if (intervalId !== null) {
          window.clearInterval(intervalId);
          intervalId = null;
        }
        timeoutId = window.setTimeout(skip, 500);
      }
    }, 300);

    const onKey = () => skip();
    const onClick = () => skip();
    let listenerTimer: number | null = window.setTimeout(() => {
      window.addEventListener('keydown', onKey);
      window.addEventListener('click', onClick);
      listenerTimer = null;
    }, 0);

    return () => {
      cancelled = true;
      if (intervalId !== null) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
      if (listenerTimer !== null) {
        window.clearTimeout(listenerTimer);
      } else {
        window.removeEventListener('keydown', onKey);
        window.removeEventListener('click', onClick);
      }
    };
  }, [bootDone, language]);

  const handleLanguageSelect = (value: LanguageCode) => {
    setLanguage(value);
    setBootDone(false);
    setBootLines([]);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LANGUAGE_KEY, value);
      window.sessionStorage.removeItem(BOOT_KEY);
    }
  };

  if (!language) {
    return <LanguageModal onSelect={handleLanguageSelect} />;
  }

  if (!bootDone) {
    return (
      <section className="fixed inset-0 z-50 grid place-items-center bg-noir-900/98">
        <div className="relative w-[min(92vw,42rem)] font-mono text-[#00ffa3] text-sm sm:text-base leading-relaxed">
          <div className="absolute inset-0 rounded-2xl border border-cyan-400/50 bg-noir-900/80 shadow-[0_0_45px_#00ffa366]" aria-hidden />
          <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8 backdrop-blur">
            <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-cyan-300/80">
              <span>{'// boot sequence'}</span>
              <span>{LANGUAGE_LABEL[language]}</span>
            </div>
            {bootLines.map((l, idx) => (
              <div key={idx} className="whitespace-pre">
                {l}
              </div>
            ))}
            {bootLines.length === 0 && <div>&gt; BOOTING...</div>}
          </div>
        </div>
      </section>
    );
  }

  return <NavDeck />;
}

function LanguageModal({ onSelect }: { onSelect: (language: LanguageCode) => void }) {
  return (
    <section className="fixed inset-0 z-[80] flex items-start justify-center bg-noir-950/95 px-4 pt-40 pb-12 backdrop-blur sm:pt-32 md:items-center md:pt-32 md:pb-24">
      <HudFrame
        accent="cyan"
        className="relative w-[min(92vw,30rem)] translate-y-0 overflow-hidden p-0 font-mono text-sm text-[#00ffa3] shadow-[0_0_84px_#00ffa344] sm:translate-y-12 md:translate-y-64"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-25 bg-[repeating-linear-gradient(180deg,transparent,transparent_14px,rgba(0,255,163,0.2)_14px,rgba(0,255,163,0.2)_15px)]"
        />
        <header className="relative flex items-center justify-between border-b border-[#00ffa3]/30 bg-noir-900/80 px-6 py-4 text-[0.65rem] uppercase tracking-[0.45em] text-cyan-200/80">
          <span>{'// INIT.SYSTEM'}</span>
          <span>{'LANGUAGE NEGOTIATION'}</span>
        </header>
        <div className="relative px-6 py-6">
          <div className="mb-5 space-y-1 text-[0.7rem] leading-relaxed text-cyan-100/70">
            <p>{'> incoming connection established'}</p>
            <p>{'> identify preferred command channel'}</p>
          </div>
          <div className="grid gap-3">
            <button
              type="button"
              onClick={() => onSelect('en')}
              className="group flex flex-col rounded-lg border border-[#00ffa3]/40 bg-noir-950/80 px-5 py-4 text-left transition hover:border-[#00ffa3]/80 hover:bg-[#00ffa3]/10"
            >
              <span className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-cyan-200/80 group-hover:text-[#00ffa3]">
                <span>{'[ ENGLISH ]'}</span>
                <span className="text-[0.6rem]">{'> en-us'}</span>
              </span>
              <span className="mt-3 flex items-center gap-2 text-[0.63rem] tracking-[0.25em] text-cyan-200/60 group-hover:text-[#00ffa3]/80">
                <span className="text-[#00ffa3]">▸</span>
                <span>standard operating channel</span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => onSelect('es')}
              className="group flex flex-col rounded-lg border border-[#ff66e5]/40 bg-noir-950/80 px-5 py-4 text-left transition hover:border-[#ff66e5]/80 hover:bg-[#ff66e5]/10"
            >
              <span className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-fuchsia-200/80 group-hover:text-[#ff66e5]">
                <span>{'[ ESPAÑOL ]'}</span>
                <span className="text-[0.6rem]">{'> es-la'}</span>
              </span>
              <span className="mt-3 flex items-center gap-2 text-[0.63rem] tracking-[0.25em] text-fuchsia-200/60 group-hover:text-[#ff66e5]/80">
                <span className="text-[#ff66e5]">▸</span>
                <span>protocolo latino transorbital</span>
              </span>
            </button>
          </div>
        </div>
        <footer className="relative border-t border-[#00ffa3]/25 bg-noir-900/80 px-6 py-3 text-[0.6rem] uppercase tracking-[0.5em] text-cyan-200/60">
          <span>{'// confirm selection to resume boot'}</span>
        </footer>
      </HudFrame>
    </section>
  );
}
