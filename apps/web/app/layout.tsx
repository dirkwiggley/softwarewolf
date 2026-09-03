import type { Metadata } from "next";
import { SecurityProvider } from './SecurityContext';
import Navbar from './components/Navbar'; // Import the new global header
import './globals.css';

export const metadata: Metadata = {
  title: "Softwarewolf Home",
  description: "Monorepo Automated Security Control Center Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SecurityProvider>
          <Navbar />
          {children}
        </SecurityProvider>
      </body>
    </html>
  );
}
