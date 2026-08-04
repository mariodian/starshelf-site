# Pincer Product Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static product site for Pincer at `pincer/` (served as `https://apps.mariodian.com/pincer/`) with a warm amber ops identity, story-led landing page, Homebrew + platform downloads, and privacy/terms pages.

**Architecture:** Sibling of `starshelf/` in this monorepo. Plain HTML/CSS/JS, relative paths, no build step. Behavioral patterns (sticky header, mobile nav, scroll-reveal, screenshot gallery) mirror Starshelf; visual system is a distinct amber/ops redesign. Assets are copied from the Pincer product repo.

**Tech Stack:** HTML5, CSS3 (custom properties), vanilla JS, Google Fonts (Outfit + Inter), static assets (PNG/WebP)

**Spec:** `docs/superpowers/specs/2026-08-04-pincer-website-design.md`

## Global Constraints

- Stack: static HTML / CSS / JS only — no framework, bundler, or package manager
- Paths: relative only (must work at `/pincer/` and folder root)
- Theme: warm amber ops — **not** a purple Starshelf reskin; no starfield
- Typography: Outfit (display) + Inter (body) + system ui-monospace (commands)
- Install CTAs: Homebrew primary with copy button; macOS/Windows/Linux buttons all → `https://github.com/mariodian/pincer/releases/latest`
- Legal: `privacy.html` + `terms.html` for local desktop + optional `pincerd`
- Contact: GitHub issues + https://x.com/mariodian (no privacy mailbox)
- No analytics, cookies, or third-party trackers
- Respect `prefers-reduced-motion`
- Do not modify `starshelf/` files

---

## File map

| Path | Responsibility |
|------|----------------|
| `pincer/assets/*` | Icon + product screenshots |
| `pincer/css/styles.css` | Full design system + all page styles |
| `pincer/js/main.js` | Header, mobile nav, reveal, gallery, year, copy |
| `pincer/index.html` | Landing page (all marketing sections) |
| `pincer/privacy.html` | Privacy Policy |
| `pincer/terms.html` | Terms of Service |
| `pincer/robots.txt` | Allow all |
| `pincer/README.md` | Preview instructions + asset refresh |

**Product asset source (local):** `/Users/mariodian/Source/AI/pincer`  
If missing, clone `https://github.com/mariodian/pincer`.

---

### Task 1: Scaffold directory and brand assets

**Files:**
- Create: `pincer/assets/` (via copy)
- Create: `pincer/css/`, `pincer/js/` (empty dirs ok until later tasks)
- Create: `pincer/robots.txt`

**Interfaces:**
- Produces: `pincer/assets/icon-256.png`, five screenshot webps listed below
- Consumes: Pincer product repo files

- [ ] **Step 1: Create directories**

```bash
mkdir -p pincer/assets pincer/css pincer/js
```

- [ ] **Step 2: Copy brand assets from the product repo**

```bash
PINCER_SRC="${PINCER_SRC:-/Users/mariodian/Source/AI/pincer}"
# Prefer 512@2x scaled down if available; icon_256x256.png is fine for favicon/brand
cp "$PINCER_SRC/icons/icon.iconset/icon_256x256.png" pincer/assets/icon-256.png
cp "$PINCER_SRC/media/screenshots/dashboard-tray.webp" pincer/assets/
cp "$PINCER_SRC/media/screenshots/agents.webp" pincer/assets/
cp "$PINCER_SRC/media/screenshots/incidents.webp" pincer/assets/
cp "$PINCER_SRC/media/screenshots/reports.webp" pincer/assets/
cp "$PINCER_SRC/media/screenshots/light-mode.webp" pincer/assets/
```

If `PINCER_SRC` is missing, clone first:

```bash
git clone --depth 1 https://github.com/mariodian/pincer /tmp/pincer-src
PINCER_SRC=/tmp/pincer-src
# then re-run the cp commands
```

- [ ] **Step 3: Verify assets exist and are non-empty**

```bash
ls -la pincer/assets/
test -s pincer/assets/icon-256.png
test -s pincer/assets/dashboard-tray.webp
test -s pincer/assets/agents.webp
test -s pincer/assets/incidents.webp
test -s pincer/assets/reports.webp
test -s pincer/assets/light-mode.webp
file pincer/assets/icon-256.png pincer/assets/*.webp
```

