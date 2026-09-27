import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Sparkles } from 'lucide-react';
import { metrics, personalInfo, yearsLabel } from '../../data/resume';
import { syncedAt, timeAgo } from '../../data/live';
import { openAssistant } from '../../lib/actions';

const PORTRAIT = `${import.meta.env.BASE_URL}portrait.webp`;

/**
 * The portrait stands in front of the world's portal, with the name set large
 * behind it. Scrolling lets the portrait sink and fade while the camera
 * pushes through the portal into the rest of the site.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const portraitOpacity = useTransform(scrollYProgress, [0.08, 0.34], [1, 0]);
  const nameY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

  return (
    <section id="top" ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden">
      {/* Name, large and behind the portrait */}
      <motion.h1
        style={{ y: nameY }}
        className="font-display pointer-events-none absolute inset-x-0 top-[13vh] z-[1] mx-auto max-w-6xl px-4 text-[clamp(3.2rem,10vw,8.6rem)] font-semibold leading-[0.88] text-white sm:px-6 md:top-[14vh]"
      >
        <span className="block">Jay Sravan</span>
        <span className="block text-white/90 md:pl-[8vw]">Vadla<span className="gradient-text">mudi</span></span>
      </motion.h1>

      {/* Portrait, in front of the name. Positioning and the scroll animation
          live on separate elements: both are transforms, and one would
          overwrite the other. */}
      <div className="pointer-events-none absolute bottom-[31svh] left-1/2 z-[2] h-[42svh] -translate-x-1/2 md:bottom-0 md:left-auto md:right-[max(0rem,calc(50%-38rem))] md:h-[76svh] md:translate-x-0">
        <motion.div style={{ y: portraitY, opacity: portraitOpacity }} className="relative h-full">
          {/* The portal ring is framed onto this box: centred on the head and shoulders. */}
          <div data-anchor="portal" className="absolute left-1/2 top-[40%] aspect-square h-[74%] -translate-x-1/2 -translate-y-1/2" aria-hidden />
          <motion.img
            src={PORTRAIT}
            alt={`Portrait of ${personalInfo.name}`}
            className="portrait h-full w-auto max-w-none"
            fetchPriority="high"
            // Visible from the first frame (it's the page's main image); only a
            // slow settle in scale, so it still arrives with some motion.
            initial={{ scale: 1.04 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1] }}
          />
        </motion.div>
      </div>

      {/* Copy and actions */}
      <div className="relative z-[3] mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-10 sm:px-6 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-md rounded-2xl bg-[rgba(7,7,10,0.55)] p-1 backdrop-blur-[2px] md:bg-transparent md:p-0 md:backdrop-blur-0"
        >
          <a href="#live" className="chip mb-5 gap-2 hover:border-[var(--line-hi)]">
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-[var(--green)]" />
            {syncedAt ? `Rebuilt itself ${timeAgo(syncedAt.toISOString())}` : 'Live from GitHub & Medium'} · open to senior roles
          </a>
          <p className="text-base font-light leading-relaxed text-[var(--muted)] md:text-xl">
            {personalInfo.title} building the <span className="text-white">reliability layer for AI</span> and
            distributed systems. {yearsLabel} years of event-driven Java at UPS and Mercedes-Benz.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button onClick={() => openAssistant()} className="btn btn-primary">
              <Sparkles size={16} /> Ask my AI anything
            </button>
            <a href="#projects" className="btn btn-ghost">
              Walk through the work <ArrowDown size={16} />
            </a>
            <a href={personalInfo.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-full p-2.5 text-[var(--muted)] transition hover:bg-[var(--surface-hi)] hover:text-white">
              <Github size={18} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-full p-2.5 text-[var(--muted)] transition hover:bg-[var(--surface-hi)] hover:text-white">
              <Linkedin size={18} />
            </a>
          </div>
          <div className="mt-9 hidden max-w-md grid-cols-4 gap-4 border-t border-[var(--line)] pt-5 md:grid">
            {metrics.map(m => (
              <div key={m.label}>
                <p className="font-display text-2xl font-semibold text-white">
                  {m.value}<span className="text-[var(--accent)]">{m.suffix}</span>
                </p>
                <p className="mt-1 text-[11px] leading-tight text-[var(--faint)]">{m.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
