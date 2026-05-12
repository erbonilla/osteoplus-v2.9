# Osteóplus — Design System

**Document:** `osteoplus-design-system.md`
**Version:** 4.1.0 (supersedes 4.0.0)
**Status:** Approved — reconciled with canonical `DESIGN_SYSTEM.md` v4.1.0
**Date:** 2026-04-23
**Owner:** DesignOps + Frontend Architecture
**Standard:** WCAG 2.2 AA · GDPR / LOPDGDD
**Audience:** Adults 35–85 in Barcelona (optimized for 60+)
**Languages:** Spanish (primary) · English (secondary)
**Figma Source:** `DesignSystemOsteoplus` (key `zM7bfBONIWsgvxH4KSff0J`) — v1.3 published 2026-04-18

---

## 0. What changed in 4.1.0

Version 4.1.0 is a **reconciliation release** — no new tokens, all seven previously open conflicts resolved. If you were using v4.0.0 tokens you do not need to rewrite anything; the table below lists only the decisions you must honor.

| Area | Resolution |
|---|---|
| Framework baseline | **Next.js 15** (App Router, React 19). v16 is a candidate once Turbopack ships stable. |
| Icon stroke width | **2 px** (Lucide default, round cap/join). The legacy 1.5 px variant is withdrawn. |
| Casing | **Sentence case** for all in-app UI. Title Case is permitted *only* for marketing display headlines on the public site. |
| `color/feedback/info` | **`#0D9488`** (brand teal). The `#2563EB` blue variant is withdrawn. |
| `color/feedback/error` | **`#DC2626`** on `#FEF2F2` (red-600). The `#E11D48` rose variant is withdrawn. |
| `radius/xs` | **Removed** from the scale. For anything tighter than 4 px, use `radius/none`. |
| Merriweather loading | **Local variable font** authoritative (`fonts/Merriweather-VariableFont_opsz_wdth_wght.ttf`). Google Fonts `@import` is fallback. |

See `DESIGN_SYSTEM.md` §15 (Reconciliation Log) for the full audit trail.

---

## 1. Architecture

Two Figma variable collections back the system. Designs must reference **Semantics** tokens only; Primitives exist to feed Semantics.

| Collection | Modes | Variables | Purpose |
|---|---|---|---|
| **Primitives** | Single (Value) | 81 | Raw palette, spacing, radii |
| **Semantics** | Light · Dark | 67 | Theme-aware roles used by components |

### 1.1 The Golden Rule

> Use **token names** (or Tailwind classes mapped to tokens) everywhere. Never hard-code a hex, never bind a component to a Primitive.

### 1.2 Non-negotiables

- WCAG 2.2 Level AA baseline
- Touch targets ≥ 48 × 48 dp; primary CTAs ≥ 56 × 48 dp
- Body text ≥ 14 px; default 16 px; 18 px preferred for senior-facing content
- Input font ≥ 16 px (prevents iOS auto-zoom)
- Contrast ≥ 4.5:1 for body text and essential UI
- Consent checkboxes default **unchecked** (GDPR / LOPDGDD)
- **No emoji** in UI chrome or copy
- Supports 200 % text scaling without layout breakage
- Respects `prefers-reduced-motion`

---

## 2. Color

### 2.1 Primitives — Teal (primary)

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| `color/teal/50` | `#F0FDFA` | `bg-teal-50` | Selected bg, light page bg |
| `color/teal/100` | `#CCFBF1` | `bg-teal-100` | Hover bg, chips, badges |
| `color/teal/200` | `#99F6E4` | `bg-teal-200` | Light accents |
| `color/teal/300` | `#5EEAD4` | `text-teal-300` | Focus rings, dark-mode hover, **Teal-300 logo fill** |
| `color/teal/400` | `#2DD4BF` | `bg-teal-400` | **Dark-mode primary actions** |
| `color/teal/500` | `#14B8A6` | `bg-teal-500` | Secondary actions, dark-mode `bg/brand` |
| `color/teal/600` | `#0D9488` | `bg-teal-600` | **PRIMARY — buttons, links, active states, primary logo fill** |
| `color/teal/700` | `#0F766E` | `bg-teal-700` | Hover / pressed (light) |
| `color/teal/800` | `#115E59` | `bg-teal-800` | Active states |
| `color/teal/900` | `#134E4A` | `bg-teal-900` | **Favicon glyph fill** |
| `color/teal/950` | `#042F2E` | `bg-teal-950` | Text on brand (dark mode) |

