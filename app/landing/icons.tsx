// Local icons for the Landing page, transcribed 1:1 from "OYSTR Landing.dc.html"
// (the DCLogic `ic()` map + inline hero/CTA svgs). Shared icons cover the rest.
import type { CSSProperties } from 'react';

type IconProps = { size?: number; style?: CSSProperties };

const base = (size: number, sw: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: sw,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

export const PenIcon = ({ size = 22, style }: IconProps) => (
  <svg {...base(size, 1.7)} style={style}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>
);

export const UsersIcon = ({ size = 22, style }: IconProps) => (
  <svg {...base(size, 1.7)} style={style}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);

export const FlagIcon = ({ size = 22, style }: IconProps) => (
  <svg {...base(size, 1.7)} style={style}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" /></svg>
);

export const LogIcon = ({ size = 15, style }: IconProps) => (
  <svg {...base(size, 1.7)} style={style}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
);

// Sparkle / rocket-trail used on the primary CTAs and the closing icon.
export const SparkleIcon = ({ size = 17, style }: IconProps) => (
  <svg {...base(size, 1.8)} style={style}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
  </svg>
);

export const SparkleTailIcon = ({ size = 30, style }: IconProps) => (
  <svg {...base(size, 1.6)} style={style}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 18c-.39 1.74-1.5 3-3 3" />
  </svg>
);

export const CheckMarkIcon = ({ size = 18, style }: IconProps) => (
  <svg {...base(size, 2)} style={style}><polyline points="20 6 9 17 4 12" /></svg>
);

export const ClockMiniIcon = ({ size = 11, style }: IconProps) => (
  <svg {...base(size, 2)} style={style}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);
