'use client';

import { useState, useEffect, FormEvent } from 'react';

interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'USER';
}

interface UserFormProps {
  editingUser: UserProfile | null;
  onSave: (data: any) => Promise<void>;
  onCancel: () => void;
}

export default function UserForm({ editingUser, onSave, onCancel }: UserFormProps) {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'ADMIN' | 'MANAGER' | 'USER'>('USER');

  useEffect(() => {
    if (editingUser) {
      setUsername(editingUser.username);
      setDisplayName(editingUser.displayName);
      setEmail(editingUser.email);
      setRole(editingUser.role);
    } else {
      setUsername(''); setDisplayName(''); setEmail(''); setRole('USER');
    }
  }, [editingUser]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave({ username, displayName, email, role });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '1.5rem', border: '1px solid #eaeaea', borderRadius: '12px', marginBottom: '2rem' }}>
      <h3 style={{ gridColumn: 'span 2', margin: '0 0 4px 0' }}>{editingUser ? 'Edit Profile Settings' : 'Register New User'}</h3>
      <div>
        <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} disabled={!!editingUser} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Display Name:</label>
        <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
      </div>
      <div style={{ gridColumn: 'span 2' }}>
        <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Email Address:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
      </div>
      <div style={{ gridColumn: 'span 2' }}>
        <label style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>Clearance Level Role:</label>
        <select value={role} onChange={(e: any) => setRole(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', background: '#fff', boxSizing: 'border-box' }}>
          <option value="USER">USER</option>
          <option value="MANAGER">MANAGER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </div>
      <div style={{ gridColumn: 'span 2', marginTop: '8px' }}>
        <button type="submit" style={{ width: '100%', padding: '10px', background: '#222', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Save Profile</button>
        {editingUser && <button type="button" onClick={onCancel} style={{ width: '100%', padding: '8px', background: 'transparent', color: '#666', border: 'none', cursor: 'pointer', marginTop: '4px' }}>Cancel</button>}
      </div>
    </form>
  );
}
