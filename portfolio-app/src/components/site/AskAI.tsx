import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, Sparkles, X } from 'lucide-react';
import { aiAssistantContext } from '../../data/resume';
import { activity, posts, syncedAt } from '../../data/live';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`;

/**
 * The hand-written résumé context plus whatever the last sync pulled in, so
 * the assistant knows about a post or a commit from this week without anyone
 * updating its prompt.
 */
const CONTEXT = `${aiAssistantContext}

LIVE DATA (auto-synced ${syncedAt?.toISOString().slice(0, 10) ?? 'recently'} from Medium and GitHub; newer than anything above):
Medium posts, newest first:
${posts.map(p => `- "${p.title}" (${p.published.slice(0, 10)}, ${p.readMinutes} min) ${p.url}`).join('\n')}
Recent commits:
${activity.slice(0, 10).map(c => `- ${c.repo}: ${c.message} (${c.date.slice(0, 10)})`).join('\n')}

Keep answers under 120 words unless asked for detail. Plain text, no markdown headings.`;

const STARTERS = [
  "What's Jay's AI engineering work?",
  'How does the LLM Gateway cut costs?',
  'What did Jay build at UPS?',
  "What's the latest thing Jay wrote?",
];

interface Message { role: 'user' | 'model'; text: string }

export default function AskAI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottom = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pending = useRef<string | null>(null);

  useEffect(() => {
    const onOpen = (e: Event) => {
      setOpen(true);
      const q = (e as CustomEvent<string | undefined>).detail;
      if (q) pending.current = q;
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('open-assistant', onOpen);
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('open-assistant', onOpen); window.removeEventListener('keydown', onKey); };
  }, []);

  useEffect(() => { bottom.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const history = [...messages, { role: 'user' as const, text: text.trim() }];
    setMessages(history);
    setInput('');

    if (!API_KEY || API_KEY === 'your_gemini_api_key_here') {
      setMessages([...history, { role: 'model', text: 'The assistant is offline in this build. Email jay.sravan.dev@gmail.com and Jay will answer directly.' }]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: CONTEXT }] },
          contents: history.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
          generationConfig: { maxOutputTokens: 400, temperature: 0.6 },
        }),
      });
      const data = await res.json();
      const reply: string =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ??
        (data?.error?.message ? `Something went wrong: ${data.error.message}` : 'No response. Please try again.');
      setMessages(m => [...m, { role: 'model', text: reply }]);
    } catch {
      setMessages(m => [...m, { role: 'model', text: 'Network error. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open) return;
    setTimeout(() => inputRef.current?.focus(), 250);
    if (pending.current) { send(pending.current); pending.current = null; }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once per open, with the send of that render
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.aside
            role="dialog"
            aria-label="Ask Jay's AI assistant"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-[var(--line)] bg-[#080a10]"
          >
            <header className="flex items-center gap-3 border-b border-[var(--line)] px-5 py-4">
              <span className="grid h-9 w-9 place-items-center rounded-full" style={{ background: 'linear-gradient(135deg, rgba(255,180,84,0.25), rgba(255,217,168,0.25))' }}>
                <Sparkles size={16} className="text-[var(--accent)]" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">Ask about Jay</p>
                <p className="text-[11px] text-[var(--faint)]">Grounded in the résumé and this week's synced activity</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-2 text-[var(--muted)] hover:bg-[var(--surface-hi)] hover:text-white">
                <X size={18} />
              </button>
            </header>

            <div className="scroll-thin flex-1 space-y-3 overflow-y-auto px-5 py-5">
              {messages.length === 0 && (
                <div className="space-y-2">
                  <p className="mb-3 text-sm text-[var(--muted)]">Ask about projects, experience, skills, or what Jay is working on right now.</p>
                  {STARTERS.map(s => (
                    <button key={s} onClick={() => send(s)} className="card block w-full px-4 py-3 text-left text-sm text-[var(--text)] transition hover:border-[var(--line-hi)]">
                      {s}
                    </button>
                  ))}
                </div>
              )}
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.role === 'user' ? 'ml-auto bg-[var(--text)] text-[var(--bg)]' : 'card text-[var(--text)]'}`}
                >
                  {m.text}
                </motion.div>
              ))}
              {loading && (
                <div className="card flex w-16 justify-center gap-1 px-4 py-3">
                  {[0, 1, 2].map(i => (
                    <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />
                  ))}
                </div>
              )}
              <div ref={bottom} />
            </div>

            <form onSubmit={e => { e.preventDefault(); send(input); }} className="flex gap-2 border-t border-[var(--line)] p-4">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask anything…"
                aria-label="Message"
                className="flex-1 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm text-white outline-none placeholder:text-[var(--faint)] focus:border-[var(--accent)]"
              />
              <button type="submit" disabled={!input.trim() || loading} aria-label="Send" className="grid h-11 w-11 place-items-center rounded-full bg-[var(--text)] text-[var(--bg)] transition disabled:opacity-30">
                <ArrowUp size={18} />
              </button>
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
