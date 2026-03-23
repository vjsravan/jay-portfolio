import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Battery, Volume2, Search } from 'lucide-react';

function useClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useFakeLoad(min = 8, max = 35, interval = 2200) {
  const [val, setVal] = useState(() => Math.floor(Math.random() * (max - min) + min));
  useEffect(() => {
    const id = setInterval(() => {
      setVal(Math.floor(Math.random() * (max - min) + min));
    }, interval + Math.random() * 800);
    return () => clearInterval(id);
  }, [min, max, interval]);
  return val;
}

const MenuBar: React.FC<{ onSpotlight?: () => void }> = ({ onSpotlight }) => {
  const now = useClock();
  const cpu = useFakeLoad(4, 28);
  const mem = useFakeLoad(38, 68, 3500);
  const [muted, setMuted] = useState(true);

  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <div
      className="fixed top-0 left-0 right-0 h-10 z-[9990] flex items-center px-4 select-none"
      style={{
        background: 'rgba(2, 6, 23, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Left: OS logo + app name */}
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-xs font-black tracking-widest text-accent-cyan cursor-default"
        >
          NEXUS<span className="text-accent-purple">OS</span>
        </motion.div>
        <div className="hidden sm:flex items-center gap-1 text-xs text-white/40 font-mono">
          <span className="w-1 h-1 rounded-full bg-accent-cyan inline-block animate-pulse" />
          Jay Sravan Vadlamudi
        </div>
      </div>

      {/* Center: search pill + status */}
      <div className="flex-1 flex justify-center items-center gap-4">
        {/* Spotlight trigger */}
        {onSpotlight && (
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onSpotlight}
            className="hidden sm:flex items-center gap-2 text-[11px] text-white/25 hover:text-white/50 transition-colors font-mono px-3 py-1 rounded-lg border border-white/8 hover:border-white/15"
          >
            <Search size={11} />
            <span>Search</span>
            <kbd className="ml-1 border border-white/15 rounded px-1 text-[9px] text-white/20">⌘K</kbd>
          </motion.button>
        )}
        <div className="hidden md:flex items-center gap-3 text-[10px] font-mono">
          {/* CPU */}
          <div className="flex items-center gap-1.5">
            <span className="text-gray-500">CPU</span>
            <div className="w-14 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-accent-cyan"
                animate={{ width: `${cpu}%` }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </div>
            <span className="text-gray-500 w-6">{cpu}%</span>
          </div>
          {/* MEM */}
          <div className="flex items-center gap-1.5">
            <span className="text-gray-500">MEM</span>
            <div className="w-14 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-accent-purple"
                animate={{ width: `${mem}%` }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </div>
            <span className="text-gray-500 w-6">{mem}%</span>
          </div>
        </div>
      </div>

      {/* Right: system tray */}
      <div className="flex items-center gap-3 text-white/50">
        <button
          onClick={() => setMuted(m => !m)}
          className="hover:text-white transition-colors"
        >
          {muted
            ? <Volume2 size={13} className="opacity-40" />
            : <Volume2 size={13} />
          }
        </button>
        <Wifi size={13} className="text-accent-green" />
        <Battery size={13} />
        <div className="text-xs font-mono text-white/60">
          <span className="mr-1.5 text-white/30">{dateStr}</span>
          <span className="text-white/80">{timeStr}</span>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;

