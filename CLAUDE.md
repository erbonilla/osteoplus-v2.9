# CLAUDE.md

## Project identity

This repository is `osteoplus-v2.9`, the Osteóplus responsive PWA landing-page project.

Osteóplus is a Barcelona osteopathy, physiotherapy, and rehabilitation product. The first implementation target is a responsive landing page that supports:

- Spanish as the default locale (`es`).
- English as the secondary locale (`en`).
- Dark, light, and system color modes.
- PWA metadata and an offline-ready shell.
- Senior-friendly, WCAG 2.2 AA interaction and readability standards.

---

## Source of truth

Before making setup or implementation decisions, read the project source files in this order:

1. `docs/project-source/osteoplus-design-system.md` — implementation tokens, accessibility rules, typography, layout, motion, and component behavior.
2. `docs/project-source/brand-kit.md` — brand identity, logo rules, voice, spelling, and the approved v4.2 token migration.
3. `docs/project-source/style-guide.md` — writing, bilingual, casing, and copy restrictions.
4. `docs/project-source/osteoplus-project-dna.md` — product scope, stack, architecture, and definition of done.
5. `docs/project-source/ui-kit.md` — component maturity, variants, props, and accessibility requirements.
6. `docs/preview/*.html` and `docs/preview/colors_and_type.css` — visual examples and token migration checks.

Legacy paths under `documents/` and `preview/` are also valid if the `docs/project-source/` copies have not been created yet.

If documents conflict, use the newest approved source for the affected topic. For current visual tokens, apply the **v4.2 migration**: filled CTA Teal-700 `#0F766E`, accent Orange-700 `#C2410C`, focus ring Teal-500 `#14B8A6`, and Teal-600 `#0D9488` reserved for logo fill, borders, and icon emphasis.

---

## Required stack

Use this baseline unless the user explicitly approves a change:

| Concern | Tool | Notes |
|---|---|---|
| Framework | Next.js 15 App Router | Do not upgrade to 16 without approval |
| UI library | React 19 | |
| Language | TypeScript strict | `noUncheckedIndexedAccess`, `noImplicitOverride` |
| Package manager | pnpm | |
| Styling | Tailwind CSS v4 | Semantic CSS variables in `globals.css` |
| UI primitives | Source-owned shadcn/Radix-style | |
| Animation | Framer Motion | Respect `prefers-reduced-motion` |
| Forms | react-hook-form + zod + `@hookform/resolvers` | |
| i18n | next-intl | Spanish default, English secondary |
| Theme | next-themes | `class` strategy |
| PWA | `@ducanh2912/next-pwa` | |
| Icons | lucide-react only | 2 px stroke, round cap/join |
| Dates | date-fns | `es` and `en-GB` locales when dates appear |
| Lint/format | Biome | |
| Testing | Vitest, Playwright, axe-core, Lighthouse CI | |

---

## Non-negotiables

- Spanish (`es`) is the default locale. English (`en`) must have parity.
- Every user-facing string must come from `next-intl` messages. Do not hard-code UI copy in components.
- Every screen and component must support dark and light mode.
- Use semantic design tokens only in components.
- Raw hex values are allowed only in token definitions (`:root`, `.dark`), manifest metadata, static asset metadata, or one-time migration scripts.
- WCAG 2.2 AA is required.
- Touch targets: ≥ 48 × 48 px. Primary CTAs: ≥ 56 × 48 px.
- Body text ≥ 16 px (18 px preferred for senior-facing content). Input text ≥ 16 px.
- Visible focus rings are required.
- All interactive elements need visible labels or accessible names.
- No placeholder-only form labels.
- No pre-checked consent boxes.
- No color-only indicators.
- Motion must respect `prefers-reduced-motion`.
- No parallax, autoplay media, or decorative animation.
- No emoji in UI chrome, copy, or gamification.
- Use Lucide icons with 2 px stroke and round cap/join.
- Spell the brand exactly as **Osteóplus** with the accented `ó`. Never write `Osteoplus`, `OsteoPlus`, `Osteo+`, or `osteo plus`.

---

## Brand and copy rules

Write like a trusted family osteopath explaining something in plain language.

**Do:**

- Write Spanish first, then English.
- Use warm, clinical-clear, quietly confident language.
- Use sentence case for UI buttons, headings, nav, labels, modals, toasts, and empty states.
- Use plain symptom-based language.
- Include a clear way forward in errors and safety copy.
- Include a clinic phone escape hatch in safety-critical flows.

**Do not:**

- Use hype words (`revolutionary`, `seamless`, `cutting-edge`).
- Use minimizing words (`simply`, `just`, `easily`) when they could blame the user.
- Use jargon when plain language works.
- Use exclamation marks in UI chrome.
- Use ALL CAPS for emphasis.
- Use emoji.

