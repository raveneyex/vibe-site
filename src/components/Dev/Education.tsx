import HudFrame from "../Layout/HudFrame";

type EducationEntry = {
  name: string;
  location?: string;
  graduationYear?: number | string;
  major?: string;
  finalGrade?: string;
};

type EducationData = {
  highschool?: EducationEntry;
  university?: EducationEntry;
};

interface EducationProps {
  education?: EducationData;
}

function normalizeEntries(data?: EducationData) {
  if (!data) return [] as Array<EducationEntry & { label: string }>;
  const entries: Array<EducationEntry & { label: string }> = [];
  if (data.highschool) {
    entries.push({ ...data.highschool, label: "High School" });
  }
  if (data.university) {
    entries.push({ ...data.university, label: "University" });
  }
  return entries;
}

export default function Education({ education }: EducationProps) {
  const entries = normalizeEntries(education);

  if (!entries.length) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold neon-text-cyan">Education</h2>
      <HudFrame accent="cyan" className="p-5">
        <div className="grid gap-6 sm:grid-cols-2 text-sm text-slate-300">
          {entries.map((entry) => (
            <article key={entry.label} className="flex flex-col gap-2">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400">{entry.label}</p>
                <h3 className="text-base font-semibold text-slate-100">{entry.name}</h3>
              </div>
              <div className="space-y-1 font-mono text-xs text-slate-400">
                {entry.location && <p>{entry.location}</p>}
                {entry.graduationYear && <p>Graduated: {entry.graduationYear}</p>}
              </div>
              {(entry.major || entry.finalGrade) && (
                <div className="rounded-md border border-cyan-500/20 bg-cyan-500/5 px-3 py-2 text-xs font-mono text-slate-200">
                  {entry.major && <p className="uppercase tracking-wider text-[11px] text-cyan-200/90">Major</p>}
                  {entry.major && <p className="text-sm leading-tight text-slate-100">{entry.major}</p>}
                  {entry.finalGrade && (
                    <p className="mt-2 text-[11px] uppercase tracking-wider text-cyan-200/90">
                      Final Grade: <span className="text-slate-100">{entry.finalGrade}</span>
                    </p>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </HudFrame>
    </section>
  );
}