Expected: six files; PNG and WebP types; sizes > 0.

- [ ] **Step 4: Write robots.txt**

Create `pincer/robots.txt`:

```
User-agent: *
Allow: /
```

- [ ] **Step 5: Commit**

```bash
git add pincer/assets pincer/robots.txt
git commit -m "chore(pincer): scaffold assets and robots.txt"
```

---

### Task 2: Design system CSS (tokens, base, atmosphere, layout primitives)

**Files:**
- Create: `pincer/css/styles.css` (first half — through layout primitives and buttons)

**Interfaces:**
- Produces: CSS custom properties and classes used by all HTML: `.ops-bg`, `.ops-grid`, `.container`, `.section`, `.section-label`, `.section-title`, `.section-lead`, `.section-header`, `.site-header`, `.nav`, `.brand`, `.btn`, `.btn-primary`, `.btn-ghost`, `.btn-sm`, `.btn-lg`, `.reveal`, `.reveal-delay-*`
- Consumes: none

- [ ] **Step 1: Write CSS foundation**

Create `pincer/css/styles.css` with at least the following (expand with full rules — do not leave stubs). Use **amber**, not purple.

```css
/* Pincer — warm amber ops product site */

:root {
  --bg-deep: #0a0908;
  --bg-base: #100e0c;
  --bg-elevated: #1a1612;
  --bg-card: rgba(32, 26, 20, 0.78);
  --bg-card-solid: #1c1713;
  --bg-glass: rgba(16, 14, 12, 0.78);

  --amber-50: #fff7ed;
  --amber-100: #ffedd5;
  --amber-200: #fed7aa;
  --amber-300: #fdba74;
  --amber-400: #fb923c;
  --amber-500: #f97316;
  --amber-600: #ea580c;
  --amber-700: #c2410c;
  --amber-glow: rgba(249, 115, 22, 0.4);
  --amber-glow-soft: rgba(234, 88, 12, 0.22);

  --text-primary: #f7f1e8;
  --text-secondary: #c4b8a8;
  --text-muted: #8a7f72;
  --text-inverse: #ffffff;

  --border-subtle: rgba(251, 146, 60, 0.12);
  --border-strong: rgba(251, 146, 60, 0.24);
  --border-focus: var(--amber-400);

  --status-ok: #3dd68c;
  --status-warn: #fbbf24;
  --status-bad: #f87171;

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 22px;
  --radius-xl: 32px;
  --radius-pill: 999px;

  --shadow-card: 0 18px 50px rgba(0, 0, 0, 0.5);
  --shadow-glow: 0 0 60px var(--amber-glow-soft);
  --shadow-btn: 0 8px 28px rgba(234, 88, 12, 0.4);

  --font-sans: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  --font-display: "Outfit", var(--font-sans);
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  --nav-h: 72px;
  --container: 1120px;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --header-blur: saturate(140%) blur(16px);
}
```

Also implement in this file (same task):

1. Reset / base (`*`, `html`, `body`, `img`, `a`, `:focus-visible`)
2. Atmosphere:
   - `.ops-bg` — fixed warm radial gradients (amber, not purple)
   - `.ops-grid` — fixed faint technical grid via repeating-linear-gradient, low opacity
   - **No** `.stars` / starfield classes
3. Layout: `.container`, `.section`, `.section-sm`, `.section-label` (amber accent bar), `.section-title`, `.section-lead`, `.section-header` (+ `.centered`)
4. Header/nav: sticky `.site-header`, `.scrolled` glass, `.nav`, `.brand`, `.brand-mark` (amber glow shadow), `.nav-links`, `.nav-cta`, `.nav-toggle`, mobile open state `.site-header.open`
5. Buttons: `.btn`, `.btn-primary` (amber gradient), `.btn-ghost`, `.btn-sm`, `.btn-lg`
6. Reveal: `.reveal`, `.reveal.visible`, `.reveal-delay-1` … `4`, and `@media (prefers-reduced-motion: reduce)` that disables animations and shows reveals immediately

