import { useEffect } from 'react';
import Lenis from 'lenis';

export default function useSmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      wheelMultiplier: 0.95,
    });

    window.__lenis = lenis;
    let raf = 0;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      if (window.__lenis === lenis) window.__lenis = null;
    };
  }, []);
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { duration: 1.5, offset: -1 });
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function scrollToTop() {
  if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.6 });
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}
