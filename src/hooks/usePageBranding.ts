import { useEffect } from 'react';
import { setMeta } from '@/utils/meta';

interface PageBrandingOptions {
  tint: string;
  crtRgb: string;
  title: string;
  description: string;
}

export default function usePageBranding({ tint, crtRgb, title, description }: PageBrandingOptions) {
  useEffect(() => {
    document.documentElement.style.setProperty('--tint', tint);
    document.documentElement.style.setProperty('--crt-rgb', crtRgb);
    setMeta(title, description);
  }, [tint, crtRgb, title, description]);
}
