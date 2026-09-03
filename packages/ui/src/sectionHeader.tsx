import React from 'react';

export interface SectionHeaderProps {
  /** The main group title */
  title: string;
  /** Optional supporting description text displayed beneath the title */
  subtitle?: string;
  /** Optional visual divider line below the content */
  divider?: boolean;
  /** Custom overrides or spacing extensions */
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  divider = false,
  className = '',
}) => {
  return (
    <div 
      className={`w-full py-2 clear-both ${className}`}
      style={{ color: 'var(--color-wolf-text)' }}
    >
      <div className="flex flex-col gap-1">
        <h4 className="text-lg font-bold tracking-tight uppercase text-xs opacity-70 tracking-widest sm:text-sm md:text-base md:font-semibold md:tracking-normal md:normal-case">
          {title}
        </h4>
        
        {subtitle && (
          <p className="text-sm opacity-60 leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      {divider && (
        <hr 
          className="mt-4 border-t" 
          style={{ borderColor: 'var(--color-wolf-border)', opacity: 0.4 }} 
        />
      )}
    </div>
  );
};
