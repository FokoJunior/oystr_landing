'use client';
import { ThemeProvider } from '../_shared/ThemeContext';
import { FONTS_HREF } from '../_shared/theme';

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link href={FONTS_HREF} rel="stylesheet" />
      <ThemeProvider>{children}</ThemeProvider>
    </>
  );
}
