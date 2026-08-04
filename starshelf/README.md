# Starshelf website

Product site for [Starshelf](https://github.com/mariodian/starshelf), a Chrome and Firefox extension that auto-categorizes GitHub stars with AI.

**Intended URL:** [https://apps.mariodian.com/starshelf/](https://apps.mariodian.com/starshelf/)

## Pages

| File | Description |
|------|-------------|
| `index.html` | Landing page |
| `privacy.html` | Privacy Policy |
| `terms.html` | Terms of Service |

## Stack

Static HTML, CSS, and a small JS file. No build step. Relative paths work at `/starshelf/` or at the domain root.

## Local preview

```bash
cd starshelf-site
python3 -m http.server 4173
# open http://127.0.0.1:4173/
```

Any static server from this directory works.

## GitHub Pages

1. Push this folder as a repo root (for example `starshelf-site`).
2. Settings → Pages → deploy from `main` at `/` (root).
3. For `https://apps.mariodian.com/starshelf/`:
   - Point `apps.mariodian.com` DNS at your host.
   - Publish these files under `/starshelf/` (subdirectory, reverse proxy, or monorepo folder).
   - Relative links already support the subpath.

Store listing URLs:

- Privacy: `https://apps.mariodian.com/starshelf/privacy.html`
- Terms: `https://apps.mariodian.com/starshelf/terms.html`

## Brand assets

Icons and screenshots come from the extension repo. Refresh when art changes:

```bash
cp ../../AI/starshelf/public/icon-256.png assets/
cp ../../AI/starshelf/media/screenshots/*.webp assets/
```

## Contact

Privacy and terms: `starshelf.wistful980@slmail.me`
