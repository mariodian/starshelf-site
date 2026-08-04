# Pincer website

Product site for [Pincer](https://github.com/mariodian/pincer), desktop monitoring for local AI agents.

**Intended URL:** [https://apps.mariodian.com/pincer/](https://apps.mariodian.com/pincer/)

## Pages

| File | Description |
|------|-------------|
| `index.html` | Landing page |
| `privacy.html` | Privacy Policy |
| `terms.html` | Terms of Service |

## Stack

Static HTML, CSS, and a small JS file. No build step. Relative paths work at `/pincer/` or at the domain root.

## Local preview

```bash
cd pincer
python3 -m http.server 4174
# open http://127.0.0.1:4174/
```

## Brand assets

Icons and screenshots come from the product repo. Refresh when art changes:

```bash
PINCER_SRC=../../AI/pincer  # adjust path
cp "$PINCER_SRC/icons/icon.iconset/icon_256x256.png" assets/icon-256.png
cp "$PINCER_SRC/media/screenshots/"*.webp assets/
# keep only the five screenshots used by index.html if extras appear
```

## Contact

Privacy and terms: [GitHub Issues](https://github.com/mariodian/pincer/issues) · [@mariodian](https://x.com/mariodian)
