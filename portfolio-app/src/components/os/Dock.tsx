import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { useWindowManager, type WindowId } from '../../hooks/useWindowManager';

const DOCK_APPS: { id: WindowId; icon: string; label: string; color: string }[] = [
  { id: 'about',      icon: '👤', label: 'About',      color: '#06b6d4' },
  { id: 'skills',     icon: '🛠️', label: 'Skills',     color: '#8b5cf6' },
  { id: 'experience', icon: '💼', label: 'Experience',  color: '#f59e0b' },
  { id: 'projects',   icon: '🚀', label: 'Projects',    color: '#10b981' },
  { id: 'ailab',      icon: '🤖', label: 'AI Lab',      color: '#ec4899' },
  { id: 'contact',    icon: '✉️', label: 'Contact',     color: '#06b6d4' },
  { id: 'terminal',   icon: '💻', label: 'Terminal',    color: '#10b981' },
];

interface DockItemProps {
  app: typeof DOCK_APPS[number];
  mouseX: MotionValue<number>;
  isOpen: boolean;
  isMinimized: boolean;
  onClick: () => void;
}

function DockItem({ app, mouseX, isOpen, isMinimized, onClick }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return Infinity;
    const center = bounds.x + bounds.width / 2;
    return Math.abs(val - center);
  });

  const scaleRaw = useTransform(distance, [0, 80, 160], [1.75, 1.25, 1.0]);
  const scale = useSpring(scaleRaw, { mass: 0.1, stiffness: 180, damping: 14 });

  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      className="relative flex flex-col items-center gap-1"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip label */}
      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
        transition={{ duration: 0.15 }}
        className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/80 bg-dark-800/90 border border-white/10 px-2 py-0.5 rounded-md whitespace-nowrap pointer-events-none"
        style={{ backdropFilter: 'blur(8px)' }}
      >
        {app.label}
      </motion.div>

      {/* Icon */}
      <motion.div
        ref={ref}
        onClick={onClick}
        whileTap={{ scale: 0.85 }}
        className="relative w-12 h-12 rounded-2xl flex items-center justify-center cursor-pointer select-none"
        style={{
          scale,
          originY: 1,
          background: `linear-gradient(135deg, ${app.color}22, ${app.color}10)`,
          border: `1px solid ${app.color}33`,
          boxShadow: hovered ? `0 0 20px ${app.color}40, 0 8px 24px rgba(0,0,0,0.4)` : '0 4px 12px rgba(0,0,0,0.3)',
        }}
      >
        <span className="text-2xl leading-none">{app.icon}</span>
        {/* Minimized badge */}
        {isMinimized && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-yellow-400 border border-dark-900 text-[6px] flex items-center justify-center font-bold text-dark-900"
          >
            —
          </motion.div>
        )}
      </motion.div>

      {/* Running indicator */}
      <div className="h-1 flex items-center justify-center">
        {isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: app.color + 'cc' }}
          />
        )}
      </div>
    </div>
  );
}

// Separator between groups
const DockSeparator = () => (
  <div className="w-px h-8 bg-white/10 mx-1 self-center" />
);

const Dock: React.FC = () => {
  const mouseX = useMotionValue(Infinity);
  const { windows, openWindow } = useWindowManager();

  const getWindow = (id: WindowId) => windows.find(w => w.id === id);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 h-20 z-[9990] flex items-end justify-center pb-2"
      style={{ pointerEvents: 'none' }}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 25 }}
        className="flex items-end gap-2 px-4 py-2 rounded-2xl"
        style={{
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
          pointerEvents: 'all',
        }}
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {DOCK_APPS.slice(0, 4).map((app) => {
          const win = getWindow(app.id);
          return (
            <DockItem
              key={app.id}
              app={app}
              mouseX={mouseX}
              isOpen={win?.isOpen ?? false}
              isMinimized={win?.isMinimized ?? false}
              onClick={() => openWindow(app.id)}
            />
          );
        })}

        <DockSeparator />

        {DOCK_APPS.slice(4).map((app) => {
          const win = getWindow(app.id);
          return (
            <DockItem
              key={app.id}
              app={app}
              mouseX={mouseX}
              isOpen={win?.isOpen ?? false}
              isMinimized={win?.isMinimized ?? false}
              onClick={() => openWindow(app.id)}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

export default Dock;

