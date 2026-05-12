# Osteóplus v2.9 Detailed Project Initialization Plan

## Project target

Initialize the existing folder `osteoplus-v2.9` as a responsive, accessible, bilingual, dark/light-mode PWA landing page.

Primary constraints:

- Spanish (`es`) is the default locale.
- English (`en`) is secondary and must have parity.
- The implementation must use Next.js 15 App Router and React 19.
- The UI must follow the Osteóplus brand, design-system, style-guide, and UI-kit documents.
- Components must use semantic tokens and must not hard-code raw hex values.
- The first deliverable is a landing page, not the full booking app or practitioner dashboard.

## Assumptions and missing inputs

These inputs are not confirmed by the provided folder outline and should be treated as setup TODOs:

- The local Merriweather variable font file may be missing. If unavailable, create `public/fonts/` and add a TODO; do not block initialization.
- Exact pnpm version is not specified. Pin the local version through Corepack after checking the developer machine.
- Production clinic phone number, booking backend URL, and analytics policy are not provided. Use placeholders only in non-production copy and mark them.
- Supabase schema, API contracts, appointment data, and practitioner data are not provided. Do not implement backend booking logic during landing-page initialization.
- API keys for Context7, 21st.dev Magic, or any paid tools are not provided. Configure placeholders and keep secrets out of Git.
- The `.fig` file is useful for QA, but markdown docs and CSS tokens remain the implementation source of truth.

## Phase 0: preflight

Run from the parent folder of `osteoplus-v2.9`:

```bash
node --version
corepack --version
pnpm --version || true
git --version
codex --version || true
```

Expected:

- Node.js is 20.9 or newer.
- Git is available.
- pnpm is available or enabled through Corepack.
- Codex is available only if local agent tooling is being configured.

Enable pnpm if needed:

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

## Phase 1: protect the existing folder

Create a backup before scaffolding into the existing folder:

```bash
cp -R osteoplus-v2.9 osteoplus-v2.9.backup.$(date +%Y%m%d-%H%M%S)
cd osteoplus-v2.9
git init
git status
```

If `package.json` already exists, skip the scaffold-copy step and move directly to dependency alignment.

If `package.json` does not exist, do not run `create-next-app` directly inside the non-empty folder. Scaffold into a temporary folder, then merge.

```bash
cd ..
pnpm create next-app@15 osteoplus-v2.9-scaffold   --typescript   --tailwind   --app   --src-dir   --import-alias "@/*"   --use-pnpm

rsync -a osteoplus-v2.9-scaffold/ osteoplus-v2.9/
rm -rf osteoplus-v2.9-scaffold
cd osteoplus-v2.9
```

Pin the baseline:

```bash
pnpm add next@15 react@19 react-dom@19
pnpm install
pnpm why next react react-dom
```

## Phase 2: normalize source documents and assets

Create project-source folders:

```bash
mkdir -p docs/project-source docs/preview docs/qa public/logos public/icons public/fonts
```

Copy source documents:

```bash
cp documents/brand-kit.md docs/project-source/
cp documents/osteoplus-design-system.md docs/project-source/
cp documents/osteoplus-project-dna.md docs/project-source/
cp documents/style-guide.md docs/project-source/
cp documents/ui-kit.md docs/project-source/
cp documents/SKILL.md docs/project-source/
cp documents/README.md docs/project-source/
```

Copy previews:

```bash
cp preview/*.html docs/preview/
cp preview/colors_and_type.css docs/preview/
```

Copy logos:

```bash
cp brand-assets/logo-pack/logo-svg/*.svg public/logos/
cp brand-assets/logo-pack/logo-png/* public/icons/ || true
```

Use approved logo filenames in code:

```text
public/logos/osteoplus-original-logo.svg
public/logos/osteoplus-logo-white.svg
public/logos/osteoplus-logo-teal-300.svg
public/logos/osteoplus-logo-primary-teal.svg
public/logos/osteoplus-logo-black.svg
public/logos/favicon.svg
```

If the original logo filename differs between docs and assets, keep the physical filename and create a small brand-logo component that maps semantic variants to the available asset paths.

## Phase 3: add repository agent guidance

Place `AGENTS.md` at the repository root:

```bash
cp /path/to/Agents.md AGENTS.md
```

Validate Codex instruction loading if Codex is installed:

```bash
codex --ask-for-approval never "Summarize the current instructions."
```

Expected summary must include:

