import { useEffect, useRef, useState } from 'react';
import {
  LANGUAGE_CHANGE_EVENT,
  LANGUAGE_KEY,
  LANGUAGE_LABEL,
  LANGUAGE_OPTIONS,
  type LanguageCode,
  getStoredLanguage,
  setStoredLanguage,
} from '../../utils/language';

function resolveInitialLanguage(): LanguageCode {
  return getStoredLanguage() ?? 'en';
}

export default function LanguageDropdown() {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<LanguageCode>(() => resolveInitialLanguage());
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === LANGUAGE_CHANGE_EVENT) return;
      if (event.key === LANGUAGE_KEY) {
        const next = getStoredLanguage();
        if (next) setLanguage(next);
      }
    };

    const handleLanguageEvent = (event: Event) => {
      const custom = event as CustomEvent<LanguageCode | undefined>;
      if (custom.detail) {
        setLanguage(custom.detail);
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageEvent);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(LANGUAGE_CHANGE_EVENT, handleLanguageEvent);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('mousedown', handleClick);
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('mousedown', handleClick);
      window.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const toggle = () => setOpen((prev) => !prev);

  const handleSelect = (code: LanguageCode) => {
    setStoredLanguage(code);
    setLanguage(code);
    setOpen(false);
  };

  const summaryLabel = LANGUAGE_LABEL[language];

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={toggle}
        className="flex items-center gap-2 rounded-full border border-white/10 bg-noir-900/60 px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.4em] text-slate-200/80 transition hover:border-[#00ffa3]/60 hover:text-[#00ffa3] focus:outline-none focus-visible:focus-outline"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{language}</span>
        <svg
          aria-hidden="true"
          className={`h-2.5 w-2.5 transition-transform ${open ? 'rotate-180 text-[#00ffa3]' : 'text-slate-400'}`}
          viewBox="0 0 12 8"
          fill="currentColor"
        >
          <path d="M6 8 0 0h12L6 8Z" />
        </svg>
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute right-0 mt-2 w-48 rounded-lg border border-[#00ffa3]/40 bg-noir-950/95 p-2 shadow-[0_0_35px_#00ffa333]"
        >
          <div className="px-2 pb-2 text-[0.55rem] uppercase tracking-[0.35em] text-cyan-200/60">select channel</div>
          {LANGUAGE_OPTIONS.map(({ code, label }) => {
            const active = code === language;
            return (
              <button
                key={code}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => handleSelect(code)}
                className={`group mb-1 flex w-full items-center justify-between rounded-md px-3 py-2 text-left font-mono text-[0.65rem] uppercase tracking-[0.3em] transition last:mb-0 ${
                  active
                    ? 'border border-[#00ffa3]/80 bg-[#00ffa3]/10 text-[#00ffa3]'
                    : 'border border-transparent text-slate-200/80 hover:border-[#00ffa3]/40 hover:bg-[#00ffa3]/10 hover:text-[#00ffa3]'
                }`}
              >
                <span>{`[ ${label} ]`}</span>
                <span className="text-[0.6rem] text-cyan-200/70">{`> ${code}`}</span>
              </button>
            );
          })}
        </div>
      )}
      <span className="sr-only">Current language {summaryLabel}</span>
    </div>
  );
}
