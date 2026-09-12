/**
 * main.js — entry point. Renders every section from data.js, then wires
 * up the interactive bits (nav, reveal, theme, project filter, cursor
 * trail).
 */

import * as data from "./data.js";
import * as ui from "./render.js";
import { initNav } from "./nav.js";
import { initReveal } from "./reveal.js";
import { initTheme } from "./theme.js";
import { initProjectFilter } from "./projects.js";
import { initTrail } from "./trail.js";

const mount = (id, html) => {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
};

/* ---- render ---- */
mount("top", ui.hero(data.profile));
mount("about", ui.about(data.about));
mount("experience", ui.experience(data.experience));
mount("projects", ui.projects(data.projects));
mount("research", ui.research(data.research));
mount("leadership", ui.leadership(data.leadership));
mount("skills", ui.skills(data.skills));
mount("hobbies", ui.hobbies(data.hobbies));
mount("foot", ui.footer(data.profile));

// Drop the Research section (and its tab) if there's nothing to show.
if (!data.research.length) {
  document.getElementById("research")?.remove();
}
const navItems = data.navItems.filter((n) => document.getElementById(n.id));

/* ---- behaviour ---- */
initNav(navItems);
initReveal();
initTheme();
initProjectFilter();
initTrail();
