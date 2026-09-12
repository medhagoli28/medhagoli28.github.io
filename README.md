# Medha Goli — Portfolio

A single-page personal portfolio. Plain HTML, CSS, and ES-module JavaScript,
no build step, deployable straight to GitHub Pages.

The visual theme is carried over from my [WSJ Deep Digest](https://medhagoli28.github.io/wsj-daily-summaries/)
project: cream paper, Newsreader serif headlines, system-ui small caps, and
brown / green / plum accents. The layout and interaction ideas (sticky tabs,
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

Everything on the page comes from one file: [`js/data.js`](js/data.js).
Update the objects there (profile, about, experience, projects, research,
leadership, skills, hobbies, contact, navItems) and reload. Sections that
end up empty (for example `research`) are removed from the page and the nav
automatically.

Assets live in `assets/`:

| File | Used for |
| --- | --- |
| `headshot.jpg` | Hero portrait |
| `wsj-digest.png`, `risk-dashboard.png`, `backtest.png` | Project thumbnails |

Projects without an `image` get a generated newspaper-style cover.

## Layout of the code

```
index.html          page shell (hero, nav, empty sections, footer)
css/styles.css      theme tokens (light + dark), components, responsive rules
js/data.js          all content
js/render.js        HTML "components" — one function per section
js/main.js          entry point: renders sections, wires up behaviour
js/nav.js           sticky nav, active-section highlighting
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

## Contact form

The form builds a `mailto:` link with the fields pre-filled, so nothing is
stored anywhere. To use [Formspree](https://formspree.io) instead:

1. Create a form on Formspree and copy its endpoint.
2. In `js/main.js`, delete the `submit` handler at the bottom.
3. In `js/render.js`, add `action="https://formspree.io/f/YOUR_ID" method="POST"`
   to the `<form>` tag.

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
