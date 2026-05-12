# Osteóplus — Project DNA

**Document:** `osteoplus-project-dna.md`
**Version:** 2.4.0 (supersedes 2.3.1)
**Status:** Approved — aligned with `DESIGN_SYSTEM.md` v4.1.0
**Date:** 2026-04-23
**Owner:** Product + Engineering
**Audience:** Product managers, engineers, designers joining the project

This is the **product context** document — who we are, who we're for, what we're building, and with what stack. For design tokens and components, see `osteoplus-design-system.md`. For brand voice and logo governance, see `brand-kit.md`.

---

## 0. What changed in 2.4.0

This release aligns the project-DNA with the reconciled `DESIGN_SYSTEM.md` v4.1.0. The only substantive change is the **Next.js baseline**.

| Area | Old (v2.3.1) | New (v2.4.0) |
|---|---|---|
| Framework | Next.js 16 (App Router, React 19, Turbopack) | **Next.js 15** (App Router, React 19). v16 is a candidate once Turbopack ships stable for production. |

No feature, scope, or KPI changes.

---

## 1. Elevator pitch

Osteóplus is the **digital companion for osteopathy, physiotherapy, and rehabilitation patients in Barcelona**. Book a visit without an account in under two minutes, then use the app to do the exercises your practitioner prescribed — with gentle gamification to keep you coming back.

---

## 2. Mission · Vision · Values

| | |
|---|---|
| **Mission** | Simplify and elevate the clinic experience through accessible, stress-free digital care. |
| **Vision** | Be Barcelona's most trusted digital companion for osteopathy, physiotherapy, and rehabilitation. |
| **Values** | Accessibility · Trust · Clarity · Care |

### 2.1 KPIs

| Metric | Target |
|---|---|
| Primary — Booking success rate | > 90 % |
| Secondary — Exercise completion rate | > 75 % |
| Time to book (guest) | < 2 minutes, p50 |
| Return rate (weekly) | > 60 % during active rehab |
| Bilingual parity (ES : EN quality) | 1 : 1 |

---

## 3. Audience

### 3.1 Primary — "The Recovery Warrior"

Post-op or post-injury patients 35–85, optimized first for **60+**. Often referred by GP or specialist. Low-to-medium tech confidence. Pain or mobility limitation that makes current self-care feel fragile. Wants:
- A calm, clear way to book appointments without fighting a form
- A short daily routine that feels doable on bad pain days
- Confidence that the clinic knows them and their plan

Barriers we must remove:
- Account creation friction for a first booking
- Medical jargon in UI chrome
- Tiny tap targets, low-contrast type, autoplay media
- Any copy that shames them for abandoning a task

### 3.2 Secondary — "The Wellness Maintainer"

Preventative-care patients who book massage, posture check-ins, or quarterly tune-ups. More tech-confident; still benefits from plain language. Uses the app for calendar and invoices, light gamification.

### 3.3 Excluded

**Emergency acute trauma** — the homepage triage redirects to emergency services. The product never positions itself as an emergency channel.

---

## 4. Core product

Three pillars, one app.

### 4.1 Guest-first appointment booking

- No account required to book a first visit
- Three-step wizard: **Service → Practitioner + slot → Personal info** (name, phone, email, brief concern)
- Confirmation via email + optional SMS
- ICS file and deep-link to native calendar
- Post-booking upsell: create an optional account to manage appointments
- Intake form sent 24 h before visit (separate from booking)

### 4.2 The Loop — daily rehab gamification

A **Daily Rehab Loop** modeled on habit-stacking. Each day the user sees:

- **Today's session** — 3–6 exercises prescribed by their practitioner, 10–20 minutes total
- **Rep counter, pain slider, mood picker** — quick feedback captured in-app
- **Pain Interrupt Modal** — auto-stops a session when pain ≥ 7, suggests contacting the physio
- **Streak counter** + **XP ring** + **badges** — Lucide-icon gamification, never emoji
- **Weekly challenges** — optional, practitioner-tunable (e.g., "7 days in a row")

