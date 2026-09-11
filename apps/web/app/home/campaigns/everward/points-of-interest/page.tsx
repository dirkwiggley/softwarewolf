'use client';

import React from 'react';
import { PageHeader } from '@softwarewolf/ui/page-header';
import PageGuard from "../../../../PageGuard";
import { usePageTheme } from '../../../../hooks/usePageTheme';
import { POINTS_OF_INTEREST } from './poiData';
import { CampaignRegistryViewer } from '../../../../components/CampaignRegistryViewer';

export default function DistrictsOfEverward() {
  const { backgroundClass, textClass } = usePageTheme();

  // Initial expanded blocks matching our main content zones
  const initialOpen = {
    'The Infinite Staircase': true,
  };

  const containerClass = "w-full max-w-5xl mx-0 md:mx-auto md:w-[85%] bg-[url('/parchment.jpg')] dark:bg-[linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url('/parchment.jpg')] bg-cover bg-center p-4 md:p-8 rounded-none md:rounded-lg shadow-md mb-6";

  return (
    <PageGuard allowedRoles={['ADMIN', 'MANAGER', 'USER', 'GUEST']}>
      <div className={`w-full min-h-[calc(100vh-73px)] pb-12 transition-colors duration-200 ${backgroundClass} ${textClass}`}>
        
        <PageHeader
          title="Points of Interest"
          description="A historical directory of governed municipal zones, local landmarks, and operational assets."
        />

        <main className="py-4 px-0 md:px-4">
          <div className={containerClass}>
            <CampaignRegistryViewer 
              registryData={POINTS_OF_INTEREST}
              defaultSectorId="the-infinite-staircase"
              selectorLabel="Select Point of Interest"
              sidebarHeading="Registry Ledger"
              initialExpandedLocations={initialOpen}
            />
          </div>
        </main>
      </div>
    </PageGuard>
  );
}
