'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSecurity } from '../SecurityContext';

export default function CompleteLoginPage() {
  const [username, setUsername] = useState('');
  /* 8a. Initialize a local state string to track the password input value */
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { userProfile, loginUser, loading } = useSecurity();
  const router = useRouter();

  // Redirect users instantly if a background handshake shows they are already signed in
  useEffect(() => {
    if (!loading && userProfile && userProfile.role !== 'GUEST') {
      router.push('/'); // Sends user to the user landing page
    }
  }, [userProfile, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      /* Update the core context utility function call to pass both credentials tokens */
      const success = await loginUser(username.trim(), password);
      if (success) {
        router.push('/'); // Forwards newly authenticated entries to the root page
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
      <div className="flex min-h-screen w-full items-center justify-center p-4 text-xs font-medium opacity-60">
        Verifying security parameters...
      </div>
    );
  }

  /* Apply explicit underscores to satisfy the Tailwind v4 arbitrary math parser */
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-12">
      {/* Login Card Panel — Padding expanded to add extra inner breathing room */}
      <div className="wolf-panel w-full max-w-sm shadow-md">
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
              className="w-full rounded-lg border px-3 py-2 text-sm bg-transparent outline-none transition-colors focus:border-sky-500 disabled:opacity-40"
              style={{ borderColor: 'var(--color-wolf-border)' }}
            />
          </div>

          {/* Render the new password field element layout block */}
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
              className="w-full rounded-lg border px-3 py-2 text-sm bg-transparent outline-none transition-colors focus:border-sky-500 disabled:opacity-40"
              style={{ borderColor: 'var(--color-wolf-border)' }}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="wolf-btn-primary w-full text-sm font-semibold py-2.5 mt-2"
          >
            {submitting ? 'Verifying Gateway...' : 'Login'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            // Sets a temporary browser-tab scoped flag that disappears when they leave
            sessionStorage.setItem('wolf_guest_allowed', 'true');
            router.push('home');
          }}
          className="w-full rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors hover:opacity-80 mt-2 cursor-pointer"
          style={{ borderColor: 'var(--color-wolf-border)', color: 'var(--color-wolf-text)' }}
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
