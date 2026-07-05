'use client';
import { useEffect, useRef, useState } from 'react';

export function Counter({ value, suffix = '', delay = 0 }: { value: number; suffix?: string; delay?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(value);
      return;
    }

    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      obs.disconnect();

      const duration = 1400;
      const startAt = performance.now() + delay * 1000;

      const tick = (now: number) => {
        if (now < startAt) { requestAnimationFrame(tick); return; }
        const t = Math.min((now - startAt) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setN(Math.round(eased * value));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.2 });

    obs.observe(el);
    return () => obs.disconnect();
  }, [value, delay]);

  return <span ref={ref}>{n.toLocaleString('en-US')}{suffix}</span>;
}