### 2.2 Primitives — Orange (accent)

Replaces the deprecated coral/rose accent (`#F43F5E` / `#E11D48`). Migrate all `color.accent.500/600` references.

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| `color/orange/50` | `#FFF7ED` | `bg-orange-50` | Accent tint bg |
| `color/orange/100` | `#FFEDD5` | `bg-orange-100` | Accent hover bg |
| `color/orange/200` | `#FED7AA` | `bg-orange-200` | Light accent fills |
| `color/orange/300` | `#FDBA74` | `bg-orange-300` | Dark-mode accent hover |
| `color/orange/400` | `#FB923C` | `bg-orange-400` | Dark-mode accent default |
| `color/orange/500` | `#FF6B00` | `bg-orange-500` | **Accent anchor — gamification, accent CTAs** |
| `color/orange/600` | `#EA580C` | `bg-orange-600` | Accent hover (light) |
| `color/orange/700` | `#C2410C` | `bg-orange-700` | Accent active (light) |
| `color/orange/800` | `#9A3412` | `bg-orange-800` | Deep accent |
| `color/orange/900` | `#7C2D12` | `bg-orange-900` | Darkest accent |
| `color/orange/950` | `#431407` | `bg-orange-950` | Ultra-dark accent |

### 2.3 Primitives — Slate (neutral)

Replaces the prior Gray ramp. Small hex shifts affect every neutral surface and text color.

| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| `color/slate/50` | `#F8FAFC` | `bg-slate-50` | **App bg (light)**, dark-mode text primary |
| `color/slate/100` | `#F1F5F9` | `bg-slate-100` | Disabled bg, tertiary bg (light) |
| `color/slate/200` | `#E2E8F0` | `border-slate-200` | Borders, separators |
| `color/slate/300` | `#CBD5E1` | `text-slate-300` | Border/strong, dark-mode body text |
| `color/slate/400` | `#94A3B8` | `text-slate-400` | ⚠ 3.0:1 — decorative only; dark-mode secondary text |
| `color/slate/500` | `#64748B` | `text-slate-500` | Tertiary text (minimum body on white) |
| `color/slate/600` | `#475569` | `text-slate-600` | **Secondary text, body text** |
| `color/slate/700` | `#334155` | `text-slate-700` | Dark-mode tertiary bg, dark-mode borders |
| `color/slate/800` | `#1E293B` | `bg-slate-800` | **Dark-mode surfaces (cards, `bg/secondary`)** |
| `color/slate/900` | `#0F172A` | `bg-slate-900` | **Dark-mode background** (`bg/primary`) |
| `color/slate/950` | `#020617` | `bg-slate-950` | Darkest neutral |

### 2.4 Primitives — Indigo (science / tech accent)

| Token | Hex | Usage |
|---|---|---|
| `color/indigo/500` | `#6366F1` | Links in science / tech contexts, gamification icons |
| `color/indigo/600` | `#4F46E5` | Focus rings (science contexts), secondary buttons |

### 2.5 Primitives — Pure

| Token | Hex |
|---|---|
| `color/white` | `#FFFFFF` |
| `color/black` | `#000000` |

### 2.6 Semantic tokens — Light & Dark

#### Brand

| Token | Light | Dark |
|---|---|---|
| `color/brand/primary` | `#0D9488` | `#2DD4BF` |
| `color/brand/primary-hover` | `#0F766E` | `#5EEAD4` |
| `color/brand/primary-active` | `#115E59` | `#99F6E4` |

#### Accent

| Token | Light | Dark |
|---|---|---|
| `color/accent/default` | `#FF6B00` | `#FB923C` |
| `color/accent/hover` | `#EA580C` | `#FDBA74` |
| `color/accent/active` | `#C2410C` | `#F97316` |

#### Background

| Token | Light | Dark |
|---|---|---|
| `color/bg/primary` | `#FFFFFF` | `#0F172A` |
| `color/bg/secondary` | `#F8FAFC` | `#1E293B` |
| `color/bg/tertiary` | `#F1F5F9` | `#334155` |
| `color/bg/inverse` | `#0F172A` | `#F8FAFC` |
| `color/bg/brand` | `#0D9488` | `#14B8A6` |
| `color/bg/accent` | `#FF6B00` | `#EA580C` |

