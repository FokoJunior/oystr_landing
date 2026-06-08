import Link from 'next/link';
import { Mail } from 'lucide-react';

const SOCIALS = [
    { label: 'Instagram', href: 'https://instagram.com', d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' },
    { label: 'LinkedIn', href: 'https://linkedin.com', d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z M4 9h4v12H4z' },
];

export default function Footer() {
    return (
        <footer
            style={{
                borderTop: '1px solid var(--glass-border)',
                background: 'var(--section-bg)',
                padding: '2rem 1.5rem',
                marginTop: '4rem',
            }}
        >
            <div
                style={{
                    maxWidth: 1100,
                    margin: '0 auto',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1.5rem',
                }}
            >
                <div style={{ fontFamily: 'var(--font-plus-jakarta)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                    Oystr<span style={{ color: '#38BDF8' }}>.</span>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {[
                        { href: '/home', label: 'Home' },
                        { href: '/about', label: 'About Us' },
                        { href: '/contact', label: 'Contact' },
                    ].map((l) => (
                        <Link key={l.href} href={l.href} style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>
                            {l.label}
                        </Link>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '0.6rem' }}>
                    {SOCIALS.map(({ label, href, d }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 36,
                                height: 36,
                                borderRadius: 10,
                                border: '1px solid var(--glass-border)',
                                color: 'var(--text-secondary)',
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                {label === 'Instagram' && (<><rect width="20" height="20" x="2" y="2" rx="5" /><path d={d} /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></>)}
                                {label === 'LinkedIn' && (<><path d={d} /><circle cx="4" cy="4" r="2" /></>)}
                            </svg>
                        </a>
                    ))}
                    <a
                        href="mailto:oystr@bmptravel.com"
                        aria-label="Email"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            border: '1px solid var(--glass-border)',
                            color: 'var(--text-secondary)',
                        }}
                    >
                        <Mail size={16} />
                    </a>
                </div>
            </div>

            <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                © 2026 Oystr. All Rights Reserved.
            </p>
        </footer>
    );
}
