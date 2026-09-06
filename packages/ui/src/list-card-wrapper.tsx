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
    <div
      className={`rounded-none border p-6 flex flex-col gap-6 w-full ${
        bgImageUrl ? 'bg-cover bg-no-repeat bg-center' : ''
      } ${className}`}
      style={inlineStyles}
    >
      {children}
    </div>
  );
};
