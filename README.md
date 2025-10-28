# PPSI Digjaya Frontend

Digital platform for Persatuan Pencak Silat Indonesia (PPSI) to showcase cultural archives, manage training, certifications, and community programs. Built with Next.js App Router and themed UI primitives that follow PPSI branding tokens.

## Getting Started

```bash
pnpm install
pnpm dev
```

### Production Build & Analysis

```bash
pnpm build
pnpm start
pnpm analyze # bundle insights (requires optional @next/bundle-analyzer)
```

### Quality Commands

```bash
pnpm lint
pnpm typecheck
```

## Project Structure

```
src/
  app/
    [locale]/(public)/...      # Landing, culture hub, training, certificates, marketplace, gallery
    [locale]/(members)/...     # Member dashboards (overview, members list, map, analytics, certifications)
    [locale]/(admin)/...       # Admin & finance dashboard
    api/mock/                  # Static JSON fixtures served via route handlers
  components/
    blocks/                    # PPSI themed sections (hero, cards, navigation)
    charts/                    # Lightweight chart wrappers (SVG based)
    culture/, training/, join/ # Feature specific client components
    layout/                    # Providers and app shell
    ui/                        # Wrapped shadcn-style primitives (buttons, cards, forms, toast, etc.)
  data/fixtures/               # Mock data consumed by pages & API
  lib/                         # Utilities, API abstraction, hooks, Zustand-like store stubs
  messages/                    # i18n messages (id & su)
styles/                        # Design tokens & global Tailwind theme
public/                        # PWA manifest, service worker, placeholder assets
```

## Key Features

- **Design tokens & branding**: Tailwind + CSS variables for PPSI brown/gold/green palette, neumorphic shadows, bespoke typography (Poppins & Noto Serif Display).
- **UI primitives**: Wrapped shadcn-inspired components (`PButton`, `PCard`, `PSelect`, etc.) with PPSI theming and accessible focus rings.
- **Animations**: GSAP powered hero reveal, motion-safe checks, reusable `useGSAP` hook.
- **State & data**: Zustand-like store stub for UI state, `fetchMock` abstraction for fixtures, static `/api/mock` endpoints.
- **Internationalisation**: Simple `next-intl` compatible provider with Bahasa Indonesia & Sunda toggles.
- **PWA**: Manifest, offline shell service worker, automatic registration when enabled.
- **Dashboards**: Member analytics, map visualization, certification management, admin finance overview.
- **Accessibility & performance**: Keyboard friendly controls, reduced-motion support, responsive layouts, SVG placeholders for optimized media.

## Adding Content

- Extend fixtures inside `src/data/fixtures/*.json` to surface new members, courses, events, or marketplace items.
- Update translation strings in `src/messages/{id,su}.json` for locale support.
- Component gallery (`/gallery`) demonstrates available UI pieces for rapid prototyping.

## Theme & Locale Switching

- Theme follows system preference via custom `ThemeProvider` and can be toggled in the header.
- Locale switch toggles Bahasa Indonesia (id) and Sunda (su) paths while preserving the current route.

Enjoy building with PPSI Digjaya!
