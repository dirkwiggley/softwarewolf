'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSecurity } from '../SecurityContext'
import ContextSwitcher from './users/components/ContextSwitcher';
import UserForm from './users/components/UserForm';

interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'USER';
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { activeUserId, setActiveUserId } = useSecurity();

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'x-mock-user-id': activeUserId
  });

  const fetchUsers = () => {
    if (!activeUserId) { setUsers([]); return; }
    fetch('/api/system/users', { headers: getAuthHeaders() })
      .then(res => { if (!res.ok) throw new Error(`HTTP Error ${res.status}`); return res.json(); })
      .then(data => { setUsers(data); setError(null); })
      .catch(err => setError(err.message));
  };

  useEffect(() => { fetchUsers(); }, [activeUserId]);

  const handleSave = async (formData: any) => {
    setError(null);
    try {
      if (editingUser) {
        const res = await fetch(`/api/system/users/${editingUser.id}`, {
          method: 'PATCH',
          headers: getAuthHeaders(),
          body: JSON.stringify(formData)
        });
        if (!res.ok) throw new Error('Failed to update user');
        const updated = await res.json();
        setUsers(prev => prev.map(u => u.id === editingUser.id ? updated : u));
        setEditingUser(null);
      } else {
        const res = await fetch('/api/system/users', {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(formData)
        });
        if (!res.ok) throw new Error('Failed to create user');
        const created = await res.json();
        setUsers(prev => [created, ...prev]);
      }
    } catch (err: any) { setError(err.message); }
  };

  const handleDelete = async (id: string) => {
    setError(null);
    try {
      const res = await fetch(`/api/system/users/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
      if (!res.ok) { const data = await res.json(); throw new Error(data.error || 'Delete failed'); }
      setUsers(prev => prev.filter(u => u.id !== id));
      if (activeUserId === id) setActiveUserId('');
    } catch (err: any) { setError(err.message); }
  };

  return (
    <div style={{ padding: '3rem', fontFamily: 'system-ui, sans-serif', maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1rem' }}>
        <Link href="/home" style={{ color: '#0070f3', textDecoration: 'none', fontSize: '14px' }}>← Back to Home Hub</Link>
      </div>

      <h1>Security & Profile Directory</h1>
      <ContextSwitcher users={users} />
      {error && <p style={{ color: 'red', background: '#fff5f5', padding: '10px', borderRadius: '4px', border: '1px solid #ffcccc' }}>Error: {error}</p>}
      <UserForm editingUser={editingUser} onSave={handleSave} onCancel={() => setEditingUser(null)} />

      <h3>Registered Users ({users.length})</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {users.map((user) => (
          <div key={user.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #eee', borderRadius: '8px', background: '#fff' }}>
            <div>
              <strong>{user.displayName}</strong> <span style={{ fontSize: '12px', color: '#666' }}>(@{user.username})</span>
              <div style={{ fontSize: '13px', color: '#444', marginTop: '2px' }}>{user.email}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ display: 'inline-block', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', background: user.role === 'ADMIN' ? '#ffe6e6' : '#eee', color: user.role === 'ADMIN' ? '#cc0000' : '#333' }}>{user.role}</span>
              <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                <button onClick={() => setEditingUser(user)} style={{ fontSize: '12px', color: '#0070f3', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Edit</button>
                <button onClick={() => handleDelete(user.id)} style={{ fontSize: '12px', color: '#ff3333', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