#### Surface

| Token | Light | Dark |
|---|---|---|
| `color/surface/card` | `#FFFFFF` | `#1E293B` |
| `color/surface/elevated` | `#FFFFFF` | `#334155` |
| `color/surface/overlay` | `#F1F5F9` | `#1E293B` |

#### Text

| Token | Light | Dark |
|---|---|---|
| `color/text/primary` | `#0F172A` | `#F8FAFC` |
| `color/text/secondary` | `#475569` | `#94A3B8` |
| `color/text/tertiary` | `#64748B` | `#64748B` |
| `color/text/inverse` | `#FFFFFF` | `#0F172A` |
| `color/text/on-brand` | `#FFFFFF` | `#042F2E` |
| `color/text/on-accent` | `#FFFFFF` | `#FFFFFF` |
| `color/text/disabled` | `#94A3B8` | `#475569` |
| `color/text/link` | `#0D9488` | `#2DD4BF` |

#### Border

| Token | Light | Dark |
|---|---|---|
| `color/border/default` | `#E2E8F0` | `#334155` |
| `color/border/strong` | `#CBD5E1` | `#475569` |
| `color/border/brand` | `#0D9488` | `#2DD4BF` |
| `color/border/focus` | `#14B8A6` | `#5EEAD4` |

#### Feedback (resolved values)

| Token | Light | Dark |
|---|---|---|
| `color/feedback/success` | `#16A34A` | `#4ADE80` |
| `color/feedback/success-subtle` | `#F0FDF4` | `#052E16` |
| `color/feedback/warning` | `#EAB308` | `#FACC15` |
| `color/feedback/warning-subtle` | `#FEFCE8` | `#422006` |
| `color/feedback/warning-text` | `#A16207` | `#FDE047` |
| `color/feedback/error` | `#DC2626` | `#F87171` |
| `color/feedback/error-subtle` | `#FEF2F2` | `#450A0A` |
| **`color/feedback/info`** | **`#0D9488`** | **`#2DD4BF`** |

#### Interactive

| Token | Light | Dark |
|---|---|---|
| `color/interactive/default` | `#0D9488` | `#2DD4BF` |
| `color/interactive/hover` | `#0F766E` | `#5EEAD4` |
| `color/interactive/active` | `#115E59` | `#99F6E4` |
| `color/interactive/disabled-bg` | `#E2E8F0` | `#334155` |
| `color/interactive/disabled-text` | `#94A3B8` | `#475569` |

### 2.7 Contrast reference

| Combination | Ratio | AA |
|---|---|---|
| `slate/900` on `white` | 16.0 : 1 | ✅ |
| `slate/600` on `white` | 7.0 : 1 | ✅ |
| `slate/500` on `white` | 4.6 : 1 | ✅ (minimum body) |
| `teal/600` on `white` | 4.5 : 1 | ✅ (borderline) |
| `teal/400` on `slate/900` | 9.6 : 1 | ✅ |
| `white` on `teal/600` | 4.5 : 1 | ✅ |
| `slate/400` on `white` | 3.0 : 1 | ❌ decorative only |

---

## 3. Typography

### 3.1 Font families

| Family token | Family | Role | Fallback stack |
|---|---|---|---|
| `font-family/heading` | **Merriweather** (local variable font; Google Fonts fallback) | Display + headings | Georgia, "Times New Roman", serif |
| `font-family/body` | **Inter** | UI text, body, labels | -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif |
| `font-family/body-alt` | **Roboto** | Fallback / data-heavy contexts | "Segoe UI", sans-serif |
| `font-family/data` | **Roboto Mono** | Numeric displays, code | "SF Mono", "Fira Code", Consolas, monospace |

### 3.2 Primitive sizes

| Token | Px |
|---|---|
| `font-size/xs` | 12 |
| `font-size/sm` | 14 |
| `font-size/base` | 16 |
| `font-size/lg` | 18 |
| `font-size/xl` | 20 |
| `font-size/2xl` | 24 |
| `font-size/3xl` | 30 |
| `font-size/4xl` | 36 |
| `font-size/5xl` | 48 |

