import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import type { FileId } from './vsTypes';
import { personalInfo } from '../../data/resume';

const PROMPT = 'jay-portfolio %';

interface HistoryEntry {
  type: 'input' | 'output' | 'error';
  text: string | React.ReactNode;
}

const COMMANDS: Record<string, () => React.ReactNode> = {
  help: () => (
    <div className="space-y-1" style={{ color: '#4ec9b0' }}>
      <p style={{ color: '#dcdcaa' }}>Available commands:</p>
      <p><span style={{ color: '#9cdcfe' }}>  jay about</span>      — Who is Jay?</p>
      <p><span style={{ color: '#9cdcfe' }}>  jay skills</span>     — Tech stack overview</p>
      <p><span style={{ color: '#9cdcfe' }}>  jay experience</span> — Career history</p>
      <p><span style={{ color: '#9cdcfe' }}>  jay projects</span>   — Key projects</p>
      <p><span style={{ color: '#9cdcfe' }}>  jay contact</span>    — Get in touch</p>
      <p><span style={{ color: '#9cdcfe' }}>  git log</span>        — Career git log</p>
      <p><span style={{ color: '#9cdcfe' }}>  npm run hire-jay</span>— 🚀</p>
      <p><span style={{ color: '#9cdcfe' }}>  clear</span>          — Clear terminal</p>
    </div>
  ),
  'jay about': () => (
    <div className="space-y-1">
      <p style={{ color: '#4ec9b0' }}>👨‍💻 Jay Sravan Vadlamudi</p>
      <p style={{ color: '#d4d4d4' }}>   Sr. Software Engineer & Applied AI Engineer</p>
      <p style={{ color: '#d4d4d4' }}>   9+ years · Java Full Stack · AI Explorer</p>
      <p style={{ color: '#858585' }}>   📍 United States · Remote / Hybrid</p>
      <p style={{ color: '#858585' }}>   ✉️  {personalInfo.email}</p>
    </div>
  ),
  'jay skills': () => (
    <div className="space-y-1">
      <p style={{ color: '#dcdcaa' }}>Tech Stack:</p>
      <p><span style={{ color: '#c586c0' }}>  Languages:</span><span style={{ color: '#ce9178' }}> Java 8-21 · TypeScript · Python · SQL</span></p>
      <p><span style={{ color: '#c586c0' }}>  Frontend: </span><span style={{ color: '#ce9178' }}> React · Angular (v21) · Redux</span></p>
      <p><span style={{ color: '#c586c0' }}>  Backend:  </span><span style={{ color: '#ce9178' }}> Spring Boot · Spring WebFlux · Kafka</span></p>
      <p><span style={{ color: '#c586c0' }}>  Cloud:    </span><span style={{ color: '#ce9178' }}> AWS · GCP · OpenShift · Docker · ArgoCD</span></p>
      <p><span style={{ color: '#c586c0' }}>  AI/LLM:   </span><span style={{ color: '#ce9178' }}> GitHub Copilot · OpenAI API · RAG · Agents</span></p>
    </div>
  ),
  'jay experience': () => (
    <div className="space-y-1">
      <p style={{ color: '#dcdcaa' }}>Career Timeline:</p>
      <p><span style={{ color: '#06b6d4' }}>  ● 2024–Now   </span><span style={{ color: '#d4d4d4' }}>UPS — Sr. SDE (Java Full Stack)</span></p>
      <p><span style={{ color: '#8b5cf6' }}>  ● 2022–2024  </span><span style={{ color: '#d4d4d4' }}>Mercedes-Benz Financial — SDE</span></p>
      <p><span style={{ color: '#10b981' }}>  ● 2020–2022  </span><span style={{ color: '#d4d4d4' }}>United Healthcare — Full Stack Dev</span></p>
      <p><span style={{ color: '#f59e0b' }}>  ● 2017–2019  </span><span style={{ color: '#d4d4d4' }}>Wells Fargo — Java Full Stack Dev</span></p>
    </div>
  ),
  'jay projects': () => (
    <div className="space-y-1">
      <p style={{ color: '#dcdcaa' }}>Key Projects:</p>
      <p><span style={{ color: '#06b6d4' }}>  📦</span><span style={{ color: '#d4d4d4' }}> Customs Processing Engine (UPS) — Java 21 + WebFlux</span></p>
      <p><span style={{ color: '#8b5cf6' }}>  🚗</span><span style={{ color: '#d4d4d4' }}> Loan & Lease Tracker (MBFS) — Angular 17 + Spring Boot</span></p>
      <p><span style={{ color: '#10b981' }}>  🏥</span><span style={{ color: '#d4d4d4' }}> Health Claims Portal (UHC) — GraphQL + Kafka + AWS</span></p>
      <p><span style={{ color: '#f59e0b' }}>  🏦</span><span style={{ color: '#d4d4d4' }}> Payment Dashboard (WF) — React + Redux + Kafka</span></p>
      <p><span style={{ color: '#ec4899' }}>  🤖</span><span style={{ color: '#d4d4d4' }}> LLM Log Summarizer (AI Lab) — GPT-4 + Python</span></p>
    </div>
  ),
  'jay contact': () => (
    <div className="space-y-1">
      <p style={{ color: '#4ec9b0' }}>📬 Contact Jay:</p>
      <p><span style={{ color: '#9cdcfe' }}>  Email:    </span><span style={{ color: '#ce9178' }}>{personalInfo.email}</span></p>
      <p><span style={{ color: '#9cdcfe' }}>  LinkedIn: </span><span style={{ color: '#ce9178' }}>linkedin.com/in/jaysravan-fullstack</span></p>
      <p><span style={{ color: '#9cdcfe' }}>  GitHub:   </span><span style={{ color: '#ce9178' }}>github.com/vjsravan</span></p>
      <p style={{ color: '#6a9955' }}>  // Status: Open to senior engineering roles & AI projects</p>
    </div>
  ),
  'git log': () => (
    <div className="space-y-1 font-mono" style={{ fontSize: 11 }}>
      <p><span style={{ color: '#f59e0b' }}>commit a3f9d81</span> <span style={{ color: '#6a9955' }}>(HEAD → main)</span></p>
      <p style={{ color: '#d4d4d4' }}>   feat: Join UPS as Sr. SDE – Java Full Stack (2024)</p>
      <p><span style={{ color: '#f59e0b' }}>commit 72c1e54</span></p>
      <p style={{ color: '#d4d4d4' }}>   feat: Mercedes-Benz MBFS platform modernization (2022)</p>
      <p><span style={{ color: '#f59e0b' }}>commit 3b8a210</span></p>
      <p style={{ color: '#d4d4d4' }}>   feat: United Healthcare claims portal + HIPAA (2020)</p>
      <p><span style={{ color: '#f59e0b' }}>commit 9d4f67c</span></p>
      <p style={{ color: '#d4d4d4' }}>   feat: Wells Fargo payment dashboard – React + Kafka (2017)</p>
      <p><span style={{ color: '#f59e0b' }}>commit 1a2b3c4</span></p>
      <p style={{ color: '#d4d4d4' }}>   init: MS in Computer Science – Western Illinois Univ (2021)</p>
    </div>
  ),
  'npm run hire-jay': () => (
    <div className="space-y-1">
      <p style={{ color: '#4ec9b0' }}>&gt; jay-portfolio@9.0.0 hire-jay</p>
      <p style={{ color: '#4ec9b0' }}>&gt; node scripts/hire.js</p>
      <p></p>
      <p style={{ color: '#dcdcaa' }}>🚀 Initiating hire sequence...</p>
      <p style={{ color: '#d4d4d4' }}>   ✓ 9+ years of engineering experience — loaded</p>
      <p style={{ color: '#d4d4d4' }}>   ✓ Java 21 + Spring WebFlux — battle tested</p>
      <p style={{ color: '#d4d4d4' }}>   ✓ AI integration skills — actively learning</p>
      <p style={{ color: '#d4d4d4' }}>   ✓ AWS Certified — verified</p>
      <p style={{ color: '#d4d4d4' }}>   ✓ Team collaboration — excellent</p>
      <p></p>
      <p style={{ color: '#10b981' }}>   ✅ Build succeeded. Jay is ready to ship.</p>
      <p style={{ color: '#858585' }}>   → Send an email to: {personalInfo.email}</p>
    </div>
  ),
};

