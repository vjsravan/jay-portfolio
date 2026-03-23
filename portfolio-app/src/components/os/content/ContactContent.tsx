import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, MapPin, ExternalLink, Send } from 'lucide-react';
import { personalInfo } from '../../../data/resume';

const SOCIAL = [
  { icon: '🐙', label: 'GitHub',   href: 'https://github.com/vjsravan',                          color: '#fff' },
  { icon: '💼', label: 'LinkedIn', href: 'https://www.linkedin.com/in/jaysravan-fullstack/',     color: '#38bdf8' },
  { icon: '✉️', label: 'Email',    href: `mailto:${personalInfo.email}`,    color: '#06b6d4' },
];

const ContactContent: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', message: '' });
  const [sent, setSent] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Hi Jay,\n\n${form.message}\n\nBest regards,\n${form.name}`);
    window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="p-5 space-y-4 h-full overflow-y-auto os-scrollbar">
      {/* Status badge */}
      <div
        className="flex items-center gap-3 p-3 rounded-xl"
        style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-accent-green animate-pulse flex-shrink-0" />
        <div>
          <p className="text-accent-green text-xs font-semibold">Open to Opportunities</p>
          <p className="text-gray-500 text-[10px]">Senior engineering roles · AI projects · Remote / Hybrid</p>
        </div>
      </div>

      {/* Email card */}
      <div
        className="p-4 rounded-xl"
        style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.2)' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Mail size={14} className="text-accent-cyan" />
          <span className="text-xs font-semibold text-white">Email</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-accent-cyan text-sm">{personalInfo.email}</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={copyEmail}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors"
            style={{ background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.3)', color: '#06b6d4' }}
          >
            {copied ? <Check size={12} className="text-accent-green" /> : <Copy size={12} />}
            {copied ? 'Copied!' : 'Copy'}
          </motion.button>
        </div>
        <div className="flex items-center gap-1 mt-2 text-gray-500 text-[10px]">
          <MapPin size={9} />
          <span>{personalInfo.location} · Open to Remote & Hybrid</span>
        </div>
      </div>

      {/* Social links */}
      <div className="grid grid-cols-3 gap-2">
        {SOCIAL.map(s => (
          <motion.a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <span className="text-xl">{s.icon}</span>
            <span className="text-[10px] font-mono" style={{ color: s.color }}>{s.label}</span>
            <ExternalLink size={9} className="text-gray-600" />
          </motion.a>
        ))}
      </div>

      {/* Quick message form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <p className="text-xs text-gray-500 font-mono">// Quick message</p>
        <input
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          placeholder="Your name"
          className="w-full px-3 py-2 rounded-xl text-sm text-white placeholder:text-gray-600 outline-none focus:ring-1"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            fontFamily: 'inherit',
            // @ts-ignore
            '--tw-ring-color': '#06b6d4',
          }}
        />
        <textarea
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          placeholder="Say hello, ask about a role, or just connect..."
          rows={3}
          className="w-full px-3 py-2 rounded-xl text-sm text-white placeholder:text-gray-600 outline-none resize-none focus:ring-1"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            fontFamily: 'inherit',
          }}
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-sm transition-all"
          style={{
            background: sent ? 'linear-gradient(135deg, #10b981, #06b6d4)' : 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
            color: '#020617',
          }}
        >
          {sent ? '✓ Opening email client...' : <><Send size={14} /> Send Message</>}
        </motion.button>
      </form>
    </div>
  );
};

export default ContactContent;

