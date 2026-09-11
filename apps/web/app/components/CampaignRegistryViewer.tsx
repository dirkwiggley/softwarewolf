'use client';

import React, { useState } from 'react';

// Export shared interfaces so any page can populate this structural format
export interface RegistryTargetNode {
  name: string;
  description?: string;
}

export interface RegistrySubLocationNode {
  name: string;
  description?: string;
  targets?: RegistryTargetNode[];
}

export interface RegistryLocationNode {
  name: string;
  description?: string;
  subLocations?: RegistrySubLocationNode[];
  targets?: RegistryTargetNode[];
}

export interface RegistrySectorData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  locations: RegistryLocationNode[];
}

interface CampaignRegistryViewerProps {
  registryData: RegistrySectorData[];
  defaultSectorId: string;
  selectorLabel?: string;
  sidebarHeading?: string;
  initialExpandedLocations?: Record<string, boolean>;
}

export function CampaignRegistryViewer({
  registryData,
  defaultSectorId,
  selectorLabel = "Select Sector",
  sidebarHeading = "Registry Ledger",
  initialExpandedLocations = {}
}: CampaignRegistryViewerProps) {
  
  const [activeSectorId, setActiveSectorId] = useState<string>(defaultSectorId);
  const [expandedLocations, setExpandedLocations] = useState<Record<string, boolean>>(initialExpandedLocations);

  const toggleLocation = (name: string) => {
    setExpandedLocations(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const activeSector = registryData.find(d => d.id === activeSectorId) ?? registryData[0];

  if (!activeSector) {
    return <div className="p-4 text-center text-red-500">Error: Registry dataset initialization failed.</div>;
  }

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8">
      
      {/* 1. SIDEBAR NAVIGATION / MOBILE SELECT INTERFACE */}
      <aside className="w-full md:w-1/4 flex flex-col gap-2 shrink-0 border-b md:border-b-0 md:border-r border-amber-900/10 dark:border-amber-100/10 pb-4 md:pb-0 md:pr-4">
        <label htmlFor="sector-selector" className="block text-xs font-bold uppercase tracking-wider mb-1 md:hidden text-amber-950 dark:text-amber-200">
          {selectorLabel}
        </label>
        
        <select
          id="sector-selector"
          value={activeSectorId}
          onChange={(e) => setActiveSectorId(e.target.value)}
          className="w-full block md:hidden p-2 rounded border border-amber-900/30 bg-amber-50 dark:bg-zinc-900 text-slate-900 dark:text-amber-50 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
        >
          {registryData.map((sector) => (
            <option key={sector.id} value={sector.id}>
              {sector.name}
            </option>
          ))}
        </select>

        <div className="hidden md:flex flex-col gap-1">
          <span className="text-xs font-bold uppercase tracking-wider mb-2 text-amber-950/70 dark:text-amber-200/70">
            {sidebarHeading}
          </span>
          {registryData.map((sector) => {
            const isActive = sector.id === activeSectorId;
            return (
              <button
                key={sector.id}
                onClick={() => setActiveSectorId(sector.id)}
                className={`w-full text-left px-3 py-2 text-sm rounded font-medium transition-all duration-150 ${
                  isActive 
                    ? 'bg-amber-900/10 dark:bg-amber-100/10 text-amber-900 dark:text-amber-200 font-bold border-l-2 border-amber-700' 
                    : 'text-slate-700 dark:text-amber-100/60 hover:bg-amber-900/5 dark:hover:bg-amber-100/5 hover:text-slate-900 dark:hover:text-amber-100'
                }`}
              >
                {sector.name}
              </button>
            );
          })}
        </div>
      </aside>

      {/* THE COMPONENT RENDER TREE CONTENT SECTION GOES HERE */}
      {/* 2. MAIN HUB DATA VIEWPORT DISPLAY */}
      <section className="flex-1 flex flex-col gap-4">
        <div className="border-b border-amber-900/10 dark:border-amber-100/10 pb-3">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-amber-100">
            {activeSector.name}
          </h2>
          <p className="text-xs italic text-amber-800 dark:text-amber-400 mt-0.5">
            {activeSector.tagline}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-800 dark:text-zinc-300">
            {activeSector.description}
          </p>
        </div>

        {/* HIERARCHICAL CORE DRILLDOWN ENGINE */}
        <div className="mt-2 flex flex-col gap-4 text-sm text-slate-900 dark:text-amber-50">
          {activeSector.locations.length === 0 ? (
            <p className="italic text-xs text-slate-500 dark:text-zinc-500 py-4">
              No entries currently registered for this ledger sector.
            </p>
          ) : (
            activeSector.locations.map((loc, locIdx) => {
              const isExpanded = !!expandedLocations[loc.name];
              return (
                <div key={locIdx} className="border border-amber-900/10 dark:border-amber-100/10 rounded bg-amber-900/5 dark:bg-zinc-950/20 overflow-hidden">
                  
                  {/* Parent Node Trigger Toggle Button */}
                  <button 
                    onClick={() => toggleLocation(loc.name)}
                    className="w-full flex items-center justify-between text-left p-3 font-bold bg-amber-900/5 dark:bg-amber-100/5 text-amber-950 dark:text-amber-100 hover:bg-amber-900/10 dark:hover:bg-amber-100/10 transition-colors"
                  >
                    <span>{loc.name}</span>
                    <span className="text-xs text-amber-800 dark:text-amber-400">
                      {isExpanded ? '▼ Hide details' : '▶ Expand details'}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="p-3 flex flex-col gap-3 border-t border-amber-900/5 dark:border-amber-100/5">
                      {loc.description && (
                        <p className="text-xs italic text-slate-700 dark:text-zinc-400 mb-1">
                          {loc.description}
                        </p>
                      )}

                      {/* Standardized Direct Child Target Cards */}
                      {loc.targets && loc.targets.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                          {loc.targets.map((tgt, tgtIdx) => (
                            <div 
                              key={tgtIdx} 
                              className="p-2.5 rounded bg-amber-950/5 dark:bg-zinc-900/60 border border-amber-900/10 dark:border-amber-100/10 text-xs shadow-sm"
                            >
                              <span className="font-bold text-amber-950 dark:text-amber-200">{tgt.name}</span>
                              {tgt.description && (
                                <span className="block text-slate-700 dark:text-zinc-400 mt-0.5 italic">
                                  {tgt.description}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Level 2 Sub-Locations Node Mapping Loop */}
                      {loc.subLocations && loc.subLocations.map((subLoc, subIdx) => (
                        <div key={subIdx} className="pl-3 border-l-2 border-amber-800/20 dark:border-amber-200/20 mt-1 flex flex-col gap-1.5">
                          <h4 className="font-semibold text-xs text-amber-900 dark:text-amber-300 uppercase tracking-wide">
                            🗺️ {subLoc.name}
                          </h4>
                          {subLoc.description && (
                            <p className="text-xs text-slate-600 dark:text-zinc-400 italic pl-4">
                              {subLoc.description}
                            </p>
                          )}

                          {/* Standardized Deep Level 3 Sub-Location Child Cards */}
                          {subLoc.targets && subLoc.targets.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4 mt-1">
                              {subLoc.targets.map((tgt, tgtIdx) => (
                                <div 
                                  key={tgtIdx} 
                                  className="p-2.5 rounded bg-amber-950/5 dark:bg-zinc-900/60 border border-amber-900/10 dark:border-amber-100/10 text-xs shadow-sm"
                                >
                                  <span className="font-bold text-amber-950 dark:text-amber-200">{tgt.name}</span>
                                  {tgt.description && (
                                    <span className="block text-slate-700 dark:text-zinc-400 mt-0.5 italic">
                                      {tgt.description}
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
