# Osteóplus — Style Guide

**Document:** `style-guide.md`
**Version:** 1.1.0
**Status:** Approved — derived from `DESIGN_SYSTEM.md` v4.2.0 and `brand-kit.md` v4.2.0
**Date:** 2026-05-08
**Owner:** Content + Design
**Audience:** Writers, designers, PMs, practitioners contributing copy or UI

This is the **writing + visual style guide** — rules for how Osteóplus looks and sounds on every surface. For design tokens, see `osteoplus-design-system.md`. For brand governance, see `brand-kit.md`.

> **v1.1.0 update.** Tracks `DESIGN_SYSTEM.md` v4.2.0: filled CTA fill is now Teal-700 (`#0F766E`); accent default is now Orange-700 (`#C2410C`); focus ring is now Teal-500 (`#14B8A6`). Writing rules unchanged.

---

## 1. The 30-second summary

> Write like a trusted family osteopath explaining something in plain language. Sentence case. Never blame. No emoji. Build for a 75-year-old with reading glasses and some hand tremor. If you're unsure, choose the simpler word.

---

## 2. Voice

### 2.1 Personality

- **Warm** — patients are in pain or worried. Lead with kindness
- **Clinical-clear** — accurate, never over-cautious, never vague
- **Quietly confident** — no hype, no exclamation marks, no marketing swagger
- **Bilingual-first** — Spanish and English are equals

### 2.2 Tone shifts by context

| Context | Tone |
|---|---|
| Booking flow | Calm, procedural, reassuring |
| Daily Loop | Gently motivating, never punishing |
| Error messages | Apologetic, action-oriented, a way forward |
| Pain Interrupt | Firm, protective, clinical |
| Marketing | Warm, inviting, slightly editorial |
| Legal / privacy | Plain, unflowery, exact |

### 2.3 We don't

- ❌ Exclaim ("!" ends 0 sentences in UI chrome)
- ❌ Shame ("You missed your streak" · "You haven't completed…")
- ❌ Hype ("revolutionary", "seamless", "cutting-edge")
- ❌ Minimize ("simply", "just", "easily" — implies the user is at fault if they struggle)
- ❌ Jargon ("lumbar assessment consultation" → "help with back pain")
- ❌ Emoji in UI chrome or copy
- ❌ ALL CAPS for emphasis (use weight or color)
- ❌ Pun-led humor — this is a healthcare product

---

## 3. Writing rules

### 3.1 Casing

| Context | Case | Example |
|---|---|---|
| Buttons | Sentence | "Book appointment" |
| Headings (in-app) | Sentence | "Your next session" |
| Form labels | Sentence | "Phone number" |
| Nav items | Sentence | "Appointments" |
| Toasts / alerts | Sentence | "Reminder set for tomorrow" |
| Empty states | Sentence | "No appointments yet" |
| Marketing display headlines (public site hero only) | Title Case permitted | "Gentle Care For Every Body" |
| Section dividers / overlines | UPPERCASE + tracking | "YOUR RECOVERY" |

The Title Case specimens in the Figma file for in-app screens are out-of-spec and scheduled for correction. When in doubt: sentence case.

### 3.2 Punctuation

- **One space** after a period. Never two.
- **Em dashes** — closed (no spaces) in English; spaced with thin spaces in Spanish. Use for parenthetical remarks and dramatic breaks.
- **En dashes** – with spaces for number ranges and time ranges: `10:30 – 11:15 AM`.
- **Oxford comma** — use it. "Booking, exercises, and reminders."
- **Exclamation marks** — never in UI chrome. Reserved for marketing celebratory moments (badges unlocked), max one per screen.
- **Ellipsis** — `…` (single character, not three dots) and only on loading states ("Sending…").
- **Quotes** — "curly quotes" not "straight" for body copy. Keep straight quotes in code snippets.
- **Semicolons** — avoid in UI; use two sentences instead.

### 3.3 Numbers

