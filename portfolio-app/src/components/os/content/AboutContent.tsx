import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Award, Cpu } from 'lucide-react';
import { personalInfo, metrics, certifications } from '../../../data/resume';

const colorMap: Record<string, string> = {
  cyan: '#06b6d4', purple: '#8b5cf6', green: '#10b981', orange: '#f59e0b',
};

const AI_TOOLS = ['GitHub Copilot', 'GPT-4/5', 'OpenAI API', 'RAG Concepts', 'LLM Prompts', 'Agent Workflows'];

const AboutContent: React.FC = () => (
  <div className="p-5 space-y-4">
    {/* Profile header */}
    <div className="flex items-center gap-4">
      <motion.div
        whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
        transition={{ duration: 0.4 }}
        className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 font-black text-lg select-none"
        style={{ background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)', color: '#020617' }}
      >
        JSV
      </motion.div>
      <div className="min-w-0">
        <h2 className="text-white font-bold text-base leading-tight">{personalInfo.name}</h2>
        <p className="text-accent-cyan text-sm font-medium">{personalInfo.title}</p>
        <p className="text-accent-purple text-xs">{personalInfo.subtitle}</p>
        <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
          <MapPin size={10} />
          <span>{personalInfo.location} · Open to Remote</span>
        </div>
      </div>
    </div>

    {/* Stats grid */}
    <div className="grid grid-cols-4 gap-2">
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07 }}
          className="p-3 text-center rounded-xl"
          style={{ background: colorMap[m.color] + '12', border: `1px solid ${colorMap[m.color]}25` }}
        >
          <div className="text-xl font-black" style={{ color: colorMap[m.color] }}>
            {m.value}{m.suffix}
          </div>
          <div className="text-gray-500 text-[9px] leading-tight mt-0.5">{m.label}</div>
        </motion.div>
      ))}
    </div>

    {/* Bio */}
    <div
      className="p-4 rounded-xl text-sm text-gray-300 leading-relaxed"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <span className="text-accent-green font-mono text-xs">// summary</span>
      <p className="mt-1 text-xs text-gray-400">
        Senior Full-Stack Engineer with <span className="text-accent-cyan font-semibold">9+ years</span> across
        logistics, automotive finance, and healthcare. Currently at{' '}
        <span className="text-white font-semibold">UPS</span> processing{' '}
        <span className="text-accent-cyan font-semibold">100k+ customs transactions/week</span> with reactive Java + Spring WebFlux.
        Actively integrating AI tools — Copilot, GPT-4, RAG — into engineering workflows.
      </p>
    </div>

    {/* Education + Cert row */}
    <div className="grid grid-cols-2 gap-3">
      <div
        className="p-3 rounded-xl flex items-center gap-2.5"
        style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.15)' }}
      >
        <GraduationCap size={18} className="text-accent-cyan flex-shrink-0" />
        <div>
          <p className="text-white text-xs font-semibold">Masters in CS</p>
          <p className="text-gray-500 text-[10px]">Western Illinois Univ. · 2021</p>
        </div>
      </div>
      {certifications.map(c => (
        <div
          key={c.name}
          className="p-3 rounded-xl flex items-center gap-2.5"
          style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)' }}
        >
          <Award size={18} className="text-yellow-400 flex-shrink-0" />
          <div>
            <p className="text-white text-xs font-semibold">AWS Certified</p>
            <p className="text-gray-500 text-[10px]">Developer – Associate</p>
          </div>
        </div>
      ))}
    </div>

    {/* AI Tools */}
    <div
      className="p-3 rounded-xl"
      style={{ background: 'rgba(236,72,153,0.06)', border: '1px solid rgba(236,72,153,0.15)' }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Cpu size={12} className="text-pink-400" />
        <span className="text-[11px] text-pink-400 font-mono">AI Toolkit</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {AI_TOOLS.map(t => (
          <span
            key={t}
            className="text-[10px] px-2 py-0.5 rounded-full border font-mono"
            style={{ color: '#ec4899', borderColor: '#ec489928', backgroundColor: '#ec489910' }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default AboutContent;

