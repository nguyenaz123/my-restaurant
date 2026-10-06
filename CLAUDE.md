# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Ember & Age: a marketing site for a dry-aged steakhouse in Saigon. It's built with Next.js 16 (App Router), React 19, Tailwind CSS v4, Motion (`motion/react`) and Lenis smooth scroll. The site is in four languages: Vietnamese (`vi`, default), English (`en`), Lao (`lo`) and Simplified Chinese (`zh`). **Never hardcode UI text in components**; every visible string goes in all four dictionaries. Code comments are in English.

## Commands

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # production build (also type-checks)
npm start
npm run lint           # ESLint 9 flat config (next core-web-vitals + typescript)
npx tsc --noEmit       # type-check only; needs .next/types from a prior dev/build run
```

There is no test framework set up.

`npx next typegen` regenerates `PageProps`/`LayoutProps` and the `next/root-params` types without a full build.

`NEXT_PUBLIC_SITE_URL` sets the canonical domain (it falls back to `https://emberandage.vn`). Metadata, Open Graph, `sitemap.ts`, `robots.ts` and the JSON-LD in `[lang]/layout.tsx` all read it through `site.url`.

## Architecture

- **i18n routing.** Every page lives under `src/app/[lang]/`, and `[lang]/layout.tsx` is the root layout (it sets `<html lang>` and statically generates all four locales). `src/proxy.ts` redirects unprefixed URLs to a locale: the `NEXT_LOCALE` cookie (set by the language switcher) wins, then `Accept-Language`, then `vi`. `robots.ts`, `sitemap.ts` and the OG image stay at the `app/` root. Unknown paths under a locale hit `[lang]/[...rest]`, which calls `notFound()` so the 404 keeps the layout and language. Next sends that 404 as an empty HTML shell that the client fills in; this is expected Next behaviour for a dynamic `notFound()`.
- **First-visit language popup.** `components/layout/language-gate.tsx` opens while there is no `NEXT_LOCALE` cookie. Picking a language, or dismissing the popup, sets the cookie, so it shows only once. Flags are inline SVGs in `components/layout/flags.tsx`, because Windows shows emoji flags as two letters; English uses the UK flag.
- **Dictionaries** are in `src/i18n/dictionaries/{vi,en,lo,zh}.ts`. `vi.ts` is the source, and its shape is the `Dictionary` type, so a key missing from another locale fails type-checking. In strings, `*text*` marks the gold accent of a heading (rendered by `<Rich>` in `src/i18n/rich.tsx`) and `{name}` is a placeholder for `format()` in `src/i18n/format.ts`.
- **Getting text.** Server Components call `await getDictionary()` / `getLocale()` from `src/i18n/server.ts` (they read `next/root-params`, so they don't need props). Client components call `useI18n()` from `src/i18n/client.tsx`, which returns `{ locale, dict, href }`; the `[lang]` layout provides it. Server Actions can't read root params, so the client passes `locale` to the action and the action uses `loadDictionary(locale)`.
- **Links.** Internal paths in code are unprefixed (`"/menu"`). `ButtonLink` adds the locale itself. Raw `<Link>`s use `href()` from `useI18n()` or `localizePath()` from `src/i18n/config.ts`. Page metadata uses `generateMetadata` with `pageAlternates(locale, path)` to emit the canonical URL and hreflang links.
- **Content is data, not markup.** `src/lib/site.ts` holds language-neutral facts (phone, geo, the structured address for JSON-LD, nav hrefs, CTA paths), and `src/lib/data.ts` holds ids, images, numeric VND prices, BMS and so on. Their text lives in the dictionaries, keyed by the same ids (`dict.cuts[slug]`, `dict.menu.items[id]`, `dict.images[imageId]` for alt text, ...). Adding a record means adding it to `data.ts` and to every dictionary. Prices go through `formatPrice()`, which formats by hand instead of with `Intl` so the output is identical on server and client and doesn't cause hydration mismatches.
- **Pages are thin server components** in `src/app/[lang]/<route>/page.tsx`. Each one exports `generateMetadata` and composes section components from `src/components/<area>/`. Interactive pieces are `"use client"` components: drawers, tabs, sliders, lightbox, the form and anything animated.
- **Root layout** (`src/app/[lang]/layout.tsx`) owns the fonts, the Restaurant JSON-LD, the skip link, `I18nProvider`, and the `SmoothScroll` > `SiteNav` / `main` / `SiteFooter` / `CallButton` shell. `SmoothScroll` turns Lenis off when the user prefers reduced motion, and it resets scroll to the top on route change unless there's a hash. Anchor links scroll with a -96px offset for the fixed nav.
- **Scripts.** Cormorant and Jakarta have no Lao or CJK glyphs. Lao falls back to Noto Serif/Sans Lao (`next/font`, not preloaded), and Chinese falls back to system fonts, both through the stacks in `globals.css`. Under `:lang(lo)` and `:lang(zh)`, `globals.css` loosens display line-height and cancels `italic`, because these scripts have no true italics. The home manifesto is split into words on the server with `Intl.Segmenter` (Lao and Chinese have no spaces) and passed into `BrandStory` as props.
- **Reservation flow:** `createReservationSchema(messages)` in `src/lib/reservation-schema.ts` (zod v4) is built with the locale's error messages. Both the client form (react-hook-form + `zodResolver`) and the server action (`app/[lang]/private-dining/actions.ts`) use it, and the action validates again. Seating and occasion values are ids, with labels in the dictionary. The action is a stub: it waits and returns a fake reference without storing or sending anything. Business rules live in the schema: closed on Mondays, no past dates, a Vietnamese mobile number or any `+country` international number, 1–14 guests, fixed time slots.
- **Shared UI primitives** live in `src/components/ui/`: `Reveal` (the standard fade-up on viewport entry), `ButtonLink`, `Eyebrow`, `PageHeader`, `Bezel`. Merge classes with `cn()` from `src/lib/cn.ts` (clsx + tailwind-merge).

## Design system rules (from `src/app/globals.css`)

- Tokens are defined in Tailwind v4 `@theme` (there's no `tailwind.config`). Colors: `obsidian`, `char`, `char-2`, `gold`, `gold-bright`, `wine`, `wine-deep`, `cream`, `smoke`. Easings: `ease-silk`, `ease-out-expo`. Custom utilities: `hairline`, `inner-glow`, `text-balance`. Use these instead of arbitrary values.
- **The theme is dark only, on purpose.** Don't add a light mode.
- **Shape rule:** interactive controls are full pills, media and containers use a `1.75rem` double-bezel radius (`Bezel`), and form fields use `1rem`.
- Respect reduced motion. Client animations check `useReducedMotion()`, and the global CSS shortens animations to near zero under `prefers-reduced-motion`.
- `next/image` qualities must be one of the values allow-listed in `next.config.ts` (`70`, `82`); Next 16 rejects any other value.

## Placeholders still in place

Images in `public/images` are Unsplash placeholders. Prices, address, phone and chef name are sample data. The reservation action isn't connected to a booking system or email yet. The Lao and Chinese copy was machine-written and needs a native speaker's review. `src/app/opengraph-image.alt.txt` is still Vietnamese only.

## Design skills

`.claude/skills/` (mirrored in `.agents/skills/`, pinned in `skills-lock.json`) holds frontend design skills such as `design-taste-frontend`, `high-end-visual-design` and `redesign-existing-projects`. Use them for visual and UI work.
