import { useEffect, useState } from 'react';
import { Check, Copy, Github, Linkedin, Loader2, Mail, Send } from 'lucide-react';
import { personalInfo, writing } from '../../data/resume';
import { syncedAt } from '../../data/live';
import { fetchVisitorCount } from '../../lib/visitors';
import Section, { Reveal } from './Section';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

type Status = 'idle' | 'sending' | 'success' | 'error';
const EMPTY = { name: '', email: '', message: '' };

const field =
  'w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[var(--faint)] focus:border-[var(--accent)]';

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!WEB3FORMS_KEY) {
      setError(`The form isn't configured here. Email ${personalInfo.email} directly.`);
      setStatus('error');
      return;
    }
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio contact from ${form.name}`,
          from_name: 'Jay Portfolio',
          ...form,
          botcheck: '', // honeypot
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm(EMPTY);
      } else {
        setError(data.message ?? 'Sending failed. Please try again.');
        setStatus('error');
      }
    } catch {
      setError('Network error. Check your connection and try again.');
      setStatus('error');
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact · signal"
      title={<>Let's build something <span className="gradient-text">reliable</span></>}
      intro="Open to senior backend, distributed systems and AI infrastructure roles, remote or hybrid. I usually reply within a day."
    >
      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-4">
          <Reveal className="grid gap-3 sm:grid-cols-2">
            <button onClick={copy} className="card group flex items-center gap-4 p-5 text-left transition hover:border-[var(--line-hi)] sm:col-span-2">
              <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-[var(--surface-hi)] text-[var(--accent)]"><Mail size={18} /></span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs text-[var(--faint)]">Email</span>
                <span className="block truncate text-sm text-white">{personalInfo.email}</span>
              </span>
              {copied ? <Check size={16} className="text-[var(--green)]" /> : <Copy size={16} className="text-[var(--faint)] group-hover:text-white" />}
            </button>
            {[
              { href: personalInfo.linkedin, icon: Linkedin, label: 'LinkedIn', value: 'jaysravan-fullstack' },
              { href: personalInfo.github, icon: Github, label: 'GitHub', value: 'vjsravan' },
            ].map(({ href, icon: Icon, label, value }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="card flex items-center gap-4 p-5 transition hover:border-[var(--line-hi)]">
                <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-[var(--surface-hi)] text-[var(--accent)]"><Icon size={18} /></span>
                <span className="min-w-0">
                  <span className="block text-xs text-[var(--faint)]">{label}</span>
                  <span className="block text-sm text-white">{value}</span>
                </span>
              </a>
            ))}
          </Reveal>

          <Reveal>
            <form onSubmit={send} className="card flex flex-col gap-3 p-5 md:p-6">
              <div className="grid gap-3 sm:grid-cols-2">
                <input required placeholder="Name" aria-label="Name" className={field} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <input required type="email" placeholder="Email" aria-label="Email" className={field} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <textarea required rows={5} placeholder="What are you working on?" aria-label="Message" className={`${field} resize-none`} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              {status === 'error' && <p className="text-sm text-rose-400">{error}</p>}
              {status === 'success' && <p className="text-sm text-[var(--green)]">Sent. I'll get back to you soon.</p>}
              <button type="submit" disabled={status === 'sending'} className="btn btn-primary self-start disabled:opacity-60">
                {status === 'sending' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
            </form>
          </Reveal>
        </div>

        {/* The signal at the end of the walk is framed onto this box. */}
        <div data-anchor="signal" className="hidden self-center lg:block lg:h-[380px]" aria-hidden />
      </div>
    </Section>
  );
}

export function Footer() {
  const [views, setViews] = useState<number | null>(null);
  useEffect(() => { fetchVisitorCount().then(setViews); }, []);

  return (
    <footer className="border-t border-[var(--line)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-xs text-[var(--faint)] sm:px-6 md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} {personalInfo.name}</p>
        <p className="md:ml-6">
          Rebuilt automatically{syncedAt ? ` · last sync ${syncedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : ''}
          {views !== null && ` · ${views.toLocaleString()} visits`}
        </p>
        <div className="flex items-center gap-4 md:ml-auto">
          <a href={writing.profile} target="_blank" rel="noreferrer" className="hover:text-white">Medium</a>
          <a href={`${personalInfo.github}/jay-portfolio`} target="_blank" rel="noreferrer" className="hover:text-white">Source</a>
        </div>
      </div>
    </footer>
  );
}
