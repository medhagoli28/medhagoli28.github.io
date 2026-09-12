/**
 * main.js — entry point for every page.
 *
 * Each HTML file sets `<body data-page="…">`. This module looks up that
 * page's section list below, renders only those sections from data.js,
 * numbers them in order (skipping any with no content), then wires up the
 * shared behaviour: nav, reveal animations, theme toggle, project filter,
 * cursor trail.
 */

import * as data from "./data.js";
import * as ui from "./render.js";
import { initNav } from "./nav.js";
import { initReveal } from "./reveal.js";
import { initTheme } from "./theme.js";
import { initProjectFilter } from "./projects.js";
import { initTrail } from "./trail.js";

/** Section id → [content, renderer]. Order here is the order on the page. */
const SECTIONS = {
  about:      [data.about,      (d, n) => ui.about(d, n)],
  next:       [data.pages,      (d, n) => ui.pageLinks(d)],
  experience: [data.experience, (d, n) => ui.experience(d, n)],
  research:   [data.research,   (d, n) => ui.research(d, n)],
  leadership: [data.leadership, (d, n) => ui.leadership(d, n)],
  projects:   [data.projects,   (d, n) => ui.projects(d, n)],
  skills:     [data.skills,     (d, n) => ui.skills(d, n)],
  hobbies:    [data.hobbies,    (d, n) => ui.hobbies(d, n)],
};

const page = document.body.dataset.page || "home";
const pageMeta = data.pages.find((p) => p.file === `${page === "home" ? "index" : page}.html`);

/* ---- masthead ---- */
document.getElementById("top").innerHTML =
  page === "home" ? ui.hero(data.profile) : ui.pageHead(pageMeta, data.profile);

/* ---- sections present in this page's HTML, in DOM order ---- */
let n = 0;
for (const el of document.querySelectorAll("main > section")) {
  const [content, render] = SECTIONS[el.id] || [];
  const empty = !content || (Array.isArray(content) && content.length === 0);
  if (!render || empty) { el.remove(); continue; }
  n += 1;
  el.innerHTML = render(content, n);
}

document.getElementById("foot").innerHTML = ui.footer(data.profile);

/* ---- behaviour ---- */
initNav(data.pages);
initReveal();
initTheme();
initProjectFilter();
initTrail();
