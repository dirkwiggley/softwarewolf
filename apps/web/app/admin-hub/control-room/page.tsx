'use client';

import React from 'react';
import Link from 'next/link';
import PageGuard from '../../PageGuard';
import { PageHeader } from '@softwarewolf/ui/page-header';
import { usePageTheme } from '../../hooks/usePageTheme';

export default function ControlRoomPage() {
  const { backgroundClass, textClass, cardClass } = usePageTheme();
  const widthContainerClass = "w-full max-w-5xl mx-0 md:mx-auto md:w-[85%]";

  const logs = [
    { time: "17:34:12", type: "DB_SYNC", text: "MariaDB structural layout parameters aligned successfully." },
    { time: "16:21:05", type: "AUTH_GATE", text: "Token signature refresh verified for ADMIN privilege group." },
    { time: "14:02:55", type: "SYS_METRIC", text: "Vercel edge server cache optimization flushed safely." }
  ];

  return (
    <PageGuard allowedRoles={['ADMIN']}>
      <div className={`w-full min-h-[calc(100vh-73px)] pb-12 transition-colors duration-200 ${backgroundClass} ${textClass}`}>
        <PageHeader
          title="Infrastructure Control Room"
          description="Real-time system telemetry, microservice states, and operational logs."
        />

        <div className={`mt-6 ${widthContainerClass} px-4 md:px-0 flex flex-col gap-6`}>
          
          {/* System Telemetry Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 border rounded-xl shadow-md ${cardClass}`}>
              <h3 className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1">Database Conn Pool</h3>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">99.8% Online</p>
            </div>
            <div className={`p-6 border rounded-xl shadow-md ${cardClass}`}>
              <h3 className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1">Active Memory Footprint</h3>
              <p className="text-2xl font-black text-sky-600 dark:text-sky-400">142 MB / Core</p>
            </div>
            <div className={`p-6 border rounded-xl shadow-md ${cardClass}`}>
              <h3 className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1">Gateway API Latency</h3>
              <p className="text-2xl font-black text-amber-600 dark:text-amber-400">14ms Avg</p>
            </div>
          </div>

          {/* Database & System Log Streaming Block */}
          <div className={`p-6 border rounded-xl shadow-md ${cardClass}`}>
            <h3 className="text-sm font-bold tracking-tight mb-4 text-slate-900 dark:text-slate-100">Live MariaDB System Handshakes</h3>
            <div className="flex flex-col gap-2 font-mono text-xs bg-slate-950 text-slate-300 p-4 rounded-lg overflow-x-auto border border-slate-800">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-slate-500 select-none">[{log.time}]</span>
                  <span className="text-cyan-400 font-semibold">[{log.type}]</span>
                  <span className="truncate">{log.text}</span>
                </div>
              ))}
            </div>
          </div>

          <Link href="/admin-hub" className="inline-flex items-center text-sm font-medium text-sky-600 dark:text-sky-400 hover:opacity-80 mt-2">
            ← Back to Admin Hub
          </Link>
        </div>
      </div>
    </PageGuard>
  );
}
