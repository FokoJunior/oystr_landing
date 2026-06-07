'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Compass, Users, Sparkles, Zap, TrendingUp, Send } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

const VALUES = [
    { Icon: Compass, title: 'Purpose', text: 'We believe people thrive when they are moving toward something meaningful.' },
    { Icon: Users, title: 'Community', text: 'Great things happen when people support, encourage, and grow together.' },
    { Icon: Sparkles, title: 'Authenticity', text: 'Real connections begin when people show up as themselves.' },
    { Icon: Zap, title: 'Action', text: 'Dreams matter, but action is what turns them into reality.' },
    { Icon: TrendingUp, title: 'Growth', text: 'Every experience, goal, and challenge is an opportunity to become more of who you are meant to be.' },
];

function fade(delay = 0) {
    return {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay, duration: 0.5 },
    };
}

export default function AboutPage() {
    return (
        <>
            <main style={{ paddingTop: '7rem', paddingBottom: '4rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>

                    {/* Hero */}
                    <motion.div {...fade()} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)', gap: '3rem', alignItems: 'center' }} className="about-hero-grid">
                        <div>
                            <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1.25rem', color: 'var(--text-primary)', fontFamily: 'var(--font-plus-jakarta)' }}>
                                About Us
                            </h1>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '0.5rem' }}>
                                Most social media platforms emphasize content consumption.
                            </p>
                            <p style={{ color: '#38BDF8', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                                Oystr is different.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '0.25rem' }}>
                                We ask one simple question:
                            </p>
                            <h2 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 1.9rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem', fontFamily: 'var(--font-plus-jakarta)' }}>
                                What&apos;s On Your <span style={{ color: '#38BDF8' }}>Bucket List?</span>
                            </h2>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                                Every bucket list item tells a story about who you are, what matters to you, and where you&apos;re headed.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8 }}>
                                Oystr was created to help you get there through community, accountability, support, and meaningful connections.
                            </p>
                        </div>
                        <div
                            style={{
                                borderRadius: 24,
                                overflow: 'hidden',
                                border: '1px solid var(--glass-border)',
                                aspectRatio: '4 / 5',
                                background: 'linear-gradient(160deg, rgba(56,189,248,0.18), rgba(251,191,36,0.08)), radial-gradient(circle at 70% 30%, rgba(56,189,248,0.25), transparent 60%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Compass size={64} color="rgba(255,255,255,0.35)" />
                        </div>
                    </motion.div>

                    {/* Mission & Vision */}
                    <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        <motion.div {...fade(0.05)} style={{ padding: '2rem', borderRadius: 20, background: 'var(--card-bg)', border: '1px solid var(--glass-border)' }}>
                            <div style={{ width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(56,189,248,0.12)', color: '#38BDF8', marginBottom: '1.25rem' }}>
                                <Target size={22} />
                            </div>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-primary)', fontFamily: 'var(--font-plus-jakarta)' }}>Our Mission</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                                To help people create the purposeful life they crave while building stronger communities.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                                Many are surrounded by people, yet still feel alone.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.8 }}>
                                Oystr exists to bring people together around purpose, helping members turn ideas into action, goals into achievements, and aspirations into experiences.
                            </p>
                        </motion.div>
                        <motion.div {...fade(0.1)} style={{ padding: '2rem', borderRadius: 20, background: 'var(--card-bg)', border: '1px solid var(--glass-border)' }}>
                            <div style={{ width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(251,191,36,0.12)', color: '#FBBF24', marginBottom: '1.25rem' }}>
                                <Eye size={22} />
                            </div>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-primary)', fontFamily: 'var(--font-plus-jakarta)' }}>Our Vision</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                                A world where together and community are more than buzzwords.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.8 }}>
                                A world where people are united by what they want to become, create, experience, and contribute.
                            </p>
                        </motion.div>
                    </div>

                    {/* Values */}
                    <div style={{ marginTop: '4.5rem', textAlign: 'center' }}>
                        <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: 800, marginBottom: '2.5rem', color: 'var(--text-primary)', fontFamily: 'var(--font-plus-jakarta)' }}>Our Values</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1.5rem' }}>
                            {VALUES.map(({ Icon, title, text }, i) => (
                                <motion.div key={title} {...fade(i * 0.08)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                                    <div style={{ width: 52, height: 52, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #38BDF8, #0284C7)', color: '#fff', marginBottom: '1rem', boxShadow: '0 4px 16px rgba(56,189,248,0.25)' }}>
                                        <Icon size={20} />
                                    </div>
                                    <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-primary)', fontFamily: 'var(--font-plus-jakarta)' }}>{title}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.6 }}>{text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* CTA banner */}
                    <motion.div
                        {...fade()}
                        style={{
                            marginTop: '4.5rem',
                            borderRadius: 24,
                            padding: '2.5rem',
                            background: 'linear-gradient(135deg, #0B1220, #0F1B33)',
                            border: '1px solid rgba(56,189,248,0.2)',
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '1.5rem',
                        }}
                    >
                        <div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem', fontFamily: 'var(--font-plus-jakarta)' }}>
                                Join the <span style={{ color: '#38BDF8' }}>Waitlist</span>
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', maxWidth: 480, lineHeight: 1.7 }}>
                                Be among the first to join the world&apos;s first purpose-driven social media platform. Connect with people who share your goals, build meaningful connections, and start living with more purpose.
                            </p>
                        </div>
                        <Link
                            href="/"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 10,
                                textDecoration: 'none',
                                padding: '14px 30px',
                                borderRadius: 14,
                                background: 'linear-gradient(135deg, #38BDF8, #0284C7)',
                                color: '#fff',
                                fontWeight: 700,
                                fontSize: '0.9rem',
                                fontFamily: 'var(--font-plus-jakarta)',
                                boxShadow: '0 4px 20px rgba(56,189,248,0.3)',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            Join the Waitlist <Send size={16} />
                        </Link>
                    </motion.div>
                </div>
            </main>

            <style>{`
                @media (max-width: 800px) {
                    .about-hero-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>

            <Footer />
        </>
    );
}
