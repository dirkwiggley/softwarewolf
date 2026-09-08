'use client';

import React from 'react';
import Link from 'next/link';
import PageGuard from '../../PageGuard';
import { PageHeader } from '@softwarewolf/ui/page-header';
import { usePageTheme } from '../../hooks/usePageTheme';

export default function AdminDashboardPage() {
  const { backgroundClass, textClass, cardClass } = usePageTheme();
  const widthContainerClass = "w-full max-w-5xl mx-0 md:mx-auto md:w-[85%]";

  return (
    <PageGuard allowedRoles={['ADMIN', 'MANAGER']}>
      <div className={`w-full min-h-[calc(100vh-73px)] pb-12 transition-colors duration-200 ${backgroundClass} ${textClass}`}>
        <PageHeader
          title="Admin Operational Dashboard"
          description="High-level workspace matrices, project analytics, and metrics reporting charts."
        />

        <div className={`mt-6 ${widthContainerClass} px-4 md:px-0 flex flex-col gap-6`}>
          <div className={`p-8 border rounded-xl shadow-md text-center ${cardClass}`}>
            <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold mb-4 text-xl">🔨</div>
            <h2 className="text-xl font-bold tracking-tight mb-2">Module Under Construction</h2>
            <p className="text-sm opacity-70 max-w-md mx-auto mb-6 leading-relaxed">
              We are compiling automated charts, system graph tracking metrics, and user workflow auditing tools for this command dashboard workspace layer.
            </p>
            <div className="w-full max-w-xs mx-auto h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-sky-600 animate-pulse" />
            </div>
          </div>

          <Link href="/admin-hub" className="inline-flex items-center text-sm font-medium text-sky-600 dark:text-sky-400 hover:opacity-80">
            ← Back to Admin Hub
          </Link>
        </div>
      </div>
    </PageGuard>
  );
}
