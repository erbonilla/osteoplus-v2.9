# AGENTS.md

## Project identity

This repository is `osteoplus-v2.9`, the Osteóplus responsive PWA landing-page project.

Osteóplus is a Barcelona osteopathy, physiotherapy, and rehabilitation product. The first implementation target is a responsive landing page that supports:

- Spanish as the default locale (`es`).
- English as the secondary locale (`en`).
- Dark, light, and system color modes.
- PWA metadata and an offline-ready shell.
- Senior-friendly, WCAG 2.2 AA interaction and readability standards.

## Source of truth

Before making setup or implementation decisions, read the project source files in this order:

1. `documents/osteoplus-design-system.md` or `docs/project-source/osteoplus-design-system.md` for implementation tokens, accessibility rules, typography, layout, motion, and component behavior.
2. `documents/brand-kit.md` or `docs/project-source/brand-kit.md` for brand identity, logo rules, voice, spelling, and the approved v4.2 token migration.
3. `documents/style-guide.md` or `docs/project-source/style-guide.md` for writing, bilingual, casing, and copy restrictions.
4. `documents/osteoplus-project-dna.md` or `docs/project-source/osteoplus-project-dna.md` for product scope, stack, architecture, and definition of done.
5. `documents/ui-kit.md` or `docs/project-source/ui-kit.md` for component maturity, variants, props, and accessibility requirements.
6. `preview/*.html` and `preview/colors_and_type.css` for visual examples and token migration checks.

If documents conflict, use the newest approved source for the affected topic. For current visual tokens, apply the v4.2 migration: filled CTA Teal-700, accent Orange-700, focus ring Teal-500, and Teal-600 reserved for logo fill, borders, and icon emphasis.

## Required stack

Use this baseline unless the user explicitly approves a change:

- Framework: Next.js 15 App Router. Do not upgrade to Next.js 16 without approval.
- React: React 19.
- Language: TypeScript strict.
- Package manager: pnpm.
- Styling: Tailwind CSS v4 with semantic CSS variables.
- UI primitives: source-owned shadcn/Radix-style components.
- Component generation assistance: 21st.dev Magic only when it follows Osteóplus constraints.
- Animation: Framer Motion.
- Forms: react-hook-form, zod, and `@hookform/resolvers`.
- i18n: next-intl.
- Theme: next-themes with class strategy.
- PWA: `@ducanh2912/next-pwa`.
- Icons: lucide-react only.
- Dates: date-fns with `es` and `en-GB` locale support when dates appear.
- Lint/format: Biome.
- Testing: Vitest, Playwright, axe-core, and Lighthouse CI.

## Non-negotiables

- Spanish (`es`) is the default locale. English (`en`) must have parity.
- Every user-facing string must come from `next-intl` messages.
- Do not hard-code UI copy in components.
- Every screen and component must support dark and light mode.
- Use semantic design tokens only in components.
- Raw hex values are allowed only in token definitions, manifest metadata, static asset metadata, or one-time migration scripts.
- WCAG 2.2 AA is required.
- Touch targets must be at least 48 x 48 px.
- Primary CTAs should be at least 56 x 48 px.
- Body text must be at least 16 px by default; 18 px is preferred for senior-facing content.
- Input text must be at least 16 px.
- Visible focus rings are required.
- All interactive elements need visible labels or accessible names.
- No placeholder-only form labels.
- No pre-checked consent boxes.
- No color-only indicators.
- Motion must respect `prefers-reduced-motion`.
- No parallax, autoplay media, or decorative animation.
- No emoji in UI chrome, copy, or gamification.
- Use Lucide icons with 2 px stroke and round cap/join.
- Spell the brand exactly as `Osteóplus` with the accented `ó`.

## Brand and copy rules

Write like a trusted family osteopath explaining something in plain language.

Do:

- Write Spanish first, then English.
- Use warm, clinical-clear, quietly confident language.
- Use sentence case for UI buttons, headings, nav, labels, modals, toasts, and empty states.
- Use plain symptom-based language.
- Include a clear way forward in errors and safety copy.
- Include a clinic phone escape hatch in safety-critical flows.

