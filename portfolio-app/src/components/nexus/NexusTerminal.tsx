import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { personalInfo, skills, experiences, projects, yearsLabel } from '../../data/resume';
import { getCachedVisitorCount, fetchVisitorCount } from '../../lib/visitors';

/**
 * Hidden hacker terminal — toggled with the backtick key (`) or the
 * `nexus-terminal` window event. Recruiters love this stuff.
 */

interface Line { text: string; color?: string; }

const C = {
  cyan: '#00d4ff',
  green: '#00ff88',
  magenta: '#ff006e',
  purple: '#bd00ff',
  orange: '#ff6b00',
  dim: 'rgba(255,255,255,0.45)',
  white: 'rgba(255,255,255,0.85)',
};

const BANNER: Line[] = [
  { text: ' ┌─────────────────────────────────────────────┐', color: C.cyan },
  { text: ' │  NEXUS TERMINAL v2.0 · guest@jsv-portfolio  │', color: C.cyan },
  { text: ' └─────────────────────────────────────────────┘', color: C.cyan },
  { text: '', },
  { text: ' Type "help" to list commands. ESC or "exit" to close.', color: C.dim },
  { text: '', },
];

const HELP: Line[] = [
  { text: '  whoami          who is this guy', color: C.white },
  { text: '  skills          the full arsenal', color: C.white },
  { text: '  experience      where I broke and fixed things', color: C.white },
  { text: '  projects        things I built for fun', color: C.white },
  { text: '  ai              my AI engineering story', color: C.white },
  { text: '  stack           what powers this site', color: C.white },
  { text: '  visitors        live view counter', color: C.white },
  { text: '  contact         reach out (please do)', color: C.white },
  { text: '  open <section>  jump to a section (e.g. open contact)', color: C.white },
  { text: '  matrix          you know you want to', color: C.green },
  { text: '  sudo hire-jay   requires no privileges', color: C.magenta },
  { text: '  clear · exit', color: C.dim },
];

const SECTIONS = ['hero', 'experience', 'skills', 'projects', 'ailab', 'contact'];