- Spanish default.
- Next.js 15, React 19.
- Semantic tokens only.
- WCAG 2.2 AA.
- Dark/light mode.
- No emoji.
- pnpm and Biome.

## Phase 4: configure Skills, Context7, UI UX Pro Max, and 21st.dev Magic

### Skills

Use repo-scoped skills only when a reusable workflow is needed:

```bash
mkdir -p .agents/skills
```

Do not create a custom Osteóplus skill during initial setup. Use `AGENTS.md` first.

If a reusable review workflow is later needed, create:

```text
.agents/skills/osteoplus-ui-review/SKILL.md
```

Minimum skill format:

```md
---
name: osteoplus-ui-review
description: Review Osteóplus UI work for semantic tokens, accessibility, bilingual parity, no emoji, dark/light mode, and senior-friendly UX.
---

Review UI changes against AGENTS.md and docs/project-source. Do not override the source documents.
```

### Context7

Add Context7 for current, version-specific library documentation:

```bash
codex mcp add context7 -- npx -y @upstash/context7-mcp@latest
```

Project-scoped alternative for trusted repos:

```bash
mkdir -p .codex
cat > .codex/config.toml <<'EOF'
[mcp_servers.context7]
command = "npx"
args = ["-y", "@upstash/context7-mcp@latest"]
startup_timeout_sec = 20
tool_timeout_sec = 60
enabled = true
EOF
```

Use Context7 before configuring:

- Next.js
- React
- Tailwind CSS
- next-intl
- next-themes
- Framer Motion
- react-hook-form
- zod
- PWA
- Playwright
- Vitest
- Biome

### UI UX Pro Max

Install only if the local agent environment supports it.

Recommended current CLI route from the UI UX Pro Max project:

```bash
npm install -g uipro-cli
uipro init --ai codex
```

If the installer does not support the local Codex version, add a repo note instead:

```bash
mkdir -p docs/qa
cat > docs/qa/ui-ux-pro-max.md <<'EOF'
# UI UX Pro Max usage

Use UI UX Pro Max for design critique, accessibility review, responsive review, dark-mode QA, and interaction review.

It must not override Osteóplus source docs. Enforce: semantic tokens, Spanish-first copy, no emoji, WCAG 2.2 AA, dark/light mode, Lucide icons, sentence case, 48 x 48 touch targets, and no hard-coded component colors.
EOF
```

### 21st.dev Magic

Add Magic only if component generation is needed and an API key is available.

```toml
[mcp_servers.magic]
command = "npx"
args = ["-y", "@21st-dev/magic@latest", "API_KEY=${TWENTYFIRST_API_KEY}"]
startup_timeout_sec = 20
tool_timeout_sec = 60
enabled = true
```

Keep `TWENTYFIRST_API_KEY` outside Git. Review generated components before committing.

## Phase 5: install project dependencies

Runtime:

```bash
pnpm add   next-intl   next-themes   framer-motion   react-hook-form   zod   @hookform/resolvers   lucide-react   date-fns   @ducanh2912/next-pwa   clsx   tailwind-merge   class-variance-authority
```

Development:

```bash
pnpm add -D   @biomejs/biome   vitest   @vitest/ui   jsdom   @testing-library/react   @testing-library/jest-dom   playwright   @playwright/test   @axe-core/playwright   lighthouse   typescript
```

Install Playwright browsers:

```bash
pnpm exec playwright install --with-deps
```

## Phase 6: configure scripts

Update `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "check": "biome check .",
    "check:write": "biome check --write .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "e2e": "playwright test",
    "e2e:ui": "playwright test --ui",
    "validate": "pnpm check && pnpm typecheck && pnpm test && pnpm build"
  }
}
```

## Phase 7: configure Biome and TypeScript

Create `biome.json`:

```json
{
  "$schema": "https://biomejs.dev/schemas/latest/schema.json",
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 100
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "suspicious": {
        "noExplicitAny": "error"
      },
      "style": {
        "useImportType": "error"
      }
    }
  },
  "organizeImports": {
    "enabled": true
  },
  "files": {
    "ignoreUnknown": true,
    "includes": [
      "src/**/*",
      "*.ts",
      "*.tsx",
      "*.js",
      "*.mjs",
      "*.json",
      "*.jsonc",
      "*.md"
    ]
  }
}
```

Ensure `tsconfig.json` has strict settings:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Phase 8: create the app structure

