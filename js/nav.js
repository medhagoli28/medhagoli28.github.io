/**
 * nav.js — sticky nav: one tab per page, current page marked `.on`.
 */

export function initNav(pages, { tabsId = "navtabs" } = {}) {
  const wrap = document.getElementById(tabsId);
  if (!wrap) return;

  const current = location.pathname.split("/").pop() || "index.html";

  wrap.innerHTML = pages
    .map((p) => {
      const on = p.file === current ? " on" : "";
      const cur = on ? ` aria-current="page"` : "";
      return `<a class="navtab${on}" href="${p.file}"${cur}>${p.label}</a>`;
    })
    .join("");

  // Keep the active tab visible on narrow screens where the row scrolls.
  const active = wrap.querySelector(".navtab.on");
  if (active && wrap.scrollWidth > wrap.clientWidth) {
    active.scrollIntoView({ block: "nearest", inline: "center" });
  }
}
