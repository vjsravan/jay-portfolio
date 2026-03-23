import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo, skills, experiences, education, certifications } from '../../data/resume';

interface TerminalLine {
  type: 'command' | 'output' | 'error' | 'success' | 'heading' | 'separator';
  text: string;
}

const PROMPT = 'jay@nexus-os:~$';

const WELCOME: TerminalLine[] = [
  { type: 'heading',   text: '╔══════════════════════════════════════════════════════╗' },
  { type: 'heading',   text: '║         NEXUS OS Terminal v2.0   jay@nexus-os        ║' },
  { type: 'heading',   text: '╚══════════════════════════════════════════════════════╝' },
  { type: 'output',    text: 'Type `help` to see available commands.' },
  { type: 'separator', text: '' },
];

function buildHelp(): TerminalLine[] {
  return [
    { type: 'success',   text: 'Available commands:' },
    { type: 'output',    text: '  whoami       — Professional profile' },
    { type: 'output',    text: '  skills       — Technical skill matrix' },
    { type: 'output',    text: '  experience   — Work history timeline' },
    { type: 'output',    text: '  projects     — Key project highlights' },
    { type: 'output',    text: '  ai           — AI engineering capabilities' },
    { type: 'output',    text: '  education    — Academic background' },
    { type: 'output',    text: '  contact      — How to reach Jay' },
    { type: 'output',    text: '  date         — Current date & time' },
    { type: 'output',    text: '  clear        — Clear terminal output' },
    { type: 'output',    text: '  sudo hire jay — Best decision of your career 🚀' },
    { type: 'separator', text: '' },
  ];
}

