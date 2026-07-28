# rmmf-site

Public deploy target for the Rocky Mountain Mushroom Farm landing page.

**This repo is generated — do not edit `index.html` here.** The source of truth is
`Business/Marketing/Website/index.html` in the private RMMF repo; copy it over and
push to deploy.

Serves via GitHub Pages from `main` at the repo root. A custom domain later just
needs a `CNAME` file plus DNS pointed at GitHub.

Deliberately a separate public repo: the RMMF repo is private and holds research,
IP and funding material, so nothing there can be exposed by a Pages misconfiguration.
