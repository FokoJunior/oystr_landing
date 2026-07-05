'use client';
import { useState, type CSSProperties } from 'react';
import { Compass, Target, Eye, Users, Sparkles, Zap, TrendingUp } from 'lucide-react';
import { FONT, type Palette } from '../_shared/theme';
import { ThemeProvider, useTheme } from '../_shared/ThemeContext';
import { SparkleIcon, CheckMarkIcon } from '../landing/icons';
import { useIsMobile } from '../_shared/useIsMobile';
import { useReveal } from '../_shared/useGsap';
import MarketingNav from '../_shared/MarketingNav';

const SHELL: CSSProperties = { maxWidth: 1200, margin: '0 auto', padding: '0 40px' };
const mono = (size: number, color: string): CSSProperties => ({ fontFamily: FONT.mono, fontSize: size, color });
const display = (size: number): CSSProperties => ({
  fontFamily: FONT.body, fontWeight: 600, letterSpacing: '-0.02em', fontSize: size, lineHeight: 1.05, margin: 0,
});

const VALUES = [
  { Icon: Compass, title: 'Purpose', text: 'We believe people thrive when they are moving toward something meaningful.' },
  { Icon: Users, title: 'Community', text: 'Great things happen when people support, encourage, and grow together.' },
  { Icon: Sparkles, title: 'Authenticity', text: 'Real connections begin when people show up as themselves.' },
  { Icon: Zap, title: 'Action', text: 'Dreams matter, but action is what turns them into reality.' },
  { Icon: TrendingUp, title: 'Growth', text: 'Every experience, goal, and challenge is an opportunity to become more of who you are meant to be.' },
];

export default function AboutPage() {
  return <ThemeProvider><AboutContent /></ThemeProvider>;
}

