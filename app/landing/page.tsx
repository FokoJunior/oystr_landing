'use client';
import Link from 'next/link';
import { useState, useEffect, type CSSProperties, type ReactNode } from 'react';
import { FONT, radius, type Palette } from '../_shared/theme';
import { useTheme } from '../_shared/ThemeContext';
import Logo from '../_shared/Logo';
import { useReveal, useScrollReveal } from '../_shared/useGsap';
import { useIsMobile } from '../_shared/useIsMobile';
import {
  MoonIcon, SunIcon,
  StarIcon, CrewIcon, FuelIcon, OrbitIcon, EchoIcon,
} from '../_shared/icons';
import {
  PenIcon, UsersIcon, FlagIcon, LogIcon,
  SparkleIcon, SparkleTailIcon, CheckMarkIcon, ClockMiniIcon,
} from './icons';
import { Counter } from './Counter';
import {
  STEPS, SIGNALS, PROOFS, DREAMS, HERO_CREW, HERO_STATS, FOOTER_COLS, PRICING, APP_URL,
  type Step, type Signal,
} from './data';

type TopMoonshot = {
  id: string;
  title: string;
  handle: string;
  categories: string[];
  image_url: string | null;
  stars: number;
  comments: number;
  crew_total: number;
  crew_verified: number;
  days_left: number;
  user: { name: string; handle: string; verified: boolean; avatar_color: string; image: string | null };
};

const CATEGORY_BANNER: Record<string, string> = {
  TRAVEL:        'linear-gradient(135deg,#1a2f4e,#0a1124)',
  EDUCATION:     'linear-gradient(135deg,#2a2620,#15140f)',
  CAREER:        'linear-gradient(135deg,#1f2d1a,#0f150a)',
  HEALTH:        'linear-gradient(135deg,#1a2e2a,#0a1510)',
  RELATIONSHIPS: 'linear-gradient(135deg,#2e1a2a,#150a12)',
  ARTS:          'linear-gradient(135deg,#3a2b1f,#15140f)',
  BUSINESS:      'linear-gradient(135deg,#1a1f2e,#0a0f1e)',
  ENVIRONMENT:   'linear-gradient(135deg,#1f3a26,#15140f)',
  WELLNESS:      'linear-gradient(135deg,#2a1f35,#120a1a)',
  CHARITY:       'linear-gradient(135deg,#3a2020,#1a0a0a)',
};


const SHELL: CSSProperties = { maxWidth: 1200, margin: '0 auto', padding: '0 40px' };
const mono = (size: number, color: string): CSSProperties => ({ fontFamily: FONT.mono, fontSize: size, color });
const display = (size: number): CSSProperties => ({
  fontFamily: FONT.body, fontWeight: 600, letterSpacing: '-0.02em', fontSize: size, lineHeight: 1.05, margin: 0,
});
const eyebrow = (P: Palette): CSSProperties => ({ ...mono(12.5, P.muted), marginBottom: 14 });

type Hoverable = Record<string, unknown>;
function Hover({ children, hoverStyle, baseStyle, as = 'div', ...rest }: {
  children: ReactNode; hoverStyle: CSSProperties; baseStyle: CSSProperties; as?: 'div' | 'a' | 'span';
} & Hoverable) {
  const [h, setH] = useState(false);
  const Tag = as as 'div';
  return (
    <Tag
      {...rest}
      style={{ ...baseStyle, ...(h ? hoverStyle : null) }}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
    >
      {children}
    </Tag>
  );
}

const STEP_ICON: Record<Step['icon'], typeof PenIcon> = { pen: PenIcon, users: UsersIcon, flag: FlagIcon };
const STEP_IMAGE: Record<string, string> = { '01': '/landing/01.jpeg', '02': '/landing/02.jpeg', '03': '/landing/03.jpeg' };
const SIGNAL_ICON: Record<Signal['icon'], typeof StarIcon> = {
  star: StarIcon, crew: CrewIcon, fuel: FuelIcon, orbit: OrbitIcon, echo: EchoIcon, log: LogIcon,
};

function inpStyle(P: Palette, focused = false): CSSProperties {
  return {
    background: focused ? P.surface : P.surface2,
    border: `1px solid ${focused ? P.gold : P.borderStrong}`,
    boxShadow: focused ? `0 0 0 3px ${P.goldBg}` : 'none',
    color: P.ink,
    borderRadius: 10,
    padding: '10px 14px',
    fontSize: 14,
    fontFamily: 'inherit',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.18s, box-shadow 0.18s, background 0.18s',
    boxSizing: 'border-box',
  };
}

function NavLink({ href, children, P, active }: { href: string; children: ReactNode; P: Palette; active?: boolean }) {
  return (
    <Hover
      as="a"
      href={href}
      baseStyle={{
        fontSize: 14,
        color: active ? P.ink : P.inkSoft,
        fontWeight: active ? 600 : 400,
        textDecoration: 'none',
        transition: 'color 160ms',
        position: 'relative',
        paddingBottom: 4,
      }}
      hoverStyle={{ color: P.ink }}
    >
      {children}
      {active && (
        <span style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 2, borderRadius: 2, background: P.goldDeep,
        }} />
      )}
    </Hover>
  );
}

