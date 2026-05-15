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

### One-time Pages settings (required)

1. Open [Repository Settings → Pages](https://github.com/connect-sethuvg/sonnetDetails/settings/pages)
2. Under **Build and deployment** → **Source**, choose **Deploy from a branch**
3. Pick **one** of these (both are updated on every deploy):

| Branch | Folder | Notes |
|--------|--------|--------|
| **gh-pages** | **/ (root)** | Recommended |
| **main** | **/docs** | Alternative |

4. Click **Save** and wait 1–2 minutes

> **Do not** use `main` + `/ (root)` — that serves the dev `index.html` with `/src/main.tsx` and shows a **blank white page**.
