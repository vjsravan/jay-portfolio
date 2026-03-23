import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experiences } from '../../../data/resume';

// Timings mirror the ECG animation (5 000 ms loop, no repeatDelay)
// Draw-head hits each company at ~0 / 33 / 67 / 99 % of the 5 s cycle
const CYCLE_MS  = 5_000;
const HIT_TIMES = [0, 1_650, 3_350, 4_950];

const ExperiencePanel: React.FC = () => {
  const [selected, setSelected] = useState(experiences[0].id);

  // curr = node currently lit · prev = node that just faded (for the dim trail)
  const [hbState, setHbState] = useState<{ curr: number | null; prev: number | null }>({
    curr: null, prev: null,
  });

  const exp = experiences.find(e => e.id === selected)!;

  // Keep highlight timers in sync with the SVG pathLength loop
  useEffect(() => {
    const ids: ReturnType<typeof setTimeout>[] = [];

    const runCycle = () => {
      HIT_TIMES.forEach((t, i) => {
        ids.push(setTimeout(() => setHbState(s => ({ curr: i, prev: s.curr })), t));
      });
      ids.push(setTimeout(runCycle, CYCLE_MS));
    };

    runCycle();
    return () => ids.forEach(clearTimeout);
  }, []);;

  return (
    <div className="w-full h-full flex flex-col px-8 py-6 overflow-hidden">

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-6"
      >
        <div
          className="w-1.5 h-6 rounded-full"
          style={{ background: '#bd00ff', boxShadow: '0 0 10px #bd00ff' }}
        />
        <h2 className="font-mono font-bold tracking-widest text-sm" style={{ color: '#bd00ff' }}>
          EXPERIENCE ARCHIVE
        </h2>
        <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(189,0,255,0.4), transparent)' }} />
        <span className="font-mono text-[10px]" style={{ color: 'rgba(189,0,255,0.4)' }}>
          {experiences.length} RECORDS FOUND
        </span>
      </motion.div>

      {/* Horizontal timeline selector */}
      <div className="relative mb-6">

        {/* ECG heartbeat — continuous draw-on loop, colour shifts with each company */}
        {(() => {
          const ecgColor = hbState.curr !== null
            ? experiences[hbState.curr].color
            : '#bd00ff';
          return (
            <svg
              width="100%" height="30"
              viewBox="0 0 1000 30"
              preserveAspectRatio="none"
              style={{ position: 'absolute', top: 5, left: 0, overflow: 'visible', zIndex: 5, pointerEvents: 'none' }}
            >
              <defs>
                <filter id="hb-glow" x="-20%" y="-150%" width="140%" height="400%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Dim static baseline */}
              <line x1="0" y1="15" x2="1000" y2="15"
                stroke="rgba(189,0,255,0.15)" strokeWidth="1" />

              {/* ECG — draws itself left-to-right, instantly resets (real monitor cursor wrap),
                  stroke colour transitions smoothly as each company node is touched */}
              <motion.path
                d={[
                  'M0,15 L185,15',
                  'L190,11 L195,15',
                  'L202,15 L205,17 L210,1 L215,29 L220,15',
                  'L226,15 L231,18 L238,9 L244,15',
                  'L465,15',
                  'L470,11 L475,15',
                  'L482,15 L485,17 L490,1 L495,29 L500,15',
                  'L506,15 L511,18 L518,9 L524,15',
                  'L705,15',
                  'L710,11 L715,15',
                  'L722,15 L725,17 L730,1 L735,29 L740,15',
                  'L746,15 L751,18 L758,9 L764,15',
                  'L1000,15',
                ].join(' ')}
                stroke={ecgColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter="url(#hb-glow)"
                animate={{
                  pathLength: [0, 1],
                  stroke: ecgColor,
                }}
                transition={{
                  pathLength: {
                    duration: CYCLE_MS / 1000,
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'linear',
                  },
                  stroke: { duration: 0.5, ease: 'easeOut' },
                }}
              />
            </svg>
          );
        })()}

        <div className="flex justify-between relative z-10">
          {experiences.map((ex, idx) => {
            const isActive  = ex.id === selected;
            const isBeating = hbState.curr === idx;
            const isFading  = hbState.prev === idx && !isBeating; // just passed through
            return (
              <motion.button
                key={ex.id}
                onClick={() => setSelected(ex.id)}
                data-hover
                className="flex flex-col items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Node */}
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-xl relative"
                  animate={{
                    boxShadow: isActive
                      ? `0 0 0 2px ${ex.color}, 0 0 20px ${ex.color}60`
                      : isBeating
                      ? `0 0 0 2px ${ex.color}90, 0 0 30px ${ex.color}65, 0 0 60px ${ex.color}28`
                      : isFading
                      ? `0 0 0 1px ${ex.color}45, 0 0 12px ${ex.color}25`
                      : `0 0 0 1px ${ex.color}30`,
                    background: isActive
                      ? `${ex.color}20`
                      : isBeating
                      ? `${ex.color}22`
                      : isFading
                      ? `${ex.color}08`
                      : 'rgba(0,0,0,0.6)',
                  }}
                  transition={{ duration: 0.55 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="exp-active"
                      className="absolute inset-0 rounded-full"
                      style={{ background: `${ex.color}15`, border: `1px solid ${ex.color}` }}
                    />
                  )}

                  {/* Expanding pulse ring when the ECG draw-head arrives */}
                  {isBeating && !isActive && (
                    <motion.div
                      key={`pulse-${hbState.curr}`}
                      className="absolute inset-0 rounded-full"
                      initial={{ scale: 0.9, opacity: 0.9 }}
                      animate={{ scale: 2.4, opacity: 0 }}
                      transition={{ duration: 1.1, ease: 'easeOut' }}
                      style={{ border: `1.5px solid ${ex.color}` }}
                    />
                  )}

                  <span className="relative z-10">{ex.logo}</span>
                </motion.div>

                {/* Label */}
                <div className="text-center">
                  <motion.div
                    className="font-mono text-[10px] font-semibold tracking-wide"
                    animate={{
                      color: isActive
                        ? ex.color
                        : isBeating
                        ? ex.color
                        : isFading
                        ? `${ex.color}88`
                        : 'rgba(255,255,255,0.3)',
                    }}
                    transition={{ duration: 0.55 }}
                  >
                    {ex.company.split(' ').slice(0, 2).join(' ')}
                  </motion.div>
                  <div className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
                    {ex.period.split('–')[0].trim()}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-hidden flex flex-col gap-4"
        >
          {/* Header */}
          <div
            className="p-4 rounded-xl relative overflow-hidden"
            style={{
              background: `${exp.color}06`,
              border: `1px solid ${exp.color}25`,
            }}
          >
            {/* Top color bar */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: `linear-gradient(90deg, ${exp.color}, transparent)` }}
            />
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {exp.current && (
                    <span
                      className="font-mono text-[10px] px-2 py-0.5 rounded-full"
                      style={{ background: `${exp.color}20`, color: exp.color, border: `1px solid ${exp.color}40` }}
                    >
                      ● CURRENT
                    </span>
                  )}
                  <span className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    {exp.period}
                  </span>
                </div>
                <h3 className="font-bold text-white text-lg leading-tight">{exp.role}</h3>
                <p className="font-mono text-sm mt-0.5" style={{ color: exp.color }}>{exp.company}</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{exp.domain} · {exp.location}</p>
              </div>
            </div>
          </div>

          {/* Content grid */}
          <div className="flex gap-4 flex-1 overflow-hidden">
            {/* Metrics */}
            <div className="flex flex-col gap-2 w-48 flex-shrink-0">
              <div className="font-mono text-[10px] tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
                IMPACT METRICS
              </div>
              {exp.achievements.slice(0, 4).map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="p-2.5 rounded-lg"
                  style={{
                    background: `${exp.color}08`,
                    border: `1px solid ${exp.color}20`,
                  }}
                >
                  <div
                    className="font-mono font-black text-lg leading-none"
                    style={{ color: exp.color, textShadow: `0 0 15px ${exp.color}80` }}
                  >
                    {a.metric}
                  </div>
                  <div className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {a.desc}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Highlights + Tech */}
            <div className="flex-1 overflow-y-auto nx-scroll flex flex-col gap-3">
              {/* Highlights */}
              <div>
                <div className="font-mono text-[10px] tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  KEY HIGHLIGHTS
                </div>
                <div className="space-y-1.5">
                  {exp.highlights.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex gap-2 text-xs"
                      style={{ color: 'rgba(255,255,255,0.7)' }}
                    >
                      <span style={{ color: exp.color, flexShrink: 0 }}>▸</span>
                      {h}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* AI Work (if any) */}
              {exp.aiWork && exp.aiWork.length > 0 && (
                <div
                  className="p-3 rounded-lg"
                  style={{ background: 'rgba(189,0,255,0.06)', border: '1px solid rgba(189,0,255,0.2)' }}
                >
                  <div className="font-mono text-[10px] tracking-widest mb-2" style={{ color: '#bd00ff' }}>
                    ⬡ AI / LLM WORK
                  </div>
                  <div className="space-y-1">
                    {exp.aiWork.map((a, i) => (
                      <div key={i} className="flex gap-2 text-[11px]" style={{ color: 'rgba(189,0,255,0.8)' }}>
                        <span style={{ flexShrink: 0 }}>◈</span>
                        {a}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech stack */}
              <div>
                <div className="font-mono text-[10px] tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  TECH STACK
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] px-2 py-0.5 rounded"
                      style={{
                        background: `${exp.color}10`,
                        border: `1px solid ${exp.color}25`,
                        color: exp.color,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ExperiencePanel;

