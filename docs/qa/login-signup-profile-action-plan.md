# Login/SignUp Profile Sections Implementation Plan

Project: Osteóplus responsive PWA  
Figma source: DesignSystemOsteoplus, node `243:2` (`Login/SignUp`)  
Target scope: Login, sign up, and unauthenticated profile entry sections in Spanish and English, with light, dark, and system themes across desktop, tablet, and mobile.

## 1. Sources reviewed

### Osteóplus source of truth

- `documents/osteoplus-design-system.md`
- `documents/brand-kit.md`
- `documents/style-guide.md`
- `documents/osteoplus-project-dna.md`
- `documents/ui-kit.md`
- `preview/colors_and_type.css`
- `preview/buttons.html`
- `preview/components.html`

Decision: use the approved v4.2 token migration from `brand-kit.md`, `style-guide.md`, `ui-kit.md`, and `preview/colors_and_type.css` where it supersedes older v4.1 values:

- Filled CTA: Teal-700
- Accent: Orange-700
- Focus ring: Teal-500
- Teal-600 reserved for logo fill, brand borders, and icon emphasis

### Context7 documentation checked

- Next.js 15 App Router: route groups, localized `app/[locale]` routes, metadata, redirects, middleware route protection.
- next-intl: `defineRouting`, middleware, request config, locale params, message loading, server/client message access.
- next-themes: `ThemeProvider` with `attribute="class"`, `defaultTheme="system"`, `enableSystem`, `suppressHydrationWarning`, and hydration-safe theme controls.

### UI UX Pro Max review lens

Use UI UX Pro Max as a critique checklist, not as the source of truth. The review must enforce:

- WCAG 2.2 AA contrast and keyboard access
- 48 x 48 px minimum touch targets
- 56 x 48 px primary CTA minimum
- Visible labels, inline errors, no placeholder-only labels
- Mobile-first responsive layout
- No horizontal scroll
- Semantic color tokens only
- Reduced-motion support
- No emoji, no raw hex in components

## 2. Figma extraction summary

The Figma canvas `243:2` is named `Login/SignUp`. Screenshot was available through the Figma MCP. Structured metadata and sparse design context were captured for the main canvas and representative section nodes.

### Figma sections found

| Node | Name | Frame size | Notes |
|---|---:|---:|---|
| `245:696` | Login - Light | 700 x 900 | Desktop/light login specimen |
| `245:697` | Login - Dark | 700 x 900 | Desktop/dark login specimen |
| `245:762` | Sign Up - Dark | 700 x 1320 | Desktop/dark sign-up specimen |
| `247:2324` | Sign Up - Mobile / Light | 700 x 1421, inner 360 wide | Mobile/light sign-up specimen |
| `247:2325` | Sign Up - Mobile / Dark | 700 x 1421, inner 360 wide | Mobile/dark sign-up specimen |

### Login structure from Figma

- Outer artboard: 700 x 900
- Auth container: 440 x 710, positioned visually centered
- Form width: about 374 px
- Header:
  - Logo centered
  - Heading: "Welcome back"
  - Body: "Sign in to access your account"
- Fields:
  - Email address
  - Password with eye icon
  - Forgot password link aligned right
- Primary CTA
- Divider: "or continue with"
- Three social sign-in buttons
- Footer prompt:
  - "Don't have an account?"
  - "Create account"
- Close icon in top-right of container

### Sign-up structure from Figma

- Desktop auth container: 440 wide, about 1072 high
- Mobile inner frame: 360 wide, form width 312, 24 px side padding
- Header:
  - Logo centered
  - Heading: "Create account"
  - Body: "Sign up to manage your appointments and rehabilitation"
- Social buttons appear before the email form
- Divider: "or continue with"
- Fields:
  - Full name
  - Email address
  - Phone number optional, Spain-first format
  - Password with eye icon
  - Confirm password with eye icon
- Consent:
  - Health data processing consent
  - Terms and Conditions acceptance
  - Optional health tips/news opt-in
- GDPR reassurance row:
  - Shield/lock-style icon
  - "Your data is protected under GDPR"
- Primary CTA
- Footer prompt:
  - "Already have an account?"
  - "Sign in"
- Close icon in top-right of container

## 3. Accessibility-driven design decisions

These are required even when the Figma specimen is smaller.

