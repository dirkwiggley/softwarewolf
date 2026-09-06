import type { Metadata } from "next";
import { cookies } from "next/headers"; // Native server header extractor
import { SecurityProvider } from './SecurityContext';
import Navbar from './components/Navbar';
import './globals.css';

export const metadata: Metadata = {
  title: "Softwarewolf Home",
  description: "Monorepo Automated Security Control Center Hub",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const savedTheme = cookieStore.get("wolf_theme")?.value || "light";

  // ADD THIS TEMPORARY LOG FOR DIAGNOSTICS:
  console.log("=== SERVER THEME DIAGNOSTIC ===", {
    allCookies: cookieStore.getAll().map(c => c.name),
    extractedTheme: savedTheme
  });

  return (
    <html lang="en" className={savedTheme === "dark" ? "dark" : ""}>
      <body>
        <SecurityProvider>
          <Navbar />
          {children}
        </SecurityProvider>
      </body>
    </html>
  );
}
