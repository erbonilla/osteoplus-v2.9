# Osteóplus — UI Kit

**Document:** `ui-kit.md`
**Version:** 1.1.0
**Status:** Approved — aligned with `DESIGN_SYSTEM.md` v4.2.0 and `COMPONENT_API.md` v1.1.0
**Date:** 2026-05-08
**Owner:** DesignOps
**Audience:** Designers and engineers looking up how a component looks, what props it takes, and when to use it.

This is the **component catalog** — the index from component name to spec, to Figma variant, to code location. For token definitions, see `osteoplus-design-system.md`. For voice + visual rules, see `style-guide.md`.

> **v1.1.0 update.** Tracks `DESIGN_SYSTEM.md` v4.2.0 and the **§17 Component Maturity & Audit** snapshot of 2026-05-07. Three token shifts ripple through every filled component: brand fill → Teal-700 (`#0F766E`); accent default → Orange-700 (`#C2410C`); focus ring → Teal-500 (`#14B8A6`). Maturity status (Stable / Beta / Candidate / Deprecated) is now stamped on every component below. Four duplicate patterns are consolidated — see §2.1.

---

## 0. At a glance

- **39 components** (31 variant sets + 8 singles, including 5 logos)
- **442 total variants**
- **79 icons** across 7 sets (Lucide, 2 px stroke)
- **Maturity (snapshot 2026-05-07):** 14 Stable · 11 Beta · 7 Candidate · 0 Deprecated (4 consolidation candidates flagged)
- **Storybook:** `https://storybook.osteoplus.internal/`
- **Figma:** `DesignSystemOsteoplus` (key `zM7bfBONIWsgvxH4KSff0J`) — library **v2.1**
- **Code:** `/components/ui/*` (shadcn primitives) and `/components/domain/*` (product-specific)
- **P0 prop contracts:** `COMPONENT_API.md` v1.1.0

---

## 1. How to use a component

Every entry in this catalog gives you four things:

1. **When to use** and **when not to use**
2. **Variants** (Figma `Property=Value` shape)
3. **Required a11y** (labels, roles, focus management)
4. **Code location** (relative to repo root)

### 1.1 The five rules

1. **Tokens only.** No hard-coded hex, no Primitive references — always Semantics.
2. **Label everything.** Every interactive element has a visible label or `aria-label`.
3. **48 × 48 min** touch targets. 56 × 48 for primary CTAs.
4. **Every screen ships a dark-mode variant.** No exceptions.
5. **Every screen ships ES + EN strings.** Copy via `next-intl`.

---

## 2. Component categories

| # | Category | Components | Variants |
|---|---|---|---|
| 1 | Forms & input | 9 | 196 |
| 2 | Containers | 5 | 26 |
| 3 | Navigation | 3 | 24 |
| 4 | Lists & rows | 2 | 24 |
| 5 | Feedback | 6 | 78 |
| 6 | Identity | 1 | 12 |
| 7 | Booking domain | 6 | 33 |
| 8 | Singles | 8 | — |
| 9 | Exercise / Gamification / Dashboard | 16 | 49 |

### 2.1 Maturity overview (snapshot 2026-05-07)

Every component carries a maturity status. Promotion to **Stable** requires the gate in `DESIGN_SYSTEM.md` §17.5.

| Status | Components |
|---|---|
| **Stable** | Button · Icon Button · Text Input · Text Area · Checkbox · Radio · Toggle · Top Nav Bar · Bottom Tab Bar · Appointment Card · Practitioner Card · SideNavItem · TimeSlot · StatCard |
| **Beta** | Toast · Modal · CalendarStrip (DateStrip) · Tabs · ProgramCard · Alert Banner · Bottom Sheet · Progress · Intake Form Section · Notification Item · DateBlock |
| **Candidate** | StreakPill · ListItem v2.0 · Skeleton · Tooltip · EmptyStateInline · BarChart · ProgressRing |
| **Deprecated** | none yet — four duplicate patterns flagged below |

### 2.2 Duplicate-pattern consolidations (v4.2.0)

