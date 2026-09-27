import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import { liveProjects, timeAgo } from '../../data/live';
import { onProjectPicked, world } from '../../world/store';
import { Decode } from './Section';

const N = liveProjects.length;

/**
 * The gallery: the page scrolls past it normally (nobody is made to sit
 * through every project), and the visitor browses at their own pace — the
 * arrows, the numbered ticks, the arrow keys, a swipe, or clicking a slab in
 * the 3D gallery all move the camera to that project.
 */
export default function Projects() {
  const [index, setIndex] = useState(0);
  const section = useRef<HTMLElement>(null);
  const swipe = useRef<number | null>(null);

  const go = (i: number) => setIndex(((i % N) + N) % N);

  useEffect(() => { world.project = index; }, [index]);
  useEffect(() => onProjectPicked(i => setIndex(i)), []);

  // Arrow keys work while the gallery is on screen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const r = section.current?.getBoundingClientRect();
      if (!r || r.bottom < window.innerHeight * 0.4 || r.top > window.innerHeight * 0.6) return;
      if ((e.target as HTMLElement).closest('input, textarea')) return;
      if (e.key === 'ArrowRight') setIndex(i => (i + 1) % N);
      if (e.key === 'ArrowLeft') setIndex(i => (i - 1 + N) % N);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const p = liveProjects[index];

  return (
    <section id="projects" ref={section} className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col px-4 py-20 sm:px-6 md:py-24">
      <div className="max-w-md">
        <p className="eyebrow mb-3"><Decode text="Selected work · the gallery" /></p>
        <h2 className="font-display text-3xl font-semibold text-white md:text-5xl">
          Tools for systems that <span className="gradient-text">can't guess</span>
        </h2>
      </div>

      <div className="mt-8 grid flex-1 grid-cols-[minmax(0,1fr)] gap-6 lg:mt-0 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        {/* The 3D gallery is framed onto this box. Swipe it on a phone. */}
        <div
          data-anchor="gallery"
          className="stage-3d order-first h-[38svh] touch-pan-y lg:order-last lg:h-auto lg:min-h-[480px]"
          onPointerDown={e => { swipe.current = e.clientX; }}
          onPointerUp={e => {
            if (swipe.current === null) return;
            const dx = e.clientX - swipe.current;
            swipe.current = null;
            if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
          }}
          aria-hidden
        />

        <div className="flex flex-col justify-end">
          <AnimatePresence mode="wait">
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
              className="card relative overflow-hidden p-5 md:p-6"
            >
              <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] text-[var(--faint)]">{String(index + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}</span>
                <span className="font-mono text-[11px] text-[var(--faint)]">{p.subtitle.split(' · ')[1]}</span>
              </div>
              <h3 className="font-display mt-2 text-2xl font-semibold text-white">{p.title.split(/ — | – /)[0]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{p.description}</p>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-display text-2xl font-semibold" style={{ color: p.color }}>{p.metric}</span>
                <span className="text-xs text-[var(--muted)]">{p.metricLabel}</span>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {p.repo && (
                  <a href={p.repo} target="_blank" rel="noreferrer" className="btn btn-ghost !px-4 !py-2">
                    <Github size={15} /> Code
                  </a>
                )}
                {'demo' in p && p.demo && (
                  <a href={p.demo} target="_blank" rel="noreferrer" className="btn btn-primary !px-4 !py-2">
                    Live demo <ArrowUpRight size={15} />
                  </a>
                )}
                {p.live && <span className="ml-auto font-mono text-[11px] text-[var(--faint)]">pushed {timeAgo(p.live.pushedAt)}</span>}
              </div>
            </motion.article>
          </AnimatePresence>

          <div className="mt-4 flex items-center gap-3">
            <button onClick={() => go(index - 1)} aria-label="Previous project" className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full border border-[var(--line-hi)] text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-white">
              <ArrowLeft size={16} />
            </button>
            <div className="flex flex-1 items-center gap-1.5" role="tablist" aria-label="Projects">
              {liveProjects.map((q, i) => (
                <button
                  key={q.id}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={q.title.split(/ — | – /)[0]}
                  title={q.title.split(/ — | – /)[0]}
                  onClick={() => go(i)}
                  className="group flex h-6 flex-1 items-center"
                >
                  <span
                    className="h-[2px] w-full rounded-full transition-all duration-300 group-hover:bg-white/50"
                    style={{ background: i === index ? 'var(--accent)' : 'rgba(255,255,255,0.14)' }}
                  />
                </button>
              ))}
            </div>
            <button onClick={() => go(index + 1)} aria-label="Next project" className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full border border-[var(--line-hi)] text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-white">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
