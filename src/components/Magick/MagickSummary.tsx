import { useMemo } from "react";

interface MagickSummaryProps {
  summary: string;
}

export default function MagickSummary(props: MagickSummaryProps) {
  const { summary } = props;

  const summaryParagraphs = useMemo(() => {
    return summary
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
  }, [summary]);
  
  return (
    <article className="space-y-4 text-slate-300 leading-relaxed">
      {summaryParagraphs.map((paragraph, index) => (
        <p key={index} className={index === 0 ? 'font-mono text-slate-200' : undefined}>
          {paragraph}
        </p>
      ))}
    </article>
  );
}