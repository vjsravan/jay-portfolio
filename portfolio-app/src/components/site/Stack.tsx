import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';
import { certifications } from '../../data/resume';
import { crossCutting, stackLayers } from '../../data/stack';
import { world } from '../../world/store';
import Section, { Reveal } from './Section';

/** Rows top-down (AI first), while the layers are defined bottom-up. */
const ROWS = stackLayers.map((l, k) => ({ ...l, k })).reverse();

export default function Stack() {
  const [active, setActive] = useState(-1);
  const [hovered, setHovered] = useState(-1);
  const rows = useRef<(HTMLLIElement | null)[]>([]);

  // The row crossing the middle of the screen lights its layer, so the stack
  // responds to scrolling on touch screens too, not only to hover.
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.layer));
      }),
      { rootMargin: '-45% 0px -45% 0px' },
    );
    rows.current.forEach(r => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  useEffect(() => { world.activeLayer = active; }, [active]);
  useEffect(() => { world.hoveredLayer = hovered; }, [hovered]);
  const lit = hovered >= 0 ? hovered : active;

  return (
    <Section
      id="skills"
      eyebrow="Stack · the architecture"
      title={<>The stack, <span className="gradient-text">as a system</span></>}
      intro="Not a list of logos: the layers of a real platform, nested like a gyroscope from the cloud it runs on to the AI at its core. Every bead is a tool. Hover a layer, or keep scrolling, and its ring swings round to face you."
    >
      <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* The gyroscope is framed onto this box, which stays put while the layers scroll. */}
        <div className="hidden lg:block" aria-hidden>
          <div data-anchor="stack" className="stage-3d sticky top-[15vh] h-[70vh]" />
        </div>

        <ol className="space-y-3">
          {ROWS.map(layer => {
            const on = lit === layer.k;
            return (
              <li
                key={layer.name}
                ref={el => { rows.current[layer.k] = el; }}
                data-layer={layer.k}
                onMouseEnter={() => setHovered(layer.k)}
                onMouseLeave={() => setHovered(-1)}
              >
                <motion.div
                  animate={{ x: on ? 6 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                  className="card relative overflow-hidden p-5 transition-colors"
                  style={{
                    borderColor: on ? `${layer.color}66` : undefined,
                    boxShadow: on ? `0 0 40px -12px ${layer.color}80, inset 0 0 0 1px ${layer.color}22` : 'none',
                  }}
                >
                  <span
                    className="absolute inset-y-0 left-0 w-[3px] transition-opacity"
                    style={{ background: layer.color, opacity: on ? 1 : 0.35 }}
                  />
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] text-[var(--faint)]">L{layer.k + 1}</span>
                    <h3 className="font-display text-lg font-semibold" style={{ color: on ? layer.color : '#fff' }}>{layer.name}</h3>
                    <span className="ml-auto hidden text-xs text-[var(--faint)] sm:inline">{layer.skills.length} tools</span>
                  </div>
                  <p className="mt-1 text-sm text-[var(--muted)]">{layer.role}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {layer.skills.map((s, i) => (
                      <li
                        key={s}
                        className="chip transition-all duration-300"
                        style={on ? {
                          color: '#fff',
                          borderColor: `${layer.color}55`,
                          background: `${layer.color}14`,
                          transitionDelay: `${i * 18}ms`,
                        } : undefined}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Cross-cutting concerns span every layer, so they span the page. */}
      <Reveal className="card mt-6 grid gap-5 p-5 sm:grid-cols-2 lg:grid-cols-4">
        {crossCutting.map(c => (
          <div key={c.name}>
            <h3 className="mb-2 font-mono text-[11px] uppercase tracking-widest text-[var(--accent)]">↕ {c.name}</h3>
            <ul className="flex flex-wrap gap-1.5">
              {c.skills.map(s => <li key={s} className="chip">{s}</li>)}
            </ul>
          </div>
        ))}
      </Reveal>

      <h3 className="mb-4 mt-14 font-mono text-[11px] uppercase tracking-widest text-[var(--faint)]">
        Certifications · {certifications.length}
      </h3>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => (
          <Reveal key={c.name} delay={(i % 3) * 0.04}>
            <div
              className="card group flex h-full items-start gap-3 p-4 transition duration-300 hover:-translate-y-1"
              style={{ ['--glow' as string]: c.color }}
            >
              {c.badge ? (
                <img src={c.badge} alt="" className="h-10 w-10 flex-shrink-0 rounded-lg" loading="lazy" />
              ) : (
                <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg transition group-hover:scale-110" style={{ background: `${c.color}1f`, color: c.color }}>
                  <BadgeCheck size={18} />
                </span>
              )}
              <div className="min-w-0">
                <p className="text-sm font-medium leading-snug text-white">{c.name}</p>
                <p className="mt-0.5 text-xs text-[var(--faint)]">{c.issuer} · {c.period.replace('Issued ', '')}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
