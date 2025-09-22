const monthYearFormatter = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' });

export function parseDateToTime(value?: string | null): number | null {
  if (!value) return null;
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? null : time;
}

export function formatMonthYear(value?: string | null, fallback = 'Present'): string {
  if (!value) return fallback;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value ?? fallback;
  return monthYearFormatter.format(date);
}

export function formatDateRange(
  start?: string | null,
  end?: string | null,
  fallback = 'Present'
): string {
  const startLabel = start ? formatMonthYear(start, fallback) : '';
  const hasExplicitEnd = end !== undefined && end !== null && end !== '';
  const endLabel = hasExplicitEnd ? formatMonthYear(end, fallback) : fallback;
  return startLabel ? `${startLabel} – ${endLabel}` : endLabel;
}
