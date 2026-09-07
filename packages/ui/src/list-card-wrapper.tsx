import React from 'react';

export interface ListCardWrapperProps {
  /** Accepts a collection of nested list-card items or related content */
  children: React.ReactNode;
  /** Optional background image path (e.g. '/parchment.jpg') */
  bgImageUrl?: string;
  /** Optional extra classes for structural layout sizing */
  className?: string;
}

export const ListCardWrapper: React.FC<ListCardWrapperProps> = ({
  children,
  bgImageUrl,
  className = '',
}) => {
  const inlineStyles: React.CSSProperties = {
    backgroundColor: 'transparent',
    borderColor: 'var(--color-wolf-border)',
    color: 'var(--color-wolf-text)',
    ...(bgImageUrl && { backgroundImage: `url('${bgImageUrl}')` }),
  };

  return (
    /* Added relative position container constraints to accurately lock down child bounds */
    <div
      className={`relative rounded-none border p-6 flex flex-col gap-6 w-full ${
        bgImageUrl ? 'bg-cover bg-no-repeat bg-center' : ''
      } ${className}`}
      style={inlineStyles}
    >
      {/* Dark mode overlay layer: transitions transparent asset masks during light mode, applies a 40% shade on dark */}
      {bgImageUrl && (
        <div 
          className="absolute inset-0 z-0 bg-transparent dark:bg-black/40 pointer-events-none transition-colors duration-200" 
        />
      )}

      {/* Content wrapper: forces content text nodes safely above our background texture and dark overlay layer */}
      <div className="relative z-10 flex flex-col gap-6 w-full">
        {children}
      </div>
    </div>
  );
};
