# Build Prompt — "Antiquity" : A Modular Ancient-History Learning PWA

You are building a polished, installable **Progressive Web App** for learning ancient history in short, rigorous modules. Read this entire document before writing code. The curriculum content already exists as data files in `content/` — **you build the engine and the experience; you do not invent the history.** When you need history that isn't in the content files, leave a clearly-marked `TODO` rather than fabricating it.

The end user is a busy parent with a demanding career who loves ancient history but only has 5–15 minute windows. The app must be genuinely delightful to use on an Android phone and must make learning feel rewarding.

---

## 1. Product in one paragraph

A mobile-first PWA that teaches ancient history as a tree of **short, self-contained units** grouped into **eras**. Each unit is a few swipeable screens of lesson content with embedded quizzes and signature **"How We Know"** evidence panels; deeper material is offered as **separate optional modules**, not hidden inside a unit. Finishing a unit marks it complete, awards XP, and contributes its quiz questions to a **cumulative Challenge mode** that draws random questions only from completed units. The whole thing works offline, installs to the home screen, and feels satisfying — every tap, correct answer, and completion should have tactile, visual, and (optional) audio feedback.

---

## 2. Non-negotiable requirements

1. **Installable PWA**: valid web manifest, service worker, works fully offline after first load, installs to the Android home screen with its own icon and splash.
2. **Mobile-first, responsive**: designed for a phone in portrait first; must also look good on desktop.
3. **Content-driven**: the app renders entirely from the JSON in `content/`. Adding a new unit = adding data, no code changes.
4. **Progress persists** locally (no account, no backend) and survives reloads and app restarts.
5. **Cumulative Challenge quiz** pulls questions **only** from units the user has completed.
6. **Exceptional UX & "juice"** (see §9) — this is a first-class requirement, not polish-if-time.
7. **Accessible**: keyboard navigable, screen-reader labels, sufficient contrast, and it must honor `prefers-reduced-motion`.
8. **Deployed**: pushed to GitHub and live on GitHub Pages (see §12).

---

## 3. Core principles (the soul of this app)

These come from the learner and must be visible in how the app feels and how content is framed. The content files already embody them; your rendering must do them justice.

- **Modular and bite-size, but never shallow.** Many short, serious units beat a few long or trivial ones. Respect the user's time: any single unit is completable in ~5–10 minutes. **Depth lives in separate, optional deep-dive *modules*** (their own units) — never buried inside a unit as an expandable section. If a topic is deep, it becomes one *or several* optional modules of its own.
- **Comprehensive but interleaved — no binge, no snapshots.** Across the curriculum every civilization is covered in full, **rise to fall** — never reduced to a single drive-by snapshot, and always entered at its *beginning*, not mid-stream. But we never march one civilization start-to-finish in a single block (that burns the learner out). Instead each era moves in roughly chronological **rounds**: a few modules of Mesopotamia, then Egypt, then Minoan Crete, then back again — each civilization picked up where we left it, until its arc completes. This avoids fatigue and creates the *"meanwhile, over in Egypt…"* sense of a connected world. An **era-opening parallel timeline** (a `figure`) reinforces it.
- **"How We Know" is a feature, not a footnote.** Render `evidence` blocks as a distinctive, recurring panel. Whenever the app states a date or claim of note, the evidence panel explains *how that is known* and how confident we should be.
- **Open-minded with integrity.** Many units contain a `debate` block presenting a mainstream position, serious alternative(s), the evidence and weaknesses of each, and an honest "where it stands." **Render all positions with equal visual dignity** — do not style the mainstream as "the answer" and alternatives as "the wrong box." Let the learner weigh it. (The content itself is responsible for being fair and accurate; your job is to present it even-handedly.)
- **The Americas are first-class.** They are woven through the curriculum, not appended. No special-casing in the UI.
- **Confidence is shown, not hidden.** Evidence and debate blocks carry a `confidence` signal (`established` / `contested` / `open`). Surface it with a clear, non-judgmental visual marker (e.g., a small labeled chip), so the learner always knows how settled something is.

