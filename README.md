# Orbita: Scroll Experience

A scroll-driven landing page built with Next.js (App Router), React, Tailwind CSS and GSAP ScrollTrigger. The hero object, a CSS-built gyroscope, is pinned and transformed directly by scroll position.

The motion language was inspired by premium scroll-based sites. All visuals, code and copy here are original.

## Overview

- Cinematic load sequence: background, headline letters, stats and hero object enter in a staggered, controlled timeline.
- Pinned hero: scale, translation, rotation and parallax are scrubbed to scroll progress, not time.
- Word-by-word scroll reveal, staggered feature cards, and a pinned horizontal showcase.
- Fully static export, deployable to GitHub Pages.

## Tech stack

Next.js 14 (App Router, JavaScript) / React 18 / Tailwind CSS 3 / GSAP + ScrollTrigger / Sora variable font (self-hosted via `@fontsource-variable/sora`).

## Project structure

```
app/
  layout.js            Metadata, font, motion-flag script
  page.js              Composes sections
  globals.css          Tailwind layers, orb + artwork CSS
  icon.svg             Favicon
components/
  Navbar.jsx           Fixed nav + animated mobile menu
  Hero.jsx             Pinned hero, headline, intro + scroll wiring
  ScrollVisual.jsx     Layered orb, glow, floor, particles, pointer lean
  Stats.jsx            Stats row (data-driven)
  AboutSection.jsx     Scroll-scrubbed word reveal
  FeatureSection.jsx   Feature cards
  ShowcaseSection.jsx  Pinned horizontal scroll
  CtaSection.jsx       Final call to action
  Footer.jsx
lib/
  animations.js        GSAP setup, intro timeline, hero scroll timeline
  content.js           All copy, stats, features, panels, particles
  useIsoLayoutEffect.js
public/                images/, models/, textures/ reserved for assets
.github/workflows/deploy.yml
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
```

The static site is written to `out/`. Preview it with `npm start` (runs `npx serve out`).

## Customising content

Edit `lib/content.js`. Stats, features, showcase panels, nav links and the headline are all plain data. The stats are placeholder figures; replace them with real, verifiable numbers before publishing. The CTA button points to `mailto:hello@example.com`; change `cta.href`.

## Deployment (GitHub Pages)

1. Push the project to a GitHub repository (see commands below).
2. In the repository, open **Settings > Pages**.
3. Under **Build and deployment > Source**, choose **GitHub Actions**.
4. Push to `main`. The workflow in `.github/workflows/deploy.yml` installs, builds and deploys `out/`.

The workflow sets `NEXT_PUBLIC_BASE_PATH` automatically: `/<repo-name>` for project sites, empty for `<name>.github.io` repositories. For a custom domain, set the variable to an empty string in the workflow. To build locally for a project site:

```bash
NEXT_PUBLIC_BASE_PATH=/your-repo npm run build
```

### Git commands

```bash
git init
git add .
git commit -m "Initial premium scroll experience"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## Animation architecture

- **GSAP + ScrollTrigger** are registered once in `lib/animations.js`, which every component imports from.
- **Intro** (`playIntro`) is a single timeline using `power3.out` and `expo.out`. It animates letters, stat items and a wrapper around the visual, which are different elements from those the scroll timeline moves, so the two never fight over a property.
- **Scrub** (`scrub: 1`): the hero timeline catches up to the scroll position over about a second, so fast flicks stay fluid with no jumps. Tweens use `ease: "none"` so motion tracks scroll one-to-one.
- **Pin**: the hero pins for `+=150%` of the viewport on desktop (`+=90%` on mobile), then releases into the next section. The showcase pins for exactly the width of its horizontal track.
- **Parallax**: glow, object, floor and particles travel different distances in the same timeline. Showcase artwork drifts against its track using `containerAnimation`.
- **Responsive**: `gsap.matchMedia()` builds separate desktop and mobile timelines with different scale, travel and pin length. The intro is outside matchMedia so it is not replayed on breakpoint changes.
- **Cleanup**: every effect owns a `gsap.matchMedia()` or `gsap.context()` and reverts it on unmount, so there are no duplicate ScrollTriggers (including under React Strict Mode).

## Performance

- Only `transform` and `opacity` are animated. No width, height, top or left.
- ScrollTrigger handles scroll sync; the only per-update work is a numeric readout that writes to the DOM when the integer value changes.
- `will-change: transform` is limited to the handful of large animated layers.
- The visual is pure CSS and inline SVG: no image requests, no WebGL.
- The pointer-lean listeners attach to the hero element only, use `gsap.quickTo`, and only exist on fine-pointer devices.
- Fonts are self-hosted; the intro waits for them (capped at 900 ms) so letter metrics are final before animating.

## Responsive design

- Hero visual scales with `min(64vw, 56svh)`; headline uses `clamp()`.
- On screens below 768px the hero travel distance and pin length are reduced, and horizontal movement is minimal.
- The showcase becomes a native swipeable scroll-snap row on mobile, with no pinning.
- The mobile menu is a full-screen overlay with Escape-to-close and body scroll lock.
- `overflow-x: clip` on the body, plus contained overflow on the showcase, prevents horizontal page scroll.
- `ScrollTrigger.config({ ignoreMobileResize: true })` stops address-bar resizes from causing jumps.

## Accessibility

- Semantic landmarks, one `h1`, ordered headings; the animated headline keeps a full `aria-label` while its letter spans are hidden from assistive tech.
- Visible focus rings, keyboard-operable menu and buttons, 44px mobile tap targets.
- **Reduced motion**: an inline script only adds the `motion` class when `prefers-reduced-motion` is not `reduce`. Without it, no content is hidden, GSAP animations are not created (all setups sit behind `no-preference` media queries), the hero is not pinned, the showcase is a native scroll row, and CSS transitions are effectively disabled.
