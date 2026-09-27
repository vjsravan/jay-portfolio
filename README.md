<div align="center">

# jsv. — a portfolio that maintains itself

**Jay Sravan Vadlamudi — Senior Software Engineer**

<img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/three.js-r186-000000?style=flat-square&logo=threedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" />

A portfolio you walk through. Scrolling moves a camera through one quiet 3D space,
from a portal behind the portrait to a gallery of projects, the career path and the
architecture stack. Repos, commits and Medium posts sync in daily, and a Claude agent
opens a pull request with improvements every week.

**[🚀 Live site](https://vjsravan.github.io/jay-portfolio/)** ·
**[💼 LinkedIn](https://www.linkedin.com/in/jaysravan-fullstack/)** ·
**[✍️ Medium](https://medium.com/@jay.sravan.dev)** ·
**[📫 Email](mailto:jay.sravan.dev@gmail.com)**

</div>

---

## Features

| | |
|---|---|
| **The walk** | One fixed WebGL scene behind the page, a dark room with a survey-grid floor. Each section has a camera shot, anchored to a box in the page layout (`data-anchor`), so the 3D lands exactly where the design puts it on any screen |
| **Portal hero** | The black-and-white portrait and the name, alone, in front of a ring of warm light; nothing else in the world shows until you scroll |
| **The star** | Scrolling collapses the ring into a star that travels ahead and powers each section: a lamp over the focused project, the pulse through the pipeline, the light through each gate, the gyroscope's core. It ends by landing in the signal orb at *Contact* and igniting it |
| **Project gallery** | A small polished sculpture per project, each a picture of what it does (Blast Radius's shockwaves, LLM Gateway's routed requests, llmeval's bell curve and gate, contextlens's glass lens…). Browse with arrows, ticks, arrow keys, swipe, or a click; the page never holds you there |
| **Career path** | A gate for each role, oldest first, walked through as the roles scroll, ending at a beam marked *Now* |
| **Stack gyroscope** | One polished ring per architecture layer, nested from cloud to AI, each tumbling on its own axis with a bead per tool; the layer being read swings round to face you, lights up and carries a signal |
| **Daily self-sync** | A scheduled build pulls repos, recent commits, Medium posts and the avatar into `live.json`, then redeploys |
| **Weekly self-improvement** | A Claude Code agent reads a Lighthouse audit and the fresh data, makes up to three sourced improvements, and opens a PR |
| **AI assistant** | Gemini, grounded in the résumé *plus* the latest synced posts and commits |
| **Live visitor counter** | Server-side count via [Abacus](https://abacus.jasoncameron.dev), once per session |

three.js loads lazily after first paint, into a single canvas. Reduced-motion users get
the camera without easing or sway. Browsers without WebGL get the page on a plain dark
background. The rail on the right names the part of the walk you're in.

---

## How it maintains itself

```
daily   deploy.yml ── npm run sync ──► live.json + avatar.jpg ──► build ──► Pages
weekly  self-improve.yml ── sync ─ build ─ Lighthouse ──► Claude Code ──► pull request
```

**Sync** ([`scripts/sync-live.mjs`](portfolio-app/scripts/sync-live.mjs)) fetches each
source independently and never fails the build. A source that errors keeps its last
good snapshot, and the Live section says so. `resume.ts` stays the source of truth for
anything that is a claim. The sync only adds facts GitHub and Medium can vouch for.

**Self-improvement** is scoped by [`.github/self-improve/PROMPT.md`](.github/self-improve/PROMPT.md):
surface new repos, fix Lighthouse failures, keep the assistant's context current. It
may never invent or change a claim, and every new fact must trace to synced data or
a README. The workflow re-runs lint and build before opening the PR, and nothing
reaches the live site until you merge it. The site lists these PRs in its own
self-improvement log.

---

## Companion projects

The Projects panel links to engineering work built alongside this site:

| project | what it is | stack |
|---|---|---|
| [llm-gateway](https://github.com/vjsravan/llm-gateway) | Reliability and cost-control layer for LLM traffic — semantic cache, confidence routing, circuit breaker, per-tenant budgets | Java 21 · Spring Boot |
| [flowsim](https://github.com/vjsravan/flowsim) | Deterministic simulation testing for message-driven consumers; shrinks failures to minimal reproductions | Java 21 |
| [llmeval](https://github.com/vjsravan/llm-eval) | Regression testing and merge gating for LLM pipelines, with paired bootstrap significance testing | Python |
| [contextlens](https://github.com/vjsravan/context-lens) | Context-window forensics — provenance, budget accounting, prompt-injection detection | Python |
| [agentreplay](https://github.com/vjsravan/agent-replay) | Deterministic record, replay and fork for LLM agent runs | Python |

---

## Project structure

```
portfolio-app/
├── scripts/sync-live.mjs          GitHub + Medium + avatar → live.json
├── public/portrait.webp           black-and-white cut-out portrait (hero)
├── public/avatar.jpg              synced GitHub profile photo
└── src/
    ├── App.tsx                    single scrolling page
    ├── data/
    │   ├── resume.ts              curated content: the source of truth for claims
    │   ├── stack.ts               skills arranged as architecture layers
    │   ├── live.ts                typed view over the synced snapshot
    │   └── generated/live.json    written by the sync; committed as a fallback
    ├── world/
    │   ├── World.tsx              the fixed canvas, scroll-driven camera rig, 3D labels
    │   ├── layout.ts              where everything stands, and the camera shot per section
    │   ├── objects.tsx            floor, portal, pipeline, career path, signal orb
    │   ├── Gallery.tsx            plinths and the focused-project behaviour
    │   ├── symbols.tsx            one sculpture per project
    │   ├── Spark.tsx              the star: its path through the walk, trail and light
    │   ├── StackTower.tsx         the stack gyroscope
    │   └── store.ts               state shared between the page and the render loop
    ├── components/site/           Nav, Hero, Projects, LiveFeed, Experience, Writing,
    │                              Stack, Contact, SectionRail, AskAI
    ├── hooks/useInView.ts
    └── lib/                       visitor counter, cross-component actions
.github/
├── workflows/deploy.yml           daily + on-push build and deploy
├── workflows/self-improve.yml     weekly Claude PR
└── self-improve/PROMPT.md         the agent's brief and hard rules
```

**Curated content lives in [`src/data/resume.ts`](portfolio-app/src/data/resume.ts).**
Everything that changes on its own lives in `live.json`.

---

## Getting started

**Requirements:** Node.js 20+ and npm.

```bash
git clone https://github.com/vjsravan/jay-portfolio.git
cd jay-portfolio/portfolio-app
npm install
```

Create `.env` from the template:

```bash
cp .env.example .env
```

```
VITE_GEMINI_API_KEY=your_gemini_api_key    # aistudio.google.com/apikey
VITE_WEB3FORMS_KEY=your_web3forms_key      # web3forms.com
```

Both are optional locally — without them the AI assistant and contact form are
inactive, but everything else runs.

```bash
npm run dev
```

### Scripts

| command | does |
|---|---|
| `npm run dev` | dev server with HMR |
| `npm run sync` | refresh `live.json` and the avatar from GitHub and Medium |
| `npm run build` | type-check, then production build → `dist/` |
| `npm run preview` | serve the production build locally |
| `npm run lint` | ESLint |

---

## Deployment

Pushing to `main` and a daily schedule both trigger
[`deploy.yml`](.github/workflows/deploy.yml): sync, type-check, build, publish to
GitHub Pages.

One-time setup on a fresh clone or fork:

1. **Settings → Secrets and variables → Actions**: add `VITE_GEMINI_API_KEY` and
   `VITE_WEB3FORMS_KEY`.
2. **Settings → Pages**: set **Source** to **GitHub Actions**.
3. For the weekly agent: add the `ANTHROPIC_API_KEY` secret, and turn on
   **Settings → Actions → General → Allow GitHub Actions to create and approve pull
   requests**. Run it once by hand from the Actions tab to check it.

The build sets `VITE_BASE_PATH=/jay-portfolio/` so asset URLs resolve under the
repository subpath. Change it if you deploy elsewhere.

> **Note.** `VITE_*` values are compiled into the public JavaScript bundle. The
> Gemini key is therefore readable by anyone who opens devtools. Restrict it to this
> site's referrer in Google AI Studio, or move the call behind a proxy.

---

## License

[MIT](LICENSE) — the code is free to reuse.

The **content** is not: résumé text, employment history, certifications, and personal
details in `src/data/resume.ts` belong to Jay Sravan Vadlamudi. Replace them with your
own if you use this as a starting point.

---

<div align="center">

**Jay Sravan Vadlamudi**<br/>
Senior Software Engineer · Distributed Systems, Cloud-Native Architecture & AI Engineering

[Portfolio](https://vjsravan.github.io/jay-portfolio/) ·
[GitHub](https://github.com/vjsravan) ·
[LinkedIn](https://www.linkedin.com/in/jaysravan-fullstack/) ·
[Medium](https://medium.com/@jay.sravan.dev)

</div>
