'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSecurity } from '../SecurityContext';

export default function Navbar() {
  /* Extract the logoutUser method from your security context hook */
  const { userProfile, theme, toggleTheme, logoutUser } = useSecurity();
  const pathname = usePathname();
  
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
          <Link href="/" className="text-lg font-bold tracking-tight hover:opacity-80">
            🐺 SoftwareWolf
          </Link>
          
          {/* PC & Tablet Interface View */}
          <div className="hidden items-center gap-4 text-sm font-medium opacity-80 sm:flex">
            <Link href="/home" className="hover:opacity-100 transition-opacity">Home</Link>
            {userRole !== 'GUEST' && (
              <Link href="/profile" className="hover:opacity-100 transition-opacity">Profile</Link>
            )}
            {userRole === 'ADMIN' && (
              <Link href="/admin-hub" className="hover:opacity-100 transition-opacity">Admin</Link>
            )}

          </div>
        </div>

        {/* Right Section: Interactive Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Toggle structural color mode"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-semibold transition-colors hover:opacity-80 cursor-pointer"
            style={{ borderColor: 'var(--color-wolf-border)', color: 'var(--color-wolf-text)' }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* Desktop Logout Trigger: Only displays for authenticated accounts */}
          {userRole !== 'GUEST' ? (
            <button
              onClick={logoutUser}
              type="button"
              className="hidden px-3 py-1.5 text-xs font-semibold rounded-lg border transition-opacity hover:opacity-80 sm:inline-flex cursor-pointer text-red-500 bg-red-500/5"
              style={{ borderColor: 'rgba(239, 68, 68, 0.2)' }}
            >
              Sign Out
            </button>
          ) : (
            /* 1a. Desktop Guest Gateway Trigger: Only displays when on an unauthenticated path, hiding on /login itself */
            !isLoginPage && (
              <Link
                href="/login"
                className="hidden px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors hover:opacity-80 sm:inline-flex cursor-pointer text-sky-500 bg-sky-500/5"
                style={{ borderColor: 'rgba(2, 132, 199, 0.2)' }}
              >
                Sign In
              </Link>
            )
          )}

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

      {/* Conditional Mobile Dropdown Link Stack */}
      {isMobileMenuOpen && (
        <div className="mt-4 flex flex-col gap-3 pt-4 border-t text-sm font-medium opacity-90 sm:hidden" style={{ borderColor: 'var(--color-wolf-border)' }}>
          <Link href="/home" onClick={() => setIsMobileMenuOpen(false)} className="px-2 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">Home</Link>
          {userRole !== 'GUEST' && (
            <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="px-2 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">Settings</Link>
          )}
          {isManagement && (
            <Link href="/admin-hub/users" onClick={() => setIsMobileMenuOpen(false)} className="px-2 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">Profiles</Link>
          )}
          {userRole === 'ADMIN' && (
            <Link href="/admin-hub" onClick={() => setIsMobileMenuOpen(false)} className="px-2 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">Admin Hub</Link>
          )}
          
          {/* 1b. Mobile Dropdown Conditional Gateway Trigger */}
          {userRole !== 'GUEST' ? (
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                logoutUser();
              }}
              type="button"
              className="w-full text-left px-2 py-1.5 rounded-lg font-semibold text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          ) : (
            !isLoginPage && (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-left px-2 py-1.5 rounded-lg font-semibold text-sky-500 hover:bg-sky-500/10 transition-colors cursor-pointer"
              >
                Sign In
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
}
