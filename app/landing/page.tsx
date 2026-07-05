'use client';
import Link from 'next/link';
import { useState, useEffect, useRef, type CSSProperties, type ReactNode } from 'react';
import { FONT, radius, type Palette } from '../_shared/theme';
import { ThemeProvider, useTheme } from '../_shared/ThemeContext';
import Logo from '../_shared/Logo';
import { useReveal } from '../_shared/useGsap';
import { useIsMobile } from '../_shared/useIsMobile';
import {
  MoonIcon, SunIcon,
  StarIcon, CrewIcon, FuelIcon, OrbitIcon, EchoIcon,
} from '../_shared/icons';
import {
  PenIcon, UsersIcon, FlagIcon, LogIcon,
  SparkleIcon, SparkleTailIcon, CheckMarkIcon, ClockMiniIcon,
} from './icons';
import {
  STEPS, SIGNALS, PROOFS, HERO_CREW, FOOTER_COLS,
  type Step, type Signal,
} from './data';


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
const SIGNAL_ICON: Record<Signal['icon'], typeof StarIcon> = {
  star: StarIcon, crew: CrewIcon, fuel: FuelIcon, orbit: OrbitIcon, echo: EchoIcon, log: LogIcon,
};

function NavLink({ href, children, P, active }: { href: string; children: ReactNode; P: Palette; active?: boolean }) {
  return (
    <Hover
      as="a"
      href={href}
      baseStyle={{
        fontSize: 14, textDecoration: 'none', transition: 'color 160ms',
        color: active ? P.ink : P.inkSoft,
        fontWeight: active ? 600 : 400,
        position: 'relative',
      }}
      hoverStyle={{ color: P.ink }}
    >
      {children}
      {active && (
        <span style={{
          position: 'absolute', bottom: -4, left: 0, right: 0,
          height: 2, borderRadius: 2,
          background: P.goldDeep,
        }} />
      )}
    </Hover>
  );
}

export default function LandingPage() {
  return <ThemeProvider><LandingContent /></ThemeProvider>;
}

