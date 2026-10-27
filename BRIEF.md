# evanli.org brief

Check every change against this file before it ships. When Evan changes his mind, update this file first, then the code.

## Purpose

A founder, engineering lead, or recruiter at an AI agent security company should get, inside 30 seconds: what Evan works on, that he is unusually good at it, and that he has taste. Target reactions: "he actually gets agent security" and "this person has taste." The site rewards a 30-second visit and a long wander. Friends and people outside tech should still find a person.

He is job hunting on a deadline, so the plain facts (what he does, the paper, résumé, email) are one click away from anywhere on the site.

## Through line

Every project is about the boundary between an AI agent and the real systems it touches: designing it (ACE, NDSS 2026), shipping it into production (Vestmark), attacking it (Keysight).

This is carried by order, diagrams, and interaction. It is never written out. No section labels that explain the concept ("Design / Ship / Break"), no summary lines ("I build the controls between agents and real systems"). The one explicit statement is the line under his name: "Designing, shipping, and breaking agent guardrails." (Hannah's call, 2026-10-27; it overrides the earlier no-explaining rule for that line only.)

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
- 2026-10-27: First pass (long single scroll, serif type) rejected by Hannah as generic. Replaced.
- 2026-10-27: Structure follows the ending of hannahgwimpy.com: a hero, then one record view split by section (Research, Work, Projects, Writing, Education, Coursework, Skills, Otherwise) with a big index on the left and entries on the right. Order carries the through line: ACE first, then Vestmark, then Keysight. Sections deep-link by hash (`/#coursework`).
- 2026-10-27: Coursework, LoreBoard, Mario City kept. Portrait kept, grayscale, in a solid (trusted) frame.
- 2026-10-27: Visual language is the trust boundary, used literally: the name sits inside a dashed boundary and dashed accent inputs arrive and stop at its edge (CSS transforms and opacity only; frozen at the stop under reduced motion). In the index, the open section is solid and the others are outlines.
- 2026-10-27: Second round from Hannah: no essay post; Research folded into Work; Work in chronological order (Matrix Origin, ACE, Vestmark, Keysight); Blades in Blue moved to Otherwise; no grades or "Upcoming" in Coursework; Network Fundamentals is CS 4700; hero meta is hometown, base, and next city; boundary label around the name removed.
- 2026-10-27: Narrative: between the hero and the record, a scroll story walks the work one chapter per screen with a big year readout and each job's diagram (pinned and crossfading on wide screens, stacked on phones). The record's Work entries then carry one line each.
- 2026-10-27: Agent's-eye lens built (Step 4): a corner toggle; on desktop a ring follows the cursor and reveals each element's provenance (authored, untrusted or external, computed) in the diagram styles, with a found count; on touch it shows everything. Labels describe provenance only, never instructions.
- 2026-10-27: Palette returns to the old site's: deep blue-black with teal in dark, pale teal-white with deep teal in light. Teal is the single accent.
- 2026-10-27: Copy style: Title Case for titles, orgs, subtitles, and bullet labels; bullet details are fragments without periods; body text is full sentences.
- 2026-10-27: Type: Big Shoulders Display (condensed, industrial) for the name, index, and entry titles; IBM Plex Sans for body; IBM Plex Mono for meta and diagrams. Nothing shared with Hannah's wide grotesk and serif.
- 2026-10-27: Drafts in `src/posts` are listed only in dev builds.
- 2026-10-27: Prerendering proposed, not built. Waiting on Evan.
- 2026-10-27: Signature interaction (agent's-eye lens) pitched, not built.
- 2026-10-27: Third round from Hannah ("not creative enough"). The lens is now the only view and the cursor: the site renders twice, the page as a person reads it and the same page as an agent reads it (tokenized text, outlined headings, a halftone photo, a provenance tag on every element, page facts it computed), and the agent copy shows only inside the lens. On touch the lens rests mid-screen and moves to your finger. A tally in the corner fills as the lens finds the eight agent-only notes.
- 2026-10-27: Hero fills the screen: EVAN / LI stacked inside the boundary, 36 dashed lanes of untrusted inputs hitting its top and right edges, each lane a faint dashed track, and the tagline top right. (A live blocked count was tried and cut as too busy.)
- 2026-10-27: Theme control is one icon that cycles: half circle (follow system), sun, moon.
- 2026-10-27: Inside the lens, untrusted inputs turn amber against the agent layer's teal. This is the one place a second accent appears.
- 2026-10-27: Below the hero, one section: a slim index column (Work, Projects, Education, Coursework, Skills, Otherwise) and the open section played as its own pinned scroll journey, one entry per screen, with a progress rail under the index. Every section carries its label, Work included. Screens with a diagram show it on the right; the rest show their readout (year or course number) as an outlined poster.
- 2026-10-27: Fourth round. The paper link lives only in the ACE screen, as a card (NDSS 2026, title, authors, "Read the paper"), not in the corner or a footer. Removed: the found tally, the progress rail, the repeated section label, the footer bar, the "Illustrative" labels, the entry counters, the index counts, the repeated course numbers, and the "Covers" labels. Skills is one screen.
- 2026-10-27: The index is bigger: inactive sections in muted solid type, the active one in ink with a teal bar. On phones it becomes a sticky vertical column on the left, so switching sections never means scrolling back up.
- 2026-10-27: Light palette cooled and quieted (#edf1f0 ground, finer grain, corner buttons without boxes). The lens always opens onto the dark agent layer, in both themes.
- 2026-10-27: The photo sits inside the name's boundary, beside "LI", as a muted teal duotone (multiply over a desaturated teal). Inside the lens it turns into a halftone.
- 2026-10-27: The URL no longer changes when you switch sections; `/#coursework`-style links still open that section.
- 2026-10-27: The name's box uses one margin on every side, measured from the ink (each side's padding subtracts the typeface's own bearing). The photo matches LI's cap height and lines up with EVAN's right edge.
- 2026-10-27: Sections scroll normally (one-at-a-time pinning removed); the index stays pinned beside them. Diagram highlights are scoped per entry.
- 2026-10-27: Text and diagram are paired by numbers: each linked phrase carries a small teal number and the matching diagram node shows the same number, so the link reads without hovering. Hovering either one highlights both. Lens radius is 90px on desktop and 64px on phones.
- 2026-10-27: On phones the corner links are symbols (page, GitHub mark, LinkedIn square, envelope) with full names for screen readers, so no full-width bar covers the content; the vertical index is sized to fit a small phone.
- 2026-10-27: The lens lives only on the landing screen (radius 60px, 44px on phones). Below the hero it disappears and the normal cursor returns, and the agent copy renders only the hero.
- 2026-10-27: Big outlined year and course-number posters removed; Projects carry no dates. Every section uses one entry template (optional date line, title, mono subtitle, body) with one text column and the same type sizes; a diagram, when present, takes the right column. GPA moved into Education's meta line.
