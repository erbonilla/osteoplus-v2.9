# Osteóplus Design System

Design system for **Osteóplus**, a PWA-first osteopathy, physiotherapy, and rehabilitation clinic based in Barcelona, Spain. The product combines **guest-first appointment booking** with a **gamified recovery platform** ("The Loop") for at-home exercise adherence.

The audience skews 60+, bilingual (Spanish primary, English secondary), and the system is built around three non-negotiables: **WCAG 2.2 AA**, **≥48dp touch targets**, and **plain-language copy over medical jargon**.

**Documentation version:** 4.1.0 (April 2026) — Beta launch prep.

> **Canonical source of truth:** `DESIGN_SYSTEM.md` v4.1.0. If this README disagrees, DESIGN_SYSTEM.md wins.

---

## 📁 File Index

| Path | What it is |
|---|---|
| `README.md` | This file — overview, content + visual foundations, iconography |
| `colors_and_type.css` | CSS custom properties: colors, type scale, spacing, radii, shadows, motion. Light + dark modes. |
| `SKILL.md` | Agent Skill entry point — read first when invoked as a skill |
| `DESIGN_SYSTEM.md` | **Canonical single source of truth** — all tokens, components, governance |
| `assets/logos/` | Brand logos (primary-teal, black, white, teal-300, original) + favicon |
| `preview/` | Small HTML cards rendered in the Design System tab |
| `ui_kits/mobile-app/` | Mobile PWA UI kit — device-framed clickable prototype + JSX components |
| `ui_kits/website/` | Marketing website / desktop PWA UI kit |
| `fonts/` | Web fonts (loaded from Google Fonts via `@import` in CSS) |

---

## Source Materials

- **Figma file:** `DesignSystemOsteoplus.fig` — 8 pages, 68 frames. Pages: Components, Icons, Typography, Color-Palette, Dark-Mode-Preview, Spacing-Sizing, Screen-Templates, Component-Documentation. Fonts: Inter (888×), Inter Semi Bold (734×), Merriweather Bold (108×), JetBrains Mono (30×). Dominant colors: Teal-600 `#0D9488` (543×) and the Slate neutral ramp.
- **Brand logos uploaded:** 5 SVGs — teal primary, black, white, teal-300 light, and a gradient default. All copied into `assets/logos/`.
- **Product doc:** Provided inline with overview of mission, features, target audience, roadmap, tech stack (Next.js 15 App Router with React 19, Tailwind v4, shadcn/ui new-york, Radix, Lucide icons, Supabase, next-intl ES/EN, next-pwa). Next.js 16 is a candidate upgrade once Turbopack ships stable but is not the current baseline.

---

## CONTENT FUNDAMENTALS

Copy is the product. The voice is **warm, clinical-clear, and quietly confident** — never salesy, never condescending, never overly clinical. Think of a trusted family practitioner explaining things in plain language, not a marketing department.

### Tone and voice
- **Plain language, 6–8th grade reading level.** Symptom-based over clinical. ✅ "Help with back pain" — ❌ "Lumbar assessment consultation."
- **You-voice, active verbs.** "Book your appointment" / "Bring your referral letter" / "We'll send a reminder." Never "Users should…" or "Patients must…"
- **Reassurance at every step.** Booking, exercising, and cancelling flows all include confirmations, safety outs ("Call clinic"), and never shame the user for abandoning a task.
- **Bilingual parity.** Every string ships in Spanish (primary) and English. Spanish is not a translation of English — both are first-class.
- **No jargon, no hype.** Avoid "revolutionary," "seamless," "cutting-edge." Avoid "simply," "just," "easily" — they imply the user is at fault if they struggle.

### Casing
- **Sentence case** for UI chrome — buttons, headings, labels, nav items: "Book appointment," not "Book Appointment." **Title Case is permitted only for marketing display headlines** on the landing site (e.g. "Gentle Care For Every Body"). The stray Title Case Figma specimens for in-app screens are out-of-spec and will be corrected.
- **Osteóplus** always carries the acute accent on the ó. Never "Osteoplus" or "Osteo+" in user-facing copy.
- **Don't shout.** No ALL CAPS for emphasis. Use weight or color instead.

