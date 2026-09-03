'use client';

import Link from 'next/link';
import PageGuard from '../PageGuard';
import { PageHeader } from '@softwarewolf/ui/page-header';

export default function RootIndexPortalPage() {
  return (
    <PageGuard allowedRoles={['ADMIN', 'MANAGER']}>
      <PageHeader
        title="Admin Hub"
        description="Starting point for all things admin."
        center={true}
      />

      {/* Outer structural layout wrapper that covers the viewport width and centers its children horizontally */}
      <div className="flex w-full justify-center px-6 py-8">
        {/* Inner content box that maintains the strict left alignment format for the grid matrix */}
        <div className="w-full max-w-4xl text-left">

          {/* Dynamic Section Matrix Layout */}
          <main className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {/* Main User Workspace Module */}
            <section className="wolf-panel flex flex-col justify-between">
              <div>
                <div className="mb-4 inline-flex items-center">
                  <span className="role-badge-user">Workspace</span>
                </div>
                <h2 className="text-xl font-bold tracking-tight mb-2">Admin Dashboard</h2>
                <p className="text-sm opacity-70 mb-6 leading-relaxed">
                  Access your personalized operational environment modules, workflows, and account settings.
                </p>
              </div>
              <Link href="/admin-hub/dashboard" className="wolf-btn-primary w-full text-sm">
                Launch Dashboard (Under Construction)→
              </Link>
            </section>

            {/* User Management Panel */}
            <section className="wolf-panel flex flex-col justify-between">
              <div>
                <div className="mb-4 inline-flex items-center">
                  <span className="role-badge-manager">Management</span>
                </div>
                <h2 className="text-xl font-bold tracking-tight mb-2">User Admin</h2>
                <p className="text-sm opacity-70 mb-6 leading-relaxed">
                  Administer user profiles, set permissions, etc.
                </p>
              </div>
              <Link href="/admin-hub/users" className="wolf-btn-primary w-full text-sm">
                Open User Admin →
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
              <Link href="/admin-hub/control-room" className="wolf-btn-primary w-full text-sm">
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
