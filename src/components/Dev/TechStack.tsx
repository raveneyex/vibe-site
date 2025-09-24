import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import HudFrame from "@/components/Layout/HudFrame";
import { IconType } from "react-icons";
import { SiReact, SiTypescript, SiTailwindcss, SiNodedotjs, SiVite, SiReactrouter, SiRedux, SiVitest, SiCypress } from "react-icons/si";

const techStack: { icon: IconType; label: string }[] = [
  { icon: SiReact, label: 'react' },
  { icon: SiTypescript, label: 'ts' },
  { icon: SiTailwindcss, label: 'tailwind' },
  { icon: SiNodedotjs, label: 'node' },
  { icon: SiVite, label: 'vite' },
  { icon: SiReactrouter, label: 'react-router' },
  { icon: SiRedux, label: 'redux' },
  { icon: SiVitest, label: 'vitest' },
  { icon: SiCypress, label: 'cypress' },
];

export default function TechStack() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-3 neon-text-cyan">Tech Stack</h2>
      <HudFrame accent="cyan" className="p-4">
        <div className="hidden text-slate-300 sm:grid grid-flow-col auto-cols-fr gap-4 place-items-center">
          {techStack.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <Icon className="text-neon-cyan" size={28} />
              <span className="text-[11px] font-mono">{label}</span>
            </div>
          ))}
        </div>

        <div className="sm:hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            slidesPerView={3}
            spaceBetween={20}
            breakpoints={{
              360: { slidesPerView: 3 },
              480: { slidesPerView: 3.2 },
              640: { slidesPerView: 4 },
            }}
            className="w-full techstack-swiper"
          >
            {techStack.map(({ icon: Icon, label }) => (
              <SwiperSlide key={label} className="py-6">
                <motion.div
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center gap-2"
                >
                  <Icon className="text-neon-cyan" size={40} aria-hidden />
                  <span className="text-[11px] font-mono">{label}</span>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </HudFrame>
    </section>
  );
}
