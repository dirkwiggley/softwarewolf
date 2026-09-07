import type { Metadata } from "next";
import { cookies } from "next/headers"; // Native server header extractor
import { SecurityProvider } from './SecurityContext';
import Navbar from './components/Navbar';
import './globals.css';

export const metadata: Metadata = {
  title: "Softwarewolf Home",
  description: "A gaming website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const savedTheme = cookieStore.get("wolf_theme")?.value || "light";

  return (
    <html lang="en" className={savedTheme === "dark" ? "dark" : ""}>
      {/* 
        bg-amber-50: Sets a warm, soft tan background for light mode
        dark:bg-amber-950: Sets a deep medieval wood-brown background for dark mode
        text-slate-900 / dark:text-amber-100: Automatically handles accessible font scaling contrast
        min-h-screen: Ensures the background covers the full page height even on short pages
        transition-colors: Smoothly blends the color shift when a user clicks the theme toggle button
      */}
      <body className="min-h-screen bg-amber-50 dark:bg-amber-950 text-slate-900 dark:text-amber-100 transition-colors duration-200">
        <SecurityProvider>
          <Navbar />
          {children}
        </SecurityProvider>
      </body>
    </html>
  );
}
