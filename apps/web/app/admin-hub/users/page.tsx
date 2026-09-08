'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSecurity } from '../../SecurityContext';
import PageGuard from '../../PageGuard';
import UserForm from './components/UserForm';
import { PageHeader } from '@softwarewolf/ui/page-header';
import { usePageTheme } from '../../hooks/usePageTheme'; // Import your custom theme hook

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

  // Consume your centralized layout page styling context properties
  const { backgroundClass, textClass, cardClass } = usePageTheme();

  // Standardized administrative width constraints
  const widthContainerClass = "w-full max-w-5xl mx-0 md:mx-auto md:w-[85%]";

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json'
  });

  const fetchUsers = () => {
    if (!activeUserId) { setUsers([]); return; }
    fetch('/api/users', { headers: getAuthHeaders() })
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

        if (editingUser.id === activeUserId) {
          updateUserProfile({
            displayName: updated.displayName,
            email: updated.email,
            role: updated.role
          });
        }

        setEditingUser(null);
      } else {
        const res = await fetch('/api/users', {
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

  const getBadgeClass = (role: string) => {
    if (role === 'ADMIN') return 'role-badge-admin';
    if (role === 'MANAGER') return 'role-badge-manager';
    return 'role-badge-user';
  };

  return (
    <PageGuard allowedRoles={['ADMIN', 'MANAGER']}>
      <div className={`w-full min-h-[calc(100vh-73px)] pb-12 transition-colors duration-200 ${backgroundClass} ${textClass}`}>
        <PageHeader
          title="Security & Profile Admin"
          description="Administer active session accounts, view system profiles, and distribute system access tokens."
        />

        {/* Updated layout wrapper to align wide container parameters */}
        <div className={`mt-6 ${widthContainerClass} px-4 md:px-0 flex flex-col gap-6`}>

          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
              Error: {error}
            </div>
          )}

          <div className="mb-4">
            <div className="mb-4">
              <UserForm
                editingUser={editingUser}
                onSave={handleSave}
                onCancel={() => setEditingUser(null)}
                cardClass={cardClass}
              />
            </div>
          </div>

          <h3 className="text-lg font-semibold tracking-tight">Registered Users ({users.length})</h3>

          <div className="flex flex-col gap-4">
            {users.map((user) => (
              /* 
                Replaced 'wolf-panel' with cardClass. Users float dynamically as white blocks 
                over soft gray in light mode, and dark boxes over black in dark mode!
              */
              <div key={user.id} className={`flex items-center justify-between p-4 border rounded-xl shadow-md transition-shadow duration-200 hover:shadow-lg ${cardClass}`}>
                <div>
                  <strong className="text-base font-bold text-slate-900 dark:text-slate-100">{user.displayName}</strong>{' '}
                  <span className="text-xs opacity-60 font-mono">(@{user.username})</span>
                  <div className="text-sm opacity-70 mt-1">{user.email}</div>
                </div>

                <div className="text-right flex flex-col items-end gap-2">
                  <span className={`uppercase tracking-wider px-2 py-0.5 text-xs font-bold rounded ${getBadgeClass(user.role)}`}>
                    {user.role}
                  </span>
                  <div className="mt-2 flex gap-4 text-sm font-semibold">
                    <button
                      onClick={() => setEditingUser(user)}
                      className="text-sky-600 dark:text-sky-400 transition-colors hover:opacity-75 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500 transition-colors hover:text-red-600 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation block links updated to standard Sky accent metrics */}
          <div className="mt-4">
            {userRole === 'ADMIN' && (
              <Link href="/admin-hub" className="inline-flex items-center text-sm font-semibold transition-colors text-sky-600 dark:text-sky-400 hover:opacity-75">
                ← Back to Admin Hub
              </Link>
            )}
          </div>

        </div>
      </div>
    </PageGuard>
  );
}