function buildWhoami(): TerminalLine[] {
  return [
    { type: 'separator', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
    { type: 'success',   text: `  ${personalInfo.name}` },
    { type: 'heading',   text: `  ${personalInfo.title} | ${personalInfo.subtitle}` },
    { type: 'separator', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
    { type: 'output',    text: `  Experience : ${personalInfo.yearsOfExperience}+ years` },
    { type: 'output',    text: `  Current    : UPS — Parsippany, NJ` },
    { type: 'output',    text: `  Focus      : Java · Spring Boot · React · AI Engineering` },
    { type: 'success',   text: `  Email      : ${personalInfo.email}` },
    { type: 'separator', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
    { type: 'separator', text: '' },
  ];
}

function buildSkills(): TerminalLine[] {
  return [
    { type: 'success',   text: '  ◈ Technical Skill Matrix' },
    { type: 'separator', text: '  ─────────────────────────────────────────' },
    { type: 'output',    text: `  Languages  : ${skills.languages.join(', ')}` },
    { type: 'output',    text: `  Frontend   : ${skills.frontend.join(', ')}` },
    { type: 'output',    text: `  Backend    : ${skills.backend.slice(0, 6).join(', ')}...` },
    { type: 'heading',   text: `  AI/ML      : ${skills.ai.join(', ')}` },
    { type: 'output',    text: `  Cloud      : ${skills.cloud.join(', ')}` },
    { type: 'output',    text: `  Databases  : ${skills.databases.join(', ')}` },
    { type: 'output',    text: `  Messaging  : ${skills.messaging.join(', ')}` },
    { type: 'output',    text: `  Security   : ${skills.security.join(', ')}` },
    { type: 'separator', text: '' },
  ];
}

function buildExperience(): TerminalLine[] {
  const lines: TerminalLine[] = [
    { type: 'success', text: '  ◈ Professional Timeline' },
    { type: 'separator', text: '  ─────────────────────────────────────────' },
  ];
  experiences.forEach((exp, i) => {
    lines.push({ type: exp.current ? 'success' : 'output', text: `  [${i + 1}] ${exp.company.padEnd(36)} ${exp.period}${exp.current ? '  ★ CURRENT' : ''}` });
    lines.push({ type: 'heading', text: `      ${exp.role}` });
    lines.push({ type: 'output',  text: `      ${exp.tech.slice(0, 5).join(' · ')}` });
    lines.push({ type: 'separator', text: '' });
  });
  return lines;
}

function buildProjects(): TerminalLine[] {
  return [
    { type: 'success',   text: '  ◈ Key Projects' },
    { type: 'separator', text: '  ─────────────────────────────────────────' },
    { type: 'heading',   text: '  [UPS] Customs Processing Platform' },
    { type: 'output',    text: '    10+ microservices | 100k+ transactions/week | 99.9% uptime' },
    { type: 'output',    text: '    Java 21 · Spring WebFlux · Apache Camel · OpenShift · ArgoCD' },
    { type: 'separator', text: '' },
    { type: 'heading',   text: '  [MBFS] Automotive Finance Platform' },
    { type: 'output',    text: '    Legacy modernization | 40% maintenance reduction' },
    { type: 'output',    text: '    Spring Boot · Angular 17 · PostgreSQL · DB2' },
    { type: 'separator', text: '' },
    { type: 'heading',   text: '  [UHC] Healthcare Claims Portal' },
    { type: 'output',    text: '    HIPAA-compliant GraphQL APIs | AWS deployment' },
    { type: 'output',    text: '    Java 8 · GraphQL · Kafka · AWS (S3, EC2, ELB)' },
    { type: 'separator', text: '' },
    { type: 'heading',   text: '  [WF] Payment Dashboard — Wells Fargo' },
    { type: 'output',    text: '    Real-time Kafka notifications | Docker + Azure' },
    { type: 'output',    text: '    React · Redux · Spring Boot · MongoDB' },
    { type: 'separator', text: '' },
  ];
}

function buildAI(): TerminalLine[] {
  return [
    { type: 'success',   text: '  ◈ AI Engineering Capabilities' },
    { type: 'separator', text: '  ─────────────────────────────────────────' },
    { type: 'heading',   text: '  Active Tools:' },
    { type: 'output',    text: '  • GitHub Copilot   — Code refactoring & test generation' },
    { type: 'output',    text: '  • ChatGPT GPT-4/5  — Architecture documentation' },
    { type: 'output',    text: '  • LLM Prompting    — Structured prompt engineering' },
    { type: 'output',    text: '  • OpenAI API       — Streaming integrations' },
    { type: 'separator', text: '' },
    { type: 'heading',   text: '  Exploring:' },
    { type: 'output',    text: '  • RAG Concepts     — Vector embeddings & retrieval' },
    { type: 'output',    text: '  • AI Log Analysis  — Error root-cause summarization' },
    { type: 'output',    text: '  • Agent Workflows  — Automated rule explanation' },
    { type: 'separator', text: '' },
  ];
}

function buildEducation(): TerminalLine[] {
  return [
    { type: 'success',   text: '  ◈ Education' },
    { type: 'separator', text: '  ─────────────────────────────────────────' },
    { type: 'heading',   text: `  ${education.degree}` },
    { type: 'output',    text: `  ${education.school}, ${education.location}` },
    { type: 'output',    text: `  Graduated: ${education.year}` },
    { type: 'separator', text: '' },
    { type: 'success',   text: '  ◈ Certifications' },
    { type: 'separator', text: '  ─────────────────────────────────────────' },
    ...certifications.map(c => ({ type: 'output' as const, text: `  ★ ${c.name} — ${c.issuer}` })),
    { type: 'separator', text: '' },
  ];
}

function buildContact(): TerminalLine[] {
  return [
    { type: 'success',   text: '  ◈ Contact Information' },
    { type: 'separator', text: '  ─────────────────────────────────────────' },
    { type: 'heading',   text: `  Email    : ${personalInfo.email}` },
    { type: 'output',    text: `  Location : ${personalInfo.location}` },
    { type: 'output',    text: '  Status   : Open to senior engineering opportunities' },
    { type: 'output',    text: '  Remote   : Fully open to remote & hybrid roles' },
    { type: 'separator', text: '' },
  ];
}

function buildHire(): TerminalLine[] {
  return [
    { type: 'output',    text: '[sudo] password for recruiter: ••••••••' },
    { type: 'output',    text: 'Verifying credentials...' },
    { type: 'output',    text: 'Running background check...' },
    { type: 'success',   text: '[  ✓  ] 9+ years experience: VERIFIED' },
    { type: 'success',   text: '[  ✓  ] Full-stack + AI skills: VERIFIED' },
    { type: 'success',   text: '[  ✓  ] Production-grade systems: VERIFIED' },
    { type: 'success',   text: '[  ✓  ] Cloud & DevOps expertise: VERIFIED' },
    { type: 'separator', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
    { type: 'success',   text: '  🎉  HIRE APPROVED! Best decision ever.  🎉' },
    { type: 'separator', text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━' },
    { type: 'heading',   text: `  Email now: ${personalInfo.email}` },
    { type: 'separator', text: '' },
  ];
}

function processCommand(cmd: string): TerminalLine[] | null {
  const trimmed = cmd.trim().toLowerCase();
  switch (trimmed) {
    case 'help': return buildHelp();
    case 'whoami': return buildWhoami();
    case 'skills': return buildSkills();
    case 'experience': case 'exp': return buildExperience();
    case 'projects': return buildProjects();
    case 'ai': return buildAI();
    case 'education': return buildEducation();
    case 'contact': return buildContact();
    case 'sudo hire jay': case 'hire jay': return buildHire();
    case 'date': return [{ type: 'output', text: `  ${new Date().toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}` }, { type: 'separator', text: '' }];
    case 'clear': return null; // handled specially
    case '': return [];
    default: return [{ type: 'error', text: `  command not found: ${cmd}. Type \`help\` for available commands.` }, { type: 'separator', text: '' }];
  }
}

const lineColors: Record<TerminalLine['type'], string> = {
  command:   '#06b6d4',
  output:    'rgba(255,255,255,0.65)',
  error:     '#ef4444',
  success:   '#10b981',
  heading:   '#8b5cf6',
  separator: 'rgba(255,255,255,0.1)',
};

const TerminalApp: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>(WELCOME);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const submit = useCallback(() => {
    if (!input.trim() && input !== '') {
      setLines(l => [...l, { type: 'separator', text: '' }]);
      setInput('');
      return;
    }
    const cmdLine: TerminalLine = { type: 'command', text: `${PROMPT} ${input}` };

    if (input.trim().toLowerCase() === 'clear') {
      setLines([]);
      setInput('');
      setHistory(h => [input, ...h].slice(0, 50));
      setHistIdx(-1);
      return;
    }

    const result = processCommand(input);
    setLines(l => [...l, cmdLine, ...(result ?? [])]);
    setHistory(h => [input, ...h].slice(0, 50));
    setHistIdx(-1);
    setInput('');
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { submit(); return; }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? '');
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? '' : history[next]);
    }
  };

  return (
    <div
      className="flex flex-col h-full font-mono text-sm"
      style={{ background: '#020617' }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Output area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-0.5" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(6,182,212,0.3) transparent' }}>
        <AnimatePresence initial={false}>
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.1 }}
              className="leading-relaxed whitespace-pre-wrap break-all text-xs md:text-sm"
              style={{ color: lineColors[line.type] }}
            >
              {line.text || '\u00A0'}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-t flex-shrink-0"
        style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(6,182,212,0.03)' }}
      >
        <span className="text-accent-cyan text-xs flex-shrink-0">{PROMPT}</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          className="flex-1 bg-transparent outline-none text-white/80 text-xs caret-accent-cyan placeholder:text-white/20"
          placeholder="type a command..."
          style={{ fontFamily: 'inherit' }}
        />
        {/* Blinking cursor indicator */}
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1.1 }}
          className="w-1.5 h-4 bg-accent-cyan/60 flex-shrink-0"
        />
      </div>
    </div>
  );
};

export default TerminalApp;

