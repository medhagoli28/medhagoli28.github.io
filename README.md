# Medha Goli — Portfolio

A four-page personal portfolio (Home, Work, Projects, More). Plain HTML,
CSS, and ES-module JavaScript, no build step, deployable straight to GitHub
Pages.

The color theme is carried over from my [WSJ Deep Digest](https://medhagoli28.github.io/wsj-daily-summaries/)
project: cream paper, small-caps labels, and brown / green / plum accents.
Type is Playfair Display for headlines and Source Sans 3 for everything else. The layout and interaction ideas (sticky tabs,
project switcher, a cursor ribbon that rides along the nav) are inspired by
[leenadudi.github.io](https://leenadudi.github.io/).

## Run it locally

Any static file server works. The site uses ES modules, so it must be served
over HTTP rather than opened as a `file://` URL.

```bash
python3 -m http.server 4173
```

Then open http://localhost:4173.

## Edit the content

Everything on every page comes from one file: [`js/data.js`](js/data.js).
Update the objects there (profile, about, experience, projects, research,
leadership, skills, hobbies, pages) and reload. Sections that end up empty
(for example `research`) are removed from their page automatically.

Which sections appear on which page is set by the `<section id="…">`
elements in each HTML file; `js/main.js` maps those ids to renderers. To
move a section, move its `<section>` tag to another page.

Assets live in `assets/`:

| File | Used for |
| --- | --- |
| `headshot.jpg` | Hero portrait |
| `wsj-digest.png`, `risk-dashboard.png`, `backtest.png` | Project thumbnails |

Projects without an `image` get a generated newspaper-style cover.

## Layout of the code

```
index.html          Home: hero + about + "read next" cards
work.html           experience + research + leadership
projects.html       project grid with tag filter
more.html           skills + hobbies
css/styles.css      theme tokens (light + dark), components, responsive rules
js/data.js          all content (plus the page list)
js/render.js        HTML "components" — one function per section
js/main.js          entry point: renders this page's sections, wires up behaviour
js/nav.js           sticky nav, current page marked
js/reveal.js        scroll-triggered fade/slide-in
js/theme.js         light / dark toggle (persisted in localStorage)
js/projects.js      tag filter for the project grid
js/trail.js         cursor "coaster" ribbon on a <canvas>
.github/workflows/  GitHub Pages deployment
```

### The cursor trail

`js/trail.js` keeps a chain of 34 points. The head is driven by a damped
spring toward the pointer; every other point lerps toward the point ahead
of it, which gives the lagged, elastic feel. Each animation frame the chain
is redrawn as a tapered polyline whose color sweeps along its length through
the palette. The canvas sits below the sticky nav in z-order so the ribbon
threads behind the tabs; when the head is near the nav it is pulled toward
the tab baseline, and any tab it passes through gets a brief glow.

The effect is skipped on touch devices and when `prefers-reduced-motion`
is set.

## Deploy to GitHub Pages

The workflow in `.github/workflows/deploy.yml` publishes the repository root
on every push to `main`.

1. Push this folder to a GitHub repository. For a user site (served at
   `https://<username>.github.io/`) the repository must be named
   `<username>.github.io`; any other name is served at
   `https://<username>.github.io/<repo>/`.
2. In the repository settings, under **Pages**, set **Source** to
   **GitHub Actions**.
3. Push to `main`. The workflow uploads the site and deploys it; the URL is
   printed in the workflow summary.

All asset paths are relative, so the site works at either kind of URL.
