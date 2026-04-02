# 🤝 Contributing to NEXUS PROTOCOL Portfolio

First off — thanks for taking the time to contribute! 🎉

Whether you're fixing a bug, suggesting an improvement, or using this as a template for your own portfolio, all contributions are welcome.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started Locally](#getting-started-locally)
- [Pull Request Process](#pull-request-process)
- [Commit Message Convention](#commit-message-convention)
- [Style Guide](#style-guide)
- [Security — Never Commit API Keys](#security--never-commit-api-keys)

---

## 🧑‍⚖️ Code of Conduct

Be respectful, constructive, and kind. This project follows basic open-source etiquette:

- No harassment, discrimination, or personal attacks
- Critique code, not people
- Welcome newcomers

---

## 💡 How Can I Contribute?

### 🐛 Reporting Bugs

- Open a [GitHub Issue](../../issues/new)
- Describe what you expected vs. what happened
- Include your browser/OS and steps to reproduce

### 🚀 Suggesting Features

- Open a [GitHub Issue](../../issues/new) with the label `enhancement`
- Explain the use case and why it would benefit the project

### 🔧 Submitting Code

Ideas for contributions:

| Idea | Difficulty |
|---|---|
| Dark/light theme toggle | Medium |
| Keyboard navigation improvements | Medium |
| Accessibility (ARIA labels) | Easy |
| Unit tests (Vitest + RTL) | Medium |
| Ambient audio toggle | Easy |
| i18n / multi-language support | Hard |
| New panel (Blog, Timeline, etc.) | Medium |
| Mobile UX improvements | Easy–Medium |

---

## 🛠️ Getting Started Locally

### 1. Fork & clone

```bash
# Fork via GitHub UI first, then:
git clone https://github.com/<your-username>/jay-portfolio.git
cd jay-portfolio/portfolio-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
# Fill in your own API keys (see .env.example)
```

### 4. Run the dev server

```bash
npm run dev
# → http://localhost:5173
```

### 5. Build check before submitting

```bash
npm run build
npm run lint
```

---

## 🔁 Pull Request Process

1. **Branch off `main`**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-description
   ```

2. **Make your changes** — keep them focused (one PR per feature/fix)

3. **Test locally** — run `npm run build` and check the app works

4. **Commit your changes** (see [commit convention](#commit-message-convention) below)

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request** against the `main` branch

7. **Fill out the PR description** — explain what you changed and why

> For **major changes**, open an issue first to discuss the approach before starting work.

---

## 📝 Commit Message Convention

```
<type>: <short description>
```

| Type | When to use |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `style` | CSS/styling changes (no logic change) |
| `refactor` | Code restructuring without feature change |
| `docs` | Documentation only |
| `chore` | Build scripts, config, tooling |
| `perf` | Performance improvements |
| `test` | Adding or fixing tests |

**Examples:**
```
feat: add dark mode toggle to NexusInterface
fix: cursor not hiding on touch devices
docs: update contributing guide
style: fix mobile nav spacing on small screens
```

---

## 🎨 Style Guide

- **Language**: TypeScript strict mode — avoid `any`
- **Components**: Functional React components with typed props
- **Styling**: Tailwind CSS utilities + inline styles for dynamic values
- **Animations**: Framer Motion for transitions and interactions
- **Imports**: React → third-party → local components → data/hooks

**Content changes** (name, experience, skills) all go in one file:
```
src/data/resume.ts
```

---

## 🔐 Security — Never Commit API Keys

- ✅ `.env` is already in `.gitignore` — it will **never** be committed
- ✅ Use `.env.example` as a reference template (no real values)
- ✅ For CI/CD, use **GitHub Secrets** (see `README.md → Deployment`)
- ❌ Never hardcode API keys in source code
- ❌ Never paste real keys in issues, PRs, or comments

If you accidentally commit a key — **rotate it immediately** at the provider.

---

## 🙌 Thank You

Every contribution — big or small — is appreciated.
If you use this as a template for your own portfolio, a ⭐ on GitHub means a lot!

