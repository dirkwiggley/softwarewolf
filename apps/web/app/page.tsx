'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface WidgetControl {
  controlKey: string;
  heading: string;
  bodyText: string;
}

export default function Home() {
  const [widgets, setWidgets] = useState<WidgetControl[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch layout rules dynamically through the Next.js proxy
    fetch('/api/system/widgets')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to pull custom layouts');
        return res.json();
      })
      .then((data: WidgetControl[]) => setWidgets(data))
      .catch((err) => setError(err.message));
  }, []);

  // Helper helper function to find specific database card configurations safely
  const getCardData = (key: string, defaultHeading: string, defaultBody: string) => {
    const found = widgets.find(w => w.controlKey === key);
    return {
      heading: found ? found.heading : defaultHeading,
      body: found ? found.bodyText : defaultBody
    };
  };

  const homeCard = getCardData('home-hub-card', 'Home Hub', 'Loading...');
  const metricsCard = getCardData('server-metrics-card', 'Server Metrics', 'Loading...');

  return (
    <div style={{ padding: '4rem 2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Softwarewolf Home</h1>
      <p style={{ color: '#666', marginBottom: '3rem' }}>Welcome to your centralized full-stack ecosystem control screen.</p>
      
      {error && <p style={{ color: 'red' }}>Layout Sync Error: {error}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', textAlign: 'left' }}>
        
        {/* Module Card 1: Text loaded from MariaDB row 'home-hub-card' */}
        <div style={{ padding: '1.5rem', border: '1px solid #eaeaea', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.01)' }}>
          <h3 style={{ marginTop: 0, marginBottom: '8px' }}>{homeCard.heading}</h3>
          <p style={{ margin: '0 0 1.5rem 0', fontSize: '14px', color: '#666', lineHeight: '1.4' }}>
            {homeCard.body}
          </p>
          <Link href="/home" style={{ display: 'block', textAlign: 'center', padding: '10px', background: '#222', color: '#fff', textDecoration: 'none', borderRadius: '6px', fontWeight: '500', fontSize: '14px' }}>
            Enter Hub →
          </Link>
        </div>

        {/* Module Card 2: Text loaded from MariaDB row 'server-metrics-card' */}
        <div style={{ padding: '1.5rem', border: '1px solid #eaeaea', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.01)' }}>
          <h3 style={{ marginTop: 0, marginBottom: '8px' }}>{metricsCard.heading}</h3>
          <p style={{ margin: '0 0 1.5rem 0', fontSize: '14px', color: '#666', lineHeight: '1.4' }}>
            {metricsCard.body}
          </p>
          <Link href="/dashboard" style={{ display: 'block', textAlign: 'center', padding: '10px', background: '#0070f3', color: '#fff', textDecoration: 'none', borderRadius: '6px', fontWeight: '500', fontSize: '14px' }}>
            Open Logs →
          </Link>
        </div>

      </div>
    </div>
  );
}
