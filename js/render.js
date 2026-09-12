/**
 * render.js — small HTML "components". Each function returns a string
 * of markup for one section, built from the objects in data.js.
 */

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const tagList = (tags = []) =>
  tags.length ? `<div class="tags">${tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>` : "";

const ext = (href) => (/^https?:/.test(href) ? ` target="_blank" rel="noopener"` : "");

/** Shared section header: kicker + big serif title + a right-aligned note. */
function sectionHead(no, title, meta = "") {
  return `
    <div class="section-head reveal">
      <div>
        <div class="kicker"><span class="diamond">◆</span>Section ${String(no).padStart(2, "0")}</div>
        <h2 class="section-title">${esc(title)}</h2>
      </div>
      ${meta ? `<div class="section-meta">${meta}</div>` : ""}
    </div>`;
}

/* ---------- hero ---------- */
export function hero(p) {
  const [first, ...rest] = p.name.split(" ");
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  return `
    <div class="mast-top">
      <span>Portfolio · Est. 2026</span>
      <span>${esc(p.location)}</span>
    </div>
    <div class="hero-grid">
      <div>
        <h1 class="hero-name">${esc(first)} <em>${esc(rest.join(" "))}</em></h1>
        <div class="hero-sub">Computer Science · Cornell University · Class of 2028</div>
        <p class="hero-tagline">${esc(p.tagline)}</p>
        <div class="hero-links">
          ${p.links
            .map((l, i) => `<a class="btn${i ? " ghost" : ""}" href="${esc(l.href)}"${ext(l.href)}>${esc(l.label)}${l.external ? " ↗" : ""}</a>`)
            .join("")}
        </div>
        <div class="scroll-cue">Scroll</div>
      </div>
      <figure class="hero-photo">
        <img src="${esc(p.headshot)}" alt="Portrait of ${esc(p.name)}" width="720" height="900" />
        <figcaption>${esc(p.name)} · ${esc(today)}</figcaption>
      </figure>
    </div>`;
}

/* ---------- about ---------- */
export function about(a) {
  const e = a.education;
  return (
    sectionHead(1, "About", "A short bio") +
    `<div class="about-grid">
      <div class="about-copy reveal">
        ${a.paragraphs.map((t) => `<p>${esc(t)}</p>`).join("")}
      </div>
      <aside class="about-side reveal" data-delay="1">
        <div class="side-h">Education</div>
        <div class="edu-school">${esc(e.school)}</div>
        <div class="edu-degree">${esc(e.degree)} · ${esc(e.location)}</div>
        <div class="edu-dates">${esc(e.dates)}</div>
        <div class="side-h">Selected coursework</div>
        <ul class="course-list">
          ${e.coursework.map((c, i) => `<li><span class="n">${i + 1}</span><span>${esc(c)}</span></li>`).join("")}
        </ul>
      </aside>
    </div>`
  );
}

/* ---------- stacked entries (experience, research, leadership) ---------- */
function entry(x, i) {
  return `
    <article class="entry reveal" data-delay="${Math.min(i, 3)}">
      <div class="entry-when">${esc(x.dates)}${x.location ? `<span class="loc">${esc(x.location)}</span>` : ""}</div>
      <div>
        <h3 class="entry-role">${esc(x.role)}</h3>
        <div class="entry-org"><span class="at">at</span> ${esc(x.company || x.org)}</div>
        <ul>${x.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
        ${tagList(x.tags)}
      </div>
    </article>`;
}

export function experience(list) {
  return sectionHead(2, "Work experience", `${list.length} roles · most recent first`) + list.map(entry).join("");
}

export function research(list) {
  return sectionHead(4, "Research", "Lab experience") + list.map(entry).join("");
}

export function leadership(list) {
  return (
    sectionHead(5, "Leadership & service", "Clubs, coaching, community") +
    list.map((x, i) => entry({ ...x, company: x.org, role: x.org, org: x.role }, i)).join("")
  );
}

/* ---------- projects ---------- */
const CAT_LABEL = { tech: "Tools & automation", markets: "Data & dashboards", finance: "Quant" };

