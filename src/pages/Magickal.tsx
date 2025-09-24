import SigilTile from '../components/SigilTile';
import SkillChip from '../components/Layout/SkillChip';
import { Link } from 'react-router-dom';
import { useMemo, useRef, useState, useId } from 'react';
import HudFrame from '../components/Layout/HudFrame';
import { CHALDEAN_ORDER, DAY_PLANET_MAP, type Planet, SYNODIC_MONTH_DAYS } from '@/constants';
import usePageBranding from '@/hooks/usePageBranding';
import data from '@/data.json';
import type { Swiper as SwiperInstance } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

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
  const swiperRef = useRef<SwiperInstance | null>(null);
  const uid = useId();

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

      <section>
        <HudFrame accent="purple" className="p-5 relative overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute -inset-8 opacity-20">
            <svg viewBox="0 0 400 400" className="w-full h-full rotate-6" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" stroke="currentColor" className="text-neon-purple">
                <circle cx="200" cy="200" r="160" opacity="0.4" />
                <circle cx="200" cy="200" r="110" opacity="0.3" />
                <circle cx="200" cy="200" r="70" opacity="0.25" />
                {Array.from({ length: 12 }).map((_, i) => (
                  <line key={i} x1="200" y1="200" x2={200 + 140*Math.cos((i*Math.PI)/6)} y2={200 + 140*Math.sin((i*Math.PI)/6)} opacity="0.25" />
                ))}
                <path d="M120 230c20-18 40-18 80-18s60 0 80 18" opacity="0.25" />
              </g>
            </svg>
          </div>
          <div className="relative z-10">
            <div className="text-slate-300 text-[10px] uppercase tracking-widest">esoteric interests</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {['Chaos magick', 'Luciferianism', 'Sigil magick', 'Technomancy'].map((s) => (
                <SkillChip key={s} label={s} accent="purple" />
              ))}
            </div>
            <div className="mt-4 tick-divider-purple" aria-hidden></div>
            {(() => {
              const angels: Record<Planet,string> = { Sun:'Michael', Moon:'Gabriel', Mars:'Camael', Mercury:'Raphael', Jupiter:'Sachiel', Venus:'Anael', Saturn:'Cassiel' };
              const demons: Record<Planet,string> = { Sun:'Belphegor', Moon:'Lilith', Mars:'Asmodeus', Mercury:'Samael', Jupiter:'Beelzebub', Venus:'Astaroth', Saturn:'Satan' };
              const now = new Date();
              const dayPlanet = DAY_PLANET_MAP[now.getDay() as 0|1|2|3|4|5|6];
              const startIdx = CHALDEAN_ORDER.indexOf(dayPlanet);
              const hour = now.getHours();
              const hourIndex = (hour - 6 + 24) % 24; // assume sunrise ~06:00
              const hourPlanet = CHALDEAN_ORDER[(startIdx + hourIndex) % 7];
              function moonPhaseInfo(d: Date): { label: string; fraction: number; waxing: boolean } {
                const epoch = Date.UTC(2000, 0, 6, 18, 14, 0); // known new moon
                const days = (d.getTime() - epoch) / 86400000;
                const cycle = ((days % SYNODIC_MONTH_DAYS) + SYNODIC_MONTH_DAYS) % SYNODIC_MONTH_DAYS;
                const frac = cycle / SYNODIC_MONTH_DAYS;
                // label bands
                let label: string;
                if (frac < 0.03 || frac > 0.97) label = 'new moon';
                else if (frac < 0.22) label = 'waxing crescent';
                else if (frac < 0.28) label = 'first quarter';
                else if (frac < 0.47) label = 'waxing gibbous';
                else if (frac < 0.53) label = 'full moon';
                else if (frac < 0.72) label = 'waning gibbous';
                else if (frac < 0.78) label = 'last quarter';
                else label = 'waning crescent';
                // illumination fraction (0..1), waxing true if growing
                const waxing = frac <= 0.5;
                const illum = waxing ? frac * 2 : (1 - frac) * 2; // 0..1
                return { label, fraction: Math.max(0, Math.min(1, illum)), waxing };
              }
              const mp = moonPhaseInfo(now);
              const crescentPath = 'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z';
              function MoonIconByLabel(label: string) {
                if (label === 'new moon') {
                  return (
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="text-slate-200">
                      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
                    </svg>
                  );
                }
                if (label === 'full moon') {
                  return (
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="text-slate-200">
                      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.9" />
                      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
                    </svg>
                  );
                }
                if (label === 'first quarter' || label === 'last quarter') {
                  const right = label === 'first quarter';
                  const clipId = uid + (right ? 'r' : 'l');
                  return (
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="text-slate-200">
                      <defs>
                        <clipPath id={clipId}>
                          {right ? (
                            <rect x="12" y="3" width="9" height="18" />
                          ) : (
                            <rect x="3" y="3" width="9" height="18" />
                          )}
                        </clipPath>
                      </defs>
                      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.9" clipPath={`url(#${clipId})`} />
                      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
                    </svg>
                  );
                }
                if (label === 'waxing crescent' || label === 'waning crescent') {
                  const flip = label === 'waning crescent';
                  return (
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="text-slate-200">
                      <path d={crescentPath} fill="currentColor" opacity="0.9" transform={flip ? 'translate(24 0) scale(-1 1)' : undefined} />
                      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
                    </svg>
                  );
                }
                if (label === 'waxing gibbous' || label === 'waning gibbous') {
                  const subtractRight = label === 'waning gibbous';
                  const maskId = uid + (subtractRight ? 'gr' : 'gl');
                  return (
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="text-slate-200">
                      <defs>
                        <mask id={maskId}>
                          <rect x="0" y="0" width="24" height="24" fill="black" />
                          <circle cx="12" cy="12" r="9" fill="white" />
                      {/* subtract a thin crescent on one side */}
                          <path d={crescentPath} fill="black" opacity="1" transform={subtractRight ? undefined : 'translate(24 0) scale(-1 1)'} />
                        </mask>
                      </defs>
                      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.9" mask={`url(#${maskId})`} />
                      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
                    </svg>
                  );
                }
                // fallback
                return (
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="text-slate-200">
                    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
                  </svg>
                );
              }
              const moonIcon = MoonIconByLabel(mp.label);
              return (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-slate-300">
                  <div>
                    <div className="text-slate-400 uppercase tracking-wider text-[10px]">planetary hour</div>
                    <div>{hourPlanet}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 uppercase tracking-wider text-[10px]">day ruler</div>
                    <div>{dayPlanet}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 uppercase tracking-wider text-[10px]">angel</div>
                    <div>{angels[dayPlanet]}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 uppercase tracking-wider text-[10px]">demon</div>
                    <div>{demons[dayPlanet]}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 uppercase tracking-wider text-[10px]">moon phase</div>
                    <div className="flex items-center gap-2">{moonIcon}<span>{mp.label}</span></div>
                  </div>
                </div>
              );
            })()}
          </div>
        </HudFrame>
      </section>

      <article className="space-y-4 text-slate-300 leading-relaxed">
        {summaryParagraphs.map((paragraph, index) => (
          <p key={index} className={index === 0 ? 'font-mono text-slate-200' : undefined}>
            {paragraph}
          </p>
        ))}
      </article>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold neon-text-purple">Sigils</h2>
        <div className="relative px-8 sm:px-12">
          {/* Live region to announce current slide for screen readers */}
          <div aria-live="polite" role="status" className="sr-only">Sigil {index + 1} of {count}</div>
          <Swiper
            modules={[Navigation, Keyboard, Autoplay]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => setIndex(swiper.realIndex)}
            slidesPerView={1}
            centeredSlides
            spaceBetween={32}
            keyboard={{ enabled: true, onlyInViewport: true }}
            navigation={{
              prevEl: '.sigil-carousel-prev',
              nextEl: '.sigil-carousel-next',
            }}
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
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none px-4 sm:px-6">
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
