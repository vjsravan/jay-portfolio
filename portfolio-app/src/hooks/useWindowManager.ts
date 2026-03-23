// useWindowManager — lightweight in-memory store (no external deps)
// Used by the macOS-style OS mode. Rewritten without zustand after dependency cleanup.
import { useState, useCallback } from 'react';

export type WindowId = 'about' | 'skills' | 'experience' | 'projects' | 'ailab' | 'contact' | 'terminal';

export interface WindowDef {
  id: WindowId;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

const DEFAULT_WINDOWS: WindowDef[] = [
  { id: 'about',      title: 'About.tsx',      icon: '👤', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 60,  y: 60  }, size: { width: 720, height: 520 } },
  { id: 'skills',     title: 'Skills.json',    icon: '⚡', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 80,  y: 80  }, size: { width: 720, height: 520 } },
  { id: 'experience', title: 'Experience.tsx', icon: '💼', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 100, y: 100 }, size: { width: 760, height: 560 } },
  { id: 'projects',   title: 'Projects.tsx',   icon: '🚀', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 120, y: 70  }, size: { width: 800, height: 580 } },
  { id: 'ailab',      title: 'AILab.tsx',      icon: '🤖', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 140, y: 90  }, size: { width: 780, height: 560 } },
  { id: 'contact',    title: 'Contact.tsx',    icon: '📬', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 160, y: 110 }, size: { width: 680, height: 480 } },
  { id: 'terminal',   title: 'Terminal',       icon: '⬛', isOpen: false, isMinimized: false, isMaximized: false, zIndex: 1, position: { x: 200, y: 150 }, size: { width: 680, height: 420 } },
];

let _topZ = 10;

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowDef[]>(DEFAULT_WINDOWS);

  const openWindow = useCallback((id: WindowId) => {
    setWindows(ws => ws.map(w =>
      w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: ++_topZ } : w
    ));
  }, []);

  const closeWindow = useCallback((id: WindowId) => {
    setWindows(ws => ws.map(w => w.id === id ? { ...w, isOpen: false } : w));
  }, []);

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows(ws => ws.map(w => w.id === id ? { ...w, isMinimized: !w.isMinimized } : w));
  }, []);

  const focusWindow = useCallback((id: WindowId) => {
    setWindows(ws => ws.map(w => w.id === id ? { ...w, zIndex: ++_topZ } : w));
  }, []);

  const toggleMaximize = useCallback((id: WindowId) => {
    setWindows(ws => ws.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  }, []);

  const moveWindow = useCallback((id: WindowId, pos: { x: number; y: number }) => {
    setWindows(ws => ws.map(w => w.id === id ? { ...w, position: pos } : w));
  }, []);

  return { windows, openWindow, closeWindow, minimizeWindow, toggleMaximize, focusWindow, moveWindow };
}
