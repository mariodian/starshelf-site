# Pincer product website — design

**Date:** 2026-08-04  
**Status:** Approved  
**URL:** https://apps.mariodian.com/pincer/  
**Repo product:** https://github.com/mariodian/pincer  
**Reference site:** `starshelf/` in this monorepo (structure and polish bar, not visual clone)

## Goal

Ship a beautiful static product site for **Pincer** — desktop monitoring for local AI agents. Match Starshelf’s quality and monorepo placement, but use a **distinct warm amber ops** redesign suited to a tray-first monitoring app.

## Decisions (locked)

| Topic | Choice |
|-------|--------|
| Visual identity | Distinct redesign (not Starshelf purple cosmic) |
| Mood | Warm amber ops |
| Structure | Story-led monitoring site |
| Install CTAs | Homebrew primary + multi-platform GitHub release downloads |
| Legal | `privacy.html` + `terms.html` |
| Stack | Static HTML / CSS / JS, no build step |

## Product facts

- **What:** System-tray app for agent health, status history, charts, incidents, and reports
- **Platforms:** macOS, Windows, Linux
- **Agents:** OpenClaw, OpenCrabs, Hermes, OpenCode, custom HTTP health endpoints
- **Data:** Local SQLite; no Pincer cloud backend that collects agent payloads by default
- **Daemon:** `pincerd` (macOS arm64, Linux x86_64) for collection when the desktop app is closed
- **License:** MIT
- **Install (Homebrew):**
  ```bash
  brew tap mariodian/tap
  brew install --cask pincer
  ```
- **Releases:** https://github.com/mariodian/pincer/releases (v0.4.2 at design time)
  - macOS arm64: `stable-macos-arm64-Pincer.dmg`
  - Windows x64: `stable-win-x64-Pincer-Setup.zip`
  - Linux x64: `stable-linux-x64-Pincer-Setup.tar.gz`

## Architecture

### Placement

```
mariodian-apps/
  CNAME                 # apps.mariodian.com
  starshelf/            # existing
  pincer/               # new
    index.html
    privacy.html
    terms.html
    README.md
    robots.txt
    css/styles.css
    js/main.js
    assets/
```

Relative paths only. Site must work at `/pincer/` and when opened from the folder root.

### Runtime

- No framework, bundler, or package manager
- No analytics, cookies, or third-party trackers
- Fonts: Google Fonts (Inter + one display face)
- Interaction: sticky header, mobile nav, scroll-reveal, screenshot gallery, footer year

### Brand assets (copy from product repo)

Source: `/Users/mariodian/Source/AI/pincer` (or clone of `mariodian/pincer`)

| Asset | Source |
|-------|--------|
| `icon-256.png` | `icons/icon.iconset/icon_256x256.png` (or `@2x` scaled as needed) |
| `dashboard-tray.webp` | `media/screenshots/dashboard-tray.webp` |
| `agents.webp` | `media/screenshots/agents.webp` |
| `incidents.webp` | `media/screenshots/incidents.webp` |
| `reports.webp` | `media/screenshots/reports.webp` |
| `light-mode.webp` | `media/screenshots/light-mode.webp` |

Optional: include thumbs if useful for gallery performance; full webps are acceptable for v1.

## Visual system

### Mood

Dark, warm, ops-oriented. Soft amber glows and glass panels. Feels like a polished monitoring tool, not a starfield or terminal green-on-black.

### Color (guidance)

- Background deep: near-black warm charcoal (`#0a0908` range)
- Elevated surfaces: warm dark panels
- Brand amber/orange from claw icon (`#f97316`–`#ea580c`)
- Text: soft cream primary; warm muted secondary
- Borders: low-opacity warm amber
- Status accents (sparing): healthy green, warn amber, incident red

### Typography

- **Display:** Outfit (headlines)
- **Body:** Inter
- **Mono:** system ui-monospace (install commands)

### Atmosphere

- Fixed radial amber washes + soft vignette
- Faint technical grid (low opacity), not Starshelf star particles
- Cards: glass or solid elevated with warm border and soft shadow
- Hero may use a product “frame” around the main tray screenshot

### Motion

- Respect `prefers-reduced-motion`
- Scroll-reveal for sections
- Subtle hover on cards and buttons
- No heavy parallax or continuous distracting animation

## Information architecture

### Landing (`index.html`)

