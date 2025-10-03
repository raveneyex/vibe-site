import { useEffect, useState } from 'react';
import NavDeck from '@/components/NavDeck/NavDeck';
import LanguageModal from '@/components/Layout/LanguageModal';
import {
  LANGUAGE_CHANGE_EVENT,
  LANGUAGE_LABEL,
  type LanguageCode,
  getStoredLanguage,
  setStoredLanguage,
} from '@/components/Layout/language';

const BOOT_KEY = 'booted';

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
    return getStoredLanguage();
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

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleLanguage = (event: Event) => {
      const { detail } = event as CustomEvent<LanguageCode | undefined>;
      if (!detail) return;
      setLanguage(detail);
    };

    window.addEventListener(LANGUAGE_CHANGE_EVENT, handleLanguage);
    return () => {
      window.removeEventListener(LANGUAGE_CHANGE_EVENT, handleLanguage);
    };
  }, []);

  const handleLanguageSelect = (value: LanguageCode) => {
    setLanguage(value);
    setBootDone(false);
    setBootLines([]);
    if (typeof window !== 'undefined') {
      setStoredLanguage(value);
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