Do not:

- Use hype words such as `revolutionary`, `seamless`, or `cutting-edge`.
- Use minimizing words such as `simply`, `just`, or `easily` when they could blame the user.
- Use jargon when plain language works.
- Use exclamation marks in UI chrome.
- Use ALL CAPS for emphasis.
- Use emoji.
- Write `Osteoplus`, `OsteoPlus`, `Osteo+`, or `osteo plus`.

## Project structure

Use this structure inside `osteoplus-v2.9`:

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
    brand/
    landing/
    ui/
    domain/
    patterns/
    providers.tsx
  i18n/
    routing.ts
    request.ts
  lib/
    schemas/
    theme/
    utils/
  messages/
    es.json
    en.json
public/
  fonts/
  icons/
  logos/
docs/
  project-source/
  preview/
  qa/
.agents/
  skills/
.codex/
  config.toml
```

Use `/components/ui` for reusable primitives and `/components/landing` for landing-page sections. Use `/components/domain` only for product-specific components that will be reused beyond the landing page.

## Commands

Use pnpm commands:

```bash
pnpm install
pnpm dev
pnpm check
pnpm check:write
pnpm typecheck
pnpm test
pnpm e2e
pnpm build
pnpm validate
```

Expected script meanings:

- `check`: Biome check.
- `check:write`: Biome format and safe lint fixes.
- `typecheck`: `tsc --noEmit`.
- `test`: Vitest.
- `e2e`: Playwright.
- `validate`: check, typecheck, test, and build.

Run the narrowest relevant checks during iteration. Before finalizing initialization, run at least:

```bash
pnpm check
pnpm typecheck
pnpm build
```

Run Playwright and axe when UI behavior, accessibility, routing, theme, or i18n changes.

## Agent tooling rules

### Skills

Codex skills should be stored in `.agents/skills/` for repo-scoped workflows.

Do not create a custom Osteóplus skill during initial setup unless the user explicitly asks. `AGENTS.md` is the repository-level source for agent behavior.

Install or reference UI UX Pro Max as an external UI/UX review skill when the local Codex environment supports it. Use it for:

- Landing-page layout critique.
- Accessibility and senior-friendly UX review.
- Responsive and dark-mode QA.
- Component hierarchy and interaction review.

Do not allow UI UX Pro Max to override Osteóplus source documents.

### Context7

Use Context7 before implementing or configuring library-specific code for:

- Next.js
- React
- Tailwind CSS
- next-intl
- next-themes
- Framer Motion
- react-hook-form
- zod
- PWA setup
- Playwright
- Vitest
- Biome

Preferred setup:

```bash
codex mcp add context7 -- npx -y @upstash/context7-mcp@latest
```

Project-scoped alternative for trusted repos:

```toml
[mcp_servers.context7]
command = "npx"
args = ["-y", "@upstash/context7-mcp@latest"]
startup_timeout_sec = 20
tool_timeout_sec = 60
enabled = true
```

### UI UX Pro Max

Use UI UX Pro Max for critique and review, not as the source of truth. When invoking it, restate the Osteóplus constraints:

```text
Review this Osteóplus UI against the source docs. Enforce semantic tokens, Spanish-first copy, no emoji, WCAG 2.2 AA, dark/light mode, Lucide icons, sentence case, 48 x 48 touch targets, and no hard-coded component colors.
```

### 21st.dev Magic

Use 21st.dev Magic only for component generation or inspiration after restating the Osteóplus constraints. Generated code must be reviewed, simplified, and brought under source-owned components.

Prompt pattern:

```text
Create an Osteóplus landing-page component using Next.js 15, React 19, TypeScript, Tailwind v4, semantic CSS variables, Framer Motion with reduced-motion support, Spanish-first copy, WCAG 2.2 AA, Lucide icons only, no emoji, no hard-coded hex in components, and Osteóplus design-system tokens.
```

## Styling rules

- Define colors as semantic CSS variables in `src/app/globals.css`.
- Consume tokens through Tailwind utilities and CSS variables.
- Do not introduce one-off colors.
- Do not use opacity hacks for disabled, hover, or active states.
- Use border-first, shadow-light design.
- Use the 4-point spacing grid.
- Use radius tokens: button/input 8 px, card 12 px, modal 16 px, hero containers 24 px, chips full.
- Do not use a `radius/xs` token.
- Focus state uses a 2 px ring and 2 px offset.

## Component rules

For every component:

- Add TypeScript props and avoid `any`.
- Use semantic tokens.
- Support dark mode.
- Support keyboard navigation when interactive.
- Include loading, error, disabled, focus, hover, and pressed states when relevant.
- Add `aria-label` for icon-only buttons.
- Use visible labels for form controls.
- Keep touch targets at least 48 x 48 px.
- Keep primary CTAs at least 56 x 48 px.
- Use Framer Motion only for purposeful transitions and respect reduced motion.

## i18n rules

- Route through `/[locale]`.
- Default locale is `es`.
- Support `es` and `en`.
- Redirect `/` to `/es`.
- Use `next-intl` messages in `src/messages/es.json` and `src/messages/en.json`.
- Keep message keys stable.
- Do not merge a feature if one locale is missing required strings.
- Spanish copy is the source; English follows with tone parity.

## Forms and privacy rules

- Use react-hook-form + zod.
- Put schemas in `src/lib/schemas/`.
- Validate on blur and on submit.
- Focus the first invalid field on submit.
- Consent checkboxes default unchecked.
- Do not transmit pain scores, mood data, or health-sensitive details to analytics.
- Avoid implementing medical diagnosis, AI triage, prescriptions, or emergency workflows unless explicitly scoped.

## PWA rules

- Provide manifest metadata.
- Add approved icons when assets are available.
- Provide an offline fallback or clear offline state before production handoff.
- Do not cache sensitive health data in unsafe storage.

## Logo and assets

- Use SVG logo variants from the approved logo system.
- Use Primary Teal on light neutral surfaces.
- Use Teal-300 on dark surfaces.
- Use White on brand-colored or dark photo surfaces.
- Use Original for full-color marketing surfaces.
- Never stretch, skew, recolor, shadow, or rasterize the logo below target size.
- Preserve the accented `Ó`.

## Git and PR rules

Use conventional commits:

- `feat:`
- `fix:`
- `docs:`
- `chore:`
- `refactor:`
- `test:`

Before opening or summarizing a PR, include:

- What changed.
- How it was tested.
- Any skipped checks and why.
- Accessibility, i18n, and dark-mode considerations.
- Remaining TODOs.

## Definition of done for initialization

Initialization is not complete until:

- Next.js is pinned to 15.x.
- React and React DOM are 19.x.
- TypeScript strict is enabled.
- pnpm lockfile exists.
- Biome is configured.
- Tailwind v4 globals and semantic tokens are present.
- next-intl is configured with Spanish default and English secondary.
- next-themes is configured with class strategy.
- PWA manifest exists.
- `AGENTS.md` exists in repo root.
- Source docs are available under `docs/project-source/`.
- Context7 setup instructions are present or MCP is configured.
- UI UX Pro Max setup instructions are present or installed locally.
- `pnpm check`, `pnpm typecheck`, and `pnpm build` pass.

## Definition of done for landing-page UI

The landing page is not ready for review until:

- `/es` and `/en` render successfully.
- Spanish and English content have parity.
- Dark and light modes are both usable.
- The page is responsive at 320, 390, 768, 1024, and 1440 px widths.
- Primary CTA is keyboard reachable and at least 56 x 48 px.
- All interactive targets are at least 48 x 48 px.
- There are no placeholder-only inputs.
- There are no emoji.
- There are no raw hex values in components.
- Axe smoke test has no serious or critical violations.
- Reduced-motion mode is respected.
- Lighthouse targets are documented and tracked.
