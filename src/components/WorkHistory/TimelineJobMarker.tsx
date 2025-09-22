interface TimelineJobMarkerProps {
  className?: string;
}

export default function TimelineJobMarker({ className }: TimelineJobMarkerProps) {
  const baseClasses =
    'absolute -left-[1.32rem] top-5 w-3 h-3 rounded-full border border-neon-cyan/70 bg-noir-900 shadow-[0_0_0_4px_rgba(0,255,163,0.12)]';
  const classes = className ? `${baseClasses} ${className}` : baseClasses;

  return <span className={classes} aria-hidden />;
}
