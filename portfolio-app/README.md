<div align="center">

# ⚡ NEXUS PROTOCOL — Jay Sravan Vadlamudi's AI Portfolio

<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/Framer_Motion-12-FF0055?style=for-the-badge&logo=framer&logoColor=white" />
<img src="https://img.shields.io/badge/Gemini_API-Powered-4285F4?style=for-the-badge&logo=google&logoColor=white" />

<br/>
<br/>

> A cinematic, AI-powered developer portfolio built with a sci-fi "Nexus Protocol" theme — featuring a boot sequence, animated neural background, live AI chat assistant, and a panel-based interface showcasing skills, experience, projects, and contact.

**[🚀 Live Demo](https://vjsravan.github.io/jay-portfolio/)** &nbsp;·&nbsp;
**[📫 Contact Jay](mailto:jay.sravan.dev@gmail.com)** &nbsp;·&nbsp;
**[💼 LinkedIn](https://www.linkedin.com/in/jaysravan-fullstack/)**

</div>

---

## 📸 Preview

```
┌─────────────────────────────────────────────────────────┐
│  NEXUS PROTOCOL  ·  PROFILE ACCESS: JAY SRAVAN          │
├──┬──────────────────────────────────────────────────────┤
│NX│                                                      │
│  │   [ PROFILE ]  [ EXPERIENCE ]  [ SKILLS ]            │
│👤│   [ PROJECTS ] [ AI LAB     ]  [ CONTACT ]           │
│💼│                                                      │
│<>│         Active Panel Content                         │
│📁│         with Framer Motion animations                │
│🧠│                                                      │
│✉️│                                                      │
│  ├──────────────────────────────────────────────────────┤
│  │  JAVA · SPRING BOOT · REACT · KAFKA · AWS · ...  ◄── │
└──┴──────────────────────────────────────────────────────┘
```

---

## ✨ Features

| Feature | Description |
|---|---|
| **🖥️ Nexus Boot Sequence** | Animated terminal-style boot screen with scanline effect, progress bar, and flash transition |
| **🌐 Neural Background** | `requestAnimationFrame`-driven Canvas animation with a live neural graph |
| **🤖 AI Chat Assistant** | Live AI powered by **Google Gemini API** with RAG-style context about Jay's career |
| **🖱️ Custom Cursor** | Glowing sci-fi cursor (desktop only, auto-hidden on touch devices) |
| **🧭 Panel Navigation** | Animated sidebar (desktop) / bottom nav (mobile) with 6 sections |
| **📋 Guided Onboarding** | First-visit walkthrough tour that highlights each panel |
| **📱 Fully Responsive** | Adaptive layout that works on mobile, tablet, and desktop |
| **📬 Contact Form** | Functional contact form powered by **Web3Forms** |
| **⚡ Instant Deploys** | GitHub Actions CI/CD → GitHub Pages, zero manual steps |

---

## 🧩 Project Structure

```
portfolio-app/
├── src/
│   ├── App.tsx                    # Root — boot sequence → main interface
│   ├── index.css                  # Global styles, scanline & animation keyframes
│   ├── components/
│   │   └── nexus/
│   │       ├── NexusBoot.tsx      # Boot screen with terminal lines + progress bar
│   │       ├── NexusBackground.tsx# Canvas neural graph animation
│   │       ├── NexusCursor.tsx    # Custom glowing cursor (desktop)
│   │       ├── NexusInterface.tsx # Main shell: sidebar, topbar, ticker, panel router
│   │       ├── NexusOnboarding.tsx# Guided first-visit tour
│   │       └── panels/
│   │           ├── HeroPanel.tsx      # Profile, metrics, summary
│   │           ├── ExperiencePanel.tsx# Work history (UPS, Mercedes-Benz)
│   │           ├── SkillsPanel.tsx    # Skills by category
│   │           ├── ProjectsPanel.tsx  # Featured projects
│   │           ├── AILabPanel.tsx     # AI/ML work & tools
│   │           └── ContactPanel.tsx   # Contact form (Web3Forms)
│   ├── data/
│   │   └── resume.ts              # 📌 Single source of truth for all content
│   └── hooks/
│       └── useIsMobile.ts         # Responsive breakpoint hook
├── .env.example                   # Template for required environment variables
├── .gitignore                     # .env is excluded — keys are never committed
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ ([download](https://nodejs.org/))
- **npm** v9+
- A free **Google Gemini API key** — [Get one here](https://aistudio.google.com/app/apikey)
- A free **Web3Forms key** — [Get one here](https://web3forms.com/)

### 1. Clone the repository

```bash
git clone https://github.com/vjsravan/jay-portfolio.git
cd jay-portfolio/portfolio-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
# Copy the example file
cp .env.example .env
```

Open `.env` and fill in your own keys:

```dotenv
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_WEB3FORMS_KEY=your_web3forms_key_here
```

> ⚠️ **Never commit `.env`** — it is already in `.gitignore`.

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🛠️ Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server with HMR |
| `npm run build` | Type-check + production build → `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

---

## ☁️ Deployment (GitHub Pages)

This project deploys automatically via **GitHub Actions** on every push to `main`.

### One-time GitHub setup

1. Go to your repo → **Settings → Secrets and variables → Actions**
2. Add these two secrets:

   | Secret Name | Value |
   |---|---|
   | `VITE_GEMINI_API_KEY` | Your Gemini API key |
   | `VITE_WEB3FORMS_KEY` | Your Web3Forms key |

3. Go to **Settings → Pages** → Set source to **"GitHub Actions"**

That's it. Push to `main` and your site will be live at:
```
https://<your-github-username>.github.io/jay-portfolio/
```

The workflow file is at `.github/workflows/deploy.yml` — it builds the app with your secrets injected as environment variables and deploys the output to GitHub Pages. **Your keys are never exposed in source code or build logs.**

---

## 🎨 Customisation

All portfolio content lives in a **single file**:

```
portfolio-app/src/data/resume.ts
```

Edit these exported objects to make it your own:

| Export | What it controls |
|---|---|
| `personalInfo` | Name, title, email, LinkedIn, GitHub, location |
| `skills` | All skill categories (languages, frontend, backend, AI, cloud…) |
| `experiences` | Work history with achievements and highlights |
| `education` | Degree, school, year |
| `certifications` | Cert name, issuer, badge image |
| `projects` | Featured projects with tech stack and metrics |
| `metrics` | Hero stat counters |
| `aiAssistantContext` | The prompt/context fed to the Gemini AI assistant |

No other files need to be touched for a content-only fork.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

### How to contribute

1. **Fork** this repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make** your changes and commit them
   ```bash
   git commit -m "feat: add your feature description"
   ```
4. **Push** to your fork
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request** against the `main` branch of this repo

### Guidelines

- Keep PRs focused — one feature or fix per PR
- Follow the existing code style (TypeScript strict, functional React components)
- Do **not** commit `.env` or any real API keys
- For major changes, open an issue first to discuss what you'd like to change

### Ideas for contributions

- 🌙 Dark/light theme toggle
- 🌍 i18n / multi-language support
- 🎵 Ambient audio toggle
- ♿ Accessibility improvements (ARIA labels, keyboard nav)
- 🧪 Unit / integration tests (Vitest + React Testing Library)
- 📊 New panel ideas (blog, timeline, certifications gallery)

---

## 📋 Using This As a Template

You're welcome to fork and adapt this portfolio for your own use, provided you follow the license below.

**Quick steps to personalise:**

1. Fork the repo
2. Edit `src/data/resume.ts` with your own information
3. Replace any images/badges as needed
4. Add your own API keys in GitHub Secrets
5. Update the `VITE_BASE_PATH` in `.github/workflows/deploy.yml` to match your repo name

---

## 📄 License

```
MIT License

Copyright (c) 2026 Jay Sravan Vadlamudi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👤 Author

**Jay Sravan Vadlamudi**
Sr. Software Development Engineer — Java Full Stack · Distributed Systems · AI Engineering

- 🌐 Portfolio: [vjsravan.github.io/jay-portfolio](https://vjsravan.github.io/jay-portfolio/)
- 💼 LinkedIn: [linkedin.com/in/jaysravan-fullstack](https://www.linkedin.com/in/jaysravan-fullstack/)
- 🐙 GitHub: [github.com/vjsravan](https://github.com/vjsravan)
- 📧 Email: [jay.sravan.dev@gmail.com](mailto:jay.sravan.dev@gmail.com)

---

<div align="center">

Made with ⚡ and way too many CSS `box-shadow` values.

**If you found this useful, consider giving it a ⭐ on GitHub!**

</div>
