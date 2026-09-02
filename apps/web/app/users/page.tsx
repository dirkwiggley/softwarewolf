'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSecurity } from '../SecurityContext';
import PageGuard from '../PageGuard';
import UserForm from './components/UserForm';
import { PageHeader } from '@softwarewolf/ui/page-header';

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
  
  const { userProfile, updateUserProfile } = useSecurity();
  const activeUserId = userProfile?.id || null;
  const userRole = userProfile?.role || 'GUEST';

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json'
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

        // If the administrator just edited their own active profile record, sync the global memory context layout instantly
        if (editingUser.id === activeUserId) {
          updateUserProfile({
            displayName: updated.displayName,
            email: updated.email,
            role: updated.role
          });
        }

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
    } catch (err: any) { setError(err.message); }
  };

  // Helper utility to pair incoming role states to our shared theme badge tokens
  const getBadgeClass = (role: string) => {
    if (role === 'ADMIN') return 'role-badge-admin';
    if (role === 'MANAGER') return 'role-badge-manager';
    return 'role-badge-user';
  };

  return (
    <PageGuard allowedRoles={['ADMIN', 'MANAGER']}>
      <PageHeader
        title="Security & Profile Admin"
        description=""
      />

      {/* Outer structural layout wrapper that covers the viewport width and centers its children horizontally */}
      <div className="flex w-full justify-center px-6 py-12">
        
        {/* Inner content box that maintains the strict left alignment format for your directory details */}
        <div className="w-full max-w-2xl text-left">
          
          {error && (
            <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
              Error: {error}
            </div>
          )}

          <div className="mb-8">
            <UserForm editingUser={editingUser} onSave={handleSave} onCancel={() => setEditingUser(null)} />
          </div>

          <h3 className="text-lg font-semibold tracking-tight mb-4">Registered Users ({users.length})</h3>
          
          <div className="flex flex-col gap-4">
            {users.map((user) => (
              <div key={user.id} className="wolf-panel flex items-center justify-between p-4">
                <div>
                  <strong className="text-base font-semibold">{user.displayName}</strong>{' '}
                  <span className="text-xs opacity-60">(@{user.username})</span>
                  <div className="text-sm opacity-70 mt-1">{user.email}</div>
                </div>
                
                <div className="text-right">
                  <span className={`uppercase tracking-wider px-2 py-0.5 text-xs font-bold rounded ${getBadgeClass(user.role)}`}>
                    {user.role}
                  </span>
                  <div className="mt-3 flex gap-4 justify-end text-sm">
                    <button 
                      onClick={() => setEditingUser(user)} 
                      className="font-medium transition-colors hover:opacity-70 cursor-pointer"
                      style={{ color: 'var(--color-brand-500)' }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id)} 
                      className="font-medium text-red-500 transition-colors hover:text-red-600 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-6">
            {userRole === 'ADMIN' && (
              <Link href="/admin-hub" className="inline-flex items-center text-sm font-medium transition-colors hover:opacity-80" style={{ color: 'var(--color-brand-500)' }}>
                ← Back to Admin Hub
              </Link>
            )}
          </div>

        </div>
      </div>
    </PageGuard>
  );
}
