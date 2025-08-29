// JSX runtime handles import automatically

export function ProSVG() {
  // Professional — UI/code emblem fitted to the left/top wedge
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pro-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2de2e6" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#00ffa3" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {/* Anchor a small tilted window near the top-left so it stays within the triangle */}
      <g transform="translate(90,105) rotate(-12)" fill="none" stroke="url(#pro-g)" strokeWidth="1.6">
        {/* Window frame */}
        <rect x="-70" y="-48" width="160" height="100" rx="10" opacity="0.9" />
        {/* Title bar */}
        <path d="M -70 -30 H 90" opacity="0.9" />
        {/* Traffic lights */}
        <circle cx="-56" cy="-39" r="3" />
        <circle cx="-46" cy="-39" r="3" />
        <circle cx="-36" cy="-39" r="3" />
        {/* Code angle brackets */}
        <path d="M -30 -6 L -14 -16" />
        <path d="M -30  -6 L -14   4" />
        <path d="M  30  -6 L  14 -16" />
        <path d="M  30  -6 L  14   4" />
        {/* Cursor line */}
        <path d="M 0 -20 V 8" opacity="0.8" />
        {/* Mini chart */}
        <polyline points="-52,20 -42,14 -32,18 -22,8 -12,10 -2,6 8,12 18,4 28,8 38,2" opacity="0.85" />
      </g>
    </svg>
  );
}

export function MagickSVG() {
  // Designed for the RIGHT-TOP triangular region (slightly shifted right)
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="mglow"><feGaussianBlur stdDeviation="2.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      {/* anchor center in the top-right quadrant */}
      <g transform="translate(330,120)" fill="none" stroke="#ff2a6d" filter="url(#mglow)">
        <circle r="14" opacity="0.9" />
        <circle r="40" opacity="0.6" />
        <circle r="72" opacity="0.35" />
        {/* radial spokes */}
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1="0" y1="0" x2={Math.cos((i * Math.PI) / 6) * 72} y2={Math.sin((i * Math.PI) / 6) * 72} opacity="0.5" />
        ))}
        {/* outer arc glyphs */}
        {Array.from({ length: 8 }).map((_, i) => (
          <circle key={i} cx={Math.cos((i * Math.PI) / 4) * 100} cy={Math.sin((i * Math.PI) / 4) * 100} r="3" fill="#ff2a6d" stroke="none" opacity="0.8" />
        ))}
      </g>
      {/* diagonal rune along the clip boundary */}
      <g stroke="#ff2a6d" strokeOpacity="0.6">
        <path d="M 180 0 L 400 400" />
        <path d="M 260 20 l 14 20 l -18 10 l 12 18" opacity="0.6" />
      </g>
    </svg>
  );
}

export function TattooSVG() {
  // Option A — Sigil Needle Emblem (clear needle form) for the bottom triangle
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tat-g" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#00ffa3" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#2de2e6" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {/* Anchor near bottom center so it stays within the wedge */}
      <g transform="translate(200,310)" fill="none" stroke="url(#tat-g)" strokeLinecap="round">
        {/* Outer and inner rings */}
        <circle r="46" strokeWidth="1.6" opacity="0.95" />
        <circle r="20" strokeWidth="1.6" opacity="0.95" />
        {/* Rune dots around the outer ring */}
        {Array.from({ length: 8 }).map((_, i) => (
          <circle key={i} cx={Math.cos((i * Math.PI) / 4) * 56} cy={Math.sin((i * Math.PI) / 4) * 56} r="2.6" fill="#00ffa3" stroke="none" opacity="0.95" />
        ))}
        {/* Sigil cross within the inner ring */}
        <path d="M -14 0 L 14 0 M 0 -14 L 0 14" strokeWidth="1.6" opacity="0.95" />
        {/* Shaft: a slim rectangle for the needle body */}
        <path d="M -2 14 L 2 14 L 2 74 L -2 74 Z" fill="url(#tat-g)" stroke="none" />
        {/* Tapered tip as a sharp triangle */}
        <path d="M -5 74 L 5 74 L 0 92 Z" fill="url(#tat-g)" stroke="none" />
        {/* Multi-needle cluster lines for clarity */}
        <path d="M -3 92 L -3 102" strokeWidth="1.2" />
        <path d="M  0 92 L  0 102" strokeWidth="1.2" />
        <path d="M  3 92 L  3 102" strokeWidth="1.2" />
      </g>
      {/* Subtle grounding lines near the bottom */}
      <g stroke="#00ffa3" strokeOpacity="0.22">
        <path d="M 24 368 L 376 368" />
        <path d="M 0 352 L 400 352" />
      </g>
    </svg>
  );
}

export default {};
