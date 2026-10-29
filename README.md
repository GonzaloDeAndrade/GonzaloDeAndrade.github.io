# Portfolio — Gonzalo de Andrade

Static site (HTML + CSS + vanilla JS), no build step. Served by GitHub Pages from `main`.

## Run locally
```
npx serve .        # or: python -m http.server 8000
```

## Add a project
1. Put screenshots in `assets/projects/<id>/` (WebP, ~1600px wide).
2. Add an object to `js/projects.js`. Projects with a `caseStudy` get the wide featured card
   and a page at `project.html?id=<id>`; every case-study section is optional.

## Deploy
Push to `main` — GitHub Pages publishes it at https://gonzalodeandrade.github.io/
