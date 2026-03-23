import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STATS = [
  { value: '9+',   label: 'Years Exp',        color: '#06b6d4', icon: '⚡' },
  { value: '10+',  label: 'Microservices',     color: '#8b5cf6', icon: '🔧' },
  { value: '100k+',label: 'Tx/Week @ UPS',    color: '#10b981', icon: '📦' },
  { value: '99.9%',label: 'Uptime SLA',        color: '#f59e0b', icon: '🔒' },
];

const DesktopWidget: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  return (
    <motion.div
      className="absolute top-4 right-4 font-mono select-none"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      {/* Collapsed state: compact badge */}
      <motion.div
        onClick={() => setExpanded(e => !e)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="cursor-pointer rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(10, 18, 36, 0.78)',
          border: '1px solid rgba(6,182,212,0.2)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        {/* Header always visible */}
        <div className="flex items-center gap-2 px-4 py-2.5">
          <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
          <span className="text-[11px] text-white/60">Jay Sravan Vadlamudi</span>
          <span className="text-[11px] text-accent-cyan ml-auto">{expanded ? '▲' : '▼'}</span>
        </div>

        {/* Expanded stats */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="border-t border-white/8 px-3 py-3 grid grid-cols-2 gap-2">
                {STATS.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    onMouseEnter={() => setHoveredStat(i)}
                    onMouseLeave={() => setHoveredStat(null)}
                    animate={{ scale: hoveredStat === i ? 1.04 : 1 }}
                    className="rounded-xl p-2.5"
                    style={{
                      background: hoveredStat === i ? stat.color + '15' : stat.color + '08',
                      border: `1px solid ${stat.color}20`,
                    }}
                  >
                    <div className="text-base mb-0.5">{stat.icon}</div>
                    <div className="text-sm font-black" style={{ color: stat.color }}>{stat.value}</div>
                    <div className="text-[9px] text-white/35 leading-tight">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
              <div className="px-4 pb-3 text-[10px] text-white/25">
                Sr. SDE @ UPS · AI Engineering
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default DesktopWidget;

