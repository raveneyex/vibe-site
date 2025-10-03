import useLabels from '@/hooks/useLabels';

export default function BackgroundEffects() {
  const labels = useLabels();
  const skipText = labels.layout.skipToContent;

  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] bg-noir-900/90 border border-white/10 px-3 py-2 rounded-md"
      >
        {skipText}
      </a>
      <div className="bg-tint pointer-events-none" aria-hidden="true"></div>
      <div className="vignette pointer-events-none" aria-hidden="true"></div>
      <div className="crt-phosphor pointer-events-none" aria-hidden="true"></div>
      <div className="crt-grille pointer-events-none" aria-hidden="true"></div>
      <div className="noise pointer-events-none" aria-hidden="true"></div>
      <div className="scanlines pointer-events-none" aria-hidden="true"></div>
      <div className="global-sweep pointer-events-none" aria-hidden="true"></div>
    </>
  )
}
