import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import type { FileId } from './vsTypes';
import { ALL_FILES } from './vsTypes';

interface Props {
  onClose: () => void;
  onFileOpen: (id: FileId) => void;
}

const VsCommandPalette: React.FC<Props> = ({ onClose, onFileOpen }) => {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = ALL_FILES.filter(f =>
    f.name.toLowerCase().includes(query.toLowerCase()) ||
    f.language.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
    if (e.key === 'Enter' && filtered[selected]) {
      onFileOpen(filtered[selected].id);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: -12, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.97 }}
        transition={{ duration: 0.12 }}
        className="w-full max-w-lg rounded-lg overflow-hidden shadow-2xl"
        style={{ background: '#252526', border: '1px solid #3c3c3c' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-2 px-4 py-2" style={{ borderBottom: '1px solid #3c3c3c' }}>
          <Search size={14} style={{ color: '#858585' }} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Open file in portfolio..."
            className="flex-1 bg-transparent outline-none text-sm"
            style={{
              color: '#d4d4d4',
              fontFamily: "'Cascadia Code', 'Fira Code', monospace",
              caretColor: '#aeafad',
            }}
          />
          <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: '#3c3c3c', color: '#858585' }}>ESC</span>
        </div>

        {/* Results */}
        <div>
          {filtered.length === 0 ? (
            <div className="px-4 py-3 text-sm" style={{ color: '#858585' }}>No files found</div>
          ) : (
            filtered.map((file, i) => (
              <button
                key={file.id}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors"
                style={{
                  background: i === selected ? '#37373d' : 'transparent',
                  color: '#d4d4d4',
                  textAlign: 'left',
                }}
                onMouseEnter={() => setSelected(i)}
                onClick={() => onFileOpen(file.id)}
              >
                <span className="text-base">{file.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-sm truncate">{file.name}</p>
                  <p className="text-[10px]" style={{ color: '#858585' }}>{file.path}</p>
                </div>
                <span className="text-[10px]" style={{ color: '#858585' }}>{file.language}</span>
              </button>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default VsCommandPalette;

