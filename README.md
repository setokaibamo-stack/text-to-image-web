# text to image — marketing web

Marketing website for the **text to image** AI image studio.

Built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS v4**. Bilingual (English / Arabic with full RTL), fully responsive, and statically-rendered.

## Pages

- `/` — redirects to the user's preferred locale (English by default)
- `/en` · `/ar` — home (hero, why us, portfolio, about preview, process, testimonials, FAQ, contact)
- `/en/services` · `/en/services/[slug]` — services list + detail
- `/en/portfolio` · `/en/portfolio/[slug]` — case studies
- `/en/about` — team, vision, mission, stats
- `/en/blog` · `/en/blog/[slug]` — field notes
- `/en/contact` — enquiry form
- `/en/privacy` · `/en/terms` — legal
- Custom 404 with on-brand error state

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
