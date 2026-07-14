---
source: /Users/borngifted/Downloads/video 24.mp4
title: video 24.mp4
duration: 00:33
watched_at: 2026-07-14T08:40:45.173468-04:00
intent: figure out what this handtracking tutorial does and how to recreate it with Claude
hero_frames: [frame_0001.jpg, frame_0003.jpg, frame_0005.jpg, frame_0007.jpg, frame_0012.jpg]
transcript_source: none
---

# video 24.mp4

## TL;DR

- 33s vertical short ("Part 2" of a series) by designer Marina (brand "Budarina") showing how she built an interactive portfolio website with live webcam hand-tracking — waving a hand in front of the camera drives the hero animation/scroll.
- The hero visual is an AI-generated "origami face" video (her portrait folding into an origami sphere), generated with Seedance 2 from an AI-model picker (Kling 3.0 / Seedance 2.0 visible — looks like Higgsfield/Freepik-style model hub).
- The website itself is built entirely by prompting Replit Agent: attach the reference image/video, describe the site, then iterate in the same chat ("align it to bottom left", "same spacing 160px", "create light mode", "remove camera frame and change hand tracking interaction to scroll transform (play video on scroll), smooth scroll").
- Recreating in Claude Code: generate the hero video with any AI video model, then have Claude build a static site using MediaPipe Hands (browser JS) + getUserMedia for the webcam widget, mapping hand position/gesture to video scrub / scroll transform.
- Key insight: no hand-tracking code is written by the human — the agent wires up the webcam + hand-tracking interaction from a one-line natural-language prompt.

## Key moments

- **[00:00] Demo-first hook** (frame_0001.jpg) — finished site on a monitor: "Crafting digital experiences, one fold at a time" with origami-face hero and a small webcam card; creator waves her hand at the camera and the page reacts. On-screen text: "interactive website step by step — Part 2".
- **[00:05] Asset prerequisite** (frame_0003.jpg) — "1st - you will need": the origami-face portrait video open in a video editor timeline (~5s clip).
- **[00:07] AI video generation** (frame_0004.jpg) — model picker showing Kling 3.0, Kling 3.0 Omni, Seedance 2.0 Fast, Seedance 2.0, Seedance 1.5 Pro; caption "using Seedance 2".
- **[00:09] Reference to Part 1** (frame_0005.jpg) — "I shared in this video": embedded clip of Part 1 where the asset workflow was covered.
- **[00:10] Open Replit** (frame_0006.jpg) — browser command palette: "New Repl"; prior projects visible include "Hand Motion Canvas - Replit".
- **[00:12] Replit Agent prompt** (frame_0007.jpg) — "Hi Marina, what do you want to make?" — attaches the reference image of the site design; caption "or simply attach reference".
- **[00:17] Live hand-tracked site** (frame_0008.jpg) — site running on replit.dev with webcam widget in the corner tracking her raised hand.
- **[00:20-00:23] Iteration in the same chat** (frame_0009.jpg, frame_0011.jpg) — follow-up prompts: "align it to bottom left", "Same spacing at the bottom as on the left for the element 160 px", "create light mode with this light mode v…" (attaching a `magnific_anima…` video file), and "remove camera frame and change hand tracking interaction to scroll transform (play video on scroll), smooth scroll".
- **[00:26-00:31] Final result** (frame_0012.jpg, frame_0013.jpg) — polished dark-mode site; hand gestures scrub the origami-fold animation (portrait folds into an origami sphere).

## Hook microscope (0-10s)

- Frames: 20 at 2 fps

Demo-first hook: opens directly on the finished product — the creator's hand raised in front of the monitor, site visibly reacting to the gesture (frame_0001). ~3s in, cut to talking-head card overlaid on the site ("to create such design", frame_0002), then straight into step 1 at ~5s (the required video asset, frame_0003). No intro, no channel branding; the payoff is shown before any explanation, and "Part 2" text creates series continuity. Pattern: demo-first + in-medias-res.

## Editorial profile

- Shots: 13
- Cuts/min: 23.33
- Mean shot length: 2.57s
- Median shot length: 2.33s
- Talking-head ratio: n/a (opencv not installed)

Fast screen-recording tutorial (~23 cuts/min, 2.6s mean shot) with persistent talking-head PiP card and burned-in caption strips — classic Reels/TikTok design-tutorial format.

## Quotable moments

No audio transcript available (Whisper blocked by local SSL cert issue). From burned-in captions: "interactive website step by step — Part 2" [00:00]; "1st — you will need" [00:05]; "using Seedance 2" [00:07]; "now open replit" [00:10]; "or simply attach reference" [00:12]; and the visible agent prompt "remove camera frame and change hand tracking interaction to scroll transform (play video on scroll), smooth scroll" [00:23].

## Entities mentioned

- People: [[marina-budarina]] (creator/designer)
- Companies: [[replit]], [[bytedance]] (Seedance), [[kuaishou]] (Kling)
- Tools / products: [[replit-agent]], [[seedance-2]], [[kling-3]], [[magnific]] (file named `magnific_anima…`), [[mediapipe-hands]] (implied hand-tracking tech)
- Places: none

## Concepts surfaced

- **hand-tracking web interaction**: webcam + in-browser hand landmark detection drives page behavior (scroll, video scrub) instead of mouse/touch.
- **scroll-transform video scrubbing**: mapping an input signal (scroll or hand position) to a video's playback position — "play video on scroll".
- **agent-built websites**: describing a site + attaching a visual reference to a coding agent (Replit Agent / Claude Code) instead of hand-coding; iterate with short pixel-level follow-ups in the same chat.
- **AI-generated hero assets**: hero animation produced by a text/image-to-video model (Seedance 2) rather than filmed or 3D-rendered.
- **demo-first short-form tutorial**: show the finished result in second 0, then compress the build into captioned steps.

## Transcript

_No transcript available._

## All frames

_Total: 13. Hero frames flagged with star._

* `./frame_0001.jpg` (t=00:00)
  `./frame_0002.jpg` (t=00:03)
* `./frame_0003.jpg` (t=00:05)
  `./frame_0004.jpg` (t=00:07)
* `./frame_0005.jpg` (t=00:09)
  `./frame_0006.jpg` (t=00:10)
* `./frame_0007.jpg` (t=00:12)
  `./frame_0008.jpg` (t=00:17)
  `./frame_0009.jpg` (t=00:20)
  `./frame_0010.jpg` (t=00:22)
  `./frame_0011.jpg` (t=00:23)
* `./frame_0012.jpg` (t=00:26)
  `./frame_0013.jpg` (t=00:31)

> Note: only the 5 hero frames (starred) were copied alongside this report; other frame files listed above were temp artifacts and no longer exist.
