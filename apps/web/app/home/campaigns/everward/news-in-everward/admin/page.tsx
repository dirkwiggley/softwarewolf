'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PageHeader } from '@softwarewolf/ui/page-header';
import PageGuard from "../../../../../PageGuard";
import { usePageTheme } from '../../../../../hooks/usePageTheme';

interface Section {
  heading: string;
  paragraphs: string[];
}

interface ButtonConfig {
  text: string;
  href: string;
}

// 1. Wrap main component in Suspense boundary to satisfy Next.js useSearchParams requirements
export default function NewsAdminDashboard() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-sm text-neutral-500">Loading form context...</div>}>
      <AdminFormCore />
    </Suspense>
  );
}

function AdminFormCore() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { backgroundClass, textClass } = usePageTheme();

  // Dual-State Detection: Check if we are modifying an existing item
  const editId = searchParams.get('id');
  const isEditMode = !!editId;

  // Core Form Input State
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [sortOrder, setSortOrder] = useState('0');
  const [insertBreakAfter, setInsertBreakAfter] = useState(false);
  
  // Nested Repeatable Sections State Mapping
  const [sections, setSections] = useState<Section[]>([{ heading: '', paragraphs: [''] }]);
  
  // Optional Interactive Button Navigation State
  const [hasButton, setHasButton] = useState(false);
  const [buttonText, setButtonText] = useState('');
  const [buttonHref, setButtonHref] = useState('');

  // Operational Logging Flags
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorLog, setErrorLog] = useState<string | null>(null);

  // 2. Fetch record values if an Edit ID parameter exists
  useEffect(() => {
    if (!isEditMode) return;

    async function loadArticle() {
      try {
        const res = await fetch('/api/news-articles');
        if (res.ok) {
          const articles = await res.json();
          const target = articles.find((a: any) => a.id === editId);
          if (target) {
            setTitle(target.title);
            setAuthor(target.author);
            setSortOrder(String(target.sortOrder));
            setInsertBreakAfter(target.insertBreakAfter);
            setSections(target.sections || [{ heading: '', paragraphs: [''] }]);
            if (target.button) {
              setHasButton(true);
              setButtonText(target.button.text || '');
              setButtonHref(target.button.href || '');
            }
          } else {
            setErrorLog("Requested timeline record could not be found.");
          }
        }
      } catch (err) {
        setErrorLog("Failed to sync record parameters from server repository.");
      }
    }
    loadArticle();
  }, [editId, isEditMode]);

  // Structural Handlers for dynamic section layout manipulation
  const addSection = () => setSections([...sections, { heading: '', paragraphs: [''] }]);
  const updateSectionHeading = (index: number, val: string) => {
    const updated = [...sections];
    if (!updated[index]) return;
    updated[index].heading = val;
    setSections(updated);
  };
  const updateParagraph = (secIdx: number, pIdx: number, val: string) => {
    const updated = [...sections];
    if (!updated[secIdx]) return;
    updated[secIdx].paragraphs[pIdx] = val;
    setSections(updated);
  };
  const addParagraphToSection = (secIdx: number) => {
    const updated = [...sections];
    if (!updated[secIdx]) return;
    updated[secIdx].paragraphs.push('');
    setSections(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorLog(null);

    const cleanSections = sections.map(sec => ({
      heading: sec.heading.trim(),
      paragraphs: sec.paragraphs.map(p => p.trim()).filter(p => p !== '')
    })).filter(sec => sec.paragraphs.length > 0);

    if (!title.trim() || !author.trim() || cleanSections.length === 0) {
      setErrorLog("Title, Author, and at least one text block paragraph are required fields.");
      setIsSubmitting(false);
      return;
    }

    const buttonPayload: ButtonConfig | null = hasButton && buttonText.trim() && buttonHref.trim()
      ? { text: buttonText.trim(), href: buttonHref.trim() }
      : null;

    const payload = {
      title: title.trim(),
      author: author.trim(),
      sections: cleanSections,
      button: buttonPayload,
      sortOrder: Number(sortOrder) || 0,
      insertBreakAfter
    };

    try {
      // 3. Toggle HTTP verb mapping dynamically based on mode
      const targetUrl = isEditMode ? `/api/news-articles/${editId}` : '/api/news-articles';
      const targetMethod = isEditMode ? 'PATCH' : 'POST';

      const res = await fetch(targetUrl, {
        method: targetMethod,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        router.push('/home/campaigns/everward/news-in-everward');
        router.refresh();
      } else {
        const errData = await res.json();
        setErrorLog(errData.error || "Failed to commit record updates to server parameters.");
      }
    } catch (err) {
      setErrorLog("Network transit pipeline breakdown: server unreachable.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const sectionClass = "w-full max-w-3xl mx-0 md:mx-auto md:w-[85%] bg-[url('/parchment.jpg')] dark:bg-[linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.55)),url('/parchment.jpg')] bg-cover bg-center p-6 md:p-8 rounded-none md:rounded-lg shadow-xl mb-6 text-slate-900";
  return (
    <PageGuard allowedRoles={['ADMIN', 'MANAGER']}>
      <div className={`w-full min-h-[calc(100vh-73px)] pb-12 transition-colors duration-200 ${backgroundClass} ${textClass}`}>
        <PageHeader
          title={isEditMode ? "Modify Chronicle Entry" : "Forge Chronicle Entry"}
          description="Append or edit historical records, local announcements, or visual divider breaks directly inside the timeline layers."
        />

        <main className="py-4 flex flex-col items-center px-4 md:px-0">
          <form onSubmit={handleSubmit} className={sectionClass}>
            
            {errorLog && (
              <div className="mb-6 p-4 bg-red-900/20 border border-red-700/40 rounded text-red-700 dark:text-red-300 text-xs font-semibold uppercase tracking-wider">
                ⚠️ {errorLog}
              </div>
            )}

            {/* Core Metadata Segment Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-950 dark:text-amber-200">Article Title</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded bg-white/70 dark:bg-black/30 border border-amber-900/20 focus:outline-none focus:ring-2 focus:ring-amber-700 text-sm font-medium"
                  placeholder="The Coming Storm..."
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-950 dark:text-amber-200">Chronicler / Author</label>
                <input 
                  type="text" 
                  value={author} 
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full p-2.5 rounded bg-white/70 dark:bg-black/30 border border-amber-900/20 focus:outline-none focus:ring-2 focus:ring-amber-700 text-sm font-medium"
                  placeholder="Scribe Benjamin"
                />
              </div>
            </div>

            {/* Repeatable Sections Stack Container */}
            <div className="border-t border-amber-950/10 dark:border-amber-500/20 pt-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-extrabold uppercase tracking-wide text-amber-900 dark:text-amber-300">Content Sections</h3>
                <button 
                  type="button" 
                  onClick={addSection}
                  className="px-3 py-1 text-[11px] font-bold uppercase tracking-wide bg-amber-800 text-white rounded hover:bg-amber-900 cursor-pointer transition-colors"
                >
                  + Add Block Section
                </button>
              </div>

              {sections.map((sec, secIdx) => (
                <div key={secIdx} className="mb-6 p-4 rounded bg-white/40 dark:bg-black/20 border border-amber-950/5 dark:border-amber-500/10 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">Section Sub-Heading (Optional)</label>
                    <input 
                      type="text" 
                      value={sec.heading}
                      onChange={(e) => updateSectionHeading(secIdx, e.target.value)}
                      className="w-full p-2 rounded bg-white/60 dark:bg-black/20 border border-amber-900/10 focus:outline-none focus:ring-1 focus:ring-amber-700 text-sm"
                      placeholder="E.g., Whispers in the Tavern"
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">Paragraphs</label>
                    {sec.paragraphs.map((p, pIdx) => (
                      <textarea
                        key={pIdx}
                        value={p}
                        onChange={(e) => updateParagraph(secIdx, pIdx, e.target.value)}
                        rows={3}
                        className="w-full p-2 rounded bg-white/60 dark:bg-black/20 border border-amber-900/10 focus:outline-none focus:ring-1 focus:ring-amber-700 text-sm leading-relaxed text-slate-900"
                        placeholder="Type historical account data here..."
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() => addParagraphToSection(secIdx)}
                      className="self-start text-[10px] font-bold uppercase tracking-wide text-amber-900 dark:text-amber-400 hover:text-amber-700 transition-colors"
                    >
                      + Append Paragraph Node
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Layout Positioning & Structural Line Breaks Controls */}
            <div className="border-t border-amber-950/10 dark:border-amber-500/20 pt-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-950 dark:text-amber-200">Timeline Layout Order Index</label>
                <input 
                  type="number" 
                  value={sortOrder} 
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-32 p-2 rounded bg-white/70 dark:bg-black/30 border border-amber-900/20 text-sm font-medium"
                />
              </div>

              <div className="flex items-center gap-3 md:pt-6">
                <input 
                  type="checkbox" 
                  id="insertBreak"
                  checked={insertBreakAfter} 
                  onChange={(e) => setInsertBreakAfter(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-700 accent-amber-800 cursor-pointer"
                />
                <label htmlFor="insertBreak" className="text-xs font-bold uppercase tracking-wider text-amber-950 dark:text-amber-200 cursor-pointer select-none">
                  Mount Visual Break (<hr /> Division) After This Card
                </label>
              </div>
            </div>

            {/* Optional Interaction Call-to-Action Link Elements */}
            <div className="border-t border-amber-950/10 dark:border-amber-500/20 pt-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <input 
                  type="checkbox" 
                  id="toggleButton"
                  checked={hasButton} 
                  onChange={(e) => setHasButton(e.target.checked)}
                  className="w-4 h-4 text-amber-700 accent-amber-800 cursor-pointer"
                />
                <label htmlFor="toggleButton" className="text-xs font-bold uppercase tracking-wider text-amber-950 dark:text-amber-200 cursor-pointer select-none">
                  Attach Dynamic Routing Button to Card Foot
                </label>
              </div>
              
              {hasButton && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded bg-white/40 dark:bg-black/20 border border-amber-950/5">
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">Button Display Text</label>
                    <input 
                      type="text" 
                      value={buttonText} 
                      onChange={(e) => setButtonText(e.target.value)}
                      className="w-full p-2 rounded bg-white/60 dark:bg-black/20 border border-amber-900/10 text-sm"
                      placeholder="Read Full Decree"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">Internal Navigation Destination Path</label>
                    <input 
                      type="text" 
                      value={buttonHref} 
                      onChange={(e) => setButtonHref(e.target.value)}
                      className="w-full p-2 rounded bg-white/60 dark:bg-black/20 border border-amber-900/10 text-sm"
                      placeholder="/home/campaigns/everward/decrees/..."
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Form Execution Operations Bar */}
            <div className="flex items-center justify-end gap-4 border-t border-amber-950/10 dark:border-amber-500/20 pt-6">
              <button 
                type="button" 
                onClick={() => router.push('/home/campaigns/everward/news-in-everward')}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-transparent border border-amber-900/30 text-amber-950 dark:text-amber-200 rounded hover:bg-amber-950/5 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-amber-800 text-white rounded hover:bg-amber-900 disabled:opacity-50 cursor-pointer shadow transition-all"
              >
                {isSubmitting ? "Writing Coordinates..." : isEditMode ? "Save Changes" : "Commit Entry to Realm"}
              </button>
            </div>

          </form>
        </main>
      </div>
    </PageGuard>
  );
}