| Figma detail | Required implementation decision |
|---|---|
| Text inputs around 44 px tall | Use 48 px minimum input height, or 56 px for comfortable/senior-friendly auth fields |
| Primary CTA shown as 48 px tall | Use 56 px height for primary sign-in/sign-up actions |
| Eye icon visual frame around 24 px | Keep the visible icon at 20-24 px, but make the button hit area 48 x 48 px |
| Close icon visual frame around 32 px | Use an accessible 48 x 48 px icon button |
| English text in Figma | Implement Spanish-first copy, then English parity through `next-intl` |
| Social provider buttons unknown from metadata | Use accessible labelled buttons with provider names, pending final auth provider selection |
| Consent checkboxes shown visually small | Keep 20 px visual checkbox if needed, but label row must provide a 48 px click/tap target |

## 4. Proposed information architecture

Use route groups for organization while preserving clean localized URLs.

```text
src/app/
  [locale]/
    (auth)/
      login/
        page.tsx
      signup/
        page.tsx
      forgot-password/
        page.tsx
    (app)/
      profile/
        page.tsx
```

Expected URLs:

- `/es/login`
- `/en/login`
- `/es/signup`
- `/en/signup`
- `/es/forgot-password`
- `/en/forgot-password`
- `/es/profile`
- `/en/profile`

Profile behavior:

- Unauthenticated user: show the Login/SignUp profile entry section using the Figma auth shell.
- Authenticated user: show a profile overview scaffold with account details, appointment management entry points, language/theme settings, and privacy actions.
- Protected personal data routes must redirect unauthenticated users to the localized login route.

## 5. Component architecture

### New reusable UI primitives

Add these under `src/components/ui/`:

- `input.tsx`
  - Label, helper, error, disabled, focus, filled states
  - 48/56 px height variants
  - `aria-invalid`, `aria-describedby`, stable IDs
- `password-input.tsx`
  - Wraps input plus show/hide toggle
  - Uses Lucide `Eye` and `EyeOff`
  - Toggle has localized `aria-label`
- `checkbox.tsx`
  - 48 px row hit target
  - Unchecked by default
  - Error and helper support
- `divider.tsx`
  - Labelled horizontal divider for "or continue with"
- `icon-button.tsx`
  - 48 x 48 px hit area
  - Required `aria-label`
- `form-message.tsx`
  - Consistent helper, error, and success text treatment

### New auth-specific components

Add these under `src/components/domain/auth/`:

- `auth-shell.tsx`
  - Shared centered surface, logo, close control, footer prompt
  - Widths: mobile 312 content width inside 360 viewport pattern, desktop 440 container
  - Uses tokenized card/surface colors
- `auth-header.tsx`
  - Logo variant switches by theme without hydration mismatch
  - Heading and description from message keys
- `social-auth-buttons.tsx`
  - Three labelled providers as configured by product/auth decision
  - Loading and disabled states
  - No provider-specific color unless tokenized and approved
- `login-form.tsx`
  - Email, password, forgot password, primary CTA
- `signup-form.tsx`
  - Full name, email, phone, password, confirm password, consent, terms, marketing opt-in, GDPR reassurance, primary CTA
- `profile-auth-entry.tsx`
  - Profile page unauthenticated section using the auth shell, with sign-in/sign-up entry points

### New schemas

Add under `src/lib/schemas/`:

- `auth.ts`
  - `loginSchema`
  - `signupSchema`
  - `forgotPasswordSchema`

Validation requirements:

- Validate on blur and submit
- Focus first invalid field on submit
- Email format validation
- Password minimum 8 characters
- Confirm password must match password
- Phone optional, Spain-first formatting
- Health data consent required
- Terms acceptance required
- Marketing opt-in optional and default unchecked

## 6. Copy and i18n plan

All user-facing strings must live in `src/messages/es.json` and `src/messages/en.json`.

### Suggested message namespace

```json
{
  "auth": {
    "login": {},
    "signup": {},
    "forgotPassword": {},
    "profileEntry": {},
    "fields": {},
    "actions": {},
    "errors": {},
    "social": {},
    "privacy": {}
  },
  "profile": {}
}
```

### Spanish-first copy draft

