import React from 'react';
import { Files, Puzzle, User } from 'lucide-react';

type SidebarPanel = 'files' | 'extensions';

interface Props {
  activePanel: SidebarPanel;
  sidebarVisible: boolean;
  onPanelChange: (p: SidebarPanel) => void;
}

const VsActivityBar: React.FC<Props> = ({ activePanel, sidebarVisible, onPanelChange }) => {
  const topItems: { id: SidebarPanel; Icon: React.ElementType; title: string }[] = [
    { id: 'files', Icon: Files, title: 'Explorer (Ctrl+Shift+E)' },
    { id: 'extensions', Icon: Puzzle, title: 'Extensions (Ctrl+Shift+X)' },
  ];

  return (
    <div
      className="flex flex-col items-center py-2 gap-1 flex-shrink-0"
      style={{ width: 48, background: '#333333', borderRight: '1px solid #252526' }}
    >
      {topItems.map(({ id, Icon, title }) => {
        const isActive = activePanel === id && sidebarVisible;
        return (
          <button
            key={id}
            title={title}
            onClick={() => onPanelChange(id)}
            className="relative w-10 h-10 flex items-center justify-center rounded transition-colors"
            style={{ color: isActive ? '#ffffff' : '#858585' }}
          >
            {isActive && (
              <span
                className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r"
                style={{ background: '#ffffff' }}
              />
            )}
            <Icon size={22} />
          </button>
        );
      })}

      <div className="flex-1" />

      <button
        title="Account"
        className="w-10 h-10 flex items-center justify-center rounded transition-colors"
        style={{ color: '#858585' }}
      >
        <User size={20} />
      </button>
    </div>
  );
};

export default VsActivityBar;

