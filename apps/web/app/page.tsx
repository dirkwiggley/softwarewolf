'use client';

import Link from 'next/link';
import PageGuard from './PageGuard';

export default function RootIndexPortalPage() {
  return (
    <PageGuard allowedRoles={['ADMIN', 'MANAGER']}>
      {/* Outer structural layout wrapper that covers the viewport width and centers its children horizontally */}
      <div className="flex w-full justify-center px-6 py-16">
        
        {/* Inner content box that maintains the strict left alignment format for your grid matrix */}
        <div className="w-full max-w-4xl text-left">
          
          {/* Header Branding Panel */}
          <header className="mb-12 border-b pb-8" style={{ borderColor: 'var(--color-wolf-border)' }}>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              SoftwareWolf Ecosystem
            </h1>
            <p className="mt-3 text-base opacity-70">
              Welcome to your centralized full-stack application command center and environment matrices.
            </p>
          </header>

          {/* Dynamic Section Matrix Layout */}
          <main className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            
            {/* Main User Workspace Module */}
            <section className="wolf-panel flex flex-col justify-between">
              <div>
                <div className="mb-4 inline-flex items-center">
                  <span className="role-badge-user">Workspace</span>
                </div>
                <h2 className="text-xl font-bold tracking-tight mb-2">Home Dashboard</h2>
                <p className="text-sm opacity-70 mb-6 leading-relaxed">
                  Access your personalized operational environment modules, workflows, and account settings.
                </p>
              </div>
              <Link href="/home" className="wolf-btn-primary w-full text-sm">
                Launch Dashboard →
              </Link>
            </section>

            {/* User Management Panel */}
            <section className="wolf-panel flex flex-col justify-between">
              <div>
                <div className="mb-4 inline-flex items-center">
                  <span className="role-badge-manager">Management</span>
                </div>
                <h2 className="text-xl font-bold tracking-tight mb-2">Identity Directory</h2>
                <p className="text-sm opacity-70 mb-6 leading-relaxed">
                  Administer user profiles, toggle permission vectors, and handle database identity credentials.
                </p>
              </div>
              <Link href="/users" className="wolf-btn-primary w-full text-sm">
                Open Directory →
              </Link>
            </section>

            {/* Infrastructure Control Panel (Locked exclusively to Admin) */}
            <section className="wolf-panel flex flex-col justify-between">
              <div>
                <div className="mb-4 inline-flex items-center">
                  <span className="role-badge-admin">Infrastructure</span>
                </div>
                <h2 className="text-xl font-bold tracking-tight mb-2">Control Room</h2>
                <p className="text-sm opacity-70 mb-6 leading-relaxed">
                  Monitor system metrics, review MariaDB logs, and synchronize structural layout parameters.
                </p>
              </div>
              <Link href="/dashboard" className="wolf-btn-primary w-full text-sm">
                Enter Control Room →
              </Link>
            </section>

            {/* Future General Content Shell Placeholder */}
            <section className="wolf-panel flex flex-col justify-between border-dashed" style={{ borderColor: 'var(--color-wolf-border)' }}>
              <div>
                <div className="mb-4 inline-flex items-center">
                  <span className="role-badge-guest">Public Access</span>
                </div>
                <h2 className="text-xl font-bold tracking-tight mb-2">Knowledge Base</h2>
                <p className="text-sm opacity-60 mb-6 leading-relaxed">
                  Universal content library, release notes, and ecosystem technical documentation. Coming soon.
                </p>
              </div>
              <div className="w-full text-center py-2 text-xs font-semibold uppercase tracking-wider opacity-40">
                Under Construction
              </div>
            </section>

          </main>
        </div>

      </div>
    </PageGuard>
  );
}
