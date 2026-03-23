import React from 'react';
import type { VsFile } from './vsTypes';
import { Terminal } from 'lucide-react';

interface Props {
  activeFile: VsFile;
  showTerminal: boolean;
  onToggleTerminal: () => void;
}

const VsStatusBar: React.FC<Props> = ({ activeFile, showTerminal: _showTerminal, onToggleTerminal }) => {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      className="flex items-center justify-between px-3 flex-shrink-0 select-none"
      style={{
        background: '#007acc',
        height: 22,
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        fontSize: 11,
        color: '#ffffff',
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1 opacity-90">
          <span>⎇</span>
          <span>main</span>
        </span>
        <span className="opacity-70">✓ 0</span>
        <span className="opacity-70">⚠ 1 info</span>
      </div>

      {/* Center */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleTerminal}
          className="flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity"
          title="Toggle Terminal (Ctrl+`)"
        >
          <Terminal size={11} />
          <span>Terminal</span>
        </button>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <span className="opacity-80">{activeFile.langBadge}</span>
        <span className="opacity-80">Ln 1, Col 1</span>
        <span className="opacity-80">UTF-8</span>
        <span className="opacity-80">Spaces: 2</span>
        <span
          className="px-2 py-0.5 rounded-sm opacity-95"
          style={{ background: 'rgba(255,255,255,0.15)', fontSize: 10 }}
        >
          ☁️ AWS Certified
        </span>
        <span className="opacity-60">{time}</span>
      </div>
    </div>
  );
};

export default VsStatusBar;

