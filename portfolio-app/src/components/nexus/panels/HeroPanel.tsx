import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo, metrics } from '../../../data/resume';
import { useIsMobile } from '../../../hooks/useIsMobile';

// ── Count-up hook ──────────────────────────────────────────────
function useCountUp(target: number, duration = 1300) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(prog * target));
      if (prog < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [target, duration]);
  return val;
}

// ── Starfield — generated once, rendered with CSS animations ──
// Using CSS custom property --so (star opacity) inside @keyframes
// so each star retains its own brightness. Zero Framer Motion = zero JS overhead.
interface Star {
  id: number; x: number; y: number; size: number;
  opacity: number; duration: number; delay: number;
  color: string; glow: boolean;
}
const STARS: Star[] = Array.from({ length: 160 }, (_, i) => {
  const r   = Math.random();
  const tier = i < 16 ? 'bright' : i < 50 ? 'medium' : 'dim';
  const colorRoll = Math.random();
  const color =
    colorRoll > 0.90 ? '#00d4ff' :
    colorRoll > 0.82 ? '#c8b0ff' :
    colorRoll > 0.74 ? '#ffd8a8' :
    colorRoll > 0.66 ? '#b8d8ff' :
                       '#ffffff';
  return {
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size:    tier === 'bright' ? r * 1.8 + 2.2 : tier === 'medium' ? r * 1.2 + 1.0 : r * 0.9 + 0.3,
    opacity: tier === 'bright' ? r * 0.35 + 0.55 : tier === 'medium' ? r * 0.28 + 0.22 : r * 0.22 + 0.07,
    duration: Math.random() * 3.5 + 2,
    delay:    Math.random() * 8,
    color,
    glow: tier === 'bright',
  };
});

// ── Metric card ───────────────────────────────────────────────
const METRIC_COLORS: Record<string, string> = {
  cyan: '#00d4ff', purple: '#bd00ff', green: '#00ff88', orange: '#ff6b00',
};

const MetricCard: React.FC<{ value: number; suffix: string; label: string; color: string; delay: number }> = ({
  value, suffix, label, color, delay,
}) => {
  const count = useCountUp(value, 1200);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45 }}
      className="flex flex-col items-center px-4 py-3 rounded-xl relative overflow-hidden"
      style={{ background: `${color}0d`, border: `1px solid ${color}30`, minWidth: 100 }}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
      <span className="font-mono font-black" style={{ fontSize: '1.9rem', color, textShadow: `0 0 16px ${color}90` }}>
        {count}{suffix}
      </span>
      <span className="text-[10px] font-mono mt-0.5 text-center"
        style={{ color: 'rgba(255,255,255,0.38)', letterSpacing: '0.04em' }}>
        {label}
      </span>
    </motion.div>
  );
};

// ── Orbit rings (Apache Camel 🐪 added to ring 3) ─────────────
interface TechBadge { icon: string; label: string; color: string; isText?: boolean; }
interface OrbitRing  { radius: number; duration: number; ringColor: string; dashed: boolean; symbols: TechBadge[]; }

