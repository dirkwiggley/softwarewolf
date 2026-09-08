'use client';

import { usePathname } from 'next/navigation';
import { useSecurity } from '../SecurityContext';

export interface PageTheme {
  backgroundClass: string;
  textClass: string;
  combined: string;
  cardClass: string; // New variable ensuring card components look correct in default zones
}

export function usePageTheme(): PageTheme {
  const pathname = usePathname();
  const { theme } = useSecurity();
  const isDark = theme === 'dark';

  // 1. Admin Section
  if (pathname.startsWith('/admin-hub')) {
    return {
      backgroundClass: isDark ? 'bg-slate-950' : 'bg-slate-50',
      textClass: isDark ? 'text-slate-100' : 'text-slate-900',
      combined: isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900',
      cardClass: isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200',
    };
  }

  // 2. Everward Campaign Section
  if (pathname.startsWith('/home/campaigns/everward')) {
    return {
      backgroundClass: isDark ? 'bg-amber-950' : 'bg-amber-100',
      textClass: isDark ? 'text-amber-100' : 'text-slate-900',
      combined: isDark ? 'bg-amber-950 text-amber-100' : 'bg-amber-100 text-slate-900',
      cardClass: 'bg-wolf-panel border-wolf-panel',
    };
  }

  // 3. Pirates Campaign Section
  if (pathname.startsWith('/home/campaigns/pirates')) {
    return {
      backgroundClass: isDark ? 'bg-slate-950' : 'bg-stone-100',
      textClass: isDark ? 'text-teal-100' : 'text-stone-900',
      combined: isDark ? 'bg-slate-950 text-teal-100' : 'bg-stone-100 text-stone-900',
      cardClass: isDark ? 'bg-slate-900/40 border-teal-900/20' : 'bg-white/80 border-stone-200',
    };
  }

  // 4. REFACORED DEFAULT THEME (Applies to Profile, Login, Home, etc.)
  return {
    backgroundClass: isDark ? 'bg-slate-950' : 'bg-slate-50', // Soft off-white gray for contrast
    textClass: isDark ? 'text-slate-100' : 'text-slate-900',
    combined: isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900',
    cardClass: isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200', // Solid floating panels
  };
}
