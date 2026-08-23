import type { Metadata } from "next";
import { SecurityProvider } from './SecurityContext';
import './globals.scss'; // Connects the Tailwind v4 compilation engine globally

export const metadata: Metadata = {
  title: "Softwarewolf Home Ecosystem",
  description: "Monorepo Automated Security Control Center Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* The body styling and dark/light shifts are now handled perfectly inside globals.scss */}
      <body>
        <SecurityProvider>
          {children}
        </SecurityProvider>
      </body>
    </html>
  );
}
