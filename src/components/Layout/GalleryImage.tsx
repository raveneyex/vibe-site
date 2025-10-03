import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

interface GalleryImageProps {
  src: string;
  alt: string;
  variant?: 'grid' | 'modal';
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
}

const variantClasses: Record<'grid' | 'modal', string> = {
  grid: 'aspect-square rounded-xl glass glass-border-magenta hover:neon-glow-magenta transition-shadow focus:outline-none focus-visible:focus-outline',
  modal: 'max-h-[80vh] rounded-3xl glass glass-border-magenta shadow-[0_0_42px_rgba(255,56,100,0.35)]',
};

const imageClasses = 'h-full w-full object-cover object-center';

function GalleryImage(props: GalleryImageProps) {
  const { src, alt, variant = 'grid', onClick } = props;
  const isInteractive = typeof onClick === 'function';
  const containerClasses = clsx('relative overflow-hidden outline-none', variantClasses[variant], {
    'cursor-pointer': isInteractive,
  });

  if (isInteractive) {
    return (
      <button type="button" onClick={onClick} className={containerClasses}>
        <img src={src} alt={alt} className={imageClasses} loading="lazy" />
      </button>
    );
  }

  return (
    <div className={containerClasses}>
      <img src={src} alt={alt} className={imageClasses} loading="lazy" />
    </div>
  );
}

export default GalleryImage;
