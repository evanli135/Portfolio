# evanli.org brief

Check every change against this file before it ships. When Evan changes his mind, update this file first, then the code.

## Purpose

A founder, engineering lead, or recruiter at an AI agent security company should get, inside 30 seconds: what Evan works on, that he is unusually good at it, and that he has taste. Target reactions: "he actually gets agent security" and "this person has taste." The site rewards a 30-second visit and a long wander. Friends and people outside tech should still find a person.

He is job hunting on a deadline, so the plain facts (what he does, the paper, résumé, email) are one click away from anywhere on the site.

## Through line

Every project is about the boundary between an AI agent and the real systems it touches: designing it (ACE, NDSS 2026), shipping it into production (Vestmark), attacking it (Keysight).

This is carried by order, diagrams, and interaction. It is never written out. No section labels that explain the concept ("Design / Ship / Break"), no summary lines ("I build the controls between agents and real systems"). The only explanatory copy allowed is one plain line under his name, 6 words or fewer, written by Evan.

## Visual system: the trust boundary

- Trusted components: solid 1.5px outline in ink.
- Untrusted inputs (third-party apps, web content, tool outputs, attacker traffic): dashed outline in the single accent color.
- Enforcement points: a dashed rectangle enclosing what it protects, with a small sentence-case label.
- Blocked paths: an arrow that stops at the boundary with a short perpendicular bar.

Diagrams are hand-built inline SVG with `role="img"`, `<title>`, `<desc>`. Flat, one accent plus neutrals. Responsive via `viewBox`, vertical layout below ~480px. Sentence-case labels, 4 words or fewer. At most one interaction per diagram (hover or tap a phase to highlight it and its sentence). Vestmark and Keysight diagrams are generic, labeled "Illustrative", and approved by Evan before deploy.

## Taste standards

- Bold and specific. Unlike a template or AI-generated portfolio. No hero gradient, glassmorphism, hacker-terminal green, circuit boards, matrix rain, stock or AI imagery.
- Every placement deliberate. If you can't say why something is where it is, move it or cut it.
- Texture welcome (subtle grain as a CSS layer). Never flat, never busy.
- Light and dark both designed. All colors are CSS variables. Theme control: one small settings icon top-right (Auto / Light / Dark). No sound.
- Borrow the standards of Hannah's brief (hannahgwimpy.com), not her look: no liquid glass, no island, no 3D world.

## Copy

- Concise, blunt, dry. A person, not a marketing page.
- No taglines, no "passionate about / leveraging / cutting-edge / on a mission", no em dashes, no "X, not Y".
- No gimmick widgets: countdowns, typing effects, now playing, status text, visitor counters.
- No instruction text. A tiny hint that fades on first move is the maximum.

## Content rules

- Only facts Evan has confirmed. Missing content is a visible `TODO(evan): ...`. Never invent metrics, results, employers, or quotes.
- Nothing confidential from Vestmark or Keysight.
- All content lives in `src/data.ts`. Posts live in `src/posts/*.md`.
- Hard safety rule: no instructions aimed at AI tools anywhere on the site, visible or hidden (text, alt, comments, metadata), even as a demo. Example attacks are drawn as SVG paths, never readable page text.

## Engineering

- Never jank, never crash a browser. Animate transform and opacity only. Respect `prefers-reduced-motion`. Any canvas/WebGL needs adaptive quality and an HTML fallback.
- Link-preview metadata is static in `index.html`.
- Lighthouse 90+ on all four categories, phone and desktop. Visible focus, one `h1`, semantic headings.
- Test Chrome, Safari, Firefox, desktop and phone. Delete dead code as you go.

## Decisions

- 2026-10-27: Audit of the old site. Title was "Vite + React + TS", Vite favicon, no meta/OG tags, dark-only (theme toggle was a no-op), 45 MB `.mov` in the bundle. Lighthouse mobile 87 / 92 / 100 / 83, desktop 100 / 94 / 100 / 83.
- 2026-10-27: Rebuilt on branch `rebuild-trust-boundary` as one PR for Evan's review. Old sections (About, Skills grid, Coursework cards, embedded PDF viewers, star background, Contact) replaced by the structure below, pending Evan's yes.
- 2026-10-27: Structure: name + line + links; Work (ACE, Vestmark, Keysight); Writing; Record; Person.
- 2026-10-27: Palette: paper and ink neutrals, one vermilion accent. Type: Instrument Serif for the name and headings, IBM Plex Mono for labels and diagrams, system sans for body.
- 2026-10-27: Drafts in `src/posts` are listed only in dev builds.
- 2026-10-27: Prerendering proposed, not built. Waiting on Evan.
- 2026-10-27: Signature interaction (agent's-eye lens) pitched, not built.
