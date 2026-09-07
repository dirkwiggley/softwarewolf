'use client';

import { useRouter } from 'next/navigation';
import { PageHeader } from '@softwarewolf/ui/page-header';
import PageGuard from "../../../../PageGuard";

// Updated mock data configuration using string paths instead of hardcoded click alerts
const NEWS_ARTICLES = [
  {
    title: "The Royal Moot Concludes",
    author: "Grand Maester Elidor",
    sections: [
      {
        heading: "New Trade Laws Passed",
        paragraphs: [
          "The Parliament has wrapped up its annual month-long session at the Royal Moot. King Monroe signed off on several key pieces of legislation concerning international trade tariffs along the coast.",
          "Merchants from Mossgard and Helmfirth should expect minor adjustments to dockage fees starting next month. Diplomacy carried the day, maintaining the light hand of governance the kingdom is famous for."
        ]
      }
    ],
    // The optional button points to a path after your /app directory structure
    button: {
      text: "Read Full Decree",
      href: "/home/campaigns/everward/decrees/royal-moot-2026"
    }
  },
  {
    title: "Graemane's Envoy Arrives",
    author: "Scribe Thomas",
    sections: [
      {
        heading: "A Rare Sight in the Capital",
        paragraphs: [
          "Confidants of the high wizard Graemane were spotted arriving at the university gates late last evening. Whispers suggest they carry ominous news from his far North East tower."
        ]
      }
    ]
  }
];

export default function NewsInEverward() {
  const router = useRouter();
  const sectionClass = "w-full max-w-5xl mx-0 md:mx-auto md:w-[85%] bg-[url('/parchment.jpg')] bg-cover bg-center p-6 md:p-8 rounded-none md:rounded-lg shadow-md mb-6";

  return (
    <PageGuard allowedRoles={['ADMIN', 'MANAGER', 'USER', 'GUEST']}>
      <PageHeader
        title="News in Everward"
        description="The latest rumors, decrees, and happenings across the realm."
      />

      <main className="py-4 flex flex-col">
        <div className={sectionClass}>
          
          {/* 2-Column Responsive Grid Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {NEWS_ARTICLES.map((article, idx) => (
              <div 
                key={idx} 
                className="flex flex-col justify-between border border-slate-800/20 border-t-4 border-t-amber-700 bg-white/40 backdrop-blur-[1px] p-6 rounded-b-md rounded-t-sm shadow-md transition-all hover:shadow-lg"
              >
                
                {/* Content Block Wrapper */}
                <div className="flex flex-col gap-4">
                  {/* Header Info */}
                  <div className="text-left">
                    <h2 className="text-xl font-extrabold text-amber-950 tracking-wide">{article.title}</h2>
                    <p className="text-xs font-medium uppercase tracking-wider text-amber-900/80 mt-1">By {article.author}</p>
                  </div>

                  <hr className="border-amber-800/20 my-1" />

                  {/* Repeatable Content Sections */}
                  <div className="flex flex-col gap-6">
                    {article.sections.map((sec, secIdx) => (
                      <div key={secIdx} className="text-left">
                        {sec.heading && (
                          <h3 className="text-sm font-bold uppercase tracking-wide text-amber-800 mb-2">{sec.heading}</h3>
                        )}
                        
                        <div className="flex flex-col gap-3 text-sm leading-relaxed text-slate-900 font-medium opacity-90">
                          {sec.paragraphs.map((p, pIdx) => (
                            <p key={pIdx}>{p}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Optional Interactive Button Block using Next.js Router */}
                {article.button && (
                  <div className="mt-6 text-left">
                    <button
                      onClick={() => router.push(article.button!.href)}
                      className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-amber-700 hover:bg-amber-800 text-white rounded shadow-sm transition-colors duration-150 ease-in-out cursor-pointer"
                    >
                      {article.button.text}
                    </button>
                  </div>
                )}

              </div>
            ))}

          </div>

        </div>
      </main>
    </PageGuard>
  );
}
