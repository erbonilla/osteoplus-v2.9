# Osteóplus — Brand Kit

**Document:** `brand-kit.md`
**Version:** 4.2.0 (supersedes 4.1.0 of 2026-04-23)
**Status:** Approved — aligned with `DESIGN_SYSTEM.md` v4.2.0
**Date:** 2026-05-08
**Owner:** Brand + DesignOps
**Figma Source:** `DesignSystemOsteoplus` (key `zM7bfBONIWsgvxH4KSff0J`) — library **v2.1** snapshot **2026-05-07**

This document is the **brand-level** source of truth. For implementation tokens, component specs, and Tailwind classes, see `osteoplus-design-system.md`. If the two disagree, `DESIGN_SYSTEM.md` v4.2.0 wins.

> **v4.2.0 update — token migration.** Three semantic shifts ripple through the brand:
> 1. **Filled CTA fill is now Teal-700 (`#0F766E`)** — not Teal-600. Teal-600 (`#0D9488`) is repositioned as the **brand border / icon-emphasis** color and remains the canonical Primary-Teal logo fill.
> 2. **Accent default is now Orange-700 (`#C2410C`)** — not Orange-500. Orange-500 (`#FF6B00`) remains a primitive but is no longer the accent fill on chrome.
> 3. **Focus ring is now Teal-500 (`#14B8A6`)** — tightens contrast against the new Teal-700 fills.
>
> The **Primary-Teal logo variant is unchanged** — the brand mark is still filled with Teal-600. The CTA shift only applies to filled buttons, links, and primary surfaces.

---

## 1. What we are

**Osteóplus** is a digital companion for osteopathy, physiotherapy, and rehabilitation patients in Barcelona. We combine **guest-first appointment booking** — a visit scheduled in under two minutes, no account required — with **a gamified daily rehab loop** that helps people actually do their exercises at home.

The product is PWA-first, bilingual (ES · EN), and engineered for adults 35–85 with the lowest-tech-confidence 60+ user as the primary persona.

### 1.1 Mission
Simplify and elevate the clinic experience through accessible, stress-free digital care.

### 1.2 Vision
Be Barcelona's most trusted digital companion for osteopathy, physiotherapy, and rehabilitation.

### 1.3 Values
Accessibility · Trust · Clarity · Care.

### 1.4 Positioning

> "Your neighbourhood osteopath has a really well-designed website."

We are **not** a healthtech startup and we are **not** a hospital portal. We live in the warm middle: clinical authority without clinical coldness.

---

## 2. Voice

The voice is **warm, clinical-clear, and quietly confident**. Think of a trusted family practitioner explaining things in plain language — not a marketing department, not a nurse reading a chart.

### 2.1 Tone rules

- **Plain language, 6th–8th grade reading level.** Symptom-based over clinical.
  ✅ "Help with back pain" ❌ "Lumbar assessment consultation"
- **You-voice, active verbs.** "Book your appointment." Never "Users should…"
- **Reassurance at every step.** Booking, exercising, and cancelling flows include confirmations, safety outs ("Call clinic"), and never shame the user for abandoning a task.
- **Bilingual parity.** ES and EN both first-class. Spanish is not a translation of English.
- **No jargon, no hype.** Avoid: *revolutionary, seamless, cutting-edge, simply, just, easily.*
- **No emoji** in UI chrome or copy.
- **Don't shout.** No ALL CAPS — use weight or color instead.

### 2.2 Casing

| Context | Case |
|---|---|
| In-app buttons, headings, labels, nav, modals, toasts | **Sentence case** |
| Form fields and empty states | **Sentence case** |
| Marketing display headlines on public site (hero, landing) | **Title Case** permitted |

The Title Case Figma specimens for in-app screens (e.g. "Book Your Appointment Today" as H-LG) are out-of-spec and scheduled for correction.

### 2.3 Specific phrasings

| Context | Pattern |
|---|---|
| Appointment statuses | Booked · Confirmed · Upcoming · Past · Cancelled · Rescheduled |
| Times | `Mon, Apr 14` · `10:30 – 11:15 AM` (space-en dash-space between times) |
| Errors | Never blame. "We couldn't connect — let's try again" not "Error: connection failed" |
| Empty states | Directive + kind. "No appointments yet. Book your first visit →" |
| Confirmations | Unambiguous. "You're all set. Confirmation sent to your email." |

