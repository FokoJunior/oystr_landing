'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
    theme: 'dark',
    toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark');
    const pathname = usePathname();

    // The Coming Soon landing always keeps its branded dark look, regardless of the toggle.
    const forceDark = pathname === '/';

    useEffect(() => {
        const stored = localStorage.getItem('oystr_theme') as Theme | null;
        const initial = stored || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
        setTheme(initial);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', forceDark ? 'dark' : theme);
    }, [theme, forceDark]);

    function toggleTheme() {
        setTheme((prev) => {
            const next: Theme = prev === 'dark' ? 'light' : 'dark';
            localStorage.setItem('oystr_theme', next);
            return next;
        });
    }

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    return useContext(ThemeContext);
}
