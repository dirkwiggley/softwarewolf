'use client';

import { PageHeader } from '@softwarewolf/ui/page-header';
import PageGuard from "../../../../PageGuard";

// Mock data structure to cleanly handle your dynamic, repeatable blocks
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
      },
      {
        heading: "Tax Exemptions for Alchemists",
        paragraphs: [
          "In a surprising turn of events, low-level hedge mages and registered herbalists will receive small subsidies to boost the kingdom's potion reserves.",
        ]
      }
    ]
  },
  {
    title: "Graemane's Envoy Arrives",
    author: "Scribe Thomas",
    sections: [
      {
        heading: "A Rare Sight in the Capital",
        paragraphs: [
          "Confidants of the high wizard Graemane were spotted arriving at the university gates late last evening. Whispers suggest they carry ominous news from his far North East tower.",
          "While powerful magical items remain rare, city guards noted an unusual shimmer surrounding the envoy's luggage cart, sparking rumors of a major magical breakthrough."
        ]
      }
    ]
  }
];

export default function NewsInEverward() {
  // Matching the exact layout parameters from your campaign notes page
  const sectionClass = "w-full max-w-5xl mx-0 md:mx-auto md:w-[85%] bg-[url('/parchment.jpg')] bg-cover bg-center p-6 md:p-8 rounded-none md:rounded-lg shadow-md mb-6";

  return (
    <PageGuard allowedRoles={['ADMIN', 'MANAGER', 'USER', 'GUEST']}>
      <PageHeader
        title="News in Everward"
        description="The latest rumors, decrees, and happenings across the realm."
      />

      <main className="py-4 flex flex-col">
        {/* Parchment Wrapper Container */}
        <div className={sectionClass}>
          
          {/* 2-Column Responsive Grid Area */}
          {/* 2-Column Responsive Grid Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {NEWS_ARTICLES.map((article, idx) => (
              /* News Card Component with Border, Background Tint, Padding, and Shadow */
              <div 
                key={idx} 
                className="flex flex-col gap-4 border border-slate-800/25 bg-white/30 backdrop-blur-[1px] p-6 rounded-md shadow-md"
              >
                
                {/* Header Info */}
                <div className="text-left">
                  <h2 className="text-xl font-bold text-slate-900">{article.title}</h2>
                  <p className="text-sm text-slate-700 mt-1">By {article.author}</p>
                </div>

                <hr className="border-slate-800/20 my-1" />

                {/* Repeatable Content Sections */}
                <div className="flex flex-col gap-6">
                  {article.sections.map((sec, secIdx) => (
                    <div key={secIdx} className="text-left">
                      {/* Optional Subheading */}
                      {sec.heading && (
                        <h3 className="text-base font-semibold text-slate-800 mb-2">{sec.heading}</h3>
                      )}
                      
                      {/* Multi-Paragraph Blocks */}
                      <div className="flex flex-col gap-3 text-sm leading-relaxed opacity-95 text-slate-800">
                        {sec.paragraphs.map((p, pIdx) => (
                          <p key={pIdx}>{p}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}

          </div>

        </div>
      </main>
    </PageGuard>
  );
}