### 2.4 Gamification language

Icon-based only (Lucide `flame`, `trophy`, `zap`, `medal`, `award`) — never emoji. Copy is motivating but never punishing: "Come back tomorrow" not "You broke your streak."

### 2.5 Brand spelling

**Osteóplus** is one word with an acute accent on the "ó". Never:
- Osteoplus
- OsteoPlus
- osteo+
- Osteo+

In body copy, the brand name can be italicized for emphasis; in running ES and EN text it does not need the ®/™ symbol.

---

## 3. Logo System

Five publishable logo variants + a favicon. Every file is a Figma Component and ships as SVG under `assets/logos/`.

### 3.1 Variants

| Variant | File | viewBox | Fill | Background |
|---|---|---|---|---|
| **Primary Teal** | `osteoplus-logo-primary-teal.svg` | `0 0 292 98` | `#0D9488` (teal-600) | **Default** — light surfaces, app headers, marketing |
| **Black** | `osteoplus-logo-black.svg` | `0 0 292 98` | `#000000` | Print, fax-safe, monochrome |
| **Teal-300 on dark** | `osteoplus-logo-teal-300.svg` | `0 0 292 98` | `#5EEAD4` | Dark-mode screens |
| **White** | `osteoplus-logo-white.svg` | `0 0 292 98` | `#FFFFFF` | Brand-colored hero blocks, photography |
| **Original** | `osteoplus-logo-original.svg` | `0 0 292 98` | Teal-600 + petal mark | Full-color marketing surfaces |
| **Favicon** | `favicon.svg` | `0 0 67 98` | `#134E4A` (teal-900) | Browser tab icon |

Wordmark aspect ratio ≈ **2.98 : 1**. Favicon aspect ratio ≈ **2 : 3**.

### 3.2 The "Ó" accent

The "Ó" acute accent is part of the mark. **Never drop it. Never substitute "O".** It sits top-center over the fifth letter and is preserved in every variant, including the favicon (which is a standalone "Ó" monogram).

### 3.3 Usage rules

| Rule | Requirement |
|---|---|
| Clear space | ½ the wordmark height on all sides |
| Minimum size (screen) | 24 px tall |
| Minimum size (print) | 12 mm tall |
| Rendering | Use SVG directly; never rasterize below 1 × of target output |
| Color | Only the five approved variants — never recolor outside the approved palette |
| Placement | Prefer neutral backgrounds. On photography use Black or White with the scrim in §3.5 |

### 3.4 Don'ts

| ❌ Don't | Why |
|---|---|
| Stretch, skew, or rotate | Distorts the custom letterforms |
| Add drop-shadow, outline, glow, or any FX | Breaks the flat brand vocabulary |
| Place on low-contrast backgrounds | Violates WCAG and the brand's trust principle |
| Replace the accented "Ó" with "O" | The accent is the identity |
| Recolor outside the five variants | Dilutes brand recognition |
| Lock the mark to an illustration or icon | The wordmark stands alone |

### 3.5 Variant-to-background matrix

| Background | Use |
|---|---|
| White / `bg/primary` (light) | Primary Teal |
| `bg/secondary` light (`#F8FAFC`) | Primary Teal |
| `bg/brand` (teal-600) | White |
| Dark mode `bg/primary` (`#0F172A`) | Teal-300 on dark |
| Dark mode `bg/secondary` (`#1E293B`) | Teal-300 on dark |
| Photography (light) | Black |
| Photography (dark) | White |
| Monochrome print / fax | Black |
| Full-color hero on white | Original |

Protection scrim for text-over-image: bottom-up linear gradient `rgba(15,23,42,0.7) → transparent`. Never a solid capsule behind text.

### 3.6 Favicon detail

The favicon uses **teal-900** (`#134E4A`), not teal-600 — the deeper fill reads cleaner at 16 / 32 / 48 px. Ship the SVG plus generated PNG sizes (16, 32, 48, 180) and `site.webmanifest` entries.

