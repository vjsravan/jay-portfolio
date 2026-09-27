import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { education, experiences, yearsLabel } from '../../data/resume';
import Section, { Reveal } from './Section';

export default function Experience() {
  const [open, setOpen] = useState<number | null>(experiences[0]?.id ?? null);

  return (
    <Section
      id="experience"
      eyebrow="Experience · the path"
      title={<>{yearsLabel} years keeping <span className="gradient-text">high-volume systems honest</span></>}
      intro="Customs and regulatory platforms at UPS, automotive finance at Mercedes-Benz. Scroll to walk the path: a gate for each role, oldest first, ending at now."
    >
      <div className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          {experiences.map((e, i) => {
            const isOpen = open === e.id;
            return (
              <Reveal key={e.id} delay={i * 0.06}>
                <article className="card overflow-hidden" style={{ borderLeft: `2px solid ${e.color}` }}>
                  <button
                    onClick={() => setOpen(isOpen ? null : e.id)}
                    aria-expanded={isOpen}
                    className="flex w-full flex-wrap items-start gap-x-6 gap-y-2 p-5 text-left md:p-6"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[11px] text-[var(--faint)]">
                        {e.period} · {e.location}
                        {e.current && <span className="ml-2 rounded-full bg-[rgba(74,222,128,0.12)] px-2 py-0.5 text-[var(--green)]">current</span>}
                      </p>
                      <h3 className="font-display mt-1.5 text-xl font-semibold text-white md:text-2xl">{e.company}</h3>
                      <p className="mt-0.5 text-sm text-[var(--muted)]">{e.role} · {e.domain}</p>
                    </div>
                    <ChevronDown size={20} className="mt-2 text-[var(--faint)] transition-transform" style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }} />
                    <div className="grid w-full grid-cols-2 gap-3 pt-3 sm:grid-cols-4">
                      {e.achievements.slice(0, 4).map(a => (
                        <div key={a.desc}>
                          <p className="font-display text-xl font-semibold" style={{ color: e.color }}>{a.metric}</p>
                          <p className="text-[11px] leading-snug text-[var(--faint)]">{a.desc}</p>
                        </div>
                      ))}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-[var(--line)] px-5 pb-6 pt-5 md:px-6">
                          <ul className="space-y-2.5">
                            {e.highlights.map(h => (
                              <li key={h} className="flex gap-3 text-sm leading-relaxed text-[var(--muted)]">
                                <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full" style={{ background: e.color }} />
                                {h}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-5 flex flex-wrap gap-1.5">
                            {e.tech.map(t => <span key={t} className="chip">{t}</span>)}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              </Reveal>
            );
          })}

          <div className="grid gap-4 pt-4 md:grid-cols-2">
            {education.map(ed => (
              <Reveal key={ed.degree} className="card p-5">
                <p className="font-mono text-[11px] text-[var(--faint)]">{ed.period}</p>
                <h3 className="mt-1.5 text-base font-medium text-white">{ed.degree}</h3>
                <p className="text-sm text-[var(--muted)]">{ed.school} · {ed.location}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Left open: the camera walks the path through the gates here. */}
        <div className="hidden lg:block" aria-hidden />
      </div>
    </Section>
  );
}
