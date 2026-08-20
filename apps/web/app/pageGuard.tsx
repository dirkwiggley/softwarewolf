'use client';

import { useSecurity } from './SecurityContext';
import Link from 'next/link';

interface PageGuardProps {
  children: React.ReactNode;
  allowedRoles: Array<'ADMIN' | 'MANAGER' | 'USER'>;
}

export default function PageGuard({ children, allowedRoles }: PageGuardProps) {
  const { userProfile, loading, activeUserId } = useSecurity();

  // 1. Show a loading indicator if the background connection handshake is active
  if (loading) {
    return <div style={{ padding: '3rem', fontFamily: 'sans-serif', textAlign: 'center' }}>Verifying clearance matrices...</div>;
  }

  // 2. If no identity token is found or backend profile lookup fails, block page access
  if (!activeUserId || !userProfile || !allowedRoles.includes(userProfile.role)) {
    return (
      <div style={{ padding: '4rem 2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '500px', margin: '4rem auto', textAlign: 'center', border: '1px solid #ffcccc', borderRadius: '12px', background: '#fff' }}>
        <h2 style={{ color: '#cc0000', marginTop: 0 }}>🚫 Access Denied</h2>
        <p style={{ color: '#666', lineHeight: '1.5' }}>
          Your active simulation profile lacks the necessary security permissions clearance level required to view this system console view.
        </p>
        <div style={{ marginTop: '1.5rem' }}>
          <Link href="/home" style={{ color: '#0070f3', textDecoration: 'none', fontWeight: 'bold' }}>
            ← Return to Safe Zone Hub
          </Link>
        </div>
      </div>
    );
  }

  // 3. Authorization verified! Load up the user's requested page view
  return <>{children}</>;
}