Use Starshelf’s structural patterns from `starshelf/css/styles.css` for spacing and responsive breakpoints, but recolor everything amber/warm charcoal. Do **not** copy purple variables or star drift keyframes.

- [ ] **Step 2: Smoke-check CSS parses**

```bash
# quick sanity: file exists and has amber tokens, no purple brand tokens
test -s pincer/css/styles.css
grep -q 'amber-500' pincer/css/styles.css
grep -q 'ops-bg' pincer/css/styles.css
! grep -E 'purple-500|--purple' pincer/css/styles.css
```

Expected: greps pass (no `--purple` tokens in Pincer CSS).

- [ ] **Step 3: Commit**

```bash
git add pincer/css/styles.css
git commit -m "feat(pincer): add amber ops design system CSS foundation"
```

---

### Task 3: CSS for page sections (hero through footer + legal)

**Files:**
- Modify: `pincer/css/styles.css` (append section styles)

**Interfaces:**
- Produces classes used by `index.html` / legal pages:
  - Hero: `.hero`, `.hero-orb`, `.hero-badge`, `.hero-badge-dot`, `.hero-layout` (optional split), `.hero-lead`, `.hero-actions`, `.hero-meta`, `.hero-visual` / product frame
  - Problem: `.problem-grid`, `.problem-card`, `.problem-icon`, `.highlight`
  - Features: `.features-grid` or `.bento`, `.feature-card`, `.feature-icon`
  - Agents: `.agent-chips`, `.agent-chip`
  - Steps: `.steps`, `.step`, `.step-num`
  - Screenshots: `.shots-stage`, `.shot-main`, `.shots-rail`, `.shot-thumb`, `.shot-thumb.active`, `.shot-caption`
  - Daemon: `.daemon-band` (or card)
  - Install: `.install-band`, `.install-actions`, `.code-block`, `.code-block pre`, `.copy-btn`, `.install-tip`
  - Footer: `.site-footer`, `.footer-grid`, `.footer-brand`, `.footer-col`, `.footer-bottom`
  - Legal: `.legal-hero`, `.legal-meta`, `.legal-content`, `.legal-note`
- Consumes: tokens from Task 2

- [ ] **Step 1: Append full section CSS**

Implement polished layouts for every class listed above. Requirements:

- **Hero:** center or split layout with optional product frame around a screenshot; amber orb glow
- **Feature grid:** 3-column desktop → 1-column mobile; cards with icon wells tinted amber/status
- **Agent chips:** pill chips in a wrapping flex row
- **Steps:** 3-column numbered steps
- **Shots:** main image with rounded frame + shadow; thumbnail rail; active thumb border amber
- **Daemon band:** elevated card with subtle border, not identical to install band
- **Install:** code block with mono font, dark elevated background, copy button top-right; platform button row
- **Footer:** 3-column grid collapsing on mobile
- **Legal:** readable max-width prose, `h2`/`h3` hierarchy, list spacing
- **Responsive:** collapse nav to toggle ≤900px; stacks for grids ≤720px

Reference structure (not colors) from `starshelf/css/styles.css` hero/features/steps/shots/install/footer/legal sections.

- [ ] **Step 2: Verify section selectors exist**

```bash
for s in hero features-grid agent-chips steps shots-stage daemon-band install-band code-block copy-btn site-footer legal-content; do
  grep -q "\\.$s" pincer/css/styles.css || { echo "missing .$s"; exit 1; }
done
echo "all section selectors present"
```

- [ ] **Step 3: Commit**

```bash
git add pincer/css/styles.css
git commit -m "feat(pincer): add section styles for landing and legal pages"
```

---

### Task 4: JavaScript interactions

**Files:**
- Create: `pincer/js/main.js`

**Interfaces:**
- Consumes DOM: `.site-header`, `.nav-toggle`, `.nav-links a[href^="#"]`, `.reveal`, `[data-shot-main]`, `[data-shot-caption]`, `[data-shot-thumb]`, `[data-year]`, `[data-copy]` (copy buttons)
- Produces: class toggles `scrolled`, `open`, `visible`, `active`; clipboard write for brew commands

- [ ] **Step 1: Implement main.js**

