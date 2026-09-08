import React from 'react';
import { EB_Garamond } from 'next/font/google';

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'], // Ensures bold headers load crisp
  display: 'swap',
});

export default function CampaignSharedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Direct font inline assignment overrides system types safely for this branch only
    <div 
      className="tracking-wide antialiased" 
      style={{ fontFamily: ebGaramond.style.fontFamily }}
    >
      {children}
    </div>
  );
}