### Specific phrasings
- Appointments: "Booked," "Confirmed," "Upcoming," "Past," "Cancelled," "Rescheduled." Past-tense for completed actions.
- Times: "Mon, Apr 14" and "10:30 – 11:15 AM" (space-en dash-space between times; abbreviated weekday + month).
- Errors: never blame. "We couldn't connect — let's try again" not "Error: connection failed."
- Empty states: directive + kind. "No appointments yet. Book your first visit →"
- Confirmation microcopy: unambiguous. "You're all set. Confirmation sent to your email."

### Emoji
**No emoji** in UI chrome or copy. This is a healthcare product serving older adults; emoji feel infantilizing and inconsistent across platforms. The exception is gamification (badges, streaks) where icon-based iconography is used *instead* of emoji — custom Lucide icons for the badge system.

### Vibe
Calm, trustworthy, gently motivating. Think "your neighbourhood osteopath has a really well-designed website" — not "healthtech startup" and not "hospital portal." Warmth comes from generous spacing, the slate-on-white palette with teal moments, and Merriweather's subtle serif bringing editorial warmth against Inter's utility.

### Specific copy examples pulled from Figma
- Display: "Gentle Care for Every Body"
- H-LG: "Book Your Appointment Today"
- H-MD: "Treatment Options & Specialties"
- H-SM: "What to Expect During Your Visit"
- Body: "Our clinic specializes in gentle, evidence-based treatments tailored for older adults. Each session is designed to improve mobility, reduce pain, and enhance your quality of life."
- Caption: "Last updated: April 5, 2026 · Terms & Conditions apply · ABN 12 345 678 901"
- CTA label: "Book Appointment" / "Reschedule" / "Cancel"

---

## VISUAL FOUNDATIONS

### Palette
- **Primary — Teal.** `#0D9488` (Teal-600) is the brand. It carries CTAs, active states, links, brand accents, and the primary nav indicator. Hover goes darker to Teal-700, pressed to Teal-800. Subtle backgrounds use Teal-50 (`#F0FDFA`). Focus ring is a 3px `rgba(13,148,136,0.25)` halo.
- **Accent — Orange.** `#FF6B00` (Orange-500) is warm and sparing. Used for streak flames, ratings, gamification highlights, and the one or two moments that need to punch above the calm teal. Orange-500 on orange-50 is the callout pattern.
- **Neutrals — Slate.** Cool-toned slate is the workhorse. Slate-700 body text, Slate-500 secondary, Slate-400 placeholder (never body — fails WCAG), Slate-300 input borders, Slate-200 dividers, Slate-100 muted backgrounds, Slate-50 surface.
- **Feedback.** Success `#16A34A` on `#F0FDF4`, Warning `#EAB308` on `#FEFCE8` (AA-safe text `#A16207`), Error `#DC2626` on `#FEF2F2`, Info `#0D9488` on `#F0FDFA` (info uses brand teal, **not** blue — aligns informational messaging with the brand). Always a base + subtle paired.
- **Dark mode.** Slate-900 background, Slate-800 surface, Slate-700 raised. Brand shifts *lighter* (Teal-500) on dark to maintain contrast.

### Typography
Two families, one utility.
- **Merriweather Bold** — display and headings (48 / 30 / 24 / 20). Editorial warmth; softens the clinical register. Reserved for titles and section headers. Never for UI chrome.
- **Inter** — everything else. Regular for body, Semi Bold for labels and navigation, Bold for buttons and emphasis. Sizes: 18 (body-lg), 16 (body/button-lg), 15 (label-lg), 14 (body-sm/button), 13 (label), 12 (caption/badge).
- **JetBrains Mono Regular** — 11px, code/numeric callouts only. Rare.
- **Line heights are generous.** 26/16 body, 22/14 small, 28/18 large. Readable at arm's length for 60+ users.
- **Minimum body text: 14px.** Below that is never permitted on mobile.

### Spacing and layout
- **4px grid.** Every spacing token is a multiple: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96.
- **Touch targets ≥ 48px. Primary CTAs = 56px.** Small visual elements (checkboxes, 24px icons) are wrapped in invisible 48px hit-area frames.
- **Grids.** Mobile: single column, 16px gutters, 375/430px design width. Tablet: 2-column, 24px gutters, 768px. Desktop: 12-col, 24px gutters, 1280px max width.
- **Generous vertical rhythm.** Section gaps are 48–64px; card padding 16–20px; inline icon-to-text gap 8px.

