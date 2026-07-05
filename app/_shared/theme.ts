// Design tokens for the OYSTR "mission control" redesign.
// "Pearl & Navy" — anchored on the brand logo: deep navy #01193D cradling a
// cool pearl (#D7DBE6). Cool pearl-whites + navy ink + champagne-pearl gold.

export const C = {
  bg: '#f3f6fb',
  ink: '#01193d',
  inkSoft: '#41506b',
  muted: '#7a869c',
  faint: '#9aa6bb',
  hairline: '#c3cdde',
  gold: '#c2a25e',
  goldDeep: '#9c7b36',
  goldBg: '#f7efdc',
  surface: '#ffffff',
  surface2: '#f0f3f9',
  surface3: '#e8eef6',
  border: 'rgba(1,25,61,0.10)',
  borderSoft: 'rgba(1,25,61,0.07)',
  borderStrong: 'rgba(1,25,61,0.14)',
  green: '#2f8a4e',
  greenBg: '#e6f4ea',
  red: '#b0311f',
  redBg: '#fdecea',
  heroFrom: '#01193d',
  heroTo: '#010f26',
  // extra UI tokens (so dark mode can re-map hard-coded ink rgbas)
  track: 'rgba(1,25,61,0.08)',
  divider: 'rgba(1,25,61,0.06)',
  pillBorder: 'rgba(1,25,61,0.16)',
  pillBorderHover: 'rgba(1,25,61,0.30)',
  iconBorderHover: 'rgba(1,25,61,0.24)',
  cardShadow: '0 1px 0 rgba(1,25,61,0.03), 0 1px 2px rgba(1,25,61,0.05)',
  cardShadowHover: '0 8px 24px rgba(1,25,61,0.10)',
  cardBorderHover: 'rgba(1,25,61,0.16)',
  dotRing: '#ffffff',
} as const;

// Same keys as `C`, but values widened to string so a dark variant can satisfy it.
export type Palette = { [K in keyof typeof C]: string };

// Dark variant of the mission-control palette. Same keys as `C`, so any
// component can accept a `palette` prop and stay token-driven.
export const DARK: Palette = {
  bg: '#0a1124',
  ink: '#eaeef6',
  inkSoft: '#aeb9cc',
  muted: '#7e8aa0',
  faint: '#5f6b82',
  hairline: '#3a465f',
  gold: '#d2b36c',
  goldDeep: '#e3c684',
  goldBg: 'rgba(194,162,94,0.16)',
  surface: '#101a33',
  surface2: '#16223f',
  surface3: '#1d2c4d',
  // Solid low-chroma slate strokes (NOT white-alpha) so edges read as neutral
  // grey on the navy field instead of picking up an indigo/violet cast.
  border: '#262d3a',
  borderSoft: '#1f2531',
  borderStrong: '#39414f',
  green: '#5cbf7d',
  greenBg: 'rgba(47,138,78,0.20)',
  red: '#e57863',
  redBg: 'rgba(176,49,31,0.22)',
  heroFrom: '#01193d',
  heroTo: '#010f26',
  track: '#222a38',
  divider: '#1c222e',
  pillBorder: '#39414f',
  pillBorderHover: '#525c6b',
  iconBorderHover: '#525c6b',
  cardShadow: '0 1px 0 rgba(0,0,0,0.30), 0 1px 2px rgba(0,0,0,0.35)',
  cardShadowHover: '0 8px 24px rgba(0,0,0,0.45)',
  cardBorderHover: '#454e5d',
  dotRing: '#101a33',
};

export const FONT = {
  body: "'Inter',ui-sans-serif,system-ui,sans-serif",
  mono: "'JetBrains Mono',monospace",
  brand: "'Fredoka',sans-serif",
  serif: "'Instrument Serif',serif",
} as const;

export const shadowCard = '0 1px 2px rgba(21,20,15,0.04)';
export const radius = { sm: 8, md: 10, lg: 12, xl: 14, xxl: 16 } as const;

// Google Fonts used across every redesigned page (React 19 hoists <link> to <head>).
export const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Fredoka:wght@500;600&family=Instrument+Serif:ital@0;1&display=swap';
