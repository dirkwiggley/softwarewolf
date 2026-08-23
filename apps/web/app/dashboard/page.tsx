'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import PageGuard from '../PageGuard'; // Adjusted relative import path for dashboard folder depth

interface WidgetControl {
  controlKey: string;
  heading: string;
  bodyText: string;
}

export default function AdministrativeDashboardPage() {
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

  // Helper function to find specific database card configurations safely
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
    // Strictly locks this workspace view layout down to full Admin roles
    <PageGuard allowedRoles={['ADMIN']}>
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        
        <div className="mb-6 text-left">
          <Link href="/" className="inline-flex items-center text-sm font-medium transition-colors hover:opacity-80" style={{ color: 'var(--color-brand-500)' }}>
            ← Back to Root Index
          </Link>
        </div>

        <h1 className="mb-2 text-4xl font-bold tracking-tight">Infrastructure Control</h1>
        <p className="mb-12 text-sm opacity-70">Welcome to your centralized full-stack ecosystem administration screen.</p>
        
        {error && (
          <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
            Layout Sync Error: {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 text-left sm:grid-cols-2">
          
          {/* Module Card 1: Text loaded from MariaDB row 'home-hub-card' */}
          <div className="wolf-panel flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold tracking-tight mb-2">{homeCard.heading}</h3>
              <p className="mb-6 text-sm opacity-70 leading-relaxed">
                {homeCard.body}
              </p>
            </div>
            <Link href="/home" className="wolf-btn-primary w-full text-sm">
              Enter Hub →
            </Link>
          </div>

          {/* Module Card 2: Text loaded from MariaDB row 'server-metrics-card' */}
          <div className="wolf-panel flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold tracking-tight mb-2">{metricsCard.heading}</h3>
              <p className="mb-6 text-sm opacity-70 leading-relaxed">
                {metricsCard.body}
              </p>
            </div>
            <div className="role-badge-user text-center uppercase tracking-wider py-2 rounded-lg text-xs font-bold">
              ✓ Pipeline Active
            </div>
          </div>

        </div>
      </div>
    </PageGuard>
  );
}
