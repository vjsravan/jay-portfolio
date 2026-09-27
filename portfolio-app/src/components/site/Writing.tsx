import { ArrowUpRight } from 'lucide-react';
import { posts } from '../../data/live';
import { writing } from '../../data/resume';
import Section, { Reveal } from './Section';

const fmt = (iso: string) => {
  const d = new Date(iso);
  return isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export default function Writing() {
  const [lead, ...rest] = posts;
  if (!lead) return null;

  return (
    <Section
      id="writing"
      eyebrow="Writing · synced from Medium"
      title={<>How it <span className="gradient-text">actually</span> works</>}
      intro="Explainers written from production experience. This list updates itself when a new post goes out."
    >
      <div data-stage="writing" className="grid gap-4 lg:grid-cols-2">
        <Reveal>
          <a href={lead.url} target="_blank" rel="noreferrer" className="card group relative flex h-full flex-col overflow-hidden p-6 transition hover:border-[var(--line-hi)] md:p-8">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-30 blur-3xl transition group-hover:opacity-50" style={{ background: 'var(--accent)' }} />
            <p className="font-mono text-[11px] text-[var(--accent)]">Latest · {fmt(lead.published)} · {lead.readMinutes} min read</p>
            <h3 className="font-display mt-4 text-2xl font-semibold leading-tight text-white md:text-3xl">{lead.title}</h3>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--muted)]">{lead.excerpt}</p>
            <div className="mt-6 flex flex-wrap gap-1.5">
              {lead.tags.slice(0, 4).map(t => <span key={t} className="chip">{t}</span>)}
            </div>
            <span className="mt-6 inline-flex items-center gap-1 text-sm text-white">
              Read on Medium <ArrowUpRight size={15} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </a>
        </Reveal>

        <div className="flex flex-col gap-4">
          {rest.slice(0, 4).map((p, i) => (
            <Reveal key={p.url} delay={i * 0.05} className="flex-1">
              <a href={p.url} target="_blank" rel="noreferrer" className="card group flex h-full items-start gap-4 p-5 transition hover:border-[var(--line-hi)]">
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[11px] text-[var(--faint)]">{fmt(p.published)} · {p.readMinutes} min</p>
                  <h3 className="mt-1.5 text-[15px] font-medium leading-snug text-white">{p.title}</h3>
                </div>
                <ArrowUpRight size={16} className="mt-1 flex-shrink-0 text-[var(--faint)] transition group-hover:text-white" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
      <a href={writing.profile} target="_blank" rel="noreferrer" className="btn btn-ghost mt-6">
        All posts on Medium <ArrowUpRight size={15} />
      </a>
    </Section>
  );
}
