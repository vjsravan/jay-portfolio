import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { FileId } from './vsTypes';
import { ALL_FILES } from './vsTypes';
import ReadmeEditor from './editors/ReadmeEditor';
import ExperienceEditor from './editors/ExperienceEditor';
import SkillsEditor from './editors/SkillsEditor';
import ProjectsEditor from './editors/ProjectsEditor';
import AILabEditor from './editors/AILabEditor';
import ContactEditor from './editors/ContactEditor';

interface Props {
  activeFile: FileId;
  onFileOpen: (id: FileId) => void;
}

const EDITORS: Record<FileId, React.FC> = {
  readme: ReadmeEditor,
  experience: ExperienceEditor,
  skills: SkillsEditor,
  projects: ProjectsEditor,
  'ai-lab': AILabEditor,
  contact: ContactEditor,
};

const VsEditorArea: React.FC<Props> = ({ activeFile }) => {
  const file = ALL_FILES.find(f => f.id === activeFile)!;
  const Editor = EDITORS[activeFile];
  const contentRef = useRef<HTMLDivElement>(null);

  // Stagger-animate code lines whenever file changes
  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    // Small rAF delay so React has finished rendering the new editor
    const raf = requestAnimationFrame(() => {
      // Target the first overflow-y-auto div (the editor scroll container)
      const scrollEl = container.querySelector('[class*="overflow-y-auto"]');
      if (!scrollEl) return;

      const lines = Array.from(scrollEl.children) as HTMLElement[];
      lines.forEach((el, _i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(-4px)';
        el.style.transition = '';
      });

      lines.forEach((el, i) => {
        setTimeout(() => {
          el.style.transition = 'opacity 0.07s ease, transform 0.07s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateX(0)';
        }, i * 10); // 10ms per line → 60 lines = 600ms
      });
    });

    return () => cancelAnimationFrame(raf);
  }, [activeFile]);

  return (
    <div className="h-full flex flex-col relative" style={{ background: '#1e1e1e' }}>
      {/* Subtle ambient grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,120,212,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,120,212,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '48px 24px',
          animation: 'gridDrift 40s linear infinite',
        }}
      />

      {/* Breadcrumb */}
      <div
        className="flex items-center gap-1 px-4 py-1 text-xs flex-shrink-0 relative z-10"
        style={{ borderBottom: '1px solid #3c3c3c', color: '#858585' }}
      >
        <span>jay-portfolio</span>
        <span style={{ color: '#5a5a5a' }}>›</span>
        <span>src</span>
        <span style={{ color: '#5a5a5a' }}>›</span>
        <span style={{ color: '#cccccc' }}>{file.icon} {file.name}</span>
      </div>

      {/* Editor content */}
      <div ref={contentRef} className="flex-1 overflow-hidden relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFile}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="h-full"
          >
            <Editor />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VsEditorArea;
