# Affirmations — Signing Hands Site (Design Spec)

**Date:** 2026-07-11
**Status:** Approved by user

## Goal

Recreate the aesthetics of https://workbyw.com/ as a static affirmations site whose
signature interaction is two realistic hands in white Michael Jackson-style crystal
gloves signing affirmation quotes, scrubbed frame-by-frame by scroll. Hand animation
clips are generated with Higgsfield using start-frame → end-frame video generation
(Seedance 2.0). Deployed to GitHub Pages under the `borngifted` account.

## Reference aesthetics (from workbyw.com)

- Paper background `#F5F5F3`, black ink `#111`.
- Signature interaction: pinned full-screen hero, subject centered, morphing/scrubbing
  with scroll (workbyw morphs its W' logomark through typographic styles).
- Giant Didone-style serif for editorial statements; tiny uppercase sans labels.
- Backslash `\` motif prefixes nav items and list items.
- Live clock in header (`14:13 GMT+7 OFF WORK`).
- Marquee/inline list separated by backslashes (their client list).
- Generous whitespace; minimal chrome; footer with contact/socials.

## Content

Six original affirmations:

1. My hands shape the life I imagine.
2. I am fluent in my own becoming.
3. I speak, even in silence.
4. Every gesture moves me forward.
5. I am the author and the alphabet.
6. What I affirm, I become.

Editorial statement section: “WHAT I AFFIRM / I BECOME”.

## Architecture

Fully static site (no build step): `site/index.html`, `site/styles.css`,
`site/main.js`, `site/frames/clip{1..6}/f####.webp`.

### Components

1. **Header (fixed):** wordmark left; `\ AFFIRM \ ABOUT \ CONTACT` right; live GMT clock.
2. **Pinned scrub hero:** scroll container ~600vh–700vh tall; sticky full-viewport
   stage; `<canvas>` draws the current frame from a preloaded WebP sequence indexed
   by scroll progress. Six segments (one per affirmation); the active quote reveals
   word-by-word in sync with its segment progress. Scroll up reverses.
3. **Statement section:** giant serif text, per-line reveal on scroll.
4. **Affirmation index:** backslash-separated marquee list of all six affirmations.
5. **Footer:** copyright, contact links, socials.

### Asset pipeline (Higgsfield)

1. Master image: two hands, white crystal-sequined gloves, wrists up, centered,
   studio light, `#F5F5F3` seamless background, 16:9 (nano_banana_pro).
2. Six pose variants P1–P6 (distinct ASL-inspired handshapes) generated with the
   master as image reference for identical framing/lighting (P0 = master rest pose).
3. Six clips via Seedance 2.0 (`start_image` = P(i-1), `end_image` = P(i), 5s,
   `generate_audio:false`): hands fluidly sign, returning through neutral.
4. Local: download MP4s, ffmpeg-extract ~40–60 frames per clip, encode WebP
   (~1280px wide, q≈70). Target total payload ≤ ~20 MB.

### Scrub implementation

- Preload frames as decoded `ImageBitmap`s progressively (first clip first; splash
  until clip 1 ready).
- Scroll progress → global frame index via `requestAnimationFrame` loop with lerp
  smoothing (no scroll-jank; matches workbyw feel).
- Reduced-motion media query: show static poses per section instead of scrub.
- Mobile: same canvas technique; frames letterboxed on `#F5F5F3` so portrait crops
  stay clean.

## Error handling

- Frame that fails to load: canvas keeps last drawn frame (no flash).
- JS disabled: hero degrades to static master image + all six quotes visible.

## Honest constraint

Generated signing is sign-language-inspired expressive gesture, not linguistically
accurate ASL. Site copy will not claim the hands are signing readable ASL.

## Testing

- Local: open via HTTP server; verify scrub forward/back, word reveal sync, clock,
  marquee, reduced-motion fallback, mobile viewport.
- Deployed: verify GitHub Pages URL serves frames (size/paths) and scrub works.

## Deployment

New public repo under `borngifted` (e.g. `affirmations`), site served from repo
root (or `/docs`) via GitHub Pages.
