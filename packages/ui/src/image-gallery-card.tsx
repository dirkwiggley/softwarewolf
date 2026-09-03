import React from 'react';

export interface GalleryImage {
  url: string;
  alt?: string;
}

export interface ImageGalleryCardProps {
  /** Card heading text */
  heading: string;
  /** Body text supporting the gallery */
  bodyText: string;
  /** Array of images to display in the bottom grid slot */
  images: GalleryImage[];
  /** Maximum number of grid columns on desktop viewports (Defaults to 3) */
  columns?: 1 | 2 | 3 | 4;
}

export const ImageGalleryCard: React.FC<ImageGalleryCardProps> = ({
  heading,
  bodyText,
  images,
  columns = 3,
}) => {
  // Map dynamic column props neatly to Tailwind responsive grid layouts
  const gridColClasses = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  }[columns];

  return (
    <div
      className="rounded-xl border p-6 transition-shadow duration-200 flex flex-col gap-6"
      style={{
        backgroundColor: 'var(--color-wolf-card)',
        borderColor: 'var(--color-wolf-border)',
        color: 'var(--color-wolf-text)',
      }}
    >
      {/* Text Area Content Layout Block */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold tracking-tight">{heading}</h3>
        <p className="whitespace-pre-line text-sm leading-relaxed opacity-90">
          {bodyText}
        </p>
      </div>

      {/* Media Grid Wrapper - Locked strictly to bottom for both mobile and desktop views */}
      {images.length > 0 && (
        <div className={`grid grid-cols-1 gap-4 w-full ${gridColClasses}`}>
          {images.map((img, idx) => (
            <div key={idx} className="overflow-hidden rounded-lg bg-black/5">
              <img
                src={img.url}
                alt={img.alt || `Gallery image ${idx + 1}`}
                className="w-full h-48 object-cover rounded-lg transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
