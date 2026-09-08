'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PageGuard from '../PageGuard';
import { useSecurity } from '../SecurityContext';
import { PageHeader } from '@softwarewolf/ui/page-header';
import { usePageTheme } from '../hooks/usePageTheme'; // Import your custom theme hook

export default function UserProfileSettingsPage() {
  const { userProfile, updateUserProfile } = useSecurity();
  const activeUserId = userProfile?.id || null;
  const userRole = userProfile?.role;

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Consume your centralized layout page styling context properties
  const { backgroundClass, textClass, cardClass } = usePageTheme();

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
      const res = await fetch(`/api/system/users/${activeUserId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName: displayName.trim(), email: email.trim() }),
      });

      if (!res.ok) throw new Error('Gateway rejected profile modification parameter rules.');

      updateUserProfile({
        displayName: displayName.trim(),
        email: email.trim(),
      });

      setMessage({ text: '✓ Profile updates applied successfully.', isError: false });
    } catch (err: any) {
      setMessage({ text: err.message || 'System communication failure.', isError: true });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className={`flex min-h-screen w-full items-center justify-center p-4 text-xs font-medium opacity-60 ${backgroundClass} ${textClass}`}>
        Syncing security profile matrix...
      </div>
    );
  }

  return (
    <PageGuard allowedRoles={['ADMIN', 'MANAGER', 'USER']}>
      {/* 
        min-h-[calc(100vh-73px)]: Prevents layout height shifting issues
        backgroundClass / textClass: Injects standard neutral default colors seamlessly
      */}
      <div className={`flex min-h-[calc(100vh-73px)] w-full flex-col items-center px-4 py-8 transition-colors duration-200 ${backgroundClass} ${textClass}`}>
        
        <PageHeader
          title="User Profile"
          description="Modify your user profile."
          center={true}
        />

        {/* Outer structural layout wrapper */}
        <div className="flex w-full justify-center mt-6">

          {/* Inner content box */}
          <div className="w-full max-w-xl text-left">

            {message && (
              <div className={`mb-6 rounded-lg border p-3 text-sm leading-relaxed ${message.isError ? 'border-red-500/20 bg-red-500/10 text-red-500' : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'}`}>
                {message.text}
              </div>
            )}

            {/* 
              Settings Workspace Sheet Card — Uses cardClass to float beautifully:
              Light Mode: Clean solid white over a soft gray background canvas
              Dark Mode: Charcoal slate panel over a pure dark black canvas
            */}
            <form onSubmit={handleSubmit} className={`w-full border p-6 rounded-xl shadow-md flex flex-col gap-5 ${cardClass}`}>

              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase opacity-60 mb-1.5">
                  System Username
                </label>
                <input
                  type="text"
                  value={userProfile?.username || 'anonymous'}
                  disabled
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-transparent outline-none opacity-40 cursor-not-allowed"
                />
                <p className="text-xs opacity-40 mt-1.5">System names cannot be altered without high-level administrative clearance.</p>
              </div>

              {/* Read-Only User Role Field with Native Multi-theme Badges */}
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase opacity-60 mb-1.5">
                  Assigned Security Role
                </label>
                <div className="flex items-center gap-3 w-full rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-transparent opacity-50 cursor-not-allowed">
                  <span className="font-mono tracking-wide">{userRole}</span>
                  {userRole && (
                    <span className={`role-badge-${userRole.toLowerCase()}`}>
                      Active Tier
                    </span>
                  )}
                </div>
                <p className="text-xs opacity-40 mt-1.5">Your security privilege level is assigned by administrators.</p>
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
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-transparent outline-none transition-colors focus:border-sky-500 disabled:opacity-40"
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
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-transparent outline-none transition-colors focus:border-sky-500 disabled:opacity-40"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full text-sm font-semibold py-2.5 mt-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg shadow-sm transition-colors duration-150 ease-in-out cursor-pointer disabled:opacity-50"
              >
                {saving ? 'Synchronizing Database...' : 'Save Configuration Changes'}
              </button>

            </form>

            {/* Back Button Section */}
            <div className="mt-6 text-center sm:text-left">
              <Link href="/home" className="inline-flex items-center text-sm font-medium transition-colors text-sky-600 dark:text-sky-400 hover:opacity-80">
                ← Back to Welcome Page
              </Link>
            </div>

          </div>
        </div>
      </div>
    </PageGuard>
  );
}
