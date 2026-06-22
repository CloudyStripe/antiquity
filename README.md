# Antiquity

A mobile-first, installable **Progressive Web App** for learning ancient history in short, rigorous, swipeable modules. Works fully offline, installs to the home screen, and is built around a signature **"How We Know"** evidence panel — every notable claim shows *how* we know it and how settled it is.

Built with **Svelte 5 + Vite + TypeScript**, `vite-plugin-pwa`, the Web Audio API (synthesized sound, no audio files), and self-hosted fonts. No backend, no accounts, no trackers — progress lives in `localStorage` and can be exported/imported as a file.

> The curriculum is **content-driven**: the whole app renders from [`content/curriculum.json`](content/curriculum.json). Adding a unit = adding data, no code changes. The build spec is in [`PROMPT_FOR_CLAUDE_CODE.md`](PROMPT_FOR_CLAUDE_CODE.md); the curriculum blueprint is in [`COURSE_MAP.md`](COURSE_MAP.md).

## What's here (v0.1)

- The **Foundations** era — 6 core units + 3 optional deep-dive modules, fully playable (30 quiz questions).
- Eras 1–4 appear on the map as locked "Coming soon" teasers.
- Inline quizzes, a cumulative **Challenge** mode (drawn only from completed units), XP, daily streaks, badges, a glossary, stats, and export/import.
- Light / dark / system themes, reduced-motion support, adjustable text size, and tasteful "juice" (button feel, correct-answer celebrations, completion confetti — all muteable and motion-respecting).

## Develop

Requires **Node.js ≥ 20**.

```bash
npm install
npm run dev          # http://localhost:5173/antiquity/
```

Other scripts:

```bash
npm run build        # validate content, generate icons, then production build → dist/
npm run preview      # serve the production build locally
npm run check        # svelte-check (type-check)
npm test             # vitest unit tests (schema, challenge pool, streak, unlock, markdown)
npm run gen-icons    # regenerate PWA icons from the brand SVG (scripts/gen-icons.mjs)
```

The app is served under the base path `/antiquity/` (see `REPO` in [`vite.config.ts`](vite.config.ts)) so it works on GitHub Pages. The PWA manifest `start_url`/`scope` and the service-worker scope all match that path.

## Deploy (GitHub Pages)

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds and publishes `dist/` to GitHub Pages. One-time setup: in the repo, go to **Settings → Pages → Source → "GitHub Actions."**

Live URL: `https://<user>.github.io/antiquity/`

To change the repo name, update the single `REPO` constant in `vite.config.ts` (it drives the base path, manifest, and SW scope).

## Install on Android

Open the live URL in Chrome → menu (⋮) → **Install app** / **Add to Home screen**. After the first load it runs fully offline.

## Project layout

```
content/curriculum.json     # single source of truth (the curriculum data)
src/lib/content/            # zod schema, typed loader, inline-markdown parser
src/lib/stores/             # persistence, settings, router, derived selectors
src/lib/engine/             # pure logic: quiz/SR, gamification, unlock rules
src/lib/fx/                 # motion tokens, Web Audio SFX, haptics, confetti
src/components/             # UI primitives, block renderers, the 6 figure SVGs
src/routes/                 # Course Map, Unit Player, Challenge, Stats, etc.
scripts/                    # icon generation + content validation
tests/                      # vitest suites
```

## License

[MIT](LICENSE). Fonts (EB Garamond, Inter) are SIL Open Font License, bundled via Fontsource.
