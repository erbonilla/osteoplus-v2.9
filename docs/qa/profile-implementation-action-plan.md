# Osteóplus Profile implementation action plan

**Target:** Profile sections from `DesignSystemOsteoplus`  
**Figma file:** <https://www.figma.com/design/zM7bfBONIWsgvxH4KSff0J/DesignSystemOsteoplus?node-id=249-150&t=Ys1piHCBmgV4ukBO-1>  
**Repo:** `osteoplus-v2.9`  
**Date:** 2026-05-10  
**Primary role:** Senior front-end + senior UI/UX design

## 1. Scope

Implement the authenticated Profile experience as a bilingual, responsive, installable PWA surface using the Osteóplus design system.

The Profile experience should support:

- Spanish default route and content: `/es/...`
- English parity: `/en/...`
- Light, dark, and system color modes
- Desktop, tablet, and mobile PWA layouts
- WCAG 2.2 AA readability and interaction standards
- Senior-friendly tap targets, spacing, copy, and error recovery

## 2. Source hierarchy

Use this order when decisions conflict:

1. Figma node `249:150` in `DesignSystemOsteoplus`
2. `docs/project-source/brand-kit.md` v4.2.0
3. `docs/project-source/osteoplus-design-system.md`
4. `docs/project-source/style-guide.md`
5. `docs/project-source/ui-kit.md`
6. Existing implementation in `src/`

Current confirmed v4.2 token migration:

- Filled primary CTA: Teal-700 semantic brand fill
- Brand border and icon emphasis: Teal-600
- Accent anchor: Orange-700
- Focus ring: Teal-500
- Logo primary teal remains Teal-600

## 3. Figma extraction gate

Before implementation, fetch exact Figma data for node `249:150`:

- Structured design context for the node
- Screenshot for light and dark variants, if available
- Component names, frame dimensions, spacing, and auto-layout rules
- Asset references for avatars or illustrations
- Any prototype interactions attached to profile rows, toggles, or edit states

In this session, the available Figma connector confirmed the `DesignSystemOsteoplus` library and found Profile-related assets such as `SideNavItem`, award icons, and communication icons, but it did not expose full node context or screenshots for `249:150`. Treat exact visual parity as blocked until the node screenshot and structured context are fetched.

## 4. Context7 findings to apply

Next.js 15:

- Keep the App Router locale spine under `src/app/[locale]/`.
- Use route segment decisions intentionally. Profile data should be dynamic when user-specific.
- Keep PWA metadata in `src/app/manifest.ts`.
- Validate with `pnpm check`, `pnpm typecheck`, and `pnpm build`.

next-intl:

- Keep locale config centralized in `src/i18n/routing.ts`.
- Keep request locale validation in `src/i18n/request.ts`.
- Add every Profile string to both `src/messages/es.json` and `src/messages/en.json`.
- Use locale-aware links/navigation for profile tabs and actions.

Tailwind CSS v4:

- Keep semantic CSS variables in `src/app/globals.css`.
- Use Tailwind utilities mapped to semantic variables, not raw colors.
- Keep class-based dark mode aligned with `next-themes`.
- Avoid one-off color utilities in components.

## 5. UI UX Pro Max review lens

Review this Profile UI against the source docs. Enforce semantic tokens, Spanish-first copy, no emoji, WCAG 2.2 AA, dark/light mode, Lucide icons, sentence case, 48 x 48 touch targets, and no hard-coded component colors.

Priority checks:

- Accessibility: contrast, focus rings, labels, keyboard order, headings
- Touch and interaction: 48 x 48 minimum targets, 56 x 48 primary CTA
- Responsive layout: no horizontal scroll at 320, 390, 768, 1024, and 1440 px
- Typography: default 16 px minimum, 18 px preferred for senior-facing body copy
- Forms: visible labels, helper/error text, validation on blur and submit
- Motion: reduced-motion support, no decorative animation
- PWA: offline shell remains clear and non-sensitive

## 6. Information architecture

Recommended Profile sections, pending exact Figma confirmation:

1. Profile overview
   - Avatar or initials
   - Patient name
   - Email / phone summary
   - Account status or next visit summary, if present in Figma
   - Primary action: edit profile

