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
        <div className="grid grid-flow-col auto-cols-fr gap-4 text-slate-300 place-items-center">
          {techStack.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <Icon className="text-neon-cyan" size={28} />
              <span className="text-[11px] font-mono">{label}</span>
            </div>
          ))}
        </div>
      </HudFrame>
    </section>
  );
}
