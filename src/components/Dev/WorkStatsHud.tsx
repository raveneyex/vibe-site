import HudFrame from "../Layout/HudFrame";

interface WorkStatsHudProps {
  stats: Record<string, string | string[]>
}

function formatLabel(key: string) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/[-_]/g, ' ')
    .trim()
    .toUpperCase();
}

export default function WorkStatsHud(props: WorkStatsHudProps) {
  const { stats } = props;
  const entries = Object.entries(stats ?? {});

  if (entries.length === 0) {
    return null;
  }

  return (
    <section>
      <HudFrame accent="cyan" className="p-5">
        <div className="text-sm text-slate-300">
          {entries.map(([key, value], index) => {
            const label = formatLabel(key);
            const displayValue = Array.isArray(value) ? value.join(', ') : value;
            return (
              <div key={key}>
                {index > 0 && (
                  <div className="my-4 tick-divider-cyan" aria-hidden></div>
                )}
                <div className="flex flex-col gap-1">
                  <div className="text-slate-400 uppercase tracking-wider text-[10px]">{label}</div>
                  <div className="font-mono break-words">{displayValue}</div>
                </div>
              </div>
            );
          })}
        </div>
      </HudFrame>
    </section>
  );
}
