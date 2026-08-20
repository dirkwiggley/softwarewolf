import type { Metadata } from "next";
import { SecurityProvider } from './SecurityContext';

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
      <body style={{ margin: 0, background: '#fafafa', color: '#111' }}>
        {/* Inject the provider so all pages share the same login context state */}
        <SecurityProvider>
          {children}
        </SecurityProvider>
      </body>
    </html>
  );
}
