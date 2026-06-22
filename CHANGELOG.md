# Changelog

## [0.1.0] — 2026-06-22

First playable release: the **Foundations** era, fully built around the existing
`content/curriculum.json`.

### Added
- **Installable PWA** (Svelte 5 + Vite + `vite-plugin-pwa`, `registerType: 'autoUpdate'`):
  valid manifest, generated icons, service-worker precaching — works offline after first load.
  Base path `/antiquity/` for GitHub Pages.
- **Content layer**: zod schema + inferred types, a fail-loud validated loader, and a tiny
  inline-markdown parser (`**bold**`, `*italic*`, `[label](url)`).
- **Block renderers** for all six block types, including a recurring "How We Know" evidence
  panel, an equal-weight debate panel (no position privileged), and **6 bespoke, theme-aware,
  animated SVG figures**.
- **Course Map** with per-unit state, interleaved track badges + a "follow one civilization"
  filter, grouped optional deep-dives, planned-era teasers, and a progress header.
- **Unit Player**: screen-by-screen with slide/fade transitions, swipe gestures, a resume point,
  and inline quizzes that gate "Next" until answered (Back always works).
- **Cumulative Challenge** mode drawing **only** from completed units, with a spaced-repetition
  weighting seam, shuffled questions/choices, a combo meter, and a review-the-misses finish screen.
- **Gamification**: XP, daily streak (never shamed), and badges, with celebration moments
  (confetti, XP count-up, badge stamps).
- **The "juice"**: a shared motion system, runtime-synthesized Web Audio SFX, haptics, and
  confetti — all muteable and fully honoring reduced motion.
- **Stats / Settings / Glossary / Dating-primer** screens; **export/import** progress as JSON.
- Light / dark / system theming, adjustable text size, accessibility (keyboard, ARIA live
  announcements, focus rings, color-never-the-only-signal).
- **Vitest** suites: schema validation, Challenge-pool derivation, streak logic, unlock rules,
  markdown parsing.
- **CI**: GitHub Actions workflow that builds and deploys to GitHub Pages on push to `main`.