| Case | Format |
|---|---|
| 0–9 in running text | Spelled out ("three exercises") |
| 10+ | Numeral ("12 exercises") |
| Any number with a unit | Numeral ("5 min", "30 reps") |
| Currency | "€45" (no space in ES or EN; symbol-first) |
| Percentages | "92 %" in ES (with thin space); "92%" in EN |
| Phone (Spain) | "+34 93 123 45 67" |
| Ordinals | "1st", "2nd" in EN; "1ª", "2º" in ES |

### 3.4 Dates & times

- **Dates** — `Mon, Apr 14, 2026` (EN) · `lun, 14 abr 2026` (ES)
- **Times** — `10:30 AM` 12-hour (EN) · `10:30` 24-hour (ES)
- **Time ranges** — `10:30 – 11:15 AM` (en dash with spaces)
- **Relative times** — "Today", "Tomorrow", "In 2 hours" · "Hoy", "Mañana", "En 2 horas"
- **Weekday first** — "Mon, Apr 14" not "Apr 14, Mon"

### 3.5 Measurement

Always metric. Weight in kg. Distance in cm or m. Never imperial anywhere — Osteóplus is a Barcelona clinic serving a metric-first audience.

### 3.6 The brand name

**Osteóplus** — one word, acute "ó". Never:

- Osteoplus
- OsteoPlus
- Osteo+
- osteo plus

Pluralize by context: "two Osteóplus visits" not "Osteópluses".

---

## 4. Copy patterns

### 4.1 Buttons

| Do | Don't |
|---|---|
| Book appointment | Book Now! |
| Start exercise | Begin Your Session |
| Continue | Next → |
| Cancel | Cancel booking |
| Send | Submit |
| Save changes | Update |
| Try again | Retry |

Prefer **verb + object**. If the button's meaning is obvious from context ("Continue", "Send"), just the verb is fine.

### 4.2 Empty states

Pattern: **state + gentle directive → CTA**.

| Screen | Copy |
|---|---|
| No appointments | *No appointments yet. Book your first visit →* |
| No exercises | *Your physio hasn't assigned exercises yet. [Contact clinic]* |
| No notifications | *All caught up.* |
| No badges earned | *Keep showing up — your first badge is close.* |
| No messages | *No messages from your clinic yet.* |

### 4.3 Errors

Pattern: **what happened (plain) → what we're doing → what they can do**.

| ❌ Wrong | ✅ Right |
|---|---|
| Error 500: Internal Server Error | Something went wrong on our end. We'll try again — give us a moment. |
| Invalid input | That phone number doesn't look right. Check the format and try again. |
| Session expired | You've been signed out for safety. Sign in to continue. |
| Network error | You're offline. We'll sync when you're back. |

Never include error codes in UI copy. Log them in Sentry instead.

### 4.4 Confirmations

Unambiguous, past-tense for completed actions:

- "You're all set. Confirmation sent to your email."
- "Appointment cancelled. We'll send a refund within 3 business days."
- "Exercise marked complete. See you tomorrow."

### 4.5 Microcopy for the Loop

| State | Copy |
|---|---|
| New streak day | *Nice — Day 3.* |
| Missed day | *Come back tomorrow — your plan is waiting.* |
| Pain ≥ 7 | *We want to keep you safe. Pause this exercise and contact your physio.* |
| Badge unlocked | *New badge: 7-day streak.* |
| XP gained | *+25 XP* |
| Session complete | *Done for today. See you tomorrow.* |

### 4.6 Safety copy

Every flow with a potential safety concern must include a clinic phone-number escape hatch. Pattern:

> Need to talk to us? Call the clinic at **+34 93 123 45 67**.

Never hide this behind a menu during a pain, cancellation, or error flow.

---

## 5. Bilingual style

### 5.1 Workflow

1. Copy is written in **Spanish first**
2. Translated to **English** by a bilingual editor
3. Both versions reviewed together before ship
4. Never machine-translate without editor review

### 5.2 Tone parity

Spanish and English carry the same warmth and formality. **Avoid**:

- ES vosotros / tú switching → use **tú** everywhere (informal but respectful; standard in Barcelona)
- Over-formal ES ("usted") unless explicitly clinical-legal
- Direct EN→ES idiom transliterations ("roll up your sleeves" → not "enróllate las mangas")