const NexusTerminal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [matrix, setMatrix] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Global toggles: backtick key + window event (for the toolbar button)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';
      if (e.key === '`' && !typing) { e.preventDefault(); setOpen(o => !o); }
      if (e.key === 'Escape') setOpen(false);
    };
    const onOpen = () => setOpen(o => !o);
    window.addEventListener('keydown', onKey);
    window.addEventListener('nexus-terminal', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('nexus-terminal', onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines, open]);

  // Matrix rain — runs for ~4.5 s on a full-screen canvas
  useEffect(() => {
    if (!matrix || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const glyphs = 'アイウエオカキクケコサシスセソ0123456789JAYVADLMUNI';
    const fontSize = 16;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: cols }, () => Math.random() * -12);
    const id = setInterval(() => {
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff88';
      ctx.font = `${fontSize}px monospace`;
      drops.forEach((y, i) => {
        const ch = glyphs[Math.floor(Math.random() * glyphs.length)];
        ctx.fillText(ch, i * fontSize, y * fontSize);
        drops[i] = y * fontSize > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
      });
    }, 40);
    const stop = setTimeout(() => setMatrix(false), 6000);
    return () => { clearInterval(id); clearTimeout(stop); };
  }, [matrix]);

  const print = useCallback((newLines: Line[]) => {
    setLines(prev => [...prev, ...newLines, { text: '' }]);
  }, []);

  const run = useCallback((raw: string) => {
    const cmd = raw.trim();
    if (!cmd) return;
    setLines(prev => [...prev, { text: `guest@nexus:~$ ${cmd}`, color: C.green }]);
    setHistory(h => [cmd, ...h]);
    setHistIdx(-1);

    const [name, ...args] = cmd.toLowerCase().split(/\s+/);

    switch (name) {
      case 'help':
        print(HELP);
        break;

      case 'whoami':
        print([
          { text: `  ${personalInfo.name}`, color: C.cyan },
          { text: `  ${personalInfo.title} · ${personalInfo.location}`, color: C.white },
          { text: `  ${personalInfo.subtitle}`, color: C.dim },
          { text: `  ${yearsLabel} yrs · 25+ microservices · 400K+ records/day · AWS Certified`, color: C.green },
        ]);
        break;

      case 'skills':
        print([
          { text: `  LANGUAGES   ${skills.languages.join(', ')}`, color: C.white },
          { text: `  BACKEND     ${skills.backend.slice(0, 8).join(', ')}…`, color: C.white },
          { text: `  AI/ML       ${skills.ai.join(', ')}`, color: C.magenta },
          { text: `  CLOUD       ${skills.cloud.slice(0, 7).join(', ')}…`, color: C.white },
          { text: `  MESSAGING   ${skills.messaging.slice(0, 4).join(', ')}`, color: C.white },
          { text: '  Full tree → "open skills"', color: C.dim },
        ]);
        break;

      case 'experience':
      case 'exp':
        print(
          experiences.flatMap(e => [
            { text: `  ${e.current ? '►' : '·'} ${e.company}`, color: e.current ? C.cyan : C.white },
            { text: `    ${e.role} · ${e.period}`, color: C.dim },
          ]),
        );
        break;

      case 'projects':
        print(
          projects.flatMap(p => [
            { text: `  ${p.icon} ${p.title}`, color: C.orange },
            { text: `    ${p.tech.join(' · ')}`, color: C.dim },
          ]),
        );
        break;

      case 'ai':
        print([
          { text: '  ► LLM log summarisation @ UPS — OpenAI API + RAG, ~60% faster MTTR', color: C.magenta },
          { text: '  ► MLops pipelines integrated into enterprise Java platforms', color: C.white },
          { text: '  ► Copilot-driven refactoring across 25+ production microservices', color: C.white },
          { text: '  ► This portfolio ships a live Gemini-powered RAG assistant', color: C.white },
          { text: '  Try it → "open ailab"', color: C.dim },
        ]);
        break;

      case 'stack':
        print([
          { text: '  React 19 · TypeScript · Vite · Tailwind · Framer Motion', color: C.cyan },
          { text: '  Gemini API assistant · canvas FX · GitHub Actions → Pages', color: C.white },
          { text: '  Source: github.com/vjsravan/jay-portfolio', color: C.dim },
        ]);
        break;

      case 'visitors': {
        const cached = getCachedVisitorCount();
        if (cached !== null) {
          print([{ text: `  ◉ ${cached.toLocaleString()} neural links established (live)`, color: C.green }]);
        } else {
          fetchVisitorCount().then(v =>
            print([
              v !== null
                ? { text: `  ◉ ${v.toLocaleString()} neural links established (live)`, color: C.green }
                : { text: '  counter offline — the void stares back', color: C.dim },
            ]),
          );
        }
        break;
      }

      case 'contact':
        print([
          { text: `  MAIL      ${personalInfo.email}`, color: C.cyan },
          { text: `  LINKEDIN  ${personalInfo.linkedin}`, color: C.cyan },
          { text: `  GITHUB    ${personalInfo.github}`, color: C.cyan },
          { text: '  Response latency: < 24h. Better uptime than most APIs.', color: C.dim },
        ]);
        break;

      case 'open': {
        const section = args[0];
        if (section && SECTIONS.includes(section)) {
          window.dispatchEvent(new CustomEvent('nexus-navigate', { detail: section }));
          print([{ text: `  → navigating to ${section.toUpperCase()}`, color: C.green }]);
          setOpen(false);
        } else {
          print([{ text: `  usage: open <${SECTIONS.join('|')}>`, color: C.dim }]);
        }
        break;
      }

      case 'matrix':
        setMatrix(true);
        print([{ text: '  wake up, recruiter…', color: C.green }]);
        break;

      case 'sudo':
        if (args.join(' ').includes('hire')) {
          print([
            { text: '  [sudo] password for guest: ********', color: C.dim },
            { text: '  ACCESS GRANTED — initiating hire sequence', color: C.green },
            { text: '  ████████████████████████ 100%', color: C.green },
            { text: '  offer_letter.pdf generated. Just kidding — but the email works:', color: C.white },
            { text: `  → ${personalInfo.email}`, color: C.cyan },
          ]);
        } else {
          print([{ text: '  guest is not in the sudoers file. This incident will be reported.', color: C.magenta }]);
        }
        break;

      case 'clear':
        setLines([]);
        break;

      case 'exit':
        setOpen(false);
        break;

      default:
        print([{ text: `  command not found: ${name} — try "help"`, color: C.magenta }]);
    }
  }, [print]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    run(input);
    setInput('');
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      if (history[next]) { setHistIdx(next); setInput(history[next]); }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = histIdx - 1;
      setHistIdx(next < 0 ? -1 : next);
      setInput(next < 0 ? '' : history[next]);
    }
  };

  return (
    <>
      {matrix && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 90, opacity: 0.95 }}
        />
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 80, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 10 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              className="w-full flex flex-col rounded-xl overflow-hidden"
              style={{
                maxWidth: 780,
                height: 'min(70vh, 560px)',
                background: 'rgba(2,6,10,0.97)',
                border: '1px solid rgba(0,255,136,0.3)',
                boxShadow: '0 0 40px rgba(0,255,136,0.15), 0 24px 80px rgba(0,0,0,0.8)',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Title bar */}
              <div
                className="flex items-center gap-2 px-3.5 py-2.5 flex-shrink-0"
                style={{ background: 'rgba(0,255,136,0.05)', borderBottom: '1px solid rgba(0,255,136,0.18)' }}
              >
                {['#ff5f57', '#febc2e', '#28c840'].map(c => (
                  <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.85 }} />
                ))}
                <span className="font-mono text-[10px] ml-2 tracking-widest" style={{ color: 'rgba(0,255,136,0.6)' }}>
                  guest@nexus — zsh
                </span>
                <div className="flex-1" />
                <button
                  onClick={() => setOpen(false)}
                  className="font-mono text-[10px] px-2 rounded hover:opacity-70"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  ESC ✕
                </button>
              </div>

              {/* Output */}
              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto nx-scroll px-4 py-3 font-mono text-[12px] leading-relaxed"
                onClick={() => inputRef.current?.focus()}
              >
                {lines.map((l, i) => (
                  <div key={i} style={{ color: l.color ?? C.white, whiteSpace: 'pre-wrap', minHeight: '1.2em' }}>
                    {l.text}
                  </div>
                ))}
                {/* Prompt */}
                <form onSubmit={onSubmit} className="flex items-center gap-2">
                  <span style={{ color: C.green }}>guest@nexus:~$</span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={onInputKey}
                    spellCheck={false}
                    autoCapitalize="none"
                    autoComplete="off"
                    enterKeyHint="go"
                    className="flex-1 bg-transparent outline-none font-mono text-[12px]"
                    style={{ color: C.white, caretColor: C.green }}
                  />
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NexusTerminal;
