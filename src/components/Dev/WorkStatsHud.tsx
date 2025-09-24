import HudFrame from "../Layout/HudFrame";

export default function WorkStatsHud() {
  return (
    <section>
      <HudFrame accent="cyan" className="p-5">
        <div className="grid sm:grid-cols-3 gap-4 text-sm text-slate-300">
          <div>
            <div className="text-slate-400 uppercase tracking-wider text-[10px]">experience</div>
            <div className="font-mono">11+ years</div>
          </div>
          <div>
            <div className="text-slate-400 uppercase tracking-wider text-[10px]">industries</div>
            <div className="font-mono">media, entertainment, gambling, travel</div>
          </div>
          <div>
            <div className="text-slate-400 uppercase tracking-wider text-[10px]">focus</div>
            <div className="font-mono">react, typescript, design systems, a11y, perf</div>
          </div>
        </div>
        <div className="mt-4 tick-divider-cyan" aria-hidden></div>
        <div className="mt-4 grid sm:grid-cols-3 gap-4 text-sm text-slate-300">
          <div>
            <div className="text-slate-400 uppercase tracking-wider text-[10px]">tooling</div>
            <div className="font-mono">vite, pnpm/npm, eslint, prettier</div>
          </div>
          <div>
            <div className="text-slate-400 uppercase tracking-wider text-[10px]">testing</div>
            <div className="font-mono">testing library, vitest/jest, cypress</div>
          </div>
          <div>
            <div className="text-slate-400 uppercase tracking-wider text-[10px]">approach</div>
            <div className="font-mono">ux minded, component-first, scalable</div>
          </div>
        </div>
      </HudFrame>
    </section>
  );
}