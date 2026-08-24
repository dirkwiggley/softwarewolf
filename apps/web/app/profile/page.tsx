'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PageGuard from '../PageGuard';
import { useSecurity } from '../SecurityContext';

export default function UserProfileSettingsPage() {
  const { userProfile } = useSecurity();
  const activeUserId = userProfile?.id || null;

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Hydrate form inputs with current session metadata on initialization
  useEffect(() => {
    if (userProfile && userProfile.role !== 'GUEST') {
      setDisplayName(userProfile.displayName || '');
      setEmail(userProfile.email || '');
      setLoading(false);
    }
  }, [userProfile]);

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeUserId) return;

    setSaving(true);
    setMessage(null);

    try {
      // Points securely to the precise database entry row using the active session user ID
      const res = await fetch(`/api/system/users/${activeUserId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName: displayName.trim(), email: email.trim() }),
      });

      if (!res.ok) throw new Error('Gateway rejected profile modification parameter rules.');

      setMessage({ text: '✓ Profile updates applied successfully.', isError: false });
    } catch (err: any) {
      setMessage({ text: err.message || 'System communication failure.', isError: true });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center p-4 text-xs font-medium opacity-60">
        Syncing security profile matrix...
      </div>
    );
  }

  return (
    // Restricts page strictly to authenticated accounts, keeping GUEST entities locked out
    <PageGuard allowedRoles={['ADMIN', 'MANAGER', 'USER']}>
      {/* Outer structural layout wrapper: Centers the panel block horizontally on the monitor */}
      <div className="flex w-full justify-center px-6 py-16">
        
        {/* Inner content box: Enforces left-aligned forms and data layout parameters */}
        <div className="w-full max-w-xl text-left">
          
          <div className="mb-6">
            <Link href="/home" className="inline-flex items-center text-sm font-medium transition-colors hover:opacity-80" style={{ color: 'var(--color-brand-500)' }}>
              ← Back to Dashboard Hub
            </Link>
          </div>

          <h1 className="text-3xl font-bold tracking-tight mb-1">Account Parameters</h1>
          <p className="text-sm opacity-70 mb-8">Modify your primary identity display attributes and notification nodes.</p>

          {message && (
            <div className={`mb-6 rounded-lg border p-3 text-sm leading-relaxed ${message.isError ? 'border-red-500/20 bg-red-500/10 text-red-500' : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'}`}>
              {message.text}
            </div>
          )}

          {/* Settings Workspace Sheet Card */}
          <form onSubmit={handleSubmit} className="wolf-panel flex flex-col gap-5">
            
            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase opacity-60 mb-1.5">
                Core System Username
              </label>
              <input
                type="text"
                value={userProfile?.username || 'anonymous'}
                disabled
                className="w-full rounded-lg border px-3 py-2 text-sm bg-transparent outline-none opacity-40 cursor-not-allowed"
                style={{ borderColor: 'var(--color-wolf-border)' }}
              />
              <p className="text-xs opacity-40 mt-1.5">System identity handles cannot be altered without high-level administrative clearance vectors.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase opacity-60 mb-1.5">
                Public Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                disabled={saving}
                placeholder="e.g. John Doe"
                className="w-full rounded-lg border px-3 py-2 text-sm bg-transparent outline-none transition-colors focus:border-sky-500 disabled:opacity-40"
                style={{ borderColor: 'var(--color-wolf-border)' }}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase opacity-60 mb-1.5">
                Notification Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={saving}
                placeholder="e.g. jdoe@softwarewolf.io"
                className="w-full rounded-lg border px-3 py-2 text-sm bg-transparent outline-none transition-colors focus:border-sky-500 disabled:opacity-40"
                style={{ borderColor: 'var(--color-wolf-border)' }}
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="wolf-btn-primary w-full text-sm font-semibold py-2.5 mt-2"
            >
              {saving ? 'Synchronizing Database...' : 'Save Configuration Changes'}
            </button>

          </form>

        </div>
      </div>
    </PageGuard>
  );
}
