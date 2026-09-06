import React from 'react';

export type ListCardColumn =
  | { type: 'image'; url: string; alt?: string; className?: string }
  | {
      type: 'text';
      numberHeader?: string;
      title: string;
      paragraph: string;
      button?: { text: string; onClick: () => void; className?: string };
    };

export interface ListCardProps {
  col1?: ListCardColumn;
  col2?: ListCardColumn;
}

export const ListCard: React.FC<ListCardProps> = ({ col1, col2 }) => {
  const hasCol1 = !!col1;
  const hasCol2 = !!col2;
  const totalCols = [col1, col2].filter(Boolean).length;

  if (totalCols === 0) return null;

// Inside packages/ui/src/list-card.tsx -> within the renderColumn helper:

  const renderColumn = (col: ListCardColumn) => {
    if (col.type === 'image') {
      return (
        /* Added hidden to completely remove from mobile, md:flex restores it on desktop */
        <div className="hidden md:flex w-full h-full items-center justify-center overflow-hidden rounded-none">
          <img
            src={col.url}
            alt={col.alt || 'List feature image'}
            className={`w-full h-64 object-cover rounded-none transition-transform duration-300 hover:scale-[1.01] ${col.className || ''}`}
          />
        </div>
      );
    }

    if (col.type === 'text') {
      return (
        <div className="flex flex-col md:flex-row md:items-start gap-4 w-full py-2">
          {col.numberHeader && (
            <span 
              className="text-2xl font-bold font-mono shrink-0 leading-none"
              style={{ color: 'var(--color-wolf-text)' }}
            >
              {col.numberHeader}
            </span>
          )}
          <div className="flex-1 flex flex-col gap-3">
            <h3 className="text-xl font-bold tracking-tight leading-tight">
              {col.title}
            </h3>
            <p className="whitespace-pre-line text-sm leading-relaxed opacity-90">
              {col.paragraph}
            </p>
            {col.button && (
              <div className="pt-1">
                <button
                  onClick={col.button.onClick}
                  className={`px-4 py-2 text-sm font-semibold border rounded-none bg-transparent transition-colors duration-200 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 ${col.button.className || ''}`}
                  style={{ borderColor: 'var(--color-wolf-border)' }}
                >
                  {col.button.text}
                </button>
              </div>
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className={`w-full bg-transparent border-none rounded-none grid grid-cols-1 gap-6 items-center
        ${totalCols === 2 ? 'md:grid-cols-2' : ''}
      `}
      style={{ color: 'var(--color-wolf-text)' }}
    >
      {hasCol1 && <div className="w-full">{renderColumn(col1)}</div>}
      {hasCol2 && <div className="w-full">{renderColumn(col2)}</div>}
    </div>
  );
};
