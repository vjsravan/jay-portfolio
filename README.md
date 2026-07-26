<div align="center">

# ⚡ NEXUS PROTOCOL

**Jay Sravan Vadlamudi — Senior Software Engineer**

<img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/Framer_Motion-12-FF0055?style=flat-square&logo=framer&logoColor=white" />
<img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" />

A single-page portfolio with a sci-fi terminal aesthetic — boot sequence, animated
canvas background, six navigable panels, a live AI assistant, and a hidden command line.

**[🚀 Live site](https://vjsravan.github.io/jay-portfolio/)** ·
**[💼 LinkedIn](https://www.linkedin.com/in/jaysravan-fullstack/)** ·
**[✍️ Medium](https://medium.com/@jay.sravan.dev)** ·
**[📫 Email](mailto:jay.sravan.dev@gmail.com)**

</div>

---

## Features

| | |
|---|---|
| **Boot sequence** | Staged terminal boot with progress bar before the interface loads |
| **Six panels** | Profile · Experience · Skills · Projects · AI Lab · Contact |
| **Hidden terminal** | Press <kbd>`</kbd> for a real command line — `help`, `whoami`, `skills`, `open <section>`, `matrix`, `sudo hire-jay` |
| **AI assistant** | Google Gemini with RAG-style résumé context, in the AI Lab panel |
| **Live visitor counter** | Server-side count via [Abacus](https://abacus.jasoncameron.dev), incremented once per session |
| **Animated background** | Canvas particle field with hex grid and cursor interaction, throttled to 30 fps |
| **Orbital tech map** | Four rotating rings of technologies around an arc-reactor core |
| **Custom cursor** | Reticle cursor with hover and click states (pointer devices only) |
| **Contact form** | Web3Forms — delivers straight to email, no backend |
| **Responsive** | Separate mobile layout with bottom tab navigation |

Everything renders client-side. No backend, no database, and no tracking beyond the
visitor count.

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
├── src/
│   ├── App.tsx                     boot → interface handoff
│   ├── data/resume.ts              single source of truth for all content
│   ├── lib/visitors.ts             visitor counter client
│   ├── hooks/useIsMobile.ts
│   └── components/nexus/
│       ├── NexusBoot.tsx           startup sequence
│       ├── NexusBackground.tsx     canvas particles + hex grid
│       ├── NexusCursor.tsx         custom reticle cursor
│       ├── NexusInterface.tsx      shell: nav, HUD, ticker
│       ├── NexusOnboarding.tsx     guided first-visit tour
│       ├── NexusTerminal.tsx       hidden command line
│       ├── VisitorBadge.tsx        live view counter
│       └── panels/                 the six content panels
└── .github/workflows/deploy.yml    build + deploy to Pages
```

**All content lives in [`src/data/resume.ts`](portfolio-app/src/data/resume.ts).**
Experience, skills, projects, certifications, writing, and the AI assistant's context
are defined there — edit that one file and every panel updates.

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
| `npm run build` | type-check, then production build → `dist/` |
| `npm run preview` | serve the production build locally |
| `npm run lint` | ESLint |

---

## Deployment

Pushing to `main` triggers [`deploy.yml`](.github/workflows/deploy.yml), which
type-checks, builds with Vite, and publishes to GitHub Pages.

One-time setup on a fresh clone or fork:

1. **Settings → Secrets and variables → Actions** — add `VITE_GEMINI_API_KEY` and
   `VITE_WEB3FORMS_KEY`. They are injected at build time and never appear in logs or
   in the committed source.
2. **Settings → Pages** — set **Source** to **GitHub Actions**.
3. Push to `main`.

The build sets `VITE_BASE_PATH=/jay-portfolio/` so asset URLs resolve under the
repository subpath. Change it if you deploy elsewhere.

---

## Implementation notes

**Visitor counter.** Counts once per browser session via `sessionStorage`, so refreshes
don't inflate it. If the counter API is unreachable the badge hides itself rather than
rendering a broken value.

**Performance.** The hero panel is the heaviest screen — 160 animated stars, four orbit
rings, fifteen badges. Three things keep it smooth: the orbiting badges avoid
`backdrop-filter` (fifteen live blur regions in motion is expensive, and invisible
against black anyway), the arc-reactor pulse animates `scale` rather than
`width`/`height` to stay off the layout path, and the star field and orbit system are
memoised so the typewriter effect doesn't re-render them on every tick.

**Accessibility.** The custom cursor hides the system cursor on pointer devices and is
disabled entirely on touch. The boot sequence is unskippable on first load — a
deliberate trade-off in favour of the effect.

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