/** Fallback cover art for projects without a screenshot: a little front page. */
function cover(title, accent) {
  const color = { tech: "#8a5a2b", markets: "#2f5d3a", finance: "#5a4a8a" }[accent] || "#8a5a2b";
  const words = title.split(" ");
  const line1 = words.slice(0, Math.ceil(words.length / 2)).join(" ");
  const line2 = words.slice(Math.ceil(words.length / 2)).join(" ");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400">
      <rect width="640" height="400" fill="#f6f1e6"/>
      <rect x="40" y="40" width="560" height="2" fill="#1c1a15"/>
      <text x="40" y="30" font-family="system-ui,sans-serif" font-size="11" letter-spacing="2.5" fill="${color}" font-weight="600">THE DEEP DIGEST · PROJECT</text>
      <text x="40" y="118" font-family="Georgia,serif" font-size="46" font-weight="700" fill="#1c1a15">${esc(line1)}</text>
      <text x="40" y="172" font-family="Georgia,serif" font-size="46" font-weight="700" fill="#1c1a15">${esc(line2)}</text>
      ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="40" y="${215 + i * 22}" width="${i % 2 ? 380 : 520}" height="8" fill="#d8cfbd"/>`).join("")}
      <rect x="40" y="360" width="560" height="1" fill="#d8cfbd"/>
      <circle cx="560" cy="120" r="30" fill="${color}" opacity=".9"/>
    </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
}

export function projects(list) {
  const cards = list
    .map(
      (p, i) => `
      <article class="card ${esc(p.accent || "tech")} reveal" data-delay="${i % 3}" data-tags="${esc(p.tags.join("|"))}">
        <div class="card-media">
          <img src="${p.image ? esc(p.image) : cover(p.title, p.accent)}" alt="${esc(p.title)} preview" loading="lazy" />
        </div>
        <div class="card-body">
          <div class="card-cat">${esc(CAT_LABEL[p.accent] || "Project")}</div>
          <h3 class="card-title">${esc(p.title)}</h3>
          ${p.subtitle ? `<div class="card-sub">${esc(p.subtitle)}</div>` : ""}
          <p class="card-desc">${esc(p.description)}</p>
          ${tagList(p.tags)}
          ${
            p.live || p.repo
              ? `<div class="card-links">
                  ${p.live ? `<a class="btn" href="${esc(p.live)}"${ext(p.live)}>Live ↗</a>` : ""}
                  ${p.repo ? `<a class="btn ghost" href="${esc(p.repo)}"${ext(p.repo)}>Repo ↗</a>` : ""}
                </div>`
              : `<div class="card-note">${esc(p.note || "In progress")}</div>`
          }
        </div>
      </article>`
    )
    .join("");
  return (
    sectionHead(3, "Projects", `${list.length} projects · filter by tag`) +
    `<div class="filterbar reveal" id="project-filter"></div>
     <div class="project-grid" id="project-grid">${cards}</div>`
  );
}

/* ---------- skills ---------- */
export function skills(groups) {
  return (
    sectionHead(6, "Skills", "Grouped by category") +
    `<div class="skills-grid">
      ${groups
        .map(
          (g, i) => `
        <div class="skill-col reveal" data-delay="${i}">
          <div class="side-h">${esc(g.group)}</div>
          <ul class="skill-list">${g.items.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
        </div>`
        )
        .join("")}
    </div>`
  );
}

/* ---------- hobbies ---------- */
export function hobbies(list) {
  return (
    sectionHead(7, "Off the clock", "Hobbies & interests") +
    `<div class="hobby-grid">
      ${list
        .map(
          (h, i) => `
        <div class="hobby reveal" data-delay="${i % 4}">
          <div class="hobby-icon" aria-hidden="true">${h.icon}</div>
          <div>
            <div class="hobby-label">${esc(h.label)}</div>
            <div class="hobby-detail">${esc(h.detail)}</div>
          </div>
        </div>`
        )
        .join("")}
    </div>`
  );
}

/* ---------- footer ---------- */
export function footer(p) {
  const y = new Date().getFullYear();
  return `
    <span>© ${y} ${esc(p.name)} · Set in Newsreader · Built by hand, no frameworks</span>
    <a href="#top">Back to the top ↑</a>`;
}