export default function LandingPage() {
  const { palette: P, dark, toggle } = useTheme();
  const mobile = useIsMobile();

  const [topMoonshots, setTopMoonshots] = useState<TopMoonshot[] | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [contactError, setContactError] = useState('');
  const [newsletterForm, setNewsletterForm] = useState({ firstName: '', email: '' });
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [newsletterError, setNewsletterError] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const sectionIds = ['how', 'signals', 'who', 'pricing', 'contact'];
    const OFFSET = 100; // navbar height + buffer

    const calcActive = () => {
      const scrollY = window.scrollY;
      let current = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top + scrollY - OFFSET <= scrollY) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    const onScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      calcActive();
    };

    calcActive(); // init on mount
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    fetch('/api/moonshots/top?limit=3')
      .then(r => r.json())
      .then(d => { setTopMoonshots(d.moonshots ?? []); })
      .catch(() => { setTopMoonshots([]); });
  }, []);

  const shell: CSSProperties = mobile ? { ...SHELL, padding: '0 20px' } : SHELL;
  const sectionPad = (desktopPad: string, mobilePad: string) => (mobile ? mobilePad : desktopPad);

  const heroAnim = (delay: number, duration = 0.6): CSSProperties => ({
    animation: `heroFadeUp ${duration}s cubic-bezier(0.215,0.61,0.355,1) both`,
    animationDelay: `${delay}s`,
  });

  /* scroll-reveal hooks for the lower sections */
  const stepsReveal    = useReveal<HTMLDivElement>({ selector: ':scope > *', stagger: 0.1,  y: 20 });
  const signalsReveal  = useReveal<HTMLDivElement>({ selector: ':scope > *', stagger: 0.07, y: 16 });
  const dreamsReveal   = useReveal<HTMLDivElement>({ selector: ':scope > *', stagger: 0.1,  y: 22 });
  const pricingReveal  = useReveal<HTMLDivElement>({ selector: ':scope > *', stagger: 0.08, y: 18 });

  /* IntersectionObserver-based reveal for sections/headings */
  const trustReveal      = useScrollReveal();
  const howHeadReveal    = useScrollReveal();
  const whoHeadReveal    = useScrollReveal();
  const whoCardsReveal   = useScrollReveal();
  const dreamsHeadReveal = useScrollReveal();
  const proofReveal      = useScrollReveal();
  const pricingHeadReveal= useScrollReveal();
  const contactReveal    = useScrollReveal();

  return (
    <div style={{ background: P.bg, color: P.ink, minHeight: '100vh', fontFamily: FONT.body, overflowX: 'clip' }}>

      {/* ░░ NAV ░░ */}
      <header
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          backdropFilter: 'blur(14px)',
          background: dark ? 'rgba(10,17,36,0.88)' : 'rgba(243,246,251,0.88)',
          borderBottom: `1px solid ${P.borderSoft}`,
        }}
      >
        <div style={{ width: '100%', margin: '0 auto', padding: sectionPad('16px 64px', '14px 20px'), display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Brand dot={38} />
          {!mobile && (
            <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
              <NavLink href="#how"     P={P} active={activeSection === 'how'}>How it works</NavLink>
              <NavLink href="#signals" P={P} active={activeSection === 'signals'}>The signals</NavLink>
              <NavLink href="#who"     P={P} active={activeSection === 'who'}>Who it&apos;s for</NavLink>
              <NavLink href="#pricing" P={P} active={activeSection === 'pricing'}>Pricing</NavLink>
              <NavLink href="#contact" P={P} active={activeSection === 'contact'}>Contact</NavLink>
              {/* séparateur : ancres de page ↑ / vraies pages ↓ */}
              <span aria-hidden style={{ width: 1, height: 16, background: P.borderStrong, opacity: 0.7 }} />
              <NavLink href={`${APP_URL}/blog`} P={P}>Blog</NavLink>
              <NavLink href={`${APP_URL}/help`} P={P}>Help</NavLink>
            </nav>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 10 : 14 }}>
            {!mobile && (
              <Link href={`${APP_URL}/auth`} style={{ fontSize: 14, fontWeight: 500, color: P.ink, textDecoration: 'none' }}>Sign in</Link>
            )}
            <Hover
              as="a"
              href={`${APP_URL}/auth?mode=signup`}
              baseStyle={{
                display: 'flex', alignItems: 'center', gap: 7, padding: '10px 17px', borderRadius: 11,
                background: P.ink, color: P.surface, textDecoration: 'none', fontSize: 13.5, fontWeight: 600, transition: 'opacity 160ms',
              }}
              hoverStyle={{ opacity: 0.9 }}
            >
              Sign up
            </Hover>
            <Hover
              as="div"
              role="button"
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={toggle}
              baseStyle={{
                width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `1px solid ${P.pillBorder}`, color: P.inkSoft, cursor: 'pointer', transition: 'border-color 160ms, color 160ms',
              }}
              hoverStyle={{ border: `1px solid ${P.pillBorderHover}`, color: P.ink }}
            >
              {dark ? <SunIcon size={16} /> : <MoonIcon size={16} />}
            </Hover>
            {mobile && (
              <Hover
                as="div"
                role="button"
                aria-label="Menu"
                onClick={() => setMenuOpen(o => !o)}
                baseStyle={{
                  width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `1px solid ${P.pillBorder}`, color: P.inkSoft, cursor: 'pointer', transition: 'border-color 160ms, color 160ms',
                }}
                hoverStyle={{ border: `1px solid ${P.pillBorderHover}`, color: P.ink }}
              >
                <svg width={18} height={18} viewBox="0 0 18 18" fill="none">
                  {menuOpen ? (
                    <>
                      <line x1="4" y1="4" x2="14" y2="14" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
                      <line x1="14" y1="4" x2="4" y2="14" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
                    </>
                  ) : (
                    <>
                      <line x1="3" y1="5" x2="15" y2="5" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
                      <line x1="3" y1="9" x2="15" y2="9" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
                      <line x1="3" y1="13" x2="15" y2="13" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" />
                    </>
                  )}
                </svg>
              </Hover>
            )}
          </div>
        </div>
      </header>

      {mobile && menuOpen && (
        <>
          <div
            onClick={() => setMenuOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 48, background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(2px)' }}
          />
          <nav style={{
            position: 'fixed', top: 66, left: 12, right: 12, zIndex: 49,
            background: dark ? 'rgba(15,23,40,0.97)' : 'rgba(255,255,255,0.97)',
            border: `1px solid ${P.border}`, borderRadius: 16,
            padding: '8px', boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
            backdropFilter: 'blur(16px)',
            display: 'flex', flexDirection: 'column', gap: 2,
          }}>
            {[
              { label: 'How it works', href: '#how' },
              { label: 'The signals', href: '#signals' },
              { label: "Who it's for", href: '#who' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'Contact', href: '#contact' },
              { label: 'Blog', href: `${APP_URL}/blog` },
              { label: 'Help', href: `${APP_URL}/help` },
            ].map(({ label, href }) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} style={{
                display: 'block', padding: '12px 16px', borderRadius: 10,
                fontSize: 15, fontWeight: 500, color: P.ink,
                textDecoration: 'none', fontFamily: FONT.body,
              }}>
                {label}
              </a>
            ))}
            <span aria-hidden style={{ height: 1, background: P.borderSoft, margin: '6px 8px' }} />
            <a href={`${APP_URL}/auth`} onClick={() => setMenuOpen(false)} style={{
              display: 'block', padding: '12px 16px', borderRadius: 10,
              fontSize: 15, fontWeight: 500, color: P.inkSoft,
              textDecoration: 'none', fontFamily: FONT.body,
            }}>
              Sign in
            </a>
          </nav>
        </>
      )}

      {/* spacer for fixed navbar */}
      <div style={{ height: mobile ? 58 : 70 }} />

      {/* ░░ HERO ░░ */}
      <section
        style={{
          ...shell, padding: sectionPad('80px 40px 70px', '40px 20px 48px'), display: 'grid',
          gridTemplateColumns: mobile ? '1fr' : '1.05fr 0.95fr', gap: mobile ? 40 : 64, alignItems: 'center',
        }}
      >
        <div>
          <div style={{ ...mono(12.5, P.muted), marginBottom: 22, ...heroAnim(0.05) }}>
            {/* <span style={{ color: P.hairline }}>// </span>the bucket list, reimagined */}
          </div>
          <h1 style={{ ...display(mobile ? 38 : 72), lineHeight: 1.02, textWrap: 'balance', ...heroAnim(0.14) }}>
            Some dreams are<br />too big to chase<br />alone.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: P.inkSoft, margin: '26px 0 0', maxWidth: 468, textWrap: 'pretty', ...heroAnim(0.23) }}>
            Oystr is where grown-up dreams become real. Declare the thing you&apos;ve always meant to do — then watch a crew of people gather to help you actually do it.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 34, flexWrap: 'wrap', ...heroAnim(0.32) }}>
            <Hover
              as="a"
              href={`${APP_URL}/auth?mode=signup`}
              baseStyle={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '15px 24px', borderRadius: 13,
                background: P.ink, color: P.surface, textDecoration: 'none', fontSize: 15, fontWeight: 600, transition: 'opacity 160ms',
              }}
              hoverStyle={{ opacity: 0.9 }}
            >
              <SparkleIcon size={17} style={{ color: P.gold }} />
              Launch your Moonshot
            </Hover>
            <Hover
              as="a"
              href={`${APP_URL}/explore`}
              baseStyle={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '15px 22px', borderRadius: 13,
                background: 'transparent', border: `1px solid ${P.pillBorder}`, color: P.ink,
                textDecoration: 'none', fontSize: 15, fontWeight: 600, transition: 'border-color 160ms',
              }}
              hoverStyle={{ border: `1px solid ${P.pillBorderHover}` }}
            >
              Explore dreams
            </Hover>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 16 : 26, marginTop: 40, flexWrap: 'wrap', ...heroAnim(0.45) }}>
            {HERO_STATS.map((s, i) => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: mobile ? 16 : 26 }}>
                {i > 0 && <div style={{ width: 1, height: 34, background: P.borderStrong }} />}
                <div>
                  <div style={{ ...mono(mobile ? 20 : 24, s.gold ? P.goldDeep : P.ink), fontWeight: 600, letterSpacing: '-0.02em' }}>
                    <Counter value={s.value} suffix={s.suffix} delay={0.5 + i * 0.08} />
                  </div>
                  <div style={{ ...mono(12.5, P.muted), marginTop: 2 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* hero visual: portrait + floating cards */}
        <div style={{ position: 'relative', ...heroAnim(0.2, 0.85) }}>
          <div
            style={{
              display: 'block', width: '100%', height: mobile ? 340 : 520, borderRadius: 22,
              border: `1px solid ${P.border}`, position: 'relative', overflow: 'hidden', background: '#ffffff',
            }}
          >
            <img
              src="/landing/1%20(2).jpeg"
              alt="A real dreamer"
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
            />
            {/* <div style={{ position: 'absolute', left: 28, top: 26, ...mono(11, 'rgba(255,255,255,0.7)') }}>// a real dreamer</div> */}
          </div>

          {/* floating Moonshot card */}
          <div
            className="hero-float"
            style={{
              position: 'absolute', left: -20, bottom: -36, width: 280,
              background: P.surface, border: `1px solid ${P.border}`, borderRadius: 16,
              boxShadow: P.cardShadowHover, padding: '16px 18px',
              animation: 'heroFadeUp 0.6s cubic-bezier(0.215,0.61,0.355,1) both, oyFloat 5s ease-in-out 0.6s infinite',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 11 }}>
              <div style={{
                width: 30, height: 30, borderRadius: 8, background: P.surface3, display: 'flex',
                alignItems: 'center', justifyContent: 'center', ...mono(11, P.inkSoft), fontWeight: 600,
              }}>MC</div>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.1, color: P.ink }}>Maya Chen</div>
                <div style={mono(10, P.muted)}>@mayaexplores</div>
              </div>
              <span style={{
                marginLeft: 'auto', ...mono(8.5, P.goldDeep), letterSpacing: '0.05em',
                background: P.goldBg, padding: '2px 7px', borderRadius: 4,
              }}>TRAVEL</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.3, marginBottom: 10, color: P.ink }}>
              Hike the Camino de Santiago, solo
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
              <span style={mono(10, P.goldDeep)}>41 days left</span>
              <span style={mono(10, P.inkSoft)}>71%</span>
            </div>
            <div style={{ height: 4, borderRadius: 999, background: P.track, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '71%', background: P.gold, borderRadius: 999 }} />
            </div>
          </div>

          {/* floating "joined the crew" chip */}
          <div
            className="hero-float"
            style={{
              position: 'absolute', right: -22, top: -28, background: P.heroFrom, color: '#ffffff',
              borderRadius: 13, padding: '13px 16px', boxShadow: P.cardShadowHover,
              animation: 'heroFadeUp 0.6s cubic-bezier(0.215,0.61,0.355,1) 0.72s both, oyFloat 6s ease-in-out 1.3s infinite',
            }}
          >
            <div style={{ ...mono(10, '#9c9c94'), marginBottom: 3 }}>+18 joined the crew</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {HERO_CREW.map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: 26, height: 26, borderRadius: 7, background: '#2f2f2b',
                    border: '1.5px solid #15140f', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    ...mono(9, '#e7cf8a'), fontWeight: 600, marginLeft: i === 0 ? 0 : -7,
                  }}
                >{c.t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ░░ TRUST STRIP ░░ */}
      <section style={{ borderTop: `1px solid ${P.borderSoft}`, borderBottom: `1px solid ${P.borderSoft}`, background: P.surface2 }}>
        <div ref={trustReveal} className="reveal-up" style={{ ...shell, padding: sectionPad('24px 40px', '20px 20px'), display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <CheckMarkIcon size={16} style={{ color: P.goldDeep, flexShrink: 0 }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: P.ink }}>Verified Profiles &amp; True Organic Reach</span>
          </div>
          <p style={{ fontSize: 13.5, color: P.inkSoft, margin: 0, maxWidth: 560, lineHeight: 1.55, textWrap: 'pretty' }}>
            Oystr never manipulates the algorithm to favour certain dreamers over others — your reach is earned through genuine support, never bought or boosted artificially.
          </p>
        </div>
      </section>

      {/* ░░ HOW IT WORKS ░░ */}
      <section id="how" style={{ ...shell, padding: sectionPad('96px 40px 40px', '56px 20px 32px'), scrollMarginTop: 80 }}>
        {/* <div style={eyebrow(P)}><span style={{ color: P.hairline }}>// </span>how it works</div> */}
        <div ref={howHeadReveal} className="reveal-up" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap', marginBottom: 50 }}>
          <h2 style={{ ...display(mobile ? 32 : 48), maxWidth: 620 }}>From a quiet wish to a thing that actually happens.</h2>
          <p style={{ fontSize: 15, color: P.inkSoft, lineHeight: 1.6, maxWidth: 330, margin: 0 }}>
            No fundraising pitch. No vanity metrics. Just a clear commitment and the people who want to see you reach it.
          </p>
        </div>
        <div ref={stepsReveal} style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 22 }}>
          {STEPS.map(s => {
            const Icon = STEP_ICON[s.icon];
            return (
              <div key={s.num} style={{ background: P.surface, border: `1px solid ${P.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: P.cardShadow }}>
                <div style={{ height: 160, position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={STEP_IMAGE[s.num]}
                    alt={s.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                  <span style={{ position: 'absolute', right: 16, top: 14, ...mono(11, '#f6f5f1') }}>{s.num}</span>
                </div>
                <div style={{ padding: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: P.surface3, display: 'flex', alignItems: 'center', justifyContent: 'center', color: P.ink }}>
                      <Icon size={18} />
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', margin: 0, color: P.ink }}>{s.title}</h3>
                  </div>
                  <p style={{ fontSize: 14, color: P.inkSoft, lineHeight: 1.6, margin: 0, textWrap: 'pretty' }}>{s.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ░░ THE SIX SIGNALS ░░ */}
      <section id="signals" style={{ background: P.heroFrom, position: 'relative', overflow: 'hidden', scrollMarginTop: 80 }}>
        <div style={{ position: 'absolute', top: -60, right: -40, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,167,74,0.22), transparent 70%)' }} />
        <div style={{ ...shell, padding: sectionPad('80px 40px', '48px 20px'), position: 'relative' }}>
          {/* <div style={{ ...mono(12.5, '#9c9c94'), marginBottom: 14 }}><span style={{ color: '#5b594f' }}>// </span>the language of support</div> */}
          <h2 style={{ ...display(mobile ? 32 : 46), color: '#f6f5f1', margin: '0 0 12px', maxWidth: 680 }}>Six ways to say &ldquo;I&apos;ve got you.&rdquo;</h2>
          <p style={{ fontSize: 15, color: '#9c9c94', lineHeight: 1.6, maxWidth: 560, margin: '0 0 44px' }}>
            A like is forgettable. On Oystr, every signal is a real act of backing — visible, meaningful, and felt by the dreamer.
          </p>
          <div ref={signalsReveal} style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 18 }}>
            {SIGNALS.map(g => {
              const Icon = SIGNAL_ICON[g.icon];
              return (
                <div key={g.name} style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 22, background: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 12 }}>
                    <span style={{ display: 'flex', color: '#e7cf8a' }}><Icon size={20} /></span>
                    <span style={{ fontFamily: FONT.brand, fontWeight: 600, fontSize: 19, color: '#f6f5f1', letterSpacing: '0.01em' }}>{g.name}</span>
                  </div>
                  <p style={{ fontSize: 13.5, color: '#9c9c94', lineHeight: 1.55, margin: 0, textWrap: 'pretty' }}>{g.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ░░ WHO IT'S FOR ░░ */}
      <section id="who" style={{ ...shell, padding: sectionPad('72px 40px 80px', '48px 20px 56px'), scrollMarginTop: 80 }}>
        {/* Heading */}
        <div ref={whoHeadReveal} className="reveal-up" style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 52px' }}>
          <h2 style={{ ...display(mobile ? 30 : 44), margin: '0 0 16px', textWrap: 'balance' }}>
            Who Is Oystr For?
          </h2>
          <p style={{ fontSize: 16, color: P.inkSoft, lineHeight: 1.7, margin: 0, textWrap: 'pretty' }}>
            Some people scroll. Others build the life they&apos;ve been dreaming about. Which one are you?
            Oystr is for people and organizations that want to turn purpose into action, connect with others who share their vision, and make real progress toward meaningful goals.
          </p>
        </div>

        {/* Cards 2×2 */}
        <div ref={whoCardsReveal} className="reveal-up" style={{
          display: 'grid',
          gridTemplateColumns: mobile ? '1fr' : 'repeat(2, 1fr)',
          gap: mobile ? 14 : 18,
          maxWidth: 820,
          margin: '0 auto 40px',
        }}>
          {([
            {
              color: '#3B82F6',
              bg: 'rgba(59,130,246,0.12)',
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              ),
              title: 'Change Agents & Dreamers',
              desc: 'People creating positive change in their communities, industries, and the world. Anyone ready to discover, pursue, and achieve the goals that matter most.',
            },
            {
              color: '#8B5CF6',
              bg: 'rgba(139,92,246,0.12)',
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              ),
              title: 'Coaches, Mentors & Creators',
              desc: 'Build engaged communities, inspire action, and help others reach their potential.',
            },
            {
              color: '#EF4444',
              bg: 'rgba(239,68,68,0.12)',
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              ),
              title: 'Nonprofits & Community Organizations',
              desc: 'Grow your mission, mobilize supporters, recruit volunteers, and showcase your impact.',
            },
            {
              color: '#C9A84C',
              bg: 'rgba(201,168,76,0.12)',
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              ),
              title: 'Companies & Teams',
              desc: 'Strengthen culture, unite employees around meaningful initiatives, encourage innovation, and celebrate shared achievements.',
            },
          ] as const).map(card => (
            <Hover
              key={card.title}
              baseStyle={{
                background: P.surface,
                border: `1px solid ${P.border}`,
                borderRadius: 18,
                padding: mobile ? '22px 20px' : '26px 28px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
              }}
              hoverStyle={{
                transform: 'translateY(-4px)',
                boxShadow: P.cardShadowHover,
                // shorthand (pas `borderColor`) pour ne pas mélanger avec le `border` de baseStyle
                border: `1px solid ${P.cardBorderHover}`,
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: card.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: card.color, flexShrink: 0,
              }}>
                {card.icon}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: P.ink, lineHeight: 1.3 }}>{card.title}</div>
              <div style={{ fontSize: 14, color: P.inkSoft, lineHeight: 1.65 }}>{card.desc}</div>
            </Hover>
          ))}
        </div>

        {/* Closing line */}
        <p style={{ textAlign: 'center', fontSize: 15, color: P.inkSoft, lineHeight: 1.7, maxWidth: 620, margin: '0 auto' }}>
          Whether you&apos;re launching a business, writing a book, training for a marathon, learning a new skill, or changing your community — Oystr connects you with people who can support your journey.
        </p>
      </section>

      {/* ░░ DREAMS IN MOTION ░░ */}
      <section style={{ background: P.surface2, borderTop: `1px solid ${P.borderSoft}` }}>
        <div style={{ ...shell, padding: sectionPad('80px 40px', '48px 20px') }}>
          <div ref={dreamsHeadReveal} className="reveal-up" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40 }}>
            <div>
              {/* <div style={eyebrow(P)}><span style={{ color: P.hairline }}>// </span>dreams in motion</div> */}
              <h2 style={display(mobile ? 32 : 44)}>Real Moonshots, rising right now</h2>
            </div>
            <Hover
              as="a"
              href={`${APP_URL}/explore`}
              baseStyle={{ fontSize: 14, fontWeight: 600, color: P.goldDeep, textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 160ms' }}
              hoverStyle={{ color: P.ink }}
            >
              See the charts →
            </Hover>
          </div>
          <div ref={dreamsReveal} style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 20 }}>
            {topMoonshots === null ? (
              /* skeleton — same grid shape, no data flash */
              [0, 1, 2].map(i => (
                <div key={i} style={{ background: P.surface, border: `1px solid ${P.border}`, borderRadius: 18, overflow: 'hidden' }}>
                  <div style={{ height: 190, background: P.surface3, animation: 'oyPulse 1.4s ease-in-out infinite' }} />
                  <div style={{ padding: '18px 20px 20px' }}>
                    <div style={{ height: 10, width: '35%', background: P.surface3, borderRadius: 5, marginBottom: 14, animation: 'oyPulse 1.4s ease-in-out infinite' }} />
                    <div style={{ height: 18, width: '90%', background: P.surface3, borderRadius: 5, marginBottom: 8, animation: 'oyPulse 1.4s ease-in-out infinite' }} />
                    <div style={{ height: 18, width: '65%', background: P.surface3, borderRadius: 5, marginBottom: 22, animation: 'oyPulse 1.4s ease-in-out infinite' }} />
                    <div style={{ height: 1, background: P.borderSoft, marginBottom: 14 }} />
                    <div style={{ height: 10, width: '60%', background: P.surface3, borderRadius: 5, animation: 'oyPulse 1.4s ease-in-out infinite' }} />
                  </div>
                </div>
              ))
            ) : (
              (topMoonshots.length > 0 ? topMoonshots : DREAMS.map(d => ({
                id: d.handle, title: d.title, handle: d.handle,
                categories: [d.category], image_url: null,
                stars: 0, comments: 0, crew_total: d.crew, crew_verified: 0,
                days_left: d.days,
                user: { name: d.handle, handle: d.handle, verified: false, avatar_color: '#38BDF8', image: null },
              } as TopMoonshot))).map(d => (
                <Hover
                  key={d.id}
                  as="a"
                  href={`${APP_URL}/m/${d.id}`}
                  baseStyle={{
                    display: 'block', textDecoration: 'none', color: 'inherit', background: P.surface,
                    border: `1px solid ${P.border}`, borderRadius: 18, overflow: 'hidden', boxShadow: P.cardShadow,
                    transition: 'box-shadow 200ms, transform 200ms, border-color 200ms',
                  }}
                  hoverStyle={{ boxShadow: P.cardShadowHover, transform: 'translateY(-3px)', border: `1px solid ${P.cardBorderHover}` }}
                >
                  {/* banner — always shows an image (own → category fallback → generic) */}
                  <div style={{ height: 190, position: 'relative', overflow: 'hidden',
                    background: CATEGORY_BANNER[d.categories[0]] ?? 'linear-gradient(135deg,#1a2030,#0a1020)',
                  }}>
                    {d.image_url && (
                      <img
                        src={d.image_url}
                        alt={d.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    )}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)' }} />
                    <span style={{
                      position: 'absolute', left: 16, bottom: 13, ...mono(9.5, '#ffffff'), letterSpacing: '0.06em',
                      background: 'rgba(255,255,255,0.16)', border: '1px solid rgba(255,255,255,0.22)', padding: '3px 9px', borderRadius: 999,
                    }}>{d.categories[0]}</span>
                  </div>

                  <div style={{ padding: '18px 20px 20px' }}>
                    {/* handle + verified */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                      <span style={mono(11, P.muted)}>@{d.handle}</span>
                      {d.user.verified && (
                        <span style={{ ...mono(8.5, P.goldDeep), background: P.goldBg, padding: '1px 6px', borderRadius: 4, letterSpacing: '0.04em' }}>VERIFIED</span>
                      )}
                    </div>

                    <h3 style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.3, margin: '0 0 16px', color: P.ink, textWrap: 'pretty' }}>{d.title}</h3>

                    {/* stats row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 14, borderTop: `1px solid ${P.borderSoft}` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <StarIcon size={13} style={{ color: P.goldDeep }} />
                        <span style={mono(12, P.ink)}>{d.stars}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <svg width={13} height={13} viewBox="0 0 16 16" fill="none" style={{ color: P.inkSoft }}>
                          <path d="M2 2h12v9H9l-3 3v-3H2V2Z" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round" />
                        </svg>
                        <span style={mono(12, P.ink)}>{d.comments}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginLeft: 'auto' }}>
                        <CrewIcon size={13} style={{ color: P.goldDeep }} />
                        <span style={mono(12, P.ink)}>{d.crew_verified}</span>
                        <span style={mono(10, P.muted)}>verified crew</span>
                      </div>
                    </div>

                    {/* days left */}
                    <div style={{ ...mono(11, P.muted), marginTop: 10, display: 'flex', alignItems: 'center', gap: 5 }}>
                      <ClockMiniIcon size={11} />
                      {d.days_left > 0 ? `${d.days_left} days left` : 'Deadline passed'}
                    </div>
                  </div>
                </Hover>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ░░ PRICING ░░ */}
      <section id="pricing" style={{ background: P.surface2, borderTop: `1px solid ${P.borderSoft}`, scrollMarginTop: 80 }}>
        <div style={{ ...shell, padding: sectionPad('96px 40px', '56px 20px') }}>
          <div ref={pricingHeadReveal} className="reveal-up" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 50px' }}>
            {/* <div style={{ ...eyebrow(P), marginBottom: 14 }}><span style={{ color: P.hairline }}>// </span>plans &amp; pricing</div> */}
            <h2 style={{ ...display(mobile ? 32 : 44), margin: '0 0 16px', textWrap: 'balance' }}>Start free. Upgrade when it matters.</h2>
            <p style={{ fontSize: 16, color: P.inkSoft, lineHeight: 1.6, margin: 0, textWrap: 'pretty' }}>
              No card to declare a dream. When you&apos;re ready to stand out and welcome cash Fuel, a single step takes you further.
            </p>
          </div>

          <div ref={pricingReveal} style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: 20, alignItems: 'start' }}>
            {PRICING.map(tier => {
              const featured = !!tier.featured;
              const cardBg = featured ? P.ink : P.surface;
              const headColor = featured ? P.surface : P.ink;
              const softColor = featured ? P.faint : P.inkSoft;
              const accent = featured ? P.gold : P.goldDeep;
              return (
                <div
                  key={tier.name}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    background: cardBg,
                    border: `1px solid ${featured ? 'transparent' : P.border}`,
                    borderRadius: 20,
                    padding: featured ? '32px 26px' : '28px 26px',
                    boxShadow: featured ? P.cardShadowHover : P.cardShadow,
                    transform: featured ? 'translateY(-8px)' : 'none',
                  }}
                >
                  {featured && (
                    <span style={{
                      position: 'absolute', top: 18, right: 20, ...mono(9.5, P.ink), letterSpacing: '0.06em',
                      fontWeight: 600, background: P.gold, padding: '4px 9px', borderRadius: 999,
                    }}>MOST POPULAR</span>
                  )}
                  <div style={{ fontFamily: FONT.brand, fontWeight: 600, fontSize: 20, letterSpacing: '0.01em', color: headColor, marginBottom: 12 }}>{tier.name}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10 }}>
                    <span style={{ ...mono(32, headColor), fontWeight: 600, letterSpacing: '-0.02em' }}>{tier.price}</span>
                    <span style={mono(12, softColor)}>{tier.period}</span>
                  </div>
                  <p style={{ fontSize: 14, color: softColor, lineHeight: 1.55, margin: '0 0 22px', textWrap: 'pretty' }}>{tier.blurb}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 26 }}>
                    {tier.features.map(f => (
                      <div key={f} style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                        <CheckMarkIcon size={16} style={{ color: accent, flexShrink: 0, marginTop: 2 }} />
                        <span style={{ fontSize: 14, color: featured ? P.surface : P.ink, lineHeight: 1.5 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Hover
                    as="a"
                    href={tier.href}
                    baseStyle={{
                      marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      padding: '13px 20px', borderRadius: 12, textDecoration: 'none', fontSize: 14.5, fontWeight: 600,
                      transition: 'opacity 160ms, border-color 160ms',
                      ...(featured
                        ? { background: P.gold, color: P.ink }
                        : { background: 'transparent', border: `1px solid ${P.pillBorder}`, color: P.ink }),
                    }}
                    hoverStyle={featured ? { opacity: 0.9 } : { border: `1px solid ${P.pillBorderHover}` }}
                  >
                    {tier.cta}
                  </Hover>
                </div>
              );
            })}
          </div>

          {/* <div style={{ ...mono(11.5, P.muted), textAlign: 'center', marginTop: 32 }}>
            // 7-day money-back guarantee · cancel anytime · no card to start
          </div> */}
        </div>
      </section>

      {/* ░░ CLOSING CTA ░░ */}
      <section style={{ ...shell, padding: sectionPad('96px 40px', '56px 20px') }}>
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto' }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: P.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
            <SparkleTailIcon size={30} style={{ color: dark ? P.gold : '#e7cf8a' }} />
          </div>
          <h2 style={{ ...display(mobile ? 34 : 56), lineHeight: 1.04, margin: '0 0 18px', textWrap: 'balance' }}>Your dream deserves a place in the world,<br/>not just in your head.</h2>
          <p style={{ fontSize: 17, color: P.inkSoft, lineHeight: 1.6, margin: '0 0 32px' }}>Name it today. Let the right people find it. Begin.</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
            <Hover
              as="a"
              href={`${APP_URL}/auth?mode=signup`}
              baseStyle={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '16px 28px', borderRadius: 13,
                background: P.ink, color: P.surface, textDecoration: 'none', fontSize: 15, fontWeight: 600, transition: 'opacity 160ms',
              }}
              hoverStyle={{ opacity: 0.9 }}
            >
              Launch your Moonshot
            </Hover>
            <Hover
              as="a"
              href={`${APP_URL}/feed`}
              baseStyle={{
                padding: '16px 24px', borderRadius: 13, background: 'transparent',
                border: `1px solid ${P.pillBorder}`, color: P.ink, textDecoration: 'none', fontSize: 15, fontWeight: 600, transition: 'border-color 160ms',
              }}
              hoverStyle={{ border: `1px solid ${P.pillBorderHover}` }}
            >
              Browse the feed
            </Hover>
          </div>
          {/* <div style={{ ...mono(11.5, P.muted), marginTop: 20 }}>// free to start · 2 public Moonshots · no card required</div> */}
        </div>
      </section>

      {/* ░░ CONTACT ░░ */}
      <section id="contact" style={{ borderTop: `1px solid ${P.borderSoft}`, scrollMarginTop: 80 }}>
        <div style={{ ...shell, padding: sectionPad('80px 40px', '48px 20px') }}>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: mobile ? 40 : 80, alignItems: 'start' }}>

            {/* Left col — pitch */}
            <div ref={contactReveal} className="reveal-up">
              <h2 style={{ ...display(mobile ? 30 : 42), margin: '0 0 16px', textWrap: 'balance' }}>
                Let&apos;s talk.
              </h2>
              <p style={{ fontSize: 16, color: P.inkSoft, lineHeight: 1.7, margin: '0 0 28px', textWrap: 'pretty' }}>
                A question, a partnership idea, or just want to know more about Oystr?
                Drop us a line — we read every message.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {([
                  { label: 'General enquiries', value: 'contact@oystr.ca' },
                  { label: 'Based in', value: 'St. Catharines, ON · Canada' },
                ] as const).map(item => (
                  <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontFamily: FONT.mono, fontSize: 11, color: P.muted, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{item.label}</span>
                    <span style={{ fontSize: 14, color: P.ink, fontWeight: 500 }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right col — form */}
            <div style={{ background: P.surface, border: `1px solid ${P.border}`, borderRadius: 20, padding: mobile ? '24px 20px' : '32px 28px', boxShadow: P.cardShadow, animation: 'contact-slide-up 0.5s cubic-bezier(0.16,1,0.3,1) both' }}>
              {contactStatus === 'sent' ? (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(201,168,76,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: P.ink, marginBottom: 8 }}>Message sent!</div>
                  <div style={{ fontSize: 14, color: P.inkSoft, lineHeight: 1.6 }}>We&apos;ll get back to you as soon as possible.</div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label style={{ fontFamily: FONT.mono, fontSize: 11, color: P.muted, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Name</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={contactForm.name}
                        onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        disabled={contactStatus === 'sending'}
                        style={inpStyle(P, focusedField === 'name')}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label style={{ fontFamily: FONT.mono, fontSize: 11, color: P.muted, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Email</label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={contactForm.email}
                        onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        disabled={contactStatus === 'sending'}
                        style={inpStyle(P, focusedField === 'email')}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontFamily: FONT.mono, fontSize: 11, color: P.muted, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Message</label>
                    <textarea
                      placeholder="Tell us what's on your mind…"
                      rows={5}
                      value={contactForm.message}
                      onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      disabled={contactStatus === 'sending'}
                      style={{ ...inpStyle(P, focusedField === 'message'), resize: 'vertical', minHeight: 120 }}
                    />
                  </div>
                  {contactError && (
                    <div style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#F87171' }}>
                      {contactError}
                    </div>
                  )}
                  <Hover
                    as="div"
                    role="button"
                    onClick={async () => {
                      if (contactStatus === 'sending') return;
                      setContactError('');
                      if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
                        setContactError('Please fill in all fields.');
                        return;
                      }
                      setContactStatus('sending');
                      try {
                        const res = await fetch('/api/contact', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(contactForm),
                        });
                        const data = await res.json();
                        if (!res.ok) { setContactError(data.error ?? 'Something went wrong.'); setContactStatus('error'); return; }
                        setContactStatus('sent');
                      } catch {
                        setContactError('Network error. Please try again.');
                        setContactStatus('error');
                      }
                    }}
                    baseStyle={{
                      marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      padding: '13px 20px', borderRadius: 12, fontSize: 14.5, fontWeight: 600,
                      background: P.ink, color: P.surface, cursor: 'pointer', transition: 'opacity 160ms',
                      opacity: contactStatus === 'sending' ? 0.6 : 1,
                    }}
                    hoverStyle={{ opacity: contactStatus === 'sending' ? 0.6 : 0.85 }}
                  >
                    {contactStatus === 'sending' ? 'Sending…' : (
                      <>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                        Send message
                      </>
                    )}
                  </Hover>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ░░ NEWSLETTER ░░ */}
      <section style={{ ...shell, padding: sectionPad('64px 40px', '48px 20px') }}>
        <div style={{
          background: dark ? 'rgba(201,168,76,0.06)' : 'rgba(201,168,76,0.08)',
          border: `1px solid ${P.border}`, borderRadius: 20,
          padding: mobile ? '32px 24px' : '40px 48px',
          display: 'flex', flexDirection: mobile ? 'column' : 'row', alignItems: mobile ? 'stretch' : 'center',
          justifyContent: 'space-between', gap: 28,
        }}>
          <div style={{ maxWidth: 380 }}>
            <div style={{ ...mono(11.5, P.muted), marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Stay in the loop</div>
            <h3 style={{ ...display(mobile ? 24 : 28), lineHeight: 1.15, margin: '0 0 8px', textWrap: 'balance' }}>Get dream-worthy updates in your inbox.</h3>
            <p style={{ fontSize: 14, color: P.inkSoft, lineHeight: 1.6, margin: 0 }}>New features, community stories, and the occasional nudge to go chase something big.</p>
          </div>

          <div style={{ width: mobile ? '100%' : 380, flexShrink: 0 }}>
            {newsletterStatus === 'sent' ? (
              <div className="oy-success-fx" style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px',
                background: P.surface, border: `1px solid ${P.border}`, borderRadius: 12,
                animation: 'oyNewsletterSlideIn 0.35s cubic-bezier(0.16,1,0.3,1) both',
              }}>
                <div style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
                  <span style={{
                    position: 'absolute', inset: -6, borderRadius: '50%',
                    border: '2px solid #C9A84C', animation: 'oyRing 0.7s ease-out 0.05s both',
                  }} />
                  {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                    <span
                      key={angle}
                      style={{
                        position: 'absolute', top: '50%', left: '50%', width: 5, height: 5, borderRadius: '50%',
                        background: ['#C9A84C', '#60A5FA', '#F87171', '#34D399', '#C9A84C', '#60A5FA'][i],
                        ['--oy-angle' as any]: `${angle}deg`,
                        animation: 'oyConfetti 0.65s ease-out 0.05s both',
                      }}
                    />
                  ))}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                    style={{ position: 'relative', animation: 'oyPop 0.4s cubic-bezier(0.34,1.56,0.64,1) both' }}>
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <span style={{ fontSize: 13.5, color: P.ink, fontWeight: 600 }}>You&apos;re in! Check your inbox.</span>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', gap: 8, flexWrap: mobile ? 'wrap' : 'nowrap' }}>
                  <input
                    type="text"
                    placeholder="First name"
                    value={newsletterForm.firstName}
                    onChange={e => setNewsletterForm(f => ({ ...f, firstName: e.target.value }))}
                    disabled={newsletterStatus === 'sending'}
                    style={{ ...inpStyle(P, false), flex: '0 1 140px', background: P.surface }}
                  />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={newsletterForm.email}
                    onChange={e => setNewsletterForm(f => ({ ...f, email: e.target.value }))}
                    disabled={newsletterStatus === 'sending'}
                    style={{ ...inpStyle(P, false), flex: '1 1 180px', background: P.surface }}
                  />
                </div>
                {newsletterError && (
                  <div style={{ fontSize: 12.5, color: '#F87171' }}>{newsletterError}</div>
                )}
                <Hover
                  as="div"
                  role="button"
                  onClick={async () => {
                    if (newsletterStatus === 'sending') return;
                    setNewsletterError('');
                    if (!newsletterForm.email.trim()) { setNewsletterError('Please enter your email.'); return; }
                    setNewsletterStatus('sending');
                    try {
                      const res = await fetch('/api/subscribe', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newsletterForm),
                      });
                      const data = await res.json();
                      if (!res.ok) { setNewsletterError(data.error ?? 'Something went wrong.'); setNewsletterStatus('error'); return; }
                      setNewsletterStatus('sent');
                    } catch {
                      setNewsletterError('Network error. Please try again.');
                      setNewsletterStatus('error');
                    }
                  }}
                  baseStyle={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '12px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600,
                    background: P.ink, color: P.surface, cursor: 'pointer', transition: 'opacity 160ms',
                    opacity: newsletterStatus === 'sending' ? 0.6 : 1,
                  }}
                  hoverStyle={{ opacity: newsletterStatus === 'sending' ? 0.6 : 0.85 }}
                >
                  {newsletterStatus === 'sending' ? 'Subscribing…' : 'Subscribe'}
                </Hover>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ░░ FOOTER ░░ */}
      <footer style={{ borderTop: `1px solid ${P.border}`, background: P.surface }}>
        <div style={{ ...shell, padding: sectionPad('48px 40px 36px', '40px 20px 28px'), display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : '1.4fr 1fr 1fr 1fr', gap: mobile ? 28 : 40 }}>
          <div>
            <Brand dot={28} mb={14} />
            <p style={{ fontSize: 13.5, color: P.muted, lineHeight: 1.6, margin: 0, maxWidth: 260 }}>
              The home for grown-up dreams and the crews that carry them.
            </p>
          </div>
          {FOOTER_COLS.map(col => (
            <div key={col.head}>
              <div style={{ ...mono(11, P.faint), letterSpacing: '0.05em', marginBottom: 14, textTransform: 'uppercase' }}>{col.head}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(l => (
                  <Hover
                    key={l.label}
                    as="a"
                    href={l.href}
                    baseStyle={{ fontSize: 13.5, color: P.inkSoft, textDecoration: 'none', transition: 'color 160ms' }}
                    hoverStyle={{ color: P.ink }}
                  >
                    {l.label}
                  </Hover>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ ...shell, padding: sectionPad('20px 40px 40px', '20px 20px 32px'), borderTop: `1px solid ${P.divider}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={mono(11, P.faint)}>© 2026 Closure Solutions Ltd. · Oystr · oystr.ca · St. Catharines, ON</span>
          <span style={mono(11, P.faint)}>made for the brave</span>
        </div>
      </footer>

      {/* ░░ GO TO TOP ░░ */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Retour en haut"
          style={{
            position: 'fixed', bottom: 28, right: 28, zIndex: 99,
            width: 40, height: 40, borderRadius: '50%',
            background: P.ink, color: P.surface,
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: dark
              ? '0 4px 16px rgba(0,0,0,0.5)'
              : '0 4px 16px rgba(0,0,0,0.15)',
            transition: 'opacity 0.2s, transform 0.2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.8'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="13" x2="8" y2="3" />
            <polyline points="4,7 8,3 12,7" />
          </svg>
        </button>
      )}

      {/* keyframes for the floating hero cards */}
      <style>{`
        @keyframes oyFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
        @keyframes oyPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.45; } }
        @keyframes oyNewsletterSlideIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes oyPop { 0% { transform: scale(0); opacity: 0; } 60% { transform: scale(1.2); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes oyRing { 0% { transform: scale(0.4); opacity: 0.9; } 100% { transform: scale(2); opacity: 0; } }
        @keyframes oyConfetti {
          0% { transform: translate(-50%, -50%) rotate(var(--oy-angle)) translateX(0) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) rotate(var(--oy-angle)) translateX(22px) scale(0); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-hero-float] { animation: none !important; }
          .oy-success-fx, .oy-success-fx * { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

/* ───────────────────────────── brand lockup ───────────────────────────── */
function Brand({ dot, mb = 0 }: { dot: number; mb?: number }) {
  return <Logo height={dot} style={{ marginBottom: mb }} />;
}