### Corners
- `radius/none` 0px — sharp corners, full-bleed elements
- `radius/sm` 4px — small badges, chips, tags
- `radius/md` 8px — **buttons, inputs, text fields** (default)
- `radius/lg` 12px — **cards** (default)
- `radius/xl` 16px — modals, bottom sheets
- `radius/2xl` 24px — large containers, hero cards
- `radius/full` — avatars, pills, status badges

> Note: there is no `radius/xs`. If you need a tighter corner than `sm` (4px), use `radius/none`.

### Cards
Flat, white, `radius/lg` (12px), **1px slate-200 border**, no shadow by default. Interactive cards gain `shadow-md` on hover plus a teal-600 border. Appointment cards use a tinted Teal-50 background with a **1.5px Teal-600 outline** — strong "this is active" state instead of a busy shadow. Cards are never pure drop-shadow floaters; the system leans on borders.

### Backgrounds and imagery
- **Mostly white.** Calm, clinical, trustworthy. Subtle backgrounds (Slate-50 or Teal-50) denote grouped sections or branded moments.
- **No repeating patterns, no grain, no gradients on chrome.** The only background tint is the flat Teal-50 behind branded callouts and the flat Slate-50 behind secondary surfaces.
- **Photography is warm, human, and soft-lit.** Clinic spaces, hands-on therapy, older-adult patients. Never stock "healthcare model with tablet." Always real-clinic vibe, natural light, warm skin tones. Duotones are not used.
- **Illustrations: minimal.** If used, line-based medical iconography (bone, spine, joint) in Teal-600 stroke — matching the Lucide stroke weight and join. No 3D, no mascots.

### Borders and dividers
- **1px Slate-200** is the default divider and card border.
- **1px Slate-300** for input borders (stronger, visible for 60+ eyes).
- **1.5px Teal-600** for active/selected state borders (day cells, appointment cards).
- Dividers run edge-to-edge inside cards — no padding inset — and are always flat, never shadowed.

### Shadows
This system is **border-first, shadow-light.** Shadows are subtle and reserved for:
- `shadow-sm` — default on modals, dropdowns, bottom sheets
- `shadow-md` — hovered interactive cards, raised toast
- `shadow-lg` — only on modals that *float* over the page (rare)
Focus state uses a **3px ring** (`rgba(13,148,136,0.25)`), not a shadow.

### Motion
- **Fast, quiet, purposeful.** `200ms` base duration, `cubic-bezier(0.2, 0.8, 0.2, 1)` ease-out for entrances, `cubic-bezier(0.4, 0, 0.2, 1)` for transitions.
- **Fades over slides.** State changes (button press, selection) use color + 1–2px scale, not bouncing transforms. Bottom sheets slide up with `320ms` slow ease. Toast enters from bottom, 200ms, fades out at 4s.
- **No parallax, no auto-playing video, no decorative animations.** The motion serves state feedback only. Respects `prefers-reduced-motion`.

### Hover + press states
- **Hover (desktop only):** primary CTA → Teal-700; secondary → slate-50 background; cards → 1.5px teal-600 border + shadow-md. Opacity is never used for hover.
- **Press:** primary CTA → Teal-800 + `scale(0.98)` for 80ms; secondary → slate-100 background. Tactile but restrained.
- **Active/selected:** solid Teal-600 fill with white text, or Teal-50 fill + Teal-600 outline for less-loud selection.
- **Disabled:** Slate-200 background, Slate-400 text, `cursor: not-allowed`. No opacity hack.

### Transparency and blur
Largely avoided. No frosted glass, no backdrop blur. The one exception is modal overlays: `rgba(15,23,42,0.6)` scrim over the page, no blur. Chip/badge background tints (e.g. Teal badge) use opaque `--teal-600` with white text — not translucent.

### Protection (legibility over imagery)
When text sits over an image (rare — hero units on the marketing site), a **bottom-up linear gradient scrim** from `rgba(15,23,42,0.7)` → transparent is used. Never a solid capsule behind text.

### Fixed/sticky elements
- **Bottom tab bar:** 64–72px, `radius-0`, 1px top border slate-200, white surface, sits above safe-area inset. Active tab gets a 3px Teal-600 pill indicator at the top + Teal-600 icon + label.
- **Top nav bar:** 48–56px, sticky, white + 1px bottom border slate-200. Title center, back chevron left, trailing action right.
- **Sticky CTAs** on booking flow sit above the bottom tab bar with a 16px safe padding.

