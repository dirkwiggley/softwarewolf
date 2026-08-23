'use client';

import React, { useState } from 'react';
import { useSecurity } from '../../SecurityContext';

// Standard development usernames matching our defined theme tokens
const DEV_TEST_PROFILES = [
  { username: 'admin', label: 'Quick Login: ADMIN', badgeClass: 'role-badge-admin' },
  { username: 'manager', label: 'Quick Login: MANAGER', badgeClass: 'role-badge-manager' },
  { username: 'user', label: 'Quick Login: USER', badgeClass: 'role-badge-user' },
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
    } catch (err) {
      setError('Network communication failure during simulation swap.');
    } finally {
      setSwitching(false);
    }
  };

  // Only render this block in non-production environments to avoid accidental deployment exposure
  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div 
      className="rounded-xl border p-4 shadow-sm transition-colors duration-200"
      style={{ backgroundColor: 'var(--color-wolf-card)', borderColor: 'var(--color-wolf-border)' }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider opacity-60">Local Development Sandbox</h3>
          <p className="mt-1 text-xs opacity-70">
            Current Identity Context Profile Clearance:{' '}
            <span className="font-mono font-bold uppercase" style={{ color: 'var(--color-brand-500)' }}>
              {userProfile?.role || 'UNKNOWN'}
            </span>
          </p>
        </div>

        {userProfile && userProfile.role !== 'GUEST' && (
          <button
            onClick={() => logoutUser()}
            className="rounded-lg border px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-80 cursor-pointer"
            style={{ borderColor: 'var(--color-wolf-border)', color: 'var(--color-wolf-text)' }}
          >
            Clear Cookies (Guest Mode)
          </button>
        )}
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs font-medium text-red-500">
          {error}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {DEV_TEST_PROFILES.map((profile) => (
          <button
            key={profile.username}
            onClick={() => handleQuickSwitch(profile.username)}
            disabled={switching}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold tracking-wide border shadow-2xs transition-opacity hover:opacity-80 disabled:opacity-40 cursor-pointer ${profile.badgeClass}`}
          >
            {switching ? 'Swapping Matrix...' : profile.label}
          </button>
        ))}
      </div>
    </div>
  );
}
