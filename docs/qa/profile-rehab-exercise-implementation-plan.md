# Osteóplus Profile Rehab/Exercise implementation plan

Date: 2026-05-10  
Figma source: DesignSystemOsteoplus, file `zM7bfBONIWsgvxH4KSff0J`  
Primary Figma node requested: `255:4009` (`Rehab/Exercise`)  
Related Profile nodes inspected: `263:2002` (`Mobile · Profile / Recovery`) and `250:1362` (`Web · Profile / Recovery`)  
Target stack: Next.js 15 App Router, React 19, TypeScript strict, Tailwind CSS v4, next-intl, next-themes, Framer Motion, PWA

> Note: The brand must render as `Osteóplus` in UI and metadata. This file name avoids accents for broad filesystem portability.

## 1. Goal

Implement the Profile recovery sections that connect the user's profile with Rehab/Exercise progress, matching the DesignSystemOsteoplus Figma direction across Spanish and English, light and dark mode, and PWA desktop, tablet, and mobile layouts.

The first implementation slice should deliver:

- Profile / Recovery screen for mobile and desktop.
- Rehab/Exercise entry points shown from Profile.
- Data-driven recovery goals, treatment plan, adherence, current program, and recent session summary.
- Spanish-first copy with English parity through `next-intl`.
- Design-system-compliant light and dark states using semantic CSS variables only.
- Responsive behavior at 320, 390, 768, 1024, and 1440 px.

## 2. Sources used

Local source-of-truth files:

- `documents/osteoplus-design-system.md`
- `documents/brand-kit.md`
- `documents/style-guide.md`
- `documents/osteoplus-project-dna.md`
- `documents/ui-kit.md`
- `src/app/globals.css`
- `src/messages/es.json`
- `src/messages/en.json`

Context7 checks:

- Next.js 15 App Router: locale routes belong under `app/[locale]`; `app/manifest.ts` is the supported manifest convention.
- next-intl: App Router setup uses `[locale]`, request-based message loading, and a provider/plugin setup.
- Tailwind CSS v4: project tokens should be exposed through CSS variables and `@theme`; dark mode is handled through class-based theme variables in this repo.

UI UX Pro Max review lens:

- Accessibility and touch targets first.
- Mobile-first layout with no horizontal scroll.
- Minimum 16 px input/body text, 18 px preferred for senior-facing content.
- Visible focus rings, keyboard access, screen-reader names.
- Meaningful motion only, with reduced-motion support.
- Semantic colors, no raw hex in components.

## 3. Figma findings

### Rehab/Exercise canvas (`255:4009`)

Important frames:

- `255:4017` M1 Exercise Home: top nav, Today/Library/Progress tabs, today's session card, ProgramCard list, bottom tab bar.
- `255:4075` M2 Program detail: bottom sheet with exercise list, equipment chips, safety/help toast, dual CTA row.
- `255:4118` M3 Pre-session pain check: radio group, helper copy, Continue CTA.
- `255:4150` M4 Safety gate: modal for unsafe pain state.
- `255:4165` and `255:4176` M5 Exercise player: progress header, video area, timer card, pause/next controls.
- `255:4206` M6 Rest: breathing/rest state.
- `255:4226` M7 Session complete: completion hero, pain picker, feedback and summary elements.
- `255:5243` W2 Exercise player web: desktop rail + video + timer/control side panel.

### Profile recovery frames

Mobile `263:2002`:

- Top nav height: 56 px.
- Body starts at 56 px, horizontal padding: 20 px.
- Breadcrumb: `Profile / Recovery`.
- Page title: `Recovery`.
- Intro: `Goals, milestones, current treatment plan.`
- Cards:
  - Current goals.
  - Treatment plan.
- Bottom tab bar: 64 px.

Web `250:1362`:

- Topbar height: 56 px.
- Left sidebar width: 260 px.
- Main content padding: 40 px horizontal, 32 px vertical.
- Content width target: 1100 px.
- Active sidebar item: Recovery, solid brand fill.
- Cards:
  - Current goals: three rows.
  - Treatment plan: two rows.

