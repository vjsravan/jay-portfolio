import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../../../data/resume';

const categories = [
  { key: 'languages', label: 'Languages', icon: '💬', color: '#06b6d4' },
  { key: 'frontend',  label: 'Frontend',  icon: '🎨', color: '#8b5cf6' },
  { key: 'backend',   label: 'Backend',   icon: '⚙️', color: '#10b981' },
  { key: 'ai',        label: 'AI & ML',   icon: '🤖', color: '#ec4899' },
  { key: 'cloud',     label: 'Cloud',     icon: '☁️', color: '#38bdf8' },
  { key: 'databases', label: 'Databases', icon: '🗄️', color: '#f59e0b' },
  { key: 'messaging', label: 'Messaging', icon: '📨', color: '#06b6d4' },
  { key: 'security',  label: 'Security',  icon: '🔒', color: '#10b981' },
];

const SkillsContent: React.FC = () => {
  const [active, setActive] = useState('ai');
  const activeCat = categories.find(c => c.key === active)!;
  const activeSkills = skills[active as keyof typeof skills] ?? [];

  return (
    <div className="flex flex-col h-full">
      {/* Category tab row — horizontal scroll */}
      <div
        className="flex gap-1.5 px-4 py-3 overflow-x-auto flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', scrollbarWidth: 'none' }}
      >
        {categories.map(cat => (
          <motion.button
            key={cat.key}
            onClick={() => setActive(cat.key)}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200"
            style={
              active === cat.key
                ? { background: cat.color + '20', border: `1px solid ${cat.color}50`, color: cat.color }
                : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }
            }
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Skill pills */}
      <div className="flex-1 p-5 overflow-y-auto os-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="flex flex-wrap gap-2"
          >
            {activeSkills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ scale: 1.06, y: -2 }}
                className="px-3 py-1.5 rounded-xl text-sm font-mono cursor-default"
                style={{
                  color: activeCat.color,
                  background: activeCat.color + '15',
                  border: `1px solid ${activeCat.color}30`,
                  boxShadow: `0 0 12px ${activeCat.color}08`,
                }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Proficiency note */}
        <div className="mt-6 pt-4 border-t border-white/6">
          <p className="text-xs text-gray-600 font-mono">
            <span style={{ color: activeCat.color }}>// </span>
            {activeSkills.length} technologies in <span style={{ color: activeCat.color }}>{activeCat.label}</span> · 9+ years applied experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillsContent;