const ORBIT_RINGS: OrbitRing[] = [
  {
    radius: 92, duration: 9, ringColor: 'rgba(0,212,255,0.45)', dashed: false,
    symbols: [
      { icon: '☕', label: 'Java',   color: '#f59e0b' },
      { icon: '🍃', label: 'Spring', color: '#00ff88' },
    ],
  },
  {
    radius: 172, duration: 16, ringColor: 'rgba(189,0,255,0.33)', dashed: true,
    symbols: [
      { icon: '⚛️', label: 'React',      color: '#00d4ff' },
      { icon: '🅰',  label: 'Angular',    color: '#ff006e' },
      { icon: 'TS',  label: 'TypeScript', color: '#4499ff', isText: true },
    ],
  },
  {
    radius: 258, duration: 24, ringColor: 'rgba(0,212,255,0.19)', dashed: false,
    symbols: [
      { icon: '☁️', label: 'AWS',    color: '#f59e0b' },
      { icon: '🐳', label: 'Docker', color: '#00d4ff' },
      { icon: '🐙', label: 'GitHub', color: '#e2e8f0' },
      { icon: '🐪', label: 'Camel',  color: '#ff8c00' },   // ← Apache Camel
      { icon: '⚡', label: 'Kafka',  color: '#ff6b00' },
    ],
  },
  {
    radius: 344, duration: 35, ringColor: 'rgba(255,0,110,0.16)', dashed: true,
    symbols: [
      { icon: '🤖', label: 'AI/LLM',    color: '#ff006e' },
      { icon: '🔶', label: 'OpenShift', color: '#bd00ff' },
      { icon: '🐘', label: 'Postgres',  color: '#4499ff' },
      { icon: '🍀', label: 'MongoDB',   color: '#00ff88' },
      { icon: '🐍', label: 'Python',    color: '#ffd700' },
    ],
  },
];

// ── Orbiting badge — will-change:transform for GPU compositing ─
const OrbitingBadge: React.FC<{
  badge: TechBadge; radius: number; duration: number; startAngle: number;
}> = ({ badge, radius, duration, startAngle }) => (
  <motion.div
    style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0, rotate: startAngle, willChange: 'transform' }}
    animate={{ rotate: startAngle + 360 }}
    transition={{ duration, repeat: Infinity, ease: 'linear' }}
  >
    <motion.div
      style={{ position: 'absolute', top: -radius, x: '-50%', rotate: -startAngle, willChange: 'transform' }}
      animate={{ rotate: -(startAngle + 360) }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
        style={{
          background: `${badge.color}18`,
          border: `1px solid ${badge.color}55`,
          boxShadow: `0 0 12px ${badge.color}30, 0 0 24px ${badge.color}10`,
          backdropFilter: 'blur(12px)',
          whiteSpace: 'nowrap',
        }}
      >
        {badge.isText
          ? <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: badge.color, fontWeight: 800, lineHeight: 1 }}>{badge.icon}</span>
          : <span style={{ fontSize: 13, lineHeight: 1 }}>{badge.icon}</span>
        }
        <span style={{ fontSize: 9, fontFamily: 'JetBrains Mono, monospace', color: badge.color, letterSpacing: '0.05em', fontWeight: 600 }}>
          {badge.label}
        </span>
      </div>
    </motion.div>
  </motion.div>
);