| Area | Decision | Removal target |
|---|---|---|
| **Toast** | v2.0 (`281:7245`) is canonical. Legacy (`6:379`) → **Deprecated**. | v4.4.0 |
| **Modal** | v2.0 (`281:7246`) is canonical for app dialogs. Legacy (`7:803`) **Deprecated** unless retained as an alert-confirmation variant. | resolve before v4.3.0 |
| **Tabs** | Foundation Tabs for generic tab patterns; v2.0 Tabs **only** for the Today/Library/Progress rehab/dashboard pattern. Re-evaluate consolidation. | v4.3.0 |
| **ListItem** | v2.0 ListItem replaces foundation List Item once it has ≥3 real-screen placements; until then both remain (v2.0 = Candidate). | TBD |
| **Marketing sections** | App System (this doc §11) vs Marketing Website System (`ui_kits/website/`). **Cross-use is forbidden.** | n/a |

---

## 3. Forms & input

### 3.1 Button — **Stable**

**When:** any primary action. **When not:** navigation (use links), destructive confirmations (wrap in a modal).

| Prop | Values |
|---|---|
| `variant` | Primary · Secondary · Outline · Ghost · Accent · Destructive · Text |
| `size` | sm (40 h) · md (48 h) · lg (56 h) |
| `state` | Default · Hover · Pressed · Focus · Disabled · Loading |
| `iconPosition` | None · Leading · Trailing · Only |

- 50 variants
- **v4.2.0:** Primary fill is **Teal-700 (`#0F766E`)**, hover Teal-800, accent variant is **Orange-700 (`#C2410C`)**, focus ring is **Teal-500 (`#14B8A6`)**
- `radius/button` 8 px, Label / lg typography
- Loading state: replace icon+label with spinner, keep width
- **One Primary per view.** If you feel you need two, one is actually Secondary
- Canonical Figma node: `5:896`. Marketing-site buttons (`177:358`, hero variants) live under the Website kit only — do not cross-use
- Code: `/components/ui/button.tsx` (props in `COMPONENT_API.md` v1.1.0)

### 3.2 Icon Button — **Stable**

**When:** compact actions in toolbars, list-item trailing actions, modal close. **When not:** primary CTAs.

- 30 variants (primary · secondary · ghost × 5 sizes × 2 states)
- 48 × 48 minimum hit area even if the icon is 20 × 20
- `aria-label` required
- v4.2.0 fills track Button (Teal-700 primary, Orange-700 accent, Teal-500 focus)
- Code: `/components/ui/icon-button.tsx`

### 3.3 Text Input — **Stable**

**When:** any freeform text entry.

| Prop | Values |
|---|---|
| `state` | Default · Focus · Filled · Error · Disabled |
| `size` | md (48 h) · lg (56 h) |

- 10 variants
- **Persistent visible label above the field** — never placeholder-only
- Helper text below; error text replaces helper on error state
- Input font ≥ 16 px (prevents iOS auto-zoom)
- Focus ring: Teal-500 (`#14B8A6`), 2 px, 2 px offset (v4.2.0)
- Code: `/components/ui/input.tsx` (props in `COMPONENT_API.md` v1.1.0)

### 3.4 Text Area — **Stable**

**When:** multi-line freeform (intake notes, message to practitioner).

- 10 variants
- Min height 80 (md) / 120 (lg); max 240 scrollable
- Character counter on fields with a max
- Code: `/components/ui/textarea.tsx`

### 3.5 Select — **Beta**

**When:** 5+ mutually exclusive options, or when options are dynamic. **When not:** 2–4 options (use Radio) or 2 options (use Toggle).

- 10 variants
- Keyboard: Arrow keys + Enter/Escape; type-ahead supported
- Code: `/components/ui/select.tsx`

### 3.6 Checkbox — **Stable**

**When:** multi-select, boolean opt-ins.

- 24 variants (6 states × checked/unchecked × size)
- 48 × 48 touch target (hit area wraps 20 × 20 box)
- **Default unchecked for consent (GDPR)**
- Code: `/components/ui/checkbox.tsx`

### 3.7 Radio — **Stable**

**When:** 2–5 mutually exclusive options.

- 16 variants
- Labels always clickable
- Code: `/components/ui/radio-group.tsx`

### 3.8 Toggle — **Stable**

**When:** binary settings ("Enable reminders").

- 16 variants
- Track 52 × 32, thumb 24 × 24; 200 ms ease
- `aria-checked` + `role="switch"`
- Code: `/components/ui/switch.tsx`

### 3.9 Phone Input — **Beta**

**When:** phone number entry in booking and profile flows.

- Default country **Spain (+34)**
- Country picker chip on the left, numeric input on the right
- Formats on blur: `+34 93 123 45 67`
- Code: `/components/domain/phone-input.tsx`

