'use client';

import React from 'react';
import Link from 'next/link';
import PageGuard from '../PageGuard';
import { useSecurity } from '../SecurityContext';
import { PageHeader } from '@softwarewolf/ui/page-header';

export default function HomeHubDashboard() {
  const { userProfile, logoutUser } = useSecurity();
  const userRole = userProfile?.role || 'GUEST';

  // Check if the current context possesses management permissions
  const hasManagementClearance = userRole === 'ADMIN' || userRole === 'MANAGER';

  // Map user role string securely to our theme utility badges
  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'role-badge-admin';
      case 'MANAGER': return 'role-badge-manager';
      case 'USER': return 'role-badge-user';
      default: return 'role-badge-guest';
    }
  };

  return (
    <PageGuard allowedRoles={['ADMIN', 'MANAGER', 'USER', 'GUEST']}>
      <PageHeader
        title="Admin Dashboard"
        description={
          <>
            Welcome back, <span className="font-semibold opacity-90">{userProfile?.displayName || 'Guest'}</span>
            <span className={`uppercase tracking-wider px-2.5 py-0.5 text-xs font-bold rounded-md ${getRoleBadgeClass(userRole)}`}>
              Scope: {userRole}
            </span>
          </>
        }
        center={true}
      />

      {/* Outer structural layout wrapper that covers the viewport width and centers its children horizontally */}
      <div className="flex w-full justify-center px-6 py-8">
        {/* Inner content box that maintains the strict left alignment format for your dashboard cards */}
        <div className="w-full max-w-3xl text-left">

          {/* Modular Workspace Dashboard Grid */}
          <main className={`grid grid-cols-1 gap-6 ${hasManagementClearance ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>

            {/* Summary Module Card 1: Conditionally Rendered for Management Personnel */}
            {hasManagementClearance && (
              <div className="wolf-panel flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-semibold tracking-tight mb-2">
                    Security & Profiles
                  </h3>
                  <p className="mb-6 text-sm opacity-70 leading-relaxed">
                    Manage full monorepo user records, modify authorization clearance structures, or simulate target test environment context configurations natively.
                  </p>
                </div>
                <Link href="/users" className="wolf-btn-primary w-full text-sm">
                  Manage Directory →
                </Link>
              </div>
            )}

            {/* Summary Module Card 2: Restricted Performance Metrics Panel */}
            {hasManagementClearance && (
              <div className="wolf-panel flex flex-col justify-between">
                <div>
                  <h3 className={`text-base font-semibold tracking-tight mb-2 ${userRole === 'ADMIN' ? 'text-red-500' : ''}`}>
                    Infrastructure Metrics 🔒
                  </h3>
                  <p className="mb-6 text-sm opacity-70 leading-relaxed">
                    Review live operational pipeline streams and critical system activity logs loop workspaces. Access requires absolute master administrator clearance.
                  </p>
                </div>
                <Link href="/admin-hub" className="w-full inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium text-white text-sm transition-colors duration-200" style={{ backgroundColor: 'var(--color-brand-500)' }}>
                  Open Core Logs (under construction) →
                </Link>
              </div>
            )}

            {/* Fallback presentation viewport if account is basic USER or GUEST */}
            {!hasManagementClearance && (
              <div className="wolf-panel text-center py-12">
                <p className="text-sm opacity-60">
                  No active workspace modules are configured for this authorization layer. Additional universal content modules are currently under construction.
                </p>
              </div>
            )}

          </main>

          {/* Global Navigation Matrix Portal Footer Shortcut */}
          {hasManagementClearance && (
            <footer className="mt-16 text-center">
              <Link href="/admin-hub" className="text-sm opacity-60 hover:opacity-100 transition-opacity">
                ← Return to Admin Hub
              </Link>
            </footer>
          )}

        </div>
      </div>
    </PageGuard>
  );
}
