import React, { useEffect, useState } from 'react';
import { motion, useDragControls, useMotionValue, AnimatePresence } from 'framer-motion';
import { type WindowDef, type WindowId, useWindowManager } from '../../hooks/useWindowManager';

// OS-native compact content (purpose-built for window size)
import AboutContent    from './content/AboutContent';
import SkillsContent   from './content/SkillsContent';
import ExperienceContent from './content/ExperienceContent';
import ProjectsContent from './content/ProjectsContent';
import ContactContent  from './content/ContactContent';
import TerminalApp     from './TerminalApp';
import AILab           from '../AILab'; // still use existing; CSS override handles padding

// Per-window accent colors
const WINDOW_COLORS: Record<WindowId, string> = {
  about:      '#06b6d4',
  skills:     '#8b5cf6',
  experience: '#f59e0b',
  projects:   '#10b981',
  ailab:      '#ec4899',
  contact:    '#06b6d4',
  terminal:   '#10b981',
};

// Bottom nav apps (all 7 sections)
const NAV_APPS: { id: WindowId; icon: string; label: string }[] = [
  { id: 'about',      icon: '👤', label: 'About' },
  { id: 'skills',     icon: '🛠️', label: 'Skills' },
  { id: 'experience', icon: '💼', label: 'Exp' },
  { id: 'projects',   icon: '🚀', label: 'Work' },
  { id: 'ailab',      icon: '🤖', label: 'AI Lab' },
  { id: 'contact',    icon: '✉️', label: 'Contact' },
  { id: 'terminal',   icon: '💻', label: 'Shell' },
];

function renderContent(id: WindowId): React.ReactNode {
  switch (id) {
    case 'about':      return <AboutContent />;
    case 'skills':     return <SkillsContent />;
    case 'experience': return <ExperienceContent />;
    case 'projects':   return <ProjectsContent />;
    case 'ailab':      return <div className="os-window-content"><AILab /></div>;
    case 'contact':    return <ContactContent />;
    case 'terminal':   return <TerminalApp />;
    default:           return null;
  }
}

interface OsWindowProps { win: WindowDef; }

const OsWindow: React.FC<OsWindowProps> = ({ win }) => {
  const { closeWindow, minimizeWindow, toggleMaximize, focusWindow, moveWindow } = useWindowManager();
  const dragControls = useDragControls();
  const x = useMotionValue(win.position.x);
  const y = useMotionValue(win.position.y);

  // In-window navigation — starts at the window's own section
  const [currentSection, setCurrentSection] = useState<WindowId>(win.id);
  useEffect(() => { setCurrentSection(win.id); }, [win.id]);

  const accent = WINDOW_COLORS[currentSection] ?? '#06b6d4';

  useEffect(() => {
    if (win.isMaximized) { x.set(0); y.set(0); }
  }, [win.isMaximized, x, y]);

  const isMax = win.isMaximized;
  const currentNav = NAV_APPS.find(a => a.id === currentSection);

  return (
    <motion.div
      initial={{ scale: 0.88, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.88, opacity: 0, transition: { duration: 0.18 } }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      drag={!isMax}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      style={{
        position: 'fixed',
        left: 0,
        top: isMax ? 40 : 0,
        width: isMax ? '100vw' : win.size.width,
        height: isMax ? 'calc(100vh - 120px)' : win.size.height,
        borderRadius: isMax ? 0 : 14,
        x: isMax ? 0 : x,
        y: isMax ? 0 : y,
        zIndex: win.zIndex,
        background: 'rgba(10, 18, 36, 0.94)',
        backdropFilter: 'blur(28px)',
        border: `1px solid ${accent}28`,
        boxShadow: `0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.03), 0 0 40px ${accent}10`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
      onPointerDown={() => focusWindow(win.id)}
      onDragEnd={() => moveWindow(win.id, { x: x.get(), y: y.get() })}
    >
      {/* ── Top accent glow line ── */}
      <motion.div
        animate={{ background: `linear-gradient(90deg, transparent, ${accent}90, ${accent}, ${accent}90, transparent)` }}
        transition={{ duration: 0.4 }}
        style={{ height: 2, flexShrink: 0 }}
      />

      {/* ── Title Bar ── */}
      <div
        onPointerDown={(e) => { if (!isMax) { e.stopPropagation(); dragControls.start(e); } }}
        className="flex items-center px-4 flex-shrink-0 select-none"
        style={{
          height: 36,
          background: `linear-gradient(to right, ${accent}08, rgba(255,255,255,0.02), ${accent}08)`,
          borderBottom: `1px solid ${accent}15`,
          cursor: isMax ? 'default' : 'grab',
        }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <TrafficLight color="#ef4444" hoverColor="#ff6b6b" glyph="×" title="close"
            onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }} />
          <TrafficLight color="#f59e0b" hoverColor="#fbbf24" glyph="−" title="minimize"
            onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }} />
          <TrafficLight color="#10b981" hoverColor="#34d399" glyph={isMax ? '⊡' : '+'} title="maximize"
            onClick={(e) => { e.stopPropagation(); toggleMaximize(win.id); }} />
        </div>

        {/* Title — shows current section */}
        <div className="flex-1 flex justify-center items-center gap-2 min-w-0">
          <span className="text-sm leading-none">{currentNav?.icon}</span>
          <motion.span
            key={currentSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-mono truncate"
            style={{ color: accent + 'bb' }}
          >
            {currentNav?.label}
          </motion.span>
        </div>

        <div style={{ width: 60 }} />
      </div>

      {/* ── Content area (AnimatePresence for section switching) ── */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 overflow-y-auto os-scrollbar"
          >
            {renderContent(currentSection)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom section navigation ── */}
      <div
        className="flex flex-shrink-0 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(0,0,0,0.25)' }}
      >
        {NAV_APPS.map((app) => {
          const isActive = currentSection === app.id;
          const appAccent = WINDOW_COLORS[app.id];
          return (
            <motion.button
              key={app.id}
              onClick={() => setCurrentSection(app.id)}
              whileTap={{ scale: 0.9 }}
              className="flex-1 flex flex-col items-center py-1.5 gap-0.5 transition-colors relative"
              style={{ color: isActive ? appAccent : 'rgba(255,255,255,0.25)' }}
            >
              {/* Active indicator bar at top */}
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full"
                  style={{ backgroundColor: appAccent }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="text-base leading-none">{app.icon}</span>
              <span className="text-[9px] font-mono leading-none">{app.label}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

// ── Traffic Light ─────────────────────────────────────────────────────────
interface TLProps { color: string; hoverColor: string; glyph: string; title: string; onClick: (e: React.MouseEvent) => void; }
function TrafficLight({ color, hoverColor, glyph, title, onClick }: TLProps) {
  const [h, setH] = useState(false);
  return (
    <motion.button title={title} onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      whileTap={{ scale: 0.85 }}
      className="w-3 h-3 rounded-full flex items-center justify-center text-[8px] font-black"
      style={{ backgroundColor: h ? hoverColor : color + 'bb', color: '#1a0a00' }}
    >{h ? glyph : ''}</motion.button>
  );
}

// ── Window Layer (used by Desktop) ───────────────────────────────────────
interface OsWindowLayerProps { windows: WindowDef[]; }
export const OsWindowLayer: React.FC<OsWindowLayerProps> = ({ windows }) => (
  <AnimatePresence>
    {windows.filter(w => w.isOpen && !w.isMinimized).map(w => (
      <OsWindow key={w.id} win={w} />
    ))}
  </AnimatePresence>
);

export default OsWindow;