2. Personal information
   - Name
   - Email
   - Phone input with Spain default
   - Date of birth only if Figma and product scope require it
   - Save and cancel actions

3. Care preferences
   - Preferred language
   - Appointment reminders
   - Notification channel preferences
   - Accessibility preference hooks if present in Figma

4. App settings
   - Theme: system, light, dark
   - Language: Spanish / English
   - Notification toggles

5. Privacy and security
   - Data export entry point
   - Privacy policy link
   - Consent management, unchecked by default
   - Sign out action

6. Help and clinic contact
   - Clinic phone: `+34 93 123 45 67`
   - Email/contact row
   - Safety copy for urgent concerns

## 7. Component mapping

Use existing or planned source-owned components:

| Profile need | Design system component | Target code location |
|---|---|---|
| App header | Top Nav Bar | `src/components/ui/top-nav.tsx` |
| Desktop side navigation | SideNavItem | `src/components/ui/side-nav-item.tsx` |
| Mobile app navigation | Bottom Tab Bar | `src/components/ui/bottom-tabs.tsx` |
| Primary and secondary actions | Button | `src/components/ui/button.tsx` |
| Icon-only row actions | Icon Button | `src/components/ui/icon-button.tsx` |
| Profile avatar | Avatar | `src/components/ui/avatar.tsx` |
| Grouped sections | Card | `src/components/ui/card.tsx` |
| Profile rows | List Item | `src/components/ui/list-item.tsx` |
| Boolean settings | Toggle | `src/components/ui/switch.tsx` |
| Text fields | Text Input | `src/components/ui/input.tsx` |
| Phone field | Phone Input | `src/components/domain/phone-input.tsx` |
| Confirm sign out / destructive actions | Modal | `src/components/ui/modal.tsx` |
| Save feedback | Toast | `src/components/ui/toast.tsx` |
| Safety/help block | SafetyCalloutCard | `src/components/domain/safety-callout-card.tsx` |

Lucide icons only. Likely icons: `User`, `Mail`, `Phone`, `Bell`, `Languages`, `Sun`, `Moon`, `Monitor`, `ShieldCheck`, `Download`, `LogOut`, `ChevronRight`, `HelpCircle`.

## 8. Routing plan

Add an app route group while preserving the public landing page:

```text
src/app/[locale]/
  (public)/
  (app)/
    profile/
      page.tsx
      loading.tsx
      error.tsx
```

If the current landing page remains at `src/app/[locale]/page.tsx`, move it only when route grouping is needed for clean app-shell separation.

Profile route contract:

- `/es/profile`
- `/en/profile`
- Later localized slugs can map to `/es/perfil` if product approves path translation.

## 9. Layout plan

Mobile, 320-767 px:

- Single-column layout
- Sticky top nav with title
- Bottom tab bar with four tabs: Home, Appointments, Exercises, Profile
- Cards stack vertically with 16 px section gaps
- Primary actions full-width where useful

Tablet, 768-1023 px:

- Wider single column or two-column section layout if Figma shows enough horizontal space
- Bottom tab bar can remain if app shell follows mobile-first PWA conventions
- Keep line length under roughly 60 characters

Desktop, 1024-1440 px:

- App shell with left side navigation and main content region
- Main profile content max width around design-system container limits
- Secondary settings/help panel can sit in a right column only if Figma shows it

All breakpoints:

- Avoid horizontal scroll
- Keep 48 x 48 interactive targets
- Keep focus order matching visual order
- Preserve readable wrapping at 200 % text scaling

## 10. Data and form plan

For the first implementation pass, separate UI from backend persistence:

- Define typed mock profile data in the page or a small fixture
- Create `profileSchema` in `src/lib/schemas/profile.ts`
- Use `react-hook-form`, `zod`, and `@hookform/resolvers`
- Validate on blur and submit
- Focus the first invalid field on submit
- Show helper/error text under the relevant field
- Do not send pain, mood, or health-sensitive details to analytics

Fields to confirm from Figma:

- Full name
- Email
- Phone
- Preferred language
- Appointment reminders
- Exercise reminders
- Marketing consent, if shown; default unchecked