## 4. Product interpretation

Profile / Recovery should not duplicate the full Exercise player. It should summarize recovery status and provide clear routes into the Rehab/Exercise flow:

- Current goals: clinical goals assigned by the practitioner.
- Treatment plan: adherence and next milestone.
- Current program: the active rehab program from the Exercise area.
- Recent sessions: latest completion history, with pain-before and pain-after summarized without exposing sensitive details to analytics.
- Safety contact: clinic phone escape hatch for rehab concerns.

This creates a profile hub for the user's recovery context while the Exercise tab remains the place to perform daily sessions.

## 5. Route and file plan

Add app routes only after confirming the existing routing shape. Preferred route shape:

- `src/app/[locale]/profile/page.tsx`
- `src/app/[locale]/profile/recovery/page.tsx`
- Future profile subpages:
  - `personal-info`
  - `patient-context`
  - `care-history`
  - `favorites`
  - `you-family`
  - `privacy-security`
  - `notifications`
  - `accessibility`

Recommended component locations:

- `src/components/domain/profile/profile-shell.tsx`
- `src/components/domain/profile/profile-sidebar-nav.tsx`
- `src/components/domain/profile/profile-mobile-nav.tsx`
- `src/components/domain/profile/recovery-summary.tsx`
- `src/components/domain/profile/recovery-goals-card.tsx`
- `src/components/domain/profile/treatment-plan-card.tsx`
- `src/components/domain/profile/current-program-card.tsx`
- `src/components/domain/profile/recent-session-list.tsx`
- `src/components/domain/profile/recovery-safety-callout.tsx`

Reusable primitives to add only when needed:

- `src/components/ui/card.tsx`
- `src/components/ui/list-item.tsx`
- `src/components/ui/badge.tsx`
- `src/components/ui/progress.tsx`
- `src/components/ui/top-nav.tsx`
- `src/components/ui/bottom-tabs.tsx`
- `src/components/ui/side-nav-item.tsx`

## 6. Component mapping

| Figma pattern | Use in implementation | Notes |
|---|---|---|
| Top Nav Bar | Mobile profile subpage header | 56 px, back button 48 x 48, centered title. |
| Bottom Tab Bar | Mobile primary navigation | Four tabs per AGENTS: Home, Appointments, Exercises, Profile. Reconcile Figma labels that show Health/Messages. |
| SideNavItem | Desktop profile sidebar | Use `aria-current="page"` on active route. |
| Card | Recovery cards | Radius 12 px, border `border-default`, surface token. |
| Badge | Goal status and counts | Include text, not color-only. |
| ProgramCard | Active rehab program preview | Whole card clickable, focus-visible outline. |
| Tabs | Exercise Today/Library/Progress only | Keep specialized to rehab dashboard pattern. |
| Progress | Adherence and completion | Use `aria-valuenow`; avoid color-only meaning. |
| SafetyCalloutCard | Clinic phone and pain warning | Required for rehab safety contexts. |

## 7. Data model for first slice

Start with typed mock data close to final API shape:

```ts
type RecoveryGoal = {
  id: string;
  title: string;
  targetDate: string;
  status: "onTrack" | "pending" | "needsReview" | "complete";
};

type TreatmentPlanSummary = {
  adherenceCompleted: number;
  adherenceTotal: number;
  nextMilestone: string;
  nextMilestoneEta: string;
};

type ActiveProgramSummary = {
  id: string;
  title: string;
  category: string;
  durationMinutes: number;
  exerciseCount: number;
  practitionerName: string;
  currentDayLabel: string;
};

type RecentRehabSession = {
  id: string;
  date: string;
  programTitle: string;
  durationMinutes?: number;
  painBefore?: number;
  painAfter?: number;
  status: "completed" | "paused" | "skipped";
};
```

Keep schemas ready for later Supabase integration in `src/lib/schemas/profile-recovery.ts` with Zod.

## 8. i18n copy plan

Add a `profile.recovery` namespace to both `src/messages/es.json` and `src/messages/en.json`.

Spanish source:

```json
{
  "profile": {
    "recovery": {
      "breadcrumb": "Perfil / Recuperación",
      "title": "Recuperación",
      "intro": "Objetivos, hitos y plan de tratamiento actual.",
      "currentGoals": "Objetivos actuales",
      "treatmentPlan": "Plan de tratamiento",
      "activeProgram": "Programa actual",
      "recentSessions": "Sesiones recientes",
      "adherence": "Adherencia",
      "nextMilestone": "Próximo hito",
      "startSession": "Empezar sesión",
      "viewProgram": "Ver programa",
      "callClinic": "Llamar a la clínica",
      "safetyBody": "Si el dolor sube o algo no se siente bien, pausa el ejercicio y llama a la clínica."
    }
  }
}
```

English parity:

```json
{
  "profile": {
    "recovery": {
      "breadcrumb": "Profile / Recovery",
      "title": "Recovery",
      "intro": "Goals, milestones, and current treatment plan.",
      "currentGoals": "Current goals",
      "treatmentPlan": "Treatment plan",
      "activeProgram": "Current program",
      "recentSessions": "Recent sessions",
      "adherence": "Adherence",
      "nextMilestone": "Next milestone",
      "startSession": "Start session",
      "viewProgram": "View program",
      "callClinic": "Call clinic",
      "safetyBody": "If pain increases or something does not feel right, pause the exercise and call the clinic."
    }
  }
}
```

Avoid the Figma English-only strings in components. All UI text must come from messages.

## 9. Layout behavior

### Mobile: 320-767 px

- Use a single-column scroll view.
- Header stays at 56 px.
- Body padding: 16 px at 320, 20 px at 390.
- Bottom tab bar stays fixed at bottom with safe-area padding.
- Cards stack with 16 px gap.
- Primary action buttons are 56 x 48 minimum.
- Avoid table layouts; recent sessions render as accessible list rows.

### Tablet: 768-1023 px

- Keep single-column content but increase max width to 720-800 px.
- Use larger body text where density allows.
- Bottom navigation can remain if this behaves like installed PWA tablet mode; otherwise use top/sidebar nav after design approval.

### Desktop: 1024-1440 px

- Use profile shell with 56 px topbar and 260 px sidebar.
- Main content max width: about 1100 px.
- Cards full width in the main column.
- Keep the active `Recovery` sidebar item visually and semantically active.

## 10. Light and dark mode plan

Use semantic variables already present in `src/app/globals.css`:

- Background: `bg-bg-primary`, `bg-bg-secondary`, `bg-bg-tertiary`.
- Card surfaces: `bg-surface-card`, `bg-surface-elevated`.
- Text: `text-text-primary`, `text-text-secondary`, `text-text-tertiary`.
- Borders: `border-border-default`, `border-border-brand`, `focus-visible:outline-border-focus`.
- Filled primary: `bg-brand-primary`, hover `bg-brand-primary-hover`.
- Accent/gamification: `text-accent-default` or `bg-accent-subtle` sparingly.

Do not add raw hex values to React components. If a Figma token appears as `color/bg/brand`, map it to the repo's semantic variable rather than preserving slash-token syntax in component classes.

## 11. Accessibility plan

- Page title: one `h1`.
- Card titles: `h2`.
- Goal and treatment rows use semantic lists.
- Sidebar nav uses `nav` with an accessible label.
- Active desktop sidebar link uses `aria-current="page"`.
- Bottom tabs use visible labels and accessible names.
- Icon-only back/theme buttons require `aria-label`.
- Progress uses `role="progressbar"` with `aria-valuemin`, `aria-valuemax`, and `aria-valuenow`.
- Badge/status text includes visible words such as "on track", "pending", "completed".
- Safety card includes clinic phone number as a `tel:` link.
- All touch targets are at least 48 x 48 px.
- Focus rings remain visible in light and dark mode.

## 12. PWA and offline behavior

- Profile / Recovery may render cached shell and last known safe summary while offline.
- Do not cache sensitive pain or mood details in unsafe storage.
- Offline copy should include the clinic phone escape hatch.
- Exercise start CTA should degrade to a clear offline state if the session assets are unavailable.
- Manifest remains in `src/app/manifest.ts`; icons and theme colors should continue to follow approved brand assets.

