'use client';

import React from 'react';
import PageGuard from '../../../PageGuard';
import { PageHeader } from '@softwarewolf/ui/page-header';
import { SectionHeader } from '@softwarewolf/ui/sectionHeader';
import { ListCardWrapper } from '@softwarewolf/ui/list-card-wrapper';
import { ListCard } from '@softwarewolf/ui/list-card';

export default function EverwardCampaignPage() {
  return (
    <PageGuard allowedRoles={['ADMIN', 'MANAGER', 'USER', 'GUEST']}>
      <PageHeader
        title="The Everward Campaign"
        description="Chronicles, operational theatres, and regional status logs of the Everward world."
      />

      <div className="pt-2 px-8 pb-8 flex flex-col gap-8">
        
        {/* Core Header Section */}
        <div className="w-full max-w-3xl mx-auto md:w-[60%]">
          <SectionHeader
            title="Campaign Operational Domains"
            subtitle="Explore primary strongholds, regional lore markers, and active tactical deployments."
            divider={true}
          />
        </div>

        {/* Content Section utilizing the new Square Border List Architecture with Parchment Parameter */}
        <div className="w-full max-w-3xl mx-auto md:w-[60%]">
          <ListCardWrapper bgImageUrl="/parchment.jpg">
            
            <ListCard
              col1={{
                type: 'image',
                url: '/Everward_1.png',
                alt: 'TBD',
              }}
              col2={{
                type: 'text',
                numberHeader: '01',
                title: 'Adventures in Everward',
                paragraph: 'Initial campaign notes for the players.',
                button: {
                  text: 'Go →',
                  onClick: () => alert('Player notes...'),
                },
              }}
            />

            <ListCard
              col1={{
                type: 'text',
                numberHeader: '02',
                title: 'City of Everward Districts',
                paragraph: 'A directory of the districts, places of import, and people therein.',
                button: {
                  text: 'Go →',
                  onClick: () => alert('Wandering the districts...'),
                },
              }}
              col2={{
                type: 'text',
                numberHeader: '03',
                title: 'News in Everward',
                paragraph: 'A sample of postings and newsletters from Everward',
                button: {
                  text: 'Go →',
                  onClick: () => alert('Reading the flyers...'),
                },
              }}
            />

            <ListCard
              col1={{
                type: 'text',
                numberHeader: '04',
                title: 'Notables of Everward',
                paragraph: 'All the important people in the capitol and thereabouts.',
                button: {
                  text: 'Go →',
                  onClick: () => alert(`Finding who's who...`),
                },
              }}
              col2={{
                type: 'text',
                numberHeader: '05',
                title: 'Lowlife of Everward',
                paragraph: 'Those who populate the hive of scum and villany',
                button: {
                  text: 'Go →',
                  onClick: () => alert('Lurking in the shadows...'),
                },
              }}
            />

            <ListCard
              col1={{
                type: 'image',
                url: '/Everward_1.png',
                alt: 'TBD',
              }}
              col2={{
                type: 'text',
                numberHeader: '06',
                title: `Daemon's Grin Group`,
                paragraph: 'Everwards most notable mercenaries.',
                button: {
                  text: 'Go →',
                  onClick: () => alert(`Coughing up some cash...`),
                },
              }}
            />

            <ListCard
              col1={{
                type: 'text',
                numberHeader: '07',
                title: `Villians of Everward`,
                paragraph: `Ya gotta have 'em.`,
                button: {
                  text: 'Go →',
                  onClick: () => alert(`Running away...`),
                },
              }}
              col2={{
                type: 'image',
                url: '/Everward_1.png',
                alt: 'TBD',
              }}
            />

            <ListCard
              col1={{
                type: 'text',
                numberHeader: '08',
                title: `Outside the Capitol`,
                paragraph: 'About the area around the capitol.',
                button: {
                  text: 'Go →',
                  onClick: () => alert(`Casually looking around...`),
                },
              }}
              col2={{
                type: 'text',
                numberHeader: '09',
                title: `Other locations`,
                paragraph: `Places far and wide`,
                button: {
                  text: 'Go →',
                  onClick: () => alert(`Ramblin...`),
                },
              }}
            />

            {/* Isolated Single-Column Text Variant (Only col1 provided) */}
            <ListCard
              col1={{
                type: 'image',
                url: '/Everward_1.png',
                alt: 'Full width sprawling horizontal tactical landscape asset',
              }}
            />
            

          </ListCardWrapper>
        </div>

      </div>
    </PageGuard>
  );
}
