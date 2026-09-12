/**
 * reveal.js — scroll-triggered fade/slide-in.
 *
 * Any element with the `.reveal` class starts slightly translated and
 * transparent (see styles.css) and gets `.in` the first time it scrolls
 * into view. Optional data-delay="1|2|3" staggers siblings.
 */

export function initReveal(selector = ".reveal") {
  const els = document.querySelectorAll(selector);
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  els.forEach((el) => io.observe(el));
}
