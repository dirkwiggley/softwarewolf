'use client';

import { useSecurity } from '../../../SecurityContext';

interface User {
  id: string;
  displayName: string;
  role: string;
}

export default function ContextSwitcher({ users }: { users: User[] }) {
  const { activeUserId, setActiveUserId } = useSecurity();

  return (
    <div style={{ padding: '1.5rem', background: '#f4f4f5', border: '1px solid #e4e4e7', borderRadius: '12px', marginBottom: '2rem' }}>
      <label style={{ display: 'block', fontWeight: 'bold', fontSize: '14px', marginBottom: '8px' }}>
        🔒 Global Login Simulation Context Switcher:
      </label>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
        <select
          value={activeUserId}
          onChange={(e) => setActiveUserId(e.target.value)}
          style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '6px', background: '#fff', fontSize: '14px' }}
        >
          <option value="">-- Disconnected / Not Logged In --</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>{u.displayName} ({u.role}) — {u.id.substring(0, 8)}...</option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setActiveUserId('00000000-0000-0000-0000-000000000000')}
          style={{ padding: '10px 14px', background: '#18181b', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}
        >
          ⚡ Quick Admin Login
        </button>
      </div>
      {activeUserId ? (
        <div style={{ fontSize: '12px', color: '#16a34a', fontWeight: '500' }}>✓ Active Token: <code>{activeUserId}</code></div>
      ) : (
        <div style={{ fontSize: '12px', color: '#dc2626', fontWeight: '500' }}>⚠ System Disconnected: Click Quick Login to pass gates.</div>
      )}
    </div>
  );
}