### A couple of "house rules" worth calling out
- **No emoji. No stock illustrations. No gradients on chrome.**
- **Slate-400 is decorative-only** (fails WCAG AA at 3.0:1). Minimum body text is Slate-500 (5.0:1).
- **Dark mode is a first-class citizen** via `next-themes` + CSS variable swap.
- **Every interactive element ≥48px.** Including tiny visual elements (wrap them in a 48px hit frame).

---

## ICONOGRAPHY

**Icon system: Lucide** (lucide.dev) — the open-source fork of Feather icons, which ships with shadcn/ui and is the stated icon library in the product's tech stack.

### Specs
- **Base size:** 24×24px. Larger buttons scale icon to 28px.
- **Stroke width:** 2px (Lucide default). Tested at 24px against a 60+ readability panel — the 2px stroke scans meaningfully better than a 1.5px lightened variant, and we prefer Lucide's default for forward compatibility.
- **Stroke cap + join:** round. Always.
- **Color:** inherits `currentColor` via the icon font CSS var. Defaults to `--text` (slate-900); brand icons use `--brand` (teal-600); inactive tab icons use `slate-400`.
- **Touch target:** wrap in 48px invisible frame, never tap the raw 24px element.

### Delivery in this design system
Lucide is loaded from CDN via `<script src="https://unpkg.com/lucide@latest"></script>` in every HTML example and UI kit, then `lucide.createIcons()` is called on load. The icon name maps 1:1 with Lucide's catalog: `calendar`, `map-pin`, `user-round`, `message-circle`, `house`, `stethoscope`, `pill-bottle`, `brain`, `clipboard-plus`, `arrow-right`, `plus`, `quote`, `printer`, `scissors`, `weight`, `person-standing`, `wheelchair`, `flame` (streaks), `trophy` (badges), `zap` (XP), `heart`, etc. These come directly from the Figma icon library's category labels (Navigation / Actions / Communication / Healthcare / Medical / Status / Award).

### Emoji and unicode
**Never used** as icons. This includes gamification — streaks use Lucide `flame`, XP uses `zap`, badges use `trophy`, not 🔥 / ⚡ / 🏆. Emoji rendering is inconsistent across platforms and visually out of character with the rest of the system.

### Brand marks
Five logo variants + a favicon in `assets/logos/`:
- `osteoplus-logo-primary-teal.svg` — **primary brand mark** (Teal-600 flat, `#0D9488`). Use on white and light backgrounds.
- `osteoplus-logo-black.svg` — for mono applications, print, fax-safe.
- `osteoplus-logo-white.svg` — for dark backgrounds, brand-colored hero blocks, photography overlays.
- `osteoplus-logo-teal-300.svg` — Teal-300 tint (`#5EEAD4`), for dark-mode screens.
- `osteoplus-logo-original.svg` — full-color original with subtle petal mark, for marketing surfaces.
- `favicon.svg` — standalone "Ó" monogram in Teal-900 (`#134E4A`, not teal-600 — deeper fill reads cleaner at favicon sizes).

Legacy filename migration: `osteoplus-logo-teal.svg` → `osteoplus-logo-primary-teal.svg`, `osteoplus-logo-teal-light.svg` → `osteoplus-logo-teal-300.svg`, `osteoplus-logo-default.svg` → `osteoplus-logo-original.svg`.

The wordmark is **`Osteóplus`** with the acute accent — never drop it. The mark is a bold custom serif; the "O" and "+" carry a rotational mark / flourish you can see in the default variant.

---

## Notes / Caveats

- **Figma JSX is pseudocode** — it's reconstructed from the .fig binary and may not compile. The colors, typography, spacing, and component structure are accurate; exact token variable aliases and per-character text styles are approximated.
- **Fonts.** Merriweather ships as a local variable font (`fonts/Merriweather-VariableFont_opsz_wdth_wght.ttf`) declared via `@font-face` for licensing certainty and offline/PWA support. Inter, Roboto, and Roboto Mono are loaded from Google Fonts via `@import` in `colors_and_type.css`. The variable-font file is authoritative; the Google Fonts `@import` for Merriweather is a fallback for contexts where the local file cannot load.
- **Icon library.** Lucide is named in the tech stack, so it is *not* a substitution — this is the correct library. Where specific icons don't exist in Lucide, close substitutes are noted inline.
