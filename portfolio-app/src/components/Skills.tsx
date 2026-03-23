import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills } from '../data/resume';

const categories = [
  { key: 'languages', label: 'Languages', icon: '💬', color: 'accent-cyan' },
  { key: 'frontend', label: 'Frontend', icon: '🎨', color: 'accent-purple' },
  { key: 'backend', label: 'Backend', icon: '⚙️', color: 'accent-green' },
  { key: 'ai', label: 'AI & ML', icon: '🤖', color: 'accent-orange' },
  { key: 'cloud', label: 'Cloud & DevOps', icon: '☁️', color: 'primary-400' },
  { key: 'databases', label: 'Databases', icon: '🗄️', color: 'accent-pink' },
  { key: 'messaging', label: 'Messaging', icon: '📨', color: 'accent-cyan' },
  { key: 'security', label: 'Security', icon: '🔒', color: 'accent-green' },
];

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  'accent-cyan': {
    bg: 'bg-accent-cyan/10',
    border: 'border-accent-cyan/30',
    text: 'text-accent-cyan',
    glow: 'hover:shadow-glow-cyan',
  },
  'accent-purple': {
    bg: 'bg-accent-purple/10',
    border: 'border-accent-purple/30',
    text: 'text-accent-purple',
    glow: 'hover:shadow-glow-purple',
  },
  'accent-green': {
    bg: 'bg-accent-green/10',
    border: 'border-accent-green/30',
    text: 'text-accent-green',
    glow: 'hover:shadow-glow-green',
  },
  'accent-orange': {
    bg: 'bg-accent-orange/10',
    border: 'border-accent-orange/30',
    text: 'text-accent-orange',
    glow: '',
  },
  'primary-400': {
    bg: 'bg-primary-400/10',
    border: 'border-primary-400/30',
    text: 'text-primary-400',
    glow: '',
  },
  'accent-pink': {
    bg: 'bg-accent-pink/10',
    border: 'border-accent-pink/30',
    text: 'text-accent-pink',
    glow: '',
  },
};

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('ai');

  const activeSkills = skills[activeCategory as keyof typeof skills] || [];
  const activeCat = categories.find(c => c.key === activeCategory)!;
  const colors = colorMap[activeCat.color] || colorMap['accent-cyan'];

  return (
    <section id="skills" className="relative py-24 px-4">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="terminal-text text-sm mb-2">// skills.map(s =&gt; s.expertise)</p>
          <h2 className="section-title">Technical Expertise</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            9+ years of battle-tested skills across the full stack
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => {
            const c = colorMap[cat.color] || colorMap['accent-cyan'];
            return (
              <motion.button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-medium text-sm transition-all duration-300 ${
                  activeCategory === cat.key
                    ? `${c.bg} ${c.border} ${c.text}`
                    : 'glass-card text-gray-400 hover:text-white border-white/10'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
                {activeCategory === cat.key && cat.key === 'ai' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-orange animate-pulse" />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="glass-card p-8"
            >
              {/* Category header */}
              <div className={`flex items-center gap-3 mb-6 pb-4 border-b ${colors.border}`}>
                <span className="text-2xl">{activeCat.icon}</span>
                <h3 className={`text-xl font-bold ${colors.text}`}>{activeCat.label}</h3>
                {activeCat.key === 'ai' && (
                  <span className="ml-2 px-2 py-0.5 bg-accent-orange/20 text-accent-orange text-xs rounded-full font-mono animate-pulse">
                    Actively Growing
                  </span>
                )}
              </div>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-3">
                {activeSkills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`px-4 py-2 rounded-xl border ${colors.bg} ${colors.border} ${colors.text} 
                                text-sm font-mono font-medium cursor-default transition-all duration-200 ${colors.glow}`}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>

              {/* Skill count */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-gray-500 text-sm font-mono">
                  {activeSkills.length} technologies in this category
                </span>
                {activeCat.key === 'ai' && (
                  <span className="text-gray-500 text-xs font-mono flex items-center gap-1">
                    🧠 Expanding with LLMs, RAG & Agents
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Total Skills', value: '50+' },
            { label: 'Frameworks', value: '15+' },
            { label: 'Cloud Platforms', value: '4' },
            { label: 'AI Tools', value: '9+' },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-4 text-center">
              <div className="text-2xl font-black gradient-text">{stat.value}</div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