// ── Main Hero Panel ───────────────────────────────────────────
const HeroPanel: React.FC = () => {
  const [typed, setTyped]       = useState('');
  const [ready, setReady]       = useState(false);
  const isMobile                = useIsMobile();
  const fullTitle = `${personalInfo.title}  ·  ${personalInfo.subtitle}`;

  useEffect(() => {
    // One rAF gives the browser time to flush the initial paint
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!ready) return;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(fullTitle.slice(0, i));
      if (i >= fullTitle.length) clearInterval(t);
    }, 42);
    return () => clearInterval(t);
  }, [ready]);

  return (
    <div className="w-full h-full relative overflow-hidden">

      {/* ══ LAYER 0 — Starfield (pure CSS, zero JS overhead) ════ */}
      {ready && (
        <div
          className="absolute inset-0"
          style={{ zIndex: 0, contain: 'layout style paint' }}
        >
          {STARS.map(star => (
            <div
              key={star.id}
              style={{
                position: 'absolute',
                left:   `${star.x}%`,
                top:    `${star.y}%`,
                width:   star.size,
                height:  star.size,
                borderRadius: '50%',
                background: star.color,
                boxShadow: star.glow
                  ? `0 0 ${star.size * 3}px ${star.color}, 0 0 ${star.size * 6}px ${star.color}55`
                  : 'none',
                // CSS custom property drives the keyframe opacity
                ['--so' as string]: star.opacity,
                animationName:            'nx-star-twinkle',
                animationDuration:        `${star.duration}s`,
                animationDelay:           `${star.delay}s`,
                animationTimingFunction:  'ease-in-out',
                animationIterationCount:  'infinite',
                animationFillMode:        'both',
              } as React.CSSProperties}
            />
          ))}

          {/* Nebula blobs */}
          <div style={{ position: 'absolute', top: '50%', left: '36%', transform: 'translate(-50%,-50%)', width: 600, height: 500, background: 'radial-gradient(ellipse, rgba(0,212,255,0.05) 0%, transparent 68%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '30%', left: '18%', width: 380, height: 300, background: 'radial-gradient(ellipse, rgba(189,0,255,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '70%', left: '60%', width: 320, height: 250, background: 'radial-gradient(ellipse, rgba(255,0,110,0.035) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '20%', left: '70%', width: 280, height: 220, background: 'radial-gradient(ellipse, rgba(0,212,255,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />
        </div>
      )}

      {/* ══ LAYER 1 — Solar system (desktop only) ═══════ */}
      {ready && !isMobile && (
      <div
        style={{
          position: 'absolute',
          left: '36%', top: '52%',
          transform: 'translate(-50%, -50%)',
          width: 760, height: 760,
          zIndex: 1, pointerEvents: 'none',
        }}
      >
        {/* Ring circles */}
        {ORBIT_RINGS.map(ring => (
          <div key={ring.radius} style={{
            position: 'absolute',
            width: ring.radius * 2, height: ring.radius * 2,
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            border: `1px ${ring.dashed ? 'dashed' : 'solid'} ${ring.ringColor}`,
          }} />
        ))}

        {/* Orbiting badges */}
        {ORBIT_RINGS.map(ring =>
          ring.symbols.map((badge, i) => (
            <OrbitingBadge
              key={`${ring.radius}-${badge.label}`}
              badge={badge}
              radius={ring.radius}
              duration={ring.duration}
              startAngle={(i / ring.symbols.length) * 360}
            />
          ))
        )}

        {/* JSV Arc-reactor core */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 6 }}>
          {[0, 1, 2, 3].map(n => (
            <motion.div key={n} style={{
              position: 'absolute', borderRadius: '50%',
              top: '50%', left: '50%',
              border: '1px solid rgba(0,212,255,0.5)',
            }}
              animate={{ width: [70, 70 + n * 36], height: [70, 70 + n * 36], opacity: [0.6, 0], x: '-50%', y: '-50%' }}
              transition={{ duration: 2.6, repeat: Infinity, delay: n * 0.65, ease: 'easeOut' }}
            />
          ))}
          <div className="nx-flicker" style={{
            width: 84, height: 84, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'JetBrains Mono, monospace', fontWeight: 900, fontSize: '1.05rem',
            color: '#00d4ff', position: 'relative', zIndex: 7,
            background: 'radial-gradient(circle, rgba(0,212,255,0.32) 0%, rgba(0,0,0,0.72) 100%)',
            border: '2px solid rgba(0,212,255,0.8)',
            textShadow: '0 0 18px #00d4ff',
            boxShadow: '0 0 35px rgba(0,212,255,0.55), 0 0 90px rgba(0,212,255,0.2), inset 0 0 28px rgba(0,212,255,0.14)',
          }}>
            JSV
          </div>
        </div>
      </div>
      )}

      {/* ══ LAYER 2 — Content ═════════ */}
      {isMobile ? (
        /* ── MOBILE: centered full-width stack ── */
        <div
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', gap: '0.6rem',
            padding: '1rem 1.25rem',
            zIndex: 10,
            overflowY: 'auto',
            background: 'rgba(0,0,0,0.72)',
          }}
        >
          {/* Mini JSV core */}
          <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            {[0, 1].map(n => (
              <motion.div key={n} style={{
                position: 'absolute', borderRadius: '50%',
                top: '50%', left: '50%',
                border: '1px solid rgba(0,212,255,0.5)',
              }}
                animate={{ width: [50, 50 + n * 28], height: [50, 50 + n * 28], opacity: [0.6, 0], x: '-50%', y: '-50%' }}
                transition={{ duration: 2.6, repeat: Infinity, delay: n * 0.65, ease: 'easeOut' }}
              />
            ))}
            <div className="nx-flicker" style={{
              width: 60, height: 60, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'JetBrains Mono, monospace', fontWeight: 900, fontSize: '0.8rem',
              color: '#00d4ff', position: 'relative',
              background: 'radial-gradient(circle, rgba(0,212,255,0.32) 0%, rgba(0,0,0,0.72) 100%)',
              border: '2px solid rgba(0,212,255,0.8)',
              textShadow: '0 0 14px #00d4ff',
              boxShadow: '0 0 28px rgba(0,212,255,0.5), inset 0 0 18px rgba(0,212,255,0.1)',
            }}>
              JSV
            </div>
          </motion.div>

          {/* Name */}
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
            style={{ textAlign: 'center', lineHeight: 1.05 }}>
            <div className="font-black nx-flicker" style={{ fontSize: '2.1rem', color: '#00d4ff', textShadow: '0 0 20px rgba(0,212,255,0.6)', fontFamily: 'Inter, sans-serif' }}>
              JAY SRAVAN
            </div>
            <div className="font-black" style={{ fontSize: '2.1rem', color: 'rgba(255,255,255,0.94)', fontFamily: 'Inter, sans-serif' }}>
              VADLAMUDI
            </div>
          </motion.div>

          {/* Typewriter */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
            className="font-mono text-[11px] text-center" style={{ color: 'rgba(0,212,255,0.72)', letterSpacing: '0.06em', minHeight: '1.4em' }}>
            {typed}
            <span className="inline-block w-0.5 h-3.5 ml-0.5 align-middle"
              style={{ background: '#00d4ff', animation: 'nx-flicker 1s step-end infinite' }} />
          </motion.div>

          {/* Location */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
            className="font-mono text-[10px] text-center" style={{ color: 'rgba(255,255,255,0.26)', letterSpacing: '0.08em' }}>
            ◈ {personalInfo.location} · Remote / Hybrid
          </motion.p>

          {/* Divider */}
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 0.5 }}
            style={{ height: 1, width: '80%', background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)' }} />

          {/* Metrics 2×2 grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', width: '100%', maxWidth: 320 }}>
            {metrics.map((m, i) => (
              <MetricCard key={m.label} value={m.value} suffix={m.suffix} label={m.label}
                color={METRIC_COLORS[m.color] ?? '#00d4ff'} delay={0.6 + i * 0.08} />
            ))}
          </div>

          {/* CTA buttons */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', maxWidth: 320 }}>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('nexus-navigate', { detail: 'contact' }))}
              className="font-mono text-xs py-2.5 rounded-lg active:scale-95"
              style={{ background: 'rgba(255,0,110,0.12)', border: '1px solid rgba(255,0,110,0.55)', color: '#ff006e', letterSpacing: '0.1em' }}>
              ► INITIATE CONTACT
            </button>
            <a href="https://www.linkedin.com/in/jaysravan-fullstack/" target="_blank" rel="noopener noreferrer"
              className="font-mono text-xs py-2.5 rounded-lg text-center active:scale-95"
              style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.35)', color: '#00d4ff', letterSpacing: '0.1em' }}>
              ◈ LINKEDIN PROFILE
            </a>
          </motion.div>

          {/* Open-to-work */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            className="flex items-center gap-2 font-mono text-[9px] text-center" style={{ color: '#00ff88' }}>
            <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: '#00ff88', boxShadow: '0 0 6px #00ff88' }} />
            OPEN TO OPPORTUNITIES · Senior Engineering · AI
          </motion.div>
        </div>
      ) : (
        /* ── DESKTOP: original right-side layout ── */
        <div
          style={{
            position: 'absolute',
            right: 0, top: '50%',
            transform: 'translateY(-50%)',
            width: '48%',
            padding: '2rem 3rem 2rem 1rem',
            zIndex: 10,
            display: 'flex', flexDirection: 'column', gap: '1rem',
            background: 'linear-gradient(to left, rgba(0,0,0,0.92) 45%, rgba(0,0,0,0.68) 72%, transparent 100%)',
          }}
        >
        {/* Name — chromatic aberration effect */}
        <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <div className="relative" style={{ lineHeight: 1.05 }}>
            <div className="absolute font-black" style={{ fontSize: '3.4rem', color: '#ff006e', opacity: 0.2, transform: 'translateX(-3px)', top: 0, left: 0, whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif' }}>JAY SRAVAN</div>
            <div className="absolute font-black" style={{ fontSize: '3.4rem', color: '#bd00ff', opacity: 0.2, transform: 'translateX(3px)', top: 0, left: 0, whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif' }}>JAY SRAVAN</div>
            <div className="relative font-black nx-flicker" style={{ fontSize: '3.4rem', color: '#00d4ff', textShadow: '0 0 28px rgba(0,212,255,0.65)', whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif' }}>JAY SRAVAN</div>
          </div>
          <div className="font-black" style={{ fontSize: '3.4rem', color: 'rgba(255,255,255,0.94)', textShadow: '0 0 16px rgba(255,255,255,0.15)', lineHeight: 1, whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif' }}>
            VADLAMUDI
          </div>
        </motion.div>

        {/* Typewriter subtitle */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
          className="font-mono text-sm" style={{ color: 'rgba(0,212,255,0.72)', letterSpacing: '0.08em', minHeight: '1.5em' }}>
          {typed}
          <span className="inline-block w-0.5 h-4 ml-0.5 align-middle"
            style={{ background: '#00d4ff', animation: 'nx-flicker 1s step-end infinite' }} />
        </motion.div>

        {/* Location */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.26)', letterSpacing: '0.1em' }}>
          ◈ {personalInfo.location} · Available Remote / Hybrid
        </motion.p>

        {/* Divider */}
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.7, duration: 0.65 }}
          className="h-px origin-left" style={{ background: 'linear-gradient(90deg, rgba(0,212,255,0.5), transparent)' }} />

        {/* Metrics */}
        <div className="flex gap-2.5 flex-wrap">
          {metrics.map((m, i) => (
            <MetricCard key={m.label} value={m.value} suffix={m.suffix} label={m.label}
              color={METRIC_COLORS[m.color] ?? '#00d4ff'} delay={0.8 + i * 0.1} />
          ))}
        </div>

        {/* CTA buttons */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25 }}
          className="flex gap-3">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('nexus-navigate', { detail: 'contact' }))}
            className="font-mono text-xs px-5 py-2.5 rounded-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
            style={{ background: 'rgba(255,0,110,0.12)', border: '1px solid rgba(255,0,110,0.55)', color: '#ff006e', letterSpacing: '0.1em', boxShadow: '0 0 14px rgba(255,0,110,0.15)' }}>
            ► INITIATE CONTACT
          </button>
          <a href="https://www.linkedin.com/in/jaysravan-fullstack/" target="_blank" rel="noopener noreferrer"
            className="font-mono text-xs px-5 py-2.5 rounded-lg transition-all hover:scale-105 active:scale-95"
            style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.35)', color: '#00d4ff', letterSpacing: '0.1em', boxShadow: '0 0 14px rgba(0,212,255,0.1)' }}>
            ◈ LINKEDIN PROFILE
          </a>
        </motion.div>

        {/* Open-to-work */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="flex items-center gap-2 font-mono text-[10px]" style={{ color: '#00ff88' }}>
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#00ff88', boxShadow: '0 0 6px #00ff88' }}
          />
          OPEN TO OPPORTUNITIES · Senior Engineering · AI Projects
        </motion.div>
      </div>
      )} {/* end mobile ? ... : desktop */}
    </div>
  );
};

export default HeroPanel;

