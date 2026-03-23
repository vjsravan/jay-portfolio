import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { User, Briefcase, Code2, FolderOpen, Brain, Mail } from 'lucide-react';

import HeroPanel from './panels/HeroPanel';
import ExperiencePanel from './panels/ExperiencePanel';
import SkillsPanel from './panels/SkillsPanel';
import ProjectsPanel from './panels/ProjectsPanel';
import AILabPanel from './panels/AILabPanel';
import ContactPanel from './panels/ContactPanel';
import NexusOnboarding, { type BriefSection } from './NexusOnboarding';

const NAV = [
  { id: 'hero',       label: 'PROFILE',    Icon: User,       color: '#00d4ff' },
  { id: 'experience', label: 'EXPERIENCE', Icon: Briefcase,  color: '#bd00ff' },
  { id: 'skills',     label: 'SKILLS',     Icon: Code2,      color: '#00ff88' },
  { id: 'projects',   label: 'PROJECTS',   Icon: FolderOpen, color: '#ff6b00' },
  { id: 'ailab',      label: 'AI LAB',     Icon: Brain,      color: '#ff006e' },
  { id: 'contact',    label: 'CONTACT',    Icon: Mail,       color: '#4499ff' },
] as const;

type SectionId = typeof NAV[number]['id'];

const PANELS: Record<SectionId, React.FC> = {
  hero: HeroPanel,
  experience: ExperiencePanel,
  skills: SkillsPanel,
  projects: ProjectsPanel,
  ailab: AILabPanel,
  contact: ContactPanel,
};

