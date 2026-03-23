import React, { useState } from 'react';
import { personalInfo } from '../../../data/resume';

const kw = (s: string) => <span style={{ color: '#c586c0' }}>{s}</span>;
const st = (s: string) => <span style={{ color: '#ce9178' }}>{s}</span>;
const co = (s: string) => <span style={{ color: '#6a9955' }}>{s}</span>;
const ty = (s: string) => <span style={{ color: '#4ec9b0' }}>{s}</span>;
const vr = (s: string) => <span style={{ color: '#9cdcfe' }}>{s}</span>;
const fn = (s: string) => <span style={{ color: '#dcdcaa' }}>{s}</span>;
const tx = (s: string) => <span style={{ color: '#d4d4d4' }}>{s}</span>;

interface LineProps { num: number; children?: React.ReactNode; indent?: number }
const L: React.FC<LineProps> = ({ num, children, indent = 0 }) => (
  <div className="flex hover:bg-[#2a2d2e] min-h-[1.35rem]">
    <span className="select-none text-right pr-4 w-12 flex-shrink-0 text-xs leading-[1.35rem]" style={{ color: '#5a5a5a' }}>{num}</span>
    <span className="flex-1 text-xs leading-[1.35rem] pr-4 font-mono whitespace-pre">{' '.repeat(indent * 2)}{children}</span>
  </div>
);

