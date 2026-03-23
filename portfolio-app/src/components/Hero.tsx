import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion';
import { ArrowDown, Mail, Terminal, Sparkles, Code2, Zap } from 'lucide-react';
import { personalInfo } from '../data/resume';

const phrases = [
  'Sr. Software Engineer',
  'Applied AI Engineer',
  'Full-Stack Architect',
  'Cloud Native Builder',
  'LLM Integrations Enthusiast',
];

function useTypewriter(list: string[]) {
  const [text, setText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = list[phraseIdx % list.length];
    const delay = deleting ? 35 : 75;
    const id = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, charIdx + 1));
        if (charIdx + 1 >= current.length) setTimeout(() => setDeleting(true), 1600);
        else setCharIdx(c => c + 1);
      } else {
        setText(current.slice(0, charIdx - 1));
        if (charIdx <= 1) { setDeleting(false); setCharIdx(0); setPhraseIdx(p => p + 1); }
        else setCharIdx(c => c - 1);
      }
    }, delay);
    return () => clearTimeout(id);
  }, [charIdx, deleting, phraseIdx, list]);
  return text;
}

// Glitch text effect
function GlitchText({ text, className }: { text: string; className?: string }) {
  const [glitching, setGlitching] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 200);
    }, 3500 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <span className={`relative inline-block ${className ?? ''}`} data-text={text}>
      {text}
      {glitching && (
        <>
          <span className="absolute inset-0 text-accent-cyan opacity-80" style={{ clipPath: 'polygon(0 20%, 100% 20%, 100% 40%, 0 40%)', transform: 'translate(-3px, 0)', mixBlendMode: 'screen' }}>{text}</span>
          <span className="absolute inset-0 text-accent-purple opacity-80" style={{ clipPath: 'polygon(0 60%, 100% 60%, 100% 80%, 0 80%)', transform: 'translate(3px, 0)', mixBlendMode: 'screen' }}>{text}</span>
        </>
      )}
    </span>
  );
}

// Magnetic button wrapper
function MagneticButton({ children, className, href, onClick }: {
  children: React.ReactNode; className?: string; href?: string; onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  const Tag = href ? 'a' : 'button';
  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <motion.div style={{ x: sx, y: sy }}>
        <Tag href={href} onClick={onClick} className={className}>
          {children}
        </Tag>
      </motion.div>
    </div>
  );
}

// Animated stat badge
function StatBadge({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -3 }}
      className="flex flex-col items-center px-5 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm min-w-[90px]"
      style={{ boxShadow: `0 0 20px ${color}20` }}
    >
      <span className="text-2xl font-black" style={{ color }}>{value}</span>
      <span className="text-xs text-gray-400 font-mono mt-0.5 whitespace-nowrap">{label}</span>
    </motion.div>
  );
}

