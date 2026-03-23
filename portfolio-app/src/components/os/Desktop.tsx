import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NeuralBackground from '../NeuralBackground';
import CustomCursor from '../CustomCursor';
import MenuBar from './MenuBar';
import Dock from './Dock';
import { OsWindowLayer } from './OsWindow';
import SpotlightSearch from './SpotlightSearch';
import DesktopWidget from './DesktopWidget';
import { useWindowManager } from '../../hooks/useWindowManager';

// Konami code sequence
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];

// Desktop greeting shown when no windows are open
const DesktopGreeting: React.FC<{ visible: boolean }> = ({ visible }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        key="greeting"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          className="text-center"
        >
          <div className="text-6xl mb-6 filter drop-shadow-lg">🖥️</div>
          <h1 className="text-4xl font-black tracking-widest text-white/8 mb-3 font-mono">
            NEXUS OS
          </h1>
          <p className="text-sm font-mono text-white/15">
            Jay Sravan Vadlamudi · Sr. Software Engineer
          </p>
          <p className="text-xs font-mono text-white/10 mt-3">
            Click any app in the dock ↓ &nbsp;·&nbsp; Navigate sections from <em>inside</em> any window &nbsp;·&nbsp; <kbd className="border border-white/15 rounded px-1">Ctrl+K</kbd> to search
          </p>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Konami Easter Egg overlay
const KonamiEgg: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <motion.div
    className="fixed inset-0 z-[9998] flex items-center justify-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
    style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
  >
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, rotate: 180 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className="text-center p-12 rounded-3xl font-mono"
      style={{
        background: 'rgba(10,18,36,0.95)',
        border: '1px solid rgba(6,182,212,0.4)',
        boxShadow: '0 0 80px rgba(6,182,212,0.3), 0 0 160px rgba(139,92,246,0.2)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-8xl mb-6"
      >
        🎉
      </motion.div>
      <h2 className="text-3xl font-black text-accent-cyan mb-2">Konami Code Activated!</h2>
      <p className="text-white/50 text-sm mb-6">You found the Easter egg. Now hire Jay. 🚀</p>
      <div className="space-y-2 text-left text-sm mb-8">
        {['✓ 9+ years experience', '✓ Full-stack + AI skills', '✓ Production-grade systems', '✓ AWS Certified'].map(t => (
          <motion.div
            key={t}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-accent-green font-mono"
          >{t}</motion.div>
        ))}
      </div>
      <a
        href="mailto:jayforfullstack@gmail.com"
        className="inline-block px-8 py-3 rounded-xl font-bold text-dark-900"
        style={{ background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)' }}
        onClick={onClose}
      >
        📧 Hire Jay Now
      </a>
      <p className="text-white/20 text-xs mt-4">Click anywhere to dismiss</p>
    </motion.div>
  </motion.div>
);

// Right-click context menu
const ContextMenu: React.FC<{ x: number; y: number; onClose: () => void; onSpotlight: () => void }> = ({ x, y, onClose, onSpotlight }) => {
  const { openWindow } = useWindowManager();
  const items: Array<{ label: string; action: () => void } | null> = [
    { label: '🔍 Spotlight Search  ⌘K', action: onSpotlight },
    null,
    { label: '👤 Open About',           action: () => openWindow('about') },
    { label: '💻 Open Terminal',         action: () => openWindow('terminal') },
    { label: '🤖 Open AI Lab',           action: () => openWindow('ailab') },
    null,
    { label: '🚀 Open All Apps',         action: () => { openWindow('about'); openWindow('skills'); openWindow('experience'); } },
  ];

  useEffect(() => {
    const handler = () => onClose();
    window.addEventListener('click', handler, { once: true });
    return () => window.removeEventListener('click', handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: -4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.12 }}
      className="fixed z-[9980] rounded-xl overflow-hidden text-sm font-mono"
      style={{
        left: Math.min(x, window.innerWidth - 220),
        top: Math.min(y, window.innerHeight - 200),
        background: 'rgba(10, 18, 36, 0.96)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.12)',
        boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
        minWidth: 210,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {items.map((item, i) =>
        item === null ? (
          <div key={i} className="my-1 border-t border-white/8" />
        ) : (
          <button
            key={i}
            onClick={() => { item.action(); onClose(); }}
            className="w-full text-left px-4 py-2.5 text-white/65 hover:bg-white/8 hover:text-white transition-colors text-xs"
          >
            {item.label}
          </button>
        )
      )}
    </motion.div>
  );
};

const Desktop: React.FC = () => {
  const { windows, openWindow } = useWindowManager();
  const [ctxMenu, setCtxMenu] = useState<{ x: number; y: number } | null>(null);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [konamiOpen, setKonamiOpen] = useState(false);
  const konamiIdx = React.useRef(0);

  const hasVisibleWindow = windows.some(w => w.isOpen && !w.isMinimized);

  // Auto-open About window on first load
  useEffect(() => {
    const t1 = setTimeout(() => openWindow('about'), 500);
    return () => clearTimeout(t1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Ctrl+K or Cmd+K → Spotlight
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      setSpotlightOpen(s => !s);
      return;
    }
    // `/` key opens Spotlight (when not in an input)
    if (e.key === '/' && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
      e.preventDefault();
      setSpotlightOpen(true);
      return;
    }
    // Konami code
    if (e.key === KONAMI[konamiIdx.current]) {
      konamiIdx.current += 1;
      if (konamiIdx.current === KONAMI.length) {
        setKonamiOpen(true);
        konamiIdx.current = 0;
      }
    } else {
      konamiIdx.current = 0;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setCtxMenu({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="fixed inset-0 overflow-hidden" onContextMenu={handleContextMenu}>
      {/* Animated neural wallpaper */}
      <NeuralBackground />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Menu bar */}
      <MenuBar onSpotlight={() => setSpotlightOpen(true)} />

      {/* Desktop area (between menubar and dock) */}
      <div className="fixed left-0 right-0" style={{ top: 40, bottom: 80 }}>
        <DesktopGreeting visible={!hasVisibleWindow} />
        <DesktopWidget />
        <OsWindowLayer windows={windows} />
      </div>

      {/* Dock */}
      <Dock />

      {/* Context menu */}
      <AnimatePresence>
        {ctxMenu && (
          <ContextMenu
            key="ctx"
            x={ctxMenu.x}
            y={ctxMenu.y}
            onClose={() => setCtxMenu(null)}
            onSpotlight={() => { setCtxMenu(null); setSpotlightOpen(true); }}
          />
        )}
      </AnimatePresence>

      {/* Spotlight Search */}
      <AnimatePresence>
        {spotlightOpen && (
          <SpotlightSearch key="spotlight" onClose={() => setSpotlightOpen(false)} />
        )}
      </AnimatePresence>

      {/* Konami Easter Egg */}
      <AnimatePresence>
        {konamiOpen && (
          <KonamiEgg key="konami" onClose={() => setKonamiOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Desktop;