---

## 4. Recommended tech stack

You may choose your stack, but it must hit every requirement in §2 with minimal dependencies and a small bundle. Strong recommendation:

- **Svelte + Vite** — Svelte's built-in transitions/motion make the "juice" in §9 far easier and ship a tiny bundle. (Vanilla TS is acceptable if you prefer; do **not** reach for a heavy framework.)
- **`vite-plugin-pwa`** for the manifest, service worker, and offline precaching. Configure `registerType: 'autoUpdate'`.
- **`canvas-confetti`** (tiny) for celebration bursts, or hand-rolled particles — your call.
- **Web Audio API** for sound effects synthesized at runtime (no audio asset files). All sounds muteable and off-respecting (see §9).
- **TypeScript** throughout. Type the content schema in §5 and parse/validate the JSON at load (fail loudly in dev if a content file violates the schema).
- No analytics, no trackers, no external runtime calls. Everything must work offline.

**GitHub Pages base path gotcha:** the site deploys under `https://<user>.github.io/<repo>/`. Set Vite `base: '/<repo>/'` (read it from an env var or hardcode the final repo name once known) so assets and the service worker scope resolve correctly. The manifest `start_url` and `scope` must match.

---

## 5. Content model (read `content/` and render it)

All curriculum lives in `content/`. There is one canonical file, `content/curriculum.json`, validated by the schema below. Treat it as the single source of truth. (It may later be split into per-era files; design the loader so that's trivial.)

```jsonc
{
  "meta": {
    "title": "Antiquity",
    "version": "0.1.0",
    "datingConventionNote": "Dates use BCE/CE; the app shows a one-time primer."
  },
  "eras": [
    { "id": "foundations", "title": "Foundations", "subtitle": "How to think about ancient history", "order": 1 }
    // ...more eras, including planned ones, in chronological/teaching order
  ],
  "units": [
    {
      "id": "intro-01-what-is-ancient-history",  // stable, unique, kebab-case
      "eraId": "foundations",
      "order": 1,                  // order within the era
      "title": "What Counts as 'Ancient History'?",
      "subtitle": "Prehistory, history, and the deep-time problem",
      "estMinutes": 7,
      "status": "available",       // "available" = fully authored & playable | "planned" = show on map, locked/teaser
      "kind": "core",              // "core" = main spine | "deepdive" = OPTIONAL extension module
      "extends": null,             // on a "deepdive" unit: id of the core unit it deepens; null/absent for core units
      "track": null,               // optional: civilization/thread this unit belongs to, e.g. "Mesopotamia" — used to badge cards in interleaved eras
      "tags": ["epistemics", "terminology"],
      "screens": [ /* ordered Block[] — see below */ ],
      "completion": {              // optional copy shown on the completion screen
        "takeaway": "One-sentence 'what you now know'.",
        "teaser": "What the next unit unlocks."
      }
    }
    // ...more units. "planned" units may omit screens.
  ]
}
```

### Block types (each entry in `screens[]`)

Render one **screen** per block (the user advances screen-by-screen). Support inline markdown in all text: `**bold**`, `*italic*`, and `[label](https://url)` (links open in a new tab; they are source citations).

- **`text`** — a lesson screen. `{ "type": "text", "heading"?: string, "body": string[] }` (each array item is a paragraph).
- **`term`** — a key-term card. `{ "type": "term", "term": string, "pronunciation"?: string, "definition": string, "etymology"?: string }`. Style it as a distinctive "glossary" card; collect all `term` blocks into an in-app **Glossary** screen too.
- **`evidence`** — the **"How We Know"** panel. `{ "type": "evidence", "heading"?: string, "body": string[], "confidence": "established" | "contested" | "open" }`. Distinctive recurring visual identity (e.g., an "evidence locker" / magnifying-glass motif). Show the confidence chip.
- **`debate`** — the open-question panel. `{ "type": "debate", "heading": string, "intro"?: string, "confidence": "established"|"contested"|"open", "positions": [ { "name": string, "claim": string, "support": string[], "weaknesses": string[] } ], "whereItStands": string }`. Render positions as parallel, equal-weight cards (e.g., a comparison/tab layout), each showing its claim, what supports it, and its weaknesses; then the honest `whereItStands` summary. **No position may be visually privileged.**
- **`figure`** — a diagram. `{ "type": "figure", "id": string, "intent": string, "spec": string, "caption": string, "alt": string }`. **You generate a clean, original SVG** that fulfills `spec` (it describes exactly what to draw, with labels and any data points). Diagrams must be legible on a phone, theme-aware (respect dark mode), and animate in gracefully. `alt` is the accessibility description. Do **not** fetch external images. (Era intros use a `figure` to show a **parallel timeline** of the era's civilization arcs.)
- **`quiz`** — an inline quiz screen. `{ "type": "quiz", "prompt"?: string, "questions": Question[] }`.

*(There is no inline "deep dive" block. Deeper material is authored as its own optional unit — see "Core vs. deep-dive units" below — so depth is always a module, never a hidden expander.)*

### Core vs. deep-dive units

Every unit is either **core** (`"kind": "core"`) or an optional **deep-dive** (`"kind": "deepdive"`).
- **Core units** form the main spine of an era. Completing a core unit unlocks the next core unit in that era.
- **Deep-dive units** are optional extension modules. Each sets `"extends": "<coreUnitId>"` pointing at the core unit it deepens. A deep-dive unit is **locked until its parent core unit is completed**, and it **never gates progression** — skipping it never blocks anything. A single deep topic may have **several** deep-dive units (ordered via `order`); together they read as an optional mini-series.
- Deep-dive units are otherwise normal units: they have screens and quizzes, can be completed, earn XP, and **their quiz questions join the cumulative Challenge pool when completed** — exactly like core units.

### Question object

```jsonc
{
  "id": "q-intro01-prehistory-line",       // stable & unique across the whole app
  "stem": "What single development conventionally marks the line between prehistory and history?",
  "type": "single",                          // "single" (one correct) | "truefalse"
  "choices": ["Farming", "Writing", "Cities", "Bronze tools"],
  "answer": 1,                               // index into choices
  "explanation": "History = the written record...",  // shown after answering, right or wrong
  "difficulty": "easy"                       // "easy" | "medium" | "hard"
}
```

**The cumulative Challenge pool is derived**, not separately authored: it is the union of every `Question` inside the `quiz` screens of units whose `status` is complete in the user's progress. Each question's `id` is its stable identity across inline use and Challenge mode.

---

## 6. Screens & navigation

1. **Home / Course Map** — the heart of navigation. Eras shown as sections in teaching order; within each, units as cards in a path/track. Each unit card shows title, est. minutes, and state: **locked / available / in-progress / completed** (completed gets a clear "done" treatment and shows your score). Within an era, units are ordered in **interleaved chronological rounds** (a few modules of one civilization, then another), and each card is **badged with its `track`** (the civilization it belongs to); an optional "follow one civilization" filter can isolate a single track for learners who'd rather binge one arc, with the interleaved order as the default. **Deep-dive units** appear grouped with their parent core unit — indented beneath it, or behind an "Optional deep dives (n)" affordance on the core card — tagged as optional and locked until the parent is complete. `planned` units appear as enticing locked teasers ("Coming soon"). Show overall progress (XP, units complete, current streak) in a header. Prominent entry to **Challenge** mode and the **Glossary**.
2. **Unit Player** — full-screen, one block/screen at a time, with a smooth horizontal transition and a slim progress indicator for the unit. Big Back/Next controls; swipe gestures on touch. Quiz screens block "Next" until answered (but never trap the user — they can always go Back).
3. **Quiz interaction** — see §7 and §9.
4. **Unit Complete** — a celebration screen (confetti, points tally counting up, streak update, badge if earned), the `takeaway`, and a clear CTA to the next unit (with an unlock animation) plus "Back to map."
5. **Challenge (cumulative quiz)** — see §7. Locked with a friendly message if no units are completed yet.
6. **Stats / Profile** — XP, streak, units completed, overall accuracy, badges earned, and **Export / Import progress** as a JSON file (so the user can back up or move devices — no account needed).
7. **Settings** — toggles for **sound**, **haptics**, **dark/light/system theme**, **reduced motion** (defaults to system), and text size. A one-time **dating-conventions primer** (BCE/CE, "c.", relative vs absolute dates) accessible here.
8. **Glossary** — all `term` blocks, searchable.

Use the URL hash or History API for routing so deep links and the back button work, and so it behaves well as an installed PWA.

---

## 7. The quizzes

**Inline quizzes** check understanding within a unit. **Challenge mode** is the cumulative review the learner specifically asked for.

- Challenge: pull a random sample (default **10**, or fewer if the pool is smaller) from the completed-units pool. Shuffle questions and choices. At the end show a score, which ones were missed (with explanations), XP earned, and offer "Play again" (reshuffled).
- Make Challenge feel like a rewarding game round, not a test: a lightweight timer-free flow, a satisfying streak meter for consecutive correct answers within the round, and a strong finish screen.
- **Spaced-repetition hook (build the seam, simple impl now):** track per-question stats (times seen, times correct, last-seen). For now, lightly weight selection toward questions answered incorrectly or not seen recently. Keep this modular so it can be upgraded later.
- Always show the `explanation` after answering — being wrong should teach, not punish.

---

## 8. Progress, state & gamification

Persist to `localStorage` under a single namespaced key (e.g., `antiquity:v1`). Shape (suggested):

```jsonc
{
  "progress": { "<unitId>": { "completed": true, "bestScore": 0.9, "lastScreen": 3, "completedAt": "ISO" } },
  "questionStats": { "<questionId>": { "seen": 4, "correct": 3, "lastSeenAt": "ISO" } },
  "xp": 1240,
  "streak": { "current": 3, "longest": 7, "lastActiveDay": "YYYY-MM-DD" },
  "badges": ["foundations-complete", "perfect-quiz", "7-day-streak"],
  "settings": { "sound": true, "haptics": true, "theme": "system", "reducedMotion": "system", "textScale": 1 }
}
```

Gamification (keep it tasteful, supportive, never manipulative):
- **XP**: per correct answer (more for harder questions), bonus on unit completion (core *and* deep-dive units). Completing optional deep-dive modules is its own reward path for the curious.
- **Daily streak**: increments on any day the user completes a unit or a Challenge round; show it warmly, and never shame a broken streak.
- **Badges/achievements**: era completion, first perfect quiz, streak milestones, "completed 5 deep-dive modules," "Challenge score 100%," etc. Surface them as delightful unlock moments.
- A unit unlocks the next in its era on completion. Eras can unlock when the prior era is mostly complete (your call; keep early friction low — Foundations should be fully open).

---

## 9. Experience & polish — "the juice" (first-class requirement)

The learner explicitly asked for an app that is *visually appealing and engaging*, with **satisfying button presses and little dopamine hits** for correct answers and completions. Deliver that deliberately. Every interaction should have clear, immediate, pleasant feedback across three channels: **visual, motion, and (optional) audio + haptics.**

**Buttons & taps**
- Tactile press: quick scale-down (~0.96) on `:active` with a spring-back release; subtle shadow/elevation change. Use spring easing, not linear.
- Optional ripple or soft glow from the tap point. Hover/focus states on desktop.
- Light haptic tick on press where supported (`navigator.vibrate`), gated by the haptics setting.

**Correct answer**
- The chosen option animates: green wash, a checkmark that draws in, a small **"pop"/scale bounce**.
- A short, pleasant rising chime (Web Audio), and a **confetti/particle burst** for the celebratory feel.
- If on a correct streak within a quiz, increment a combo meter with a bounce ("3 in a row!").
- A crisp success haptic.

**Wrong answer (supportive, never punishing)**
- The chosen option does a gentle horizontal shake and a soft, muted tone — restrained, not harsh.
- The correct option then highlights calmly, and the `explanation` slides in. Encouraging microcopy ("Close — here's why").
- Soft single haptic.

**Unit / Challenge completion**
- Full celebration: confetti, a badge/stamp animation, **XP counting up** with a tick sound, streak update with a flame animation, and the next-unit "unlock" reveal.
- Make it feel earned and a little joyful — this is the primary dopamine moment.

**Motion & transitions**
- Smooth screen-to-screen transitions in the unit player (slide + fade); cards stagger-fade in on screen load; progress bars/rings animate fills.
- Use spring/eased curves consistently. Define a small motion system (durations, easings) and reuse it.
- **Respect `prefers-reduced-motion`**: when reduced (or the setting is on), replace movement with simple fades/instant states and **disable confetti/particles**. Never break usability for motion-sensitive users.

**Sound design**
- Synthesize all SFX at runtime via Web Audio (tap, correct, combo, wrong, complete). Keep them short, soft, and tasteful. A single master mute (Settings) and respect it everywhere. Decide a sensible default (recommended: sound **on** but gentle; always easy to mute).

**Feel-good details**
- Empty states and locked states are inviting, not dead ends.
- Micro-celebrations are varied enough not to feel repetitive across a session.
- Nothing blocks the user for more than a beat; animations are skippable by tapping ahead.

---

## 10. Visual design system

Aim for "warm, modern, scholarly — alive, not dusty." Define tokens (CSS custom properties) and use them everywhere; ship **light and dark** themes plus `system`.

- **Palette**: a parchment/ink base (warm off-white paper, deep ink text) with a confident accent (e.g., lapis blue or terracotta) and clear semantic colors for success/error and the `confidence` chips. Ensure WCAG AA contrast in both themes.
- **Typography**: a characterful display serif for headings (evoking antiquity without being kitsch) paired with a highly legible humanist sans for body. Self-host fonts (offline!). Establish a type scale.
- **Layout**: generous spacing scale, rounded cards, soft shadows, comfortable line length, large tap targets (≥44px). A subtle paper/texture hint is welcome if it never hurts legibility.
- **Iconography**: a small consistent set (lucide or similar, tree-shaken) — map, evidence/magnifier, quiz, streak/flame, badge, etc.
- **Confidence chips**: `established` / `contested` / `open` get distinct, non-judgmental colors + labels, used consistently in evidence and debate blocks.

---

## 11. Accessibility & performance

- Keyboard-operable everywhere (answer options, next/back, collapsibles); visible focus rings; logical tab order.
- ARIA roles/labels; quiz announces correct/incorrect to screen readers; figures use the `alt` text.
- Color is never the only signal (icons/text accompany it).
- Honor `prefers-reduced-motion` and the in-app reduced-motion + text-size settings.
- Lighthouse targets: PWA installable ✓, Performance ≥ 90, Accessibility ≥ 95 on mobile. Lazy-load era content if the JSON grows. Keep the initial bundle lean.

---

## 12. Git + GitHub + Pages (do this as part of the build)

The user wants the project version-controlled and live on **GitHub Pages**, repo **public**. They have a GitHub account but may **not** have the `gh` CLI set up — handle both paths and print clear, copy-pasteable instructions for anything they must do themselves (like browser auth).

1. **Init & hygiene**: `git init`, add a sensible Node `.gitignore` (`node_modules/`, `dist/`, `.DS_Store`, etc.), a `LICENSE` (MIT unless told otherwise), and a project `README.md`. Make small, meaningful commits as you build — not one giant commit.
2. **Create the remote**:
   - Check for `gh`: `gh --version`. If present and authenticated (`gh auth status`), run:
     `gh repo create <repo-name> --public --source=. --remote=origin --push`
   - If `gh` is missing or unauthenticated, **print** the exact steps for the user: install `gh` (or create the repo at github.com/new), then the commands to wire it up:
     `git remote add origin https://github.com/<user>/<repo>.git && git branch -M main && git push -u origin main`
   - Pause for the user where browser authentication is unavoidable; never block silently.
3. **Deploy to Pages via GitHub Actions**: add `.github/workflows/deploy.yml` that, on push to `main`, installs deps, runs `vite build`, and deploys `dist/` to Pages using the official `actions/configure-pages`, `actions/upload-pages-artifact`, and `actions/deploy-pages`. Then print the one manual step: **Repo → Settings → Pages → Source: "GitHub Actions."**
4. **Fix the base path**: set Vite `base: '/<repo-name>/'` and ensure the PWA manifest `start_url`/`scope` and service-worker registration use the correct subpath so the installed app works at `https://<user>.github.io/<repo-name>/`.
5. After first deploy, **print the live URL** and a short "how to install on Android" note (open in Chrome → menu → Install app / Add to Home screen).

---

## 13. Suggested build order

1. Scaffold (Vite + Svelte + TS + vite-plugin-pwa), theme tokens, fonts, base path, manifest, icons. Commit. Get a trivial PWA installing & working offline early.
2. Content layer: TS types for the schema (§5), a validated loader for `content/curriculum.json`, and the block renderers (text, term, evidence, debate, figure→SVG, quiz).
3. Course map (home) reading eras/units with state.
4. Unit player with screen transitions and inline quizzes (correct logic first).
5. Progress/state in localStorage; completion flow; XP/streak/badges.
6. Challenge (cumulative) mode with the derived pool + spaced-repetition seam.
7. Stats, Settings, Glossary, export/import.
8. **The juice (§9)** — layer in motion, sound, haptics, confetti, celebrations. Then a polish pass.
9. Accessibility & Lighthouse pass.
10. Git, Actions, Pages deploy (§12). Verify the installed, offline experience on a phone.

Commit at each step. Keep a running `README.md` (how to dev, build, deploy) and a notes/CHANGELOG file.

---

## 14. Definition of done

- Installs on Android as a PWA, launches offline, looks polished in light & dark.
- Course map renders all eras/units from data with correct states; Foundations units are fully playable.
- Unit player works (swipe + buttons), inline quizzes score correctly and teach via explanations.
- Completing a unit updates progress, XP, streak, possibly a badge, and unlocks the next unit — with a satisfying celebration.
- Challenge mode pulls **only** from completed units, scores, and explains misses.
- Every interaction has tasteful visual + motion feedback; sound/haptics work and are muteable; **reduced-motion is fully respected**.
- Progress persists across restarts; export/import works.
- Accessibility targets met; Lighthouse PWA installable; Perf ≥ 90, A11y ≥ 95 (mobile).
- Repo is public on GitHub; Actions deploy succeeds; the live Pages URL is printed and works; the installed app loads from that URL offline.

---

## 15. Notes, guardrails & future hooks

- **Do not invent or alter history.** Render only what the content files contain. If something needed for the UI is missing (e.g., an icon, a teaser line), make a tasteful neutral placeholder or a `TODO`, never a fabricated fact, date, or citation.
- Keep the content/render boundary clean so new units (the next eras) drop in as data only.
- Leave clean seams for planned future work: audio narration of lessons, real spaced-repetition scheduling (e.g., SM-2), per-era theming, optional cloud backup, and a "daily 5-minute review" notification (PWA periodic background sync where supported).
- Performance and offline reliability are part of the feel — protect them.

Build something the user will *want* to open in a spare five minutes. Make it rigorous, make it beautiful, make it satisfying.
