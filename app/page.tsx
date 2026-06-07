'use client';

import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Rocket, Send, Sparkles, Star, Moon, Compass, Trophy, Zap, Heart, Globe } from 'lucide-react';

// ─── Floating Particles ──────────────────────────────────────────────────────
const ICONS = [Star, Moon, Rocket, Compass, Trophy, Zap, Heart, Globe];
const COLORS = ['#38BDF8', '#FBBF24', '#34D399', '#FB923C', '#9BB0CC', '#a78bfa'];

function FloatingParticles() {
  const [particles, setParticles] = useState<any[]>([]);
  useEffect(() => {
    setParticles(
      Array.from({ length: 28 }).map((_, i) => ({
        id: i,
        Icon: ICONS[i % ICONS.length],
        size: Math.random() * 22 + 10,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: Math.random() * 14 + 18,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: Math.random() * 0.22 + 0.04,
        xSwing: Math.random() * 80 - 40,
      }))
    );
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {particles.map((p) => {
        const IC = p.Icon;
        return (
          <motion.div
            key={p.id}
            style={{ position: 'absolute', bottom: '-8%', left: `${p.left}%`, color: p.color, opacity: p.opacity }}
            animate={{ y: ['0vh', '-115vh'], x: [0, p.xSwing, -p.xSwing, 0], rotate: [0, 360] }}
            transition={{
              y: { duration: p.duration, repeat: Infinity, ease: 'linear', delay: p.delay },
              x: { duration: p.duration * 0.75, repeat: Infinity, ease: 'easeInOut', delay: p.delay },
              rotate: { duration: p.duration * 1.2, repeat: Infinity, ease: 'linear', delay: p.delay },
            }}
          >
            <IC size={p.size} />
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Twinkling Stars ─────────────────────────────────────────────────────────
function TwinkleStars() {
  const [stars, setStars] = useState<any[]>([]);
  useEffect(() => {
    setStars(
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 2 + 1.5,
      }))
    );
  }, []);
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {stars.map((s) => (
        <motion.div
          key={s.id}
          style={{ position: 'absolute', top: `${s.top}%`, left: `${s.left}%`, width: s.size, height: s.size, borderRadius: '50%', background: 'white' }}
          animate={{ opacity: [0.1, 0.8, 0.1], scale: [0.8, 1.4, 0.8] }}
          transition={{ duration: s.duration, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
        />
      ))}
    </div>
  );
}

// ─── SVG Ring Countdown Block ─────────────────────────────────────────────────
function RingBlock({ value, label, max, color }: { value: number; label: string; max: number; color: string }) {
  const R = 46;
  const CIRCUMFERENCE = 2 * Math.PI * R;
  const progress = value / max;
  const offset = CIRCUMFERENCE * (1 - progress);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 80, damping: 14 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
    >
      <div style={{ position: 'relative', width: 110, height: 110 }}>
        {/* Glow bg */}
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: `radial-gradient(circle, ${color}18 0%, transparent 75%)`, filter: 'blur(8px)' }} />
        <svg width="110" height="110" viewBox="0 0 110 110" style={{ transform: 'rotate(-90deg)' }}>
          {/* Track */}
          <circle cx="55" cy="55" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
          {/* Progress */}
          <motion.circle
            cx="55"
            cy="55"
            r={R}
            fill="none"
            stroke={color}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </svg>
        {/* Number */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.span
            key={value}
            initial={{ opacity: 0, y: -10, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 14 }}
            style={{ fontSize: '2rem', fontWeight: 800, color, fontFamily: 'var(--font-plus-jakarta)', lineHeight: 1, textShadow: `0 0 12px ${color}` }}
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </div>
      </div>
      <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', fontWeight: 700 }}>{label}</span>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubscribe() {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName: firstName.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Try again.');
      } else {
        setSubmitted(true);
      }
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const target = new Date('2026-07-15T00:00:00Z');
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <main style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '1rem' }}>
      {/* Decorative Orbs */}
      <div style={{ position: 'absolute', top: '-20%', right: '-15%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-20%', left: '-15%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />

      <TwinkleStars />
      <FloatingParticles />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: 700, width: '100%' }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, type: 'spring' }}
          style={{ marginBottom: '2rem', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px', borderRadius: 9999, border: '1px solid rgba(56,189,248,0.25)', background: 'rgba(56,189,248,0.08)', color: '#38BDF8', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', backdropFilter: 'blur(10px)' }}
        >
          <motion.span animate={{ rotate: [0, 20, -10, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}>
            <Rocket size={14} />
          </motion.span>
          Coming Soon
        </motion.div>

        {/* Headline / Logo */}
        <div style={{ marginBottom: '1.5rem' }}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.9, type: 'spring' }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <img
              src="/logo-theme-sombre.png"
              alt="OYSTR Logo"
              style={{ height: 'clamp(60px, 15vw, 120px)', width: 'auto', filter: 'drop-shadow(0 0 20px rgba(56, 189, 248, 0.3) )' }}
            />
          </motion.div>
        </div>


        {/* Hook */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: '#fff', marginBottom: '0.75rem', lineHeight: 1.3, fontWeight: 700, fontFamily: 'var(--font-plus-jakarta)' }}
        >
          What&apos;s on your bucket list?
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', color: 'rgba(255,255,255,0.55)', marginBottom: '3rem', lineHeight: 1.7, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}
        >
          <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2 }}>
            <Sparkles size={13} color="#FBBF24" />
          </motion.span>
          Be among the first to discover Oystr. Join the waitlist today.
        </motion.p>

        {/* ── Countdown Rings ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          style={{ display: 'flex', justifyContent: 'center', columnGap: 'clamp(1rem, 4vw, 2.5rem)', rowGap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}
        >
          <RingBlock value={timeLeft.days} label="Days" max={40} color="#38BDF8" />
          <RingBlock value={timeLeft.hours} label="Hours" max={24} color="#FBBF24" />
          <RingBlock value={timeLeft.minutes} label="Minutes" max={60} color="#34D399" />
          <RingBlock value={timeLeft.seconds} label="Seconds" max={60} color="#FB923C" />
        </motion.div>

        {/* ── Email / Waitlist ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          style={{ maxWidth: 460, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                style={{ padding: '16px 28px', borderRadius: 14, background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)', color: '#34D399', fontWeight: 700, fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}
              >
                <Star size={18} fill="#34D399" /> {firstName ? `Welcome, ${firstName}! You're on the list.` : "You're on the waitlist!"}
              </motion.div>
            ) : (
              <motion.div
                key="form"
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              >
                {/* First name */}
                <div style={{ background: 'rgba(16,24,40,0.75)', backdropFilter: 'blur(14px)', border: '1px solid rgba(56,189,248,0.18)', borderRadius: 14, overflow: 'hidden' }}>
                  <input
                    type="text"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                    placeholder="First name"
                    disabled={loading}
                    style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', padding: '14px 18px', color: '#fff', fontSize: '0.875rem', boxSizing: 'border-box' }}
                  />
                </div>
                {/* Email */}
                <div style={{ background: 'rgba(16,24,40,0.75)', backdropFilter: 'blur(14px)', border: `1px solid ${error ? 'rgba(248,113,113,0.4)' : 'rgba(56,189,248,0.18)'}`, borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.2s' }}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError(''); }}
                    onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                    placeholder="Email"
                    disabled={loading}
                    style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', padding: '14px 18px', color: '#fff', fontSize: '0.875rem' }}
                  />
                </div>
                {/* Submit button below */}
                <motion.button
                  whileHover={{ scale: loading ? 1 : 1.04 }}
                  whileTap={{ scale: loading ? 1 : 0.97 }}
                  onClick={handleSubscribe}
                  disabled={loading}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '14px 28px', background: loading ? 'rgba(56,189,248,0.4)' : 'linear-gradient(135deg, #38BDF8, #0284C7)', color: '#fff', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: '0.9rem', fontFamily: 'var(--font-plus-jakarta)', borderRadius: 14, marginTop: 10, boxShadow: '0 4px 20px rgba(56,189,248,0.3)', transition: 'background 0.2s' }}
                >
                  {loading ? 'Adding to list...' : <><span>Join the Waitlist</span> <Send size={16} /></>}
                </motion.button>

                {error && (
                  <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} style={{ color: '#F87171', fontSize: '0.75rem', textAlign: 'center', marginTop: 4, fontWeight: 600 }}>{error}</motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Social Icons ── */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        style={{ position: 'absolute', bottom: 28, display: 'flex', gap: 28, zIndex: 10 }}
      >
        {[
          { label: 'Instagram', d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' },
          { label: 'Twitter', d: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' },
          { label: 'LinkedIn', d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z M4 9h4v12H4z M4 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z' },
        ].map((s) => (
          <motion.a
            key={s.label}
            href="#"
            aria-label={s.label}
            whileHover={{ scale: 1.3, color: '#38BDF8' }}
            style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {s.label === 'Instagram' && (<><rect width="20" height="20" x="2" y="2" rx="5" /><path d={s.d} /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></>)}
              {s.label !== 'Instagram' && <path d={s.d} />}
              {s.label === 'LinkedIn' && <circle cx="4" cy="4" r="2" />}
            </svg>
          </motion.a>
        ))}
      </motion.footer>
    </main>
  );
}
