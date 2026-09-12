/**
 * theme.js — light/dark toggle persisted in localStorage.
 *
 * The initial theme is applied by an inline script in index.html before
 * first paint; this module only wires up the button.
 */

export function initTheme(buttonId = "theme-toggle") {
  const btn = document.getElementById(buttonId);
  if (!btn) return;
  const root = document.documentElement;
  const label = btn.querySelector(".theme-label");

  function sync() {
    const dark = root.getAttribute("data-theme") === "dark";
    if (label) label.textContent = dark ? "Light" : "Dark";
    btn.setAttribute("aria-pressed", String(dark));
  }

  btn.addEventListener("click", () => {
    const dark = root.getAttribute("data-theme") === "dark";
    if (dark) root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", "dark");
    try { localStorage.setItem("theme", dark ? "light" : "dark"); } catch (e) { /* private mode */ }
    sync();
  });

  sync();
}
