import React from 'react';

export type ImageAlignment =
  | 'upper-left'
  | 'upper-right'
  | 'center-left'
  | 'center-right'
  | 'lower-left'
  | 'lower-right';

export type MobileImagePosition = 'top' | 'bottom';

export interface ImageWrapCardProps {
  heading: string;
  bodyText: string;
  imageUrl: string;
  imageAlt?: string;
  imageAlignment: ImageAlignment;
  mobileImagePosition?: MobileImagePosition;
  maxImageWidth?: string;
}

export const ImageWrapCard: React.FC<ImageWrapCardProps> = ({
  heading,
  bodyText,
  imageUrl,
  imageAlt = 'Card Image',
  imageAlignment,
  mobileImagePosition = 'bottom', // Defaults to bottom on mobile layouts
  maxImageWidth = 'w-40'
}) => {

  // Desktop Float Alignments
  const getDesktopAlignmentClasses = (): string => {
    switch (imageAlignment) {
      case 'upper-left': return 'float-left mr-4 mb-2';
      case 'upper-right': return 'float-right ml-4 mb-2';
      case 'center-left': return 'float-left mr-4 my-2';
      case 'center-right': return 'float-right ml-4 my-2';
      case 'lower-left': return 'float-left mr-4 mt-2';
      case 'lower-right': return 'float-right ml-4 mt-2';
      default: return 'float-left mr-4 mb-2';
    }
  };

  const desktopImgClasses = `${maxImageWidth} h-auto rounded-lg object-cover ${getDesktopAlignmentClasses()}`;

  // Mobile Flexbox Image Ordering Styles
  const mobileContainerClasses = `block md:hidden flex flex-col gap-4 ${mobileImagePosition === 'top' ? 'flex-col-reverse justify-end' : 'flex-col'
    }`;

  const renderDesktopContent = () => {
    const imageElement = (
      <img
        src={imageUrl}
        alt={imageAlt}
        className={desktopImgClasses}
      />
    );

    if (imageAlignment === 'center-left' || imageAlignment === 'center-right') {
      const midPoint = Math.floor(bodyText.length / 2);
      const splitIndex = bodyText.lastIndexOf(' ', midPoint);

      if (splitIndex !== -1) {
        const firstHalf = bodyText.substring(0, splitIndex);
        const secondHalf = bodyText.substring(splitIndex);

        return (
          <>
            {firstHalf}
            {imageElement}
            {secondHalf}
          </>
        );
      }
    }

    if (imageAlignment === 'lower-left' || imageAlignment === 'lower-right') {
      return (
        <>
          {bodyText}
          {imageElement}
        </>
      );
    }

    return (
      <>
        {imageElement}
        {bodyText}
      </>
    );
  };

  return (
    <div
      className="rounded-xl border p-6 transition-shadow duration-200"
      style={{
        backgroundColor: 'var(--color-wolf-card)',
        borderColor: 'var(--color-wolf-border)',
        color: 'var(--color-wolf-text)'
      }}
    >
      <h3 className="text-xl font-bold tracking-tight mb-4">{heading}</h3>

      {/* MOBILE ONLY VIEWPORT CONTAINER (Continuous Text Flow) */}
      <div className={mobileContainerClasses}>
        <p className="whitespace-pre-line text-sm leading-relaxed opacity-90">
          {bodyText}
        </p>

        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full max-w-xs h-auto rounded-lg object-cover self-center"
        />
      </div>

      {/* DESKTOP ONLY VIEWPORT CONTAINER (Magazine Inline Text Wrap) */}
      <div className="hidden md:block whitespace-pre-line text-sm leading-relaxed opacity-90 clear-both">
        {renderDesktopContent()}
      </div>

    </div>
  );
};