| Key | ES | EN |
|---|---|---|
| `auth.login.title` | Te damos la bienvenida | Welcome back |
| `auth.login.description` | Entra para gestionar tus citas y tu recuperación. | Sign in to manage your appointments and recovery. |
| `auth.login.submit` | Entrar | Sign in |
| `auth.login.forgotPassword` | ¿Has olvidado la contraseña? | Forgot your password? |
| `auth.login.noAccount` | ¿Aún no tienes cuenta? | Don't have an account? |
| `auth.login.createAccount` | Crear cuenta | Create account |
| `auth.signup.title` | Crear cuenta | Create account |
| `auth.signup.description` | Crea tu cuenta para gestionar tus citas y seguir tu rehabilitación. | Create your account to manage your appointments and follow your rehabilitation. |
| `auth.signup.submit` | Crear cuenta | Create account |
| `auth.signup.haveAccount` | ¿Ya tienes cuenta? | Already have an account? |
| `auth.signup.signIn` | Entrar | Sign in |
| `auth.fields.fullName` | Nombre completo | Full name |
| `auth.fields.email` | Correo electrónico | Email address |
| `auth.fields.phoneOptional` | Teléfono (opcional) | Phone number (optional) |
| `auth.fields.password` | Contraseña | Password |
| `auth.fields.confirmPassword` | Confirmar contraseña | Confirm password |
| `auth.fields.passwordHint` | Mínimo 8 caracteres | Minimum 8 characters |
| `auth.privacy.healthConsent` | Acepto que mis datos de salud se traten para gestionar mi atención en Osteóplus. | I consent to my health data being processed to manage my care at Osteóplus. |
| `auth.privacy.terms` | Acepto las condiciones de uso | I accept the terms of use |
| `auth.privacy.marketing` | Quiero recibir consejos de salud y novedades (opcional) | I would like to receive health tips and updates (optional) |
| `auth.privacy.marketingHelper` | Puedes darte de baja en cualquier momento desde ajustes. | You can unsubscribe at any time from settings. |
| `auth.privacy.gdpr` | Tus datos están protegidos según el RGPD. | Your data is protected under GDPR. |
| `auth.social.divider` | O continúa con | Or continue with |
| `auth.social.google` | Continuar con Google | Continue with Google |
| `auth.social.apple` | Continuar con Apple | Continue with Apple |
| `auth.social.email` | Continuar con correo | Continue with email |
| `auth.actions.close` | Cerrar | Close |
| `auth.actions.showPassword` | Mostrar contraseña | Show password |
| `auth.actions.hidePassword` | Ocultar contraseña | Hide password |

Avoid these words in final UI copy:

- revolutionary
- seamless
- cutting-edge
- simply
- just
- easily
- hype phrasing
- exclamation marks
- emoji

## 7. Visual implementation plan

### Layout

- Mobile first.
- Use a full-height auth page with `min-h-dvh`.
- Content max width:
  - Mobile: 312 px content inside 24 px side padding, matching the 360 px Figma specimen.
  - Tablet: 400-440 px auth container.
  - Desktop: 440 px auth container centered inside the route.
- Use 24 px internal padding on mobile and 32 px on tablet/desktop.
- Allow vertical scroll on sign-up; do not use nested scroll containers for the form.
- Use a single auth card/surface, not nested cards.
- Close control sits top-right inside the auth shell with 48 x 48 px hit area.

### Tokens

Use only semantic Tailwind tokens backed by CSS variables:

- Background: `bg-bg-primary`, `bg-bg-secondary`
- Surface: `bg-surface-card`, `bg-surface-elevated`
- Text: `text-text-primary`, `text-text-secondary`, `text-text-tertiary`
- Borders: `border-border-default`, `border-border-strong`, `border-border-brand`
- Focus: `outline-border-focus`
- CTA: `bg-brand-primary`, hover `bg-brand-primary-hover`, active `bg-brand-primary-active`
- Accent: use only for secondary emphasis, not primary auth submit

No raw hex values in components.

### Typography

- Headings use Merriweather through `font-heading`.
- UI, inputs, labels, helper text, buttons use Inter through `font-body`.
- Body and input text at least 16 px.
- Auth heading target: 24-30 px, sentence case.
- Labels: 14-16 px, semibold where useful.
- Helper/error text: 14 px minimum.

### Icons

Use Lucide only:

- `Eye`, `EyeOff` for password visibility
- `X` for close
- `ShieldCheck` or `LockKeyhole` for GDPR reassurance
- Provider icons need a decision:
  - Use approved provider SVG assets if legally acceptable and added as static assets.
  - Otherwise use neutral text-only social buttons until provider branding is approved.

### Motion

