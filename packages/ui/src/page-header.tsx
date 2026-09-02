import React from 'react';

export interface PageHeaderProps {
  title: string;
  description: React.ReactNode; // Updated from 'string' to support HTML / React elements
  center?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, center = false }) => {
  return (
    <div className="flex w-full justify-center px-6 pt-6 pb-4">
      <div className={`w-full max-w-4xl ${center ? 'text-center' : 'text-left'}`}>
        <header className="border-b pb-8" style={{ borderColor: 'var(--color-wolf-border)' }}>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <div className="mt-3 text-base opacity-70">
            {description}
          </div>
        </header>
      </div>
    </div>
  );
};