Create `pincer/js/main.js` as an IIFE with these behaviors:

```javascript
(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  // 1) Sticky header glass
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // 2) Mobile menu open/close + outside click + link click closes
  // (mirror starshelf/js/main.js)

  // 3) IntersectionObserver scroll-reveal on .reveal
  // fallback: add .visible if no IO

  // 4) Screenshot gallery: thumbs set data-src/data-alt/data-caption on main + caption
  // aria-pressed + .active on active thumb

  // 5) Footer year: [data-year]

  // 6) Copy buttons: [data-copy] attribute holds selector or raw text
  // Prefer: button[data-copy-target="#brew-install"] copies textContent of target
  // On success, briefly set button text/aria to "Copied" then restore
  // Use navigator.clipboard.writeText with try/catch; on failure, select text in pre
})();
```

Full implementation must be complete (not comments only). Use Starshelf’s `starshelf/js/main.js` as the base for items 1–5; add copy logic for 6.

Copy button HTML contract (for Task 5):

```html
<button type="button" class="copy-btn" data-copy-target="#brew-install" aria-label="Copy install commands">
  Copy
</button>
<pre id="brew-install"><code>brew tap mariodian/tap
brew install --cask pincer</code></pre>
```

- [ ] **Step 2: Syntax-check JS**

```bash
node --check pincer/js/main.js
```

Expected: exit 0, no output.

- [ ] **Step 3: Commit**

```bash
git add pincer/js/main.js
git commit -m "feat(pincer): add nav, reveal, gallery, and copy interactions"
```

---

### Task 5: Landing page HTML (`index.html`)

**Files:**
- Create: `pincer/index.html`

**Interfaces:**
- Consumes: `css/styles.css`, `js/main.js`, assets from Task 1, CSS classes from Tasks 2–3, JS hooks from Task 4
- Produces: complete marketing landing at `pincer/index.html`

- [ ] **Step 1: Write complete index.html**

Create a full document with:

**Head**
- charset, viewport, title: `Pincer — Desktop monitoring for local AI agents`
- meta description, theme-color `#0a0908`
- OG/Twitter tags, favicon → `assets/icon-256.png`
- Google Fonts: Outfit (500–700) + Inter (400–700)
- stylesheet `css/styles.css`

**Body structure (in order)**
1. Atmosphere: `<div class="ops-bg">`, `<div class="ops-grid">` (aria-hidden)
2. Header/nav: brand icon+Pincer; links Features, How it works, Screenshots, Install; CTAs Install + GitHub; hamburger
3. **Hero**
   - Badge: `macOS · Windows · Linux · System tray` with status dot
   - H1: e.g. `Agent health,` + gradient span `in your tray`
   - Lead: live status, history, and charts without leaving your workflow
   - Actions: primary Install (`#install`), ghost GitHub (`https://github.com/mariodian/pincer`)
   - Meta: Local SQLite · MIT open source · OpenClaw · Hermes · OpenCode & more
   - Optional: framed `dashboard-tray.webp` as hero visual
4. **Problem** (`#why`): two cards — context-switch tax vs tray-first Pincer
5. **Features** (`#features`): six feature cards (tray, dashboards, incidents, reports, controls, local/cross-platform)
6. **Agents** (`#agents`): chips — OpenClaw, OpenCrabs, Hermes, OpenCode, Custom HTTP
7. **How it works** (`#how-it-works`): three steps
8. **Screenshots** (`#screenshots`): gallery with five thumbs:
   - dashboard-tray, agents, incidents, reports, light-mode
   - Use `data-shot-main`, `data-shot-thumb`, `data-src`, `data-alt`, `data-caption`, `data-shot-caption`
9. **Daemon** (`#daemon`): `pincerd` callout, macOS arm64 + Linux x86_64, link to `https://github.com/mariodian/pincer#daemon` or daemon README
10. **Install** (`#install`):
    - Homebrew code block + copy button (`data-copy-target="#brew-install"`)
    - Buttons: Download for macOS / Windows / Linux → each `https://github.com/mariodian/pincer/releases/latest`
    - All releases → `https://github.com/mariodian/pincer/releases`
    - View source → repo
    - macOS quarantine tip with `xattr` command