### 5.3 Typographic parity

- ES uses **¿** and **¡** at the start of questions and exclamations
- ES uses thin non-breaking space before `?`, `!`, `:`, `;`, `%` in formal register — our UI opts against (follow standard Spanish typesetting; no thin space)
- ES uses en dash with spaces for parentheticals; EN uses em dash closed
- Decimal separator: comma in ES (`3,5 kg`), period in EN (`3.5 kg`)
- Thousands separator: period in ES (`1.250 €`), comma in EN (`$1,250`)

---

## 6. Visual style

### 6.1 Color

| Role | Value | Notes |
|---|---|---|
| Brand fill (CTA, links, primary surfaces) | **Teal-700 `#0F766E`** | v4.2.0: was Teal-600 |
| Brand border / icon emphasis | Teal-600 `#0D9488` | `color/border/brand`; also the Primary-Teal logo fill |
| Brand pressed | Teal-800 `#115E59` | |
| Brand dark | Teal-400 `#2DD4BF` | Dark-mode filled CTA |
| Focus ring | **Teal-500 `#14B8A6`** | `color/border/focus` (v4.2.0) |
| Accent | **Orange-700 `#C2410C`** | v4.2.0: was Orange-500. Gamification chrome, accent CTAs — sparingly |
| Accent decorative | Orange-500 `#FF6B00` | Illustration / charts only |
| App bg | White `#FFFFFF` (light) · Slate-900 `#0F172A` (dark) | |
| Body text | Slate-600 `#475569` (light) · Slate-300 `#CBD5E1` (dark) | |
| Heading | Slate-900 `#0F172A` (light) · Slate-50 `#F8FAFC` (dark) | |
| Error | Red-600 `#DC2626` | not rose |
| Info | Teal-700 `#0F766E` | brand teal, tracks v4.2.0 fill shift |

Full token map in `osteoplus-design-system.md` §2.

### 6.2 Typography

| Use | Family | Weight |
|---|---|---|
| Display + headings | Merriweather | Bold 700 |
| UI + body | Inter | Regular 400 · Semi Bold 600 · Bold 700 |
| Data / code | Roboto Mono | Regular 400 |

- Min body text **14 px**; default **16 px**; **18 px** for senior-facing screens
- Input font **≥ 16 px** (prevents iOS auto-zoom)
- Max line length on desktop: **65–75 characters**
- Support 200 % scaling without breakage

### 6.3 Spacing

4-point grid. Default card padding 16–20 px. Section gaps 48–64 px. Inline icon-to-text gap 8 px. Generous vertical rhythm — whitespace is part of the voice.

### 6.4 Corners

- `radius/sm` 4 px — chips, tags
- `radius/md` 8 px — buttons, inputs
- `radius/lg` 12 px — cards
- `radius/xl` 16 px — modals, bottom sheets
- `radius/2xl` 24 px — hero containers
- `radius/full` — avatars, pills

No `radius/xs`. For anything tighter than 4 px, use `radius/none`.

### 6.5 Shadows

Border-first, shadow-light.

- `elevation/sm` — buttons rest, low-relief cards
- `elevation/md` — elevated cards, bottom tab bar, hover state
- `elevation/lg` — modals, bottom sheets
- `elevation/xl` — toasts, hero overlays

Focus state is a 2 px ring, never a shadow.

### 6.6 Motion

- Base 200 ms, ease-out for entrances, ease-in-out for transitions
- Button press: color + `scale(0.98)` for 80 ms
- Bottom sheet slide: 320 ms
- Toast: fade + slide-up, auto-dismiss 4 s
- **Respects `prefers-reduced-motion`** — all animations off
- No parallax, no auto-playing video, no decorative animation

---

## 7. Iconography

- **Library:** Lucide
- **Stroke:** 2 px, round cap/join, always
- **Size:** 24 px default (sm 20 · md 24 · lg 32)
- **Color:** inherits `currentColor` from parent text token

