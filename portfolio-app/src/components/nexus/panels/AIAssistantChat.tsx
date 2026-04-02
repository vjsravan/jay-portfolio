import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { aiAssistantContext } from '../../../data/resume';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`;

interface Message {
  role: 'user' | 'model';
  text: string;
}

const STARTERS = [
  "What's Jay's AI/ML experience?",
  "Tell me about the UPS microservices",
  "What roles is Jay targeting?",
  "Explain the LLM log summariser project",
];

const AIAssistantChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;

    if (!API_KEY || API_KEY === 'your_gemini_api_key_here') {
      setError('Add VITE_GEMINI_API_KEY to your .env file to enable the AI assistant.');
      return;
    }

    setError('');
    const userMsg: Message = { role: 'user', text: text.trim() };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setLoading(true);

    try {
      const contents = newHistory.map(m => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      const res = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: aiAssistantContext }] },
          contents,
          generationConfig: {
            maxOutputTokens: 400,
            temperature: 0.7,
          },
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({})) as { error?: { message?: string } };
        const msg = errData?.error?.message ?? `HTTP ${res.status}`;
        setMessages(prev => [...prev, { role: 'model', text: `⚠️ API error: ${msg}` }]);
        return;
      }

      const data = await res.json() as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
      const reply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ??
        'No response received. Please try again.';

      setMessages(prev => [...prev, { role: 'model', text: reply }]);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setMessages(prev => [...prev, { role: 'model', text: `⚠️ ${msg}` }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <div className="flex flex-col h-full">

      {/* ── API key missing warning ── */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mb-2 px-3 py-2 rounded-lg font-mono text-[10px] leading-relaxed"
            style={{ background: 'rgba(255,0,110,0.1)', border: '1px solid rgba(255,0,110,0.3)', color: '#ff006e' }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Messages list ── */}
      <div className="flex-1 overflow-y-auto nx-scroll flex flex-col gap-2.5 pr-1 min-h-0">

        {/* Starter prompts — shown only when no messages */}
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col gap-2 mt-1"
          >
            <p className="font-mono text-[10px] text-center tracking-widest mb-1"
              style={{ color: 'rgba(255,0,110,0.45)' }}>
              ◈ SUGGESTED QUERIES
            </p>
            {STARTERS.map(s => (
              <motion.button
                key={s}
                onClick={() => send(s)}
                whileHover={{ x: 3, borderColor: 'rgba(255,0,110,0.45)' }}
                whileTap={{ scale: 0.98 }}
                className="text-left px-3 py-2 rounded-lg font-mono text-[10px] leading-relaxed transition-colors"
                style={{
                  background: 'rgba(255,0,110,0.05)',
                  border: '1px solid rgba(255,0,110,0.18)',
                  color: 'rgba(255,255,255,0.55)',
                }}
              >
                › {s}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Message bubbles */}
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div
              className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center font-mono font-bold"
              style={{
                fontSize: 8,
                background: m.role === 'model'
                  ? 'rgba(255,0,110,0.2)' : 'rgba(0,212,255,0.15)',
                border: `1px solid ${m.role === 'model' ? '#ff006e40' : '#00d4ff35'}`,
                color: m.role === 'model' ? '#ff006e' : '#00d4ff',
              }}
            >
              {m.role === 'model' ? 'AI' : 'YOU'}
            </div>

            {/* Bubble */}
            <div
              className="max-w-[88%] px-3 py-2 rounded-xl text-[11px] leading-relaxed"
              style={{
                background: m.role === 'model'
                  ? 'rgba(255,0,110,0.07)' : 'rgba(0,212,255,0.07)',
                border: `1px solid ${m.role === 'model'
                  ? 'rgba(255,0,110,0.2)' : 'rgba(0,212,255,0.18)'}`,
                color: 'rgba(255,255,255,0.82)',
                whiteSpace: 'pre-wrap',
              }}
            >
              {m.text}
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex gap-2 items-center"
            >
              <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center font-mono font-bold"
                style={{ fontSize: 8, background: 'rgba(255,0,110,0.2)', border: '1px solid #ff006e40', color: '#ff006e' }}>
                AI
              </div>
              <div className="px-3 py-2.5 rounded-xl flex gap-1"
                style={{ background: 'rgba(255,0,110,0.07)', border: '1px solid rgba(255,0,110,0.2)' }}>
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: '#ff006e' }}
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                    transition={{ duration: 0.75, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* ── Input row ── */}
      <div
        className="flex gap-2 mt-3 pt-3 flex-shrink-0"
        style={{ borderTop: '1px solid rgba(255,0,110,0.12)' }}
      >
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask about Jay's skills, experience, projects…"
          className="flex-1 rounded-lg px-3 py-2 font-mono text-[11px] outline-none"
          style={{
            background: 'rgba(255,0,110,0.06)',
            border: '1px solid rgba(255,0,110,0.2)',
            color: '#fff',
            transition: 'border-color 0.2s',
          }}
          onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,0,110,0.55)')}
          onBlur={e  => (e.currentTarget.style.borderColor = 'rgba(255,0,110,0.2)')}
        />
        <motion.button
          onClick={() => send(input)}
          disabled={!input.trim() || loading}
          whileHover={input.trim() && !loading ? { scale: 1.07 } : {}}
          whileTap={input.trim() && !loading ? { scale: 0.93 } : {}}
          data-hover
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{
            background: input.trim() && !loading
              ? 'linear-gradient(135deg, rgba(255,0,110,0.3), rgba(189,0,255,0.2))'
              : 'rgba(255,255,255,0.04)',
            border: `1px solid ${input.trim() && !loading ? 'rgba(255,0,110,0.5)' : 'rgba(255,255,255,0.1)'}`,
            color: input.trim() && !loading ? '#ff006e' : 'rgba(255,255,255,0.18)',
            boxShadow: input.trim() && !loading ? '0 0 12px rgba(255,0,110,0.2)' : 'none',
            transition: 'all 0.15s',
          }}
        >
          {loading
            ? <Loader2 size={13} className="animate-spin" />
            : <Send size={13} />
          }
        </motion.button>
      </div>
    </div>
  );
};

export default AIAssistantChat;

