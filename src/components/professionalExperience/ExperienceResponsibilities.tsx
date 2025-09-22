interface ExperienceResponsibilitiesProps {
  responsibilities?: string[];
  itemKey: string;
}

export default function ExperienceResponsibilities({ responsibilities, itemKey }: ExperienceResponsibilitiesProps) {
  if (!responsibilities?.length) return null;

  return (
    <ul className="mt-3 space-y-1.5 text-sm text-slate-300 list-disc list-inside">
      {responsibilities.map((item, index) => (
        <li key={`${itemKey}-resp-${index}`}>{item}</li>
      ))}
    </ul>
  );
}
