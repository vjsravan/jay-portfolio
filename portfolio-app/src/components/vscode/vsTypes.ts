export type FileId = 'readme' | 'experience' | 'skills' | 'projects' | 'ai-lab' | 'contact';

export interface VsFile {
  id: FileId;
  name: string;
  icon: string;
  language: string;
  path: string;
  langBadge: string;
}

export const ALL_FILES: VsFile[] = [
  {
    id: 'readme',
    name: 'README.md',
    icon: '📋',
    language: 'Markdown',
    langBadge: 'Markdown',
    path: 'jay-portfolio / README.md',
  },
  {
    id: 'experience',
    name: 'experience.ts',
    icon: '📘',
    language: 'TypeScript',
    langBadge: 'TypeScript',
    path: 'jay-portfolio / src / experience.ts',
  },
  {
    id: 'skills',
    name: 'skills.json',
    icon: '📊',
    language: 'JSON',
    langBadge: 'JSON',
    path: 'jay-portfolio / src / skills.json',
  },
  {
    id: 'projects',
    name: 'projects.tsx',
    icon: '⚛️',
    language: 'TypeScript JSX',
    langBadge: 'TSX',
    path: 'jay-portfolio / src / projects.tsx',
  },
  {
    id: 'ai-lab',
    name: 'ai-lab.ts',
    icon: '🤖',
    language: 'TypeScript',
    langBadge: 'TypeScript',
    path: 'jay-portfolio / src / ai-lab.ts',
  },
  {
    id: 'contact',
    name: 'contact.ts',
    icon: '📬',
    language: 'TypeScript',
    langBadge: 'TypeScript',
    path: 'jay-portfolio / src / contact.ts',
  },
];


