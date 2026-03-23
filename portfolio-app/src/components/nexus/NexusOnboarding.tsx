import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Bump this key whenever you make significant guide changes to re-show for returning visitors
const STORAGE_KEY = 'nexus-guide-v4';

export type BriefSection = 'hero' | 'experience' | 'skills' | 'projects' | 'ailab' | 'contact' | null;

interface StepDef {
  id: number; icon: string; label: string;
  title: string; body: string; color: string;
  section: BriefSection;
  arrowDir: 'none' | 'left' | 'down';
}

const STEPS: StepDef[] = [
  {
    id: 0, icon: '⬡', section: null, arrowDir: 'none',
    label: 'NEXUS PROTOCOL · PROFILE BRIEF',
    title: 'Welcome, Visitor.',
    body: "You're accessing the intelligence system of Jay Sravan Vadlamudi — Sr. Software Engineer & Applied AI Engineer. Let me walk you through this portfolio in 5 quick steps.",
    color: '#00d4ff',
  },
  {
    id: 1, icon: '🌐', section: 'hero', arrowDir: 'down',
    label: 'PROFILE · STEP 1 of 5',
    title: 'The Tech Universe',
    body: "The solar system visualises Jay's core tech universe — key technologies orbiting the JSV core. 9+ years across logistics, automotive finance, healthcare & banking.",
    color: '#00d4ff',
  },
  {
    id: 2, icon: '📋', section: 'experience', arrowDir: 'left',
    label: 'EXPERIENCE · STEP 2 of 5',
    title: '4 Companies. Real Impact.',
    body: 'UPS (customs microservices), Mercedes-Benz Financial (platform modernization), United Healthcare (HIPAA APIs), Wells Fargo (digital banking dashboard).',
    color: '#bd00ff',
  },
  {
    id: 3, icon: '⚡', section: 'skills', arrowDir: 'left',
    label: 'SKILLS · STEP 3 of 5',
    title: 'Full-Stack · Cloud · AI.',
    body: 'Java 21, Spring WebFlux, React, Angular, AWS, Docker, Kafka, ArgoCD — actively expanding into AI: LLMs, RAG, prompt engineering, agent workflows.',
    color: '#00ff88',
  },
  {
    id: 4, icon: '🤖', section: 'ailab', arrowDir: 'left',
    label: 'AI LAB · STEP 4 of 5',
    title: 'AI in Production',
    body: 'Real LLM integrations: log summarization via OpenAI + RAG, agent workflows for regulatory explanation, GitHub Copilot at enterprise scale.',
    color: '#ff006e',
  },
  {
    id: 5, icon: '📡', section: 'contact', arrowDir: 'left',
    label: 'CONTACT · STEP 5 of 5',
    title: 'Open to Opportunities',
    body: "Senior Engineering and AI roles — remote or hybrid. The Contact section sends a message directly to Jay's Gmail inbox. No email client needed.",
    color: '#4499ff',
  },
];

// Sidebar nav icon centres (px from viewport top-left)
const NAV_ICON_POS: Partial<Record<NonNullable<BriefSection>, { x: number; y: number }>> = {
  experience: { x: 42, y: 148 },
  skills:     { x: 42, y: 196 },
  ailab:      { x: 42, y: 292 },
  contact:    { x: 42, y: 340 },
};

const CHAR_W  = 52;   // AstroGuide SVG width
const CHAR_H  = 96;   // AstroGuide SVG height
const BUBBLE  = 310;  // speech bubble width
const TOTAL_W = CHAR_W + 14 + BUBBLE; // full assembly width

function buildPositions(): Array<{ x: number; y: number }> {
  const vw = window.innerWidth;
  const safeR = Math.max(64 + CHAR_W, vw - TOTAL_W - 20);

  return [
    // 0: top-right welcome — away from name & orbit
    { x: safeR, y: 52 },
    // 1: top-right hero — same corner, content changes
    { x: safeR, y: 52 },
    // 2-5: right of sidebar, character vertically centred on each nav tab
    { x: 130, y: 148 - CHAR_H / 2 },   // experience
    { x: 130, y: 196 - CHAR_H / 2 },   // skills
    { x: 130, y: 292 - CHAR_H / 2 },   // ailab
    { x: 130, y: 340 - CHAR_H / 2 },   // contact
  ];
}

