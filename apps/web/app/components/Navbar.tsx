'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSecurity } from '../SecurityContext';

export default function Navbar() {
  const { userProfile, theme, toggleTheme, logoutUser } = useSecurity();
  const pathname = usePathname();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // Hydration safety anchor

  // Mark component instance as safely active on the browser window stack
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const userRole = userProfile?.role || 'GUEST';
  const isManagement = userRole === 'ADMIN' || userRole === 'MANAGER';
  const isLoginPage = pathname === '/login';

  return (
    <nav 
      /* 
        sticky top-0 z-50: Locks the bar to the top of the viewport frame
        bg-amber-100/80 dark:bg-amber-950/80: Tan tint in light mode, deep chocolate wood in dark mode
        backdrop-blur-md: Smooth translucent blend over scrolling content text layers
        border-amber-900/10 dark:border-amber-100/10: Subtle thematic separator lines
      */
      className={`sticky top-0 z-50 w-full border-b px-6 py-4 bg-amber-100/80 dark:bg-amber-950/80 backdrop-blur-md border-amber-900/10 dark:border-amber-100/10 text-slate-900 dark:text-amber-100 transition-colors duration-200 ${
        isLoginPage ? 'animate-slide-in-left' : ''
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        
        {/* Left Section: Branding Link */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-bold tracking-tight hover:opacity-80 text-amber-950 dark:text-amber-50">
            🐺 SoftwareWolf
          </Link>
          
          {/* PC & Tablet Interface View */}
          <div className="hidden items-center gap-4 text-sm font-medium opacity-80 sm:flex">
            <Link href="/home" className="hover:opacity-100 hover:text-amber-800 dark:hover:text-amber-300 transition-all">Home</Link>
            {userRole !== 'GUEST' && (
              <Link href="/profile" className="hover:opacity-100 hover:text-amber-800 dark:hover:text-amber-300 transition-all">Profile</Link>
            )}
            {userRole === 'ADMIN' && (
              <Link href="/admin-hub" className="hover:opacity-100 hover:text-amber-800 dark:hover:text-amber-300 transition-all">Admin</Link>
            )}
          </div>
        </div>

        {/* Right Section: Interactive Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Toggle structural color mode"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-amber-900/10 dark:border-amber-100/10 text-sm font-semibold transition-colors hover:bg-amber-900/5 dark:hover:bg-amber-100/5 cursor-pointer"
          >
            {/* Safe uniform character render fallback sequence matching initial layout states */}
            {!mounted ? '🌙' : theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* Desktop Logout Trigger */}
          {userRole !== 'GUEST' ? (
            <button
              onClick={logoutUser}
              type="button"
              className="hidden px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all hover:bg-red-500/10 sm:inline-flex cursor-pointer text-red-500 bg-red-500/5 border-red-500/20"
            >
              Sign Out
            </button>
          ) : (
            !isLoginPage && (
              <Link
                href="/login"
                className="hidden px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all hover:bg-sky-500/10 sm:inline-flex cursor-pointer text-sky-500 bg-sky-500/5 border-sky-500/20"
              >
                Sign In
              </Link>
            )
          )}

          <button
            type="button"
            aria-label="Open mobile workspace menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-amber-900/10 dark:border-amber-100/10 text-sm font-semibold sm:hidden cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? '✕' : '≡'}
          </button>
        </div>

      </div>

      {/* Conditional Mobile Dropdown Link Stack */}
      {isMobileMenuOpen && (
        <div className="mt-4 flex flex-col gap-3 pt-4 border-t border-amber-900/10 dark:border-amber-100/10 text-sm font-medium opacity-90 sm:hidden">
          <Link href="/home" onClick={() => setIsMobileMenuOpen(false)} className="px-2 py-1.5 rounded-lg hover:bg-amber-900/5 dark:hover:bg-white/5 transition-colors">Home</Link>
          {userRole !== 'GUEST' && (
            <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="px-2 py-1.5 rounded-lg hover:bg-amber-900/5 dark:hover:bg-white/5 transition-colors">Settings</Link>
          )}
          {isManagement && (
            <Link href="/admin-hub/users" onClick={() => setIsMobileMenuOpen(false)} className="px-2 py-1.5 rounded-lg hover:bg-amber-900/5 dark:hover:bg-white/5 transition-colors">Profiles</Link>
          )}
          {userRole === 'ADMIN' && (
            <Link href="/admin-hub" onClick={() => setIsMobileMenuOpen(false)} className="px-2 py-1.5 rounded-lg hover:bg-amber-900/5 dark:hover:bg-white/5 transition-colors">Admin Hub</Link>
          )}
          
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
