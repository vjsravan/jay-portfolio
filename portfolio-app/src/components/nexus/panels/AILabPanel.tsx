import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../../data/resume';
import { useIsMobile } from '../../../hooks/useIsMobile';

// Manually position nodes for the SVG neural graph
const NODES = [
  { id: 'copilot',    label: 'GitHub Copilot',      x: 380, y: 100, color: '#ff006e', r: 28 },
  { id: 'gpt',        label: 'ChatGPT GPT-4/5',     x: 220, y: 170, color: '#bd00ff', r: 26 },
  { id: 'openai',     label: 'OpenAI API',           x: 540, y: 170, color: '#ff006e', r: 24 },
  { id: 'rag',        label: 'RAG Concepts',         x: 130, y: 290, color: '#bd00ff', r: 22 },
  { id: 'embeddings', label: 'Vector Embeddings',    x: 290, y: 290, color: '#00d4ff', r: 20 },
  { id: 'prompt',     label: 'LLM Prompting',        x: 460, y: 290, color: '#bd00ff', r: 20 },
  { id: 'agents',     label: 'Agent Workflows',      x: 620, y: 290, color: '#ff006e', r: 22 },
  { id: 'log',        label: 'AI Log Analysis',      x: 200, y: 390, color: '#00ff88', r: 20 },
  { id: 'aidev',      label: 'AI-assisted Dev',      x: 380, y: 400, color: '#00d4ff', r: 22 },
  { id: 'onboard',    label: 'AI Onboarding',        x: 560, y: 390, color: '#00ff88', r: 18 },
];

const EDGES = [
  ['copilot', 'gpt'],       ['copilot', 'openai'],
  ['gpt', 'rag'],           ['gpt', 'embeddings'],  ['gpt', 'prompt'],
  ['openai', 'agents'],     ['openai', 'prompt'],
  ['rag', 'embeddings'],    ['rag', 'log'],
  ['embeddings', 'aidev'],  ['prompt', 'aidev'],
  ['agents', 'onboard'],    ['agents', 'aidev'],
  ['log', 'aidev'],         ['aidev', 'onboard'],
];

const HIGHLIGHTS = [
  { icon: '🤖', title: 'LLM Log Summarizer', desc: 'OpenAI API + RAG for customs error analysis. 60% faster RCA.' },
  { icon: '⚡', title: 'AI-Agent Workflows', desc: 'Automated regulatory rule explanation & developer onboarding.' },
  { icon: '📝', title: 'Prompt Engineering', desc: 'Structured templates for system architecture documentation.' },
  { icon: '🔍', title: 'AI Code Refactoring', desc: 'GitHub Copilot for test generation & intelligent refactoring.' },
];

const AILabPanel: React.FC = () => {
  const isMobile = useIsMobile();
  return (
  <div className="w-full h-full flex flex-col overflow-y-auto nx-scroll" style={{ padding: isMobile ? '1rem' : '1.5rem 2rem' }}>
    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 mb-4"
    >
      <div className="w-1.5 h-6 rounded-full" style={{ background: '#ff006e', boxShadow: '0 0 10px #ff006e' }} />
      <h2 className="font-mono font-bold tracking-widest text-sm" style={{ color: '#ff006e' }}>
        AI LABORATORY
      </h2>
      <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(255,0,110,0.4), transparent)' }} />
      <motion.span
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="font-mono text-[10px]"
        style={{ color: '#ff006e' }}
      >
        ● NEURAL NETWORK ACTIVE
      </motion.span>
    </motion.div>

    <div className="flex gap-5 flex-1 overflow-hidden">
      {/* SVG Neural Graph — desktop only */}
      {!isMobile && (
        <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="rounded-xl flex-shrink-0 relative overflow-hidden"
        style={{
          width: 720, height: '100%',
          background: 'rgba(255,0,110,0.03)',
          border: '1px solid rgba(255,0,110,0.15)',
        }}
      >
        <svg viewBox="0 0 760 480" width="100%" height="100%" style={{ overflow: 'visible' }}>
          <defs>
            <filter id="glow-magenta">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="glow-cyan">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Edges */}
          {EDGES.map(([a, b], i) => {
            const nodeA = NODES.find(n => n.id === a)!;
            const nodeB = NODES.find(n => n.id === b)!;
            const len = Math.sqrt((nodeB.x - nodeA.x) ** 2 + (nodeB.y - nodeA.y) ** 2);
            return (
              <motion.line
                key={`${a}-${b}`}
                x1={nodeA.x} y1={nodeA.y}
                x2={nodeB.x} y2={nodeB.y}
                stroke={`${nodeA.color}50`}
                strokeWidth={0.8}
                strokeDasharray={len}
                initial={{ strokeDashoffset: len }}
                animate={{ strokeDashoffset: [len, 0, -len] }}
                transition={{ duration: 3 + i * 0.3, repeat: Infinity, delay: i * 0.2, ease: 'linear' }}
              />
            );
          })}

          {/* Nodes */}
          {NODES.map((node, i) => (
            <motion.g key={node.id} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.07 }}>
              {/* Outer pulse ring */}
              <motion.circle
                cx={node.x} cy={node.y}
                r={node.r + 8}
                fill="none"
                stroke={node.color}
                strokeWidth={0.5}
                opacity={0.3}
                animate={{ r: [node.r + 6, node.r + 14, node.r + 6], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
              />
              {/* Main node */}
              <motion.circle
                cx={node.x} cy={node.y}
                r={node.r}
                fill={`${node.color}18`}
                stroke={node.color}
                strokeWidth={1.5}
                filter="url(#glow-magenta)"
                animate={{ r: [node.r, node.r + 2, node.r] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
              />
              {/* Label */}
              <text
                x={node.x} y={node.y + node.r + 14}
                textAnchor="middle"
                fill={node.color}
                fontSize={9}
                fontFamily="JetBrains Mono, monospace"
                opacity={0.85}
              >
                {node.label}
              </text>
              {/* Center dot */}
              <circle cx={node.x} cy={node.y} r={3} fill={node.color} opacity={0.9} />
            </motion.g>
          ))}
        </svg>
      </motion.div>
      )} {/* end !isMobile SVG graph */}

      {/* Experiments log */}
      <div className="flex-1 flex flex-col gap-3 overflow-y-auto nx-scroll">
        <div className="font-mono text-[10px] tracking-widest" style={{ color: 'rgba(255,0,110,0.5)' }}>
          EXPERIMENT LOG
        </div>
        {HIGHLIGHTS.map((h, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="p-3 rounded-xl relative overflow-hidden"
            style={{ background: 'rgba(255,0,110,0.05)', border: '1px solid rgba(255,0,110,0.15)' }}
            whileHover={{ borderColor: 'rgba(255,0,110,0.4)', boxShadow: '0 0 16px rgba(255,0,110,0.15)' }}
          >
            <div className="flex gap-2 items-start">
              <span className="text-xl flex-shrink-0">{h.icon}</span>
              <div>
                <div className="font-bold text-white text-sm">{h.title}</div>
                <div className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.55)' }}>{h.desc}</div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Skills list */}
        <div className="mt-2">
          <div className="font-mono text-[10px] tracking-widest mb-2" style={{ color: 'rgba(255,0,110,0.5)' }}>
            AI TECH STACK
          </div>
          <div className="flex flex-wrap gap-1.5">
            {skills.ai.map((s: string) => (
              <span
                key={s}
                className="font-mono text-[10px] px-2 py-0.5 rounded"
                style={{ background: 'rgba(255,0,110,0.1)', border: '1px solid rgba(255,0,110,0.25)', color: '#ff006e' }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AILabPanel;