---

## Project structure

```text
src/
  app/
    [locale]/
      layout.tsx
      page.tsx
    api/
    globals.css
    manifest.ts
    robots.ts
    sitemap.ts
  components/
    brand/          # Logo, brand-mark components
    landing/        # Landing-page sections (hero, services, footer, etc.)
    ui/             # Reusable primitives (button, theme-toggle, etc.)
    domain/         # Product-specific reusable components (beyond landing)
    patterns/       # Shared layout/interaction patterns
    providers.tsx   # ThemeProvider + any context wrappers
  i18n/
    routing.ts
    request.ts
  lib/
    schemas/        # Zod form schemas
    theme/          # Theme utilities
    utils/          # General utilities (cn, clsx helpers, etc.)
  messages/
    es.json
    en.json
public/
  fonts/
  icons/
  logos/
docs/
  project-source/   # Canonical design/brand/style docs
  preview/          # HTML previews and token CSS
  qa/               # QA and review guidance
```

Use `/components/ui` for reusable primitives and `/components/landing` for landing-page sections. Use `/components/domain` only for product-specific components that will be reused beyond the landing page.

---

## Commands

```bash
pnpm install        # Install dependencies
pnpm dev            # Start dev server
pnpm build          # Production build
pnpm check          # Biome check
pnpm check:write    # Biome format + safe lint fixes
pnpm typecheck      # tsc --noEmit
pnpm test           # Vitest
pnpm e2e            # Playwright
pnpm validate       # check + typecheck + test + build
```

Run the narrowest relevant checks during iteration. Before finalizing any significant change, run at least:

```bash
pnpm check && pnpm typecheck && pnpm build
```

Run Playwright and axe when UI behavior, accessibility, routing, theme, or i18n changes.

---

## Styling rules

- Define colors as semantic CSS variables in `src/app/globals.css`.
- Consume tokens through Tailwind utilities and CSS variables.
- Do not introduce one-off colors.
- Do not use opacity hacks for disabled, hover, or active states.
- Use border-first, shadow-light design.
- Use the 4-point spacing grid.
- Radius tokens: button/input `8px`, card `12px`, modal `16px`, hero containers `24px`, chips `9999px`.
- Do not use a `radius/xs` token.
- Focus state: 2 px ring, 2 px offset.

### Key semantic tokens (v4.2 migration)

| Token | Light | Dark |
|---|---|---|
| `--color-brand-primary` (CTA fill) | `#0F766E` (Teal-700) | `#2DD4BF` |
| `--color-border-brand` (logo/border) | `#0D9488` (Teal-600) | `#2DD4BF` |
| `--color-border-focus` | `#14B8A6` (Teal-500) | `#5EEAD4` |
| `--color-accent-default` | `#C2410C` (Orange-700) | `#FB923C` |

---

## Component rules

For every component:

- Add TypeScript props and avoid `any`.
- Use semantic tokens — never raw hex in component files.
- Support dark mode.
- Support keyboard navigation when interactive.
- Include loading, error, disabled, focus, hover, and pressed states when relevant.
- Add `aria-label` for icon-only buttons.
- Use visible labels for form controls.
- Keep touch targets ≥ 48 × 48 px. Primary CTAs ≥ 56 × 48 px.
- Use Framer Motion only for purposeful transitions and respect `prefers-reduced-motion`.

---

## i18n rules

- Route through `/[locale]`.
- Default locale is `es`. Supported: `es`, `en`.
- Redirect `/` to `/es`.
- Use `next-intl` messages in `src/messages/es.json` and `src/messages/en.json`.
- Keep message keys stable.
- Do not merge a feature if one locale is missing required strings.
- Spanish copy is the source; English follows with tone parity.

---

## Forms and privacy rules

- Use react-hook-form + zod.
- Put schemas in `src/lib/schemas/`.
- Validate on blur and on submit.
- Focus the first invalid field on submit.
- Consent checkboxes default unchecked.
- Do not transmit pain scores, mood data, or health-sensitive details to analytics.
- Avoid implementing medical diagnosis, AI triage, prescriptions, or emergency workflows unless explicitly scoped.

---

## PWA rules

- Provide manifest metadata (raw hex is acceptable in manifest).
- Add approved icons when assets are available.
- Provide an offline fallback or clear offline state before production handoff.
- Do not cache sensitive health data in unsafe storage.

---

## Logo and assets

- Use SVG logo variants from the approved logo system under `public/logos/`.
- Use Primary Teal on light neutral surfaces.
- Use Teal-300 on dark surfaces.
- Use White on brand-colored or dark photo surfaces.
- Use Original for full-color marketing surfaces.
- Never stretch, skew, recolor, shadow, or rasterize the logo below target size.
- Preserve the accented `Ó`.

