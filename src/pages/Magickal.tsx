import SigilTile from '@/components/SigilTile';
import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import usePageBranding from '@/hooks/usePageBranding';
import data from '@/data.json';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import EsotericInterests from '@/components/Magickal/EsotericInterests';
import DailyMagickalAspects from '@/components/Magickal/DailyMagickalAspects';

export default function Magickal() {
  const { magick } = data;

  usePageBranding({
    tint: 'rgba(168,85,247,0.14)',
    crtRgb: '168,85,247',
    title: magick.metadata.title,
    description: magick.metadata.description,
  });

  const summaryParagraphs = useMemo(() => {
    return magick.summary
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
  }, [magick.summary]);

  const count = 12;
  const [index, setIndex] = useState(0);

  return (
    <section className="mx-auto max-w-5xl space-y-10 font-mono">
      <header className="relative pb-4 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-wide text-slate-100 neon-text-purple">{magick.title}</h1>
          <p className="mt-2 text-slate-300 max-w-3xl">{magick.subtitle}</p>
        </div>
        <Link to="/" className="font-mono text-sm text-slate-300 neo-link focus:outline-none focus-visible:focus-outline">← back to nexus</Link>
        <div className="absolute left-0 right-0 -bottom-px h-px bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent" aria-hidden></div>
      </header>

      <EsotericInterests interests={magick.interests} />

      <DailyMagickalAspects />

      <article className="space-y-4 text-slate-300 leading-relaxed">
        {summaryParagraphs.map((paragraph, idx) => (
          <p key={idx} className={idx === 0 ? 'font-mono text-slate-200' : undefined}>
            {paragraph}
          </p>
        ))}
      </article>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold neon-text-purple">Sigils</h2>
        <div className="relative">
          <div aria-live="polite" role="status" className="sr-only">Sigil {index + 1} of {count}</div>
          <Swiper
            modules={[Navigation, Keyboard, Autoplay]}
            onSlideChange={(swiper) => setIndex(swiper.realIndex)}
            slidesPerView={1}
            centeredSlides
            spaceBetween={32}
            keyboard={{ enabled: true, onlyInViewport: true }}
            navigation={{ prevEl: '.sigil-carousel-prev', nextEl: '.sigil-carousel-next' }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop
            className="sigil-swiper"
            aria-label="sigil carousel"
          >
            {Array.from({ length: count }).map((_, i) => (
              <SwiperSlide key={i} aria-label={`sigil ${i + 1} of ${count}`}>
                <div className="flex justify-center py-12">
                  <SigilTile label={`Sigil ${i + 1}`} accent="purple" size={3} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute inset-y-0 left-0 right-0 z-10 flex items-center justify-between px-2 sm:px-4 pointer-events-none">
            <button
              type="button"
              className="sigil-carousel-prev pointer-events-auto ml-1 sm:ml-2 font-mono text-xs px-2 py-1 rounded glass glass-border-purple hover:neon-glow-purple focus:outline-none focus-visible:focus-outline"
              aria-label="previous sigil"
            >
              ◂
            </button>
            <button
              type="button"
              className="sigil-carousel-next pointer-events-auto mr-1 sm:mr-2 font-mono text-xs px-2 py-1 rounded glass glass-border-purple hover:neon-glow-purple focus:outline-none focus-visible:focus-outline"
              aria-label="next sigil"
            >
              ▸
            </button>
          </div>
          <div className="mt-8" />
        </div>
      </section>
    </section>
  );
}
