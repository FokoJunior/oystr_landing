// Inline SVG icons used by the Moonshot redesign, transcribed 1:1 from the
// "OYSTR Moonshot.dc.html" design spec so stroke widths / paths match exactly.
import type { CSSProperties } from 'react';

type IconProps = { size?: number; style?: CSSProperties; strokeWidth?: number };

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

export const PlusIcon = ({ size = 15, style }: IconProps) => (
  <svg {...base(size, 2)} style={style}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
);

export const MoonIcon = ({ size = 17, style }: IconProps) => (
  <svg {...base(size, 1.7)} style={style}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
);

export const SunIcon = ({ size = 17, style }: IconProps) => (
  <svg {...base(size, 1.7)} style={style}>
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

export const HomeIcon = ({ size = 17, style }: IconProps) => (
  <svg {...base(size, 1.7)} style={style}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
);

export const CompassIcon = ({ size = 17, style }: IconProps) => (
  <svg {...base(size, 1.7)} style={style}><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>
);

export const CapsuleIcon = ({ size = 17, style }: IconProps) => (
  <svg {...base(size, 1.7)} style={style}><path d="M21 8v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8" /><rect x="1" y="3" width="22" height="5" rx="1" /><line x1="10" y1="12" x2="14" y2="12" /></svg>
);

export const MailIcon = ({ size = 17, style }: IconProps) => (
  <svg {...base(size, 1.7)} style={style}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
);

export const BellIcon = ({ size = 17, style }: IconProps) => (
  <svg {...base(size, 1.7)} style={style}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
);

export const UserIcon = ({ size = 17, style }: IconProps) => (
  <svg {...base(size, 1.7)} style={style}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);

export const SettingsIcon = ({ size = 16, style }: IconProps) => (
  <svg {...base(size, 1.6)} stroke="#8a887c" style={style}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
);

export const ArrowLeftIcon = ({ size = 18, style }: IconProps) => (
  <svg {...base(size, 1.8)} style={style}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
);

// nav-friendly variants that follow currentColor (SettingsIcon hard-codes grey)
export const CreditCardIcon = ({ size = 17, style }: IconProps) => (
  <svg {...base(size, 1.7)} style={style}><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
);

export const GearIcon = ({ size = 17, style }: IconProps) => (
  <svg {...base(size, 1.7)} style={style}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
);

export const CheckIcon = ({ size = 9, style }: IconProps) => (
  <svg {...base(size, 3.5)} stroke="#ffffff" style={style}><polyline points="20 6 9 17 4 12" /></svg>
);

export const FlameIcon = ({ size = 11, style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none" style={style}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>
);

export const ClockIcon = ({ size = 12, style }: IconProps) => (
  <svg {...base(size, 1.9)} style={style}><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
);

export const ChevronDownIcon = ({ size = 15, style }: IconProps) => (
  <svg {...base(size, 1.9)} style={style}><polyline points="6 9 12 15 18 9" /></svg>
);

export const InfoIcon = ({ size = 16, style }: IconProps) => (
  <svg {...base(size, 1.7)} stroke="#a6822c" style={style}><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
);

export const ShieldIcon = ({ size = 18, style }: IconProps) => (
  <svg {...base(size, 1.8)} stroke="#2f8a4e" style={style}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
);

export const LeaveIcon = ({ size = 14, style }: IconProps) => (
  <svg {...base(size, 1.8)} style={style}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
);

export const JoinCrewIcon = ({ size = 16, style }: IconProps) => (
  <svg {...base(size, 1.8)} style={style}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);

// ---- Action-bar "verb" icons (15px, stroke 1.6) ----
export const StarIcon = ({ size = 15, style }: IconProps) => (
  <svg {...base(size, 1.6)} style={style}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
);

export const CrewIcon = ({ size = 15, style }: IconProps) => (
  <svg {...base(size, 1.6)} style={style}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);

export const FuelIcon = ({ size = 15, style }: IconProps) => (
  <svg {...base(size, 1.6)} style={style}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>
);

export const OrbitIcon = ({ size = 15, style }: IconProps) => (
  <svg {...base(size, 1.6)} style={style}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
);

export const EchoIcon = ({ size = 15, style }: IconProps) => (
  <svg {...base(size, 1.6)} style={style}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
);

export const CommentIcon = ({ size = 15, style }: IconProps) => (
  <svg {...base(size, 1.6)} style={style}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" /></svg>
);

export const VERB_ICONS = {
  star: StarIcon,
  crew: CrewIcon,
  fuel: FuelIcon,
  orbit: OrbitIcon,
  echo: EchoIcon,
  comment: CommentIcon,
} as const;

export const NAV_ICONS = {
  home: HomeIcon,
  compass: CompassIcon,
  capsule: CapsuleIcon,
  mail: MailIcon,
  bell: BellIcon,
  user: UserIcon,
  card: CreditCardIcon,
  settings: GearIcon,
} as const;
