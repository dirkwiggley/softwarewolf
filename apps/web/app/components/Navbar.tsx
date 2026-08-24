'use client';

import React from 'react';
import Link from 'next/link';
import { useSecurity } from '../SecurityContext';

export default function Navbar() {
  const { userProfile, theme, toggleTheme } = useSecurity();
  const userRole = userProfile?.role || 'GUEST';
  const isManagement = userRole === 'ADMIN' || userRole === 'MANAGER';

  return (
    <nav 
      className="w-full border-b px-6 py-4 transition-colors duration-200"
      style={{ backgroundColor: 'var(--color-wolf-card)', borderColor: 'var(--color-wolf-border)' }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        
        {/* Left Section: Branding Link */}
        <div className="flex items-center gap-6">
          <Link href="/home" className="text-lg font-bold tracking-tight hover:opacity-80">
            🐺 SoftwareWolf
          </Link>
          
          {/* Navigation Core Routes (Masked visually based on role access) */}
          <div className="hidden items-center gap-4 text-sm font-medium opacity-80 sm:flex">
            <Link href="/home" className="hover:opacity-100 transition-opacity">Dashboard</Link>
            {userRole !== 'GUEST' && (
              <Link href="/profile" className="hover:opacity-100 transition-opacity">Settings</Link>
            )}
            {isManagement && (
              <Link href="/users" className="hover:opacity-100 transition-opacity">Profiles</Link>
            )}
            {userRole === 'ADMIN' && (
              <Link href="/dashboard" className="hover:opacity-100 transition-opacity">Infrastructure</Link>
            )}
          </div>
        </div>

        {/* Right Section: Interactive Theme Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Toggle structural color mode"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-semibold transition-colors hover:opacity-80 cursor-pointer"
            style={{ borderColor: 'var(--color-wolf-border)', color: 'var(--color-wolf-text)' }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

      </div>
    </nav>
  );
}
