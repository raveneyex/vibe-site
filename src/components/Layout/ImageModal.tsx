import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  caption?: string;
}

function ImageModal(props: ImageModalProps) {
  const { isOpen, onClose, children, caption } = props;

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-noir-900/90 px-4 py-10 backdrop-blur">
      <button
        type="button"
        aria-label="Close image"
        className="absolute inset-0 h-full w-full cursor-zoom-out bg-transparent"
        onClick={onClose}
      />
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-4">
        <button
          type="button"
          onClick={onClose}
          className="group absolute -top-12 right-0 rounded-full border border-neon-magenta/60 bg-noir-900/60 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-200/70 transition hover:border-neon-magenta hover:text-slate-100"
        >
          Close ×
        </button>
        {children}
        {caption ? (
          <p className="max-w-xl text-center text-sm text-slate-300/80">{caption}</p>
        ) : null}
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
}

export default ImageModal;