const ContactEditor: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: '', message: '' });
  const [sent, setSent] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = () => {
    if (!form.name || !form.message) return;
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Hi Jay,\n\n${form.message}\n\nBest regards,\n${form.name}`);
    window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: '', message: '' }); }, 3000);
  };

  let n = 1;
  const l = () => n++;

  return (
    <div
      className="h-full overflow-y-auto py-2"
      style={{
        background: '#1e1e1e',
        fontFamily: "'Cascadia Code','Fira Code','JetBrains Mono',monospace",
        scrollbarWidth: 'thin',
        scrollbarColor: '#424242 transparent',
      }}
    >
      <L num={l()}>{co('// contact.ts — Reach out to Jay Sravan Vadlamudi')}</L>
      <L num={l()}>{co('// Open to: Senior Engineering roles · AI Projects · Remote / Hybrid')}</L>
      <L num={l()}></L>
      <L num={l()}>{kw('interface')} {ty('ContactInfo')} {tx('{')}</L>
      <L num={l()} indent={1}>{vr('email')}{tx(':')} {ty('string')}{tx(';')}</L>
      <L num={l()} indent={1}>{vr('location')}{tx(':')} {ty('string')}{tx(';')}</L>
      <L num={l()} indent={1}>{vr('linkedin')}{tx(':')} {ty('string')}{tx(';')}</L>
      <L num={l()} indent={1}>{vr('github')}{tx(':')} {ty('string')}{tx(';')}</L>
      <L num={l()} indent={1}>{vr('status')}{tx(':')} {st('"available"')} {tx('|')} {st('"busy"')} {tx('|')} {st('"open"')}{tx(';')}</L>
      <L num={l()}>{tx('}')}</L>
      <L num={l()}></L>
      <L num={l()}>{kw('export const')} {vr('contact')}{tx(':')} {ty('ContactInfo')} {tx('= {')}</L>
      <L num={l()} indent={1}>{vr('email')}{tx(': ')}{st(`"${personalInfo.email}"`)}{tx(',')}</L>
      <L num={l()} indent={1}>{vr('location')}{tx(': ')}{st(`"${personalInfo.location} · Open to Remote & Hybrid"`)}{tx(',')}</L>
      <L num={l()} indent={1}>{vr('linkedin')}{tx(': ')}{st('"https://www.linkedin.com/in/jaysravan-fullstack/"')}{tx(',')}</L>
      <L num={l()} indent={1}>{vr('github')}{tx(': ')}{st('"https://github.com/vjsravan"')}{tx(',')}</L>
      <L num={l()} indent={1}>{vr('status')}{tx(': ')}{st('"open"')}{tx(' as const,')}</L>
      <L num={l()}>{tx('};')}</L>
      <L num={l()}></L>
      <L num={l()}>{co('// ── Interactive Contact Form ──────────────────────────')}</L>
      <L num={l()}>{co('// NOTE: This is live UI rendered inside the editor 👇')}</L>
      <L num={l()}></L>

      {/* Live interactive section embedded as a "widget" */}
      <div className="mx-12 my-3">
        <div
          className="rounded-lg p-4 space-y-3"
          style={{ background: '#252526', border: '1px solid #3c3c3c' }}
        >
          {/* Status */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-mono" style={{ color: '#4ec9b0' }}>status: "open" — Available for opportunities</span>
          </div>

          {/* Quick links */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={copyEmail}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-all hover:opacity-90"
              style={{ background: '#0078d420', border: '1px solid #0078d440', color: '#007acc' }}
            >
              {copied ? '✓ Copied!' : `✉ ${personalInfo.email}`}
            </button>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-all hover:opacity-90"
              style={{ background: '#0077b520', border: '1px solid #0077b540', color: '#0077b5', textDecoration: 'none' }}
            >
              🔗 LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-all hover:opacity-90"
              style={{ background: '#ffffff10', border: '1px solid #ffffff20', color: '#d4d4d4', textDecoration: 'none' }}
            >
              🐙 GitHub
            </a>
          </div>

          {/* Form */}
          <div className="space-y-2">
            <p className="text-[10px] font-mono" style={{ color: '#6a9955' }}>// Quick message → opens your email client</p>
            <input
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="your name"
              className="w-full px-3 py-1.5 rounded text-xs font-mono outline-none"
              style={{
                background: '#1e1e1e',
                border: '1px solid #3c3c3c',
                color: '#ce9178',
                caretColor: '#aeafad',
              }}
            />
            <textarea
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              placeholder="say hello, ask about a role, or just connect..."
              rows={3}
              className="w-full px-3 py-1.5 rounded text-xs font-mono outline-none resize-none"
              style={{
                background: '#1e1e1e',
                border: '1px solid #3c3c3c',
                color: '#9cdcfe',
                caretColor: '#aeafad',
              }}
            />
            <button
              onClick={handleSend}
              className="px-4 py-1.5 rounded text-xs font-mono transition-all hover:opacity-90"
              style={{
                background: sent ? '#10b981' : '#0078d4',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {sent ? '✓ Opening email client...' : '▶ send()'}
            </button>
          </div>
        </div>
      </div>

      {/* More code after the widget */}
      <L num={l()}></L>
      <L num={l()}>{kw('const')} {fn('sendMessage')} {tx('= ')}{kw('async')} {tx('(')}</L>
      <L num={l()} indent={1}>{vr('from')}{tx(':')} {ty('string')}{tx(',')}</L>
      <L num={l()} indent={1}>{vr('message')}{tx(':')} {ty('string')}</L>
      <L num={l()}>{tx(')')} {tx(':')} {ty('Promise<void>')} {tx('=>')} {tx('{')}</L>
      <L num={l()} indent={1}>{co('// Opens default email client with pre-filled message')}</L>
      <L num={l()} indent={1}>{kw('const')} {vr('subject')} {tx('=')} {fn('encodeURIComponent')}{tx(`(\`Portfolio Contact from \${`)}{vr('from')}{tx('}\`);\n')}</L>
      <L num={l()} indent={1}>{fn('window.open')}{tx(`(\`mailto:\${`)}{vr('contact.email')}{tx(`}?subject=\${`)}{vr('subject')}{tx('}\`);\n')}</L>
      <L num={l()}>{tx('};')}</L>
      <L num={l()}></L>
      <L num={l()}>{kw('export')} {tx('{ ')}{vr('contact')}{tx(', ')}{fn('sendMessage')}{tx(' };')}</L>
    </div>
  );
};

export default ContactEditor;