function LandingContent() {
  const { palette: P, dark, toggle } = useTheme();
  const mobile = useIsMobile();

  const [notifEmail, setNotifEmail] = useState('');
  const [notifDone, setNotifDone] = useState(false);
  const [notifLoading, setNotifLoading] = useState(false);
  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifEmail || notifLoading) return;
    setNotifLoading(true);
    try {
      await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: notifEmail }) });
      setNotifDone(true);
    } catch { /* ignore */ } finally { setNotifLoading(false); }
  };

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);

  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const target = new Date('2026-07-15T00:00:00').getTime();
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setCountdown({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!notifDone) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const COLORS = ['#e7cf8a','#f5e6a3','#c9a74a','#ffffff','#a78bfa','#34D399','#f87171','#38BDF8'];
    type P = { x:number; y:number; vx:number; vy:number; color:string; size:number; alpha:number; decay:number; rect:boolean };
    const pts: P[] = [];

    const burst = (bx: number, by: number, n = 70) => {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = Math.random() * 10 + 2;
        pts.push({ x: bx, y: by, vx: Math.cos(a)*s, vy: Math.sin(a)*s - Math.random()*4,
          color: COLORS[Math.floor(Math.random()*COLORS.length)],
          size: Math.random()*5+2, alpha: 1, decay: Math.random()*0.012+0.006,
          rect: Math.random() > 0.55 });
      }
    };

    const W = canvas.width, H = canvas.height;
    burst(W*0.5, H*0.42, 90);
    const t = [
      setTimeout(() => burst(W*0.25, H*0.35, 65), 220),
      setTimeout(() => burst(W*0.75, H*0.35, 65), 380),
      setTimeout(() => burst(W*0.38, H*0.55, 55), 520),
      setTimeout(() => burst(W*0.62, H*0.28, 55), 680),
      setTimeout(() => burst(W*0.5,  H*0.4,  45), 850),
      setTimeout(() => burst(W*0.15, H*0.5,  40), 1000),
      setTimeout(() => burst(W*0.85, H*0.45, 40), 1100),
    ];

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = pts.length-1; i >= 0; i--) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        p.vy += 0.18; p.vx *= 0.97;
        p.alpha -= p.decay;
        if (p.alpha <= 0) { pts.splice(i,1); continue; }
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        if (p.rect) { ctx.fillRect(p.x-p.size/2, p.y-p.size/2, p.size, p.size*0.55); }
        else { ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill(); }
      }
      ctx.globalAlpha = 1;
      if (pts.length > 0) animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animRef.current); t.forEach(clearTimeout); };
  }, [notifDone]);

  const shell: CSSProperties = mobile ? { ...SHELL, padding: '0 20px' } : SHELL;
  const sectionPad = (desktopPad: string, mobilePad: string) => (mobile ? mobilePad : desktopPad);

  const heroAnim = (delay: number, duration = 0.6): CSSProperties => ({
    animation: `heroFadeUp ${duration}s cubic-bezier(0.215,0.61,0.355,1) both`,
    animationDelay: `${delay}s`,
  });

  /* scroll-reveal hooks for the lower sections */
  const stepsReveal = useReveal<HTMLDivElement>({ selector: ':scope > *', stagger: 0.1, y: 20 });
  const signalsReveal = useReveal<HTMLDivElement>({ selector: ':scope > *', stagger: 0.07, y: 16 });

  return (
    <div style={{ background: P.bg, color: P.ink, minHeight: '100vh', fontFamily: FONT.body, overflowX: 'clip' }}>
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }} />

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
              <NavLink href="/landing" P={P} active>Home</NavLink>
              <NavLink href="/about"   P={P}>About</NavLink>
              <NavLink href="/contact" P={P}>Contact</NavLink>
            </nav>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: mobile ? 10 : 14 }}>
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
          </div>
        </div>
      </header>

      {/* spacer for fixed navbar */}
      <div style={{ height: mobile ? 58 : 70 }} />

      {/* ░░ HERO — COMING SOON ░░ */}
      <section style={{ ...shell, padding: sectionPad('100px 40px 90px', '60px 20px 56px'), textAlign: 'center' }}>
        {/* Launch badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, ...heroAnim(0.05),
          background: P.goldBg, border: `1px solid rgba(156,123,54,0.28)`, borderRadius: 999,
          padding: '6px 16px', marginBottom: 32,
        }}>
          <SparkleIcon size={13} style={{ color: P.goldDeep }} />
          <span style={{ ...mono(12, P.goldDeep), fontWeight: 600, letterSpacing: '0.04em' }}>LAUNCHING JULY 15, 2026</span>
        </div>

        <h1 style={{ ...display(mobile ? 42 : 80), lineHeight: 1.01, textWrap: 'balance', margin: '0 auto 24px', maxWidth: 820, ...heroAnim(0.12) }}>
          What&apos;s on your bucket list?
        </h1>
        <p style={{ fontSize: mobile ? 16 : 18, lineHeight: 1.65, color: P.inkSoft, margin: '0 auto 40px', maxWidth: 560, textWrap: 'pretty', ...heroAnim(0.2) }}>
          Be among the first to discover Oystr. Join the waitlist today.
        </p>

        {/* Countdown */}
        <div style={{ width: '100%', maxWidth: 560, margin: '0 auto 52px', ...heroAnim(0.26) }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: mobile ? 0 : 0 }}>
            {([
              { label: 'DAYS', value: countdown.days },
              { label: 'HRS',  value: countdown.hours },
              { label: 'MIN',  value: countdown.minutes },
              { label: 'SEC',  value: countdown.seconds },
            ] as const).map(({ label, value }, i) => (
              <div key={label} style={{ display: 'flex', alignItems: 'stretch', flex: 1 }}>
                {i > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: mobile ? 14 : 18 }}>
                    <div style={{ width: 1, flex: 1, background: P.borderSoft }} />
                  </div>
                )}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: mobile ? '0 8px 12px' : '0 16px 16px' }}>
                  <span style={{
                    ...mono(9, P.goldDeep),
                    letterSpacing: '0.14em', fontWeight: 600, marginBottom: 10,
                  }}>{label}</span>
                  <div style={{ width: '100%', height: 1, background: `linear-gradient(90deg, transparent, ${P.goldDeep}66, transparent)`, marginBottom: 10 }} />
                  <span style={{
                    fontFamily: FONT.mono,
                    fontSize: mobile ? 40 : 64,
                    fontWeight: 800,
                    color: P.ink,
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    {String(value).padStart(2, '0')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription form */}
        <div style={{ maxWidth: 520, margin: '0 auto', ...heroAnim(0.28) }}>
          {notifDone ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: 16, color: P.goldDeep, fontWeight: 600 }}>
              <SparkleIcon size={18} style={{ color: P.gold }} />
              You&apos;re on the list — see you at launch!
            </div>
          ) : (
            <form onSubmit={handleNotify} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
              <input
                type="email"
                required
                value={notifEmail}
                onChange={e => setNotifEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  flex: 1, minWidth: 220, padding: '14px 18px', borderRadius: 12,
                  border: `1px solid ${P.pillBorder}`, background: P.surface, color: P.ink,
                  fontSize: 15, outline: 'none', fontFamily: 'inherit',
                }}
              />
              <button
                type="submit"
                disabled={notifLoading}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '14px 24px', borderRadius: 12,
                  background: P.ink, color: P.surface, border: 'none', fontSize: 15, fontWeight: 600,
                  cursor: notifLoading ? 'wait' : 'pointer', opacity: notifLoading ? 0.7 : 1,
                  fontFamily: 'inherit',
                }}
              >
                <SparkleIcon size={16} style={{ color: P.gold }} />
                {notifLoading ? 'Sending…' : 'Notify me at launch'}
              </button>
            </form>
          )}
          <p style={{ ...mono(12, P.muted), marginTop: 14 }}>No spam · one email · unsubscribe anytime</p>
        </div>

        {/* Crew avatars */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginTop: 48, ...heroAnim(0.36) }}>
          {HERO_CREW.map((c, i) => (
            <div key={i} style={{
              width: 36, height: 36, borderRadius: 10, background: dark ? '#2f2f2b' : P.surface3,
              border: `2px solid ${P.bg}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
              ...mono(11, dark ? '#e7cf8a' : P.goldDeep), fontWeight: 700, marginLeft: i === 0 ? 0 : -10,
            }}>{c.t}</div>
          ))}
        </div>
        <p style={{ ...mono(12, P.muted), marginTop: 14, ...heroAnim(0.42) }}>12,400+ dreamers already on the waitlist</p>
      </section>

      {/* ░░ TRUST STRIP ░░ */}
      <section style={{ borderTop: `1px solid ${P.borderSoft}`, borderBottom: `1px solid ${P.borderSoft}`, background: P.surface2 }}>
        <div style={{ ...shell, padding: sectionPad('24px 40px', '20px 20px'), display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <CheckMarkIcon size={16} style={{ color: P.goldDeep, flexShrink: 0 }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: P.ink }}>Real Support. Honest Reach.</span>
          </div>
          <p style={{ fontSize: 13.5, color: P.inkSoft, margin: 0, maxWidth: 560, lineHeight: 1.55, textWrap: 'pretty' }}>
            We&apos;re building Oystr around one principle: your reach will be earned through genuine support — never bought, boosted, or manipulated by an algorithm.
          </p>
        </div>
      </section>

      {/* ░░ HOW IT WORKS ░░ */}
      <section id="how" style={{ ...shell, padding: sectionPad('96px 40px 40px', '56px 20px 32px') }}>
        {/* <div style={eyebrow(P)}><span style={{ color: P.hairline }}>// </span>how it works</div> */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap', marginBottom: 50 }}>
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
                <div style={{
                  height: 160, position: 'relative', overflow: 'hidden',
                  background: s.num === '01'
                    ? `linear-gradient(135deg, ${P.surface3}, ${P.surface2})`
                    : s.num === '02'
                    ? `linear-gradient(135deg, ${P.heroFrom}22, ${P.surface2})`
                    : `linear-gradient(135deg, ${P.goldBg}, ${P.surface2})`,
                }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `radial-gradient(180px 180px at 50% 40%, ${P.goldBg}, transparent 70%)`,
                  }} />
                  <div style={{
                    position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: P.goldDeep, opacity: 0.35,
                  }}>
                    <Icon size={64} />
                  </div>
                  <span style={{ position: 'absolute', right: 16, top: 14, ...mono(11, P.faint) }}>{s.num}</span>
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
      <section id="signals" style={{ background: P.heroFrom, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -40, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,167,74,0.22), transparent 70%)' }} />
        <div style={{ ...shell, padding: sectionPad('80px 40px', '48px 20px'), position: 'relative' }}>
          {/* <div style={{ ...mono(12.5, '#9c9c94'), marginBottom: 14 }}><span style={{ color: '#5b594f' }}>// </span>the language of support</div> */}
          <h2 style={{ ...display(mobile ? 32 : 46), color: '#f6f5f1', margin: '0 0 12px', maxWidth: 680 }}>Six ways to say &ldquo;I&apos;ve got you.&rdquo;</h2>
          <p style={{ fontSize: 15, color: '#9c9c94', lineHeight: 1.6, maxWidth: 560, margin: '0 0 44px' }}>
            A like is forgettable. On Oystr, every signal will be a deliberate act of backing — visible, meaningful, and built to matter to the people chasing something real.
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
      <section id="who" style={{ ...shell, padding: sectionPad('40px 40px 80px', '32px 20px 48px') }}>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '0.9fr 1.1fr', gap: mobile ? 32 : 60, alignItems: 'center' }}>
          <div
            style={{
              display: 'block', width: '100%', borderRadius: 22,
              border: `1px solid ${P.border}`, overflow: 'hidden',
            }}
          >
            <img
              src="/landing/1%20(3).jpeg"
              alt="Someone mid-dream"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            {/* <div style={{ position: 'absolute', left: 26, bottom: 24, ...mono(11, 'rgba(255,255,255,0.75)') }}>// someone mid-dream</div> */}
          </div>
          <div>
            {/* <div style={eyebrow(P)}><span style={{ color: P.hairline }}>// </span>who it&apos;s for</div> */}
            <h2 style={{ ...display(mobile ? 32 : 46), margin: '0 0 20px' }}>For the dream you&apos;ve carried for decades.</h2>
            <p style={{ fontSize: 16, color: P.inkSoft, lineHeight: 1.65, margin: '0 0 28px', maxWidth: 500, textWrap: 'pretty' }}>
              The novel half-written. The town you left and mean to return to. The instrument, the company, the long walk. Oystr is being built for people with the wisdom to know what matters — and the resolve to finally begin.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {PROOFS.map(p => (
                <div key={p} style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}>
                  <CheckMarkIcon size={18} style={{ color: P.goldDeep, flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 14.5, color: P.ink, lineHeight: 1.5 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ░░ CLOSING CTA ░░ */}
      <section style={{ ...shell, padding: sectionPad('96px 40px', '56px 20px') }}>
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto' }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: P.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
            <SparkleTailIcon size={30} style={{ color: dark ? P.gold : '#e7cf8a' }} />
          </div>
          <h2 style={{ ...display(mobile ? 34 : 56), lineHeight: 1.04, margin: '0 0 18px', textWrap: 'balance' }}>The dream doesn&apos;t get smaller by waiting.</h2>
          <p style={{ fontSize: 17, color: P.inkSoft, lineHeight: 1.6, margin: '0 0 32px' }}>Be the first to know when we launch. No spam — just one email.</p>
          {notifDone ? (
            <div style={{ fontSize: 16, color: P.goldDeep, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <SparkleIcon size={18} style={{ color: P.gold }} />
              You&apos;re on the list — see you at launch!
            </div>
          ) : (
            <form onSubmit={handleNotify} style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <input
                type="email"
                required
                value={notifEmail}
                onChange={e => setNotifEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  flex: 1, minWidth: 240, maxWidth: 340, padding: '14px 18px', borderRadius: 12,
                  border: `1px solid ${P.pillBorder}`, background: P.surface, color: P.ink,
                  fontSize: 15, outline: 'none', fontFamily: 'inherit',
                }}
              />
              <button
                type="submit"
                disabled={notifLoading}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '14px 26px', borderRadius: 12,
                  background: P.ink, color: P.surface, border: 'none', fontSize: 15, fontWeight: 600,
                  cursor: notifLoading ? 'wait' : 'pointer', opacity: notifLoading ? 0.7 : 1,
                  fontFamily: 'inherit',
                }}
              >
                <SparkleIcon size={16} style={{ color: P.gold }} />
                {notifLoading ? 'Sending…' : 'Notify me at launch'}
              </button>
            </form>
          )}
          {/* <div style={{ ...mono(11.5, P.muted), marginTop: 20 }}>// free to start · 2 public Moonshots · no card required</div> */}
        </div>
      </section>

      {/* ░░ FOOTER ░░ */}
      <footer style={{ borderTop: `1px solid ${P.border}`, background: P.surface }}>
        <div style={{ ...shell, padding: sectionPad('48px 40px 36px', '40px 20px 28px'), display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : '1.4fr 1fr 1fr 1fr', gap: mobile ? 28 : 40 }}>
          <div>
            <Brand dot={28} mb={14} />
            <p style={{ fontSize: 13.5, color: P.muted, lineHeight: 1.6, margin: 0, maxWidth: 260 }}>
              A new home for grown-up dreams and the crews that will carry them.
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

      {/* keyframes for the floating hero cards */}
      <style>{`
        @keyframes oyFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
        @keyframes oyPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.45; } }
@media (prefers-reduced-motion: reduce) { [data-hero-float] { animation: none !important; } }
      `}</style>
    </div>
  );
}

/* ───────────────────────────── brand lockup ───────────────────────────── */
function Brand({ dot, mb = 0 }: { dot: number; mb?: number }) {
  return <Logo height={dot} style={{ marginBottom: mb }} />;
}