```bash
mkdir -p   src/app/[locale]   src/app/api   src/components/brand   src/components/landing   src/components/ui   src/components/domain   src/components/patterns   src/i18n   src/lib/schemas   src/lib/theme   src/lib/utils   src/messages
```

## Phase 9: configure Tailwind v4 and semantic tokens

Use `src/app/globals.css` as the token source.

Rules:

- Raw hex values are allowed in `:root`, `.dark`, manifest metadata, and asset metadata.
- Components must use semantic CSS variables or Tailwind classes mapped to variables.
- Apply the v4.2 token migration:
  - Filled CTA: Teal-700 `#0F766E`.
  - Brand border/icon emphasis/logo fill: Teal-600 `#0D9488`.
  - Accent default: Orange-700 `#C2410C`.
  - Focus ring: Teal-500 `#14B8A6`.

Initial scaffold:

```css
@import "tailwindcss";

@font-face {
  font-family: "Merriweather";
  src: url("/fonts/Merriweather-VariableFont_opsz_wdth_wght.ttf") format("truetype-variations");
  font-weight: 300 900;
  font-style: normal;
  font-display: swap;
}

:root {
  color-scheme: light;

  --color-brand-primary: #0f766e;
  --color-brand-primary-hover: #115e59;
  --color-brand-primary-active: #134e4a;
  --color-border-brand: #0d9488;
  --color-border-focus: #14b8a6;

  --color-accent-default: #c2410c;
  --color-accent-hover: #ea580c;
  --color-accent-active: #9a3412;

  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f8fafc;
  --color-bg-tertiary: #f1f5f9;

  --color-surface-card: #ffffff;
  --color-surface-elevated: #ffffff;

  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;
  --color-text-tertiary: #64748b;
  --color-text-inverse: #ffffff;
  --color-text-on-brand: #ffffff;
  --color-text-link: #0f766e;

  --color-border-default: #e2e8f0;
  --color-border-strong: #cbd5e1;

  --radius-button: 0.5rem;
  --radius-input: 0.5rem;
  --radius-card: 0.75rem;
  --radius-chip: 9999px;

  --font-heading: Merriweather, Georgia, "Times New Roman", serif;
  --font-body: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-data: "Roboto Mono", "SF Mono", "Fira Code", Consolas, monospace;
}

.dark {
  color-scheme: dark;

  --color-brand-primary: #2dd4bf;
  --color-brand-primary-hover: #5eead4;
  --color-brand-primary-active: #99f6e4;
  --color-border-brand: #2dd4bf;
  --color-border-focus: #5eead4;

  --color-accent-default: #fb923c;
  --color-accent-hover: #fdba74;
  --color-accent-active: #f97316;

  --color-bg-primary: #0f172a;
  --color-bg-secondary: #1e293b;
  --color-bg-tertiary: #334155;

  --color-surface-card: #1e293b;
  --color-surface-elevated: #334155;

  --color-text-primary: #f8fafc;
  --color-text-secondary: #cbd5e1;
  --color-text-tertiary: #94a3b8;
  --color-text-inverse: #0f172a;
  --color-text-on-brand: #042f2e;
  --color-text-link: #2dd4bf;

  --color-border-default: #334155;
  --color-border-strong: #475569;
}

@theme inline {
  --color-brand-primary: var(--color-brand-primary);
  --color-bg-primary: var(--color-bg-primary);
  --color-bg-secondary: var(--color-bg-secondary);
  --color-surface-card: var(--color-surface-card);
  --color-text-primary: var(--color-text-primary);
  --color-text-secondary: var(--color-text-secondary);
  --color-border-default: var(--color-border-default);
  --font-heading: var(--font-heading);
  --font-body: var(--font-body);
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.5;
}

:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Phase 10: configure i18n

Create `src/i18n/routing.ts`:

```ts
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "always"
});