## 13. Implementation phases

### Phase 1: Foundation audit

- Confirm current package versions: Next.js 15, React 19, Tailwind v4, next-intl, next-themes.
- Review existing `Button`, `ThemeToggle`, `LanguageToggle`, `BrandLogo`, and landing patterns.
- Identify missing primitives needed for Profile.
- Ensure global tokens include all required semantic aliases used by the new screens.

### Phase 2: Shell and navigation

- Build `ProfileShell` for responsive layout.
- Add desktop sidebar from Figma Profile web frames.
- Add mobile top nav and bottom tab bar.
- Reconcile nav labels with project rules: Home, Appointments, Exercises, Profile.
- Add route-aware active state and keyboard focus.

### Phase 3: Recovery content cards

- Build `RecoveryGoalsCard`.
- Build `TreatmentPlanCard`.
- Build `CurrentProgramCard` using the ProgramCard pattern from Rehab/Exercise.
- Build `RecentSessionList` with mobile list rows and desktop list/table-like layout.
- Add `RecoverySafetyCallout`.

### Phase 4: i18n and copy

- Add `profile.recovery` messages in ES and EN.
- Format dates with `date-fns` using `es` and `en-GB`.
- Validate Spanish first, then English tone parity.
- Remove all hard-coded UI strings from components.

### Phase 5: State and privacy behavior

- Add typed mock fixtures or server-safe loader shape.
- Add loading, empty, error, and offline states.
- Keep pain and mood data out of analytics.
- Include safety phone escape hatch in errors and warning states.

### Phase 6: Visual and responsive QA

- Check 320, 390, 768, 1024, and 1440 px widths.
- Check light, dark, and system modes.
- Check text scaling to 200 percent.
- Verify no horizontal scroll.
- Compare against Figma mobile `263:2002` and web `250:1362`.

### Phase 7: Automated checks

Run:

```bash
pnpm check
pnpm typecheck
pnpm build
```

For UI behavior and accessibility changes, also run:

```bash
pnpm e2e
```

Add or update Playwright + axe smoke coverage for:

- `/es/profile/recovery`
- `/en/profile/recovery`
- Light mode.
- Dark mode.
- Keyboard navigation.
- Offline fallback where applicable.

## 14. Acceptance criteria

- `/es/profile/recovery` and `/en/profile/recovery` render.
- Spanish and English have complete message parity.
- No hard-coded user-facing strings in Profile components.
- Light and dark modes both match semantic-token intent.
- Desktop layout uses topbar + sidebar.
- Mobile layout uses top nav + bottom tab bar.
- Touch targets meet 48 x 48 px; primary CTAs meet 56 x 48 px.
- Active route is visible and has `aria-current="page"`.
- Safety copy includes clinic phone.
- No emoji in UI.
- No raw hex in components.
- No serious or critical axe violations.
- Reduced motion is respected.
- `pnpm check`, `pnpm typecheck`, and `pnpm build` pass.

## 15. Design decisions to confirm before coding

1. Whether the mobile bottom tab labels should follow AGENTS exactly (`Home`, `Appointments`, `Exercises`, `Profile`) or the Profile Figma frame (`Home`, `Appointments`, `Health`, `Messages`). The repo rule says use AGENTS.
2. Whether Profile / Recovery is a subpage route (`/profile/recovery`) or a tabbed Profile page section. The Figma frames imply subpages.
3. Whether the current program card should link to `/exercises` or directly to `/exercises/{programId}`. The Rehab/Exercise Figma supports a program detail step.
4. Whether recent session pain values are visible to patients in Profile. If yes, keep them local to the authenticated care context and out of analytics.

## 16. Recommended first development task

Implement the Profile shell and the `/[locale]/profile/recovery` screen with static typed data and full ES/EN messages. Then wire the Start session and View program CTAs to placeholder routes or existing Exercise routes, depending on what exists in the codebase at implementation time.

This gives the team a reviewable UI slice without blocking on Supabase schema work.
