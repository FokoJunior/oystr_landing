'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Staggered "reveal" entrance for a container's direct children (or elements
 * matching `selector`). Respects prefers-reduced-motion. Reusable on any page.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(opts?: {
  selector?: string;
  y?: number;
  stagger?: number;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets = opts?.selector ? root.querySelectorAll(opts.selector) : root.children;
    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y: opts?.y ?? 14,
        duration: opts?.duration ?? 0.55,
        ease: 'power3.out',
        stagger: opts?.stagger ?? 0.07,
        delay: opts?.delay ?? 0,
      });
    }, root);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
}

export { gsap };
