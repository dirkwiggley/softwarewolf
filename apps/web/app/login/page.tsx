'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSecurity } from '../SecurityContext';

export default function CompleteLoginPage() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { userProfile, loginUser, loading } = useSecurity();
  const router = useRouter();

  // Redirect users instantly if a background handshake shows they are already signed in
  useEffect(() => {
    if (!loading && userProfile && userProfile.role !== 'GUEST') {
      router.push('/home'); // Correct: Sends user to the brand-new dashboard workspace hub
    }
  }, [userProfile, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const success = await loginUser(username.trim());
      if (success) {
        router.push('/home'); // Correct: Forwards newly authenticated entries to the true zone center
      } else {
        setError('Authentication Failed: Identity username could not be verified.');
      }
    } catch (err) {
      setError('System Error: Gateway interface connection failure.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#09090b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a1a1aa', fontFamily: 'system-ui, sans-serif', fontSize: '13px' }}>
        Verifying security parameters...
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#09090b', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', padding: '1rem' }}>
      <div style={{ width: '100%', maxWidth: '380px', background: '#18181b', border: '1px solid #27272a', borderRadius: '12px', padding: '2rem', boxSizing: 'border-box', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>

        {/* Header Branding Panel */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ color: '#f4f4f5', fontSize: '20px', fontWeight: '600', margin: '0 0 6px 0', letterSpacing: '-0.025em' }}>
            SoftwareWolf Home
          </h1>
          <p style={{ color: '#71717a', fontSize: '13px', margin: 0, lineHeight: '1.4' }}>
            Input your registered core account identity to gain infrastructure gateway clearance.
          </p>
        </div>

        {/* Error Alert Display */}
        {error && (
          <div style={{ background: 'rgba(127, 29, 29, 0.2)', border: '1px solid #7f1d1d', borderRadius: '6px', padding: '10px 12px', color: '#fca5a5', fontSize: '13px', marginBottom: '1.25rem', lineHeight: '1.4' }}>
            ⚠️ {error}
          </div>
        )}

        {/* Credentials Form Structure */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', color: '#a1a1aa', fontSize: '12px', fontWeight: '500', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Identity Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={submitting}
              placeholder="e.g. admin"
              required
              style={{ width: '100%', padding: '10px 12px', background: '#09090b', border: '1px solid #27272a', borderRadius: '6px', color: '#f4f4f5', fontSize: '14px', boxSizing: 'border-box', outline: 'none', transition: 'border-color 0.2s' }}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{ width: '100%', padding: '11px', background: '#f4f4f5', color: '#09090b', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: submitting ? 'not-allowed' : 'pointer', transition: 'background 0.2s', marginTop: '0.5rem', opacity: submitting ? 0.7 : 1 }}
          >
            {submitting ? 'Verifying Gateway...' : 'Request Clearance'}
          </button>
        </form>
        <button
          type="button"
          onClick={() => {
            // Sets a temporary browser-tab scoped flag that disappears when they leave
            sessionStorage.setItem('wolf_guest_allowed', 'true');
            router.push('/home');
          }}
          style={{ width: '100%', padding: '11px', background: 'transparent', color: '#a1a1aa', border: '1px solid #27272a', borderRadius: '6px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'background 0.2s', marginTop: '0.5rem' }}
        >
          Continue as Guest
        </button>
      </div>

      {/* Anonymous Guest Fallback Notice */}
      <p style={{ color: '#3f3f46', fontSize: '12px', marginTop: '1.5rem', marginInline: 'auto' }}>
        Unregistered connections will continue with localized guest permissions.
      </p>
    </div>
  );
}