function AboutContent() {
  const { palette: P, dark } = useTheme();
  const mobile = useIsMobile();
  const shell: CSSProperties = mobile ? { ...SHELL, padding: '0 20px' } : SHELL;
  const sp = (d: string, m: string) => (mobile ? m : d);

  const valuesReveal = useReveal<HTMLDivElement>({ selector: ':scope > *', stagger: 0.08, y: 18 });

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

  return (
    <div style={{ background: P.bg, color: P.ink, minHeight: '100vh', fontFamily: FONT.body, overflowX: 'clip' }}>
      <MarketingNav />
      <div style={{ height: mobile ? 58 : 70 }} />

      {/* ░░ HERO ░░ */}
      <section style={{ ...shell, padding: sp('80px 40px 64px', '48px 20px 40px') }}>
        <div style={{ ...mono(12, P.muted), marginBottom: 20 }}>
          <span style={{ color: P.hairline }}>// </span>about oystr
        </div>
        <h1 style={{ ...display(mobile ? 40 : 68), maxWidth: 700, marginBottom: 24 }}>
          Built for the dreams you actually mean.
        </h1>
        <p style={{ fontSize: 17, color: P.inkSoft, lineHeight: 1.65, maxWidth: 580, margin: 0 }}>
          Most social platforms emphasize content consumption. Oystr asks one simple question: <strong style={{ color: P.ink }}>What&apos;s on your bucket list?</strong>
        </p>
      </section>

      {/* ░░ MISSION & VISION ░░ */}
      <section style={{ background: P.surface2, borderTop: `1px solid ${P.borderSoft}`, borderBottom: `1px solid ${P.borderSoft}` }}>
        <div style={{ ...shell, padding: sp('64px 40px', '40px 20px'), display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 24 }}>
          {[
            { Icon: Target, accent: P.goldDeep, bg: P.goldBg, title: 'Our Mission', body: 'To help people create the purposeful life they crave while building stronger communities. Oystr exists to bring people together around purpose — turning ideas into action, goals into achievements, and aspirations into experiences.' },
            { Icon: Eye, accent: '#34D399', bg: 'rgba(52,211,153,0.12)', title: 'Our Vision', body: 'A world where together and community are more than buzzwords — where people are united by what they want to become, create, experience, and contribute.' },
          ].map(({ Icon, accent, bg, title, body }) => (
            <div key={title} style={{ background: P.surface, border: `1px solid ${P.border}`, borderRadius: 20, padding: sp('32px', '24px'), boxShadow: P.cardShadow }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: bg, color: accent, marginBottom: 20 }}>
                <Icon size={22} />
              </div>
              <h3 style={{ ...display(20), marginBottom: 12 }}>{title}</h3>
              <p style={{ fontSize: 14.5, color: P.inkSoft, lineHeight: 1.7, margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ░░ VALUES ░░ */}
      <section style={{ ...shell, padding: sp('80px 40px', '48px 20px') }}>
        <h2 style={{ ...display(mobile ? 30 : 42), marginBottom: 48, textAlign: 'center' }}>Our Values</h2>
        <div ref={valuesReveal} style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(5,1fr)', gap: 20 }}>
          {VALUES.map(({ Icon, title, text }) => (
            <div key={title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '24px 16px', background: P.surface, border: `1px solid ${P.border}`, borderRadius: 18, boxShadow: P.cardShadow }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: P.heroFrom, color: P.gold, marginBottom: 16 }}>
                <Icon size={22} />
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, color: P.ink }}>{title}</h3>
              <p style={{ fontSize: 13, color: P.inkSoft, lineHeight: 1.6, margin: 0 }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ░░ STORY ░░ */}
      <section style={{ background: P.surface2, borderTop: `1px solid ${P.borderSoft}` }}>
        <div style={{ ...shell, padding: sp('80px 40px', '48px 20px'), display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <h2 style={{ ...display(mobile ? 30 : 42), marginBottom: 20 }}>Every bucket list tells a story.</h2>
            <p style={{ fontSize: 15, color: P.inkSoft, lineHeight: 1.7, marginBottom: 16 }}>
              About who you are, what matters to you, and where you&apos;re headed. Oystr was created to help you get there — through community, accountability, support, and meaningful connections.
            </p>
            <p style={{ fontSize: 15, color: P.inkSoft, lineHeight: 1.7, margin: 0 }}>
              We are building in St. Catharines, ON — launching July 15, 2026.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {['Purpose-driven, not engagement-driven', 'Community accountability that actually works', 'Real support — time, skills, cash Fuel', 'Privacy first — you control what the world sees'].map(p => (
              <div key={p} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <CheckMarkIcon size={18} style={{ color: P.goldDeep, flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 15, color: P.ink, lineHeight: 1.5 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ░░ CTA ░░ */}
      <section style={{ ...shell, padding: sp('80px 40px', '56px 20px') }}>
        <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ ...display(mobile ? 30 : 44), marginBottom: 16 }}>Be first. Be there.</h2>
          <p style={{ fontSize: 16, color: P.inkSoft, lineHeight: 1.6, marginBottom: 36 }}>One email when we launch. No spam, no noise.</p>
          {notifDone ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: 16, color: P.goldDeep, fontWeight: 600 }}>
              <SparkleIcon size={18} style={{ color: P.gold }} />
              You&apos;re on the list — see you at launch!
            </div>
          ) : (
            <form onSubmit={handleNotify} style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              <input type="email" required value={notifEmail} onChange={e => setNotifEmail(e.target.value)} placeholder="your@email.com"
                style={{ flex: 1, minWidth: 220, maxWidth: 320, padding: '13px 16px', borderRadius: 11, border: `1px solid ${P.pillBorder}`, background: P.surface, color: P.ink, fontSize: 15, outline: 'none', fontFamily: 'inherit' }} />
              <button type="submit" disabled={notifLoading}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '13px 22px', borderRadius: 11, background: P.ink, color: P.surface, border: 'none', fontSize: 15, fontWeight: 600, cursor: notifLoading ? 'wait' : 'pointer', opacity: notifLoading ? 0.7 : 1, fontFamily: 'inherit' }}>
                <SparkleIcon size={16} style={{ color: P.gold }} />
                {notifLoading ? 'Sending…' : 'Notify me'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ░░ FOOTER ░░ */}
      <footer style={{ borderTop: `1px solid ${P.border}`, background: P.surface }}>
        <div style={{ ...shell, padding: sp('36px 40px 28px', '28px 20px 24px'), display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={mono(11, P.faint)}>© 2026 Closure Solutions Ltd. · Oystr · oystr.ca · St. Catharines, ON</span>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href="/landing" style={{ ...mono(12, P.muted), textDecoration: 'none' }}>Home</a>
            <a href="/contact" style={{ ...mono(12, P.muted), textDecoration: 'none' }}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
