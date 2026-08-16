# quietloopdigital.com

The website for **Quiet Loop Digital** — a one-person studio doing UI/UX design,
graphic design, web development and DevOps for startups. Ahmedabad, India.

Live at [quietloopdigital.com](https://quietloopdigital.com).

---

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 — tokens in `src/app/globals.css` |
| Fonts | Jost (headings) + Red Hat Text (body), self-hosted via `next/font` |
| Hosting | Vercel |
| DNS / TLS | Cloudflare |

No animation library. Scroll reveals use a ~1 KB `IntersectionObserver`
component; everything else is CSS keyframes. All of it is disabled under
`prefers-reduced-motion`.

## Running it

```bash
npm install
cp .env.example .env.local
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build
npm run lint
```

## The holding page

Until launch, visitors see `/coming-soon` while the real site is built behind
it. The switch is an environment variable:

```
COMING_SOON=false    the real site is served
(unset / anything else)  the holding page — it fails closed on purpose
```

`src/middleware.ts` does the rewrite. To show the work-in-progress site to
someone while the public still sees the holding page, send them to:

```
https://quietloopdigital.com/?preview=<PREVIEW_TOKEN>
```

That sets a cookie and they browse normally for 30 days.

## Layout

```
src/
├── app/
│   ├── layout.tsx           root — fonts, metadata, <html>/<body>
│   ├── globals.css          design tokens, base styles, keyframes
│   ├── (site)/              the real site — gets header + footer
│   │   ├── layout.tsx
│   │   └── page.tsx         home
│   └── coming-soon/         holding page — deliberately bare, dark-only
│       └── page.tsx
├── components/
│   ├── Header.tsx           sticky, theme-aware logo, mobile menu
│   ├── Footer.tsx
│   ├── Reveal.tsx           scroll-into-view fade + lift
│   └── LoopDiagram.tsx      the four services on a running loop
└── middleware.ts            holding-page switch
public/brand/                logo and icon, light + dark variants
```

## Brand

```
Orange   #faa220     large shapes and accents only
Deep     #a85c00     the orange as text — #faa220 is ~1.9:1 on white
Ink      #232323
```

Light and dark themes are both defined; the site follows the visitor's OS
setting. The holding page is the one exception — it commits to dark.

---

© Quiet Loop Digital. All rights reserved — this is a company website, not a
template.
