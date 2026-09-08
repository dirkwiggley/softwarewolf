'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@softwarewolf/ui/page-header';
import PageGuard from "../../../../PageGuard";
import { usePageTheme } from '../../../../hooks/usePageTheme';
import { useSecurity } from '../../../../SecurityContext';

interface NewsArticle {
  id: string;
  title: string;
  author: string;
  sections: Array<{
    heading?: string;
    paragraphs: string[];
  }>;
  button?: {
    text: string;
    href: string;
  } | null;
  sortOrder: number;
  insertBreakAfter: boolean;
}

export default function NewsInEverward() {
  const router = useRouter();
  const { backgroundClass, textClass } = usePageTheme();
  
  // Consume your centralized security state context cleanly
  const { userProfile, loading: authLoading } = useSecurity();
  const activeRole = userProfile?.role || 'GUEST';
  const isAdminOrManager = activeRole === 'ADMIN' || activeRole === 'MANAGER';

  // State management tracking database parameters
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Synchronize state out of the MariaDB Express pipeline endpoints
  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/news-articles');
      if (res.ok) {
        const data = await res.json();
        setArticles(data);
      }
    } catch (err) {
      console.error("Failed to load timeline chronicles:", err);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // 1. Asynchronous deletion management pipeline
  const handleDeleteArticle = async (id: string) => {
    if (!window.confirm("Are you certain you wish to purge this chronicle entry from historical record?")) return;

    try {
      const res = await fetch(`/api/news-articles/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        // Optimistic State Update: Evict the entity locally to eliminate latency lag
        setArticles(prev => prev.filter(article => article.id !== id));
      } else {
        alert("Failed to securely purge requested entry coordinates.");
      }
    } catch (err) {
      alert("Transmission pipeline error: Server unreachable.");
    }
  };

  const sectionClass = "w-full max-w-5xl mx-0 md:mx-auto md:w-[85%] bg-[url('/parchment.jpg')] dark:bg-[linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.55)),url('/parchment.jpg')] bg-cover bg-center p-6 md:p-8 rounded-none md:rounded-lg shadow-md mb-6";
  return (
    <PageGuard allowedRoles={['ADMIN', 'MANAGER', 'USER', 'GUEST']}>
      <div className={`w-full min-h-[calc(100vh-73px)] pb-12 transition-colors duration-200 ${backgroundClass} ${textClass}`}>
        
        {/* Permission Guided Administrative Button Panel */}
        {!authLoading && isAdminOrManager && (
          <div className="w-full bg-amber-950/10 dark:bg-black/40 border-b border-amber-800/20 py-3 px-4 md:px-8 flex justify-end">
            <button
              onClick={() => router.push('/home/campaigns/everward/news-in-everward/admin')}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-amber-800 hover:bg-amber-900 dark:bg-amber-700 dark:hover:bg-amber-600 text-white rounded shadow transition-all duration-150 cursor-pointer flex items-center gap-2"
            >
              ⚙️ Manage News Chronicles
            </button>
          </div>
        )}

        <PageHeader
          title="News in Everward"
          description="The latest rumors, decrees, and happenings across the realm."
        />

        <main className="py-4 flex flex-col">
          {dataLoading ? (
            <div className="text-center py-12 text-sm text-neutral-500 animate-pulse">
              Unrolling parchment chronicles...
            </div>
          ) : (
            <div className={sectionClass}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {articles.map((article, idx) => (
                  <React.Fragment key={article.id || idx}>
                    <div 
                      className="flex flex-col justify-between border border-slate-800/10 dark:border-amber-500/20 border-t-4 border-t-amber-700 dark:border-t-amber-500 bg-white/50 dark:bg-black/40 backdrop-blur-[1px] p-6 rounded-b-md rounded-t-sm shadow-md transition-all hover:shadow-lg"
                    >
                      <div className="flex flex-col gap-4">
                        {/* Header Info Block */}
                        <div className="flex justify-between items-start gap-4 text-left">
                          <div>
                            <h2 className="text-xl font-extrabold text-amber-950 dark:text-amber-200 tracking-wide">
                              {article.title}
                            </h2>
                            <p className="text-xs font-semibold uppercase tracking-wider text-amber-900/80 dark:text-amber-400/90 mt-1">
                              By {article.author}
                            </p>
                          </div>

                          {/* 2. Admin Inline Modification Cluster */}
                          {!authLoading && isAdminOrManager && (
                            <div className="flex items-center gap-2 shrink-0 bg-amber-950/5 dark:bg-black/30 p-1 rounded border border-amber-950/10">
                              <button
                                onClick={() => router.push(`/home/campaigns/everward/news-in-everward/admin?id=${article.id}`)}
                                title="Edit Entry"
                                className="p-1 text-xs hover:bg-amber-800/10 dark:hover:bg-amber-400/10 rounded text-amber-900 dark:text-amber-400 cursor-pointer"
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() => handleDeleteArticle(article.id)}
                                title="Delete Entry"
                                className="p-1 text-xs hover:bg-red-800/10 dark:hover:bg-red-400/10 rounded text-red-800 dark:text-red-400 cursor-pointer"
                              >
                                🗑️
                              </button>
                            </div>
                          )}
                        </div>

                        <hr className="border-amber-800/20 dark:border-amber-500/20 my-1" />

                        {/* Content Section Iteration */}
                        <div className="flex flex-col gap-6">
                          {article.sections.map((sec, secIdx) => (
                            <div key={secIdx} className="text-left">
                              {sec.heading && (
                                <h3 className="text-sm font-bold uppercase tracking-wide text-amber-800 dark:text-amber-400 mb-2">
                                  {sec.heading}
                                </h3>
                              )}
                              
                              <div className="flex flex-col gap-3 text-sm leading-relaxed text-slate-900 dark:text-neutral-200 font-medium opacity-90 dark:opacity-100">
                                {sec.paragraphs.map((p, pIdx) => (
                                  <p key={pIdx}>{p}</p>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {article.button && (
                        <div className="mt-6 text-left">
                          <button
                            onClick={() => router.push(article.button?.href || '')}
                            className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-amber-700 dark:bg-amber-600 hover:bg-amber-800 dark:hover:bg-amber-500 text-white dark:text-black rounded shadow-sm transition-colors duration-150 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500"
                          >
                            {article.button.text}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* The Dynamic Visual Layout Break Controller */}
                    {article.insertBreakAfter && (
                      <div className="col-span-1 md:col-span-2 py-4 flex items-center justify-center">
                        <hr className="w-full border-t-2 border-dashed border-amber-900/30 dark:border-amber-500/20" />
                        <span className="px-4 text-xs font-serif italic text-amber-900/40 dark:text-amber-500/40 select-none whitespace-nowrap">
                          Chronicle Division
                        </span>
                        <hr className="w-full border-t-2 border-dashed border-amber-900/30 dark:border-amber-500/20" />
                      </div>
                    )}
                  </React.Fragment>
                ))}

              </div>
            </div>
          )}
        </main>
      </div>
    </PageGuard>
  );
}
