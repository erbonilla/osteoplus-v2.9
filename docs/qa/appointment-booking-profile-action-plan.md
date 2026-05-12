# Appointment/Booking · Profile sections implementation plan

**Project:** Osteóplus PWA  
**Figma source:** DesignSystemOsteoplus, `Appointment/Booking`, node `255:5457`  
**Figma URL:** https://www.figma.com/design/zM7bfBONIWsgvxH4KSff0J/DesignSystemOsteoplus?node-id=255-5457&t=Ys1piHCBmgV4ukBO-1  
**Prepared:** 2026-05-10  
**Scope:** Spanish/English, light/dark mode, responsive PWA booking flow and Profile appointment sections.

## 1. Source-of-truth decisions

Use the repository source documents over raw Figma output whenever they conflict:

- `documents/brand-kit.md` v4.2.0 governs brand and token migration.
- `documents/style-guide.md` v1.1.0 governs copy, casing, and bilingual rules.
- `documents/ui-kit.md` v1.1.0 governs component maturity and API direction.
- `documents/osteoplus-design-system.md` provides implementation tokens, grid, motion, and accessibility rules.
- Figma node `255:5457` provides visual layout and flow intent.

Token decisions to preserve during implementation:

- Filled primary CTA: semantic brand fill mapped to Teal-700 in light mode.
- Dark-mode primary CTA: semantic brand fill mapped to Teal-400/brand dark behavior already exposed through CSS variables.
- Brand border/icon emphasis: Teal-600 semantic border token.
- Focus ring: Teal-500 semantic focus token.
- Accent: Orange-700 semantic accent, used sparingly and never as the default booking CTA.
- Components must consume semantic Tailwind/CSS-variable tokens only.

Figma conflicts that must be corrected:

- Consent appears checked in Figma step 3; implementation must default unchecked.
- Figma includes a Spain flag glyph in the phone picker; implementation must avoid emoji and use a text country chip or Lucide-compatible country selector treatment.
- Figma text is English-only and sometimes Title Case; implementation must be Spanish-first with English parity and sentence case.
- Figma extracted code uses raw fallback hex values and one-off generated icon assets; implementation must use project tokens and `lucide-react`.

## 2. Current repository baseline

The repo already has the correct stack foundation:

- Next.js `15.5.18`, React `19.1.0`, TypeScript, Tailwind CSS v4, Biome.
- `next-intl` configured with `/[locale]`, `es` default and `en` secondary.
- `next-themes` configured with class strategy and system default.
- PWA package present with manifest route.
- Current UI primitives are minimal: `Button`, theme toggle, language toggle.
- Missing booking/domain primitives: input, textarea, checkbox, radio card, segmented control, stepper, calendar strip, day cell, time slot, summary card, appointment card, phone input, bottom actions, profile appointment sections.

## 3. Figma-derived flow map

Implement the booking flow as a three-step wizard plus confirmation, with guest and signed-in profile paths:

1. Entry points
   - Landing CTA: "Reservar cita" / "Book appointment".
   - Profile appointments empty state CTA.
   - App bottom navigation `Appointments` tab once app shell exists.
   - Notification/deep-link entry later.

2. Step 1: Type and service
   - Patient type: new patient / returning patient.
   - Visit type: in-person / video call.
   - Service selection by specialist or symptom.
   - Any available practitioner card.
   - Service cards with image/avatar, title, plain description, duration, and price.
   - Contact escape hatch: call clinic and WhatsApp.

3. Step 2: Date and time
   - Stepper state with completed step 1, active step 2.
   - Selected service chip.
   - Calendar strip with seven visible days and full month action.
   - Time slots grouped by morning, afternoon, evening.
   - Back and continue actions fixed at bottom on mobile.

4. Step 3: Confirm and details
   - Summary card: service, date/time, duration, location, practitioner when selected.
   - Mode switch: book as guest / sign in to autofill.
   - Guest fields: full name, mobile phone, optional email, optional note.
   - Consent checkbox unchecked by default.
   - Confirm booking action with loading, success, and recoverable error states.

5. Confirmation
   - Success icon, booking code, confirmation copy.
   - Details card with practitioner, service, date/time, location, payment note.
   - Actions: add to calendar, get directions, return home.
   - Safety/help line: call clinic and reschedule/cancel up to 24 h in advance.

