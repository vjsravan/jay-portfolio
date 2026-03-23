import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Copy, Check, ExternalLink, Send, Loader2, AlertCircle } from 'lucide-react';
import { personalInfo, certifications } from '../../../data/resume';
import { useIsMobile } from '../../../hooks/useIsMobile';

const WEB3FORMS_KEY = 'baa4fcc7-882d-4ce3-8867-f5665333f1ee';

type Status = 'idle' | 'sending' | 'success' | 'error';

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const EMPTY_FORM: FormState = { name: '', email: '', phone: '', message: '' };

const SOCIALS = [
  { icon: '🐙', label: 'GitHub',   href: 'https://github.com/vjsravan',                        color: '#ffffff' },
  { icon: '✉️', label: 'Email',    href: `mailto:${personalInfo.email}`,        color: '#ff006e' },
];

// Shared input style helper
const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,0,110,0.2)',
  borderRadius: 8,
  padding: '9px 12px',
  color: '#fff',
  fontFamily: 'JetBrains Mono, monospace',
  fontSize: 13,
  outline: 'none',
  transition: 'border-color 0.2s',
};

const InputField: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  hint?: string;
}> = ({ label, value, onChange, placeholder, type = 'text', required = false, hint }) => (
  <div>
    <div className="flex items-center justify-between mb-1.5">
      <label className="font-mono text-[10px] tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>
        {label}{required && <span style={{ color: '#ff006e' }}> *</span>}
      </label>
      {hint && <span className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.2)' }}>{hint}</span>}
    </div>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      style={inputStyle}
      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,0,110,0.65)')}
      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,0,110,0.2)')}
    />
  </div>
);

