# text to image — marketing web

Marketing website for the **text to image** AI image studio.

Built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS v4**. Bilingual (English / Arabic with full RTL), fully responsive, and statically-rendered.

## Pages

- `/` — redirects to the user's preferred locale (English by default)
- `/en` · `/ar` — marketing home (hero, features, phone showcase, process, pricing, testimonials, FAQ)
- `/en/launch` · `/ar/launch` — animated splash with progress bar (3s → routes to `/welcome`)
- `/en/welcome` · `/ar/welcome` — post-splash showcase: 3D phone mockup + typewriter prompt code box + Continue CTA → `/auth`
- `/en/auth` · `/ar/auth` — sign-in / sign-up: Google + Pollinations.ai providers, email + password, daily-quota glow card → `/dashboard`
- `/en/dashboard` · `/ar/dashboard` — workspace: stats, prompt panel, recent runs
- `/en/about` — team, vision, mission, stats
- `/en/blog` · `/en/blog/[slug]` — field notes
- `/en/privacy` · `/en/terms` — legal
- Custom 404 with on-brand error state

### Capacitor (mobile) flow

The app is intended to be wrapped with **Capacitor** for iOS / Android. On mobile the marketing home page is skipped — set the Capacitor launch URL to `/{locale}/launch` so users land directly on:

```
launch (3s splash) → welcome (phone + code box + Continue) → auth → dashboard
```

In `capacitor.config.ts` set `server.url` (or the bundled start URL) to `/en/launch` (or detect device locale and pick `/ar/launch`).

Arabic mirrors every route under `/ar/…` with full RTL layout and Arabic numerals.

## Design system

The design tokens, typography scale, spacing, radii, and motion values are defined in `src/app/globals.css` and implement the rork.com-style minimal system from the brief:

- Light and dark palettes via CSS custom properties
- Inter (Latin) + IBM Plex Sans Arabic (RTL) + JetBrains Mono
- 4px spacing base, 8/12/16/24px radii scale, 4-step shadow scale
- WCAG AA focus ring on every interactive element
- `prefers-reduced-motion` respected

## Dev

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Structure

```
src/
├── app/
│   ├── [locale]/         # locale-aware pages
│   ├── layout.tsx        # sets html lang/dir from middleware header
│   ├── sitemap.ts        # sitemap for both locales
│   └── robots.ts
├── components/           # header, footer, prompt-input, faq, contact-form, cta, icons…
├── i18n/
│   ├── config.ts         # locales + direction helpers
│   └── dictionaries.ts   # EN + AR content
└── middleware.ts         # locale detection + redirect from /
```

## Adding content

All strings live in `src/i18n/dictionaries.ts`. Add or edit keys on the `en` object and mirror them on `ar` — the type is enforced.

## License

All rights reserved.