### 4.3 Practitioner dashboard (web)

For clinic staff: view their patient list, assign exercise plans from a library, mark exercises as completed / modified, and see aggregate adherence without seeing raw pain scores (those never leave the device-to-database encrypted channel).

---

## 5. Roadmap

| Phase | Target | Scope |
|---|---|---|
| **Beta** | Q2 2026 | Guest booking, The Loop v1 (exercises, streaks, XP), practitioner dashboard v1, bilingual ES/EN, 8 services, 4 practitioners |
| **GA** | Q3 2026 | Family accounts, invoicing + receipts, referral workflow, Apple Health / Google Fit read-only |
| **v2** | Q4 2026 | Insurance integration, group challenges, telehealth video |
| **v3** | 2027 | Multi-clinic, practitioner marketplace |

The product explicitly **does not** build: prescription management, diagnostic recommendations, AI triage, wearable data ingestion beyond Health / Fit.

---

## 6. Tech stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | **Next.js 15** (App Router, React 19) | Next.js 16 is a candidate once Turbopack ships stable for production |
| Language | TypeScript strict | No `any` in new code |
| Styling | Tailwind CSS v4 | CSS variables; shadcn/ui `new-york` style |
| UI primitives | shadcn/ui + Radix UI | Component patterns and accessibility hooks |
| Icons | lucide-react | 2 px stroke, round cap/join |
| Animation | Framer Motion | Respects `prefers-reduced-motion` |
| Forms | react-hook-form + Zod | All validation schemas live in `/lib/schemas/` |
| Backend | Supabase | PostgreSQL, Auth, Edge Functions, RLS |
| PWA | `@ducanh2912/next-pwa` | Offline shell for Exercises + Appointments |
| i18n | `next-intl` | ES (primary) · EN (secondary) |
| Dates | `date-fns` | `es` and `en-GB` locales |
| Theming | `next-themes` | Class strategy; dark mode first-class |
| Hosting | Vercel | EU regions only (Frankfurt · Paris) for GDPR |
| Testing | Vitest · Playwright · axe-core · Lighthouse CI | a11y tests gated in PR |
| Observability | Sentry · Vercel Analytics | Pain scores never transmitted |

### 6.1 Fonts

| Family | Loading |
|---|---|
| **Merriweather** (display) | Local variable font `fonts/Merriweather-VariableFont_opsz_wdth_wght.ttf` via `@font-face`. Google Fonts is fallback only. |
| **Inter** (UI) | Google Fonts |
| **Roboto Mono** (data) | Google Fonts |

---

## 7. Architecture at a glance

```
┌─────────────────────────────────────────────────────────┐
│  Next.js 15 App Router (React 19) — Vercel EU            │
├─────────────────────────────────────────────────────────┤
│  /app                                                    │
│    /[locale]                    next-intl: es | en       │
│      /(public)                  Guest booking, marketing │
│      /(app)                     Authed: Loop, profile    │
│      /(practitioner)            Clinic staff dashboard   │
│    /api                         Edge routes              │
├─────────────────────────────────────────────────────────┤
│  /components                                             │
│    /ui                          shadcn/ui primitives     │
│    /domain                      Booking, Exercise, etc.  │
│    /patterns                    Screen-level compositions│
├─────────────────────────────────────────────────────────┤
│  /lib                                                    │
│    /schemas                     Zod schemas              │
│    /supabase                    Server/client clients    │
│    /i18n                        next-intl config + msgs  │
├─────────────────────────────────────────────────────────┤
│  Supabase                                                │
│    Postgres + RLS · Auth · Edge Functions · Storage      │
└─────────────────────────────────────────────────────────┘
```

### 7.1 Security & privacy

- All traffic TLS 1.3
- RLS on every table with patient data
- Pain scores and mood stored in Supabase encrypted columns; **never** transmitted to analytics
- Medical records retained 7 years per Ley 41/2002 Art. 17; cannot be deleted on user request
- Full GDPR rights: access, rectification, deletion (non-medical), portability (JSON export)
- Privacy contact: `privacidad@osteoplus.es`