6. Profile appointment sections
   - Upcoming appointments section using `AppointmentCard`.
   - Past appointments section using compact/past variant.
   - Empty state with booking CTA.
   - Quick actions: book new appointment, call clinic, get directions.
   - Appointment detail entry for reschedule/cancel policy, with phone escape hatch.

## 4. Proposed routes and file structure

Add route-level pages:

```text
src/app/[locale]/booking/page.tsx
src/app/[locale]/booking/confirmation/page.tsx
src/app/[locale]/profile/page.tsx
src/app/[locale]/profile/appointments/page.tsx
```

Add booking/domain components:

```text
src/components/domain/appointment-card.tsx
src/components/domain/booking-confirmation.tsx
src/components/domain/booking-shell.tsx
src/components/domain/booking-stepper.tsx
src/components/domain/booking-summary-card.tsx
src/components/domain/calendar-strip.tsx
src/components/domain/day-cell.tsx
src/components/domain/phone-input.tsx
src/components/domain/practitioner-card.tsx
src/components/domain/service-card.tsx
src/components/domain/time-slot.tsx
```

Add or expand UI primitives:

```text
src/components/ui/alert.tsx
src/components/ui/badge.tsx
src/components/ui/card.tsx
src/components/ui/checkbox.tsx
src/components/ui/input.tsx
src/components/ui/radio-card.tsx
src/components/ui/segmented-control.tsx
src/components/ui/textarea.tsx
```

Add validation and data fixtures:

```text
src/lib/schemas/booking.ts
src/lib/booking/fixtures.ts
src/lib/booking/types.ts
```

Add i18n namespaces:

```json
{
  "booking": {},
  "profile": {},
  "appointments": {},
  "common": {}
}
```

## 5. Component implementation plan

### Phase 1: UI primitive foundation

Implement reusable, accessible primitives before composing screens:

- `Card`: default, selected, interactive, error, disabled states.
- `Input` and `Textarea`: visible labels, helper text, errors, `aria-describedby`.
- `Checkbox`: 48 x 48 hit area, unchecked by default, visible label.
- `RadioCard`: full-row selectable card for patient type, visit type, service, and symptom.
- `SegmentedControl`: specialists/symptoms and guest/sign-in modes.
- `Badge`: brand, neutral, success, warning, error variants.

Acceptance gates:

- No raw hex values in component files.
- Every interactive target is at least 48 x 48 px.
- Focus state uses `focus-visible:outline-border-focus`.
- Disabled state uses semantic background/text, not opacity-only styling.

### Phase 2: Booking domain components

Implement Figma-mapped domain components with project conventions:

- `BookingStepper`
  - Supports `currentStep`, `totalSteps`, completed check icons, and accessible `aria-current="step"`.
  - Mobile: full-width horizontal progress.
  - Desktop/tablet: compact stepper above content or in shell header.

- `ServiceCard`
  - Supports selected/unselected/disabled.
  - Uses real assets only if approved; otherwise use initials/icon layout without placeholders.
  - Includes service duration and price chips.

- `CalendarStrip` and `DayCell`
  - Seven-day strip as Figma default.
  - `View full month` opens modal or bottom sheet later; initial plan can wire action stub.
  - Selected date announces to screen readers.

- `TimeSlot`
  - Implement as radio/toggle button semantics after deciding final keyboard behavior.
  - Props: `time`, `selected`, `disabled`, `onSelect`, `ariaLabel`.
  - Disabled state remains visible and includes non-color reason such as "Completo" / "Fully booked".

- `BookingSummaryCard`
  - Reuses detail-row pattern with Lucide icons.
  - Must render service, practitioner, date, time, duration, price, location.

- `PhoneInput`
  - Spain `+34` default.
  - No emoji flag; use `ES +34` or country name chip.
  - `type="tel"`, `inputMode="tel"`, helper text, and formatting on blur.

- `AppointmentCard`
  - Variants: upcoming, past, cancelled; compact/full.
  - Status badge plus text, never color-only.
  - Active/upcoming card uses brand border semantic token.

### Phase 3: Booking wizard state and validation

Use a client component for wizard interaction and form state, embedded inside localized server pages:

- `useForm` with `mode: "onBlur"` and Zod resolver.
- Zod schema in `src/lib/schemas/booking.ts`.
- Step validation:
  - Step 1: patient type, visit type, service or symptom.
  - Step 2: selected date and time slot.
  - Step 3: full name, phone, consent, optional email, optional notes.
- Use `trigger(fields, { shouldFocus: true })` when moving between steps.
- Focus first invalid field on submit.
- Disable submit while submitting and keep button width stable.
- Keep consent `false` in `defaultValues`.

