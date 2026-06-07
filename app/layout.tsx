import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import VisitTracker from '@/components/VisitTracker';
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
});

export const metadata: Metadata = {
  title: "OYSTR — Bucket List Help",
  description: "Dreams are the content. The community makes them happen. Launching July 15, 2026.",
  icons: {
    icon: "/favicon.ico", // Note: Need to copy this from main project eventually
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="antialiased">
        <div className="gradient-bg" />
        <VisitTracker />
        {children}
      </body>
    </html>
  );
}
