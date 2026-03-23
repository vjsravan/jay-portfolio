import React from 'react';
import { ChevronDown } from 'lucide-react';
import type { FileId } from './vsTypes';
import { ALL_FILES } from './vsTypes';

// Extensions panel data
const EXTENSIONS = [
  { name: 'Java Extension Pack', publisher: 'Microsoft', version: '21.0', icon: '☕', active: true },
  { name: 'Spring Boot Dashboard', publisher: 'Pivotal', version: '0.54', icon: '🍃', active: true },
  { name: 'GitHub Copilot', publisher: 'GitHub', version: '1.200', icon: '🤖', active: true },
  { name: 'AWS Toolkit', publisher: 'Amazon', version: '3.27', icon: '☁️', active: true },
  { name: 'Docker', publisher: 'Microsoft', version: '1.29', icon: '🐳', active: true },
  { name: 'GitLens', publisher: 'GitKraken', version: '15.5', icon: '🔮', active: true },
  { name: 'Angular Language Service', publisher: 'Angular', version: '17.3', icon: '🅰️', active: true },
  { name: 'Tailwind CSS IntelliSense', publisher: 'Tailwind Labs', version: '0.10', icon: '🎨', active: false },
];

interface Props {
  panel: 'files' | 'extensions';
  activeFile: FileId;
  openFiles: FileId[];
  onFileOpen: (id: FileId) => void;
}

const VsSidebar: React.FC<Props> = ({ panel, activeFile, openFiles, onFileOpen }) => {
  return (
    <div
      className="h-full flex flex-col overflow-hidden"
      style={{ background: '#252526', width: 240, borderRight: '1px solid #3c3c3c' }}
    >
      {panel === 'files' ? (
        <>
          {/* Header */}
          <div
            className="px-4 py-2 text-[11px] font-semibold tracking-widest uppercase flex-shrink-0"
            style={{ color: '#bbbbbb', letterSpacing: '0.12em' }}
          >
            Explorer
          </div>

          {/* Open editors section */}
          <div className="flex-shrink-0">
            <div
              className="flex items-center gap-1 px-2 py-1 text-[11px] uppercase tracking-wider cursor-pointer hover:bg-[#2a2d2e]"
              style={{ color: '#bbbbbb' }}
            >
              <ChevronDown size={12} />
              Open Editors
            </div>
            {openFiles.map(fid => {
              const file = ALL_FILES.find(f => f.id === fid)!;
              return (
                <button
                  key={fid}
                  onClick={() => onFileOpen(fid)}
                  className="w-full flex items-center gap-2 px-6 py-0.5 text-xs transition-colors hover:bg-[#2a2d2e]"
                  style={{
                    color: activeFile === fid ? '#ffffff' : '#bbbbbb',
                    background: activeFile === fid ? 'rgba(255,255,255,0.05)' : undefined,
                    textAlign: 'left',
                  }}
                >
                  <span className="text-sm">{file.icon}</span>
                  <span className="truncate font-mono">{file.name}</span>
                </button>
              );
            })}
          </div>

          <div className="my-1 border-t" style={{ borderColor: '#3c3c3c' }} />

          {/* Folder tree */}
          <div className="flex-shrink-0">
            <div
              className="flex items-center gap-1 px-2 py-1 text-[11px] uppercase tracking-wider"
              style={{ color: '#bbbbbb' }}
            >
              <ChevronDown size={12} />
              JAY-PORTFOLIO
            </div>

            {/* src folder */}
            <div className="pl-4">
              <div
                className="flex items-center gap-1 px-2 py-0.5 text-xs"
                style={{ color: '#bbbbbb' }}
              >
                <ChevronDown size={11} />
                <span className="font-mono">src</span>
              </div>

              <div className="pl-4">
                {ALL_FILES.map(file => (
                  <button
                    key={file.id}
                    onClick={() => onFileOpen(file.id)}
                    className="w-full flex items-center gap-2 px-2 py-0.5 text-xs rounded transition-colors hover:bg-[#2a2d2e] group"
                    style={{
                      color: activeFile === file.id ? '#ffffff' : '#cccccc',
                      background: activeFile === file.id ? '#37373d' : undefined,
                      textAlign: 'left',
                    }}
                  >
                    <span>{file.icon}</span>
                    <span className="font-mono truncate">{file.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1" />

          {/* Git section */}
          <div
            className="px-3 py-2 text-[10px] flex items-center gap-2 flex-shrink-0"
            style={{ borderTop: '1px solid #3c3c3c', color: '#858585' }}
          >
            <span style={{ color: '#c586c0' }}>⎇</span>
            <span>main</span>
            <span className="ml-auto" style={{ color: '#6a9955' }}>✓ clean</span>
          </div>
        </>
      ) : (
        /* Extensions panel */
        <>
          <div
            className="px-4 py-2 text-[11px] font-semibold tracking-widest uppercase flex-shrink-0"
            style={{ color: '#bbbbbb' }}
          >
            Extensions
          </div>
          <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#424242 transparent' }}>
            <div
              className="px-3 py-1 text-[10px] uppercase tracking-wider"
              style={{ color: '#858585' }}
            >
              Installed — Skills & Tools ({EXTENSIONS.length})
            </div>
            {EXTENSIONS.map(ext => (
              <div
                key={ext.name}
                className="px-3 py-2 hover:bg-[#2a2d2e] cursor-default"
              >
                <div className="flex items-start gap-2">
                  <span className="text-xl flex-shrink-0 mt-0.5">{ext.icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium truncate" style={{ color: '#d4d4d4' }}>{ext.name}</p>
                    <p className="text-[10px]" style={{ color: '#858585' }}>
                      {ext.publisher} · v{ext.version}
                    </p>
                    {ext.active && (
                      <span
                        className="inline-block mt-0.5 text-[9px] px-1.5 py-0.5 rounded"
                        style={{ background: 'rgba(78,201,176,0.15)', color: '#4ec9b0', border: '1px solid rgba(78,201,176,0.3)' }}
                      >
                        ● Active
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default VsSidebar;

