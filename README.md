# Affirm' — Spoken by Hand

Fifty affirmations, signed by two hands in crystal-sequined gloves as you scroll,
set to an original score. A recreation of the [workbyw.com](https://workbyw.com/)
aesthetic — off-white paper, black ink, Didone serif, backslash motifs, and a
pinned scroll-scrubbed hero — with a light/dark theme toggle.

**Live:** https://borngifted.github.io/affirmations/

## How it works

- Hand poses generated with Higgsfield (`nano_banana_pro`), one master + twelve
  reference-locked pose variants.
- Signing motion generated with Higgsfield **Seedance 2.0** using
  `start_image` → `end_image` interpolation, chained so each clip ends where
  the next begins (12 clips).
- Frames extracted at 12 fps to WebP (732 frames, ~17 MB) and scrubbed on a
  `<canvas>` indexed by scroll progress — scroll down to sign, scroll up to
  rewind.
- Original score "Crystal Hands, Clear Becoming" generated on Suno (v5): all fifty
  affirmations rewritten as ordered hip-hop / R&B-soul bars, so quote *n* lands near
  its 1/50th chapter of the 272s song. Played through Web Audio with a subtle 528Hz
  solfeggio healing tone layered beneath; scroll jumps seek the playhead to the
  active chapter.
- Dark mode inverts the stage (black gloves on near-black paper) via a canvas
  `invert(1)` filter and CSS variables; the choice persists in localStorage.
- Static site, no build step: `site/index.html`, `site/styles.css`, `site/main.js`.

## Develop

```sh
cd site && npx http-server -p 8124   # needs Range support for audio seeking
```

Deployed from the `gh-pages` branch (`git subtree split --prefix site`).

*The signing is expressive, sign-language-inspired gesture — not literal ASL.*
