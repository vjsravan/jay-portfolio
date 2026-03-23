import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Notification {
  id: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  body: string;
  delay: number;
  duration: number;
}

const NOTIFICATIONS: Notification[] = [
  {
    id: 'copilot',
    icon: '✦',
    iconBg: 'rgba(139,92,246,0.2)',
    iconColor: '#8b5cf6',
    title: 'GitHub Copilot',
    body: 'Generating insight: Jay ships production-grade code daily.',
    delay: 5000,
    duration: 6000,
  },
  {
    id: 'spring',
    icon: '🍃',
    iconBg: 'rgba(16,185,129,0.2)',
    iconColor: '#10b981',
    title: 'Spring Boot Dashboard',
    body: '10 microservices online · Reactive · 99.9% uptime · 0 incidents',
    delay: 13000,
    duration: 6000,
  },
  {
    id: 'aws',
    icon: '☁️',
    iconBg: 'rgba(245,158,11,0.15)',
    iconColor: '#f59e0b',
    title: 'AWS Toolkit',
    body: 'Deployment complete · jay-portfolio.prod · us-east-1',
    delay: 24000,
    duration: 6000,
  },
  {
    id: 'hire',
    icon: '🚀',
    iconBg: 'rgba(6,182,212,0.15)',
    iconColor: '#06b6d4',
    title: 'Portfolio OS · Signal',
    body: 'Strong candidate detected. Consider sending an offer. 🎯',
    delay: 38000,
    duration: 10000,
  },
];

const VsNotifications: React.FC = () => {
  const [visible, setVisible] = useState<Set<string>>(new Set());

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    NOTIFICATIONS.forEach(n => {
      const showTimer = setTimeout(() => {
        setVisible(v => new Set([...v, n.id]));
        const hideTimer = setTimeout(() => {
          setVisible(v => { const s = new Set(v); s.delete(n.id); return s; });
        }, n.duration);
        timers.push(hideTimer);
      }, n.delay);
      timers.push(showTimer);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  const dismiss = (id: string) =>
    setVisible(v => { const s = new Set(v); s.delete(id); return s; });

  const active = NOTIFICATIONS.filter(n => visible.has(n.id));

  return (
    <div
      className="fixed bottom-8 right-4 z-[500] flex flex-col gap-2 items-end pointer-events-none"
      style={{ maxWidth: 340 }}
    >
      <AnimatePresence>
        {active.map(n => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 48, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 48, scale: 0.95 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="flex items-start gap-3 p-3 rounded-lg w-80 pointer-events-auto"
            style={{
              background: '#252526',
              border: '1px solid #3c3c3c',
              boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
            }}
          >
            {/* Icon */}
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm"
              style={{ background: n.iconBg }}
            >
              <span style={{ color: n.iconColor, fontSize: 14 }}>{n.icon}</span>
            </div>

            {/* Body */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate" style={{ color: '#d4d4d4' }}>{n.title}</p>
              <p className="text-[11px] mt-0.5 leading-relaxed" style={{ color: '#858585' }}>{n.body}</p>
            </div>

            {/* Dismiss */}
            <button
              onClick={() => dismiss(n.id)}
              className="flex-shrink-0 mt-0.5 p-0.5 rounded hover:bg-[#3c3c3c] transition-colors"
              style={{ color: '#5a5a5a' }}
            >
              <X size={11} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default VsNotifications;

