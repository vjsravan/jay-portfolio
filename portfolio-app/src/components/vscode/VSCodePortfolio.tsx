import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { FileId } from './vsTypes';
import { ALL_FILES } from './vsTypes';
import VsActivityBar from './VsActivityBar';
import VsSidebar from './VsSidebar';
import VsTabBar from './VsTabBar';
import VsEditorArea from './VsEditorArea';
import VsStatusBar from './VsStatusBar';
import VsTerminal from './VsTerminal';
import VsCommandPalette from './VsCommandPalette';
import VsNotifications from './VsNotifications';

type SidebarPanel = 'files' | 'extensions';

const VSCodePortfolio: React.FC = () => {
  const [activeFile, setActiveFile] = useState<FileId>('readme');
  const [openFiles, setOpenFiles] = useState<FileId[]>(['readme']);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);
  const [sidebarPanel, setSidebarPanel] = useState<SidebarPanel>('files');
  const [showPalette, setShowPalette] = useState(false);

  // Mouse parallax
  const editorColRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rotRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2.5,
        y: (e.clientY / window.innerHeight - 0.5) * 2.5,
      };
    };
    window.addEventListener('mousemove', handleMouse);

    let raf: number;
    const tick = () => {
      rotRef.current.x += (mouseRef.current.x - rotRef.current.x) * 0.04;
      rotRef.current.y += (mouseRef.current.y - rotRef.current.y) * 0.04;
      if (editorColRef.current) {
        editorColRef.current.style.transform =
          `perspective(1400px) rotateY(${rotRef.current.x}deg) rotateX(${-rotRef.current.y}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouse);
      cancelAnimationFrame(raf);
    };
  }, []);

  const openFile = useCallback((id: FileId) => {
    setActiveFile(id);
    setOpenFiles(prev => prev.includes(id) ? prev : [...prev, id]);
  }, []);

  const closeFile = useCallback((id: FileId) => {
    setOpenFiles(prev => {
      const next = prev.filter(f => f !== id);
      if (activeFile === id && next.length > 0) {
        setActiveFile(next[next.length - 1]);
      }
      return next;
    });
  }, [activeFile]);

  const handlePanelChange = useCallback((p: SidebarPanel) => {
    if (sidebarPanel === p && showSidebar) {
      setShowSidebar(false);
    } else {
      setSidebarPanel(p);
      setShowSidebar(true);
    }
  }, [sidebarPanel, showSidebar]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        setShowTerminal(t => !t);
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
        e.preventDefault();
        setShowPalette(p => !p);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        setShowPalette(p => !p);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setShowSidebar(s => !s);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const activeFileObj = ALL_FILES.find(f => f.id === activeFile)!;

  return (
    <div
      className="h-screen w-screen flex flex-col overflow-hidden"
      style={{ background: '#1e1e1e', fontFamily: "'Segoe UI', system-ui, sans-serif" }}
    >
      {/* VS Code title bar */}
      <div
        className="flex items-center justify-between px-4 flex-shrink-0"
        style={{ background: '#3c3c3c', height: 30, borderBottom: '1px solid #252526' }}
      >
        {/* Window controls */}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: '#ef4444' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#f59e0b' }} />
          <div className="w-3 h-3 rounded-full" style={{ background: '#10b981' }} />
        </div>
        {/* Title */}
        <div className="flex items-center gap-2 text-xs" style={{ color: '#cccccc' }}>
          <span>{activeFileObj.icon}</span>
          <span>{activeFileObj.name}</span>
          <span style={{ color: '#858585' }}>—</span>
          <span style={{ color: '#858585' }}>Jay Sravan Portfolio</span>
        </div>
        {/* Menu items */}
        <div className="flex items-center gap-4 text-xs" style={{ color: '#cccccc' }}>
          <button
            className="hover:bg-[#505050] px-2 py-0.5 rounded transition-colors"
            onClick={() => setShowPalette(true)}
            title="Open Command Palette (Ctrl+Shift+P)"
          >
            View
          </button>
          <span className="text-[10px] opacity-50">Ctrl+Shift+P</span>
        </div>
      </div>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Activity bar */}
        <VsActivityBar
          activePanel={sidebarPanel}
          sidebarVisible={showSidebar}
          onPanelChange={handlePanelChange}
        />

        {/* Sidebar */}
        <AnimatePresence initial={false}>
          {showSidebar && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 240, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.18, ease: 'easeInOut' }}
              className="overflow-hidden flex-shrink-0"
            >
              <VsSidebar
                panel={sidebarPanel}
                activeFile={activeFile}
                openFiles={openFiles}
                onFileOpen={openFile}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Editor column — parallax target */}
        <div ref={editorColRef} className="flex-1 flex flex-col overflow-hidden min-w-0" style={{ willChange: 'transform' }}>
          {/* Tab bar */}
          {openFiles.length > 0 && (
            <VsTabBar
              openFiles={openFiles}
              activeFile={activeFile}
              onFileSelect={setActiveFile}
              onFileClose={closeFile}
            />
          )}

          {/* Editor area */}
          <div className="flex-1 overflow-hidden">
            <VsEditorArea activeFile={activeFile} onFileOpen={openFile} />
          </div>

          {/* Terminal panel */}
          <AnimatePresence>
            {showTerminal && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 220 }}
                exit={{ height: 0 }}
                transition={{ duration: 0.18, ease: 'easeInOut' }}
                className="flex-shrink-0 overflow-hidden"
                style={{ borderTop: '1px solid #3c3c3c' }}
              >
                <VsTerminal
                  onClose={() => setShowTerminal(false)}
                  onFileOpen={openFile}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Status bar */}
      <VsStatusBar
        activeFile={activeFileObj}
        showTerminal={showTerminal}
        onToggleTerminal={() => setShowTerminal(t => !t)}
      />

      {/* Notification toasts */}
      <VsNotifications />

      {/* Command palette overlay */}
      <AnimatePresence>
        {showPalette && (
          <VsCommandPalette
            onClose={() => setShowPalette(false)}
            onFileOpen={id => { openFile(id); setShowPalette(false); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default VSCodePortfolio;