const NexusInterface: React.FC = () => {
  const [active, setActive]               = useState<SectionId>('hero');
  const [tooltip, setTooltip]             = useState<string | null>(null);
  const [clock, setClock]                 = useState('');
  const [briefHighlight, setBriefHighlight] = useState<BriefSection>(null);

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString('en-US', { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Listen for navigation events dispatched by child panels (e.g. HeroPanel → contact)
  useEffect(() => {
    const handler = (e: Event) => {
      const section = (e as CustomEvent<string>).detail as SectionId;
      if (NAV.some(n => n.id === section)) setActive(section);
    };
    window.addEventListener('nexus-navigate', handler);
    return () => window.removeEventListener('nexus-navigate', handler);
  }, []);

  const activeNav = NAV.find(n => n.id === active)!;
  const Panel = PANELS[active];

  const TICKER_ITEMS = 'JAVA 21 · SPRING BOOT WEBFLUX · ANGULAR 17 · REACT · AWS · OPENSHIFT · APACHE CAMEL · KAFKA · POSTGRESQL · DOCKER · ARGOCD · HELM · GRAPHQL · GITHUB COPILOT · OPENAI API · RAG · LLM PROMPT ENGINEERING · OAUTH 2.0 · JWT · HASHICORP VAULT ·';

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: '#000000' }}>

      {/* ═══ SCANLINES ═══ */}
      <div className="nx-scanlines absolute inset-0 pointer-events-none z-10" style={{ opacity: 0.6 }} />

      {/* ═══ TOP HEADER BAR ═══ */}
      <div
        className="absolute top-0 left-16 right-0 h-11 flex items-center justify-between px-5 z-30"
        style={{
          background: 'rgba(0,0,0,0.85)',
          borderBottom: '1px solid rgba(0,212,255,0.12)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Left: Status info */}
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#00ff88', boxShadow: '0 0 6px #00ff88' }}
          />
          <span className="font-mono text-[11px]" style={{ color: 'rgba(0,212,255,0.5)' }}>
            NEXUS PROTOCOL
          </span>
          <span style={{ color: 'rgba(0,212,255,0.2)' }}>·</span>
          <span className="font-mono text-[11px]" style={{ color: 'rgba(0,212,255,0.35)' }}>
            PROFILE ACCESS:{' '}
            <span className="nx-flicker" style={{ color: '#00d4ff' }}>JAY SRAVAN VADLAMUDI</span>
          </span>
        </div>

        {/* Right: section + clock */}
        <div className="flex items-center gap-4">
          <motion.span
            key={active}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-[11px] px-2.5 py-0.5 rounded tracking-widest"
            style={{
              background: `${activeNav.color}14`,
              border: `1px solid ${activeNav.color}35`,
              color: activeNav.color,
            }}
          >
            {activeNav.label}
          </motion.span>
          <span className="font-mono text-[11px]" style={{ color: 'rgba(0,212,255,0.28)' }}>
            SYS · {clock}
          </span>
        </div>
      </div>

      {/* ═══ LEFT SIDEBAR ═══ */}
      <div
        className="absolute left-0 top-0 bottom-0 z-30 flex flex-col items-center py-5 gap-1"
        style={{
          width: 64,
          background: 'rgba(0,0,0,0.88)',
          borderRight: '1px solid rgba(0,212,255,0.1)',
          backdropFilter: 'blur(24px)',
        }}
      >
        {/* NX Logo */}
        <div className="mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-black text-sm nx-flicker"
            style={{
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid rgba(0,212,255,0.3)',
              color: '#00d4ff',
              textShadow: '0 0 10px #00d4ff',
            }}
          >
            NX
          </div>
        </div>

        {/* Separator */}
        <div className="w-8 h-px mb-3" style={{ background: 'rgba(0,212,255,0.15)' }} />

        {/* Nav items */}
        {NAV.map(({ id, label, Icon, color }) => {
          const isActive = active === id;
          return (
            <div
              key={id}
              className="relative"
              onMouseEnter={() => setTooltip(id)}
              onMouseLeave={() => setTooltip(null)}
            >
              <motion.button
                onClick={() => setActive(id)}
                data-hover
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.92 }}
                className="w-11 h-11 rounded-xl flex items-center justify-center relative transition-colors"
                style={{
                  background: isActive ? `${color}18` : briefHighlight === id ? `${color}10` : 'transparent',
                  border: `1px solid ${isActive ? `${color}45` : briefHighlight === id ? `${color}35` : 'transparent'}`,
                  color: isActive ? color : briefHighlight === id ? color : 'rgba(255,255,255,0.28)',
                  boxShadow: isActive
                    ? `0 0 16px ${color}28`
                    : briefHighlight === id
                    ? `0 0 20px ${color}40, 0 0 40px ${color}20`
                    : 'none',
                }}
              >
                {/* Active left-bar indicator */}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full"
                    style={{ background: color, boxShadow: `0 0 6px ${color}` }}
                  />
                )}
                <Icon size={17} />
              </motion.button>

              {/* Tooltip */}
              <AnimatePresence>
                {tooltip === id && (
                  <motion.div
                    initial={{ opacity: 0, x: -6, scale: 0.94 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -6, scale: 0.94 }}
                    transition={{ duration: 0.12 }}
                    className="absolute left-[52px] top-1/2 -translate-y-1/2 font-mono text-[10px] px-2.5 py-1.5 rounded-lg whitespace-nowrap z-50 tracking-widest"
                    style={{
                      background: 'rgba(0,0,0,0.95)',
                      border: `1px solid ${color}40`,
                      color,
                    }}
                  >
                    {label}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* Bottom status pulse */}
        <div className="flex-1" />
        <div className="flex flex-col items-center gap-1.5">
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="w-2 h-2 rounded-full"
            style={{ background: '#00ff88', boxShadow: '0 0 6px #00ff88' }}
          />
          <span
            className="font-mono text-[8px] tracking-widest"
            style={{ color: 'rgba(0,212,255,0.25)', writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            ONLINE
          </span>
        </div>
      </div>

      {/* ═══ MAIN CONTENT AREA ═══ */}
      <div
        className="absolute z-20 overflow-hidden"
        style={{ left: 64, top: 44, bottom: 28, right: 0 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
            className="w-full h-full"
          >
            <Panel />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ═══ BOTTOM STATUS BAR ═══ */}
      <div
        className="absolute bottom-0 left-16 right-0 h-7 flex items-center overflow-hidden z-30"
        style={{
          background: 'rgba(0,0,0,0.9)',
          borderTop: '1px solid rgba(0,212,255,0.1)',
        }}
      >
        {/* Scrolling ticker */}
        <div className="flex-1 overflow-hidden h-full flex items-center">
          <div
            className="font-mono text-[9px] whitespace-nowrap flex gap-10"
            style={{ color: 'rgba(0,212,255,0.28)', animation: 'nx-marquee 30s linear infinite', letterSpacing: '0.06em' }}
          >
            <span>{TICKER_ITEMS}</span>
            <span>{TICKER_ITEMS}</span>
          </div>
        </div>

        {/* Right status chips */}
        <div className="flex items-center gap-3 px-4 flex-shrink-0 border-l" style={{ borderColor: 'rgba(0,212,255,0.1)' }}>
          {[
            { label: 'AWS CERTIFIED', color: '#f59e0b' },
            { label: '9+ YRS', color: '#00d4ff' },
            { label: 'OPEN TO WORK', color: '#00ff88' },
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 4px ${color}` }} />
              <span className="font-mono text-[9px] tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>{label}</span>
            </div>
          ))}
          <span className="font-mono text-[9px]" style={{ color: 'rgba(0,212,255,0.18)' }}>
            NEXUS v2.0 · JSV
          </span>
        </div>
      </div>

      {/* ── Guided onboarding briefing ── */}
      <NexusOnboarding
        onSectionHighlight={(s) => setBriefHighlight(s)}
        onNavigate={(s) => { if (s) setActive(s as SectionId); }}
      />
    </div>
  );
};

export default NexusInterface;

