import HudFrame from "./HudFrame";

export enum NavCardVariant {
  Cyan = 'cyan',
  Purple = 'purple',
  Magenta = 'magenta'
}

interface NavCardProps {
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  logo: React.ReactNode
  variant: NavCardVariant,
  text: string;
  subtitle: string;
  cta: string;
  ariaLabel?: string;
  className?: string;

}

export default function NavCard(props: NavCardProps) {
  const {onClick, onMouseEnter, onMouseLeave, logo, variant, text, subtitle, cta, ariaLabel, className} = props;

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onMouseEnter}
      onBlur={onMouseLeave}
      className={className}
      aria-label={ariaLabel}
    >
      <HudFrame accent={variant} className={`p-5 h-full flex flex-col items-stretch justify-between glass-border-${variant}-pure`}>
        <div className="text-slate-300">
          <div className={`w-full mb-3 text-neon-${variant}/90`} aria-hidden="true">{logo}</div>
          <h3 className="text-lg font-semibold tracking-wide mb-1 neon-text-cyan">{text}</h3>
          <p className={`text-sm text-neon-${variant}`}>{subtitle}</p>
        </div>
        <div className={`mt-4 text-xs font-mono text-neon-${variant}`}>[ {cta} ▸]</div>
      </HudFrame>
    </button>
  )

}