import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../../data/resume';
import { useIsMobile } from '../../../hooks/useIsMobile';

const CATEGORIES = [
  { key: 'ai',        label: 'AI / LLM',        color: '#ff006e', items: skills.ai },
  { key: 'languages', label: 'Languages',        color: '#00d4ff', items: skills.languages },
  { key: 'frontend',  label: 'Frontend',         color: '#bd00ff', items: skills.frontend },
  { key: 'backend',   label: 'Backend',          color: '#ff6b00', items: skills.backend },
  { key: 'cloud',     label: 'Cloud & DevOps',   color: '#00ff88', items: skills.cloud },
  { key: 'databases', label: 'Databases',        color: '#ffd700', items: skills.databases },
  { key: 'messaging', label: 'Messaging',        color: '#00d4ff', items: skills.messaging },
  { key: 'security',  label: 'Security',         color: '#ff006e', items: skills.security },
] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.025 } },
};
const tag = {
  hidden: { opacity: 0, y: 12, scale: 0.9 },
  show:   { opacity: 1, y: 0,  scale: 1,   transition: { duration: 0.25 } },
};

const SkillsPanel: React.FC = () => {
  const isMobile = useIsMobile();
  return (
  <div className="w-full h-full flex flex-col overflow-y-auto nx-scroll" style={{ padding: isMobile ? '1rem' : '1.5rem 2rem' }}>
    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 mb-5"
    >
      <div className="w-1.5 h-6 rounded-full" style={{ background: '#00ff88', boxShadow: '0 0 10px #00ff88' }} />
      <h2 className="font-mono font-bold tracking-widest text-sm" style={{ color: '#00ff88' }}>
        SKILLS DATABASE
      </h2>
      <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(0,255,136,0.4), transparent)' }} />
      <span className="font-mono text-[10px]" style={{ color: 'rgba(0,255,136,0.4)' }}>
        {Object.values(skills).flat().length} TECHNOLOGIES INDEXED
      </span>
    </motion.div>

    {/* Grid of categories */}
    <div className={`grid gap-4 pb-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
        {CATEGORIES.map((cat, ci) => (
          <motion.div
            key={cat.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ci * 0.07, duration: 0.4 }}
            className="p-4 rounded-xl relative overflow-hidden"
            style={{
              background: `${cat.color}06`,
              border: `1px solid ${cat.color}22`,
            }}
          >
            {/* Top border glow */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, ${cat.color}80, transparent)` }}
            />

            {/* Category label */}
            <div
              className="font-mono text-[10px] font-bold tracking-widest mb-3"
              style={{ color: cat.color }}
            >
              ◈ {cat.label}
            </div>

            {/* Tags */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="flex flex-wrap gap-1.5"
            >
              {cat.items.map((skill: string) => (
                <motion.span
                  key={skill}
                  variants={tag}
                  whileHover={{
                    scale: 1.06,
                    boxShadow: `0 0 12px ${cat.color}80`,
                    background: `${cat.color}20`,
                    transition: { duration: 0.15 },
                  }}
                  className="font-mono text-[11px] px-2.5 py-1 rounded cursor-default"
                  style={{
                    background: `${cat.color}0c`,
                    border: `1px solid ${cat.color}28`,
                    color: cat.color === '#ffd700' ? '#ffd700' : cat.color,
                    opacity: 0.9,
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
  </div>
  );
};

export default SkillsPanel;

