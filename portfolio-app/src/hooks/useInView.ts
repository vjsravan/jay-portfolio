import { useEffect, useRef, useState, type RefObject } from 'react';

/**
 * Whether an element is on screen. Used to stop WebGL render loops for
 * canvases the visitor has scrolled past, so two scenes never burn GPU at once.
 * With `once`, it latches true on first sight: for deferring a lazy load.
 */
export function useInView<T extends Element>(rootMargin = '100px', once = false): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      setInView(e.isIntersecting);
      if (once && e.isIntersecting) io.disconnect();
    }, { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, once]);
  return [ref, inView];
}

export function usePrefersReducedMotion(): boolean {
  const query = '(prefers-reduced-motion: reduce)';
  const [reduced, setReduced] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}
