'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Handshake, Megaphone, Headphones, Send, Heart, Users } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

const CONTACTS = [
    { Icon: Mail, title: 'General Inquiries', email: 'info@oystr.ca' },
    { Icon: Handshake, title: 'Partnerships', email: 'partnerships@oystr.ca' },
    { Icon: Megaphone, title: 'Media', email: 'media@oystr.ca' },
    { Icon: Headphones, title: 'Support', email: 'support@oystr.ca' },
];

const SUBJECTS = ['General Inquiry', 'Partnership', 'Media', 'Support', 'Other'];

function fade(delay = 0) {
    return {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay, duration: 0.5 },
    };
}

const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '13px 16px',
    borderRadius: 12,
    border: '1px solid var(--glass-border)',
    background: 'var(--card-bg)',
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    fontFamily: 'inherit',
    outline: 'none',
};

export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus('loading');
        setError('');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, subject, message }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || 'Something went wrong. Please try again.');
                setStatus('error');
            } else {
                setStatus('sent');
                setName(''); setEmail(''); setSubject(''); setMessage('');
            }
        } catch {
            setError('Network error. Please check your connection.');
            setStatus('error');
        }
    }

    return (
        <>
            <main style={{ paddingTop: '7rem', paddingBottom: '4rem', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto' }}>

                    {/* Hero */}
                    <motion.div {...fade()} style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '3rem', alignItems: 'center', marginBottom: '4rem' }} className="contact-hero-grid">
                        <div>
                            <div style={{ display: 'inline-block', color: '#38BDF8', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                Contact Page
                            </div>
                            <h1 style={{ fontSize: 'clamp(2.4rem, 6vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1.25rem', color: 'var(--text-primary)', fontFamily: 'var(--font-plus-jakarta)' }}>
                                Contact Us
                            </h1>
                            <p style={{ color: '#38BDF8', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                                We&apos;d love to hear from you.
                            </p>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '2rem', maxWidth: 460 }}>
                                Whether you have questions, partnership opportunities, media inquiries, or feedback, our team is here to help.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                                {CONTACTS.map(({ Icon, title, email: contactEmail }) => (
                                    <div key={title} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                        <div style={{ width: 42, height: 42, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #38BDF8, #0284C7)', color: '#fff', flexShrink: 0 }}>
                                            <Icon size={18} />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '0.95rem' }}>{title}</div>
                                            <a href={`mailto:${contactEmail}`} style={{ color: '#38BDF8', fontSize: '0.85rem', textDecoration: 'none' }}>
                                                Email: {contactEmail}
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div
                            style={{
                                borderRadius: 24,
                                overflow: 'hidden',
                                border: '1px solid var(--glass-border)',
                                aspectRatio: '4 / 3',
                                background: 'linear-gradient(160deg, rgba(56,189,248,0.18), rgba(251,191,36,0.08)), radial-gradient(circle at 30% 70%, rgba(56,189,248,0.25), transparent 60%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Users size={64} color="rgba(255,255,255,0.35)" />
                        </div>
                    </motion.div>

                    {/* Form + Stay Connected */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '2rem', alignItems: 'start' }} className="contact-form-grid">
                        <motion.div {...fade(0.05)} style={{ padding: '2rem', borderRadius: 20, background: 'var(--card-bg)', border: '1px solid var(--glass-border)' }}>
                            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)', fontFamily: 'var(--font-plus-jakarta)' }}>
                                Send Us a Message
                            </h2>
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <input style={inputStyle} placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                                <input style={inputStyle} type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                <select style={{ ...inputStyle, color: subject ? 'var(--text-primary)' : 'var(--text-muted)' }} value={subject} onChange={(e) => setSubject(e.target.value)}>
                                    <option value="">Subject</option>
                                    {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                                </select>
                                <textarea style={{ ...inputStyle, minHeight: 120, resize: 'vertical' }} placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)} required />

                                <motion.button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    whileHover={{ scale: status === 'loading' ? 1 : 1.02 }}
                                    whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                                    style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                                        padding: '14px 28px',
                                        background: status === 'loading' ? 'rgba(56,189,248,0.4)' : 'linear-gradient(135deg, #38BDF8, #0284C7)',
                                        color: '#fff', border: 'none', cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                                        fontWeight: 700, fontSize: '0.9rem', fontFamily: 'var(--font-plus-jakarta)', borderRadius: 14,
                                        boxShadow: '0 4px 20px rgba(56,189,248,0.3)',
                                    }}
                                >
                                    {status === 'loading' ? 'Sending...' : <><Send size={16} /> Send Message</>}
                                </motion.button>

                                {status === 'sent' && (
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#34D399', fontSize: '0.85rem', fontWeight: 600, textAlign: 'center' }}>
                                        Thanks — your message has been sent! We&apos;ll get back to you soon.
                                    </motion.p>
                                )}
                                {status === 'error' && (
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#F87171', fontSize: '0.85rem', fontWeight: 600, textAlign: 'center' }}>
                                        {error}
                                    </motion.p>
                                )}
                            </form>
                        </motion.div>

                        <motion.div {...fade(0.1)} style={{ padding: '2rem', borderRadius: 20, background: 'var(--card-bg)', border: '1px solid var(--glass-border)' }}>
                            <div style={{ width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(56,189,248,0.12)', color: '#38BDF8', marginBottom: '1.25rem' }}>
                                <Send size={20} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-primary)', fontFamily: 'var(--font-plus-jakarta)' }}>Stay Connected</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                                Want to be among the first to hear about our launch? Join the Oystr waitlist and receive updates, announcements, and early access opportunities.
                            </p>
                            <Link
                                href="/"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none',
                                    padding: '12px 24px', borderRadius: 12,
                                    background: 'linear-gradient(135deg, #38BDF8, #0284C7)', color: '#fff',
                                    fontWeight: 700, fontSize: '0.85rem', fontFamily: 'var(--font-plus-jakarta)',
                                    boxShadow: '0 4px 16px rgba(56,189,248,0.25)', marginBottom: '1.5rem',
                                }}
                            >
                                <Users size={15} /> Join the Waitlist
                            </Link>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                                <span style={{ flex: 1, height: 1, background: 'var(--glass-border)' }} />
                                <Heart size={14} />
                                <span style={{ flex: 1, height: 1, background: 'var(--glass-border)' }} />
                            </div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.8 }}>
                                Be part of the world&apos;s first purpose-driven social media platform.{' '}
                                <Link href="/about" style={{ color: '#38BDF8', textDecoration: 'none', fontWeight: 600 }}>
                                    Connect with people who share your goals, hobbies, interests, and experiences.
                                </Link>
                            </p>
                        </motion.div>
                    </div>

                    {/* CTA banner */}
                    <motion.div
                        {...fade()}
                        style={{
                            marginTop: '3rem',
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                            <div style={{ width: 52, height: 52, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(56,189,248,0.12)', color: '#38BDF8', flexShrink: 0 }}>
                                <Users size={22} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginBottom: '0.35rem', fontFamily: 'var(--font-plus-jakarta)' }}>
                                    Ready to connect with <span style={{ color: '#38BDF8' }}>purpose</span>?
                                </h3>
                                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                                    Join the waitlist and be among the first to experience Oystr.
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/"
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none',
                                padding: '14px 30px', borderRadius: 14,
                                background: 'linear-gradient(135deg, #38BDF8, #0284C7)', color: '#fff',
                                fontWeight: 700, fontSize: '0.9rem', fontFamily: 'var(--font-plus-jakarta)',
                                boxShadow: '0 4px 20px rgba(56,189,248,0.3)', whiteSpace: 'nowrap',
                            }}
                        >
                            Join the Waitlist <Send size={16} />
                        </Link>
                    </motion.div>
                </div>
            </main>

            <style>{`
                @media (max-width: 800px) {
                    .contact-hero-grid, .contact-form-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>

            <Footer />
        </>
    );
}
