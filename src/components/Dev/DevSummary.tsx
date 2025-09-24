interface DevSummaryProps {
  summary: string;
}

export default function DevSummary(props: DevSummaryProps) {
  const { summary } = props;

  const summaryParagraphs = summary
  .split(/\n\s*\n/)
  .map((paragraph) => paragraph.trim())
  .filter(Boolean);

  return (
    <article className="space-y-4 text-slate-300 leading-relaxed">
      {summaryParagraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </article>
  );
}