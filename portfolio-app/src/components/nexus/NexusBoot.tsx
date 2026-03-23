import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LINES = [
  { text: '► NEXUS PROTOCOL v2.0 — INITIALIZING...', color: '#00d4ff' },
  { text: '► Scanning neural signature matrix...', color: 'rgba(0,212,255,0.55)' },
  { text: '► Authenticating clearance level ALPHA...', color: 'rgba(0,212,255,0.55)' },
  { text: '► SUBJECT IDENTIFIED: JAY SRAVAN VADLAMUDI', color: '#00d4ff' },
  { text: '► Mapping 9+ years of operational data...', color: 'rgba(0,212,255,0.55)' },
  { text: '► AI MODULE DETECTED — integrating LLM layer...', color: '#bd00ff' },
  { text: '► AWS Certification: ████████████ VERIFIED ✓', color: '#00ff88' },
  { text: '► Current status: OPEN TO OPPORTUNITIES ✓', color: '#00ff88' },
  { text: '■ ALL SYSTEMS NOMINAL. INITIATING INTERFACE.', color: '#00d4ff' },
];

interface Props {
  onComplete: () => void;
}

const NexusBoot: React.FC<Props> = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'lines' | 'progress' | 'flash' | 'done'>('lines');
  const [showFlash, setShowFlash] = useState(false);

  // Phase 1: show lines
  useEffect(() => {
    let idx = 0;
    const t = setInterval(() => {
      idx++;
      setVisibleLines(idx);
      if (idx >= BOOT_LINES.length) {
        clearInterval(t);
        setTimeout(() => setPhase('progress'), 300);
      }
    }, 210);
    return () => clearInterval(t);
  }, []);

  // Phase 2: progress bar
  useEffect(() => {
    if (phase !== 'progress') return;
    let p = 0;
    const t = setInterval(() => {
      p += 2.5;
      setProgress(Math.min(p, 100));
      if (p >= 100) {
        clearInterval(t);
        setTimeout(() => {
          setShowFlash(true);
          setPhase('flash');
        }, 200);
      }
    }, 20);
    return () => clearInterval(t);
  }, [phase]);

  // Phase 3: flash → done
  useEffect(() => {
    if (phase === 'flash') {
      setTimeout(onComplete, 1500);
    }
  }, [phase, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#000000' }}
      animate={phase === 'flash' ? { opacity: 0 } : {}}
      transition={{ duration: 0.7, delay: 1 }}
    >
      {/* Scanlines */}
      <div className="nx-scanlines absolute inset-0 pointer-events-none z-10" />

      {/* Corner brackets */}
      {(['tl','tr','bl','br'] as const).map((pos) => (
        <motion.div
          key={pos}
          className="absolute w-10 h-10"
          style={{
            top:    pos.startsWith('t') ? 20 : undefined,
            bottom: pos.startsWith('b') ? 20 : undefined,
            left:   pos.endsWith('l')   ? 20 : undefined,
            right:  pos.endsWith('r')   ? 20 : undefined,
            borderTop:    pos.startsWith('t') ? '2px solid rgba(0,212,255,0.5)' : undefined,
            borderBottom: pos.startsWith('b') ? '2px solid rgba(0,212,255,0.5)' : undefined,
            borderLeft:   pos.endsWith('l')   ? '2px solid rgba(0,212,255,0.5)' : undefined,
            borderRight:  pos.endsWith('r')   ? '2px solid rgba(0,212,255,0.5)' : undefined,
          }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        />
      ))}

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1
          className="font-mono font-black tracking-[0.3em] nx-flicker"
          style={{
            fontSize: '2.6rem',
            color: '#00d4ff',
            textShadow: '0 0 30px #00d4ff, 0 0 70px rgba(0,212,255,0.4)',
          }}
        >
          NEXUS PROTOCOL
        </h1>
        <p
          className="font-mono text-[11px] tracking-[0.4em] mt-2"
          style={{ color: 'rgba(0,212,255,0.35)' }}
        >
          VADLAMUDI INTELLIGENCE SYSTEM · v2.0.26
        </p>
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 h-px mx-auto"
          style={{ width: 340, background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)' }}
        />
      </motion.div>

      {/* Boot log */}
      <div className="w-[540px] font-mono text-[13px] space-y-[6px] mb-8">
        {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.12 }}
            style={{ color: i < visibleLines - 1 ? 'rgba(0,212,255,0.38)' : line.color }}
          >
            {line.text}
            {i === visibleLines - 1 && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.7 }}
                style={{ color: '#00d4ff' }}
              >
                {' '}▌
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <AnimatePresence>
        {phase !== 'lines' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-[540px]"
          >
            <div
              className="flex justify-between text-[11px] font-mono mb-2"
              style={{ color: 'rgba(0,212,255,0.4)' }}
            >
              <span>LOADING PROFILE MATRIX</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div
              className="h-[3px] rounded-full overflow-hidden"
              style={{ background: 'rgba(0,212,255,0.1)' }}
            >
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #00d4ff, #bd00ff, #ff006e)',
                  boxShadow: '0 0 12px #00d4ff',
                  transitionDuration: '0.03s',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NEXUS ONLINE flash */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.4, times: [0, 0.15, 0.7, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20"
            style={{ background: 'rgba(0,0,0,0.95)' }}
          >
            <motion.h2
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="font-mono font-black tracking-[0.18em]"
              style={{
                fontSize: '5.5rem',
                color: '#00d4ff',
                textShadow: '0 0 40px #00d4ff, 0 0 100px #00d4ff, 0 0 200px rgba(0,212,255,0.4)',
              }}
            >
              NEXUS ONLINE
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-mono text-sm mt-4 tracking-widest"
              style={{ color: '#00ff88', textShadow: '0 0 12px #00ff88' }}
            >
              ACCESS GRANTED · CLEARANCE LEVEL: ALPHA
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NexusBoot;

