/* Affirm' — webcam hand-conducting
   MediaPipe Tasks Vision HandLandmarker: wrist height relative to the
   camera-view center becomes a smoothed frame offset that main.js blends
   with scroll. Loaded lazily on first toggle-on; everything runs locally. */

const CDN = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14";
const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";
const FINGERTIPS = [4, 8, 12, 16, 20];
const NO_HAND_MS = 500; /* hand gone this long → offset eases back to 0 */
const ERROR_LINGER_MS = 1800; /* how long the card shows an error before closing */

export function createHands({ maxOffsetFrames, reducedMotion, setOffset, onFail }) {
  let landmarker = null;
  let stream = null;
  let running = false;
  let rafId = 0;
  let card = null, video = null, dots = null, statusEl = null;

  function buildCard() {
    card = document.createElement("aside");
    card.className = "hands-card";
    card.setAttribute("aria-live", "polite");
    card.innerHTML =
      '<div class="hands-view">' +
      '<video class="hands-video" autoplay playsinline muted></video>' +
      '<canvas class="hands-dots"></canvas>' +
      "</div>" +
      '<p class="hands-status"><span class="slash">\\</span><span class="hands-state">REQUESTING…</span></p>';
    document.body.appendChild(card);
    video = card.querySelector(".hands-video");
    dots = card.querySelector(".hands-dots");
    statusEl = card.querySelector(".hands-state");
  }

  function setStatus(text) {
    if (statusEl) statusEl.textContent = text;
  }

  function removeCard() {
    card?.remove();
    card = video = dots = statusEl = null;
  }

  function stopStream() {
    stream?.getTracks().forEach((t) => t.stop());
    stream = null;
  }

  function fail(label, err) {
    setStatus(label);
    card?.classList.add("hands-error");
    running = false;
    cancelAnimationFrame(rafId);
    stopStream();
    setTimeout(removeCard, ERROR_LINGER_MS);
    onFail();
    throw err;
  }

  /* dots are drawn mirrored, matching the mirrored video underneath */
  function drawDots(landmarks) {
    const ctx = dots.getContext("2d");
    ctx.clearRect(0, 0, dots.width, dots.height);
    if (!landmarks) return;
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--ink").trim();
    for (const i of FINGERTIPS) {
      const lm = landmarks[i];
      ctx.beginPath();
      ctx.arc((1 - lm.x) * dots.width, lm.y * dots.height, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  let lastVideoTime = -1;
  let raw = 0; /* offset implied by the latest detection */
  let smoothed = 0; /* EMA the site actually follows */
  let lastSeen = 0;

  function loop(now) {
    if (!running) return;
    if (video.readyState >= 2 && video.currentTime !== lastVideoTime) {
      lastVideoTime = video.currentTime;
      const res = landmarker.detectForVideo(video, now);
      const hand = res.landmarks && res.landmarks[0];
      if (hand) {
        /* wrist above center → forward, below → backward, ±1 clip */
        const wrist = hand[0];
        raw = Math.max(-1, Math.min(1, (0.5 - wrist.y) * 2)) * maxOffsetFrames;
        lastSeen = now;
        setStatus("TRACKING");
        drawDots(hand);
      } else {
        drawDots(null);
        if (now - lastSeen > NO_HAND_MS) {
          raw = 0; /* ease back to pure scroll */
          setStatus("NO HAND");
        }
      }
    }
    const ease = reducedMotion ? 1 : 0.12;
    smoothed += (raw - smoothed) * ease;
    if (raw === 0 && Math.abs(smoothed) < 0.05) smoothed = 0;
    setOffset(smoothed);
    rafId = requestAnimationFrame(loop);
  }

  return {
    async enable() {
      buildCard();

      if (!landmarker) {
        let vision;
        try {
          vision = await import(`${CDN}/+esm`);
          const files = await vision.FilesetResolver.forVisionTasks(`${CDN}/wasm`);
          const opts = (delegate) =>
            vision.HandLandmarker.createFromOptions(files, {
              baseOptions: { modelAssetPath: MODEL_URL, delegate },
              runningMode: "VIDEO",
              numHands: 1,
            });
          landmarker = await opts("GPU").catch(() => opts("CPU"));
        } catch (err) {
          fail("LOAD FAILED", err);
        }
      }

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 320, height: 240, facingMode: "user" },
          audio: false,
        });
      } catch (err) {
        fail("CAMERA BLOCKED", err);
      }

      video.srcObject = stream;
      await video.play().catch(() => {});
      dots.width = card.querySelector(".hands-view").clientWidth;
      dots.height = card.querySelector(".hands-view").clientHeight;

      raw = 0;
      smoothed = 0;
      lastVideoTime = -1;
      lastSeen = performance.now();
      running = true;
      setStatus("NO HAND");
      rafId = requestAnimationFrame(loop);
    },

    disable() {
      running = false;
      cancelAnimationFrame(rafId);
      stopStream();
      removeCard();
    },
  };
}
