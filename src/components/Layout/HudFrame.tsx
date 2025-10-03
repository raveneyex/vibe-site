import type React from 'react';
import clsx from 'clsx';

type Props = {
  accent?: 'cyan' | 'magenta' | 'purple';
  className?: string;
  children: React.ReactNode;
};

export default function HudFrame({ accent = 'cyan', className = '', children }: Props) {
  const accentClass = accent === 'cyan' ? 'hud-cyan' : accent === 'magenta' ? 'hud-magenta' : 'hud-purple';
  const borderClass = accent === 'cyan' ? 'glass-border-cyan' : accent === 'magenta' ? 'glass-border-magenta' : 'glass-border-purple';
  return (
    <div
      className={clsx('hud', accentClass, 'glass', borderClass, 'rounded-xl', className)}
    >
      <span aria-hidden="true" className="corner tl" />
      <span aria-hidden="true" className="corner tr" />
      <span aria-hidden="true" className="corner bl" />
      <span aria-hidden="true" className="corner br" />
      {children}
    </div>
  );
}