// ─────────────────────────────────────────────────────────────
// NavSpotlight — pulsing ring on the sidebar nav icon
// ─────────────────────────────────────────────────────────────
const NavSpotlight: React.FC<{ pos: { x: number; y: number }; color: string }> = ({ pos, color }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.3 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.3 }}
    transition={{ duration: 0.3 }}
    style={{
      position: 'fixed',
      left: pos.x - 26, top: pos.y - 26,
      width: 52, height: 52,
      zIndex: 499, pointerEvents: 'none',
    }}
  >
    {[0, 1, 2].map(i => (
      <motion.div key={i}
        animate={{ scale: [1, 2.8, 1], opacity: [0.8, 0, 0.8] }}
        transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.53, ease: 'easeOut' }}
        style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: `2px solid ${color}`,
          boxShadow: `0 0 8px ${color}`,
        }}
      />
    ))}
    <div style={{
      position: 'absolute', inset: 14, borderRadius: '50%',
      background: `${color}35`,
      border: `1.5px solid ${color}`,
      boxShadow: `0 0 10px ${color}70`,
    }} />
  </motion.div>
);

// ──────────────────────────────────────────���──────────────────
// AstroGuide — full-body SVG astronaut character
// ─────────────────────────────────────────────────────────────
const AstroGuide: React.FC<{
  color: string;
  isMoving: boolean;
  arrowDir: StepDef['arrowDir'];
}> = ({ color, isMoving, arrowDir }) => {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>, t2: ReturnType<typeof setTimeout>;
    const doBlink = () => {
      setBlink(true);
      t2 = setTimeout(() => {
        setBlink(false);
        t1 = setTimeout(doBlink, 2200 + Math.random() * 2800);
      }, 110);
    };
    t1 = setTimeout(doBlink, 900 + Math.random() * 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Flip the SVG horizontally when pointing left so the character faces the nav
  const facingLeft = arrowDir === 'left';

  return (
    <motion.div
      animate={{ y: isMoving ? [0, -8, 0] : [0, -5, 0] }}
      transition={{ duration: isMoving ? 0.32 : 2.6, repeat: Infinity, ease: 'easeInOut' }}
      style={{ position: 'relative', width: CHAR_W, height: CHAR_H, flexShrink: 0 }}
    >
      {/* Ambient glow behind character */}
      <div style={{
        position: 'absolute', inset: -8, borderRadius: '50%',
        background: `radial-gradient(ellipse, ${color}18 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <svg
        viewBox="0 0 52 96"
        width={CHAR_W}
        height={CHAR_H}
        style={{ overflow: 'visible', transform: facingLeft ? 'scaleX(-1)' : 'none' }}
      >
        {/* ── ANTENNA ── */}
        <line x1="26" y1="6" x2="26" y2="11"
          stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <motion.circle cx="26" cy="4" r="3" fill={color}
          animate={{ opacity: [1, 0.2, 1], r: [3, 4.2, 3] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ── HELMET shell ── */}
        <ellipse cx="26" cy="20" rx="13" ry="13"
          fill="rgba(2,6,18,0.92)" stroke={color} strokeWidth="1.5" />
        {/* helmet shine arc */}
        <path d="M 17 13 Q 22 10 28 12"
          stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* ── VISOR ── */}
        <ellipse cx="26" cy="21" rx="9" ry="8"
          fill={`${color}1a`} stroke={`${color}90`} strokeWidth="1" />
        <path d="M 20 16 Q 24 14 28 15.5"
          stroke="rgba(255,255,255,0.22)" strokeWidth="1" fill="none" strokeLinecap="round" />

        {/* ── EYES (blink via r) ── */}
        <motion.circle cx="21.5" cy="20" fill={color}
          animate={{ r: blink ? 0.3 : 2.5 }}
          transition={{ duration: 0.08 }}
          style={{ filter: `drop-shadow(0 0 4px ${color})` }}
        />
        <motion.circle cx="30.5" cy="20" fill={color}
          animate={{ r: blink ? 0.3 : 2.5 }}
          transition={{ duration: 0.08 }}
          style={{ filter: `drop-shadow(0 0 4px ${color})` }}
        />

        {/* ── NECK ── */}
        <rect x="22" y="32" width="8" height="5" rx="2"
          fill="rgba(0,0,0,0.75)" stroke={`${color}40`} strokeWidth="1" />

        {/* ── TORSO ── */}
        <rect x="14" y="36" width="24" height="22" rx="5"
          fill={`${color}14`} stroke={color} strokeWidth="1.5" />

        {/* chest display */}
        <rect x="19" y="41" width="14" height="9" rx="2"
          fill={`${color}22`} stroke={`${color}60`} strokeWidth="1" />
        <motion.line x1="21" y1="45.5" x2="31" y2="45.5"
          stroke={color} strokeWidth="1" opacity="0.9"
          animate={{ x2: [31, 22, 31] }}
          transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* belt */}
        <rect x="13" y="58" width="26" height="5" rx="2.5"
          fill={`${color}18`} stroke={`${color}55`} strokeWidth="1" />
        <circle cx="26" cy="60.5" r="2.5"
          fill={`${color}45`} stroke={`${color}70`} strokeWidth="0.8" />

        {/* ── LEFT ARM (swings when moving) ── */}
        <motion.g
          style={{ transformBox: 'fill-box', transformOrigin: 'right center' }}
          animate={isMoving ? { rotate: [12, -12, 12] } : { rotate: 0 }}
          transition={{ duration: 0.38, repeat: Infinity }}
        >
          <rect x="1" y="37" width="13" height="6" rx="3"
            fill={`${color}18`} stroke={color} strokeWidth="1.4" />
          <circle cx="3" cy="40" r="3.5"
            fill={`${color}28`} stroke={color} strokeWidth="1.2" />
        </motion.g>

        {/* ── RIGHT ARM (points when arrowDir=left, i.e. after scaleX flip it points left) ── */}
        <motion.g
          style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}
          animate={
            arrowDir === 'left'
              ? { rotate: [-6, 6, -6] }          // pointing pulse
              : isMoving
                ? { rotate: [-12, 12, -12] }      // walking swing
                : { rotate: 0 }
          }
          transition={{
            duration: arrowDir === 'left' ? 1.1 : 0.38,
            repeat: Infinity,
            delay: isMoving ? 0.19 : 0,
          }}
        >
          <rect x="38" y="37" width="13" height="6" rx="3"
            fill={`${color}18`} stroke={color} strokeWidth="1.4" />
          <circle cx="50" cy="40" r="3.5"
            fill={`${color}28`} stroke={color} strokeWidth="1.2" />
          {/* pointing finger tip — visible only when pointing */}
          {arrowDir === 'left' && (
            <motion.line x1="52" y1="40" x2="58" y2="40"
              stroke={color} strokeWidth="2.5" strokeLinecap="round"
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
            />
          )}
        </motion.g>

        {/* ── LEFT LEG ── */}
        <motion.g
          style={{ transformBox: 'fill-box', transformOrigin: 'center top' }}
          animate={isMoving ? { rotate: [-24, 24, -24] } : { rotate: 0 }}
          transition={{ duration: 0.38, repeat: Infinity }}
        >
          <rect x="14" y="63" width="11" height="18" rx="4"
            fill={`${color}12`} stroke={color} strokeWidth="1.4" />
          <rect x="12" y="79" width="14" height="7" rx="3"
            fill={`${color}22`} stroke={color} strokeWidth="1.4" />
        </motion.g>

        {/* ── RIGHT LEG ── */}
        <motion.g
          style={{ transformBox: 'fill-box', transformOrigin: 'center top' }}
          animate={isMoving ? { rotate: [24, -24, 24] } : { rotate: 0 }}
          transition={{ duration: 0.38, repeat: Infinity, delay: 0.19 }}
        >
          <rect x="27" y="63" width="11" height="18" rx="4"
            fill={`${color}12`} stroke={color} strokeWidth="1.4" />
          <rect x="26" y="79" width="14" height="7" rx="3"
            fill={`${color}22`} stroke={color} strokeWidth="1.4" />
        </motion.g>
      </svg>

      {/* Ground shadow glow */}
      <div style={{
        position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)',
        width: 32, height: 6, borderRadius: '50%',
        background: `${color}22`,
        boxShadow: `0 0 14px 4px ${color}40`,
        filter: 'blur(3px)',
      }} />
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────
// Down arrow — only used for step 1 (hero)
// ─────────────────────────────────────────────────────────────
const DownArrow: React.FC<{ color: string }> = ({ color }) => (
  <motion.div
    animate={{ y: [0, 10, 0] }}
    transition={{ duration: 0.85, repeat: Infinity, ease: 'easeInOut' }}
    style={{
      position: 'absolute', pointerEvents: 'none',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
      top: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)',
    }}
  >
    <div style={{
      width: 2, height: 22, borderRadius: 9999,
      background: `linear-gradient(to bottom, ${color}10, ${color})`,
      boxShadow: `0 0 6px ${color}80`,
    }} />
    {[0, 1].map(i => (
      <motion.span key={i}
        animate={{ opacity: [0.3 + i * 0.35, 1, 0.3 + i * 0.35] }}
        transition={{ duration: 0.85, repeat: Infinity, delay: i * 0.2 }}
        style={{ fontSize: 13, color, filter: `drop-shadow(0 0 5px ${color})`, lineHeight: 1 }}
      >▼</motion.span>
    ))}
  </motion.div>
);

// ─────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────
interface Props {
  onSectionHighlight: (s: BriefSection) => void;
  onNavigate: (s: BriefSection) => void;
}

const NexusOnboarding: React.FC<Props> = ({ onSectionHighlight, onNavigate }) => {
  const [step, setStep]         = useState(0);
  const [show, setShow]         = useState(false);
  const [exiting, setExiting]   = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [progress, setProg]     = useState(0);
  const [positions]             = useState<Array<{ x: number; y: number }>>(() =>
    typeof window !== 'undefined' ? buildPositions() : STEPS.map(() => ({ x: 0, y: 0 }))
  );
  const stepRef = useRef(0);
  stepRef.current = step;

  // Show once per visitor — gate via localStorage
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const t = setTimeout(() => setShow(true), 1000);
    return () => clearTimeout(t);
  }, []);

  const dismiss = useCallback(() => {
    setExiting(true);
    onSectionHighlight(null);
    setTimeout(() => {
      setShow(false);
      onNavigate('hero');
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    }, 400);
  }, [onSectionHighlight, onNavigate]);

  const next = useCallback(() => {
    if (stepRef.current >= STEPS.length - 1) { dismiss(); return; }
    setIsMoving(true);
    setTimeout(() => setIsMoving(false), 650);
    setStep(s => s + 1);
  }, [dismiss]);

  const prev = useCallback(() => {
    setIsMoving(true);
    setTimeout(() => setIsMoving(false), 650);
    setStep(s => Math.max(0, s - 1));
  }, []);

  const goTo = useCallback((i: number) => {
    setIsMoving(true);
    setTimeout(() => setIsMoving(false), 650);
    setStep(i);
    setProg(0);
  }, []);

  // Auto-advance every ~9 s
  useEffect(() => {
    if (!show) return;
    setProg(0);
    let p = 0;
    const iv = setInterval(() => {
      p += 1; setProg(p);
      if (p >= 100) { clearInterval(iv); setTimeout(next, 350); }
    }, 90);
    return () => clearInterval(iv);
  }, [step, show, next]);

  // Sync sidebar highlight + navigation
  useEffect(() => {
    if (!show) return;
    const cur = STEPS[step];
    onSectionHighlight(cur.section);
    if (cur.section && step > 0) onNavigate(cur.section);
  }, [step, show, onSectionHighlight, onNavigate]);

  if (!show || positions.length === 0) return null;

  const cur    = STEPS[step];
  const pos    = positions[step] ?? positions[0];
  const isLast = step === STEPS.length - 1;
  const navPos = cur.section ? (NAV_ICON_POS[cur.section] ?? null) : null;

  return (
    <>
      {/* ── Nav tab spotlight ── */}
      <AnimatePresence>
        {navPos && !exiting && (
          <NavSpotlight key={`spot-${step}`} pos={navPos} color={cur.color} />
        )}
      </AnimatePresence>

      {/* ── Character + bubble assembly ── */}
      <AnimatePresence>
        {!exiting && (
          <motion.div
            key="guide-assembly"
            animate={{ x: pos.x, y: pos.y, opacity: 1, scale: 1 }}
            initial={{ x: pos.x, y: pos.y, opacity: 0, scale: 0.75 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.28 } }}
            transition={{ type: 'spring', stiffness: 105, damping: 18, mass: 1 }}
            style={{
              position: 'fixed', top: 0, left: 0, zIndex: 500,
              display: 'flex', alignItems: 'center',
              pointerEvents: 'all',
            }}
          >
            {/* Astronaut */}
            <div style={{ position: 'relative' }}>
              <AstroGuide color={cur.color} isMoving={isMoving} arrowDir={cur.arrowDir} />
              {cur.arrowDir === 'down' && <DownArrow color={cur.color} />}
            </div>

            {/* Speech bubble pointer triangle */}
            <div style={{
              width: 0, height: 0, flexShrink: 0, marginLeft: 6,
              borderTop: '9px solid transparent',
              borderBottom: '9px solid transparent',
              borderRight: `12px solid ${cur.color}35`,
            }} />

            {/* Speech bubble */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 14 }}
                transition={{ duration: 0.2 }}
                style={{
                  width: BUBBLE,
                  background: 'rgba(0,2,12,0.95)',
                  border: `1px solid ${cur.color}35`,
                  borderRadius: 14, overflow: 'hidden',
                  boxShadow: `0 0 30px ${cur.color}18, 0 10px 36px rgba(0,0,0,0.8)`,
                  backdropFilter: 'blur(28px)',
                }}
              >
                {/* Auto-advance progress bar */}
                <div style={{ height: 2, background: 'rgba(255,255,255,0.04)' }}>
                  <div style={{
                    height: '100%', width: `${progress}%`,
                    background: `linear-gradient(90deg, ${cur.color}, ${cur.color}55)`,
                    boxShadow: `0 0 6px ${cur.color}`,
                    transition: 'width 0.09s linear',
                  }} />
                </div>
                <div style={{ height: 2, background: `linear-gradient(90deg, ${cur.color}70, transparent)` }} />

                <div style={{ padding: '13px 16px' }}>
                  {/* Label row + close */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 }}>
                    <span style={{
                      fontFamily: 'JetBrains Mono, monospace', fontSize: 8,
                      letterSpacing: '0.11em', color: `${cur.color}80`,
                    }}>
                      {cur.label}
                    </span>
                    <button data-hover onClick={dismiss} style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'rgba(255,255,255,0.2)', fontSize: 10, lineHeight: 1, padding: 2,
                    }}>✕</button>
                  </div>

                  {/* Icon + title */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 8 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 9, flexShrink: 0, fontSize: 16,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: `${cur.color}12`, border: `1px solid ${cur.color}28`,
                    }}>{cur.icon}</div>
                    <h3 style={{
                      fontFamily: 'Inter, sans-serif', fontWeight: 800,
                      fontSize: '0.88rem', color: '#fff', margin: 0, lineHeight: 1.3,
                    }}>{cur.title}</h3>
                  </div>

                  {/* Body text */}
                  <p style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '0.73rem',
                    color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, margin: '0 0 12px',
                  }}>{cur.body}</p>

                  {/* Step dots + nav buttons */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {STEPS.map((_, i) => (
                        <button key={i} data-hover onClick={() => goTo(i)} style={{
                          width: i === step ? 16 : 5, height: 5, borderRadius: 9999,
                          background: i === step ? cur.color : 'rgba(255,255,255,0.14)',
                          boxShadow: i === step ? `0 0 6px ${cur.color}` : 'none',
                          border: 'none', cursor: 'pointer', padding: 0,
                          transition: 'all 0.22s ease',
                        }} />
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: 5 }}>
                      {step > 0 && (
                        <button data-hover onClick={prev} style={{
                          fontFamily: 'JetBrains Mono, monospace', fontSize: 8,
                          padding: '5px 10px', borderRadius: 7,
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.09)',
                          color: 'rgba(255,255,255,0.38)', cursor: 'pointer', letterSpacing: '0.06em',
                        }}>← BACK</button>
                      )}
                      <button data-hover onClick={next} style={{
                        fontFamily: 'JetBrains Mono, monospace', fontSize: 8,
                        padding: '5px 12px', borderRadius: 7,
                        background: `linear-gradient(135deg, ${cur.color}1e, ${cur.color}08)`,
                        border: `1px solid ${cur.color}40`, color: cur.color,
                        cursor: 'pointer', letterSpacing: '0.06em',
                        boxShadow: `0 0 12px ${cur.color}14`,
                      }}>{isLast ? 'LAUNCH ⬡' : 'NEXT →'}</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NexusOnboarding;

