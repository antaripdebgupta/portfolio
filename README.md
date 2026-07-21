# antarip.dev

My personal portfolio website. I’m a frontend developer focused on accessibility engineering, performance, and building production-quality web applications.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss)

---

## Overview

This repository contains the source code for my portfolio website, [antarip.dev](https://github.com/antaripdebgupta). I built it to showcase the projects I work on, my open source contributions, and the way I approach frontend engineering and accessibility. The site includes a live open source contributions section powered by the GitHub GraphQL API, along with an accessibility toolbar that lets visitors adjust preferences such as font size, contrast, motion, line spacing, and focus indicators while browsing the site.

---

## Key Features

- **Live GitHub contributions** — merged pull requests fetched via the GitHub GraphQL API, filtered to external repos, categorized by type, and cached with 1-hour ISR revalidation
- **Accessibility toolbar** — a floating panel with runtime controls for font size, high contrast, reduce motion, readable font, underline links, line spacing, and enhanced focus indicators; settings are applied via CSS custom properties and class toggles on `<html>`
- **Animated hero scan log** — a typewriter-style terminal readout that respects `prefers-reduced-motion` and the toolbar's reduce-motion setting
- **Projects page** — filterable by project type (`web`, `mobile`, `extension`, `backend`, `library`) with `aria-pressed` toggle buttons
- **Floating dock** — physics-based magnification dock for social links, built with Framer Motion spring animations
- **Skeleton loading states** — the projects page ships a full skeleton UI via Next.js `loading.tsx`
- **Sticky, blurred header** — responsive navigation with a mobile drawer, `aria-expanded`/`aria-controls` wiring, and `backdrop-filter` support detection

---

## Accessibility

**Skip navigation** — A visually hidden skip link is rendered at the top of every page and becomes visible on focus, allowing keyboard users to bypass the header and jump directly to `#main`.

**Focus management** — The accessibility toolbar panel traps focus while open (Tab/Shift+Tab cycle within the panel) and returns focus to the trigger button on close. Focus is moved into the panel on open. All interactive elements use `:focus-visible` with a 2px accent-colored outline.

**ARIA** — The toolbar trigger uses `aria-expanded` and `aria-controls`. The panel uses `role="dialog"`, `aria-label`, and `aria-modal="true"`. Toggle switches use `role="switch"` with `aria-checked`. Filter buttons on the projects page use `aria-pressed`. The mobile nav button uses `aria-expanded` and `aria-controls`. Decorative icons are marked `aria-hidden="true"` throughout.

**Reduced motion** — Two independent layers: the CSS `@media (prefers-reduced-motion: reduce)` rule collapses all animations at the OS level; the `MotionProvider` passes `reducedMotion="user"` to Framer Motion; and the accessibility toolbar exposes an app-level reduce-motion toggle that applies `.a11y-reduce-motion` to `<html>`, independent of OS settings. The `ScanLog` typewriter animation also reads from the accessibility context and renders all lines instantly when motion is reduced.

**Runtime accessibility toolbar** — Users can adjust font size (small / default / large / x-large), enable high contrast mode, switch to a readable font (Arial/Courier New), underline all links, change line spacing (normal / relaxed / loose), and enable enhanced focus indicators — all without a page reload. Settings are applied via CSS custom properties and class toggles on `<html>`.

**Semantic HTML** — Sections use `<section>` with `aria-labelledby`, navigation uses `<nav aria-label>`, lists use `<ul>/<li>`, and headings follow a logical hierarchy. `<article>` is used for self-contained content cards.

**Color contrast** — The design system uses a defined set of CSS custom properties (`--ink`, `--muted`, `--accent`, `--bg`) targeting AA+ contrast ratios. High contrast mode overrides these tokens with a black/white/green palette.

---

## Performance and SEO

- **ISR caching** — The GitHub API route sets `revalidate = 3600`, caching responses for one hour and revalidating in the background without blocking requests.
- **Font optimization** — JetBrains Mono and IBM Plex Sans are loaded via `next/font/google` with `display: swap`, eliminating render-blocking font requests.
- **Hover detection** — `ProjectCard` and `ContributionCard` check `window.matchMedia("(hover: hover)")` before applying hover animations, avoiding unnecessary motion on touch devices.
- **Viewport-triggered animations** — The `Section` component uses `whileInView` with `once: true`, so animations fire once as sections enter the viewport rather than on every scroll event.
- **Request timeout** — The GitHub GraphQL client enforces an 8-second `AbortController` timeout to prevent hanging requests from blocking page renders.
- **Static metadata** — Page title and description are defined via Next.js `Metadata` in `layout.tsx`.
- **Skeleton loading** — The projects page provides a `loading.tsx` skeleton that renders immediately during navigation, preventing layout shift.

---

## Design and UX

The visual design uses a minimal, editorial aesthetic with a warm off-white background (`#f7f7f5`), a near-black ink color (`#14181b`), and a single green accent (`#009933`). Typography is split between JetBrains Mono for UI labels, headings, and code-adjacent elements, and IBM Plex Sans for body text.

Each home section is full-viewport-height, creating a deliberate scroll rhythm. The hero section features a terminal-style scan log that types out in real time, communicating the accessibility focus of the work without a wall of text.

The floating dock uses Framer Motion spring physics to magnify icons on hover, providing a tactile interaction that degrades gracefully on touch devices and under reduced motion.

---

## Local Development

### Prerequisites

- Node.js 20+
- A GitHub Personal Access Token with `read:user` and `repo` scopes (for the open source contributions section)

### Installation

```bash
git clone https://github.com/antaripdebgupta/portfolio.git
cd portfolio
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
GITHUB_TOKEN=your_github_personal_access_token_here
```

The token is validated at runtime using Zod. The app will throw at startup if `GITHUB_TOKEN` is missing outside of build time. During `next build`, the missing token is tolerated and the contributions section will render an error state.

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run start
```

### Other Commands

```bash
npm run lint          # ESLint
npm run format        # Prettier (write)
npm test              # Vitest (single run)
npm run test:watch    # Vitest (watch mode)
```

---

## Testing

Tests are written with Vitest and Testing Library, running in a jsdom environment.

- `AccessibilityToolbar` — verifies the panel opens, controls render, toggle state updates correctly, DOM class mutations occur, and reset restores defaults
- `ProjectCard` — verifies all project data renders correctly
- `GitHub integration` — tests the GraphQL client's filtering logic, error handling, and the API route's response shape
- `cn()` utility — verifies Tailwind class conflict resolution

```bash
npm test
```

## License

MIT
