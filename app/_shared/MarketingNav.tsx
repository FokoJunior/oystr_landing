'use client';
import { useState, type CSSProperties, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { FONT, type Palette } from './theme';
import { useTheme } from './ThemeContext';
import { MoonIcon, SunIcon } from './icons';
import Logo from './Logo';
import { useIsMobile } from './useIsMobile';

type Hoverable = Record<string, unknown>;
function Hover({ children, hoverStyle, baseStyle, as = 'div', ...rest }: {
  children: ReactNode; hoverStyle: CSSProperties; baseStyle: CSSProperties; as?: 'div' | 'a';
} & Hoverable) {
  const [h, setH] = useState(false);
  const Tag = as as 'div';
  return (
    <Tag {...rest} style={{ ...baseStyle, ...(h ? hoverStyle : null) }}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      {children}
    </Tag>
  );
}

function NavLink({ href, children, P, active }: { href: string; children: ReactNode; P: Palette; active?: boolean }) {
  return (
    <Hover as="a" href={href}
      baseStyle={{
        fontSize: 14, textDecoration: 'none', fontFamily: FONT.body, transition: 'color 160ms',
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

export default function MarketingNav() {
  const { palette: P, dark, toggle } = useTheme();
  const mobile = useIsMobile();
  const pathname = usePathname();

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      backdropFilter: 'blur(14px)',
      background: dark ? 'rgba(10,17,36,0.88)' : 'rgba(243,246,251,0.88)',
      borderBottom: `1px solid ${P.borderSoft}`,
    }}>
      <div style={{ width: '100%', margin: '0 auto', padding: mobile ? '14px 20px' : '16px 64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/landing" style={{ textDecoration: 'none' }}>
          <Logo height={38} dark={dark} />
        </a>
        {!mobile && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            <NavLink href="/landing" P={P} active={pathname === '/landing'}>Home</NavLink>
            <NavLink href="/about"   P={P} active={pathname === '/about'}>About</NavLink>
            <NavLink href="/contact" P={P} active={pathname === '/contact'}>Contact</NavLink>
          </nav>
        )}
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
    </header>
  );
}
