import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/useInView';

export default function Section({ id, eyebrow, title, intro, children }: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 md:py-28">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="mb-10 max-w-2xl md:mb-14"
      >
        <p className="eyebrow mb-3"><Decode text={eyebrow} /></p>
        <h2 className="font-display text-3xl font-semibold text-white md:text-5xl">{title}</h2>
        {intro && <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">{intro}</p>}
      </motion.header>
      {children}
    </section>
  );
}

const GLYPHS = '01<>/{}[]#*+=_-アイウエオカキクケコ';

/** Text that decodes from noise into place the first time it scrolls into view. */
export function Decode({ text }: { text: string }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(text.replace(/\S/g, ' '));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      if (reduced) { setShown(text); return; }
      const start = performance.now();
      const tick = (now: number) => {
        const done = Math.min(text.length, Math.floor((now - start) / 28));
        setShown(
          text.slice(0, done) +
          text.slice(done).replace(/\S/g, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]),
        );
        if (done < text.length) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [text, reduced]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden>{shown}</span>
    </>
  );
}

/** Fade-and-rise on first scroll into view. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}
