import React from 'react';

export interface PageHeaderProps {
  title: string;
  description: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div className="flex w-full justify-center px-6 pt-6 pb-4">
      <div className="w-full max-w-4xl text-left">
        <header className="border-b pb-8" style={{ borderColor: 'var(--color-wolf-border)' }}>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-base opacity-70">
            {description}
          </p>
        </header>
      </div>
    </div>
  );
};
