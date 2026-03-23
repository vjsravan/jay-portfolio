import React from 'react';
import { X } from 'lucide-react';
import type { FileId } from './vsTypes';
import { ALL_FILES } from './vsTypes';

interface Props {
  openFiles: FileId[];
  activeFile: FileId;
  onFileSelect: (id: FileId) => void;
  onFileClose: (id: FileId) => void;
}

const VsTabBar: React.FC<Props> = ({ openFiles, activeFile, onFileSelect, onFileClose }) => {
  return (
    <div
      className="flex items-stretch overflow-x-auto flex-shrink-0"
      style={{
        background: '#2d2d2d',
        borderBottom: '1px solid #252526',
        scrollbarWidth: 'none',
        height: 35,
      }}
    >
      {openFiles.map(fid => {
        const file = ALL_FILES.find(f => f.id === fid)!;
        const isActive = fid === activeFile;
        return (
          <div
            key={fid}
            className="flex items-center gap-1.5 px-3 cursor-pointer flex-shrink-0 group border-r transition-colors"
            style={{
              background: isActive ? '#1e1e1e' : '#2d2d2d',
              borderRightColor: '#252526',
              borderTop: isActive ? '1px solid #007acc' : '1px solid transparent',
              minWidth: 100,
              maxWidth: 160,
            }}
            onClick={() => onFileSelect(fid)}
          >
            <span className="text-sm flex-shrink-0">{file.icon}</span>
            <span
              className="text-xs font-mono truncate flex-1"
              style={{ color: isActive ? '#ffffff' : '#8e8e8e' }}
            >
              {file.name}
            </span>
            <button
              className="flex-shrink-0 rounded hover:bg-[#3c3c3c] p-0.5 transition-colors opacity-0 group-hover:opacity-100"
              style={{ color: '#8e8e8e' }}
              onClick={e => { e.stopPropagation(); onFileClose(fid); }}
            >
              <X size={12} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default VsTabBar;

