#!/usr/bin/env node
/**
 * Pulls the parts of the portfolio that change without a code change —
 * repos, recent commits, Medium posts, the profile photo — into
 * src/data/generated/live.json and public/avatar.jpg.
 *
 * Runs in CI before every build (including the daily scheduled one), so the
 * site keeps itself current. Each source is fetched independently and a
 * failed source keeps its previous snapshot: a GitHub outage or a Medium
 * rate limit must never break a deploy or blank out a section.
 *
 * Zero dependencies — Node 20 fetch only.
 *
 *   GITHUB_TOKEN  optional; raises the API limit from 60 to 1000+ req/h
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = resolve(ROOT, 'src/data/generated/live.json');
const AVATAR = resolve(ROOT, 'public/avatar.jpg');

const GITHUB_USER = 'vjsravan';
const SITE_REPO = 'jay-portfolio';
/** Branch prefix the weekly self-improve workflow opens its PRs from. */
const IMPROVE_BRANCH = 'self-improve/';
const MEDIUM_USER = 'jay.sravan.dev';
/** How many of the most recently pushed repos to read commits from. */
const ACTIVITY_REPOS = 8;
const ACTIVITY_LIMIT = 14;
const POSTS_LIMIT = 6;

const ghHeaders = {
  Accept: 'application/vnd.github+json',
  'User-Agent': `${GITHUB_USER}-portfolio-sync`,
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

async function gh(path) {
  const res = await fetch(`https://api.github.com${path}`, { headers: ghHeaders });
  if (!res.ok) throw new Error(`GitHub ${path} → ${res.status}`);
  return res.json();
}

async function syncRepos() {
  const raw = await gh(`/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`);
  return raw
    // Forks are other people's work, and the profile README repo is not a project.
    .filter(r => !r.fork && !r.archived && r.name !== GITHUB_USER)
    .map(r => ({
      name: r.name,
      description: r.description ?? '',
      url: r.html_url,
      homepage: r.homepage || null,
      language: r.language,
      stars: r.stargazers_count,
      topics: r.topics ?? [],
      pushedAt: r.pushed_at,
      createdAt: r.created_at,
    }));
}

async function syncActivity(repos) {
  const recent = repos.slice(0, ACTIVITY_REPOS);
  const perRepo = await Promise.all(
    recent.map(async repo => {
      try {
        const commits = await gh(`/repos/${GITHUB_USER}/${repo.name}/commits?per_page=6`);
        return commits
          // Merge commits repeat the message of the work they merge.
          .filter(c => (c.parents?.length ?? 1) < 2)
          .map(c => ({
            repo: repo.name,
            sha: c.sha.slice(0, 7),
            message: c.commit.message.split('\n')[0].slice(0, 120),
            date: c.commit.author?.date ?? c.commit.committer?.date,
            url: c.html_url,
          }));
      } catch {
        return []; // an empty repo answers 409; skip it rather than fail the lot
      }
    }),
  );
  return perRepo
    .flat()
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, ACTIVITY_LIMIT);
}

/** The site's own changelog: every PR the self-improve agent has opened. */
async function syncImprovements() {
  const pulls = await gh(`/repos/${GITHUB_USER}/${SITE_REPO}/pulls?state=all&per_page=50`);
  return pulls
    .filter(p => p.head?.ref?.startsWith(IMPROVE_BRANCH))
    .map(p => ({
      title: p.title,
      url: p.html_url,
      state: p.merged_at ? 'merged' : p.state === 'open' ? 'open' : 'closed',
      date: p.merged_at ?? p.created_at,
    }))
    .slice(0, 8);
}

const cdata = s => s?.replace(/^<!\[CDATA\[|\]\]>$/g, '').trim() ?? '';
const tag = (xml, name) => cdata(xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`))?.[1]);
const decode = s =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
   .replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&nbsp;/g, ' ');

async function syncPosts() {
  const res = await fetch(`https://medium.com/feed/@${MEDIUM_USER}`, {
    headers: { 'User-Agent': `${GITHUB_USER}-portfolio-sync` },
  });
  if (!res.ok) throw new Error(`Medium feed → ${res.status}`);
  const xml = await res.text();
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(m => m[1]);
  return items.slice(0, POSTS_LIMIT).map(item => {
    const body = decode(tag(item, 'content:encoded').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
    const words = body.split(' ').length;
    return {
      title: decode(tag(item, 'title')),
      url: tag(item, 'link').split('?')[0],
      published: new Date(tag(item, 'pubDate')).toISOString(),
      tags: [...item.matchAll(/<category>([\s\S]*?)<\/category>/g)].map(m => cdata(m[1])),
      excerpt: body.slice(0, 240).replace(/\s\S*$/, '') + '…',
      readMinutes: Math.max(1, Math.round(words / 230)),
    };
  });
}

async function syncAvatar() {
  const res = await fetch(`https://github.com/${GITHUB_USER}.png?size=460`);
  if (!res.ok) throw new Error(`avatar → ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 1024) throw new Error('avatar suspiciously small');
  await mkdir(dirname(AVATAR), { recursive: true });
  await writeFile(AVATAR, buf);
}

async function main() {
  const previous = await readFile(OUT, 'utf8').then(JSON.parse).catch(() => ({}));
  const now = new Date().toISOString();
  const sources = { ...(previous.sources ?? {}) };
  const next = { ...previous };

  const attempt = async (name, fn) => {
    try {
      await fn();
      sources[name] = { ok: true, at: now };
      console.log(`✓ ${name}`);
    } catch (e) {
      sources[name] = { ok: false, at: sources[name]?.at ?? null, error: String(e.message ?? e) };
      console.warn(`✗ ${name}: ${e.message ?? e} — keeping previous snapshot`);
    }
  };

  await attempt('github', async () => {
    next.repos = await syncRepos();
    next.activity = await syncActivity(next.repos);
  });
  await attempt('improvements', async () => { next.improvements = await syncImprovements(); });
  await attempt('medium', async () => { next.posts = await syncPosts(); });
  await attempt('avatar', syncAvatar);

  next.syncedAt = now;
  next.sources = sources;
  next.repos ??= [];
  next.activity ??= [];
  next.posts ??= [];
  next.improvements ??= [];

  await mkdir(dirname(OUT), { recursive: true });
  await writeFile(OUT, JSON.stringify(next, null, 2) + '\n');
  console.log(`→ ${next.repos.length} repos · ${next.activity.length} commits · ${next.posts.length} posts`);
}

main();