const NPM_SEQUENCE = [
  { text: 'jay-portfolio % npm install jay-sravan-vadlamudi', delay: 0, color: '#10b981' },
  { text: '', delay: 280 },
  { text: '⠋ Resolving packages...', delay: 450, color: '#858585' },
  { text: '  ✓ java@21.0.0                    ████████████ 100%', delay: 750, color: '#4ec9b0' },
  { text: '  ✓ spring-boot-webflux@3.3.0       ████████████ 100%', delay: 980, color: '#4ec9b0' },
  { text: '  ✓ angular@17.0.0                  ████████████ 100%', delay: 1190, color: '#4ec9b0' },
  { text: '  ✓ react@18.3.0                    ████████████ 100%', delay: 1380, color: '#4ec9b0' },
  { text: '  ✓ github-copilot@1.200.0           ████████████ 100%', delay: 1550, color: '#8b5cf6' },
  { text: '  ✓ openai-api@4.0.0                ████████████ 100%', delay: 1700, color: '#8b5cf6' },
  { text: '  ✓ aws-toolkit@certified           ████████████ 100%', delay: 1840, color: '#f59e0b' },
  { text: '  ✓ kafka@3.6.0                     ████████████ 100%', delay: 1970, color: '#4ec9b0' },
  { text: '  ✓ docker@latest                   ████████████ 100%', delay: 2090, color: '#06b6d4' },
  { text: '', delay: 2220 },
  { text: 'added 9 skills in 2.3s', delay: 2300, color: '#dcdcaa' },
  { text: '9 packages (9+ years of practice included)', delay: 2500, color: '#6a9955' },
  { text: '', delay: 2680 },
  { text: '✅  Successfully installed jay-sravan-vadlamudi@9.0.0', delay: 2780, color: '#10b981' },
  { text: "    Type 'help' to explore  ·  Try 'npm run hire-jay' 🚀", delay: 2980, color: '#858585' },
];

