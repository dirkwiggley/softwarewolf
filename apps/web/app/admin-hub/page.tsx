'use client';

import Link from 'next/link';
import PageGuard from '../PageGuard';
import { PageHeader } from '@softwarewolf/ui/page-header';
import { usePageTheme } from '../hooks/usePageTheme'; // Import custom theme hook

export default function RootIndexPortalPage() {
  // Consume your dynamic theme mapping styles
  const { backgroundClass, textClass, cardClass } = usePageTheme();

  return (
    <PageGuard allowedRoles={['ADMIN', 'MANAGER']}>
      {/* 
        min-h-[calc(100vh-73px)]: Keeps background bound to precise navbar height
        backgroundClass / textClass: Delivers standard high-contrast admin dashboard surfaces 
      */}
      <div className={`w-full min-h-[calc(100vh-73px)] transition-colors duration-200 ${backgroundClass} ${textClass}`}>
        
        <PageHeader
          title="Admin Hub"
          description="Starting point for all things admin."
          center={true}
        />

        {/* Outer structural layout wrapper */}
        <div className="flex w-full justify-center px-6 py-8">
          {/* Inner content box */}
          <div className="w-full max-w-4xl text-left">

            {/* Dynamic Section Matrix Layout */}
            <main className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {/* Main User Workspace Module */}
              <section className={`flex flex-col justify-between p-6 border rounded-xl shadow-md ${cardClass}`}>
                <div>
                  <div className="mb-4 inline-flex items-center">
                    <span className="role-badge-user">Workspace</span>
                  </div>
                  <h2 className="text-xl font-bold tracking-tight mb-2">Admin Dashboard</h2>
                  <p className="text-sm opacity-70 mb-6 leading-relaxed">
                    Access your personalized operational environment modules, workflows, and account settings.
                  </p>
                </div>
                <Link href="/admin-hub/dashboard" className="w-full text-center py-2.5 text-sm font-semibold rounded-lg bg-sky-600 hover:bg-sky-700 text-white shadow-sm transition-colors duration-150 cursor-pointer">
                  Launch Dashboard
                </Link>
              </section>

              {/* User Management Panel */}
              <section className={`flex flex-col justify-between p-6 border rounded-xl shadow-md ${cardClass}`}>
                <div>
                  <div className="mb-4 inline-flex items-center">
                    <span className="role-badge-manager">Management</span>
                  </div>
                  <h2 className="text-xl font-bold tracking-tight mb-2">User Admin</h2>
                  <p className="text-sm opacity-70 mb-6 leading-relaxed">
                    Administer user profiles, set permissions, etc.
                  </p>
                </div>
                <Link href="/admin-hub/users" className="w-full text-center py-2.5 text-sm font-semibold rounded-lg bg-sky-600 hover:bg-sky-700 text-white shadow-sm transition-colors duration-150 cursor-pointer">
                  Open User Admin →
                </Link>
              </section>

              {/* Infrastructure Control Panel */}
              <section className={`flex flex-col justify-between p-6 border rounded-xl shadow-md ${cardClass}`}>
                <div>
                  <div className="mb-4 inline-flex items-center">
                    <span className="role-badge-admin">Infrastructure</span>
                  </div>
                  <h2 className="text-xl font-bold tracking-tight mb-2">Control Room</h2>
                  <p className="text-sm opacity-70 mb-6 leading-relaxed">
                    Monitor system metrics, review MariaDB logs, and synchronize structural layout parameters.
                  </p>
                </div>
                <Link href="/admin-hub/control-room" className="w-full text-center py-2.5 text-sm font-semibold rounded-lg bg-sky-600 hover:bg-sky-700 text-white shadow-sm transition-colors duration-150 cursor-pointer">
                  Enter Control Room →
                </Link>
              </section>

              {/* Future General Content Shell Placeholder */}
              <section className={`flex flex-col justify-between p-6 border border-dashed rounded-xl shadow-sm border-slate-300 dark:border-slate-800 ${cardClass}`}>
                <div>
                  <div className="mb-4 inline-flex items-center">
                    <span className="role-badge-guest">Public Access</span>
                  </div>
                  <h2 className="text-xl font-bold tracking-tight mb-2">Knowledge Base</h2>
                  <p className="text-sm opacity-60 mb-6 leading-relaxed">
                    Universal content library, release notes, and ecosystem technical documentation. Coming soon.
                  </p>
                </div>
                <div className="w-full text-center py-2.5 text-xs font-semibold uppercase tracking-wider opacity-40 border border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-950/50 rounded-lg">
                  Under Construction
                </div>
              </section>

            </main>
          </div>
        </div>

      </div>
    </PageGuard>
  );
}