- Use Framer Motion only for meaningful transitions:
  - Page enter opacity/translate up, 150-200 ms
  - Field error reveal, 120-150 ms
  - Loading button spinner
- Respect `prefers-reduced-motion` with instant state changes.
- No parallax, autoplay, or decorative animation.

## 8. Profile sections plan

### Unauthenticated profile state

Route: `/[locale]/profile`

Show:

- Top nav or minimal auth-safe header
- Profile title from messages
- Auth entry section:
  - Sign-in primary action
  - Create account secondary action
  - Support copy: "Gestiona tus citas, tus ejercicios y tus preferencias desde tu perfil."
  - Clinic phone escape hatch for account access problems: `+34 93 123 45 67`

Implementation:

- Reuse `AuthShell` visual system if profile opens a dedicated auth view.
- If embedded in the profile page, use the same form components but avoid a modal unless required by the design.

### Authenticated profile scaffold

Show after auth is wired:

- Account summary: name, email, phone
- Appointment management entry
- Rehabilitation plan entry
- Language setting
- Theme setting: system, light, dark
- Notifications/marketing opt-in
- Privacy/legal links
- Sign out action

Do not show health-sensitive details in analytics or local unsafe storage.

## 9. Auth/backend decisions needed before implementation

The Figma node defines UI, not auth infrastructure. Confirm before wiring real submission:

- Auth provider: Supabase Auth is expected by Project DNA, but should be confirmed.
- Social providers: Google, Apple, and one more provider or email-only fallback.
- Email confirmation behavior.
- Password reset email copy and redirect route.
- Whether phone number is stored at account creation or later in profile.
- GDPR consent storage model and versioning.
- Legal URLs for terms and privacy policy.

Safe implementation path:

1. Build accessible UI and schemas first.
2. Stub submit handlers with typed result states.
3. Wire Supabase Auth only after provider and consent decisions are confirmed.

## 10. Implementation phases

### Phase 1: Repo alignment and route foundations

- Add or verify next-intl middleware for locale-prefixed routes.
- Keep `/` redirecting to `/es`.
- Add route groups:
  - `src/app/[locale]/(auth)/login/page.tsx`
  - `src/app/[locale]/(auth)/signup/page.tsx`
  - `src/app/[locale]/(auth)/forgot-password/page.tsx`
  - `src/app/[locale]/(app)/profile/page.tsx`
- Add localized metadata for auth/profile pages.
- Verify `next-themes` provider remains class-based with system default.

Acceptance checks:

- `/es/login`, `/en/login`, `/es/signup`, `/en/signup`, `/es/profile`, `/en/profile` render.
- Invalid locales return not found.
- Theme class applies to auth pages with no hydration warning.

### Phase 2: UI primitives

- Implement `Input`, `PasswordInput`, `Checkbox`, `IconButton`, `Divider`, and form message primitives.
- Match existing `Button` variant API and Osteóplus token naming.
- Add disabled, loading, focus, hover, pressed, error, helper, and filled states.
- Ensure all interactive controls meet 48 x 48 px minimum.

Acceptance checks:

- Keyboard focus order matches visual order.
- Icon-only buttons have localized accessible names.
- Inputs have visible labels and `aria-describedby`.
- No placeholder-only labels.

### Phase 3: Auth shell and forms

- Implement `AuthShell`, `AuthHeader`, `SocialAuthButtons`, `LoginForm`, and `SignupForm`.
- Preserve Figma composition:
  - centered logo and header
  - fixed-width auth surface
  - social stack
  - labelled divider
  - footer prompt
  - close action
- Use Spanish copy as source and English parity through messages.
- Use react-hook-form and Zod.
- Validate on blur and submit.
- Focus first invalid field on submit.

Acceptance checks:

- Sign-in and sign-up forms show loading, success, and error states.
- Consent boxes are unchecked by default.
- Required consent errors are shown inline near the fields.
- Password visibility toggle works by keyboard and pointer.

### Phase 4: Profile integration

- Implement unauthenticated `/profile` entry section.
- Add authenticated scaffold behind a typed placeholder session boundary.
- Keep account/profile copy out of components and in messages.
- Add clinic phone escape hatch for account access problems.

Acceptance checks:

- Unauthenticated profile is useful and does not dead-end.
- Authenticated scaffold does not expose medical data.
- Theme and language controls are reachable and labelled.

### Phase 5: Real auth wiring

