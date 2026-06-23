# Antiquity — Build Handoff Package

This folder is everything **Claude Code** needs to build *Antiquity*, an installable, offline-capable ancient-history learning app (a PWA) for your Android phone. You don't build anything by hand — you hand this folder to Claude Code and it does the work, including setting up GitHub and deploying.

## What's in here

| File | What it is |
|---|---|
| `PROMPT_FOR_CLAUDE_CODE.md` | **The master build spec.** Tech stack, the content model, every screen, the quiz + cumulative "Challenge" mode, the gamification/"juice", accessibility, and the full Git + GitHub Pages workflow. This is what you give Claude Code. |
| `COURSE_MAP.md` | **The human-readable curriculum blueprint** — the whole planned course (all eras, interleaved civilization rounds, the Americas, the mysteries). Read/steer this; it's your map, not code. |
| `content/curriculum.json` | **The actual lesson content as data.** v0.1 has the 6 Foundations units + 3 deep-dive modules fully written, plus the rest of the course as locked "coming soon" teasers. The app renders entirely from this file. |

## How to use it with Claude Code

1. Copy this whole `ancient-history-app/` folder somewhere on your computer (e.g. your projects directory).
2. Open a terminal in that folder and start **Claude Code**.
3. Tell it: **"Read `PROMPT_FOR_CLAUDE_CODE.md` and build the app exactly as specified, using `content/curriculum.json` as the content. Then set up Git and deploy to GitHub Pages per section 12."**
4. Follow its prompts. It will pause where *you* must act — mainly GitHub sign-in (browser auth) and one click to turn on Pages (Repo → Settings → Pages → Source: "GitHub Actions"). It prints exact steps.
5. When it finishes it prints your live URL (`https://<you>.github.io/<repo>/`). Open it in Chrome on your phone → menu → **Install app** / **Add to Home screen**.

Decisions already locked in (so Claude Code doesn't have to ask): **installable PWA**, **public repo on GitHub** with the **gh CLI set up for you**, **GitHub Pages** hosting, and a strong emphasis on **delightful UX** (satisfying taps, correct-answer and completion celebrations).

## What's in v0.1 (19 playable units · 69 quiz questions)

Fully authored and playable in `content/curriculum.json`:

- **Foundations** (6 core + 3 deep-dive modules): *What Counts as Ancient History · The Three-Age System · Paleo/Meso/Neolithic · Stratigraphy · Radiocarbon · When Experts Disagree*, plus deep dives *Why the Three-Age System Breaks Down in the Americas · The Tree-Ring Clock · Case File: The Age of the Sphinx*.
- **Era 1 — Before Cities** (7 units): *Out of Africa · The Symbolic Mind (cave art) · Göbekli Tepe · The First Towns · Megaliths/Stonehenge · The Younger Dryas & the Impact Hypothesis · Peopling of the Americas*.
- **Bronze Age Round 1** (3 interleaved units): *Mesopotamia: Uruk & the First Writing · Egypt: Unification of the Two Lands · Caral: A City as Old as the Pyramids*.

The rest of Eras 2–4 show on the map as locked teasers, so you can see and reshape the full arc before we write it.

## Growing the curriculum later

Adding content = editing `content/curriculum.json` only (no code changes). Each unit is `core` or an optional `deepdive` (which `extends` a core unit). In the civilization eras, units carry a `track` (e.g. "Mesopotamia", "Egypt") and are ordered in **interleaved rounds**, so you hop between civilizations as they rise and fall rather than bingeing one. The full schema is documented in `PROMPT_FOR_CLAUDE_CODE.md` §5.

**Suggested next batch:** Bronze Age Round 2 — the Pyramid Age and the Sphinx (Egypt), the mature Indus cities, and the first Minoan palaces — continuing the interleave.
