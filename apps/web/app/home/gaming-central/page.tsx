'use client';

import { ImageWrapCard } from '@softwarewolf/ui/image-wrap-card';
import { PageHeader } from '@softwarewolf/ui/page-header';
import PageGuard from '../../PageGuard';
import { SectionHeader } from '@softwarewolf/ui/sectionHeader';
import { ImageGalleryCard } from '@softwarewolf/ui/image-gallery-card';

export default function GamingCentralPage() {
  const diceTowerImages = [
    { url: "https://i.imgur.com/nKPQXFV.jpeg", alt: "Nice straight on view of dice tower" },
    { url: "https://i.imgur.com/nUQ9mOl.jpeg", alt: "Overhead view of dice tower" },
    { url: "https://i.imgur.com/wksXOnD.jpeg", alt: "Side view of dice tower" }
  ]
  const cryptImages = [
    { url: "https://i.imgur.com/8tBo0HI.jpeg", alt: "Top down view of a bunch of crypt terrain" },
    { url: "https://i.imgur.com/NQqhsH9.jpeg", alt: "The entryway" },
    { url: "https://i.imgur.com/dW4FBPj.jpeg", alt: "The entryway showing the secret door" },
    { url: "https://i.imgur.com/RCogrWW.jpeg", alt: "A characters eye view" },
    { url: "https://i.imgur.com/G8spmWK.jpeg", alt: "A view with the portcullis up" },
    { url: "https://i.imgur.com/BFWI0Z2.jpeg", alt: "A bone wall" },
    { url: "https://i.imgur.com/BHC5erO.jpeg", alt: "A large crypt room" },
    { url: "https://i.imgur.com/7Q4QR0h.jpeg", alt: "A long hallway with crypts" }
  ]

  return (
    <PageGuard allowedRoles={['ADMIN', 'MANAGER', 'USER', 'GUEST']}>
      <PageHeader
        title="Gaming Central"
        description="Where we talk about, well game stuff."
      />

      <div className="pt-2 px-8 pb-8 flex flex-col gap-8">
        <div className="w-full max-w-3xl mx-auto md:w-[60%]">
          <SectionHeader
            title="Dungeon Terrain"
            subtitle="I 3D print and paint rather a lot of terrain for my game. Here's a sample."
            divider={true}
          />
        </div>

        <div className="w-full max-w-3xl mx-auto md:w-[60%]">
          <ImageGalleryCard
            heading="Dice Tower"
            bodyText="This is one of my earliest prints. I made it for on of my kids"
            images={diceTowerImages}
            columns={3}
          />
        </div>

        <div className="w-full max-w-3xl mx-auto md:w-[60%]">
          <ImageGalleryCard
            heading="Crypts"
            bodyText="This set terrified my players"
            images={cryptImages}
            columns={4}
          />
        </div>

      </div>
    </PageGuard>
  );
}
