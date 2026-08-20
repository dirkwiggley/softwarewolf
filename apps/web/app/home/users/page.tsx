'use client';

import { useEffect, useState, FormEvent } from 'react';
import Link from 'next/link';
import { useSecurity } from '../../SecurityContext'; // <-- Centralized security context link

interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'USER';
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'ADMIN' | 'MANAGER' | 'USER'>('USER');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Extract global session tracking states out of our security hook
  const { activeUserId, setActiveUserId } = useSecurity();

  // Helper mock headers loader block
  const getAuthHeaders = () => {
    return {
      'Content-Type': 'application/json',
      // Pass the globally selected simulation user ID straight to the Express gateway
      'x-mock-user-id': activeUserId
    };
  };

  const fetchUsers = () => {
    // If disconnected, clear out the array lists view locally
    if (!activeUserId) {
      setUsers([]);
      return;
    }

    fetch('/api/system/users', { headers: getAuthHeaders() })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP Error ${res.status}: Access Denied or Missing Token`);
        return res.json();
      })
      .then((data: UserProfile[]) => {
        setUsers(data);
        setError(null);
      })
      .catch((err) => setError(err.message));
  };

  // Automatically refresh the entire directory view whenever an identity swap occurs
  useEffect(() => {
    fetchUsers();
  }, [activeUserId]);

  const handleSaveUser = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (editingId) {
        // Edit Mode Pipeline (PATCH)
        const res = await fetch(`/api/system/users/${editingId}`, {
          method: 'PATCH',
          headers: getAuthHeaders(),
          body: JSON.stringify({ displayName, email, role })
        });
        if (!res.ok) throw new Error('Failed to update profile changes');
        const updated: UserProfile = await res.json();
        setUsers((prev) => prev.map(u => u.id === editingId ? updated : u));
        setEditingId(null);
      } else {
        // Creation Mode Pipeline (POST)
        const res = await fetch('/api/system/users', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({ username, displayName, email, role })
        });
        if (!res.ok) throw new Error('Failed to register user into profile registry');
        const created: UserProfile = await res.json();
        setUsers((prev) => [created, ...prev]);
      }

      // Clear Input Form buffers
      setUsername('');
      setDisplayName('');
      setEmail('');
      setRole('USER');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteUser = async (id: string) => {
    setError(null);
    try {
      const res = await fetch(`/api/system/users/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to remove user account profile');
      }

      setUsers((prev) => prev.filter((u) => u.id !== id));

      if (activeUserId === id) {
        setActiveUserId('');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const startEdit = (user: UserProfile) => {
    setEditingId(user.id);
    setUsername(user.username);
    setDisplayName(user.displayName);
    setEmail(user.email);
    setRole(user.role);
  };

  return (
    <div style={{ padding: '3rem', fontFamily: 'system-ui, sans-serif', maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1rem' }}>
        <Link href="/home" style={{ color: '#0070f3', textDecoration: 'none', fontSize: '14px' }}>← Back to Home Hub</Link>
      </div>

      <h1>Security & Profile Directory</h1>

      {/* Dynamic Dropdown Simulation Box Context Selector */}
      <div style={{ padding: '1.5rem', background: '#f4f4f5', border: '1px solid #e4e4e7', borderRadius: '12px', marginBottom: '2rem' }}>
        <label style={{ display: 'block', fontWeight: 'bold', fontSize: '14px', marginBottom: '8px' }}>
          🔒 Global Login Simulation Context Switcher:
        </label>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
          {/* Profile Selection Dropdown */}
          <select
            value={activeUserId}
            onChange={(e) => setActiveUserId(e.target.value)}
            style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '6px', background: '#fff', fontSize: '14px' }}
          >
            <option value="">-- Disconnected / Not Logged In --</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.displayName} ({u.role}) — {u.id.substring(0, 8)}...
              </option>
            ))}
          </select>

          {/* Instant Developer Quick-Login Button */}
          <button
            type="button"
            onClick={() => setActiveUserId('00000000-0000-0000-0000-000000000000')}
            style={{ padding: '10px 14px', background: '#18181b', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}
          >
            ⚡ Quick Admin Login
          </button>
        </div>

        {/* Active Session Status Badge */}
        {activeUserId ? (
          <div style={{ fontSize: '12px', color: '#16a34a', fontWeight: '500' }}>
            ✓ Active Token: <code>{activeUserId}</code>
          </div>
        ) : (
          <div style={{ fontSize: '12px', color: '#dc2626', fontWeight: '500' }}>
            ⚠ System Disconnected: Click "Quick Admin Login" above to pass the API security gate blocks.
          </div>
        )}
      </div>
      {error && <p style={{ color: 'red', background: '#fff5f5', padding: '10px', borderRadius: '4px', border: '1px solid #ffcccc' }}>Error: {error}</p>}

      {/* Profile Form Control Section */}
      <form onSubmit={handleSaveUser} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '1.5rem', border: '1px solid #eaeaea', borderRadius: '12px', marginBottom: '2rem' }}>
        <h3 style={{ gridColumn: 'span 2', margin: '0 0 4px 0' }}>{editingId ? 'Edit Profile Settings' : 'Register New User'}</h3>

        <div>
          <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} disabled={!!editingId} placeholder="john_doe" required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Display Name:</label>
          <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="John Doe" required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Email Address:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Clearance Clearance Level Role:</label>
          <select value={role} onChange={(e: any) => setRole(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', background: '#fff', boxSizing: 'border-box' }}>
            <option value="USER">USER (Standard Access)</option>
            <option value="MANAGER">MANAGER (Elevated Access)</option>
            <option value="ADMIN">ADMIN (Full Master Control)</option>
          </select>
        </div>
        <div style={{ gridColumn: 'span 2', marginTop: '8px' }}>
          <button type="submit" style={{ width: '100%', padding: '10px', background: '#222', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
            {editingId ? 'Save Changes' : 'Create User Profile'}
          </button>
          {editingId && <button type="button" onClick={() => { setEditingId(null); setUsername(''); setDisplayName(''); setEmail(''); setRole('USER'); }} style={{ width: '100%', padding: '8px', background: 'transparent', color: '#666', border: 'none', cursor: 'pointer', marginTop: '4px' }}>Cancel</button>}
        </div>
      </form>

      {/* Directory Grid View */}
      <h3>Registered Users ({users.length})</h3>
      {users.length === 0 ? <p style={{ color: '#888' }}>No profile logs visible. Verify Admin ID connection context above.</p> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {users.map((user) => (
            <div key={user.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #eee', borderRadius: '8px', background: '#fff' }}>
              <div>
                <strong>{user.displayName}</strong> <span style={{ fontSize: '12px', color: '#666' }}>(@{user.username})</span>
                <div style={{ fontSize: '13px', color: '#444', marginTop: '2px' }}>{user.email}</div>
                <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>ID: <code>{user.id}</code></div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', background: user.role === 'ADMIN' ? '#ffe6e6' : user.role === 'MANAGER' ? '#e6f2ff' : '#eee', color: user.role === 'ADMIN' ? '#cc0000' : user.role === 'MANAGER' ? '#0066cc' : '#333' }}>
                  {user.role}
                </span>
                {/*<button onClick={() => startEdit(user)} style={{ display: 'block', fontSize: '12px', color: '#0070f3', background: 'none', border: 'none', cursor: 'pointer', marginTop: '8px', padding: 0, width: '100%', textAlign: 'right' }}>Edit Settings</button>*/}
                <div style={{ marginTop: '12px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => startEdit(user)}
                    style={{ fontSize: '13px', color: '#0070f3', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: '500' }}
                  >
                    Edit Settings
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    style={{ fontSize: '13px', color: '#ff3333', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: '500' }}
                  >
                    Remove Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
