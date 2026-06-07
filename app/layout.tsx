import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import VisitTracker from '@/components/VisitTracker';
import { ThemeProvider } from '@/components/ThemeProvider';
import Nav from '@/components/Nav';
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
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=window.location.pathname==='/'?'dark':(localStorage.getItem('oystr_theme')||(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'));document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <div className="gradient-bg" />
          <VisitTracker />
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
