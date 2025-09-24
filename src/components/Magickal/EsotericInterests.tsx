import HudFrame from "@/components/Layout/HudFrame";
import SkillChip from "@/components/Layout/SkillChip";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface EsotericInterestsProps {
  interests: string[];
}

export default function EsotericInterests({ interests }: EsotericInterestsProps) {
  if (!interests.length) {
    return null;
  }

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold neon-text-purple">Esoteric Interests</h2>
      <HudFrame accent="purple" className="p-5">
        <div className="hidden sm:flex flex-wrap gap-2 text-slate-300">
          {interests.map((interest) => (
            <SkillChip key={interest} label={interest} accent="purple" />
          ))}
        </div>
        <div className="sm:hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={2.1}
            spaceBetween={12}
            autoplay={{ delay: 2200, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className="interests-swiper"
          >
            {interests.map((interest) => (
              <SwiperSlide key={interest} className="py-2">
                <SkillChip label={interest} accent="purple" className="mx-auto" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </HudFrame>
    </section>
  );
}
