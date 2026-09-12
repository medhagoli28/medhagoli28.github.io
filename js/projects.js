/**
 * projects.js — tag filter for the project grid.
 *
 * Builds one `.tab` per distinct tag (plus "All") and toggles `.hidden`
 * on cards whose data-tags don't include the chosen tag.
 */

export function initProjectFilter({ barId = "project-filter", gridId = "project-grid" } = {}) {
  const bar = document.getElementById(barId);
  const grid = document.getElementById(gridId);
  if (!bar || !grid) return;

  const cards = [...grid.querySelectorAll(".card")];
  const counts = new Map();
  for (const c of cards) {
    for (const t of c.dataset.tags.split("|")) counts.set(t, (counts.get(t) || 0) + 1);
  }
  // Tags shared by at least two projects make useful filters; the rest
  // would just be a one-card view.
  const tags = [...counts.entries()].filter(([, n]) => n >= 2).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

  bar.innerHTML =
    `<span class="side-h">Filter</span>` +
    `<button class="tab on" type="button" data-tag="*">All · ${cards.length}</button>` +
    tags.map(([t, n]) => `<button class="tab" type="button" data-tag="${t}">${t} · ${n}</button>`).join("");

  bar.addEventListener("click", (e) => {
    const btn = e.target.closest(".tab");
    if (!btn) return;
    bar.querySelectorAll(".tab").forEach((b) => b.classList.toggle("on", b === btn));
    const tag = btn.dataset.tag;
    for (const c of cards) {
      const show = tag === "*" || c.dataset.tags.split("|").includes(tag);
      c.classList.toggle("hidden", !show);
    }
  });
}
