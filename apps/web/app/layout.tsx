import type { Metadata } from "next";
import { cookies } from "next/headers";
import { SecurityProvider } from './SecurityContext';
import Navbar from './components/Navbar';
import './globals.css';
import { EB_Garamond } from 'next/font/google';

export const metadata: Metadata = {
  title: "Softwarewolf Home",
  description: "Dirk Wiggley's Gaming Site",
};

// Instantiate the font with your required character subsets
const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-eb-garamond', // Define the custom CSS variable hook
  display: 'swap',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const savedTheme = cookieStore.get("wolf_theme")?.value || "light";
  const isDark = savedTheme === "dark";

  return (
    <html lang="en" className={isDark ? "dark" : ""}>
      {/* 
        By making the global body element a completely neutral frame, individual client page 
        and hook context nodes can safely dictate exact canvas values without server mismatches!
      */}
      <body className="min-h-screen transition-colors duration-200 bg-slate-50 dark:bg-slate-950">
        <SecurityProvider>
          <Navbar />
          {children}
        </SecurityProvider>
      </body>
    </html>
  );
}