## 11. i18n copy plan

Add a `profile` namespace to both message files.

Spanish source examples:

- `title`: `Perfil`
- `overview.edit`: `Editar perfil`
- `personal.title`: `Datos personales`
- `settings.title`: `Ajustes de la app`
- `privacy.title`: `Privacidad y seguridad`
- `help.title`: `Ayuda de la clínica`
- `save`: `Guardar cambios`
- `cancel`: `Cancelar`
- `signOut`: `Cerrar sesión`
- `phoneHelp`: `Necesitas hablar con nosotros? Llama al +34 93 123 45 67.`

English parity examples:

- `title`: `Profile`
- `overview.edit`: `Edit profile`
- `personal.title`: `Personal information`
- `settings.title`: `App settings`
- `privacy.title`: `Privacy and security`
- `help.title`: `Clinic help`
- `save`: `Save changes`
- `cancel`: `Cancel`
- `signOut`: `Sign out`
- `phoneHelp`: `Need to talk to us? Call +34 93 123 45 67.`

Copy rules:

- Sentence case
- No exclamation marks in UI chrome
- No hype language
- No emoji
- No placeholder-only labels
- Use `Osteóplus` with accented `ó`

## 12. Light and dark mode plan

Use only semantic utilities backed by CSS variables:

- Background: `bg-bg-primary`, `bg-bg-secondary`
- Cards: `bg-surface-card`, `border-border-default`
- Text: `text-text-primary`, `text-text-secondary`
- Primary action: `bg-brand-primary`
- Focus: `outline-border-focus`
- Accent highlights: `text-accent-default` or token-backed icon emphasis

Checks:

- Logo variant switches correctly by theme
- Text contrast passes in both modes
- Active Profile nav state is visible without relying on color alone
- Disabled states are visibly disabled and programmatically disabled

## 13. PWA and offline plan

Profile should remain installable and resilient:

- Keep PWA manifest metadata valid
- Do not cache sensitive profile data in unsafe storage
- Show a clear offline state for save failures
- Allow static profile shell to render offline if already visited
- Do not imply changes were saved while offline unless a sync queue exists

Offline copy pattern:

- ES: `Ahora no hay conexión. Puedes volver a intentarlo cuando recuperes la conexión.`
- EN: `You are offline right now. Try again when your connection returns.`

## 14. Implementation phases

### Phase 0: Figma parity prep

- Fetch node `249:150` context and screenshot.
- Create `docs/qa/profile-figma-notes.md` with frame sizes, sections, and any mismatches against repo docs.
- Identify whether Profile is mobile-only, desktop-only, or a responsive set.

### Phase 1: primitives needed by Profile

- Add missing UI primitives from the UI kit:
  - `top-nav.tsx`
  - `bottom-tabs.tsx`
  - `side-nav-item.tsx`
  - `card.tsx`
  - `list-item.tsx`
  - `avatar.tsx`
  - `switch.tsx`
  - `input.tsx`
  - `modal.tsx`
  - `toast.tsx`
- Keep component props typed.
- Add accessible names and states.
- Use semantic tokens only.

### Phase 2: app shell

- Add the authenticated app layout for Profile.
- Implement desktop side nav and mobile bottom tabs.
- Mark the active Profile route with `aria-current="page"`.
- Keep all nav labels in messages.

### Phase 3: Profile screen composition

- Build `ProfilePage` as a server component where possible.
- Split client islands only for forms, toggles, theme, and language controls.
- Compose Figma sections using source-owned components.
- Match Figma spacing, hierarchy, and responsive behavior after token translation.

### Phase 4: Profile form behavior

- Add profile schema and form component.
- Add loading, dirty, saved, error, and disabled states.
- Add toast feedback for save success/error.
- Add sign-out confirmation modal if Figma includes sign-out.

### Phase 5: QA and visual review

- Compare against Figma screenshots in light and dark mode.
- Run keyboard path review.
- Run responsive review at 320, 390, 768, 1024, and 1440 px.
- Run axe smoke test for serious/critical violations.
- Confirm Spanish/English parity.

## 15. Suggested file changes

