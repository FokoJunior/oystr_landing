'use client';
import type { CSSProperties } from 'react';
import { useTheme } from './ThemeContext';

/**
 * The real Oystr wordmark (deep navy on light, white on dark) from /public.
 * Replaces the CSS-drawn dot mark across the redesign so the brand is exact.
 * Pass `dark` to override the global theme (e.g. a logo sitting on a fixed
 * dark panel regardless of mode); otherwise it follows the theme context.
 */
export default function Logo({ height = 22, dark, style }: { height?: number; dark?: boolean; style?: CSSProperties }) {
  const ctx = useTheme();
  const isDark = dark ?? ctx.dark;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={isDark ? '/logo-blanc.png' : '/logo-sombre.png'}
      alt="Oystr"
      style={{ height, width: 'auto', display: 'block', ...style }}
    />
  );
}
