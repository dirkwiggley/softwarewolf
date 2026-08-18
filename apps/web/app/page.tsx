'use client';

import { useEffect, useState, FormEvent } from 'react';
import type { HealthResponse, ActivityItem } from '@repo/types';

export default function Home() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [inputTitle, setInputTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Load the initial backend data matrices
  useEffect(() => {
    Promise.all([
      fetch('http://localhost:5001/api/system/health').then(res => res.json()),
      fetch('http://localhost:5001/api/system/activities').then(res => res.json())
    ])
      .then(([healthData, listItems]: [HealthResponse, ActivityItem[]]) => {
        setHealth(healthData);
        setItems(listItems);
      })
      .catch((err) => setError(err.message));
  }, []);

  // Form submit function handler pushing state loop mutations to Express
  const handleAddItem = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputTitle.trim()) return;

    try {
      // LINE 30: Changed from 5000 to 5001 to match your new environment variables port!
      const res = await fetch('http://localhost:5001/api/system/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: inputTitle })
      });

      if (!res.ok) throw new Error('Failed to push state item upstream');
      const addedItem: ActivityItem = await res.json();
      
      // Update local state loop by appending the server's authorized entity response
      setItems((prev) => [...prev, addedItem]);
      setInputTitle('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '3rem', fontFamily: 'system-ui, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Softwarewolf Dashboard Loop</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Box 1: Health Tracker Status Display */}
      <div style={{ padding: '1rem', border: '1px solid #eee', borderRadius: '8px', marginBottom: '1.5rem' }}>
        Status: <strong style={{ color: 'green' }}>{health?.status || 'Connecting...'}</strong>
        <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#666' }}>{health?.message}</p>
      </div>

      {/* Box 2: Mutatable State Input Interface Form */}
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

      {/* Box 3: Live Synchronized Active List Stream rendering */}
      <h3>Live Activity Stream logs:</h3>
      <ul style={{ paddingLeft: '1.2rem', lineHeight: '1.8' }}>
        {items.map((item) => (
          <li key={item.id}>
            <span>{item.title}</span> — <small style={{ color: '#888' }}>{new Date(item.createdAt).toLocaleTimeString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
