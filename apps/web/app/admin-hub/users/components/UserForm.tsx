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
  cardClass?: string; // Accept the shared thematic card container classes from parent
}

export default function UserForm({ editingUser, onSave, onCancel, cardClass = "" }: UserFormProps) {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'ADMIN' | 'MANAGER' | 'USER'>('USER');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (editingUser) {
      setUsername(editingUser.username);
      setDisplayName(editingUser.displayName);
      setEmail(editingUser.email);
      setRole(editingUser.role);
      setPassword('');
    } else {
      setUsername(''); setDisplayName(''); setEmail(''); setRole('USER'); setPassword('');
    }
  }, [editingUser]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload: any = { username, displayName, email, role };
    if (!editingUser || password.trim() !== '') {
      payload.password = password;
    }
    onSave(payload);
  };

  return (
    /* 
      Replaced 'wolf-panel' with explicit conditional boundaries.
      Falls back to standard high-contrast admin panels if cardClass isn't supplied.
    */
    <form 
      onSubmit={handleSubmit} 
      className={`border p-6 rounded-xl shadow-md grid grid-cols-1 gap-4 sm:grid-cols-2 text-left ${
        cardClass || 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
      }`}
    >
      <h3 className="text-lg font-bold tracking-tight sm:col-span-2 text-slate-950 dark:text-slate-50">
        {editingUser ? 'Edit Profile Settings' : 'Register New User'}
      </h3>
      
      <div>
        <label className="block text-xs font-semibold tracking-wider uppercase opacity-70 mb-1.5">Username:</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          disabled={!!editingUser} 
          required 
          className="w-full rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-transparent outline-none transition-colors focus:border-sky-500 disabled:opacity-40"
        />
      </div>
      
      <div>
        <label className="block text-xs font-semibold tracking-wider uppercase opacity-70 mb-1.5">Display Name:</label>
        <input 
          type="text" 
          value={displayName} 
          onChange={(e) => setDisplayName(e.target.value)} 
          required 
          className="w-full rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-transparent outline-none transition-colors focus:border-sky-500"
        />
      </div>
      
      <div className="sm:col-span-2">
        <label className="block text-xs font-semibold tracking-wider uppercase opacity-70 mb-1.5">Email Address:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          className="w-full rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-transparent outline-none transition-colors focus:border-sky-500"
        />
      </div>
      
      <div className="sm:col-span-2">
        <label className="block text-xs font-semibold tracking-wider uppercase opacity-70 mb-1.5">Clearance Level Role:</label>
        <select 
          value={role} 
          onChange={(e: any) => setRole(e.target.value)} 
          className="w-full rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm outline-none transition-colors focus:border-sky-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 cursor-pointer"
        >
          <option value="USER" className="bg-white dark:bg-slate-900">USER</option>
          <option value="MANAGER" className="bg-white dark:bg-slate-900">MANAGER</option>
          <option value="ADMIN" className="bg-white dark:bg-slate-900">ADMIN</option>
        </select>
      </div>

      <div className="sm:col-span-2">
        <label className="block text-xs font-semibold tracking-wider uppercase opacity-70 mb-1.5">
          {editingUser ? 'Override Account Password (Optional):' : 'Account Security Password:'}
        </label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required={!editingUser} 
          placeholder={editingUser ? "Leave completely blank to preserve current secure hash" : "••••••••"} 
          className="w-full rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm bg-transparent outline-none transition-colors focus:border-sky-500"
        />
      </div>
      
      <div className="sm:col-span-2 mt-2 flex flex-col gap-2">
        {/* Modernized sky accent buttons replacing wolf-btn-primary */}
        <button 
          type="submit" 
          className="w-full text-center py-2.5 text-sm font-semibold rounded-lg bg-sky-600 hover:bg-sky-700 text-white shadow-sm transition-colors duration-150 cursor-pointer"
        >
          Save Profile
        </button>
        {editingUser && (
          <button 
            type="button" 
            onClick={onCancel} 
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 py-2.5 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-700 dark:text-slate-300"
          >
            Cancel Modification
          </button>
        )}
      </div>
    </form>
  );
}