### 3.7 Legacy filename migration

| Old | New |
|---|---|
| `osteoplus-logo-default.svg` | `osteoplus-logo-original.svg` |
| `osteoplus-logo-teal.svg` | `osteoplus-logo-primary-teal.svg` |
| `osteoplus-logo-teal-light.svg` | `osteoplus-logo-teal-300.svg` |

---

## 4. Color

For tokens and Tailwind mappings, see `osteoplus-design-system.md` §2. This section is the brand summary.

### 4.1 Primary — Teal

| Swatch | Hex | Role (v4.2.0) |
|---|---|---|
| Teal-700 | **`#0F766E`** | **Filled CTA, link text, primary surfaces** ⭐ (was Teal-600) |
| Teal-600 | `#0D9488` | **Brand border + icon emphasis** (`color/border/brand`); **Primary-Teal logo fill** — unchanged |
| Teal-800 | `#115E59` | Pressed / active |
| Teal-500 | `#14B8A6` | **Focus ring** (`color/border/focus`); secondary actions |
| Teal-400 | `#2DD4BF` | Dark-mode filled CTA |
| Teal-300 | `#5EEAD4` | Dark-mode hover, dark-mode logo |
| Teal-50 | `#F0FDFA` | Brand-tinted backgrounds |

> **Brand mark exception.** The **Primary-Teal logo SVG keeps its `#0D9488` fill** — Teal-600 *is* the brand glyph color and was never a chrome color. The v4.2.0 shift only affects filled chrome (buttons, links, surfaces).

### 4.2 Accent — Orange

| Swatch | Hex | Role (v4.2.0) |
|---|---|---|
| Orange-700 | **`#C2410C`** | **Accent anchor** — gamification chrome, accent CTAs ⭐ (was Orange-500) |
| Orange-600 | `#EA580C` | Accent hover (light) |
| Orange-500 | `#FF6B00` | Retained primitive — illustration, charts, decorative gamification glyphs only |
| Orange-50 | `#FFF7ED` | Accent tinted background |

Orange replaces the deprecated coral / rose accent. The shift to Orange-700 brings the accent to AA on white at every accent-text combination and matches the deeper register of the new Teal-700 brand fills. Never use accent for critical actions — it is a highlight, not a CTA color.

### 4.3 Neutral — Slate

Cool-toned slate is the workhorse. Slate-600 for body text, Slate-900 for headings, Slate-200 for borders, Slate-50 for app background. Never use Slate-400 for body text (3.0:1 — decorative only).

### 4.4 Feedback

| Role | Light | Dark | Notes |
|---|---|---|---|
| Success | `#16A34A` | `#4ADE80` | |
| Warning | `#EAB308` | `#FACC15` | AA-safe text: `#A16207` on light |
| Error | **`#DC2626`** | `#F87171` | red-600 (not rose). Supersedes `#E11D48`. |
| **Info** | **`#0F766E`** | `#2DD4BF` | **Brand teal, not blue.** Now follows the Teal-700 brand-fill shift in v4.2.0. |

### 4.5 Palette governance

- **Always use token names** — never hard-code hex in code
- **Always reference Semantics** — never bind components to Primitives
- **No new colors** without a governance request; the palette is intentionally tight

---

## 5. Typography

| Role | Family | Loading |
|---|---|---|
| Display + headings | **Merriweather** | Local variable font (authoritative). Google Fonts fallback. |
| Body + UI | **Inter** | Google Fonts |
| Data / code | **Roboto Mono** | Google Fonts |
| Body alt | Roboto | Google Fonts |

Full size scale and text styles in `osteoplus-design-system.md` §3.

### 5.1 Brand typography rules

- Merriweather Bold for display and headings only. Never for UI chrome, buttons, or form labels
- Minimum body text 14 px; default 16 px; 18 px preferred for senior-facing content
- Input font ≥ 16 px (prevents iOS auto-zoom)
- Support 200 % scaling without breakage
- Max line length at desktop: 65–75 characters

---

## 6. Iconography

