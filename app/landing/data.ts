// Mock content for the OYSTR marketing landing page.
// Transcribed 1:1 from "OYSTR Landing.dc.html" (renderVals + sc-for lists).

// The product app (auth, feed, moonshots...) is a separate deployment from
// this marketing site — every in-app link below points there.
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.oystr.ca';

export type Step = { num: string; icon: 'pen' | 'users' | 'flag'; title: string; body: string };
export type Signal = { name: string; icon: 'star' | 'crew' | 'fuel' | 'orbit' | 'echo' | 'log'; desc: string };
export type Dream = {
  category: string; handle: string; title: string;
  days: number; crew: number; prog: string; banner: string;
};
export type HeroCrew = { t: string };
export type FooterCol = { head: string; links: { label: string; href: string }[] };

export const STEPS: Step[] = [
  { num: '01', icon: 'pen', title: 'Declare it', body: 'Write the dream down — plainly, publicly, with a date attached. The moment it leaves your head, it becomes real.' },
  { num: '02', icon: 'users', title: 'Gather your crew', body: 'People who believe in it join as Crew, offer encouragement, advice, resources — even cash Fuel from backers who care.' },
  { num: '03', icon: 'flag', title: 'Make it real', body: 'Log the milestones. Feel the momentum. Cross the line with a crew that was there for every step of the way.' },
];

export const SIGNALS: Signal[] = [
  { name: 'Star', icon: 'star', desc: 'The strongest nod of belief. A Star says "this matters" and lifts a dream up the charts.' },
  { name: 'Crew', icon: 'crew', desc: 'Commit to help. Crew members show up — with hands, words, or expertise — until it\'s done.' },
  { name: 'Fuel', icon: 'fuel', desc: 'Real resources. Gear, mentorship, or money from backers and partners who want it to happen.' },
  { name: 'Orbit', icon: 'orbit', desc: 'Keep it close. Orbit a dream to follow its journey and add it to your own someday list.' },
  { name: 'Echo', icon: 'echo', desc: 'Pass it on. Echo a Moonshot to the people in your life who can help make it real.' },
  { name: 'Log', icon: 'log', desc: 'The living diary. Every update, setback and small win, witnessed by the people who care.' },
];

export const PROOFS: string[] = [
  'Private drafts, public commitments — you choose what the world sees and when.',
];

export const DREAMS: Dream[] = [
  { category: 'ENVIRONMENT', handle: 'greenfuture', title: 'Plant 10,000 trees by Earth Day', days: 118, crew: 87, prog: '64%', banner: 'linear-gradient(135deg,#1f3a26,#15140f)' },
  { category: 'ARTS', handle: 'sofiart', title: 'Exhibit my paintings in Paris', days: 320, crew: 41, prog: '38%', banner: 'linear-gradient(135deg,#3a2b1f,#15140f)' },
  { category: 'EDUCATION', handle: 'codeforall', title: 'Build a free coding school for kids', days: 240, crew: 44, prog: '52%', banner: 'linear-gradient(135deg,#2a2620,#15140f)' },
];

export type PlanTier = {
  name: string;
  price: string;
  period: string;
  blurb: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
};

// Simplified 3-tier marketing pricing (mirrors /redesign/subscriptions tone).
export const PRICING: PlanTier[] = [
  {
    name: 'Dreamer',
    price: '$0',
    period: 'forever',
    blurb: 'Everything you need to declare a dream and gather a crew.',
    features: [
      '2 public Moonshots',
      'All six interaction signals',
      'Join Capsules (crew chats)',
      'Appear in Dream Charts',
    ],
    cta: 'Start free',
    href: `${APP_URL}/launch`,
  },
  {
    name: 'Verified',
    price: '$5',
    period: '/ month',
    blurb: 'Stand out, unlock cash Fuel, and reach more backers.',
    features: [
      'Everything in Dreamer',
      '6 public Moonshots',
      'Verified badge on your profile',
      'Boosted placement in feed & charts',
      'Receive cash Fuel from backers',
    ],
    cta: 'Get Verified',
    href: `${APP_URL}/subscriptions`,
    featured: true,
  },
  {
    name: 'Partners',
    price: 'NFP & CSR',
    period: 'from $0 / $49',
    blurb: 'For nonprofits and companies backing dreams at scale.',
    features: [
      'Mission-driven Moonshots',
      '0-fee donations (NFP)',
      'Spotlight & priority placement',
      'Advanced analytics dashboard',
    ],
    cta: 'See partner plans',
    href: `${APP_URL}/subscriptions`,
  },
];

export const HERO_CREW: HeroCrew[] = [
  { t: 'JL' }, { t: 'AR' }, { t: 'MB' }, { t: 'SK' }, { t: '+' },
];


// Animated hero counters: [target value, suffix, label]
export const HERO_STATS: { value: number; suffix: string; label: string; gold?: boolean }[] = [
  { value: 12400, suffix: '+', label: 'dreams in motion' },
  { value: 3180, suffix: '', label: 'reached, together', gold: true },
  { value: 48, suffix: '', label: 'countries' },
];

export const FOOTER_COLS: FooterCol[] = [
  { head: 'Product', links: [
    { label: 'Feed', href: `${APP_URL}/feed` },
    { label: 'Explore', href: `${APP_URL}/explore` },
    { label: 'Launch', href: `${APP_URL}/launch` },
    { label: 'Blog', href: `${APP_URL}/blog` },
    { label: 'Pricing', href: `${APP_URL}/subscriptions` },
  ] },
  { head: 'Account', links: [
    { label: 'Profile', href: `${APP_URL}/profile` },
    { label: 'Messages', href: `${APP_URL}/messages` },
    { label: 'Notifications', href: `${APP_URL}/notifications` },
    { label: 'Settings', href: `${APP_URL}/settings` },
  ] },
  { head: 'Company', links: [
    { label: 'Help Center', href: `${APP_URL}/help` },
    { label: 'Privacy Policy', href: `${APP_URL}/legal/privacy` },
    { label: 'Terms of Service', href: `${APP_URL}/legal/terms` },
  ] },
];
