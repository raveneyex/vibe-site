import HudFrame from './HudFrame';
import type { LanguageCode } from '@/utils/language';
import useLabels from '@/hooks/useLabels';

interface LanguageModalProps {
  onSelect: (language: LanguageCode) => void 
}

function LanguageModal(props: LanguageModalProps) {
  const { onSelect } = props;
  const labels = useLabels();
  const modalLabels = labels.layout.languageModal;
  
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
          <span>{modalLabels.headerLeft}</span>
          <span>{modalLabels.headerRight}</span>
        </header>
        <div className="relative px-6 py-6">
          <div className="mb-5 space-y-1 text-[0.7rem] leading-relaxed text-cyan-100/70">
            {modalLabels.intro.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="grid gap-3">
            <button
              type="button"
              onClick={() => onSelect('en')}
              className="group flex flex-col rounded-lg border border-[#00ffa3]/40 bg-noir-950/80 px-5 py-4 text-left transition hover:border-[#00ffa3]/80 hover:bg-[#00ffa3]/10"
            >
              <span className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-cyan-200/80 group-hover:text-[#00ffa3]">
                <span>{modalLabels.englishButton.label}</span>
                <span className="text-[0.6rem]">{modalLabels.englishButton.code}</span>
              </span>
              <span className="mt-3 flex items-center gap-2 text-[0.63rem] tracking-[0.25em] text-cyan-200/60 group-hover:text-[#00ffa3]/80">
                <span className="text-[#00ffa3]">▸</span>
                <span>{modalLabels.englishButton.description}</span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => onSelect('es')}
              className="group flex flex-col rounded-lg border border-[#ff66e5]/40 bg-noir-950/80 px-5 py-4 text-left transition hover:border-[#ff66e5]/80 hover:bg-[#ff66e5]/10"
            >
              <span className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-fuchsia-200/80 group-hover:text-[#ff66e5]">
                <span>{modalLabels.spanishButton.label}</span>
                <span className="text-[0.6rem]">{modalLabels.spanishButton.code}</span>
              </span>
              <span className="mt-3 flex items-center gap-2 text-[0.63rem] tracking-[0.25em] text-fuchsia-200/60 group-hover:text-[#ff66e5]/80">
                <span className="text-[#ff66e5]">▸</span>
                <span>{modalLabels.spanishButton.description}</span>
              </span>
            </button>
          </div>
        </div>
        <footer className="relative border-t border-[#00ffa3]/25 bg-noir-900/80 px-6 py-3 text-[0.6rem] uppercase tracking-[0.5em] text-cyan-200/60">
          <span>{modalLabels.footer}</span>
        </footer>
      </HudFrame>
    </section>
  );
}

export default LanguageModal;
