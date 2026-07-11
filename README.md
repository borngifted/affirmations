# Affirm' — Spoken by Hand

Six affirmations, signed by two hands in crystal-sequined gloves as you scroll.
A recreation of the [workbyw.com](https://workbyw.com/) aesthetic — off-white paper,
black ink, Didone serif, backslash motifs, and a pinned scroll-scrubbed hero.

**Live:** https://borngifted.github.io/affirmations/

## How it works

- Hand poses generated with Higgsfield (`nano_banana_pro`), one master + six
  reference-locked pose variants.
- Signing motion generated with Higgsfield **Seedance 2.0** using
  `start_image` → `end_image` interpolation, chained so each clip ends where
  the next begins.
- Frames extracted at 12 fps to WebP (366 frames, ~8.6 MB) and scrubbed on a
  `<canvas>` indexed by scroll progress — scroll down to sign, scroll up to
  rewind.
- Static site, no build step: `site/index.html`, `site/styles.css`, `site/main.js`.

## Develop

```sh
cd site && python3 -m http.server 8123
```

Deployed from the `gh-pages` branch (`git subtree split --prefix site`).

*The signing is expressive, sign-language-inspired gesture — not literal ASL.*
