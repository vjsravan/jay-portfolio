/**
 * The self-updating half of the site's content.
 *
 * `generated/live.json` is rewritten by scripts/sync-live.mjs before every
 * CI build, including the daily scheduled one. The committed copy is only a
 * snapshot so local dev and offline builds work.
 *
 * resume.ts stays the source of truth for anything that is a claim — roles,
 * metrics, project write-ups. This file only ever adds facts GitHub and
 * Medium can vouch for: what was pushed, when, and what was published.
 */
import snapshot from './generated/live.json';
import { projects, writing } from './resume';

export interface LiveRepo {
  name: string;
  description: string;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  topics: string[];
  pushedAt: string;
  createdAt: string;
}

export interface LiveCommit {
  repo: string;
  sha: string;
  message: string;
  date: string;
  url: string;
}

export interface LivePost {
  title: string;
  url: string;
  published: string;
  tags: string[];
  excerpt: string;
  readMinutes: number;
}

export interface LiveImprovement {
  title: string;
  url: string;
  state: 'merged' | 'open' | 'closed';
  date: string;
}

interface LiveSnapshot {
  syncedAt?: string;
  sources?: Record<string, { ok: boolean; at: string | null }>;
  repos: LiveRepo[];
  activity: LiveCommit[];
  posts: LivePost[];
  improvements?: LiveImprovement[];
}

const live = snapshot as unknown as LiveSnapshot;

export const syncedAt = live.syncedAt ? new Date(live.syncedAt) : null;
export const activity = live.activity;
export const improvements = live.improvements ?? [];
export const sources = live.sources ?? {};

const repoName = (url: string) => url.replace(/\/$/, '').split('/').pop()!.toLowerCase();
const reposByName = new Map(live.repos.map(r => [r.name.toLowerCase(), r]));

/** Curated projects, each annotated with its live GitHub state. */
export const liveProjects = projects.map(p => ({
  ...p,
  live: p.repo ? reposByName.get(repoName(p.repo)) ?? null : null,
}));

export type Project = (typeof liveProjects)[number];

/**
 * Repos pushed to in the last 120 days that no curated project covers yet —
 * new work surfaces on the site before anyone writes it up. The weekly
 * self-improve agent is told to promote these into resume.ts with a real
 * description.
 */
const curated = new Set(projects.flatMap(p => (p.repo ? [repoName(p.repo)] : [])));
const FRESH_MS = 120 * 24 * 3600 * 1000;
export const discoveredRepos = live.repos.filter(
  r => !curated.has(r.name.toLowerCase()) && Date.now() - Date.parse(r.pushedAt) < FRESH_MS,
);

/** Medium posts from the feed; the hand-written list only if the feed never synced. */
export const posts: LivePost[] = live.posts.length
  ? live.posts
  : writing.articles.map(a => ({
      title: a.title,
      url: a.url,
      published: a.published,
      tags: a.tags,
      excerpt: a.blurb,
      readMinutes: parseInt(a.readTime, 10) || 5,
    }));

export function timeAgo(iso: string, now = Date.now()): string {
  const s = Math.max(0, (now - Date.parse(iso)) / 1000);
  const steps: [number, string][] = [[60, 's'], [60, 'm'], [24, 'h'], [30, 'd'], [12, 'mo']];
  let v = s;
  for (const [n, unit] of steps) {
    if (v < n) return `${Math.floor(v)}${unit} ago`;
    v /= n;
  }
  return `${Math.floor(v)}y ago`;
}
