import { useMemo, useState } from 'react';
import HudFrame from '@/components/Layout/HudFrame';
import SkillChip from '@/components/Layout/SkillChip';
import GalleryImage from '@/components/Layout/GalleryImage';
import ImageModal from '@/components/Layout/ImageModal';
import { Link } from 'react-router-dom';
import data from '@/data.json';
import usePageBranding from '@/hooks/usePageBranding';
import useLabels from '@/hooks/useLabels';
import usePreferredLanguage from '@/hooks/usePreferredLanguage';
import type { LanguageCode } from '@/utils/language';

type TattooContent = {
  title: string;
  subtitle: string;
  metadata: {
    title: string;
    description: string;
  };
  highlights: {
    focus: string;
    approach: string;
    booking: string;
  };
  services: string[];
  instagramSpotlight: {
    description: string;
    cta: string;
  };
  interestsSection: {
    title: string;
    description: string;
    linkLabel: string;
  };
  interests: Array<{ title: string; description: string }>;
  booking: {
    title: string;
    description: string;
    ctaHint: string;
  };
  gallery: {
    title: string;
    description: string;
    tapHint: string;
    imageAltPrefix: string;
  };
};

const { links } = data;

export default function Tattoo() {
  const language = usePreferredLanguage();
  const labels = useLabels();
  const tattooLabels = labels.tattoo;
  const tattooTranslations = data.tattoo.translations as Record<LanguageCode, TattooContent>;
  const tattooData = tattooTranslations[language] ?? tattooTranslations.en;
  const [bookingBefore, bookingAfter = ''] = tattooData.booking.description.split('{handle}');
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const galleryImages = useMemo(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        id: index + 1,
        src: `https://picsum.photos/seed/tattoo-${index + 1}/900/900`,
        alt: `${tattooData.gallery.imageAltPrefix} ${index + 1}`,
      })),
    [tattooData.gallery.imageAltPrefix],
  );
  const selectedImage = selectedImageId
    ? galleryImages.find((image) => image.id === selectedImageId) ?? null
    : null;
  const instagramLinkLabel = tattooData.interestsSection.linkLabel.replace('{handle}', links.instagram.handle);
  const interests = tattooData.interests;

  usePageBranding({
    tint: 'rgba(255,56,100,0.14)',
    crtRgb: '255,56,100',
    title: tattooData.metadata.title,
    description: tattooData.metadata.description,
  });

  const handleImageOpen = (id: number) => setSelectedImageId(id);
  const handleImageClose = () => setSelectedImageId(null);

  return (
    <section className="mx-auto max-w-5xl space-y-12 pb-16 font-sans">
      <header className="relative flex items-end justify-between gap-4 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-wide text-slate-100 neon-text-magenta">{tattooData.title}</h1>
          <p className="mt-2 max-w-3xl text-slate-300">{tattooData.subtitle}</p>
        </div>
        <Link to="/" className="font-mono text-sm text-slate-300 neo-link focus:outline-none focus-visible:focus-outline">
          {labels.shared.backToNexus}
        </Link>
        <div className="absolute left-0 right-0 -bottom-px h-px bg-gradient-to-r from-transparent via-neon-magenta/50 to-transparent" aria-hidden="true"></div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.15fr,0.85fr]">
        <HudFrame accent="magenta" className="p-6 glass-border-magenta">
          <div className="grid gap-4 text-sm text-slate-300 sm:grid-cols-3">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400">{tattooLabels.highlights.focus}</div>
              <div className="font-mono">{tattooData.highlights.focus}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400">{tattooLabels.highlights.approach}</div>
              <div className="font-mono">{tattooData.highlights.approach}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400">{tattooLabels.highlights.booking}</div>
              <div className="font-mono">{tattooData.highlights.booking}</div>
            </div>
          </div>
          <div className="mt-5 tick-divider-magenta" aria-hidden="true"></div>
          <div className="mt-5 flex flex-wrap gap-2">
            {tattooData.services.map((service) => (
              <SkillChip key={service} label={service} accent="magenta" />
            ))}
          </div>
        </HudFrame>

        <HudFrame accent="magenta" className="relative overflow-hidden p-6 glass-border-magenta">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.18] bg-[radial-gradient(circle_at_top,rgba(255,56,100,0.35),transparent_60%)]"
          />
          <div className="relative flex h-full flex-col justify-between gap-6 text-slate-200">
            <div>
              <span className="text-[10px] uppercase tracking-[0.45em] text-slate-400">{tattooLabels.instagramSpotlight.label}</span>
              <h2 className="mt-2 text-2xl font-semibold tracking-wide text-slate-100 neon-text-magenta">@{links.instagram.handle?.replace('@', '')}</h2>
              <p className="mt-3 text-sm text-slate-300">{tattooData.instagramSpotlight.description}</p>
            </div>
            <a
              href={links.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-neon-magenta/70 px-5 py-2 font-mono text-xs uppercase tracking-[0.35em] text-neon-magenta transition hover:border-neon-magenta hover:bg-neon-magenta/10"
            >
              {tattooData.instagramSpotlight.cta}
            </a>
          </div>
        </HudFrame>
      </section>

      <section className="space-y-6">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-100">{tattooData.interestsSection.title}</h2>
            <p className="text-sm text-slate-300/80">{tattooData.interestsSection.description}</p>
          </div>
          <a
            href={links.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-[0.4em] text-neon-magenta/80 transition hover:text-neon-magenta"
          >
            {instagramLinkLabel}
          </a>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {interests.map((interest) => (
            <article key={interest.title} className="rounded-xl border border-neon-magenta/25 bg-noir-800/60 p-5 shadow-[0_0_28px_rgba(255,42,109,0.12)]">
              <h3 className="text-lg font-semibold text-slate-100">{interest.title}</h3>
              <p className="mt-2 text-sm text-slate-300/90">{interest.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-neon-magenta/40 bg-noir-800/60 p-8 text-center shadow-[0_0_64px_rgba(255,56,100,0.25)]">
        <h2 className="text-2xl font-semibold text-slate-100">{tattooData.booking.title}</h2>
        <p className="mt-3 text-base leading-relaxed text-slate-300">
          {bookingBefore}
          <a
            href={links.instagram.url}
            className="underline decoration-dotted underline-offset-4 neo-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {links.instagram.handle}
          </a>
          {bookingAfter}
        </p>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.4em] text-neon-magenta">{tattooData.booking.ctaHint}</p>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-100">{tattooData.gallery.title}</h2>
            <p className="text-sm text-slate-300/80">{tattooData.gallery.description}</p>
          </div>
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.45em] text-neon-magenta/70">{tattooData.gallery.tapHint}</span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((image) => (
            <GalleryImage
              key={image.id}
              src={image.src}
              alt={image.alt}
              onClick={() => handleImageOpen(image.id)}
            />
          ))}
        </div>
      </section>

      <ImageModal isOpen={Boolean(selectedImage)} onClose={handleImageClose} caption={selectedImage?.alt}>
        {selectedImage ? <GalleryImage src={selectedImage.src} alt={selectedImage.alt} variant="modal" /> : null}
      </ImageModal>
    </section>
  );
}