Expected logo filenames:

```text
public/logos/osteoplus-original-logo.svg
public/logos/osteoplus-logo-white.svg
public/logos/osteoplus-logo-teal-300.svg
public/logos/osteoplus-logo-primary-teal.svg
public/logos/osteoplus-logo-black.svg
public/logos/favicon.svg
```

---

## Git and PR rules

Use conventional commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`.

Before opening or summarizing a PR, include:

- What changed.
- How it was tested.
- Any skipped checks and why.
- Accessibility, i18n, and dark-mode considerations.
- Remaining TODOs.

---

## Initialization phases

The project follows a phased initialization plan (see `osteoplus-v2.9-detailed-plan.md` for full details):

| Phase | Description |
|---|---|
| 0 | Preflight: verify Node ≥ 20.9, pnpm, Git |
| 1 | Protect existing folder, scaffold if needed, pin Next.js 15 + React 19 |
| 2 | Normalize source documents and assets into `docs/` and `public/` |
| 3 | Place `AGENTS.md` and `CLAUDE.md` at repo root |
| 4 | Configure agent tooling (Context7, UI UX Pro Max, 21st.dev Magic) |
| 5 | Install runtime and dev dependencies |
| 6 | Configure pnpm scripts |
| 7 | Configure Biome and TypeScript strict |
| 8 | Create the `src/` directory structure |
| 9 | Configure Tailwind v4 and semantic tokens in `globals.css` |
| 10 | Configure i18n (routing, request config, starter messages) |
| 11 | Configure theme provider (next-themes with class strategy) |
| 12 | Configure PWA manifest metadata |
| 13 | Initialize landing-page components (hero, services, booking, trust, footer) |
| 14 | Testing and QA (axe, Playwright, viewport checks, hex audit) |
| 15 | Validation: `pnpm check && pnpm typecheck && pnpm test && pnpm build` |

### Assumptions and missing inputs

- The local Merriweather variable font file may be missing — create `public/fonts/` and add a TODO if unavailable.
- Production clinic phone, booking backend URL, and analytics policy are not provided — use placeholders and mark them.
- Supabase schema, API contracts, and practitioner data are not provided — do not implement backend booking logic during landing-page initialization.
- Do not implement full booking flow until backend/API scope is supplied.

---

## Minimum landing-page components

```text
src/components/brand/logo.tsx
src/components/landing/hero.tsx
src/components/landing/services-preview.tsx
src/components/landing/booking-strip.tsx
src/components/landing/trust-section.tsx
src/components/landing/footer.tsx
src/components/ui/button.tsx
src/components/ui/theme-toggle.tsx
src/components/ui/language-toggle.tsx
```

Landing page content order:

1. Header with approved logo and language/theme controls.
2. Hero with Spanish-first copy and one primary CTA.
3. Service summary cards.
4. Trust/accessibility section.
5. Booking CTA strip.
6. Footer with privacy/legal placeholders.

---

## Definition of done — initialization

Initialization is not complete until:

- [ ] Next.js is pinned to 15.x.
- [ ] React and React DOM are 19.x.
- [ ] TypeScript strict is enabled.
- [ ] pnpm lockfile exists.
- [ ] Biome is configured.
- [ ] Tailwind v4 globals and semantic tokens are present with v4.2 migration applied.
- [ ] next-intl is configured with Spanish default and English secondary.
- [ ] next-themes is configured with class strategy.
- [ ] PWA manifest exists.
- [ ] `AGENTS.md` and `CLAUDE.md` exist in repo root.
- [ ] Source docs are available under `docs/project-source/`.
- [ ] Approved logos are available under `public/logos/`.
- [ ] `pnpm check`, `pnpm typecheck`, and `pnpm build` pass.

---

## Definition of done — landing-page UI

The landing page is not ready for review until:

- [ ] `/es` and `/en` render successfully.
- [ ] Spanish and English content have parity.
- [ ] Dark and light modes are both usable.
- [ ] The page is responsive at 320, 390, 768, 1024, and 1440 px widths.
- [ ] Primary CTA is keyboard reachable and ≥ 56 × 48 px.
- [ ] All interactive targets are ≥ 48 × 48 px.
- [ ] There are no placeholder-only inputs.
- [ ] There are no emoji.
- [ ] There are no raw hex values in components.
- [ ] Axe smoke test has no serious or critical violations.
- [ ] Reduced-motion mode is respected.
- [ ] Lighthouse targets are documented and tracked (target ≥ 95 for performance, accessibility, best practices, and SEO).

---

## Quick hex audit

To verify no raw hex leaked into component files:

```bash
grep -R "#[0-9A-Fa-f]\{3,8\}" src/components src/app/\[locale\] || true
```

Expected: no matches.
