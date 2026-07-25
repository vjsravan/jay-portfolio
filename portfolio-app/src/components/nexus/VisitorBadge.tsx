import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { fetchVisitorCount } from '../../lib/visitors';

/** Animated count-up once the real value arrives. */
function useCountUp(target: number | null, duration = 1100) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (target === null) return;
    let start: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(prog * target));
      if (prog < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

const VisitorBadge: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [count, setCount] = useState<number | null>(null);
  const [hover, setHover] = useState(false);
  const shown = useCountUp(count);

  useEffect(() => {
    let alive = true;
    fetchVisitorCount().then(v => { if (alive) setCount(v); });
    return () => { alive = false; };
  }, []);

  if (count === null) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-1.5 font-mono text-[10px] px-2 py-0.5 rounded cursor-default"
        style={{
          background: 'rgba(0,255,136,0.07)',
          border: '1px solid rgba(0,255,136,0.28)',
          color: '#00ff88',
          letterSpacing: '0.08em',
        }}
      >
        <Eye size={11} style={{ flexShrink: 0 }} />
        <span style={{ textShadow: '0 0 8px rgba(0,255,136,0.6)' }}>
          {shown.toLocaleString()}
        </span>
        {!compact && <span style={{ color: 'rgba(0,255,136,0.55)' }}>VIEWS</span>}
      </motion.div>

      {hover && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full right-0 mt-1.5 font-mono text-[9px] px-2.5 py-1.5 rounded-lg whitespace-nowrap z-50 tracking-widest"
          style={{
            background: 'rgba(0,0,0,0.95)',
            border: '1px solid rgba(0,255,136,0.4)',
            color: '#00ff88',
          }}
        >
          NEURAL LINKS ESTABLISHED · LIVE COUNTER
        </motion.div>
      )}
    </div>
  );
};

export default VisitorBadge;
