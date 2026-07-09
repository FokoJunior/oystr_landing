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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://oystr.ca';

export const metadata: Metadata = {
  title: "Oystr — What's on your bucket list?",
  description: "Declare your dream, find your crew, and make it real. Oystr launches July 15, 2026. Join the waitlist.",
  metadataBase: new URL(SITE_URL),

  icons: {
    icon: [
      { url: '/logo-favicon.png', type: 'image/png' },
    ],
    apple: '/logo-favicon.png',
  },

  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Oystr',
    title: "Oystr — What's on your bucket list?",
    description: "Declare your dream, find your crew, and make it real. Oystr launches July 15, 2026. Join the waitlist.",
    images: [
      {
        url: '/og-image.png',
        width: 1024,
        height: 1024,
        alt: "Oystr — What's on your bucket list?",
      },
    ],
    locale: 'en_CA',
  },

  twitter: {
    card: 'summary_large_image',
    site: '@oystr_ca',
    title: "Oystr — What's on your bucket list?",
    description: "Declare your dream, find your crew, and make it real. Oystr launches July 15, 2026.",
    images: ['/og-image.png'],
  },
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
          type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
          suppressHydrationWarning
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
