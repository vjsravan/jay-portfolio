import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useWindowManager, type WindowId } from '../../hooks/useWindowManager';
import { personalInfo } from '../../data/resume';

interface SearchItem {
  id: string;
  label: string;
  description: string;
  icon: string;
  category: string;
  action: () => void;
}

function buildItems(openWindow: (id: WindowId) => void): SearchItem[] {
  return [
    { id: 'about',      label: 'About Me',           description: '9+ years of engineering excellence', icon: '👤', category: 'App', action: () => openWindow('about') },
    { id: 'skills',     label: 'Skills',              description: 'Java · React · Spring Boot · AI',    icon: '🛠️', category: 'App', action: () => openWindow('skills') },
    { id: 'experience', label: 'Experience',          description: 'UPS · MBFS · UHC · Wells Fargo',     icon: '💼', category: 'App', action: () => openWindow('experience') },
    { id: 'projects',   label: 'Projects',            description: '10+ production microservices',       icon: '🚀', category: 'App', action: () => openWindow('projects') },
    { id: 'ailab',      label: 'AI Lab',              description: 'Chat with Jay\'s AI assistant',      icon: '🤖', category: 'App', action: () => openWindow('ailab') },
    { id: 'contact',    label: 'Contact',             description: personalInfo.email,                   icon: '✉️', category: 'App', action: () => openWindow('contact') },
    { id: 'terminal',   label: 'Terminal',            description: 'Interactive shell — type help',      icon: '💻', category: 'App', action: () => openWindow('terminal') },
    { id: 'email',      label: 'Send Email to Jay',   description: personalInfo.email,                   icon: '📧', category: 'Action', action: () => window.open(`mailto:${personalInfo.email}`) },
    { id: 'hire',       label: 'sudo hire jay',       description: '🎉 Best decision of your career',    icon: '⚡', category: 'Easter Egg', action: () => openWindow('terminal') },
  ];
}

interface SpotlightProps {
  onClose: () => void;
}

const SpotlightSearch: React.FC<SpotlightProps> = ({ onClose }) => {
  const { openWindow } = useWindowManager();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const items = buildItems(openWindow);

  const filtered = query.trim()
    ? items.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
    : items;

  useEffect(() => { setSelected(0); }, [query]);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const executeSelected = useCallback(() => {
    if (filtered[selected]) {
      filtered[selected].action();
      onClose();
    }
  }, [filtered, selected, onClose]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { onClose(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
    if (e.key === 'Enter')     { e.preventDefault(); executeSelected(); }
  };

  const categoryColors: Record<string, string> = {
    'App': '#06b6d4',
    'Action': '#10b981',
    'Easter Egg': '#ec4899',
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9995] flex items-start justify-center pt-[15vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: -20 }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-2xl overflow-hidden font-mono"
        style={{
          background: 'rgba(10, 18, 36, 0.96)',
          border: '1px solid rgba(6, 182, 212, 0.25)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(6,182,212,0.1)',
        }}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8">
          <Search size={16} className="text-accent-cyan flex-shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Search apps, actions… (try 'terminal' or 'hire')"
            className="flex-1 bg-transparent outline-none text-white text-sm placeholder:text-white/25"
            style={{ fontFamily: 'inherit' }}
          />
          <kbd className="text-[10px] text-white/25 border border-white/15 rounded px-1.5 py-0.5">ESC</kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto os-scrollbar py-2">
          {filtered.length === 0 && (
            <p className="text-center text-white/25 text-xs py-6">No results for "{query}"</p>
          )}
          {filtered.map((item, i) => (
            <motion.button
              key={item.id}
              onClick={() => { item.action(); onClose(); }}
              onMouseEnter={() => setSelected(i)}
              animate={{ backgroundColor: selected === i ? 'rgba(6,182,212,0.08)' : 'transparent' }}
              transition={{ duration: 0.1 }}
              className="w-full flex items-center gap-4 px-5 py-3 text-left transition-colors"
            >
              <span className="text-2xl flex-shrink-0 w-8 text-center">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${selected === i ? 'text-white' : 'text-white/70'}`}>
                    {item.label}
                  </span>
                  <span
                    className="text-[9px] px-1.5 py-0.5 rounded font-mono"
                    style={{ color: categoryColors[item.category] ?? '#fff', backgroundColor: (categoryColors[item.category] ?? '#fff') + '18' }}
                  >
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-white/30 truncate mt-0.5">{item.description}</p>
              </div>
              {selected === i && (
                <kbd className="text-[10px] text-white/30 border border-white/10 rounded px-1.5 py-0.5 flex-shrink-0">↵</kbd>
              )}
            </motion.button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 border-t border-white/6 flex items-center gap-4 text-[10px] text-white/20 font-mono">
          <span><kbd className="border border-white/15 rounded px-1 py-0.5 mr-1">↑↓</kbd> navigate</span>
          <span><kbd className="border border-white/15 rounded px-1 py-0.5 mr-1">↵</kbd> open</span>
          <span className="ml-auto">NEXUS OS Spotlight</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SpotlightSearch;

