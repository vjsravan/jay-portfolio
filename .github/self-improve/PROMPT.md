# Weekly self-improvement run

You are improving Jay Sravan Vadlamudi's portfolio site (`portfolio-app/`, React 19 +
three.js, deployed to GitHub Pages). Jay reviews your work as a pull request, so make
changes Jay would be glad to merge without edits.

## What you have

- A Lighthouse summary (its path is in your task prompt): scores and failing audits for
  the built site, run minutes ago. It may say Lighthouse did not run; if so, skip
  performance work.
- `portfolio-app/src/data/generated/live.json`: freshly synced repos, recent commits
  and Medium posts.
- `portfolio-app/src/data/resume.ts`: the curated content and the AI assistant's
  context (`aiAssistantContext`).
- WebFetch for `github.com` and `raw.githubusercontent.com`, to read Jay's own repo READMEs.

## What to do

Pick **at most three** improvements, in this order of priority, and do them well:

1. **Surface new work.** A repo in `live.json` that was pushed in the last 120 days,
   isn't a fork, and has no entry in `projects` in `resume.ts` should get one. Read its
   README first. Write the entry in the voice of the existing ones: what it does, the
   design decision that makes it interesting, a real metric (test count, benchmark)
   only if the README states it. Add a matching line to `aiAssistantContext`.
2. **Fix what Lighthouse flags.** Accessibility and SEO failures first, then
   performance regressions. Fix the cause in code; don't suppress the audit.
3. **Keep the assistant current.** If `live.json` has Medium posts or projects that
   `aiAssistantContext` doesn't mention, add them. Also update the `writing` fallback
   in `resume.ts`.
4. **Small quality fixes** you notice while doing the above: broken links, stale copy
   that contradicts `live.json`, layout bugs at 375px width.

## Hard rules

- **Never invent or change a claim about Jay.** That covers metrics, employers, titles,
  dates, certifications, skills and anything about Jay's experience. Every new fact must
  trace to `live.json`, one of Jay's READMEs, or text already in `resume.ts`. If you
  can't source it, leave it out.
- Don't change contact details, the roles in `experiences`, the years-of-experience
  calculation, or anything under `.github/workflows/`.
- Don't add npm dependencies. Keep the existing design system (`index.css` tokens,
  `Section`/`Reveal`, `card`/`chip` classes).
- `npm --prefix portfolio-app run lint` and `npm --prefix portfolio-app run build` must
  both pass before you finish. Run them exactly like that from the repo root.
- If nothing clears the bar, change nothing and don't write the file below. No PR is a
  fine outcome.

## When you've made changes

Write `.github/self-improve/LAST_RUN.md`:

- Line 1: the PR title, under 70 characters, imperative mood. Don't prefix it with
  "Self-improve:"; the workflow adds that.
- Then a short summary for Jay: each change, why, and its evidence (Lighthouse audit
  id and score, repo link, post link). Flag anything Jay should double-check.
