'use client';

/* 1a. Import useState alongside React */
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSecurity } from '../SecurityContext';

export default function Navbar() {
  const { userProfile, theme, toggleTheme } = useSecurity();
  const pathname = usePathname();
  
  /* 1b. Initialize local menu toggle visibility state */
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const userRole = userProfile?.role || 'GUEST';
  const isManagement = userRole === 'ADMIN' || userRole === 'MANAGER';
  const isLoginPage = pathname === '/login';

  return (
    <nav 
      className={`w-full border-b px-6 py-4 transition-colors duration-200 ${
        isLoginPage ? 'animate-slide-in-left' : ''
      }`}
      style={{ backgroundColor: 'var(--color-wolf-card)', borderColor: 'var(--color-wolf-border)' }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        
        {/* Left Section: Branding Link */}
        <div className="flex items-center gap-6">
          <Link href="/home" className="text-lg font-bold tracking-tight hover:opacity-80">
            🐺 SoftwareWolf
          </Link>
          
          {/* PC & Tablet Interface View */}
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

        {/* Right Section: Interactive Theme Controls & Mobile Trigger */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Toggle structural color mode"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-semibold transition-colors hover:opacity-80 cursor-pointer"
            style={{ borderColor: 'var(--color-wolf-border)', color: 'var(--color-wolf-text)' }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* 1c. Wire click handler to toggle state boolean */}
          <button
            type="button"
            aria-label="Open mobile workspace menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-semibold sm:hidden cursor-pointer"
            style={{ borderColor: 'var(--color-wolf-border)', color: 'var(--color-wolf-text)' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? '✕' : '≡'}
          </button>
        </div>

      </div>

      {/* 1d. Conditional Mobile Dropdown Link Stack (Hidden on desktop via sm:hidden) */}
      {isMobileMenuOpen && (
        <div className="mt-4 flex flex-col gap-3 pt-4 border-t text-sm font-medium opacity-90 sm:hidden" style={{ borderColor: 'var(--color-wolf-border)' }}>
          <Link href="/home" onClick={() => setIsMobileMenuOpen(false)} className="px-2 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">Dashboard</Link>
          {userRole !== 'GUEST' && (
            <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="px-2 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">Settings</Link>
          )}
          {isManagement && (
            <Link href="/users" onClick={() => setIsMobileMenuOpen(false)} className="px-2 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">Profiles</Link>
          )}
          {userRole === 'ADMIN' && (
            <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="px-2 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">Infrastructure</Link>
          )}
        </div>
      )}
    </nav>
  );
}
