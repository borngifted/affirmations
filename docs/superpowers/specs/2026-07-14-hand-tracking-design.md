# Hand Tracking — `\ HANDS` webcam conducting

**Date:** 2026-07-14 · **Status:** Approved
**Inspiration:** hand-tracked portfolio tutorial — see
`docs/watched/handtracking-tutorial-2026-07-14/report.md`

A `\ HANDS` toggle turns on the visitor's webcam and lets their hand height
"conduct" the signing animation, blended on top of scroll.

## Interaction

Hand height acts as a fader producing a smoothed offset blended with scroll:

```
target = clamp(scrollFrames + handOffsetFrames, 0, totalFrames - 1)
```

- Wrist landmark (index 0) `y` relative to camera-view center → offset.
  Hand above center = forward, below = backward.
- Range ≈ ±1 clip (±61 frames ≈ ±4 affirmations), EMA-smoothed.
- No hand detected for ~500 ms → offset eases back to 0; pure scroll takes over.
- Quote, word-reveal, and song-chapter seek all follow the blended position —
  they derive from the same frame number.

## Integration point

Everything is driven by `target` (frame position), computed from scroll in
`onScroll()` and eased toward in `step()` (`site/main.js`). Minimal surgery:

- Extract the segment/word/draw wiring from `onScroll()` into a shared
  `updateTarget()` that both scroll and the hand loop feed. `onScroll()` only
  computes `scrollFrames` (and the scroll hint) then calls `updateTarget()`.
- `main.js` exposes one small hook for the hands module to push its offset
  (a `setHandOffset(frames)` callback passed into the module).
- All new code lives in `site/hands.js`, dynamically imported the first time
  the toggle is switched on.

## Tech

- MediaPipe **Tasks Vision `HandLandmarker`** (current API — not legacy
  `@mediapipe/hands`), loaded as an ES module from the official CDN, version
  pinned. `runningMode: "VIDEO"`, one hand.
- WASM + model (~5 MB) lazy-load **only on first toggle-on** — visitors who
  never enable it pay zero cost (no network requests, no code parsed beyond
  the toggle handler).
- Keeps the site's no-build-step architecture: plain `index.html` +
  `main.js` + `styles.css` + `hands.js`.

## UI

- `\ HANDS` toggle in the nav beside SOUND/DARK, same `.ui-toggle` style
  (`HANDS OFF` ↔ `HANDS ON`, `aria-pressed` underline like SOUND).
- Desktop only: hidden below 720 px (the site's existing `MOBILE` breakpoint).
- When on: small rounded **mirrored** webcam preview card, fixed bottom-right,
  styled to the site — paper background, hairline border, slash motif,
  dark-mode aware via the existing CSS variables.
- Fingertip landmarks (thumb + four fingers) drawn as small ink dots on the
  preview, mirrored to match.
- Card label states: `REQUESTING…` → `TRACKING` / `NO HAND` →
  `CAMERA BLOCKED` (or `LOAD FAILED` when the CDN/model fetch fails).

## Error handling & privacy

- Camera denied / no camera / CDN load failure → brief error state on the
  card, toggle reverts to OFF, site behaves exactly as today.
- Toggle off → camera tracks stopped, offset returns to 0.
- `prefers-reduced-motion` → smoothing factors go to 1 (existing ease-to-1
  convention).
- All processing stays local (in-browser); no video ever leaves the machine.
  One-line privacy note added to the README.

## Verification

- `cd site && npx http-server -p 8124` (Range support needed for audio seek).
- Automated/browser checks: clean load with toggle OFF (behavior unchanged,
  zero MediaPipe network requests), toggle renders in both themes, hidden
  under 720 px, camera-denied fallback reverts cleanly.
- Real-hand webcam test performed by the author.