Data handling:

- For first implementation, use typed fixtures for services, symptoms, practitioners, dates, and slots.
- Do not send health-sensitive notes to analytics.
- Persist only non-sensitive draft state if needed; do not cache pain, mood, or medical content.

### Phase 4: Routes and responsive layouts

Booking route behavior:

- `/es/booking` and `/en/booking` render the same wizard with localized text.
- `/es/booking/confirmation` and `/en/booking/confirmation` render confirmation details.
- `/` continues redirecting to `/es`.

Responsive layout:

- Mobile 320/390 px:
  - Single-column wizard.
  - Sticky bottom action bar with safe-area padding.
  - Thumb-reachable primary CTA.
  - Service and symptom cards full width.

- Tablet 768 px:
  - Centered max-width content, stepper above.
  - Cards remain one column unless content comfortably supports two.

- Desktop 1024/1440 px:
  - Two-column booking shell after step 1: main selection on left, sticky summary/help on right.
  - Confirmation uses centered hero plus two cards as in Figma web confirmation.
  - Max content follows design-system 800 px unless confirmation/action layout needs the Figma 1088 px grid.

PWA behavior:

- Booking shell should remain readable offline.
- If slot availability cannot load, show localized offline/error state and call-clinic escape hatch.
- Confirmation can be locally rendered after successful submit; do not imply server confirmation if offline.

### Phase 5: Profile appointment sections

Implement appointment surfaces that reuse booking components:

- Profile overview section:
  - Next appointment card if one exists.
  - Empty state: "Aún no tienes citas. Reserva tu primera visita." / "No appointments yet. Book your first visit."
  - Quick actions: book appointment, call clinic.

- Appointments page:
  - Tabs or segmented control: upcoming / past.
  - Upcoming list: appointment cards with reschedule/cancel actions.
  - Past list: compact appointment cards.
  - Cancelled state uses status badge and muted styling, not color-only.

- Appointment detail:
  - Appointment summary card.
  - Calendar and directions actions.
  - Policy text: reschedule/cancel up to 24 h in advance.
  - Clinic phone visible near any cancellation or error action.

## 6. Spanish and English copy plan

All user-facing text goes in `src/messages/es.json` and `src/messages/en.json`.

Spanish source examples:

- `booking.title`: "Reserva tu cita"
- `booking.step1.subtitle`: "Paso 1 de 3: elige tipo de paciente y servicio"
- `booking.patientType.question`: "¿Es tu primera visita?"
- `booking.patientType.new`: "Primera visita"
- `booking.patientType.returning`: "Ya he venido antes"
- `booking.visitType.question`: "¿Cómo prefieres la visita?"
- `booking.visitType.inPerson`: "En la clínica"
- `booking.visitType.video`: "Videollamada"
- `booking.service.anyPractitioner.title`: "Cualquier profesional disponible"
- `booking.service.anyPractitioner.body`: "Te asignaremos el siguiente especialista disponible."
- `booking.step2.title`: "Elige fecha y hora"
- `booking.step3.title`: "Confirma tu cita"
- `booking.guestMode`: "Reservar como invitado"
- `booking.signInMode`: "Entrar para completar datos"
- `booking.confirm`: "Confirmar cita"
- `booking.confirmation.title`: "Cita confirmada"
- `booking.help.call`: "Llamar a la clínica"
- `booking.help.phoneLine`: "¿Necesitas hablar con nosotros? Llama al +34 93 123 45 67."

English parity examples:

- `booking.title`: "Book your appointment"
- `booking.step1.subtitle`: "Step 1 of 3: choose patient type and service"
- `booking.patientType.question`: "Is this your first visit?"
- `booking.patientType.new`: "First visit"
- `booking.patientType.returning`: "I have visited before"
- `booking.visitType.question`: "How would you prefer to visit?"
- `booking.visitType.inPerson`: "At the clinic"
- `booking.visitType.video`: "Video call"
- `booking.confirmation.title`: "Appointment confirmed"
- `booking.help.phoneLine`: "Need to talk to us? Call the clinic at +34 93 123 45 67."

Copy rules:

- Spanish first, English with tone parity.
- Sentence case for all in-app UI.
- No hype words, no exclamation marks, no emoji.
- Use `date-fns`/`next-intl` formatting for locale-specific dates and times.

## 7. Light and dark mode plan

Use existing CSS variables and Tailwind v4 theme aliases:

- Surfaces: `bg-bg-primary`, `bg-surface-card`, `bg-bg-secondary`.
- Text: `text-text-primary`, `text-text-secondary`, `text-text-tertiary`.
- Borders: `border-border-default`, `border-border-brand`, `outline-border-focus`.
- Primary actions: `bg-brand-primary`, hover `bg-brand-primary-hover`, active `bg-brand-primary-active`.
- On-brand text: `osteoplus-on-brand` or `text-text-on-brand` depending on contrast target.

Dark-mode checks:

- Selected service card text must meet AA on brand fill.
- Calendar selected day must remain readable.
- Inputs and cards must have visible borders on `bg-bg-primary`.
- Secondary and outline buttons must not disappear against dark surfaces.
- Logo variant should use Teal-300 on dark surfaces when profile/app shell logo appears.

## 8. Accessibility and senior-friendly UX plan

Apply UI UX Pro Max review criteria while keeping Osteóplus docs as the authority:

- Minimum body text 16 px; prefer 18 px where content is explanatory.
- Form input text 16 px minimum.
- Touch targets: 48 x 48 px; primary CTAs: 56 x 48 px where possible.
- Visible labels for all form controls.
- No placeholder-only labels.
- Error text placed near each field.
- Focus order follows visual order.
- Stepper exposes progress through text and `aria-current`, not color alone.
- Time slot disabled states include reason text.
- Confirmation status uses icon plus text.
- Sticky mobile footer must not cover content; reserve bottom padding.
- Respect `prefers-reduced-motion`; no decorative animation.
- Support 200% text scaling without horizontal scroll.

## 9. Context7 implementation notes

Current documentation checks inform the plan:

- Next.js App Router: keep localized dynamic segment routes under `/[locale]`; use metadata APIs for localized titles/descriptions; keep client-only wizard state inside client components.
- `next-intl`: use `useTranslations` in client components and `getTranslations` in server components; add locale-aware navigation helper with `createNavigation` if booking links become shared across shell components.
- React Hook Form: use `mode: "onBlur"`, `formState.errors`, disabled/loading submit state, and `trigger(..., { shouldFocus: true })` to focus the first invalid step field.

## 10. Test and QA plan

Run during implementation:

- `pnpm check`
- `pnpm typecheck`
- `pnpm test`

Run before UI review:

- `pnpm build`
- `pnpm e2e`
- Playwright viewport checks at 320, 390, 768, 1024, 1440 px.
- Axe smoke test for `/es/booking`, `/en/booking`, `/es/booking/confirmation`, `/es/profile/appointments`.
- Manual keyboard path:
  - Back/continue through all steps.
  - Radio cards and time slots selectable without mouse.
  - Consent checkbox reachable and initially unchecked.
  - Submit focuses first invalid field.
- Manual theme path:
  - System, light, dark modes.
  - Reduced-motion mode.
- Manual i18n path:
  - Spanish and English routes render all strings.
  - No missing message keys.
  - Date/time and currency formatting match locale rules.

## 11. Suggested implementation order

1. Add `common`, `booking`, `appointments`, and `profile` message namespaces in Spanish and English.
2. Add booking TypeScript types and fixture data.
3. Build missing UI primitives.
4. Build booking domain components with Storybook-style demo props or local examples.
5. Implement `/[locale]/booking` wizard with client state and Zod validation.
6. Implement confirmation route and actions.
7. Implement profile appointment overview and appointment list sections.
8. Add Vitest coverage for schema and formatting helpers.
9. Add Playwright happy path and axe smoke tests.
10. Run checks, fix responsive/dark-mode issues, and document any remaining API integration TODOs.

## 12. Definition of done

- `/es/booking` and `/en/booking` render successfully.
- `/es/booking/confirmation` and `/en/booking/confirmation` render successfully.
- Profile appointment sections render empty, upcoming, past, and cancelled states.
- Spanish and English messages have parity.
- No hard-coded UI strings in components.
- No emoji in UI chrome or copy.
- Consent defaults unchecked.
- All interactive controls have visible labels or accessible names.
- All primary CTAs are keyboard reachable and at least 56 x 48 px where they are the primary screen action.
- All other interactive controls are at least 48 x 48 px.
- Dark and light modes pass visual review.
- No raw hex values in components.
- Axe reports no serious or critical violations.
- Reduced-motion mode is respected.
- `pnpm check`, `pnpm typecheck`, and `pnpm build` pass.