export type Locale = (typeof routing.locales)[number];
```

Create `src/i18n/request.ts`:

```ts
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
```

Create starter messages.

`src/messages/es.json`:

```json
{
  "metadata": {
    "title": "Osteóplus | Osteopatía y rehabilitación en Barcelona",
    "description": "Reserva tu visita y sigue tu recuperación con una guía clara, amable y accesible."
  },
  "landing": {
    "heroEyebrow": "Osteopatía y rehabilitación en Barcelona",
    "heroTitle": "Cuidado claro para moverte mejor",
    "heroBody": "Reserva una visita sin crear una cuenta. Te acompañamos con ejercicios sencillos y seguimiento claro después de la consulta.",
    "primaryCta": "Reservar cita",
    "secondaryCta": "Ver servicios"
  }
}
```

`src/messages/en.json`:

```json
{
  "metadata": {
    "title": "Osteóplus | Osteopathy and rehabilitation in Barcelona",
    "description": "Book your visit and follow your recovery with clear, kind, accessible guidance."
  },
  "landing": {
    "heroEyebrow": "Osteopathy and rehabilitation in Barcelona",
    "heroTitle": "Clear care to help you move better",
    "heroBody": "Book a visit without creating an account. We support you with simple exercises and clear follow-up after your appointment.",
    "primaryCta": "Book appointment",
    "secondaryCta": "View services"
  }
}
```

Add redirect middleware or root redirect so `/` resolves to `/es`.

## Phase 11: configure theme provider

Create `src/components/providers.tsx`:

```tsx
"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
```

## Phase 12: configure PWA metadata

Create `src/app/manifest.ts`:

```ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Osteóplus",
    short_name: "Osteóplus",
    description: "Reserva visitas y sigue tu recuperación con Osteóplus.",
    start_url: "/es",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f766e",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
}
```

Raw hex is acceptable in manifest metadata. Component CSS still must use semantic tokens.

## Phase 13: initialize landing-page components

Minimum component set:

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

Do not implement full booking flow until backend/API scope is supplied.

## Phase 14: testing and QA

Add a smoke test for `/es` and `/en`.

Add Playwright routes:

```bash
pnpm e2e
```

Viewport QA targets:

```text
320 px
390 px
768 px
1024 px
1440 px
```

Accessibility checks:

- axe-core: no serious or critical violations.
- Keyboard: all actions reachable.
- Touch targets: 48 x 48 px minimum.
- Primary CTA: 56 x 48 px minimum.
- Reduced motion: respected.
- Dark/light mode: no contrast regressions.
- No emoji.
- No hard-coded raw hex in components.

Useful search check:

```bash
grep -R "#[0-9A-Fa-f]\{3,8\}" src/components src/app/[locale] || true
```

Expected: no component-level raw hex matches.

## Phase 15: validation commands

Run:

```bash
pnpm check
pnpm typecheck
pnpm test
pnpm build
```

Before first UI review, also run:

```bash
pnpm e2e
pnpm validate
```

## Acceptance checklist

Initialization is complete when:

- `pnpm install` succeeds.
- `pnpm dev` starts the app.
- `/` redirects to `/es`.
- `/es` and `/en` render.
- Next.js is 15.x.
- React and React DOM are 19.x.
- TypeScript strict is enabled.
- Tailwind v4 globals and semantic tokens exist.
- v4.2 token migration is applied.
- `next-intl` uses Spanish default and English secondary.
- `next-themes` works with class strategy.
- PWA manifest exists.
- Approved logos are available under `public/logos/`.
- `AGENTS.md` exists in repo root.
- Source docs exist under `docs/project-source/`.
- Context7 setup is present or configured.
- UI UX Pro Max setup guidance is present or installed.
- `pnpm check` passes.
- `pnpm typecheck` passes.
- `pnpm build` passes.

The landing page is ready for first design review when:

- Spanish and English copy are both present.
- Dark and light modes are visually acceptable.
- The page is responsive at the target widths.
- Primary CTA target is at least 56 x 48 px.
- All interactive targets are at least 48 x 48 px.
- Axe smoke test passes.
- Motion is disabled or reduced when `prefers-reduced-motion` is enabled.
- Lighthouse score target is at least 95 for performance, accessibility, best practices, and SEO.

## First Codex prompt

Use after `AGENTS.md`, docs, and tooling are in place:

```text
Initialize the existing Osteóplus folder `osteoplus-v2.9` according to AGENTS.md and docs/project-source. Use Next.js 15 App Router, React 19, TypeScript strict, pnpm, Tailwind CSS v4, next-intl with Spanish default and English secondary, next-themes class strategy, Framer Motion, react-hook-form + zod, PWA metadata, Biome, Vitest, Playwright, and axe-core. Use Context7 before framework/library setup. Do not use hard-coded hex values in components. Build only the initialization scaffold, token/theme/i18n setup, approved logo wiring, and a minimal accessible placeholder landing page in /es and /en. Stop after pnpm check, pnpm typecheck, and pnpm build pass, then summarize all changes and remaining TODOs.
```