const ContactPanel: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const isMobile = useIsMobile();

  const set = (field: keyof FormState) => (v: string) =>
    setForm(f => ({ ...f, [field]: v }));

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio contact from ${form.name}`,
          from_name: 'Jay Portfolio',
          name: form.name,
          email: form.email,
          phone: form.phone || 'Not provided',
          message: form.message,
          // Honeypot spam protection
          botcheck: '',
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setForm(EMPTY_FORM);
        setTimeout(() => setStatus('idle'), 7000);
      } else {
        setErrorMsg(data.message ?? 'Transmission failed. Please retry.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error — check your connection and retry.');
      setStatus('error');
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto nx-scroll" style={{ padding: isMobile ? '1rem' : '1.5rem 2rem' }}>
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '1.25rem' : '2rem',
        maxWidth: 900,
        margin: '0 auto',
      }}>

        {/* ── LEFT — Contact info ── */}
        <div className="flex flex-col gap-4" style={{ width: isMobile ? '100%' : 280, flexShrink: 0 }}>

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-3 rounded-xl"
            style={{ background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.22)' }}
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ background: '#00ff88', boxShadow: '0 0 8px #00ff88' }}
            />
            <div>
              <p className="font-mono text-[11px] font-bold" style={{ color: '#00ff88' }}>
                OPEN TO OPPORTUNITIES
              </p>
              <p className="font-mono text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Senior roles · AI projects · Remote / Hybrid
              </p>
            </div>
          </motion.div>

          {/* Email row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="p-4 rounded-xl relative overflow-hidden"
            style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.2)' }}
          >
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, #00d4ff, transparent)' }} />
            <div className="flex items-center gap-2 mb-2">
              <Mail size={12} style={{ color: '#00d4ff' }} />
              <span className="font-mono text-[10px] tracking-widest" style={{ color: 'rgba(0,212,255,0.5)' }}>
                SECURE CHANNEL
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-xs" style={{ color: '#00d4ff' }}>{personalInfo.email}</span>
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={copyEmail} data-hover
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg font-mono text-[10px] flex-shrink-0"
                style={{
                  background: 'rgba(0,212,255,0.12)',
                  border: '1px solid rgba(0,212,255,0.3)',
                  color: copied ? '#00ff88' : '#00d4ff',
                }}
              >
                {copied ? <Check size={10} /> : <Copy size={10} />}
                {copied ? 'COPIED' : 'COPY'}
              </motion.button>
            </div>
            <div className="flex items-center gap-1.5 mt-2 font-mono text-[10px]"
              style={{ color: 'rgba(255,255,255,0.3)' }}>
              <MapPin size={9} />
              {personalInfo.location} · Remote & Hybrid
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-2 gap-2"
          >
            {SOCIALS.map(s => (
              <motion.a
                key={s.label}
                href={s.href} target="_blank" rel="noopener noreferrer" data-hover
                whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.96 }}
                className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <span className="text-lg">{s.icon}</span>
                <span className="font-mono text-[9px] tracking-wide" style={{ color: s.color }}>{s.label}</span>
                <ExternalLink size={8} style={{ color: 'rgba(255,255,255,0.2)' }} />
              </motion.a>
            ))}
          </motion.div>

          {/* AWS cert */}
          {certifications.map(cert => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22 }}
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)' }}
            >
              <span className="text-lg">{cert.icon}</span>
              <div>
                <div className="font-bold text-xs" style={{ color: cert.color }}>{cert.name}</div>
                <div className="font-mono text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>{cert.issuer}</div>
              </div>
            </motion.div>
          ))}


        </div>

        {/* ── RIGHT — Transmission form ── */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12 }}
          className="flex-1 p-6 rounded-xl relative overflow-hidden"
          style={{ background: 'rgba(255,0,110,0.04)', border: '1px solid rgba(255,0,110,0.2)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, #ff006e, transparent)' }} />

          <div className="flex items-center justify-between mb-5">
            <span className="font-mono text-[10px] tracking-widest" style={{ color: 'rgba(255,0,110,0.6)' }}>
              ► INITIATE TRANSMISSION
            </span>
            <span className="font-mono text-[9px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Powered by Web3Forms · Sent silently to Gmail
            </span>
          </div>

          <AnimatePresence mode="wait">

            {/* SUCCESS state */}
            {status === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center gap-4 py-12"
              >
                <motion.div
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl"
                >
                  ✅
                </motion.div>
                <div className="text-center">
                  <p className="font-mono font-bold text-base" style={{ color: '#00ff88', textShadow: '0 0 16px #00ff88' }}>
                    TRANSMISSION DELIVERED
                  </p>
                  <p className="font-mono text-[11px] mt-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    Message sent to Jay's inbox. Expect a reply within 24–48 hours.
                  </p>
                </div>
                <motion.button
                  onClick={() => setStatus('idle')}
                  whileHover={{ scale: 1.04 }} data-hover
                  className="font-mono text-[11px] px-4 py-1.5 rounded-lg"
                  style={{ border: '1px solid rgba(0,255,136,0.3)', color: '#00ff88', background: 'rgba(0,255,136,0.06)' }}
                >
                  SEND ANOTHER
                </motion.button>
              </motion.div>
            )}

            {/* FORM state */}
            {status !== 'success' && (
              <motion.form
                key="form"
                onSubmit={handleSend}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Row: Name + Email */}
                <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
                  <InputField
                    label="FULL NAME"
                    value={form.name}
                    onChange={set('name')}
                    placeholder="Jane Smith"
                    required
                  />
                  <InputField
                    label="EMAIL ADDRESS"
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    placeholder="jane@company.com"
                    required
                  />
                </div>

                {/* Phone */}
                <InputField
                  label="PHONE NUMBER"
                  type="tel"
                  value={form.phone}
                  onChange={set('phone')}
                  placeholder="+1 (555) 000-0000"
                  hint="optional"
                />

                {/* Message */}
                <div>
                  <label className="block font-mono text-[10px] mb-1.5 tracking-widest"
                    style={{ color: 'rgba(255,255,255,0.35)' }}>
                    MESSAGE PAYLOAD <span style={{ color: '#ff006e' }}>*</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={e => set('message')(e.target.value)}
                    placeholder="Say hello, discuss a role, or just connect..."
                    rows={5}
                    required
                    style={{ ...inputStyle, resize: 'none' }}
                    onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,0,110,0.65)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,0,110,0.2)')}
                  />
                </div>

                {/* Error message */}
                <AnimatePresence>
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg"
                      style={{ background: 'rgba(255,0,110,0.1)', border: '1px solid rgba(255,0,110,0.3)' }}
                    >
                      <AlertCircle size={13} style={{ color: '#ff006e', flexShrink: 0 }} />
                      <span className="font-mono text-[11px]" style={{ color: '#ff006e' }}>{errorMsg}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={status !== 'sending' ? { scale: 1.02 } : {}}
                  whileTap={status !== 'sending' ? { scale: 0.97 } : {}}
                  data-hover
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-mono text-sm font-bold tracking-widest"
                  style={{
                    background: status === 'sending'
                      ? 'rgba(255,0,110,0.3)'
                      : 'linear-gradient(135deg, #ff006e, #bd00ff)',
                    color: '#fff',
                    boxShadow: status === 'sending' ? 'none' : '0 0 20px rgba(255,0,110,0.3)',
                    opacity: status === 'sending' ? 0.8 : 1,
                    transition: 'all 0.2s',
                  }}
                >
                  {status === 'sending' ? (
                    <><Loader2 size={14} className="animate-spin" /> TRANSMITTING...</>
                  ) : (
                    <><Send size={14} /> SEND TRANSMISSION</>
                  )}
                </motion.button>

                <p className="font-mono text-[10px] text-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  Sent silently in the background · No popups · Delivered straight to Jay's Gmail
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPanel;