11. Footer: brand, product links, legal links, © Mario Dian, @mariodian, `data-year`
12. `<script src="js/main.js" defer></script>`

Copy rules: active voice, concrete, short. No purple references. All external links `target="_blank" rel="noopener noreferrer"`.

- [ ] **Step 2: Validate structure**

```bash
# required anchors and assets referenced
grep -E 'id="(features|how-it-works|screenshots|install|daemon)"' pincer/index.html
grep -q 'assets/icon-256.png' pincer/index.html
grep -q 'data-copy-target="#brew-install"' pincer/index.html
grep -c 'releases/latest' pincer/index.html   # expect >= 3
grep -q 'ops-bg' pincer/index.html
! grep -qi 'starshelf\|purple star' pincer/index.html
```

- [ ] **Step 3: Local preview smoke**

```bash
cd pincer && python3 -m http.server 4174
# In another shell or after starting briefly:
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:4174/index.html
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:4174/assets/icon-256.png
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:4174/css/styles.css
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:4174/js/main.js
# stop the server when done
```

Expected: HTTP 200 for all four.

- [ ] **Step 4: Commit**

```bash
git add pincer/index.html
git commit -m "feat(pincer): add story-led landing page"
```

---

### Task 6: Privacy Policy page

**Files:**
- Create: `pincer/privacy.html`

**Interfaces:**
- Consumes: shared CSS/JS/assets; same header/footer chrome as landing (legal nav variant)
- Produces: desktop-app privacy policy

- [ ] **Step 1: Write privacy.html**

Structure like `starshelf/privacy.html` (scrolled header, legal-hero, legal-content) but content for **Pincer desktop app**:

Sections to include (numbered):

