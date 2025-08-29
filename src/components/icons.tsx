import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

export const ReactIcon = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="1.6" fill="currentColor" />
    <g stroke="currentColor" strokeWidth="1.2" fill="none">
      <ellipse cx="12" cy="12" rx="10" ry="4.5"/>
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)"/>
    </g>
  </svg>
);

export const TypeScriptIcon = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="24" height="24" rx="3" className="opacity-20"/>
    <path d="M6 8h12v2h-5v8h-2v-8H6V8Zm11.6 8.8c-.9 0-1.7-.4-2.3-1.1l1.2-1.2c.3.4.7.6 1.1.6.5 0 .9-.3.9-.7 0-.3-.2-.5-.6-.6l-.7-.2c-1.1-.3-1.7-1-1.7-2s.8-1.9 2.1-2c.9 0 1.6.3 2.2.9l-1.1 1.2c-.3-.3-.6-.4-1-.4-.4 0-.8.2-.8.6 0 .3.2.5.6.6l.7.2c1.1.3 1.8 1 1.8 2.1 0 1.3-1 2.1-2.4 2.1Z"/>
  </svg>
);

export const TailwindIcon = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 6c-3 0-4.5 1.5-5 4 1-1 2-1.5 3-1.5 1.3 0 2.2.7 3 2 1-3 3-4.5 6-4.5 3 0 4.5 1.5 5 4-1-1-2-1.5-3-1.5-1.3 0-2.2.7-3 2-1-3-3-4.5-6-4.5Z" fill="currentColor" opacity=".8"/>
    <path d="M1 13.5c1-1 2-1.5 3-1.5 1.3 0 2.2.7 3 2 1-3 3-4.5 6-4.5 3 0 4.5 1.5 5 4-1-1-2-1.5-3-1.5-1.3 0-2.2.7-3 2-1-3-3-4.5-6-4.5-3 0-4.5 1.5-5 4Z" fill="currentColor" opacity=".6"/>
  </svg>
);

export const NodeIcon = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
    <path d="M8 12c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v1c0 1.1-.9 2-2 2h-2" stroke="currentColor" strokeWidth="1.2"/>
  </svg>
);

export const TestingIcon = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M7 3h10M9 3v9a3 3 0 1 0 6 0V3" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M6 20l4-4 3 3 5-6" stroke="currentColor" strokeWidth="1.2"/>
  </svg>
);

export const ViteIcon = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="v1" x1="0" x2="1">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.9"/>
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.5"/>
      </linearGradient>
    </defs>
    <path d="M12 2l9 4-9 16L3 6l9-4Z" fill="url(#v1)" opacity="0.6"/>
    <path d="M12 5l5 2-5 9-5-9 5-2Z" fill="currentColor" opacity="0.9"/>
  </svg>
);

export const RouterIcon = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M4 18h16M6 14h8m-8-4h12" stroke="currentColor" strokeWidth="1.2"/>
    <circle cx="6" cy="18" r="1" fill="currentColor"/>
    <circle cx="10" cy="18" r="1" fill="currentColor"/>
    <circle cx="14" cy="18" r="1" fill="currentColor"/>
  </svg>
);

export const ReduxIcon = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g stroke="currentColor" strokeWidth="1.1" fill="none" opacity="0.9">
      <path d="M12 5c-2.6 0-4.3 1.5-5.2 3.3M7 15.5c1.2 2.1 3.5 3.5 5.8 3.5 3.2 0 5.8-2.6 5.8-5.8 0-1.7-.8-3.2-2-4.3"/>
      <path d="M7.2 8.5c-.8.7-1.3 1.8-1.3 2.9 0 1.9 1.2 3.5 2.9 4.2m2-9c1.3.4 2.5 1.3 3.3 2.6 1.3 2.2 1.2 4.7-.1 6.7"/>
    </g>
    <circle cx="7.5" cy="8.5" r="1.2" fill="currentColor"/>
    <circle cx="16.5" cy="9.5" r="1.2" fill="currentColor"/>
    <circle cx="12" cy="17" r="1.2" fill="currentColor"/>
  </svg>
);

export const VitestIcon = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 2l9 5v10l-9 5-9-5V7l9-5Z" stroke="currentColor" strokeWidth="1.1" fill="none"/>
    <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CypressIcon = ({ size = 24, ...props }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.1" fill="none"/>
    <path d="M9 12.5c0-1.9 1.6-3.5 3.5-3.5.6 0 1.2.2 1.7.4" stroke="currentColor" strokeWidth="1.1"/>
    <path d="M15 10v4.2c0 1 .8 1.8 1.8 1.8" stroke="currentColor" strokeWidth="1.1"/>
  </svg>
);

export default {};