### 3.3 Semantic aliases

| Token | Px |
|---|---|
| `font-size/body-sm` | 14 |
| `font-size/body` | 16 |
| `font-size/body-lg` | 18 |
| `font-size/heading-sm` | 20 |
| `font-size/heading-md` | 24 |
| `font-size/heading-lg` | 30 |
| `font-size/heading-xl` | 36 |
| `font-size/display` | 48 |

### 3.4 Fifteen published text styles

| Style | Font | Size / LH | Weight | Tracking | Tailwind | Usage |
|---|---|---|---|---|---|---|
| **Display / 5xl** | Merriweather Bold | 48 / 56 | 700 | — | `text-5xl font-bold font-heading` | Hero / cover only |
| **Heading / xl** | Merriweather Bold | 36 / 44 | 700 | — | `text-4xl font-bold font-heading` | Marketing / large landing titles |
| **Heading / lg** | Merriweather Bold | 30 / 40 | 700 | — | `text-3xl font-bold font-heading` | Primary screen title |
| **Heading / md** | Merriweather Bold | 24 / 32 | 700 | — | `text-2xl font-bold font-heading` | Section heading |
| **Heading / sm** | Inter Bold | 20 / 28 | 700 | — | `text-xl font-bold` | Subsection heading |
| **Heading / xs** | Inter Semi Bold | 18 / 24 | 600 | — | `text-lg font-semibold` | Card title, modal title |
| **Body / lg** | Inter Regular | 18 / 28 | 400 | — | `text-lg` | Long-form readable body (seniors) |
| **Body / md** | Inter Regular | 16 / 24 | 400 | — | `text-base` | **Default body text** |
| **Body / sm** | Inter Regular | 14 / 22 | 400 | — | `text-sm` | Secondary copy, helper text |
| **Body / xs** | Inter Regular | 12 / 16 | 400 | — | `text-xs` | Metadata, micro-copy |
| **Label / lg** | Inter Semi Bold | 16 / 24 | 600 | 0.5 px | `text-base font-semibold` | Primary button labels |
| **Label / md** | Inter Semi Bold | 14 / 20 | 600 | 0.5 px | `text-sm font-semibold` | Standard UI labels, tabs |
| **Label / sm** | Inter Semi Bold | 12 / 16 | 600 | — | `text-xs font-semibold` | Compact labels, badges |
| **Caption** | Inter Regular | 12 / 16 | 400 | 0.25 px | `text-xs` | Captions, footnotes |
| **Overline** | Inter Semi Bold | 11 / 16 | 600 | 8 % (uppercase) | `text-[11px] font-semibold uppercase tracking-wider` | Section eyebrow |

### 3.5 Responsive scale

| Element | XS–SM (320–479) | MD (480–767) | LG–XL (768+) |
|---|---|---|---|
| Body | 16 | 16 | 18 |
| Body small | 14 | 14 | 16 |
| Heading / sm | 20 | 20 | 22 |
| Heading / md | 24 | 24 | 28 |
| Heading / lg | 30 | 30 | 32 |
| Caption | 12 | 12 | 14 |

Max line length at LG–XL: **65–75 characters**.

### 3.6 Loading Merriweather

```css
@font-face {
  font-family: "Merriweather";
  src: url("fonts/Merriweather-VariableFont_opsz_wdth_wght.ttf") format("truetype-variations");
  font-weight: 300 900;
  font-stretch: 87% 112%;
  font-style: normal;
  font-display: swap;
}

/* Fallback only — the local @font-face above is authoritative */
@import url("https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700;900&display=swap");
```

---

## 4. Logo System

Five publishable variants + a favicon. All SVG. See `brand-kit.md` §Logo for brand-level usage rules.