- Add Supabase Auth clients only after provider decision.
- Wire email/password sign-in, account creation, password reset, and sign-out.
- Wire social provider buttons to configured providers.
- Store consent versions server-side.
- Keep pain, mood, and health-sensitive details out of analytics.

Acceptance checks:

- Auth errors use warm, action-oriented copy.
- Session redirects preserve locale.
- Public auth pages redirect authenticated users to localized profile or app home.
- Protected profile data redirects unauthenticated users to localized login.

### Phase 6: QA and review

Run:

```bash
pnpm check
pnpm typecheck
pnpm test
pnpm build
pnpm e2e
```

Add or update tests:

- Unit/component tests for schemas and form states.
- Playwright happy paths for `/es/login`, `/en/login`, `/es/signup`, `/en/signup`, `/es/profile`, `/en/profile`.
- Axe smoke tests for auth/profile pages.
- Theme tests for light, dark, and system.
- Reduced-motion smoke test.
- Responsive screenshots at 320, 390, 768, 1024, and 1440 px.

Manual QA checklist:

- No raw hex in components.
- No emoji.
- No hard-coded user-facing strings in components.
- Spanish and English message parity.
- Visible focus ring on every interactive element.
- All tap targets at least 48 x 48 px.
- Primary submit buttons at least 56 x 48 px.
- No horizontal scroll at 320 px.
- 200 % text scaling remains usable.
- Dark mode contrast passes.
- Error messages include a clear way forward.

## 11. File-level task list

Expected new files:

```text
src/app/[locale]/(auth)/login/page.tsx
src/app/[locale]/(auth)/signup/page.tsx
src/app/[locale]/(auth)/forgot-password/page.tsx
src/app/[locale]/(app)/profile/page.tsx
src/components/ui/input.tsx
src/components/ui/password-input.tsx
src/components/ui/checkbox.tsx
src/components/ui/icon-button.tsx
src/components/ui/divider.tsx
src/components/ui/form-message.tsx
src/components/domain/auth/auth-shell.tsx
src/components/domain/auth/auth-header.tsx
src/components/domain/auth/social-auth-buttons.tsx
src/components/domain/auth/login-form.tsx
src/components/domain/auth/signup-form.tsx
src/components/domain/auth/profile-auth-entry.tsx
src/lib/schemas/auth.ts
```

Expected updates:

```text
src/messages/es.json
src/messages/en.json
src/app/globals.css
src/components/ui/button.tsx
src/i18n/routing.ts
src/i18n/request.ts
next.config.ts
```

Potential new file:

```text
src/middleware.ts
```

## 12. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Figma social providers are instances without provider names in metadata | Confirm provider list before real auth wiring; use neutral accessible buttons in UI scaffold |
| Figma sizes conflict with 48/56 px touch rules | Preserve layout proportion, but enforce Osteóplus accessibility dimensions |
| English-first Figma copy conflicts with Spanish-first source | Treat Figma text as structural, rewrite Spanish first and translate to English with parity |
| Dark-mode token mismatch across older docs | Follow v4.2 migration and preview token file |
| Auth backend decisions are not final | Build typed UI and schemas first, wire Supabase after confirmation |
| Signup form may become long on mobile | Allow normal page scroll, avoid nested scroll, keep CTA reachable after consent |
| Password manager/autofill could disturb layout | Use semantic `autocomplete` values and stable input dimensions |

## 13. Definition of ready for implementation

- Figma Login/SignUp node reviewed and captured.
- Spanish-first and English copy approved.
- Auth provider and social providers confirmed.
- Terms/privacy URLs confirmed.
- Consent wording approved legally.
- Exact routing decision approved: dedicated `/login` and `/signup` routes plus `/profile` unauthenticated entry.

## 14. Definition of done

- `/es/login` and `/en/login` render with parity.
- `/es/signup` and `/en/signup` render with parity.
- `/es/profile` and `/en/profile` render unauthenticated and authenticated states.
- Light, dark, and system theme modes work.
- Responsive layout passes 320, 390, 768, 1024, and 1440 px.
- All copy comes from `next-intl` messages.
- No raw hex values in components.
- No emoji.
- Consent checkboxes default unchecked.
- Primary CTAs are at least 56 x 48 px.
- All interactive controls are at least 48 x 48 px.
- Axe smoke test has no serious or critical violations.
- `pnpm check`, `pnpm typecheck`, and `pnpm build` pass.
- Playwright auth/profile smoke tests pass.
