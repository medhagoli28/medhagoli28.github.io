/**
 * trail.js — the cursor "coaster" ribbon.
 *
 * A chain of points chases the pointer. The head is driven by a damped
 * spring (so it overshoots and settles), and every point behind it lerps
 * toward the point ahead of it, which produces the lagged, elastic-rope
 * feel. The chain is redrawn on a full-screen <canvas> every animation
 * frame as a tapered polyline whose color sweeps along its length through
 * the site palette.
 *
 * Nav interaction: the canvas sits *below* the sticky nav in z-order, so the
 * ribbon threads behind the tabs. When the head is near the nav it is gently
 * pulled toward the tab baseline (the "track"), and any tab it passes through
 * gets a `.hot` class for a brief glow.
 */

const POINTS = 34;          // chain length
const FOLLOW = 0.42;        // how eagerly each point chases the one ahead (0..1)
const SPRING = 0.16;        // head spring stiffness
const DAMPING = 0.68;       // head velocity damping
const MAX_WIDTH = 9;        // stroke width at the head (px)
const IDLE_FADE_MS = 1400;  // ribbon fades after the pointer rests this long
const HOT_RADIUS = 46;      // px from tab center that counts as "through the tab"
const TRACK_PULL = 0.12;    // strength of the pull toward the nav track

/** Palette pulled from the CSS custom properties so dark mode is respected. */
function readPalette() {
  const css = getComputedStyle(document.documentElement);
  const get = (n) => css.getPropertyValue(n).trim();
  return [get("--brown"), get("--gold"), get("--green"), get("--plum")].filter(Boolean);
}

/* --- tiny color helpers (hex → rgb → mix) ------------------------------ */
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function mix(a, b, t) {
  return [0, 1, 2].map((i) => Math.round(a[i] + (b[i] - a[i]) * t));
}
/** Color at position s ∈ [0,1) along a looping gradient of `stops`. */
function sample(stops, s) {
  const n = stops.length;
  const x = ((s % 1) + 1) % 1 * n;
  const i = Math.floor(x);
  return mix(stops[i % n], stops[(i + 1) % n], x - i);
}

export function initTrail({ canvasId = "trail", navSelector = ".navtabs", tabSelector = ".navtab" } = {}) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  // No pointer, or the user asked for less motion: skip the effect entirely.
  const coarse = matchMedia("(pointer: coarse)").matches;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (coarse || reduce) {
    canvas.remove();
    return;
  }

  const ctx = canvas.getContext("2d");
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let W = 0, H = 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  let stops = readPalette().map(hexToRgb);
  // Re-read the palette whenever the theme flips.
  new MutationObserver(() => { stops = readPalette().map(hexToRgb); })
    .observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  // Chain state. Points start off-screen so nothing flashes on load.
  const pts = Array.from({ length: POINTS }, () => ({ x: -100, y: -100 }));
  const head = { x: -100, y: -100, vx: 0, vy: 0 };
  const mouse = { x: -100, y: -100, seen: false, lastMove: 0 };

  window.addEventListener("pointermove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.lastMove = performance.now();
    if (!mouse.seen) {
      // First movement: snap the whole chain to the pointer instead of
      // dragging it in from the corner.
      mouse.seen = true;
      head.x = e.clientX; head.y = e.clientY;
      pts.forEach((p) => { p.x = e.clientX; p.y = e.clientY; });
    }
  }, { passive: true });
  window.addEventListener("pointerleave", () => { mouse.lastMove = 0; });

  const nav = document.querySelector(navSelector);
  const hotTimers = new WeakMap();

  function touchNav() {
    if (!nav) return;
    const r = nav.getBoundingClientRect();
    if (r.width === 0) return;
    const pad = 36;
    const near = head.x > r.left - pad && head.x < r.right + pad && head.y > r.top - pad && head.y < r.bottom + pad;
    if (!near) return;

    // Ride the track: pull the head (and the first few followers) toward
    // the tab baseline so the ribbon runs along the underline.
    const trackY = r.bottom - 8;
    head.vy += (trackY - head.y) * TRACK_PULL;
    for (let i = 0; i < 6; i++) pts[i].y += (trackY - pts[i].y) * (TRACK_PULL * 0.6);

    // Light up any tab the head passes through.
    for (const tab of nav.querySelectorAll(tabSelector)) {
      const b = tab.getBoundingClientRect();
      const cx = b.left + b.width / 2, cy = b.top + b.height / 2;
      const d = Math.hypot(head.x - cx, head.y - cy);
      if (d < HOT_RADIUS) {
        if (!tab.classList.contains("hot")) tab.classList.add("hot");
        clearTimeout(hotTimers.get(tab));
        hotTimers.set(tab, setTimeout(() => tab.classList.remove("hot"), 500));
      }
    }
  }

  let phase = 0;
  let last = performance.now();

  function frame(now) {
    const dt = Math.min((now - last) / 16.67, 2); // normalise to ~60fps steps
    last = now;
    phase += 0.006 * dt;                          // gradient sweep speed

    // Head: damped spring toward the pointer.
    head.vx = (head.vx + (mouse.x - head.x) * SPRING) * DAMPING;
    head.vy = (head.vy + (mouse.y - head.y) * SPRING) * DAMPING;
    head.x += head.vx * dt;
    head.y += head.vy * dt;

    touchNav();

    // Chain: each point follows the one ahead with a little lag.
    pts[0].x += (head.x - pts[0].x) * FOLLOW * dt;
    pts[0].y += (head.y - pts[0].y) * FOLLOW * dt;
    for (let i = 1; i < POINTS; i++) {
      pts[i].x += (pts[i - 1].x - pts[i].x) * FOLLOW * dt;
      pts[i].y += (pts[i - 1].y - pts[i].y) * FOLLOW * dt;
    }

    // Fade the whole ribbon out when the pointer has been still for a while.
    const idle = now - mouse.lastMove;
    const alpha = mouse.seen ? Math.max(0, 1 - Math.max(0, idle - IDLE_FADE_MS) / 700) : 0;

    ctx.clearRect(0, 0, W, H);
    if (alpha > 0.01) draw(alpha);

    requestAnimationFrame(frame);
  }

  /** Draw the chain as short segments so width and color can vary along it. */
  function draw(alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (let i = 0; i < POINTS - 1; i++) {
      const t = i / (POINTS - 1);            // 0 at head, 1 at tail
      const [r, g, b] = sample(stops, t * 1.2 - phase);
      ctx.strokeStyle = `rgb(${r},${g},${b})`;
      ctx.lineWidth = Math.max(0.6, MAX_WIDTH * (1 - t) ** 1.15);
      ctx.beginPath();
      // Midpoint smoothing so the ribbon bends instead of kinking.
      const a = pts[i], c = pts[i + 1];
      const mx = (a.x + c.x) / 2, my = (a.y + c.y) / 2;
      if (i === 0) ctx.moveTo(a.x, a.y); else ctx.moveTo(pts[i].x, pts[i].y);
      ctx.quadraticCurveTo(a.x, a.y, mx, my);
      ctx.lineTo(c.x, c.y);
      ctx.stroke();
    }
    // A small "car" at the head of the coaster.
    const [r, g, b] = sample(stops, -phase);
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.beginPath();
    ctx.arc(head.x, head.y, MAX_WIDTH * 0.62, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  requestAnimationFrame(frame);
}
