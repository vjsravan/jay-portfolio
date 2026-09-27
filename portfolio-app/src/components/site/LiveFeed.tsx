import { GitCommitHorizontal, GitPullRequest } from 'lucide-react';
import { activity, discoveredRepos, improvements, sources, syncedAt, timeAgo } from '../../data/live';
import Section, { Reveal } from './Section';


export default function LiveFeed() {
  const lastSync = syncedAt ? timeAgo(syncedAt.toISOString()) : 'never';

  return (
    <Section
      id="live"
      eyebrow="Live · the pipeline"
      title={<>This portfolio <span className="gradient-text">maintains itself</span></>}
      intro={<>Last synced <span className="text-white">{lastSync}</span>. A GitHub Action syncs repos, commits, posts and this photo every day and rebuilds the site; once a week a Claude agent audits it and opens a pull request with improvements. Nothing below was typed by hand.</>}
    >
      {/* A window onto the floor below, where the world draws the pipeline:
          sync → rebuild → self-improve. */}
      <div data-anchor="pipeline" className="stage-3d mx-auto h-[45vh] max-w-3xl" aria-hidden />


      <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Reveal className="card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-sm font-medium text-white">
              <GitCommitHorizontal size={16} className="text-[var(--accent)]" /> Recent commits
            </h3>
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--faint)]">
              <span className={`h-1.5 w-1.5 rounded-full ${sources.github?.ok === false ? 'bg-amber-400' : 'live-dot bg-[var(--green)]'}`} />
              {sources.github?.ok === false ? 'showing last good sync' : 'github'}
            </span>
          </div>
          <ol className="relative space-y-1 before:absolute before:bottom-2 before:left-[5px] before:top-2 before:w-px before:bg-[var(--line)]">
            {activity.slice(0, 8).map(c => (
              <li key={c.sha}>
                <a href={c.url} target="_blank" rel="noreferrer" className="group relative flex gap-4 rounded-lg py-1.5 pl-0 pr-2 transition hover:bg-[var(--surface)]">
                  <span className="relative z-10 mt-1.5 h-[11px] w-[11px] flex-shrink-0 rounded-full border-2 border-[var(--bg)] bg-[var(--faint)] transition group-hover:bg-[var(--accent)]" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-[var(--text)]">{c.message}</span>
                    <span className="font-mono text-[11px] text-[var(--faint)]">
                      {c.repo} · {c.sha} · {timeAgo(c.date)}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="flex flex-col gap-4">
          <Reveal className="card p-5">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-white">
              <GitPullRequest size={16} className="text-[var(--accent-soft)]" /> Self-improvement log
            </h3>
            {improvements.length ? (
              <ul className="space-y-2">
                {improvements.map(p => (
                  <li key={p.url}>
                    <a href={p.url} target="_blank" rel="noreferrer" className="flex items-start gap-2 text-sm text-[var(--muted)] transition hover:text-white">
                      <span
                        className="mt-0.5 rounded px-1.5 py-0.5 font-mono text-[9px] uppercase"
                        style={{
                          background: p.state === 'merged' ? 'rgba(255,217,168,0.15)' : 'var(--surface-hi)',
                          color: p.state === 'merged' ? 'var(--accent-soft)' : 'var(--muted)',
                        }}
                      >
                        {p.state}
                      </span>
                      <span className="flex-1">{p.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm leading-relaxed text-[var(--muted)]">
                The first weekly agent run hasn't landed yet. Its pull requests will be listed here as they open and merge.
              </p>
            )}
          </Reveal>

          {discoveredRepos.length > 0 && (
            <Reveal className="card p-5">
              <h3 className="mb-1 text-sm font-medium text-white">Spotted on GitHub</h3>
              <p className="mb-3 text-xs text-[var(--faint)]">Recent repos that aren't written up on this site yet.</p>
              <ul className="flex flex-wrap gap-2">
                {discoveredRepos.map(r => (
                  <li key={r.name}>
                    <a href={r.homepage ?? r.url} target="_blank" rel="noreferrer" className="chip transition hover:border-[var(--line-hi)] hover:text-white">
                      {r.name}
                      {r.language && <span className="ml-1.5 text-[var(--faint)]">{r.language}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </div>
    </Section>
  );
}
