'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { C, DARK, type Palette } from './theme';

type ThemeValue = { dark: boolean; palette: Palette; toggle: () => void; setDark: (v: boolean) => void };

const ThemeContext = createContext<ThemeValue>({ dark: false, palette: C, toggle: () => {}, setDark: () => {} });

const STORAGE_KEY = 'oystr-redesign-theme';

/** Wraps every /redesign page so dark mode is a single global, persisted choice. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);

  // hydrate from localStorage after mount (SSR-safe; defaults to light)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'dark') setDark(true);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
    } catch {
      /* ignore */
    }
  }, [dark]);

  const value: ThemeValue = {
    dark,
    palette: dark ? DARK : C,
    toggle: () => setDark(d => !d),
    setDark,
  };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