---

## 4. Containers

### 4.1 Card (Default · Elevated · Outlined)

- 6 variants
- `radius/card` 12 px; padding 16 px; border 1 px `color/border/default`
- Elevated adds `elevation/md`
- Interactive card on hover: 1.5 px `color/border/brand` + `elevation/md`
- Code: `/components/ui/card.tsx`

### 4.2 Divider

- 6 variants (horizontal · vertical × thin · strong × with/without label)
- 1 px `color/border/default`
- Code: `/components/ui/divider.tsx`

### 4.3 Modal — **Beta** (canonical = `281:7246`)

- 6 variants
- 90 % width, max 400 px; `radius/xl` 16 px
- Focus trap; `aria-modal="true"`; Esc to close
- Overlay: `rgba(15,23,42,0.6)`, no blur
- **Consolidation:** legacy Modal `7:803` is **Deprecated** unless retained as a distinct alert-confirmation variant; resolve before v4.3.0
- Code: `/components/ui/modal.tsx` (props in `COMPONENT_API.md` v1.1.0)

### 4.4 Bottom Sheet — **Beta**

- 4 variants (sm · md · lg · full)
- `radius/xl` 16 px on top corners; 32 × 4 px drag handle
- Max 90 % viewport height; swipe-down dismiss
- Code: `/components/ui/bottom-sheet.tsx`

### 4.5 Accordion — **Beta**

- 4 variants
- `aria-expanded` + smooth 200 ms height transition
- Code: `/components/ui/accordion.tsx`

---

## 5. Navigation

### 5.1 Top Nav Bar — **Stable**

- 6 variants (default · with-back · with-action · centered-title · large-title · collapsed)
- 56 h; 48 × 48 back button
- Sticky with 1 px bottom `color/border/default`
- Code: `/components/ui/top-nav.tsx`

### 5.2 Bottom Tab Bar — **Stable**

- 6 variants
- **4 tabs only**: Home · Appointments · Exercises · Profile
- 64 h + safe area; upward `elevation/md`
- Active tab: 3 px **Teal-700** pill indicator + Teal-700 icon + Label / md (v4.2.0)
- Code: `/components/ui/bottom-tabs.tsx`

### 5.3 Tabs — **Beta**

- 12 variants
- `aria-selected`; arrow-key navigation
- **Consolidation:** Foundation Tabs (`7:709`) for generic tab patterns; v2.0 Tabs (`281:7204`) **only** for Today/Library/Progress rehab dashboards. Re-evaluate in v4.3.0
- Code: `/components/ui/tabs.tsx`

---

## 6. Lists & rows

### 6.1 List Item — foundation **Beta** · v2.0 **Candidate**

- 18 variants (compact · default · comfortable × leading-icon · leading-avatar · none × trailing-chevron · trailing-value · none)
- 56 px min height; 16 px horizontal padding
- Full-row click target
- **Consolidation:** v2.0 ListItem (`288:4759`) replaces foundation (`7:611`) once it has ≥3 real-screen placements
- Code: `/components/ui/list-item.tsx`

### 6.2 Notification Item — **Beta**

- 6 variants (read · unread × 3 sizes)
- 8 px Teal-700 dot indicator for unread (v4.2.0)
- Code: `/components/domain/notification-item.tsx`

---

## 7. Feedback

### 7.1 Toast — **Beta** (canonical = `281:7245`)

- 8 variants (default · success · warning · error × with/without action)
- Max 343 px wide; 48 min height
- `aria-live="polite"`; auto-dismiss 4 s; persistent until dismissed for errors
- `elevation/xl`
- **Consolidation:** legacy Toast `6:379` is **Deprecated**, removal target v4.4.0
- Code: `/components/ui/toast.tsx` (props in `COMPONENT_API.md` v1.1.0)

### 7.2 Alert Banner — **Beta**

- 8 variants
- Dismissible option; icon-left
- Code: `/components/ui/alert.tsx`

### 7.3 Badge — **Beta**

- 36 variants (6 colors × 3 sizes × 2 styles)
- Colors: Brand · Accent · Success · Warning · Error · Neutral
- `radius/chip` (full); Label / sm
- Code: `/components/ui/badge.tsx`

### 7.4 Progress — **Beta**

- 8 variants (Linear · Circular · Stepper × sm/md)
- Reports progress via `aria-valuenow`
- Code: `/components/ui/progress.tsx`