const PROBLEMS = [
  { type: 'info', file: 'experience.ts', line: 1, msg: 'Engineer with 9+ years detected — consider offering a senior role.' },
  { type: 'warning', file: 'skills.json', line: 42, msg: 'Tech stack overflowing: too many skills for one developer.' },
  { type: 'info', file: 'ai-lab.ts', line: 17, msg: 'LLM experiments detected — this engineer is ahead of the curve.' },
  { type: 'warning', file: 'contact.ts', line: 3, msg: 'status: "open" — recruiter action required immediately.' },
  { type: 'info', file: 'projects.tsx', line: 99, msg: '99.9% uptime cited — consider it a green flag.' },
];

interface Props {
  onClose: () => void;
  onFileOpen?: (id: FileId) => void;
}

const VsTerminal: React.FC<Props> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'terminal' | 'problems'>('terminal');
  const [npmLines, setNpmLines] = useState<string[]>([]);
  const [npmDone, setNpmDone] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // npm install animation on first open
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    NPM_SEQUENCE.forEach(item => {
      const t = setTimeout(() => setNpmLines(prev => [...prev, item.text]), item.delay);
      timers.push(t);
    });
    const done = setTimeout(() => setNpmDone(true), 3200);
    timers.push(done);
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, npmLines]);

  useEffect(() => {
    if (npmDone) setTimeout(() => inputRef.current?.focus(), 80);
  }, [npmDone]);

  const runCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    setHistory(h => [...h, { type: 'input', text: cmd }]);
    if (trimmed === 'clear') { setHistory([]); return; }
    const handler = COMMANDS[trimmed];
    if (handler) {
      setHistory(h => [...h, { type: 'output', text: handler() }]);
    } else if (trimmed !== '') {
      setHistory(h => [...h, {
        type: 'error',
        text: <span><span style={{ color: '#f48771' }}>command not found: </span><span style={{ color: '#d4d4d4' }}>{cmd}</span><span style={{ color: '#858585' }}> — try </span><span style={{ color: '#dcdcaa' }}>help</span></span>,
      }]);
    }
    setCmdHistory(prev => [cmd, ...prev.slice(0, 49)]);
    setHistIdx(-1);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { runCommand(input); setInput(''); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); const idx = Math.min(histIdx + 1, cmdHistory.length - 1); setHistIdx(idx); setInput(cmdHistory[idx] ?? ''); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); const idx = Math.max(histIdx - 1, -1); setHistIdx(idx); setInput(idx === -1 ? '' : cmdHistory[idx]); }
  };

  return (
    <div className="h-full flex flex-col" style={{ background: '#1e1e1e', fontFamily: "'Cascadia Code','Fira Code',monospace" }} onClick={() => npmDone && inputRef.current?.focus()}>
      {/* Panel tabs */}
      <div className="flex items-center justify-between px-2 flex-shrink-0" style={{ background: '#252526', borderBottom: '1px solid #3c3c3c', height: 30 }}>
        <div className="flex items-center">
          {(['terminal', 'problems'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className="px-3 text-xs flex items-center h-[30px] border-b-2 transition-colors" style={{ color: activeTab === tab ? '#d4d4d4' : '#858585', borderBottomColor: activeTab === tab ? '#0078d4' : 'transparent' }}>
              {tab.toUpperCase()}
              {tab === 'problems' && <span className="ml-1.5 text-[9px] px-1 rounded" style={{ background: '#f59e0b22', color: '#f59e0b' }}>{PROBLEMS.length}</span>}
            </button>
          ))}
        </div>
        <button onClick={onClose} className="p-1 rounded hover:bg-[#3c3c3c]" style={{ color: '#858585' }}><X size={13} /></button>
      </div>

      {/* Problems panel */}
      {activeTab === 'problems' && (
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#424242 transparent' }}>
          {PROBLEMS.map((p, i) => (
            <div key={i} className="flex items-start gap-3 px-3 py-2 hover:bg-[#2a2d2e] cursor-default border-b" style={{ borderColor: '#2a2a2a', fontSize: 11 }}>
              <span className="flex-shrink-0 mt-0.5" style={{ color: p.type === 'warning' ? '#f59e0b' : '#9cdcfe' }}>{p.type === 'warning' ? '⚠' : 'ℹ'}</span>
              <div className="flex-1 min-w-0">
                <p style={{ color: '#d4d4d4' }}>{p.msg}</p>
                <p className="mt-0.5" style={{ color: '#858585' }}><span style={{ color: '#4ec9b0' }}>{p.file}</span> · line {p.line}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Terminal panel */}
      {activeTab === 'terminal' && (
        <>
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5 text-xs leading-5" style={{ scrollbarWidth: 'thin', scrollbarColor: '#424242 transparent' }}>
            {/* npm install animation */}
            {npmLines.map((line, i) => (
              <div key={i} style={{ color: NPM_SEQUENCE[i]?.color || '#d4d4d4' }}>{line || '\u00A0'}</div>
            ))}

            {/* Command history (shown after npm animation) */}
            {npmDone && history.map((entry, i) => (
              <div key={i} className="mt-0.5">
                {entry.type === 'input'
                  ? <div className="flex items-center gap-2"><span style={{ color: '#10b981' }}>{PROMPT}</span><span style={{ color: '#d4d4d4' }}>{entry.text as string}</span></div>
                  : <div className="mt-0.5">{entry.text}</div>}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input row — only shown after npm animation */}
          {npmDone && (
            <div className="flex items-center gap-2 px-3 py-1.5 flex-shrink-0" style={{ borderTop: '1px solid #3c3c3c' }}>
              <span className="text-xs flex-shrink-0" style={{ color: '#10b981' }}>{PROMPT}</span>
              <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} className="flex-1 bg-transparent outline-none text-xs" style={{ color: '#d4d4d4', caretColor: '#aeafad', fontFamily: 'inherit' }} placeholder="type a command..." spellCheck={false} autoComplete="off" />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VsTerminal;

