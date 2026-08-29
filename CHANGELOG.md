# Changelog

## [0.2.0] — 2026-08-28

### Added
- **The `order` (chronology) question type**: arrange items into the correct sequence,
  presentation shuffled at render time; keyboard-operable, with the shared explain panel.
- **The Deep Time Line** (`#timeline`, a new bottom-nav tab): a global interactive vertical
  timeline on a piecewise-compressed scale, so a 300,000-year span and the first cities share
  one screen. Anchored units render as points or range bars colored by their state; tapping a
  node shows a popover before navigating. A clustered band alternates onto two lanes with leader
  ticks, and a plain ordered list below is the accessible source of truth.
- **The Museum** (`#museum`, linked from the map footer and Stats): a collection of artifacts, one
  recovered per completed unit. Earned cases show the object, a serif title, and a museum-label
  caption; locked cases are a dimmed silhouette with only the era name, a tease rather than a
  spoiler. Completing a unit that defines an artifact plays an "Artifact recovered" moment on the
  finish screen. A new `curator` badge is earned at ten artifacts. Adds an optional `artifact` field
  to the unit schema.
- **The `maptap` question type**: tap a location on a shared, simplified world map; a pin drops and
  distance to the target within a tolerance decides correct, then the true location is revealed. A
  "Can't use the map?" toggle swaps in the standard multiple-choice card, so keyboard and
  screen-reader users answer the same question; both paths report one binary result. Authored for
  Göbekli Tepe, Caral, and the origin of Homo sapiens. Adds an optional `target` to the question
  schema; `choices`/`answer` stay required as the accessible fallback.

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
