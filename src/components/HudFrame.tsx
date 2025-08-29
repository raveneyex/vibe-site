import React from 'react';

type Props = {
  accent?: 'cyan' | 'magenta';
  className?: string;
  children: React.ReactNode;
};

export default function HudFrame({ accent = 'cyan', className = '', children }: Props) {
  const accentClass = accent === 'cyan' ? 'hud-cyan' : 'hud-magenta';
  const borderClass = accent === 'cyan' ? 'glass-border-cyan' : 'glass-border-magenta';
  return (
    <div className={`hud ${accentClass} glass ${borderClass} scan-sweep rounded-xl ${className}`}>
      <span aria-hidden className="corner tl" />
      <span aria-hidden className="corner tr" />
      <span aria-hidden className="corner bl" />
      <span aria-hidden className="corner br" />
      {children}
    </div>
  );
}