### 7.5 Skeleton — **Candidate**

- 12 variants (text · avatar · card · image × sm/md/lg)
- `aria-busy="true"`; respects `prefers-reduced-motion`
- Code: `/components/ui/skeleton.tsx`

### 7.6 Empty State — **Beta**

- 6 variants
- Always: illustration + heading + body + CTA
- Never a blank screen
- Code: `/components/ui/empty-state.tsx`

---

## 8. Identity

### 8.1 Avatar

- 12 variants (image · initials · placeholder × 4 sizes)
- Sizes: 32 · 40 · 56 · 80
- Initials fall back on image load failure
- Code: `/components/ui/avatar.tsx`

---

## 9. Booking domain

### 9.1 Day Cell — **Beta**

**When:** date picker grid in booking step 2.

- 8 variants: Default · Today · Selected · InRange · Disabled · Hover · Weekend · OtherMonth
- 48 × 48 min
- Code: `/components/domain/day-cell.tsx`

### 9.2 Time Slot — **Stable**

- 6 variants: Available · Selected · Unavailable × sm/md
- Disabled slots keep visible but non-interactive
- Code: `/components/domain/time-slot.tsx`

### 9.3 Appointment Card — **Stable**

- 6 variants: Upcoming · Past · Cancelled × compact/full
- Status badge + status text (never color-only)
- Tinted teal-50 background with **1.5 px Teal-600 outline** for active state (Teal-600 = `color/border/brand`, v4.2.0)
- Code: `/components/domain/appointment-card.tsx` (props in `COMPONENT_API.md` v1.1.0)

### 9.4 Practitioner Card — **Stable**

- 4 variants: Compact · Full × with/without availability
- Avatar + name + specialty + next availability
- Code: `/components/domain/practitioner-card.tsx`

### 9.5 Intake Form Section — **Beta**

- 6 variants: PersonalInfo · MedicalHistory · Consent × collapsed/expanded
- Progressive disclosure; autosaves to localStorage
- Code: `/components/domain/intake-form-section.tsx`

### 9.6 Quick Action Tile — **Beta**

- 3 variants: Primary · Hover · Active
- Lucide icon + Label / lg
- Code: `/components/domain/quick-action-tile.tsx`

---

## 10. Singles (no variants)

| Component | Use | Code |
|---|---|---|
| Service Summary Card | Booking step 2+ sticky summary | `/components/domain/service-summary-card.tsx` |
| Booking Summary Card | Booking step 3 review | `/components/domain/booking-summary-card.tsx` |
| Confirmation Details Card | Post-booking confirmation | `/components/domain/confirmation-details-card.tsx` |
| Logo / Primary Teal | Default logo | `/components/brand/logo-primary-teal.tsx` |
| Logo / Black | Mono / print | `/components/brand/logo-black.tsx` |
| Logo / Teal-300 on Dark | Dark mode | `/components/brand/logo-teal-300.tsx` |
| Logo / White | Brand hero / dark photo | `/components/brand/logo-white.tsx` |
| Logo / Original | Full-color marketing | `/components/brand/logo-original.tsx` |

---

## 11. Exercise / Gamification / Dashboard

### 11.1 VideoPlayer (EXER-C03)

- Full-width 16:9 player for exercise demos
- Captions on by default; speed 0.75 / 1 / 1.25
- Respects `prefers-reduced-motion` — no auto-play
- Code: `/components/domain/video-player.tsx`

### 11.2 LanguageTogglePill

- ES / EN segmented toggle with flag icons
- Persists to `next-intl` locale cookie
- Code: `/components/ui/language-toggle.tsx`

### 11.3 PillSegmentedToggle

- 2-4 segments, rounded `radius/chip`
- Active segment gets teal-600 fill + white text
- Code: `/components/ui/pill-segmented-toggle.tsx`

### 11.4 DateStrip

- Horizontal 7-day strip for the Loop weekly view
- Today highlighted, swipe to navigate weeks
- Code: `/components/domain/date-strip.tsx`

### 11.5 TimeSlotChip

- Chip variant of Time Slot, used in booking summary
- Code: `/components/domain/time-slot-chip.tsx`

### 11.6 SessionProgressHeader (EXER-C01)

- Session title + "3 of 6 exercises" + thin linear progress bar
- Code: `/components/domain/session-progress-header.tsx`

### 11.7 RepCounterCard (EXER-C02)

