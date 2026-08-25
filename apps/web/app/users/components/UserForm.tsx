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
  /* 1a. Introduce a tracking string for the password state management vector */
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (editingUser) {
      setUsername(editingUser.username);
      setDisplayName(editingUser.displayName);
      setEmail(editingUser.email);
      setRole(editingUser.role);
      /* 1b. Empty the password field placeholder when toggling onto an edit target */
      setPassword('');
    } else {
      setUsername(''); setDisplayName(''); setEmail(''); setRole('USER'); setPassword('');
    }
  }, [editingUser]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    /* 1c. Compile the credential bundle object—omitting an empty password property block if in edit mode */
    const payload: any = { username, displayName, email, role };
    if (!editingUser || password.trim() !== '') {
      payload.password = password;
    }
    onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="wolf-panel grid grid-cols-1 gap-4 sm:grid-cols-2">
      <h3 className="text-lg font-semibold tracking-tight sm:col-span-2">
        {editingUser ? 'Edit Profile Settings' : 'Register New User'}
      </h3>
      
      <div>
        <label className="block text-xs font-medium opacity-80 mb-1.5">Username:</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          disabled={!!editingUser} 
          required 
          className="w-full rounded-lg border px-3 py-2 text-sm bg-transparent outline-none transition-colors focus:border-sky-500 disabled:opacity-40"
          style={{ borderColor: 'var(--color-wolf-border)' }}
        />
      </div>
      
      <div>
        <label className="block text-xs font-medium opacity-80 mb-1.5">Display Name:</label>
        <input 
          type="text" 
          value={displayName} 
          onChange={(e) => setDisplayName(e.target.value)} 
          required 
          className="w-full rounded-lg border px-3 py-2 text-sm bg-transparent outline-none transition-colors focus:border-sky-500"
          style={{ borderColor: 'var(--color-wolf-border)' }}
        />
      </div>
      
      <div className="sm:col-span-2">
        <label className="block text-xs font-medium opacity-80 mb-1.5">Email Address:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          className="w-full rounded-lg border px-3 py-2 text-sm bg-transparent outline-none transition-colors focus:border-sky-500"
          style={{ borderColor: 'var(--color-wolf-border)' }}
        />
      </div>
      
      <div className="sm:col-span-2">
        <label className="block text-xs font-medium opacity-80 mb-1.5">Clearance Level Role:</label>
        <select 
          value={role} 
          onChange={(e: any) => setRole(e.target.value)} 
          className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-sky-500"
          style={{ borderColor: 'var(--color-wolf-border)', backgroundColor: 'var(--color-wolf-card)', color: 'var(--color-wolf-text)' }}
        >
          <option value="USER">USER</option>
          <option value="MANAGER">MANAGER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </div>

      {/* 1d. Mount the custom reactive password input block using smart placeholder rules */}
      <div className="sm:col-span-2">
        <label className="block text-xs font-medium opacity-80 mb-1.5">
          {editingUser ? 'Override Account Password (Optional):' : 'Account Security Password:'}
        </label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required={!editingUser} 
          placeholder={editingUser ? "Leave completely blank to preserve current secure hash" : "••••••••"} 
          className="w-full rounded-lg border px-3 py-2 text-sm bg-transparent outline-none transition-colors focus:border-sky-500"
          style={{ borderColor: 'var(--color-wolf-border)' }}
        />
      </div>
      
      <div className="sm:col-span-2 mt-2 flex flex-col gap-2">
        <button type="submit" className="wolf-btn-primary w-full text-sm font-semibold">
          Save Profile
        </button>
        {editingUser && (
          <button 
            type="button" 
            onClick={onCancel} 
            className="w-full rounded-lg py-2 text-sm font-medium opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
