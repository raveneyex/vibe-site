import { useMemo, useId } from "react";
import HudFrame from "@/components/Layout/HudFrame";
import { CHALDEAN_ORDER, DAY_PLANET_MAP, SYNODIC_MONTH_DAYS, type Planet } from "@/constants";
import useLabels from '@/hooks/useLabels';

type MoonPhaseKey =
  | 'new'
  | 'waxingCrescent'
  | 'firstQuarter'
  | 'waxingGibbous'
  | 'full'
  | 'waningGibbous'
  | 'lastQuarter'
  | 'waningCrescent';

function getMoonPhaseInfo(date: Date) {
  const epoch = Date.UTC(2000, 0, 6, 18, 14, 0);
  const days = (date.getTime() - epoch) / 86400000;
  const cycle = ((days % SYNODIC_MONTH_DAYS) + SYNODIC_MONTH_DAYS) % SYNODIC_MONTH_DAYS;
  const fraction = cycle / SYNODIC_MONTH_DAYS;

  let phase: MoonPhaseKey;
  if (fraction < 0.03 || fraction > 0.97) phase = 'new';
  else if (fraction < 0.22) phase = 'waxingCrescent';
  else if (fraction < 0.28) phase = 'firstQuarter';
  else if (fraction < 0.47) phase = 'waxingGibbous';
  else if (fraction < 0.53) phase = 'full';
  else if (fraction < 0.72) phase = 'waningGibbous';
  else if (fraction < 0.78) phase = 'lastQuarter';
  else phase = 'waningCrescent';

  const illumination = fraction <= 0.5 ? fraction * 2 : (1 - fraction) * 2;

  return { phase, illumination, waxing: fraction < 0.5 };
}

function MoonIcon({ illumination, waxing }: { illumination: number; waxing: boolean }) {
  const uid = useId();
  const radius = 9;
  const center = 12;

  if (illumination <= 0.05) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="text-slate-200">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.6" />
        <circle cx="12" cy="12" r="7" fill="currentColor" opacity="0.08" />
      </svg>
    );
  }
  if (illumination >= 0.95) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="text-slate-200">
        <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.9" />
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.6" />
      </svg>
    );
  }
  const maskId = `${uid}-moon-mask`;
  const shadeId = `${uid}-moon-shade`;
  const offset = radius * (1 - illumination);
  const occluderCx = waxing ? center - offset : center + offset;
  const gradientStart = waxing ? (illumination < 0.5 ? 0.15 : 0.35) : (illumination < 0.5 ? 0.65 : 0.85);
  const gradientEnd = waxing ? 0.85 : 0.15;

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="text-slate-200">
      <defs>
        <mask id={maskId}>
          <rect x="0" y="0" width="24" height="24" fill="black" />
          <circle cx={center} cy="12" r={radius} fill="white" />
          <circle cx={occluderCx} cy="12" r={radius} fill="black" />
        </mask>
        <linearGradient id={shadeId} x1={waxing ? "0%" : "100%"} y1="0%" x2={waxing ? "100%" : "0%"} y2="0%">
          <stop offset={waxing ? gradientStart : gradientEnd} stopColor="currentColor" stopOpacity="0.95" />
          <stop offset={waxing ? gradientEnd : gradientStart} stopColor="currentColor" stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <circle cx={center} cy="12" r={radius} fill={`url(#${shadeId})`} mask={`url(#${maskId})`} />
      <circle cx={center} cy="12" r={radius} fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.65" />
    </svg>
  );
}

export default function DailyMagickalAspects() {
  const labels = useLabels();
  const dailyLabels = labels.magick.dailyAspects;
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
      <div className="text-slate-300 text-[10px] uppercase tracking-widest">{dailyLabels.title}</div>
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-slate-300">
        <div>
          <div className="text-slate-400 uppercase tracking-wider text-[10px]">{dailyLabels.planetaryHour}</div>
          <div>{hourPlanet}</div>
        </div>
        <div>
          <div className="text-slate-400 uppercase tracking-wider text-[10px]">{dailyLabels.dayRuler}</div>
          <div>{dayPlanet}</div>
        </div>
        <div>
          <div className="text-slate-400 uppercase tracking-wider text-[10px]">{dailyLabels.angel}</div>
          <div>{angels[dayPlanet]}</div>
        </div>
        <div>
          <div className="text-slate-400 uppercase tracking-wider text-[10px]">{dailyLabels.demon}</div>
          <div>{demons[dayPlanet]}</div>
        </div>
        <div>
          <div className="text-slate-400 uppercase tracking-wider text-[10px]">{dailyLabels.moonPhase}</div>
          <div className="flex items-center gap-2">
            <MoonIcon illumination={moonPhase.illumination} waxing={moonPhase.waxing} />
            <span className="capitalize">{dailyLabels.phases[moonPhase.phase] ?? dailyLabels.phases.full}</span>
          </div>
        </div>
      </div>
    </HudFrame>
  );
}
