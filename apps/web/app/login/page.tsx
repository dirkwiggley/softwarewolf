'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSecurity } from '../SecurityContext';
import { usePageTheme } from '../hooks/usePageTheme'; // Import your structural hook

export default function CompleteLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { userProfile, loginUser, loading } = useSecurity();
  const router = useRouter();
  
  // Consume your centralized layout page styling context properties
  const { backgroundClass, textClass, cardClass } = usePageTheme();

  useEffect(() => {
    if (!loading && userProfile && userProfile.role !== 'GUEST') {
      router.push('/'); 
    }
  }, [userProfile, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const success = await loginUser(username.trim(), password);
      if (success) {
        router.push('/'); 
      } else {
        setError('Authentication Failed: Identity credentials could not be verified.');
      }
    } catch (err) {
      setError('System Error: Gateway interface connection failure.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={`flex min-h-screen w-full items-center justify-center p-4 text-xs font-medium opacity-60 ${backgroundClass} ${textClass}`}>
        Verifying security parameters...
      </div>
    );
  }

  return (
    /* 
      min-h-[calc(100vh-73px)]: Accounts for navbar height so background layout fills perfectly
      backgroundClass and textClass: Injects dynamic canvas values automatically
    */
    <div className={`flex min-h-[calc(100vh-73px)] w-full flex-col items-center justify-center px-4 py-12 transition-colors duration-200 ${backgroundClass} ${textClass}`}>
      
      {/* 
        Login Card Panel — Uses cardClass to float beautifully off the main page canvas:
        Light Mode: Clean solid white over a soft gray canvas
        Dark Mode: Charcoal slate panel over a pure dark black canvas
      */}
      <div className={`w-full max-w-sm p-6 rounded-xl border shadow-md flex flex-col justify-between ${cardClass}`}>
        
        {/* Header Branding Panel */}
        <div className="mb-6">
          <h1 className="text-xl font-bold tracking-tight mb-1">
            SoftwareWolf Login
          </h1>
          <p className="text-sm opacity-70 leading-relaxed">
            Input your username and password to login.
          </p>
        </div>

        {/* Error Alert Display */}
        {error && (
          <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500 leading-relaxed">
            ⚠️ {error}
          </div>
        )}

        {/* Credentials Form Structure */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase opacity-60 mb-1.5">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={submitting}
              placeholder="e.g. admin"
              required
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-transparent outline-none transition-colors focus:border-sky-500 disabled:opacity-40"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold tracking-wider uppercase opacity-60 mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={submitting}
              placeholder="••••••••"
              required
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-transparent outline-none transition-colors focus:border-sky-500 disabled:opacity-40"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full text-sm font-semibold py-2.5 mt-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg shadow-sm transition-colors duration-150 ease-in-out cursor-pointer disabled:opacity-50"
          >
            {submitting ? 'Verifying Gateway...' : 'Login'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            sessionStorage.setItem('wolf_guest_allowed', 'true');
            router.push('home');
          }}
          className="w-full rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 mt-2 cursor-pointer"
        >
          Continue as Guest
        </button>
      </div>

      {/* Anonymous Guest Fallback Notice */}
      <p className="text-xs opacity-40 mt-6 text-center">
        Unregistered connections will continue with localized guest permissions.
      </p>
    </div>
  );
}
