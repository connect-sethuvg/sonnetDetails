# Kia Sonet 2026 — Digital Showroom

Premium React microsite for exploring Kia Sonet variants, Kerala on-road pricing, and comparisons.

## Local development

```bash
npm install
npm run dev
```

## GitHub Pages

Live URL: **https://connect-sethuvg.github.io/sonnetDetails/**

After each push to `main`, the workflow builds `dist/` and publishes to the `gh-pages` branch.

### One-time Pages settings

1. Open [Repository Settings → Pages](https://github.com/connect-sethuvg/sonnetDetails/settings/pages)
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**
3. Branch: **gh-pages** · Folder: **/ (root)**
4. Save and wait 1–2 minutes

> Do **not** use `main` branch as the Pages source — that serves the dev `index.html` and causes a blank page.