---

## 8. Non-negotiables

These are in every PR template and every design review checklist.

- **WCAG 2.2 Level AA** baseline
- **Touch targets ≥ 48 × 48 dp**; primary CTAs ≥ 56 × 48 dp
- **Body text ≥ 14 px**; default 16 px; 18 px preferred for senior-facing content
- **Input font ≥ 16 px** (prevents iOS auto-zoom)
- **Contrast ≥ 4.5 : 1** for body text and essential UI
- **Consent checkboxes default unchecked** (GDPR / LOPDGDD)
- **No emoji** in UI chrome or copy
- **Supports 200 % text scaling** without layout breakage
- **Respects `prefers-reduced-motion`**
- **Designs reference Semantics tokens only** — never Primitives directly, never hard-coded hex
- **Sentence case** for in-app UI. Title Case only for marketing display headlines.

---

## 9. Team conventions

### 9.1 Code

- `pnpm` for package management
- `biome` for format + lint (supersedes Prettier + ESLint)
- Conventional commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`
- PR template enforces a11y and i18n checklists
- Preview deploys on every PR; Playwright + axe-core run in CI

### 9.2 Design

- All designs in Figma `DesignSystemOsteoplus` v1.3
- Components → Semantics tokens only
- Every screen ships a dark-mode variant
- Every screen ships ES and EN specimens
- No new tokens without a governance request

### 9.3 Content

- Copy written in ES first, then translated to EN (not the other way round)
- Copy review by a bilingual editor before ship
- Medical claims cleared by the clinical lead

---

## 10. Definition of done (per feature)

```
□ Designs approved in Figma
□ Dark mode variant shipped
□ ES + EN strings in Crowdin
□ WCAG 2.2 AA checklist passed
□ Lighthouse ≥ 95 on every vital
□ axe-core CI green
□ Playwright happy path green
□ Analytics events defined (no pain scores)
□ Error + empty states designed and implemented
□ Loading + skeleton states designed and implemented
□ Offline behavior defined (PWA)
□ Copy reviewed by bilingual editor
□ Medical claims cleared by clinical lead (if applicable)
```

---

## 11. Documentation map

| Doc | Role | Owner |
|---|---|---|
| `DESIGN_SYSTEM.md` | **Canonical SSOT** — tokens, governance | DesignOps |
| `osteoplus-design-system.md` | Implementation-focused mirror of the SSOT | DesignOps |
| `brand-kit.md` | Brand voice, logo, imagery | Brand |
| `osteoplus-project-dna.md` *(this file)* | Product context, stack, roadmap | Product + Eng |
| `style-guide.md` | Writer-facing voice + visual style guide | Content + Design |
| `ui-kit.md` | Component catalog and usage | DesignOps |
| `README.md` | Project overview for new joiners | Eng |
| `api-contract.md` | Supabase schemas + endpoint contracts | Backend |
| `a11y-audit-report.md` | Running a11y audit log | DesignOps |
| `screen-id-registry-v1_0.md` | Canonical screen IDs | Product |
| `deck-complete_es-en.md` | Bilingual copy deck | Content |

---

## 12. Changelog

| Version | Date | Highlights |
|---|---|---|
| **2.4.0** | **2026-04-23** | Aligned with `DESIGN_SYSTEM.md` v4.1.0. Next.js baseline corrected to 15 (v16 remains a candidate). Documentation map added. No feature or scope changes. |
| 2.3.1 | 2026-02-12 | Added gamification details (XP ring, streaks, Pain Interrupt Modal). |
| 2.3.0 | 2026-01-28 | Practitioner dashboard scoped. |
| 2.2.0 | 2025-12-05 | Evolved v1 transactional app into v2 Gamified Recovery Partner. |
| 2.0.0 | 2025-10-14 | Bilingual ES/EN, PWA-first, guest booking. |
| 1.0.0 | 2025-07-01 | Initial product brief. |

---

*End of `osteoplus-project-dna.md` v2.4.0.*