| Variant | File | viewBox | Fill | When to use |
|---|---|---|---|---|
| Primary Teal | `assets/logos/osteoplus-logo-primary-teal.svg` | `0 0 292 98` | `#0D9488` | **Default** on light surfaces |
| Black | `assets/logos/osteoplus-logo-black.svg` | `0 0 292 98` | `#000000` | Print, fax-safe, monochrome |
| Teal-300 on dark | `assets/logos/osteoplus-logo-teal-300.svg` | `0 0 292 98` | `#5EEAD4` | Dark-mode screens |
| White | `assets/logos/osteoplus-logo-white.svg` | `0 0 292 98` | `#FFFFFF` | Brand-colored heroes, dark photography |
| Original | `assets/logos/osteoplus-logo-original.svg` | `0 0 292 98` | Teal-600 + petal mark | Full-color marketing surfaces |
| Favicon | `assets/logos/favicon.svg` | `0 0 67 98` | `#134E4A` (teal-900) | Tab icon; deeper fill reads cleaner at favicon sizes |

Wordmark aspect ratio ≈ 2.98 : 1. The **"Ó"** acute accent is part of the mark — never drop it, never substitute "O".

### 4.1 Legacy filename migration

| Old | New |
|---|---|
| `osteoplus-logo-default.svg` | `osteoplus-logo-original.svg` |
| `osteoplus-logo-teal.svg` | `osteoplus-logo-primary-teal.svg` |
| `osteoplus-logo-teal-light.svg` | `osteoplus-logo-teal-300.svg` |

---

## 5. Iconography

- **Library:** `lucide-react` (ships with shadcn/ui)
- **Stroke width:** **2 px** (Lucide default, round cap/join)
- **Default size:** 24 × 24 px (`sizing/icon-md`); larger buttons scale to 28 px
- **Color:** inherits `currentColor`; default `color/text/*`

### 5.1 Icon size tokens

| Token | Px | Usage |
|---|---|---|
| `sizing/icon-sm` | 20 | Small inline icons |
| `sizing/icon-md` | 24 | Default, navigation |
| `sizing/icon-lg` | 32 | Feature icons, prominent icons |

### 5.2 Icon sets (7 sets · 79 variants)

| Set | Count | Names |
|---|---|---|
| `icon/navigation` | 12 | `arrow-up`, `arrow-down`, `arrow-left`, `arrow-right`, `chevron-up`, `chevron-down`, `chevron-left`, `chevron-right`, `close`, `menu`, `expand`, `collapse` |
| `icon/actions` | 14 | `plus`, `minus`, `trash`, `square-pen`, `funnel`, `search`, `ellipsis`, `upload`, `download`, `mouse-pointer-click`, `pointer`, `house`, `sun`, `moon` |
| `icon/communication` | 14 | `user-round`, `calendar`, `mail`, `bell`, `phone`, `tablet-smartphone`, `map-pin`, `eye`, `eye-closed`, `file`, `message-circle`, `mic`, `mic-off`, `smartphone` |
| `icon/status` | 15 | `check`, `circle-check-big`, `circle-alert`, `circle-x`, `triangle-alert`, `shield-check`, `shield-alert`, `shield-plus`, `info`, `loader`, `star`, `star-half`, `lock-keyhole`, `lock-keyhole-open`, `printer` |
| `icon/healthcare` | 11 | `stethoscope`, `heart`, `pill-bottle`, `dumbbell`, `file-user`, `carrot`, `wheelchair`, `footprints`, `sport-shoe`, `settings`, `person-arms-spread` |
| `icon/medical` | 6 | `brain`, `clipboard-plus`, `clipboard-list`, `scissors`, `dumbbell`, `paperclip` |
| `icon/award` | 7 | `trophy`, `medal`, `award`, `gem`, `goal`, `party-popper`, `quote` |

### 5.3 Icon rules

- Pair every icon with a visible label (critical for 60+)
- Wrap 24 px icons in a **48 × 48 px** invisible hit area
- **No emoji.** Gamification uses `flame`, `zap`, `trophy`, `medal`, `award`
- Icon-only buttons must carry an `aria-label`

---

## 6. Spacing, Grid & Layout

### 6.1 4-point grid — Primitive spacing (14 values)

| Token | Value | Tailwind |
|---|---|---|
| `spacing/0` | 0 | `p-0` |
| `spacing/1` | 4 | `p-1` |
| `spacing/2` | 8 | `p-2` |
| `spacing/3` | 12 | `p-3` |
| `spacing/4` | 16 | `p-4` |
| `spacing/5` | 20 | `p-5` |
| `spacing/6` | 24 | `p-6` |
| `spacing/8` | 32 | `p-8` |
| `spacing/10` | 40 | `p-10` |
| `spacing/12` | 48 | `p-12` |
| `spacing/14` | 56 | `p-14` |
| `spacing/16` | 64 | `p-16` |
| `spacing/20` | 80 | `p-20` |
| `spacing/24` | 96 | `p-24` |

