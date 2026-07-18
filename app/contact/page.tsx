'use client';
import { useState, type CSSProperties } from 'react';
import { Mail, Handshake, Megaphone, Headphones } from 'lucide-react';
import { FONT } from '../_shared/theme';
import { ThemeProvider, useTheme } from '../_shared/ThemeContext';
import { SparkleIcon } from '../landing/icons';
import { useIsMobile } from '../_shared/useIsMobile';
import MarketingNav from '../_shared/MarketingNav';

const SHELL: CSSProperties = { maxWidth: 1200, margin: '0 auto', padding: '0 40px' };
const mono = (size: number, color: string): CSSProperties => ({ fontFamily: FONT.mono, fontSize: size, color });
const display = (size: number): CSSProperties => ({
  fontFamily: FONT.body, fontWeight: 600, letterSpacing: '-0.02em', fontSize: size, lineHeight: 1.05, margin: 0,
});

const CONTACTS = [
  { Icon: Mail, title: 'General', email: 'info@oystr.ca' },
  { Icon: Handshake, title: 'Partnerships', email: 'partnerships@oystr.ca' },
  { Icon: Megaphone, title: 'Media', email: 'media@oystr.ca' },
  { Icon: Headphones, title: 'Support', email: 'support@oystr.ca' },
];

const SUBJECTS = ['General Inquiry', 'Partnership', 'Media', 'Support', 'Other'];

export default function ContactPage() {
  return <ThemeProvider><ContactContent /></ThemeProvider>;
}