const Hero: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const typedText = useTypewriter(phrases);
  const heroRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => { setMounted(true); }, []);

  // Parallax on mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.width / 2) / rect.width);
    mouseY.set((e.clientY - rect.height / 2) / rect.height);
  };

  const blobX = useTransform(mouseX, v => v * 40);
  const blobY = useTransform(mouseY, v => v * 30);
  const contentX = useTransform(mouseX, v => v * -12);
  const contentY = useTransform(mouseY, v => v * -8);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0, filter: 'blur(10px)' },
    visible: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section
      ref={heroRef}
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Dynamic aurora blobs that follow mouse */}
      <motion.div
        style={{ x: blobX, y: blobY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute top-[50%] left-[40%] w-[350px] h-[350px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </motion.div>

      {/* Animated grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(6,182,212,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.8) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Main content with subtle mouse parallax */}
      <motion.div
        style={{ x: contentX, y: contentY }}
        variants={containerVariants}
        initial="hidden"
        animate={mounted ? 'visible' : 'hidden'}
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Terminal badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-accent-cyan/30 bg-accent-cyan/5 backdrop-blur-sm text-sm font-mono text-accent-cyan"
            style={{ boxShadow: '0 0 20px rgba(6,182,212,0.15)' }}
          >
            <Zap size={12} className="text-accent-cyan animate-pulse" />
            <Terminal size={13} />
            <span>$ whoami — senior_engineer</span>
            <span className="cursor-blink" />
          </motion.div>
        </motion.div>

        {/* Main name with glitch */}
        <motion.div variants={itemVariants} className="mb-4">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight">
            <motion.span
              className="block text-white"
              whileHover={{ skewX: -2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Jay Sravan
            </motion.span>
            <GlitchText
              text="Vadlamudi"
              className="block gradient-text"
            />
          </h1>
        </motion.div>

        {/* Animated role */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="text-xl md:text-3xl text-gray-300 font-mono flex items-center justify-center gap-3 flex-wrap min-h-[40px]">
            <Code2 size={22} className="text-accent-cyan" />
            <span className="text-accent-cyan">
              {typedText}
              <span className="cursor-blink" />
            </span>
            <Sparkles size={22} className="text-accent-purple animate-pulse" />
          </div>
        </motion.div>

        {/* Animated stat badges */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-10">
          <StatBadge value="9+" label="Years XP" color="#06b6d4" />
          <StatBadge value="4" label="Industries" color="#8b5cf6" />
          <StatBadge value="10+" label="Microservices" color="#10b981" />
          <StatBadge value="AWS" label="Certified ☁️" color="#f59e0b" />
          <StatBadge value="AI" label="LLM Builder" color="#ec4899" />
        </motion.div>

        {/* Summary */}
        <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed mb-10">
          Building{' '}
          <span className="text-accent-cyan font-semibold">high-performance cloud-native apps</span>
          {' '}and exploring{' '}
          <span className="text-accent-purple font-semibold">AI-driven engineering</span>
          {' '}to create next-generation enterprise platforms.
        </motion.p>

        {/* CTA Buttons with magnetic effect */}
        <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-5 mb-14">
          <MagneticButton
            href="#experience"
            className="btn-primary flex items-center gap-2 text-base px-9 py-4 rounded-2xl"
          >
            View My Work
            <ArrowDown size={16} />
          </MagneticButton>
          <MagneticButton
            href="#ai-lab"
            className="btn-secondary flex items-center gap-2 text-base px-9 py-4 rounded-2xl"
          >
            <Sparkles size={16} />
            AI Lab
          </MagneticButton>
        </motion.div>

        {/* Social links */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-8">
          {[
            { icon: '🐙', href: 'https://github.com/vjsravan', label: 'GitHub' },
            { icon: '💼', href: 'https://www.linkedin.com/in/jaysravan-fullstack/', label: 'LinkedIn' },
            { icon: <Mail size={20} />, href: `mailto:${personalInfo.email}`, label: 'Email' },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.3, y: -4 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-500 hover:text-accent-cyan transition-colors duration-200 flex items-center"
              title={social.label}
              data-hover
            >
              {typeof social.icon === 'string'
                ? <span className="text-2xl filter hover:drop-shadow-[0_0_8px_#06b6d4]">{social.icon}</span>
                : social.icon}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating tech icons with depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { icon: '☕', x: '8%',  y: '18%', delay: 0,   scale: 1.2 },
          { icon: '⚛️', x: '88%', y: '12%', delay: 0.8, scale: 1   },
          { icon: '🔷', x: '92%', y: '68%', delay: 1.6, scale: 0.9 },
          { icon: '🐳', x: '4%',  y: '72%', delay: 0.4, scale: 1.1 },
          { icon: '🤖', x: '18%', y: '82%', delay: 1.2, scale: 1   },
          { icon: '☁️', x: '76%', y: '84%', delay: 2,   scale: 0.8 },
          { icon: '⚙️', x: '50%', y: '8%',  delay: 1,   scale: 0.7 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            style={{ left: item.x, top: item.y, scale: item.scale }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.15, 0.25, 0.15], y: [0, -18, 0], rotate: [0, 8, -8, 0] }}
            transition={{ duration: 5 + i * 0.7, repeat: Infinity, delay: item.delay, ease: 'easeInOut' }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-xs font-mono text-gray-600 tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-5 h-8 border border-gray-700 rounded-full flex justify-center pt-1.5"
        >
          <motion.div
            className="w-1 h-2 bg-accent-cyan rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