### 6.2 Semantic spacing

| Token | Value |
|---|---|
| `spacing/xs` | 4 |
| `spacing/sm` | 8 |
| `spacing/md` | 16 |
| `spacing/lg` | 24 |
| `spacing/xl` | 32 |
| `spacing/2xl` | 48 |
| `spacing/3xl` | 64 |
| `spacing/touch-gap` | 8 |

### 6.3 12-column responsive grid

| Breakpoint | Min width | Columns | Gutter | Margin | Max content |
|---|---|---|---|---|---|
| XS | 320 | 4 | 16 | 16 | 100 % |
| SM | 390 | 4 | 16 | 20 | 100 % |
| MD | 480 | 8 | 24 | 24 | 100 % |
| LG | 768 | 12 | 24 | 32 | 800 px centered |
| XL | 1024 | 12 | 32 | 40 | 800 px centered |

---

## 7. Radius, Border & Elevation

### 7.1 Border radius — Primitive (7 values; no `radius/xs`)

| Token | Value | Tailwind |
|---|---|---|
| `radius/none` | 0 | `rounded-none` |
| `radius/sm` | 4 | `rounded-sm` |
| `radius/md` | 8 | `rounded-md` |
| `radius/lg` | 12 | `rounded-xl` |
| `radius/xl` | 16 | `rounded-2xl` |
| `radius/2xl` | 24 | `rounded-3xl` |
| `radius/full` | 9999 | `rounded-full` |

### 7.2 Radius — Semantic aliases

| Token | Value | Usage |
|---|---|---|
| `radius/button` | 8 | All button variants |
| `radius/input` | 8 | Inputs, selects |
| `radius/card` | 12 | Cards |
| `radius/chip` | 9999 | Pill-shaped chips |

### 7.3 Border width

| Token | Value | Usage |
|---|---|---|
| `border-width/thin` (primitive) | 1 | Default |
| `border-width/thick` (primitive) | 2 | Emphasis, focus |
| `border-width/default` (semantic) | 1 | Standard borders |
| `border-width/strong` (semantic) | 2 | Focus rings, emphasis |

### 7.4 Elevation (slate-900 ambient)

| Token | Composition | Usage |
|---|---|---|
| `elevation/sm` | `0 1px 2px 0 slate-900 @ 6%` | Buttons rest, low-relief cards |
| `elevation/md` | `0 4px 8px -1px @ 8%` + `0 2px 4px -2px @ 4%` | Elevated cards, bottom tab bar |
| `elevation/lg` | `0 12px 24px -4px @ 10%` + `0 4px 8px -2px @ 6%` | Modals, bottom sheets |
| `elevation/xl` | `0 24px 48px -8px @ 14%` + `0 8px 16px -4px @ 8%` | Toasts, hero overlays |

Focus state uses a 2 px ring (`color/border/focus`, 2 px offset) — never a shadow.

---

## 8. Sizing & Touch Targets

### 8.1 Minimums (non-negotiable for 60+)

| Element | Minimum | Recommended | Spacing between |
|---|---|---|---|
| Buttons | 48 × 48 | 56 × 48 | 8 px |
| List items | 48 h | 56 h | 0 (separator) |
| Form inputs | 48 h | 56 h | 16 px |
| Chips / pills | 48 × 48 | 48 × 48 | 8 px |
| Icon buttons | 48 × 48 | 48 × 48 | use `hitSlop` if icon < 48 |

### 8.2 Form element tokens

| Token | Px |
|---|---|
| `sizing/input-height` | 48 |
| `sizing/input-height-lg` | 56 |
| `sizing/button-height` | 48 |
| `sizing/button-height-lg` | 56 |
| `sizing/list-item-height` | 48 |
| `sizing/list-item-height-lg` | 56 |

### 8.3 Avatar sizes

| Size | px |
|---|---|
| sm | 32 |
| md | 40 |
| lg | 56 |
| xl | 80 |

---

## 9. Motion

Fast, quiet, purposeful. State-feedback only — **no decorative animation, no parallax, no auto-play video**.