1. **Who we are** — open-source tray monitoring for local AI agents; contact via [GitHub Issues](https://github.com/mariodian/pincer/issues) and [@mariodian](https://x.com/mariodian)
2. **Summary** — monitoring data on device (SQLite); no Pincer cloud that receives agent health payloads by default; site static, no trackers
3. **Information the App stores** — agent config, health check results/history, settings (polling, retention, notifications, etc.) in local SQLite / app data directory on the user’s machine
4. **Network activity** — App contacts user-configured agent/health endpoints; may check for updates from GitHub releases or update channels the user enables; daemon (`pincerd`) is user-hosted with user-controlled secret
5. **Daemon** — optional; runs on user’s machine or server they control; auth secret they set; Pincer does not operate a multi-tenant daemon service for them
6. **This website** — static product info; no forms collecting PII; host may log IP/UA
7. **Children’s privacy**
8. **Retention and deletion** — user controls local data (uninstall, delete app data); no central account DB
9. **Security** — local-first; user protects device and secrets
10. **International users**
11. **Your choices and rights**
12. **Open source** — link `https://github.com/mariodian/pincer`
13. **Changes**
14. **Contact** — GitHub Issues + X only (no mailto privacy mailbox)

Effective / last updated: **August 4, 2026** (or implementation date if different).

Header nav: Features / Install / Privacy (current) / Terms. CTA → `index.html#install`.

Footer mirrors landing with Pincer branding.

- [ ] **Step 2: Verify key claims present**

```bash
grep -qi 'SQLite' pincer/privacy.html
grep -qi 'pincerd\|daemon' pincer/privacy.html
grep -q 'github.com/mariodian/pincer/issues' pincer/privacy.html
grep -qi 'no.*analytics\|no analytics\|no third-party analytics' pincer/privacy.html
! grep -qi 'starshelf\|browser extension\|API key.*browser' pincer/privacy.html
```

- [ ] **Step 3: Commit**

```bash
git add pincer/privacy.html
git commit -m "feat(pincer): add privacy policy for local desktop app"
```

---

### Task 7: Terms of Service page

**Files:**
- Create: `pincer/terms.html`

**Interfaces:**
- Consumes: shared chrome/CSS/JS
- Produces: terms for desktop app + site

- [ ] **Step 1: Write terms.html**

Mirror Starshelf legal chrome. Content tailored to Pincer:

1. **Acceptance** — using App or Site means accepting Terms
2. **The software** — MIT-licensed desktop app + optional daemon; source on GitHub
3. **License** — MIT; link `https://github.com/mariodian/pincer/blob/main/LICENSE`
4. **Your responsibilities** — lawful use; you configure agents/endpoints; you secure secrets; you comply with third-party terms for agents you monitor
5. **No warranty** — as-is; no guarantee of agent uptime, correct health detection, or fitness for purpose
6. **Limitation of liability** — standard open-source limitation (to extent law allows)
7. **The Site** — informational; may change without notice
8. **Open source third parties** — dependencies under their licenses
9. **Changes to Terms**
10. **Contact** — GitHub Issues + @mariodian

Effective date: August 4, 2026 (or implementation date).

- [ ] **Step 2: Verify**

```bash
grep -qi 'MIT' pincer/terms.html
grep -q 'github.com/mariodian/pincer' pincer/terms.html
grep -qi 'as is\|as-is' pincer/terms.html
! grep -qi 'starshelf\|Chrome Web Store\|Firefox' pincer/terms.html
```

- [ ] **Step 3: Commit**

```bash
git add pincer/terms.html
git commit -m "feat(pincer): add terms of service"
```

---

### Task 8: README and final verification

**Files:**
- Create: `pincer/README.md`

**Interfaces:**
- Produces: maintainer docs for preview and asset refresh
- Consumes: final tree under `pincer/`

- [ ] **Step 1: Write README.md**

```markdown
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
```

(Fix nested fence if needed — README should be valid markdown with a single fenced bash block for preview and another for assets.)

- [ ] **Step 2: Full tree check**

```bash
find pincer -type f | sort
# required:
# pincer/index.html privacy.html terms.html README.md robots.txt
# pincer/css/styles.css pincer/js/main.js
# pincer/assets/icon-256.png + 5 webps
```

- [ ] **Step 3: Cross-page link and theme check**

```bash
# relative legal links
grep -q 'privacy.html' pincer/index.html
grep -q 'terms.html' pincer/index.html
grep -q 'index.html' pincer/privacy.html
grep -q 'index.html' pincer/terms.html

# amber ops, not purple stars
grep -q 'ops-bg' pincer/index.html
! grep -R --include='*.css' --include='*.html' -E 'purple-500|cosmic-bg|class="stars"' pincer/

# install CTAs
grep -q 'brew install --cask pincer' pincer/index.html
grep -c 'releases/latest' pincer/index.html
```

- [ ] **Step 4: Serve and manual checklist**

```bash
cd pincer && python3 -m http.server 4174
```

Open `http://127.0.0.1:4174/` and verify:

- [ ] Amber/warm dark theme; no purple starfield
- [ ] Sticky header gains glass on scroll
- [ ] Mobile width: hamburger opens/closes
- [ ] Screenshot thumbs change main image + caption
- [ ] Copy button copies brew commands
- [ ] Privacy and Terms load and match brand
- [ ] All images load (no broken icons/screenshots)
- [ ] `prefers-reduced-motion`: no jarring animation (spot-check if easy)

- [ ] **Step 5: Commit**

```bash
git add pincer/README.md
git commit -m "docs(pincer): add website README and finish product site"
```

---

## Spec coverage checklist (self-review)

| Spec requirement | Task |
|------------------|------|
| `pincer/` parallel to `starshelf/` | 1–8 |
| Warm amber ops, not purple reskin | 2, 3, 5, 8 |
| Story-led sections (hero→problem→features→agents→steps→shots→daemon→install) | 5 |
| Homebrew + copy | 4, 5 |
| Platform downloads → releases/latest | 5 |
| Daemon callout | 5 |
| Screenshots gallery (5 shots) | 1, 5 |
| Privacy + terms local desktop | 6, 7 |
| Contact GitHub Issues + X | 6, 7 |
| Relative paths / `/pincer/` | all HTML |
| No analytics | all pages |
| Reduced motion | 2 |
| README + asset refresh | 8 |
| robots.txt | 1 |

## Out of scope (do not implement)

- Framework/SSG, analytics, changelog page, i18n, hard-coded versioned asset download URLs, changes to `starshelf/`