- **Library:** Lucide (`lucide-react`)
- **Stroke width:** **2 px** (Lucide default). Rationale: tested against a 60+ readability panel; 2 px scans better than a lightened 1.5 px stroke.
- **Cap / join:** round, always
- **Size:** 24 px default (sm 20 · md 24 · lg 32)
- **Color:** inherits `currentColor`; default `color/text/*`

**No emoji** — gamification uses Lucide `flame`, `zap`, `trophy`, `medal`, `award`.

---

## 7. Imagery & Photography

### 7.1 Photography

- Warm, human, soft-lit. Real clinic vibe over stock models
- Natural light, warm skin tones
- Subjects: hands-on therapy, older adults, Barcelona-feeling spaces
- Never: "healthcare model with tablet", corporate lab, stock smiles
- No duotones, no color filters

### 7.2 Illustration

- Minimal, line-based medical iconography (bone, spine, joint) in teal-600 stroke
- Stroke weight matches Lucide icon weight
- No 3D, no mascots, no decorative characters
- No repeating patterns, no grain, no textures

### 7.3 Chrome

- Mostly white. Subtle `color/bg/secondary` or teal-50 for grouped / branded sections
- **No gradients on chrome**
- No glassmorphism, no backdrop blur (modal overlays are solid `rgba(15,23,42,0.6)`)
- No parallax, no auto-playing video

---

## 8. Voice examples

### 8.1 CTA copy

| ✅ Do | ❌ Don't |
|---|---|
| Book appointment | Book Now! |
| Reschedule | Change My Booking |
| Cancel | Cancel Appointment |
| Continue | Next → |
| Start exercise | Begin Your Session |

### 8.2 Empty states

| Screen | Copy |
|---|---|
| No appointments | *No appointments yet. Book your first visit →* |
| No exercises assigned | *Your physio hasn't assigned exercises yet. [Contact clinic]* |
| No notifications | *All caught up.* |

### 8.3 Error recovery

| ❌ Wrong | ✅ Right |
|---|---|
| Error 500: Internal Server Error | Something went wrong. We'll try again — give us a moment. |
| Invalid credentials | We couldn't find that account. Check your email and try again. |
| Payment failed | Your card didn't go through. Try a different card or call the clinic. |

### 8.4 Safety-critical copy

Always provide a clinic phone-number escape hatch in error and cancellation flows. Never imply the user is at fault. When pain ≥ 7 during an exercise, the Pain Interrupt Modal reads:

> *We want to keep you safe. Pause this exercise and contact your physio.*

---

## 9. Contact & governance

| Topic | Contact |
|---|---|
| Brand questions | `brand@osteoplus.es` |
| Privacy / GDPR | `privacidad@osteoplus.es` |
| Design system changes | DesignOps via governance request |
| Bug reports | Linear `DSN` project |

Changes to this brand kit require DesignOps + Brand sign-off. Logo additions, color additions, and new voice patterns all go through governance.

---

## 10. Changelog

| Version | Date | Highlights |
|---|---|---|
| **4.2.0** | **2026-05-08** | Aligned with `DESIGN_SYSTEM.md` v4.2.0 (Figma library v2.1, snapshot 2026-05-07). Three audit-driven token shifts: filled CTA → Teal-700 (`#0F766E`); accent default → Orange-700 (`#C2410C`); focus ring → Teal-500 (`#14B8A6`). Brand mark fill unchanged (Primary-Teal logo stays `#0D9488`). Info color tracked to new Teal-700 brand fill. |
| 4.1.0 | 2026-04-23 | Aligned with canonical `DESIGN_SYSTEM.md` v4.1.0. Icon stroke confirmed 2 px (supersedes 1.5 px README value). Info color confirmed brand teal (supersedes blue). Error color confirmed red-600 (supersedes rose). Sentence case mandated for all in-app UI; Title Case permitted only for marketing display headlines. Merriweather local variable font declared authoritative. |
| 3.0.0 | 2026-04-18 | Expanded logo system to 5 variants + favicon. Orange accent replaces coral/rose. Slate replaces Gray neutral ramp. |
| 2.0.0 | 2026-02-03 | Bilingual voice, dark mode brand shifts. |
| 1.0.0 | 2025-12-14 | Initial brand kit. |

---

*End of `brand-kit.md` v4.2.0.*
