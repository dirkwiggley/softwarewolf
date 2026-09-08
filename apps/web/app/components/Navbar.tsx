'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSecurity } from '../SecurityContext';

const getNavbarStyles = (path: string, currentTheme: string) => {
  const isDark = currentTheme === 'dark';

  // 1. Admin Section REFACTORED
  if (path.startsWith('/admin-hub')) {
    return isDark 
      ? 'bg-black/95 border-slate-800 text-slate-100' // Dark Mode: Deep Void black
      : 'bg-white border-slate-200 text-slate-900';  // Light Mode: Pure White over gray canvas
  }

  // 2. Everward Campaign Section
  if (path.startsWith('/home/campaigns/everward')) {
    return isDark 
      ? 'bg-amber-900/90 border-amber-950/40 text-amber-50' 
      : 'bg-amber-200/90 border-amber-300/60 text-amber-950';
  }
  
  // 3. Pirates Campaign Section
  if (path.startsWith('/home/campaigns/pirates')) {
    return isDark 
      ? 'bg-teal-950/90 border-teal-900/40 text-teal-50' 
      : 'bg-stone-200/90 border-stone-300/60 text-stone-900';
  }
  
  // 4. REFACTORED DEFAULT THEME:
  return isDark 
    ? 'bg-slate-900/90 border-slate-800/80 text-slate-100' // Elevated dark gray nav banner
    : 'bg-white/95 border-slate-200 text-slate-900';       // Pure white crisp nav bar over grey page canvas
};

export default function Navbar() {
  const { userProfile, theme, toggleTheme, logoutUser } = useSecurity();
  const pathname = usePathname();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const userRole = userProfile?.role || 'GUEST';
  const isManagement = userRole === 'ADMIN' || userRole === 'MANAGER';
  const isLoginPage = pathname === '/login';

  // Compute the current context style classes dynamically based on the current URL
  const contextStyles = getNavbarStyles(pathname, theme || 'light');

  return (
    <nav 
      /* 
        sticky top-0 z-50: Pins navigation safely to viewport scroll roots
        backdrop-blur-md: Soft transparent filter glass blend over background textures
      */
      className={`sticky top-0 z-50 w-full border-b px-6 py-4 backdrop-blur-md transition-colors duration-200 ${contextStyles} ${
        isLoginPage ? 'animate-slide-in-left' : ''
      }`}
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
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-semibold transition-colors hover:opacity-80 cursor-pointer border-current"
          >
            {!mounted ? '🌙' : theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* Desktop Logout Trigger */}
          {userRole !== 'GUEST' ? (
            <button
              onClick={logoutUser}
              type="button"
              className="hidden px-3 py-1.5 text-xs font-semibold rounded-lg border transition-opacity hover:opacity-80 sm:inline-flex cursor-pointer text-red-500 bg-red-500/5 border-red-500/20"
            >
              Sign Out
            </button>
          ) : (
            !isLoginPage && (
              <Link
                href="/login"
                className="hidden px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors hover:opacity-80 sm:inline-flex cursor-pointer text-sky-500 bg-sky-500/5 border-sky-500/20"
              >
                Sign In
              </Link>
            )
          )}

          <button
            type="button"
            aria-label="Open mobile workspace menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-semibold sm:hidden cursor-pointer border-current"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? '✕' : '≡'}
          </button>
        </div>

      </div>

      {/* Conditional Mobile Dropdown Link Stack */}
      {isMobileMenuOpen && (
        <div className="mt-4 flex flex-col gap-3 pt-4 border-t text-sm font-medium opacity-90 sm:hidden border-current">
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