Pair every icon with a visible label. No emoji — gamification uses Lucide `flame`, `zap`, `trophy`, `medal`, `award`.

Icon-only buttons must have an `aria-label` and a 48 × 48 hit area.

---

## 8. Imagery

### 8.1 Photography

Warm, human, soft-lit. Real clinic vibe.

- ✅ Hands-on therapy, older adults, Barcelona spaces, natural light
- ❌ Stock "healthcare model with tablet", corporate lab, duotones

### 8.2 Illustration

Minimal, line-based medical iconography (bone, spine, joint) in teal-600 stroke matching Lucide weight.

- ❌ No 3D, no mascots, no decorative characters
- ❌ No repeating patterns, no grain, no textures

### 8.3 Chrome

- Mostly white
- Subtle `color/bg/secondary` or teal-50 for grouped / branded sections
- No gradients on chrome
- No glassmorphism, no backdrop blur

---

## 9. Accessibility

| Requirement | Rule |
|---|---|
| Standard | WCAG 2.2 AA |
| Touch targets | ≥ 48 × 48; primary CTAs ≥ 56 × 48 |
| Body contrast | ≥ 4.5 : 1 |
| Focus ring | 2 px `color/border/focus`, 2 px offset |
| Keyboard | Full keyboard path; tab order = visual order |
| Screen reader | Every interactive element labeled |
| Motion | Honors `prefers-reduced-motion` |
| Zoom | 200 % text scaling without breakage |
| Color | Never color-alone — always pair with icon + text |

No exceptions. The checklist lives in the PR template.

---

## 10. Don'ts — the "never" list

Quick reference. When in doubt, check here first.

- ❌ Emoji in UI
- ❌ ALL CAPS for emphasis
- ❌ Exclamation marks in UI chrome
- ❌ Hype words ("revolutionary", "seamless", "simply", "just", "easily")
- ❌ Error codes in copy
- ❌ Placeholder-only form labels (labels are always visible above the field)
- ❌ Pre-ticked consent checkboxes
- ❌ Stretching, skewing, or recoloring the logo
- ❌ Dropping the "Ó" accent
- ❌ Hard-coded hex values in code (use tokens)
- ❌ Primitive tokens in components (use Semantics)
- ❌ Title Case on in-app UI (marketing display headlines only)
- ❌ `radius/xs` (no such token)
- ❌ 1.5 px icon strokes (2 px Lucide default)
- ❌ Blue for info color (use brand teal)
- ❌ Rose `#E11D48` for error (use red-600 `#DC2626`)
- ❌ Filled CTA in Teal-600 (use Teal-700 `#0F766E` per v4.2.0; Teal-600 is borders/logo only)
- ❌ Orange-500 as accent fill on chrome (use Orange-700 `#C2410C` per v4.2.0)
- ❌ Gradients on chrome
- ❌ Parallax or auto-playing media
- ❌ Opacity hacks for disabled or hover

---

## 11. Contributing

- Content: open a PR against `content/strings/es/` (source) and `content/strings/en/` (translated)
- Visual: Figma `DesignSystemOsteoplus` → request review from DesignOps
- Voice questions: `brand@osteoplus.es`
- Accessibility questions: DesignOps via `#a11y` Slack

Before you ship:
- Sentence case for UI chrome
- Bilingual review by bilingual editor
- Medical claims cleared by clinical lead (if applicable)
- a11y checklist in PR template green

---

## 12. Changelog

| Version | Date | Highlights |
|---|---|---|
| **1.1.0** | **2026-05-08** | Tracks `DESIGN_SYSTEM.md` v4.2.0 + `brand-kit.md` v4.2.0. Color section updated: filled CTA → Teal-700; accent default → Orange-700; focus ring → Teal-500. Don'ts list expanded with the two new fill-token rules. |
| 1.0.0 | 2026-04-23 | Initial style guide. Derived from `DESIGN_SYSTEM.md` v4.1.0 + `brand-kit.md` v4.1.0. Consolidates writing rules, visual rules, and accessibility requirements in one writer/designer-facing document. |

---

*End of `style-guide.md` v1.1.0.*
