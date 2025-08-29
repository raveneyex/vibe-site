// Section icons sized for card usage (square-ish area)

export const ProCardSVG = () => (
  <svg viewBox="0 0 180 140" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="proCardG" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#2de2e6" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#00ffa3" stopOpacity="0.7" />
      </linearGradient>
    </defs>
    <g transform="translate(90,70)" fill="none" stroke="url(#proCardG)" strokeWidth="2">
      <rect x="-70" y="-40" width="140" height="80" rx="10" />
      <path d="M -70 -20 H 70" />
      <circle cx="-56" cy="-28" r="4" />
      <circle cx="-44" cy="-28" r="4" />
      <circle cx="-32" cy="-28" r="4" />
      <path d="M -24 0 L -8 -10" />
      <path d="M -24 0 L -8 10" />
      <path d="M  24 0 L  8 -10" />
      <path d="M  24 0 L  8  10" />
      <path d="M 0 -14 V 12" opacity="0.8" />
      <polyline points="-52,24 -40,10 -28,18 -16,4 -4,8 8,2 20,10 32,0 44,6 56,2" opacity="0.85" />
    </g>
  </svg>
);

export const MagickCardSVG = () => (
  <svg viewBox="0 0 180 140" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(90,65)" fill="none" stroke="#a855f7" strokeWidth="2">
      <circle r="14" opacity="0.9" />
      <circle r="40" opacity="0.6" />
      <circle r="62" opacity="0.35" />
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={i} x1="0" y1="0" x2={Math.cos((i * Math.PI) / 6) * 62} y2={Math.sin((i * Math.PI) / 6) * 62} opacity="0.5" />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <circle key={i} cx={Math.cos((i * Math.PI) / 4) * 78} cy={Math.sin((i * Math.PI) / 4) * 78} r="3" fill="#a855f7" stroke="none" opacity="0.8" />
      ))}
    </g>
  </svg>
);

export const TattooCardSVG = () => (
  <svg viewBox="0 0 180 140" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(90,55)" fill="none" stroke="#ff2a6d" strokeWidth="2" strokeLinecap="round">
      {/* concentric sigil */}
      <circle r="42" opacity="0.95" />
      <circle r="18" opacity="0.95" />
      {Array.from({ length: 8 }).map((_, i) => (
        <circle key={i} cx={Math.cos((i * Math.PI) / 4) * 52} cy={Math.sin((i * Math.PI) / 4) * 52} r="2.4" fill="#ff2a6d" stroke="none" opacity="0.95" />
      ))}
      <path d="M -12 0 L 12 0 M 0 -12 L 0 12" />
      {/* needle: cyan body + tip */}
      <path d="M -2 12 L 2 12 L 2 60 L -2 60 Z" fill="#ff2a6d" stroke="none" />
      <path d="M -5 60 L 5 60 L 0 76 Z" fill="#ff2a6d" stroke="none" />
      <path d="M -3 76 L -3 88" />
      <path d="M  0 76 L  0 88" />
      <path d="M  3 76 L  3 88" />
    </g>
  </svg>
);

export default {};
