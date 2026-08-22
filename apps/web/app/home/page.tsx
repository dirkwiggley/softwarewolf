'use client';

import React from 'react';
import Link from 'next/link';
import PageGuard from '../PageGuard';
import { useSecurity } from '../SecurityContext';

export default function HomeHubDashboard() {
  const { userProfile, logoutUser } = useSecurity();
  const userRole = userProfile?.role || 'GUEST';

  // Check if the current context possesses management permissions
  const hasManagementClearance = userRole === 'ADMIN' || userRole === 'MANAGER';

  return (
    <PageGuard allowedRoles={['ADMIN', 'MANAGER', 'USER', 'GUEST']}>
      <div style={{ minHeight: '100vh', background: '#09090b', color: '#f4f4f5', fontFamily: 'system-ui, sans-serif', padding: '3rem 2rem' }}>

        {/* Hub Control Header */}
        <header style={{ maxWidth: '800px', margin: '0 auto 3rem auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #27272a', paddingBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: '700', margin: '0 0 6px 0', letterSpacing: '-0.03em', color: '#f4f4f5' }}>
              Modular Hub Zone
            </h1>
            <p style={{ color: '#71717a', fontSize: '14px', margin: 0 }}>
              Ecosystem Control Dashboard — Welcome back, <span style={{ color: '#a1a1aa', fontWeight: '600' }}>{userProfile?.displayName || 'Guest'}</span>
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.05em', background: '#18181b', border: '1px solid #27272a', padding: '4px 8px', borderRadius: '4px', color: '#a1a1aa', textTransform: 'uppercase' }}>
              Scope: {userRole}
            </span>
            {userRole !== 'GUEST' && (
              <button
                onClick={() => logoutUser()}
                style={{ background: '#7f1d1d/20', border: '1px solid #7f1d1d', color: '#fca5a5', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '500', cursor: 'pointer', transition: 'background 0.2s' }}
              >
                Sign Out
              </button>
            )}
          </div>
        </header>

        {/* Modular Workspace Dashboard Grid */}
        <main style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: hasManagementClearance ? '1fr 1fr' : '1fr', gap: '1.5rem' }}>

          {/* Summary Module Card 1: Conditionally Rendered for Management Personnel */}
          {hasManagementClearance && (
            <div style={{ padding: '1.5rem', background: '#18181b', border: '1px solid #27272a', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', color: '#f4f4f5' }}>
                  Security & Profiles
                </h3>
                <p style={{ margin: '0 0 1.5rem 0', fontSize: '13px', color: '#71717a', lineHeight: '1.5' }}>
                  Manage full monorepo user records, modify authorization clearance structures, or simulate target test environment context configurations natively.
                </p>
              </div>
              <Link href="/users" style={{ display: 'block', textAlign: 'center', padding: '10px', background: '#f4f4f5', color: '#09090b', textDecoration: 'none', borderRadius: '6px', fontWeight: '600', fontSize: '13px', transition: 'opacity 0.2s' }}>
                Manage Directory →
              </Link>
            </div>
          )}

          {/* Summary Module Card 2: Restricted Performance Metrics Panel */}
          {hasManagementClearance && (
            <div style={{ padding: '1.5rem', background: '#18181b', border: '1px solid #27272a', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: userRole === 'ADMIN' ? '#fca5a5' : '#71717a' }}>
                    Infrastructure Metrics 🔒
                  </h3>
                </div>
                <p style={{ margin: '0 0 1.5rem 0', fontSize: '13px', color: '#71717a', lineHeight: '1.5' }}>
                  Review live operational pipeline streams and critical system activity logs loop workspaces. Access requires absolute master administrator clearance.
                </p>
              </div>
              <Link href="/dashboard" style={{ display: 'block', textAlign: 'center', padding: '10px', background: '#3b82f6', color: '#fff', textDecoration: 'none', borderRadius: '6px', fontWeight: '600', fontSize: '13px' }}>
                Open Core Logs →
              </Link>

              {/*         {userRole === 'ADMIN' ? (
              <Link href="/dashboard" style={{ display: 'block', textAlign: 'center', padding: '10px', background: '#3b82f6', color: '#fff', textDecoration: 'none', borderRadius: '6px', fontWeight: '600', fontSize: '13px' }}>
                Open Core Logs →
              </Link>
            ) : (
              <div style={{ textAlign: 'center', padding: '10px', background: '#27272a', color: '#52525b', borderRadius: '6px', fontWeight: '600', fontSize: '13px', border: '1px dashed #3f3f46' }}>
                Clearance Locked
              </div>
            )}  */}
            </div>
          )}

        </main>

        {/* Global Navigation Matrix Portal Footer Shortcut */}
        <footer style={{ maxWidth: '800px', margin: '4rem auto 0 auto', textAlign: 'center' }}>
          <Link href="/" style={{ color: '#71717a', textDecoration: 'none', fontSize: '13px', transition: 'color 0.2s' }}>
            ← Return to Master Root Welcome Portal
          </Link>
        </footer>

      </div>
    </PageGuard>
  );
}
