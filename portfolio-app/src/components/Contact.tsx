import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MapPin, Copy, Check } from 'lucide-react';
import { personalInfo } from '../data/resume';

const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`Hi Jay,\n\n${formData.message}\n\nBest regards,\n${formData.name}\n${formData.email}`);
    window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="relative py-24 px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent-cyan/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="terminal-text text-sm mb-2">// contact.reach(jay)</p>
          <h2 className="section-title">Let's Connect</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Open to senior engineering roles, AI projects, and tech collaborations
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Email */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="text-accent-cyan" size={20} />
                <h3 className="text-white font-semibold">Email</h3>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-accent-cyan text-sm">{personalInfo.email}</span>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={copyEmail} className="p-2 text-gray-400 hover:text-white transition-colors">
                  {copied ? <Check size={16} className="text-accent-green" /> : <Copy size={16} />}
                </motion.button>
              </div>
            </div>

            {/* Location */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="text-accent-purple" size={20} />
                <h3 className="text-white font-semibold">Location</h3>
              </div>
              <p className="text-gray-400 text-sm">United States · Open to Remote & Hybrid</p>
            </div>

            {/* Social Links */}
            <div className="glass-card p-6">
              <h3 className="text-white font-semibold mb-4">Connect Online</h3>
              <div className="flex gap-4">
                {[
                  { icon: '🐙', label: 'GitHub',   href: 'https://github.com/vjsravan',                        color: 'text-white' },
                  { icon: '💼', label: 'LinkedIn', href: 'https://www.linkedin.com/in/jaysravan-fullstack/',   color: 'text-blue-400' },
                  { icon: '✉️', label: 'Email', href: `mailto:${personalInfo.email}`, color: 'text-accent-cyan' },
                ].map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    className={`flex flex-col items-center gap-2 p-4 glass-card-hover rounded-xl flex-1 ${s.color}`}
                  >
                    <span className="text-xl">{s.icon}</span>
                    <span className="text-xs text-gray-400">{s.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="glass-card p-4 flex items-center gap-3 border border-accent-green/30">
              <div className="w-3 h-3 rounded-full bg-accent-green animate-pulse flex-shrink-0" />
              <p className="text-sm text-gray-300">
                <span className="text-accent-green font-semibold">Available</span> for senior engineering &amp; AI-focused opportunities
              </p>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <input type="text" required value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent-cyan/50 transition-colors placeholder-gray-600"
                  placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input type="email" required value={formData.email}
                  onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent-cyan/50 transition-colors placeholder-gray-600"
                  placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea required rows={5} value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent-cyan/50 transition-colors placeholder-gray-600 resize-none"
                  placeholder="Let's talk about opportunities, collaborations, or just tech!" />
              </div>
              <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full btn-primary flex items-center justify-center gap-2">
                {sent ? <><Check size={16} />Opening Email Client...</> : <><Send size={16} />Send Message</>}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent-cyan/50" />
            <span className="text-accent-cyan text-xl">⚡</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent-cyan/50" />
          </div>
          <p className="text-gray-600 text-sm font-mono">Built with React + TypeScript + Tailwind + Framer Motion</p>
          <p className="text-gray-700 text-xs mt-1">Jay Sravan Vadlamudi © {new Date().getFullYear()}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

