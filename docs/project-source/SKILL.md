# Osteóplus Design System — Skill

When invoked via this skill, you are helping someone design **for the Osteóplus brand** — an osteopathy, physiotherapy, and rehabilitation clinic in Barcelona. The product is a PWA with a **guest-first booking flow** and a **gamified at-home exercise system called The Loop**.

## Before you do anything

1. Read `README.md` in full — it contains the voice, visual foundations, iconography, content rules, and caveats. Non-negotiables live there.
2. Skim the preview cards in `preview/` to lock the visual vocabulary.
3. When designing a screen or component, copy the relevant example from `ui_kits/mobile-app/` or `ui_kits/website/` and adapt — do not start from scratch.

## Hard rules — never break these

- **WCAG 2.2 AA** baseline; Slate-400 is decorative-only (fails contrast for body text).
- **Minimum touch target: 48px.** Primary CTAs are 56px.
- **Minimum body text: 14px on mobile.** Generous line-heights for 60+ readers.
- **No emoji.** Use Lucide icons at 24px, stroke 1.5, round caps.
- **Plain language, sentence case** for UI chrome. Title Case only in marketing display headlines.
- **Spanish is first-class**, not a translation. Parity with English at every step.
- **Every interactive state has a visible focus ring** — 3px Teal-600 @ 25% alpha. Never rely on color alone.
- **The wordmark is `Osteóplus`** — the acute ó is never dropped.

## Quick tokens reference

- Brand: **Teal-600 `#0D9488`** · Hover Teal-700 · Pressed Teal-800 · Subtle Teal-50
- Accent: **Orange-500 `#FF6B00`** — gamification only (streaks, XP, badges)
- Neutrals: **Slate 50–900** · body text Slate-700+, secondary Slate-500+
- Radii: buttons/inputs 8px, cards 12px, sheets 16px, pills full
- Spacing: 4px grid (4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96)
- Shadows: border-first system; shadows are subtle and rare

## Typography

- **Merriweather Bold** — display and headings only (loaded from `fonts/` as variable TTF)
- **Inter** — body, labels, buttons, nav (everything else)
- **JetBrains Mono** — data/numerics only, rare

## Iconography

- **Lucide** (lucide.dev) — matches shadcn/ui default; 24px, 1.5px stroke, round caps.
- Load via `<script src="https://unpkg.com/lucide@latest"></script>` then `lucide.createIcons()`.
- Brand-specific glyphs: `flame` (streaks), `zap` (XP), `trophy` (badges), `stethoscope`, `clipboard-plus`, `person-standing`, `wheelchair`, `pill-bottle`, `brain`.

## When in doubt

- **Does the choice respect a 60+ patient with mild arthritis and tired eyes?** If not, change it.
- **Does it add noise without adding meaning?** Remove it.
- **Is the language something a warm, honest osteopath would actually say?** If not, rewrite it.

## File map

| Path | For |
|---|---|
| `README.md` | Full system docs — always read first |
| `colors_and_type.css` | Import this in every artifact. Ships tokens as CSS variables. |
| `assets/logos/` | 5 wordmark SVG variants |
| `preview/*.html` | Canonical component examples |
| `ui_kits/mobile-app/Mobile App UI Kit.html` | 8 hi-fi mobile screens |
| `ui_kits/website/Website UI Kit.html` | Homepage + booking strip |
| `fonts/` | Merriweather variable TTFs (upload, not CDN) |
