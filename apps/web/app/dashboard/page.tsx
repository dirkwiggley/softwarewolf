'use client';

import { useEffect, useState, FormEvent } from 'react';
import Link from 'next/link';
import PageGuard from '../PageGuard'; // <-- Import our frontend gatekeeper
import type { HealthResponse, ActivityItem } from '@repo/types';

export default function DashboardPage() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [inputTitle, setInputTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/system/health').then(res => res.json()),
      fetch('/api/system/activities').then(res => res.json())
    ])
      .then(([healthData, listItems]: [HealthResponse, ActivityItem[]]) => {
        setHealth(healthData);
        setItems(listItems);
      })
      .catch((err) => setError(err.message));
  }, []);

  const handleAddItem = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputTitle.trim()) return;

    try {
      const res = await fetch('/api/system/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: inputTitle })
      });

      if (!res.ok) throw new Error('Failed to push state item upstream');
      const addedItem: ActivityItem = await res.json();
      
      setItems((prev) => [addedItem, ...prev]);
      setInputTitle('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      const res = await fetch(`/api/system/activities/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete item from database');
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    // Guard this entire page view: Only let ADMIN or MANAGER tiers step inside!
    <PageGuard allowedRoles={['ADMIN', 'MANAGER']}>
      <div style={{ padding: '3rem', fontFamily: 'system-ui, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <Link href="/" style={{ color: '#0070f3', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
            ← Back to Home
          </Link>
        </div>

        <h1>Softwarewolf Dashboard Loop</h1>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        <div style={{ padding: '1rem', border: '1px solid #eee', borderRadius: '8px', marginBottom: '1.5rem' }}>
          Status: <strong style={{ color: 'green' }}>{health?.status || 'Connecting...'}</strong>
          <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#666' }}>{health?.message}</p>
        </div>

        <form onSubmit={handleAddItem} style={{ display: 'flex', gap: '8px', marginBottom: '2rem' }}>
          <input
            type="text"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            placeholder="Log a system event..."
            style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '15px' }}
          />
          <button type="submit" style={{ padding: '10px 16px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            Submit State
          </button>
        </form>

        <h3>Live Activity Stream logs:</h3>
        <ul style={{ padding: 0, listStyle: 'none' }}>
          {items.map((item) => (
            <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f5f5f5' }}>
              <div>
                <span>{item.title}</span> — <small style={{ color: '#888' }}>{new Date(item.createdAt).toLocaleTimeString()}</small>
              </div>
              <button 
                onClick={() => handleDeleteItem(item.id)}
                style={{ background: 'transparent', color: '#ff3333', border: '1px solid #ffcccc', borderRadius: '4px', padding: '4px 8px', fontSize: '12px', cursor: 'pointer', fontWeight: '500' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </PageGuard>
  );
}
