'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Send } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

const LINKS = [
    { href: '/home', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
];

export default function Nav() {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();
    const [open, setOpen] = useState(false);

    // The Coming Soon landing (root) keeps its own dark, full-viewport identity —
    // the nav floats over it in a matching dark-glass style regardless of the global theme.
    const forceDark = pathname === '/';
    const bg = forceDark ? 'rgba(8, 13, 26, 0.55)' : 'var(--nav-bg)';
    const border = forceDark ? 'rgba(56,189,248,0.12)' : 'var(--glass-border)';
    const fg = forceDark ? '#F0F6FF' : 'var(--text-primary)';
    const sub = forceDark ? 'rgba(255,255,255,0.65)' : 'var(--text-secondary)';

    return (
        <motion.header
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', justifyContent: 'center', padding: '1rem 1.25rem' }}
        >
            <nav
                style={{
                    width: '100%',
                    maxWidth: 1100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 1.25rem',
                    borderRadius: 16,
                    background: bg,
                    border: `1px solid ${border}`,
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    transition: 'background 0.3s ease, border-color 0.3s ease',
                }}
            >
                <Link href="/" style={{ display: 'flex', alignItems: 'baseline', gap: 2, textDecoration: 'none', fontFamily: 'var(--font-plus-jakarta)', fontWeight: 800, fontSize: '1.25rem', color: fg }}>
                    Oystr<span style={{ color: '#38BDF8' }}>.</span>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="nav-links-desktop">
                    {LINKS.map((link) => {
                        const active = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                style={{
                                    textDecoration: 'none',
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    color: active ? '#38BDF8' : sub,
                                    borderBottom: active ? '2px solid #38BDF8' : '2px solid transparent',
                                    paddingBottom: 4,
                                    transition: 'color 0.2s ease',
                                }}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 38,
                            height: 38,
                            borderRadius: 12,
                            border: `1px solid ${border}`,
                            background: 'transparent',
                            color: fg,
                            cursor: 'pointer',
                        }}
                    >
                        {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
                    </button>

                    <Link
                        href="/"
                        className="nav-cta-desktop"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                            textDecoration: 'none',
                            padding: '10px 20px',
                            borderRadius: 12,
                            background: 'linear-gradient(135deg, #38BDF8, #0284C7)',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            boxShadow: '0 4px 16px rgba(56,189,248,0.25)',
                        }}
                    >
                        Join the Waitlist <Send size={14} />
                    </Link>

                    <button
                        onClick={() => setOpen((v) => !v)}
                        aria-label="Toggle menu"
                        className="nav-burger"
                        style={{
                            display: 'none',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 38,
                            height: 38,
                            borderRadius: 12,
                            border: `1px solid ${border}`,
                            background: 'transparent',
                            color: fg,
                            cursor: 'pointer',
                        }}
                    >
                        {open ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ duration: 0.18 }}
                        style={{
                            position: 'absolute',
                            top: '4.5rem',
                            left: '1.25rem',
                            right: '1.25rem',
                            borderRadius: 16,
                            background: bg,
                            border: `1px solid ${border}`,
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            padding: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem',
                        }}
                        className="nav-mobile-menu"
                    >
                        {LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                style={{ textDecoration: 'none', fontSize: '1rem', fontWeight: 600, color: pathname === link.href ? '#38BDF8' : sub, padding: '0.4rem 0' }}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/"
                            onClick={() => setOpen(false)}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 8,
                                textDecoration: 'none',
                                padding: '12px 20px',
                                borderRadius: 12,
                                background: 'linear-gradient(135deg, #38BDF8, #0284C7)',
                                color: '#fff',
                                fontWeight: 700,
                                fontSize: '0.9rem',
                                marginTop: 4,
                            }}
                        >
                            Join the Waitlist <Send size={14} />
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @media (max-width: 768px) {
                    .nav-links-desktop, .nav-cta-desktop { display: none !important; }
                    .nav-burger { display: inline-flex !important; }
                }
                @media (min-width: 769px) {
                    .nav-mobile-menu { display: none !important; }
                }
            `}</style>
        </motion.header>
    );
}