function ContactContent() {
  const { palette: P, dark } = useTheme();
  const mobile = useIsMobile();
  const shell: CSSProperties = mobile ? { ...SHELL, padding: '0 20px' } : SHELL;
  const sp = (d: string, m: string) => (mobile ? m : d);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');
  const [formError, setFormError] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setFormError('');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, subject, message }) });
      const data = await res.json();
      if (!res.ok) { setFormError(data.error || 'Something went wrong.'); setStatus('error'); }
      else { setStatus('sent'); setName(''); setEmail(''); setSubject(''); setMessage(''); }
    } catch { setFormError('Network error. Please try again.'); setStatus('error'); }
  };

  const inputStyle: CSSProperties = {
    width: '100%', padding: '13px 16px', borderRadius: 12, border: `1px solid ${P.pillBorder}`,
    background: P.surface, color: P.ink, fontSize: 15, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
  };

  return (
    <div style={{ background: P.bg, color: P.ink, minHeight: '100vh', fontFamily: FONT.body, overflowX: 'clip' }}>
      <MarketingNav />
      <div style={{ height: mobile ? 58 : 70 }} />

      {/* ░░ HERO ░░ */}
      <section style={{ ...shell, padding: sp('80px 40px 64px', '48px 20px 40px') }}>
        <div style={{ ...mono(12, P.muted), marginBottom: 20 }}>
          <span style={{ color: P.hairline }}>// </span>get in touch
        </div>
        <h1 style={{ ...display(mobile ? 40 : 68), maxWidth: 600, marginBottom: 24 }}>We&apos;d love to hear from you.</h1>
        <p style={{ fontSize: 17, color: P.inkSoft, lineHeight: 1.65, maxWidth: 520, margin: 0 }}>
          Questions, partnerships, media inquiries or feedback — our team is here.
        </p>
      </section>

      {/* ░░ CONTACT CHANNELS ░░ */}
      <section style={{ background: P.surface2, borderTop: `1px solid ${P.borderSoft}`, borderBottom: `1px solid ${P.borderSoft}` }}>
        <div style={{ ...shell, padding: sp('48px 40px', '32px 20px'), display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: 16 }}>
          {CONTACTS.map(({ Icon, title, email: contactEmail }) => (
            <div key={title} style={{ background: P.surface, border: `1px solid ${P.border}`, borderRadius: 16, padding: '20px', boxShadow: P.cardShadow }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: P.goldBg, color: P.goldDeep, marginBottom: 14 }}>
                <Icon size={20} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: P.ink, marginBottom: 4 }}>{title}</div>
              <a href={`mailto:${contactEmail}`} style={{ ...mono(12, P.goldDeep), textDecoration: 'none' }}>{contactEmail}</a>
            </div>
          ))}
        </div>
      </section>

      {/* ░░ FORM + NOTIF ░░ */}
      <section style={{ ...shell, padding: sp('80px 40px', '48px 20px') }}>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1.3fr 0.7fr', gap: 32, alignItems: 'start' }}>

          {/* Contact form */}
          <div style={{ background: P.surface, border: `1px solid ${P.border}`, borderRadius: 20, padding: sp('36px', '24px'), boxShadow: P.cardShadow }}>
            <h2 style={{ ...display(24), marginBottom: 28 }}>Send us a message</h2>
            {status === 'sent' ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0', gap: 16 }}>
                <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(47,138,78,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2f8a4e', fontSize: 28 }}>✓</div>
                <p style={{ fontSize: 16, fontWeight: 600, color: P.ink, textAlign: 'center' }}>Message sent!</p>
                <p style={{ fontSize: 14, color: P.inkSoft, textAlign: 'center' }}>We&apos;ll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <input style={inputStyle} placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
                <input style={inputStyle} type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
                <select style={{ ...inputStyle, color: subject ? P.ink : P.muted }} value={subject} onChange={e => setSubject(e.target.value)}>
                  <option value="">Subject</option>
                  {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <textarea style={{ ...inputStyle, minHeight: 130, resize: 'vertical' }} placeholder="Your message…" value={message} onChange={e => setMessage(e.target.value)} required />
                <button type="submit" disabled={status === 'loading'}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '14px 24px', borderRadius: 12, background: P.ink, color: P.surface, border: 'none', fontSize: 15, fontWeight: 600, cursor: status === 'loading' ? 'not-allowed' : 'pointer', opacity: status === 'loading' ? 0.7 : 1, fontFamily: 'inherit' }}>
                  {status === 'loading' ? 'Sending…' : 'Send Message'}
                </button>
                {status === 'error' && <p style={{ ...mono(13, P.red ?? '#b0311f'), textAlign: 'center', margin: 0 }}>{formError}</p>}
              </form>
            )}
          </div>

          {/* Stay connected */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ background: P.surface, border: `1px solid ${P.border}`, borderRadius: 20, padding: sp('28px', '20px'), boxShadow: P.cardShadow }}>
              <h3 style={{ ...display(18), marginBottom: 12 }}>Stay connected</h3>
              <p style={{ fontSize: 14, color: P.inkSoft, lineHeight: 1.65, marginBottom: 20 }}>
                Be among the first to hear about our launch. One email, no spam.
              </p>
              {notifDone ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: P.goldDeep, fontWeight: 600 }}>
                  <SparkleIcon size={15} style={{ color: P.gold }} />
                  You&apos;re on the list!
                </div>
              ) : (
                <form onSubmit={handleNotify} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <input type="email" required value={notifEmail} onChange={e => setNotifEmail(e.target.value)} placeholder="your@email.com"
                    style={{ ...inputStyle }} />
                  <button type="submit" disabled={notifLoading}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 20px', borderRadius: 11, background: P.ink, color: P.surface, border: 'none', fontSize: 14, fontWeight: 600, cursor: notifLoading ? 'wait' : 'pointer', opacity: notifLoading ? 0.7 : 1, fontFamily: 'inherit' }}>
                    <SparkleIcon size={14} style={{ color: P.gold }} />
                    {notifLoading ? 'Sending…' : 'Notify me at launch'}
                  </button>
                </form>
              )}
            </div>

            <div style={{ background: P.heroFrom, border: `1px solid rgba(255,255,255,0.06)`, borderRadius: 20, padding: sp('28px', '20px') }}>
              <div style={{ ...mono(11, P.gold), letterSpacing: '0.06em', marginBottom: 12 }}>LAUNCHING JULY 15, 2026</div>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, margin: 0 }}>
                Oystr is where grown-up dreams become real. Join the crew early and shape what we build together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ░░ FOOTER ░░ */}
      <footer style={{ borderTop: `1px solid ${P.border}`, background: P.surface }}>
        <div style={{ ...shell, padding: sp('36px 40px 28px', '28px 20px 24px'), display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span style={mono(11, P.faint)}>© 2026 Closure Solutions Ltd. · Oystr · oystr.ca · St. Catharines, ON</span>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href="/landing" style={{ ...mono(12, P.muted), textDecoration: 'none' }}>Home</a>
            <a href="/about" style={{ ...mono(12, P.muted), textDecoration: 'none' }}>About</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
