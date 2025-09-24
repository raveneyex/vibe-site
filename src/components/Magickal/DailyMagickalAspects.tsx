import { useMemo, useId } from "react";
import HudFrame from "@/components/Layout/HudFrame";
import { CHALDEAN_ORDER, DAY_PLANET_MAP, SYNODIC_MONTH_DAYS, type Planet } from "@/constants";

function getMoonPhaseInfo(date: Date) {
  const epoch = Date.UTC(2000, 0, 6, 18, 14, 0);
  const days = (date.getTime() - epoch) / 86400000;
  const cycle = ((days % SYNODIC_MONTH_DAYS) + SYNODIC_MONTH_DAYS) % SYNODIC_MONTH_DAYS;
  const fraction = cycle / SYNODIC_MONTH_DAYS;

  let label: string;
  if (fraction < 0.03 || fraction > 0.97) label = "new moon";
  else if (fraction < 0.22) label = "waxing crescent";
  else if (fraction < 0.28) label = "first quarter";
  else if (fraction < 0.47) label = "waxing gibbous";
  else if (fraction < 0.53) label = "full moon";
  else if (fraction < 0.72) label = "waning gibbous";
  else if (fraction < 0.78) label = "last quarter";
  else label = "waning crescent";

  return { label, fraction, waxing: fraction < 0.5 };
}

function MoonIcon({ label, fraction }: { label: string; fraction: number }) {
  const uid = useId();
  const crescentPath = "M15.5 24c0-6.351 3.002-11.722 7.5-15-1.58-.635-3.318-1-5.14-1C12.61 8 7 13.82 7 21s5.61 13 10.86 13c1.822 0 3.56-.365 5.14-1-4.498-3.278-7.5-8.649-7.5-15Z";

  if (label === "new moon") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="text-slate-200">
        <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.12" />
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
      </svg>
    );
  }
  if (label === "full moon") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="text-slate-200">
        <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.9" />
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
      </svg>
    );
  }
  if (label === "first quarter" || label === "last quarter") {
    const right = label === "first quarter";
    const clipId = `${uid}-${right ? "r" : "l"}`;
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="text-slate-200">
        <defs>
          <clipPath id={clipId}>
            {right ? <rect x="12" y="3" width="9" height="18" /> : <rect x="3" y="3" width="9" height="18" />}
          </clipPath>
        </defs>
        <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.9" clipPath={`url(#${clipId})`} />
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
      </svg>
    );
  }
  if (label === "waxing crescent" || label === "waning crescent") {
    const flip = label === "waning crescent";
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="text-slate-200">
        <path d={crescentPath} fill="currentColor" opacity="0.9" transform={flip ? "translate(24 0) scale(-1 1)" : undefined} />
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
      </svg>
    );
  }
  if (label === "waxing gibbous" || label === "waning gibbous") {
    const subtractRight = label === "waning gibbous";
    const maskId = `${uid}-${subtractRight ? "gr" : "gl"}`;
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="text-slate-200">
        <defs>
          <mask id={maskId}>
            <rect x="0" y="0" width="24" height="24" fill="black" />
            <circle cx="12" cy="12" r="9" fill="white" />
            <path d={crescentPath} fill="black" transform={subtractRight ? undefined : "translate(24 0) scale(-1 1)"} />
          </mask>
        </defs>
        <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.9" mask={`url(#${maskId})`} />
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="text-slate-200">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    </svg>
  );
}

export default function DailyMagickalAspects() {
  const { dayPlanet, hourPlanet, angels, demons, moonPhase } = useMemo(() => {
    const now = new Date();
    const dayPlanet = DAY_PLANET_MAP[now.getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6];
    const startIdx = CHALDEAN_ORDER.indexOf(dayPlanet);
    const hour = now.getHours();
    const hourIndex = (hour - 6 + 24) % 24;
    const hourPlanet = CHALDEAN_ORDER[(startIdx + hourIndex) % 7];

    const angels: Record<Planet, string> = {
      Sun: "Michael",
      Moon: "Gabriel",
      Mars: "Camael",
      Mercury: "Raphael",
      Jupiter: "Sachiel",
      Venus: "Anael",
      Saturn: "Cassiel",
    };

    const demons: Record<Planet, string> = {
      Sun: "Belphegor",
      Moon: "Lilith",
      Mars: "Asmodeus",
      Mercury: "Samael",
      Jupiter: "Beelzebub",
      Venus: "Astaroth",
      Saturn: "Satan",
    };

    const moonPhase = getMoonPhaseInfo(now);
    return { dayPlanet, hourPlanet, angels, demons, moonPhase };
  }, []);

  return (
    <HudFrame accent="purple" className="p-5">
      <div className="text-slate-300 text-[10px] uppercase tracking-widest">Daily Planetary Alignments</div>
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
          <div className="flex items-center gap-2">
            <MoonIcon label={moonPhase.label} fraction={moonPhase.fraction} />
            <span>{moonPhase.label}</span>
          </div>
        </div>
      </div>
    </HudFrame>
  );
}