| Property | Value |
|---|---|
| Base duration | 200 ms |
| Enter ease | `cubic-bezier(0.2, 0.8, 0.2, 1)` |
| Transition ease | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Bottom-sheet slide | 320 ms |
| Toast enter | 200 ms fade + slide-up, auto-dismiss 4 s |
| Button press | color + `scale(0.98)` for 80 ms |
| Reduced motion | All animations disabled; state changes instant |

---

## 10. Technology Stack

| Layer | Technology |
|---|---|
| Framework | **Next.js 15** (App Router, React 19) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 with CSS variables (shadcn/ui `new-york`) |
| UI primitives | shadcn/ui + Radix UI |
| Icons | lucide-react (2 px stroke) |
| Animation | Framer Motion |
| Forms | react-hook-form + Zod |
| Backend | Supabase (PostgreSQL, Auth, Edge Functions, RLS) |
| PWA | `@ducanh2912/next-pwa` |
| i18n | `next-intl` (ES / EN) |
| Dates | `date-fns` |
| Theming | `next-themes` (class strategy) |
| Hosting | Vercel (EU regions) |
| Testing | Vitest · Playwright · axe-core · Lighthouse CI |

---

## 11. Components — Inventory (39 components · 442 variants)

Full props, states, and TypeScript interfaces live in `ui-kit.md`. This section is the index.

### 11.1 Forms & input

Button (50 variants) · Icon Button (30) · Text Input (10) · Text Area (10) · Select (10) · Checkbox (24) · Radio (16) · Toggle (16) · Phone Input.

### 11.2 Containers

Card (6) · Divider (6) · Modal (6) · Bottom Sheet (4) · Accordion (4).

### 11.3 Navigation

Top Nav Bar (6) · Bottom Tab Bar (6) · Tabs (12).

### 11.4 Lists & rows

List Item (18) · Notification Item (6).

### 11.5 Feedback

Toast (8) · Alert Banner (8) · Badge (36) · Progress (8) · Skeleton (12) · Empty State (6).

### 11.6 Identity

Avatar (12).

### 11.7 Booking domain

Day Cell (8) · Time Slot (6) · Appointment Card (6) · Practitioner Card (4) · Intake Form Section (6) · Quick Action Tile (3).

### 11.8 Singles

Service Summary Card · Booking Summary Card · Confirmation Details Card · Logo × 5 variants.

### 11.9 Exercise / Gamification / Dashboard

VideoPlayer · LanguageTogglePill · PillSegmentedToggle · DateStrip · TimeSlotChip · SessionProgressHeader · RepCounterCard · PainInterruptModal · ControlDock · XPRing · StreakCounter · BadgeCard · LevelUpModal · TaskItem · MoodPicker · SafetyCalloutCard.

---

## 12. Patterns

### 12.1 Design principles — "Active Recovery"

1. **Accessibility First** — design for the least tech-confident 60+ user
2. **Trust Through Clarity** — show exactly what will happen before commit
3. **Progressive Disclosure** — reveal complexity only when needed
4. **Mobile-First, Thumb-Reachable** — primary actions in lower two-thirds
5. **Bilingual Parity** — ES and EN at equivalent quality, via `next-intl`

### 12.2 Interaction patterns

| Pattern | Do | Don't |
|---|---|---|
| Confirmation before destruction | Modal with consequences | Single-tap deletion |
| Inline validation | On blur, error below field | Validate only on submit |
| Optimistic updates | Show success immediately | Wait for server response |
| Loading states | Button spinner, skeleton for content | Blank screen |
| Empty states | Illustration + CTA | Blank list |
| Error recovery | Retry button + explanation | Generic error code |
| External handoff | Show ↗ icon + confirm | Open without warning |

### 12.3 Form patterns

- Labels always visible (persistent above field; never placeholder-only)
- Error on blur; focus first error on submit
- Consent unchecked by default (GDPR)
- Input ≥ 16 px (prevents iOS auto-zoom)
- Progressive wizard for long forms

### 12.4 State matrix

| State | Spec |
|---|---|
| Hover (desktop) | Primary → teal-700; cards → 1.5 px teal-600 border + `elevation/md`. **Never opacity** |
| Press | Primary → teal-800 + `scale(0.98)` 80 ms |
| Active / selected | Solid teal-600 + white text, or teal-50 + 1.5 px teal-600 outline |
| Disabled | slate-200 bg, slate-400 text, `cursor: not-allowed`. **Never opacity** |

