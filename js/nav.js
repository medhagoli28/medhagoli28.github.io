/**
 * nav.js — sticky nav: renders the tabs and highlights the current section.
 *
 * Uses an IntersectionObserver over each <section>; the section that owns
 * the most of the viewport's upper band gets the `.on` tab.
 */

export function initNav(navItems, { tabsId = "navtabs" } = {}) {
  const wrap = document.getElementById(tabsId);
  if (!wrap) return;

  wrap.innerHTML = navItems
    .map((n) => `<a class="navtab" href="#${n.id}" data-target="${n.id}">${n.label}</a>`)
    .join("");

  const tabs = [...wrap.querySelectorAll(".navtab")];
  const byId = Object.fromEntries(tabs.map((t) => [t.dataset.target, t]));
  const sections = navItems.map((n) => document.getElementById(n.id)).filter(Boolean);

  const ratios = new Map();
  function setActive(id) {
    tabs.forEach((t) => t.classList.toggle("on", t.dataset.target === id));
    // Keep the active tab in view on narrow screens where the row scrolls.
    const t = byId[id];
    if (t && wrap.scrollWidth > wrap.clientWidth) {
      t.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    }
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => ratios.set(e.target.id, e.intersectionRatio));
      let best = null, bestRatio = 0;
      for (const s of sections) {
        const r = ratios.get(s.id) || 0;
        if (r > bestRatio) { best = s.id; bestRatio = r; }
      }
      if (best) setActive(best);
      else if (window.scrollY < 200) tabs.forEach((t) => t.classList.remove("on"));
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.01, 0.25, 0.5, 0.75, 1] }
  );
  sections.forEach((s) => io.observe(s));

  // Clicking a tab: mark it immediately so the underline doesn't lag the scroll.
  tabs.forEach((t) => t.addEventListener("click", () => setActive(t.dataset.target)));
}