- Large numeric counter, +/- buttons 56 × 56, pain slider below
- Code: `/components/domain/rep-counter-card.tsx`

### 11.8 PainInterruptModal (EXER-C05)

- Triggered when pain slider ≥ 7
- Modal: *"We want to keep you safe. Pause this exercise and contact your physio."*
- Primary CTA: Call clinic. Secondary: Pause session.
- Code: `/components/domain/pain-interrupt-modal.tsx`

### 11.9 ControlDock (EXER-C04)

- Play/pause · rewind 10s · forward 10s · captions · speed
- 56 × 56 controls, 16 px gaps
- Code: `/components/domain/control-dock.tsx`

### 11.10 XPRing (GAME-14.1)

- Circular SVG ring, 80 × 80; animated fill on XP gain
- Respects `prefers-reduced-motion`
- Code: `/components/domain/xp-ring.tsx`

### 11.11 StreakCounter (GAME-14.2)

- Lucide `flame` icon + day count
- Orange-500 when streak is live, slate-400 when broken
- Code: `/components/domain/streak-counter.tsx`

### 11.12 BadgeCard (GAME-14.3)

- 120 × 120 badge tile with Lucide `trophy` / `medal` / `award`
- Locked state grayscale
- Code: `/components/domain/badge-card.tsx`

### 11.13 LevelUpModal (GAME-14.4)

- Full-screen modal on level-up; single `party-popper` icon, no animation beyond fade
- CTA: Continue
- Code: `/components/domain/level-up-modal.tsx`

### 11.14 TaskItem (DASH-13.2)

- Practitioner dashboard: patient task with status chip + trailing action menu
- Code: `/components/domain/task-item.tsx`

### 11.15 MoodPicker (EXER-C09)

- 5-face horizontal picker (😣 😕 😐 🙂 😄 represented as Lucide face icons — **not emoji**)
- Feeds into `mood` column; never transmitted to analytics
- Code: `/components/domain/mood-picker.tsx`

### 11.16 SafetyCalloutCard (EXER-C07)

- Left-aligned Lucide `shield-alert` in orange-500
- Title + body + optional CTA
- Used for pain warnings and clinic escape hatches
- Code: `/components/domain/safety-callout-card.tsx`

---

## 12. Working with the kit

### 12.1 Adding a component

1. Propose via governance request (Linear `DSN`)
2. Design in Figma using only Semantics tokens
3. Implement in `/components/ui/` (primitive) or `/components/domain/` (product-specific)
4. Write Storybook entry with default + all states
5. Add a11y tests: keyboard path, screen reader labels, `prefers-reduced-motion`
6. Ship ES + EN strings via `next-intl`
7. Update this doc

### 12.2 Adding a variant

1. Reuse existing tokens — never introduce a new color/size for a one-off
2. Add Figma variant following `Property=Value` naming
3. Implement as a prop, not a new component
4. Update Storybook and this doc

### 12.3 Visual regression

- Playwright + `@storybook/test-runner` runs visual diffs on every PR
- Diffs > 0.1 % trigger reviewer sign-off
- Dark mode screenshots run in parallel

---

## 13. Live kits

Two interactive HTML prototypes ship in this project:

| Kit | Path | Purpose |
|---|---|---|
| Mobile App UI Kit | `ui_kits/mobile-app/Mobile App UI Kit.html` | iOS-framed booking + Loop flow |
| Website UI Kit | `ui_kits/website/Website UI Kit.html` | Desktop marketing + clinic portal |

Both bind to the same Semantics tokens defined in `colors_and_type.css`.

---

## 14. Changelog

| Version | Date | Highlights |
|---|---|---|
| **1.1.0** | **2026-05-08** | Tracks `DESIGN_SYSTEM.md` v4.2.0. Brand fill → Teal-700; accent default → Orange-700; focus ring → Teal-500. **Maturity status** stamped on every component (14 Stable / 11 Beta / 7 Candidate). Four duplicate-pattern consolidations recorded: Toast `6:379` and Modal `7:803` deprecated; Tabs split by use case; ListItem v2.0 candidate. P0 prop contracts now live in `COMPONENT_API.md` v1.1.0. Figma source bumped to library v2.1. |
| 1.0.0 | 2026-04-23 | Initial UI kit catalog. Aligned with `DESIGN_SYSTEM.md` v4.1.0. Indexes 39 components / 442 variants across 9 categories. |

---

*End of `ui-kit.md` v1.1.0.*