1. **Header** — brand, anchors (Features, How it works, Screenshots, Install), CTAs (Homebrew / GitHub)
2. **Hero** — badge (platforms · tray), headline, lead, CTAs, trust meta (local SQLite, MIT, agent support)
3. **Problem** — multi-agent context-switch tax vs tray-first answer
4. **Features** — bento/grid of six capabilities:
   - Tray-first live status
   - Dashboards & trends
   - Incidents & heatmap
   - Reports + HTML export
   - Flexible controls (polling, retention, notifications, startup, auto-update)
   - Local-first cross-platform
5. **Agent support** — chip row of supported agents + custom HTTP
6. **How it works** — three steps: install → add agents → watch tray (mention daemon)
7. **Screenshots** — main image + thumbnail rail + caption (same interaction model as Starshelf)
8. **Daemon** — `pincerd` callout, platforms, link to daemon install on GitHub
9. **Install** — Homebrew code block; platform download buttons to latest release assets; macOS quarantine tip; View source
10. **Footer** — brand blurb, product links, legal, © Mario Dian, @mariodian

### Copy direction (not final word-for-word)

- Hero idea: *Agent health in your tray* / stop switching terminals and tabs to check local agents
- Problem: many agents → many tabs; Pincer stays in the tray
- Keep voice concrete and short; active voice; no filler

### Privacy (`privacy.html`)

Tailored to a **local desktop app**:

- Who we are / contact
- Summary: monitoring data stays on device (SQLite); site is static; no ad trackers
- What the app stores locally (agent config, check results, settings)
- Network: user-configured agent endpoints; optional auto-update / release checks as applicable
- Daemon: user-hosted; user-controlled secret
- No Pincer backend that receives agent health payloads by default
- Third parties: only those the user configures or OS/update channels
- Contact: GitHub issues on [mariodian/pincer](https://github.com/mariodian/pincer/issues) and [@mariodian](https://x.com/mariodian) on X. No separate privacy mailbox required for v1.

### Terms (`terms.html`)

- Acceptance, MIT software “as is”
- Local install responsibility
- No warranty for uptime of user’s agents
- Site use terms
- Same contact as privacy

## Install CTAs (concrete)

**Primary — Homebrew**

```bash
brew tap mariodian/tap
brew install --cask pincer
```

Include a copy-to-clipboard control on the code block.

**Secondary — platform downloads (locked)**

All platform buttons link to the latest release page (version-agnostic; no hard-coded asset URLs):

| Button | URL |
|--------|-----|
| Download for macOS | https://github.com/mariodian/pincer/releases/latest |
| Download for Windows | https://github.com/mariodian/pincer/releases/latest |
| Download for Linux | https://github.com/mariodian/pincer/releases/latest |
| All releases | https://github.com/mariodian/pincer/releases |
| GitHub | https://github.com/mariodian/pincer |

Labels differ so visitors know which binary to pick on the release page.

**macOS quarantine tip**

```bash
xattr -r -d com.apple.quarantine /Applications/Pincer.app
```

## JavaScript responsibilities

Mirror Starshelf’s `main.js` scope:

- Header scrolled class
- Mobile menu open/close
- IntersectionObserver reveals
- Screenshot thumb → main + caption
- `[data-year]` footer year
- Optional: copy-to-clipboard for brew commands

## Accessibility

- Semantic landmarks, labeled nav
- Focus-visible styles
- Meaningful image alts for screenshots
- `aria-pressed` on gallery thumbs
- Sufficient contrast on amber-on-dark

## Out of scope

- Framework / SSG / CMS
- Analytics or marketing pixels
- Changelog or docs microsite
- i18n
- App Store / Microsoft Store pages
- Live API for latest version resolution

## Success criteria

1. `pincer/` is a self-contained static site parallel to `starshelf/`
2. Design is clearly **not** a purple reskin; warm amber ops identity is consistent
3. Visitor can install via Homebrew or find platform downloads in one screen
4. Privacy and terms cover local desktop + optional daemon
5. Screenshots and icon load from local `assets/`
6. Works at `https://apps.mariodian.com/pincer/` with relative links
7. Reduced-motion and mobile nav behave correctly

## Implementation notes

- Start from Starshelf’s **behavioral patterns** (nav, reveal, gallery), rewrite CSS tokens and decorative backgrounds for amber ops
- Prefer feature bento and daemon section as differentiators vs Starshelf’s extension-oriented layout
- Keep CSS in one file unless it grows past maintainability (~1–1.5k lines is fine)
- README for `pincer/` documents local preview and asset refresh commands (like Starshelf)

## Approval

Approved in design conversation 2026-08-04:

- Distinct redesign, warm amber ops
- Story-led structure (Approach A)
- Homebrew + multi-platform downloads
- Privacy + terms pages
- Architecture, visual system, and content IA accepted
