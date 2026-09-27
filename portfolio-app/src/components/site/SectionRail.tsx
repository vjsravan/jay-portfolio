import { useEffect, useState } from 'react';
import { CHAPTERS } from '../../world/store';

const LABELS: Record<string, string> = {
  top: 'Intro', projects: 'Projects', live: 'Live', experience: 'Experience',
  writing: 'Writing', skills: 'Stack', contact: 'Contact',
};

/**
 * A depth gauge down the right edge: one node per section, named after the
 * part of the world the camera is walking through. Doubles as navigation.
 */
export default function SectionRail() {
  const [active, setActive] = useState('top');

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-50% 0px -50% 0px' },
    );
    CHAPTERS.forEach(s => { const el = document.getElementById(s.section); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="Sections" className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 xl:block">
      <ol className="relative flex flex-col gap-4 before:absolute before:bottom-1 before:right-[4px] before:top-1 before:w-px before:bg-[var(--line)]">
        {CHAPTERS.map(s => {
          const on = s.section === active;
          return (
            <li key={s.section}>
              <a href={`#${s.section}`} className="group flex items-center justify-end gap-3" aria-current={on ? 'true' : undefined}>
                <span
                  className="text-right font-mono text-[10px] uppercase tracking-widest transition-all duration-300"
                  style={{ opacity: on ? 1 : 0, transform: on ? 'none' : 'translateX(6px)', color: 'var(--accent)' }}
                >
                  {LABELS[s.section]} <span className="text-[var(--faint)]">/ {s.name}</span>
                </span>
                <span className="sr-only">{LABELS[s.section]}</span>
                <span
                  className="relative h-[9px] w-[9px] rounded-full border transition-all duration-300 group-hover:scale-125"
                  style={{
                    borderColor: on ? 'var(--accent)' : 'var(--line-hi)',
                    background: on ? 'var(--accent)' : 'var(--bg)',
                    boxShadow: on ? '0 0 12px var(--accent)' : 'none',
                  }}
                />
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