### 12.5 Fixed / sticky elements

- **Bottom tab bar** — 64 px + safe area; 4 tabs (Home · Appointments · Exercises · Profile); upward `elevation/md`
- **Top nav bar** — 48–56 px; sticky; back chevron left, title center, trailing action right
- **Sticky CTAs** sit above the bottom tab bar with 16 px safe padding

### 12.6 Imagery

- Mostly white. Subtle `color/bg/secondary` or teal-50 for grouped/branded sections
- Photography warm, human, soft-lit; real clinic vibe over stock models; no duotones
- Illustrations minimal, line-based (bone, spine, joint) in teal-600 stroke matching Lucide weight
- Protection scrim on text-over-image: bottom-up gradient `rgba(15,23,42,0.7) → transparent`
- Modal overlay: `rgba(15,23,42,0.6)`; no backdrop blur

---

## 13. Accessibility & Compliance

### 13.1 WCAG 2.2 AA per-component checklist

```
□ Touch targets ≥ 48 px (primary CTAs ≥ 56 px)
□ Color contrast ≥ 4.5:1
□ Focus ring visible (2 px color/border/focus, 2 px offset)
□ Hover state defined (desktop)
□ Pressed state defined
□ Disabled state defined
□ Loading state defined (if async)
□ Error state defined (if input)
□ Works with 200% text scaling
□ Screen reader labels/descriptions
□ Keyboard accessible (tab order = visual order)
□ Respects prefers-reduced-motion
□ Supports ES/EN localization
□ Dark mode variant
□ No color-only indicators (icon + text paired)
```

### 13.2 GDPR / LOPDGDD

- Explicit consent for all sensitive health data; no pre-ticked checkboxes
- Privacy-first analytics — pain scores never transmitted to analytics platforms
- Medical records retained 7 years (Ley 41/2002 Art. 17); cannot be deleted on user request
- Full GDPR rights: access, rectification, deletion, portability; JSON export
- Privacy contact: `privacidad@osteoplus.es`
- Consent + privacy copy in both ES and EN

---

## 14. Deprecated token migration

| Deprecated | New | Hex change |
|---|---|---|
| `core.color.coral-500` (`#F43F5E`) | `color/orange/500` | `#FF6B00` |
| `core.color.gray-50–900` | `color/slate/50–950` | extended to 950 |
| `color.accent.500` (rose) | `color/accent/default` | `#FF6B00` light |
| `color.accent.600` (rose) | `color/accent/hover` | `#EA580C` light |
| `semantic.*.color.success` (`#22C55E`) | `color/feedback/success` | `#16A34A` |
| `semantic.*.color.warning` (`#F59E0B`) | `color/feedback/warning` | `#EAB308` |
| `semantic.*.color.danger` (`#EF4444`) | `color/feedback/error` | `#DC2626` |
| `color.info` (`#3B82F6` / `#2563EB`) | `color/feedback/info` | **`#0D9488` (brand teal)** |
| `color.feedback.error` (`#E11D48`) | `color/feedback/error` | **`#DC2626`** |
| `color.surface.default` | `color/surface/card` | — |
| `size.iconSm` (16 px) | `sizing/icon-sm` | **20 px** |
| `radius/xs` (2 px) | *(removed)* | use `radius/none` |
| `shadow.sm–xl` | `elevation/sm–xl` | recomposed |

---

## 15. Changelog

| Version | Date | Highlights |
|---|---|---|
| **4.1.0** | **2026-04-23** | Reconciliation release. All 7 open conflicts resolved (see §0). No new tokens. |
| 4.0.0 | 2026-04-18 | Figma v1.3 reconciliation: Accent → Orange, Neutrals → Slate, Merriweather headings, two-collection token architecture, 39 components / 442 variants. |
| 3.0.0 | 2026-03-04 | Comprehensive design system with implementation specs and screen specifications. |
| 2.0.0 | 2026-02-03 | Unified token naming, dark mode theme mapping. |
| 1.0.0 | 2025-12-14 | Initial design system. |

---

*End of `osteoplus-design-system.md` v4.1.0.*
