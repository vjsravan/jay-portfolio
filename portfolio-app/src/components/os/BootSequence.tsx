import React, { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const BOOT_LINES = [
  { text: 'NEXUS OS v2.0.26 — Booting system kernel...', color: '#06b6d4' },
  { text: '[  OK  ] Initializing memory management', color: '#10b981' },
  { text: '[  OK  ] Mounting profile: jay.sravan.vadlamudi', color: '#10b981' },
  { text: '[  OK  ] Loading experience modules: 9+ years detected', color: '#10b981' },
  { text: '[  OK  ] Starting AI subsystem: Copilot · GPT-4 · RAG', color: '#8b5cf6' },
  { text: '[  OK  ] Connecting cloud nodes: AWS · GCP · Azure · OpenShift', color: '#10b981' },
  { text: '[  OK  ] Deploying microservices: 10+ containers online', color: '#10b981' },
  { text: '[  OK  ] Verifying stack: Java 21 · Spring WebFlux · React · Angular', color: '#10b981' },
  { text: '[  OK  ] Security modules: OAuth2 · JWT · HashiCorp Vault', color: '#10b981' },
  { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', color: '#1e293b' },
  { text: '[  OK  ] All systems operational. Welcome, Recruiter. 🚀', color: '#06b6d4' },
];

const LINE_INTERVAL = 310;
const COMPLETE_DELAY = 1400;
const EXIT_DURATION = 700;

interface Props { onComplete: () => void; }

const BootSequence: React.FC<Props> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const exitingRef = useRef(false);

  const doExit = useCallback(() => {
    if (exitingRef.current) return;
    exitingRef.current = true;
    if (containerRef.current) {
      containerRef.current.style.transition = `opacity ${EXIT_DURATION}ms ease, transform ${EXIT_DURATION}ms ease`;
      containerRef.current.style.opacity = '0';
      containerRef.current.style.transform = 'scale(1.04)';
    }
    setTimeout(onComplete, EXIT_DURATION);
  }, [onComplete]);

  useEffect(() => {
    const lines = containerRef.current?.querySelectorAll<HTMLElement>('.boot-line');
    if (!lines) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    lines.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(-12px)';
      const t = setTimeout(() => {
        el.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateX(0)';
      }, i * LINE_INTERVAL + 200);
      timers.push(t);
    });

    const total = BOOT_LINES.length * LINE_INTERVAL + COMPLETE_DELAY;
    const exitTimer = setTimeout(doExit, total);
    timers.push(exitTimer);

    return () => timers.forEach(clearTimeout);
  }, [doExit]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col font-mono overflow-hidden boot-scanlines"
    >
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-white/5 flex-shrink-0">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ textShadow: ['0 0 10px #06b6d4', '0 0 25px #8b5cf6', '0 0 10px #06b6d4'] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-2xl font-black tracking-widest text-accent-cyan"
          >
            NEXUS OS
          </motion.div>
          <span className="text-gray-600 text-sm">v2.0.26</span>
          <div className="ml-auto flex gap-1.5">
            {['#ef4444', '#f59e0b', '#10b981'].map((c, i) => (
              <div key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: c + '99' }} />
            ))}
          </div>
        </div>
        <p className="text-gray-700 text-xs mt-1">Copyright © Jay Sravan Vadlamudi 2026. All rights reserved.</p>
      </div>

      {/* Boot log */}
      <div className="flex-1 p-6 md:p-8 space-y-2 overflow-hidden">
        {BOOT_LINES.map((line, i) => (
          <div
            key={i}
            className="boot-line text-sm leading-relaxed"
            style={{ color: line.color }}
          >
            {line.text}
          </div>
        ))}
        {/* Blinking cursor */}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.9 }}
          className="inline-block w-2.5 h-4 bg-accent-cyan mt-1"
        />
      </div>

      {/* Skip */}
      <div className="p-4 flex justify-between items-center border-t border-white/5 flex-shrink-0">
        <div className="text-gray-700 text-xs space-x-4">
          <span>Loading NEXUS OS...</span>
          <span className="hidden sm:inline text-gray-800">
            Tip: Press <kbd className="border border-white/10 rounded px-1">Ctrl+K</kbd> to open Spotlight search
          </span>
        </div>
        <button
          onClick={doExit}
          className="text-xs text-gray-600 hover:text-gray-300 transition-colors font-mono px-3 py-1 border border-white/10 rounded hover:border-white/20"
        >
          Skip →
        </button>
      </div>
    </div>
  );
};

export default BootSequence;