```text
src/app/[locale]/(app)/profile/page.tsx
src/app/[locale]/(app)/profile/loading.tsx
src/app/[locale]/(app)/profile/error.tsx
src/components/patterns/app-shell.tsx
src/components/patterns/profile/profile-page.tsx
src/components/patterns/profile/profile-overview.tsx
src/components/patterns/profile/profile-form.tsx
src/components/patterns/profile/profile-settings.tsx
src/components/ui/avatar.tsx
src/components/ui/card.tsx
src/components/ui/icon-button.tsx
src/components/ui/input.tsx
src/components/ui/list-item.tsx
src/components/ui/modal.tsx
src/components/ui/side-nav-item.tsx
src/components/ui/switch.tsx
src/components/ui/top-nav.tsx
src/components/ui/bottom-tabs.tsx
src/components/domain/phone-input.tsx
src/components/domain/safety-callout-card.tsx
src/lib/schemas/profile.ts
src/messages/es.json
src/messages/en.json
```

Keep scope tight. If a primitive is not needed by the Figma Profile node, skip it.

## 16. Acceptance criteria

Functional:

- `/es/profile` renders.
- `/en/profile` renders.
- Language switch preserves Profile route.
- Theme switch works in system, light, and dark modes.
- Profile form validates on blur and submit.
- Save, error, loading, disabled, and offline states are represented.

Design:

- Layout matches Figma node `249:150` after token translation.
- Uses DesignSystemOsteoplus components and semantic tokens.
- No raw hex values in components.
- No emoji.
- No ALL CAPS for emphasis.
- Lucide icons use 2 px stroke and round cap/join.

Accessibility:

- WCAG 2.2 AA contrast in light and dark modes.
- 48 x 48 minimum touch targets.
- Primary CTA at least 56 x 48.
- Visible focus rings.
- Correct labels and accessible names.
- No placeholder-only inputs.
- Keyboard order matches visual order.
- Reduced motion respected.

Responsive:

- No horizontal scroll at 320, 390, 768, 1024, or 1440 px.
- Text wraps cleanly at 200 % zoom.
- Bottom nav respects safe-area padding on mobile.
- Desktop side nav does not trap or hide content.

PWA:

- Manifest remains valid.
- Offline shell is clear.
- No sensitive profile data is cached in unsafe storage.

## 17. Verification commands

Run the narrow checks while building:

```bash
pnpm check
pnpm typecheck
pnpm test
```

Before marking the Profile implementation ready:

```bash
pnpm build
pnpm e2e
```

Add or run Playwright + axe checks for:

- `/es/profile` light mode
- `/es/profile` dark mode
- `/en/profile` light mode
- `/en/profile` dark mode
- Mobile width 390 px
- Desktop width 1440 px

## 18. Risks and decisions needed

Open decisions:

- Whether localized profile path should remain `/profile` or become `/perfil` in Spanish.
- Whether Profile is guest-visible after booking or auth-only.
- Which backend persistence layer is in scope for the first pass.
- Whether notification toggles are local-only or connected to account preferences.
- Whether profile avatar upload is in scope.

Risks:

- Exact Figma parity cannot be guaranteed until node context and screenshots are available.
- Profile may require auth/Supabase decisions that are outside the current landing-page setup.
- More primitives may be needed than the current repo has implemented.
- Dark-mode variants must be reviewed visually, not inferred from light mode.

## 19. Definition of ready for implementation

Implementation can start when:

- Figma node `249:150` screenshot and context are captured.
- Profile section list is confirmed.
- Auth/data scope is confirmed.
- The route decision is confirmed.
- Required UI primitives are identified from the Figma node.

## 20. Definition of done

The Profile implementation is ready for review when:

- `/es/profile` and `/en/profile` render successfully.
- Spanish and English strings have parity.
- Light and dark modes are both usable.
- Responsive checks pass at 320, 390, 768, 1024, and 1440 px.
- Axe has no serious or critical violations.
- Keyboard navigation works across every control.
- Reduced-motion mode is respected.
- `pnpm check`, `pnpm typecheck`, and `pnpm build` pass.
- Figma visual comparison notes are documented in `docs/qa/`.
