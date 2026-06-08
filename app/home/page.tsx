'use client';

import { motion } from 'framer-motion';
import { Compass, Users, Rocket } from 'lucide-react';
import ComingSoon from '@/components/ComingSoon';
import Footer from '@/components/Footer';

const TEASERS = [
    { Icon: Compass, title: 'Discover', text: 'Find Moonshots that match your goals, hobbies, and interests.' },
    { Icon: Users, title: 'Connect', text: 'Join crews of people chasing the same kind of dreams as you.' },
    { Icon: Rocket, title: 'Launch', text: 'Turn your bucket list into real, shared experiences.' },
];

export default function HomePage() {
    return (
        <>
            <ComingSoon />

            {/* Teaser strip */}
            <section style={{ padding: '4rem 1.5rem', background: 'var(--background)' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-plus-jakarta)', marginBottom: '0.75rem' }}>
                            What you&apos;ll find on <span style={{ color: 'var(--accent)' }}>Oystr</span>
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
                            A purpose-driven platform built around the things you want to do, with people who want to do them too.
                        </p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
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
                </div>
            </section>

            <Footer />
        </>
    );
}
