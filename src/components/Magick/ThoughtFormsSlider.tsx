import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard, Autoplay } from "swiper/modules";
import SigilTile from "@/components/SigilTile";
import { useState } from "react";
import 'swiper/css';
import 'swiper/css/navigation';


export default function ThoughtFormsSlider() {
  const count = 12;

  const [index, setIndex] = useState(0);
  
  return (
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
      </div>
    </section>
  )
}
