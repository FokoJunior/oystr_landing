'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Send, Compass, Users, Rocket } from 'lucide-react';
import Footer from '@/components/Footer';

const TEASERS = [
    { Icon: Compass, title: 'Discover', text: 'Find Moonshots that match your goals, hobbies, and interests.' },
    { Icon: Users, title: 'Connect', text: 'Join crews of people chasing the same kind of dreams as you.' },
    { Icon: Rocket, title: 'Launch', text: 'Turn your bucket list into real, shared experiences.' },
];

export default function HomePage() {
    return (
        <>
            {/* Hero — same content & dark, glowing visual language as the Coming Soon landing */}
            <main
                style={{
                    minHeight: '100dvh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    padding: '6rem 1.5rem 4rem',
                    background: 'radial-gradient(120% 100% at 50% 0%, rgba(56,189,248,0.08), transparent 60%), #04070E',
                    color: '#F0F6FF',
                }}
            >
                <div style={{ position: 'absolute', top: '-20%', right: '-15%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />
                <div style={{ position: 'absolute', bottom: '-20%', left: '-15%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />

                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 700, width: '100%' }}>
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ marginBottom: '1.75rem', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 20px', borderRadius: 9999, border: '1px solid rgba(56,189,248,0.25)', background: 'rgba(56,189,248,0.08)', color: '#38BDF8', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', backdropFilter: 'blur(10px)' }}
                    >
                        <Sparkles size={14} /> Coming Soon
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.7 }}
                        style={{ fontSize: 'clamp(2.4rem, 7vw, 4rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '1.25rem', fontFamily: 'var(--font-plus-jakarta)' }}
                    >
                        What&apos;s on your <span style={{ color: '#38BDF8' }}>bucket list?</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        style={{ fontSize: 'clamp(1rem, 2.4vw, 1.2rem)', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 2.25rem' }}
                    >
                        The first and only <strong style={{ color: '#fff' }}>purpose-driven social platform</strong>. Connect with people who share your goals, hobbies, interests, and experiences. Be among the first to discover Oystr — join the waitlist today.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <Link
                            href="/"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 10,
                                textDecoration: 'none',
                                padding: '15px 32px',
                                borderRadius: 14,
                                background: 'linear-gradient(135deg, #38BDF8, #0284C7)',
                                color: '#fff',
                                fontWeight: 700,
                                fontSize: '0.95rem',
                                fontFamily: 'var(--font-plus-jakarta)',
                                boxShadow: '0 4px 20px rgba(56,189,248,0.3)',
                            }}
                        >
                            Join the Waitlist <Send size={16} />
                        </Link>
                    </motion.div>
                </div>
            </main>

            {/* Teaser strip */}
            <section style={{ padding: '4rem 1.5rem', background: 'var(--background)' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                    {TEASERS.map(({ Icon, title, text }, i) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            style={{ padding: '1.75rem', borderRadius: 18, background: 'var(--card-bg)', border: '1px solid var(--glass-border)' }}
                        >
                            <div style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(56,189,248,0.12)', color: '#38BDF8', marginBottom: '1rem' }}>
                                <Icon size={20} />
                            </div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 8, color: 'var(--text-primary)', fontFamily: 'var(--font-plus-jakarta)' }}>{title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{text}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </>
    );
}
