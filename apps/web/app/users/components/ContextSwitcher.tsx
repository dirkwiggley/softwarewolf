'use client';

import React, { useState } from 'react';
import { useSecurity } from '../../SecurityContext';

// Hardcoded array of common development usernames matching standard roles
const DEV_TEST_PROFILES = [
  { username: 'admin', label: 'Quick Login: ADMIN', color: 'bg-red-600 hover:bg-red-500' },
  { username: 'manager', label: 'Quick Login: MANAGER', color: 'bg-amber-600 hover:bg-amber-500' },
  { username: 'user', label: 'Quick Login: USER', color: 'bg-blue-600 hover:bg-blue-500' },
];

export default function ContextSwitcher() {
  const { userProfile, loginUser, logoutUser } = useSecurity();
  const [switching, setSwitching] = useState(false);
  const [error, setError] = useState('');

  const handleQuickSwitch = async (username: string) => {
    setSwitching(true);
    setError('');

    try {
      const success = await loginUser(username);
      if (!success) {
        setError(`Failed simulation mapping: Ensure user '${username}' exists in MariaDB.`);
      }
      // Note: loginUser naturally triggers router actions or forces state rehydration
    } catch (err) {
      setError('Network communication failure during simulation swap.');
    } finally {
      setSwitching(false);
    }
  };

  // Only render this block in non-production environments to avoid accidental deployment exposure
  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 shadow-md backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Local Development Sandbox</h3>
          <p className="mt-0.5 text-xs text-zinc-500">
            Current Identity Context Profile Clearance:
            <span className="ml-1 font-mono font-bold text-zinc-200 uppercase">
              {userProfile?.role || 'UNKNOWN'}
            </span>
          </p>
        </div>

        {userProfile && userProfile.role !== 'GUEST' && (
          <button
            onClick={() => logoutUser()}
            className="rounded bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300 transition hover:bg-zinc-700"
          >
            Clear Cookies (Guest Mode)
          </button>
        )}
      </div>

      {error && (
        <div className="mt-3 rounded border border-red-900/50 bg-red-950/20 p-2 text-xs font-medium text-red-400">
          {error}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {DEV_TEST_PROFILES.map((profile) => (
          <button
            key={profile.username}
            onClick={() => handleQuickSwitch(profile.username)}
            disabled={switching}
            className={`rounded px-3 py-1.5 text-xs font-medium text-white shadow-sm transition disabled:opacity-50 ${profile.color}`}
          >
            {switching ? 'Swapping Matrix...' : profile.label}
          </button>
        ))}
      </div>
    </div>
  );
}
