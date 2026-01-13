# Login Page Plan (Meeting Room Booking System)

## Goal

Add a `/login` page that supports:

1. Email + password authentication
2. Google OAuth (via `better-auth`)

On success: navigate to the home page (`/`).

On error: show either:

- Client-side Zod validation errors (per-field)
- Server response errors (form-level or field-level when possible)

## Libraries / Constraints

- Form: `@tanstack/react-form`
- Validation: `zod` v4 (use v4 APIs)
- Auth: `better-auth`
- Routing: TanStack Router (file-based routes in `src/routes/`)
- Styling: Tailwind CSS v4 + shadcn components

## Proposed Route + UI

- Route file: `src/routes/login.tsx` (URL path: `/login`)
- Layout:
    - Page title: “Sign in”
    - Email input
    - Password input (+ optional “show password” toggle)
    - Primary button: “Sign in”
    - Divider
    - Secondary button: “Continue with Google”
- Accessibility / UX:
    - `autocomplete="email"` and `autocomplete="current-password"`
    - Disable buttons while submitting
    - Show inline field errors under inputs
    - Show a top-of-form error banner for server errors

## Validation (Zod v4)

Define a Zod schema used by `@tanstack/react-form`:

- `email`: required, valid email
- `password`: required, minimum length `>= 6`

Mapping:

- Zod issues → field errors (email/password)
- Non-field server errors → form-level error banner

## Auth Flows (better-auth)

### Email + Password

- Submit handler calls a TanStack Start server function that performs the `better-auth` email/password sign-in.
- On success:
    - Ensure session/cookies are set (server-side if required by `better-auth`)
    - Navigate to `/`
- On failure:
    - If the server returns field-specific errors (rare), map them to the relevant field
    - Otherwise display the server message at form-level

### Google OAuth

- “Continue with Google” calls a server function that starts the Google OAuth flow via `better-auth` (or redirects to the required `better-auth` callback route if needed).
- On success: navigate to `/`
- On failure: show server message at form-level

## Dependency + Wiring Work (Needed Before UI Works)

These items are currently missing or incomplete in the repo and must be decided/implemented for the login page to function end-to-end:

1. `@tanstack/react-form` dependency (not currently in `package.json`)
2. `better-auth` setup for email/password (current `src/lib/utils/auth.ts` only configures Google)
3. Implement auth requests via TanStack Start server functions (preferred):
    - Use server functions for login requests and error normalization.
    - Add explicit API routes only if `better-auth` requires them (commonly for OAuth callbacks).
4. Decide the exact client→server call shape:
    - form submit calls a server function for email/password sign-in
    - Google button triggers a server-side redirect flow (server function or required callback route), then returns the user to the app

## Environment / OAuth Configuration

- Required env vars (already present in `.env`, but validate/confirm values):
    - `BETTER_AUTH_SECRET`
    - `BETTER_AUTH_URL` (dev: `http://localhost:3000`)
    - `GOOGLE_CLIENT_ID`
    - `GOOGLE_CLIENT_SECRET`
- Google Cloud Console configuration must include the correct Authorized redirect URI(s) for the `better-auth` Google callback (exact path depends on how auth routes are mounted; confirm before wiring the UI).

## Error Handling Requirements

### Client-side (Zod)

- Invalid email format → show under email field
- Empty/too-short password → show under password field

### Server-side

Display server errors from `better-auth` such as:

- Incorrect email/password
- User not found / account not linked
- OAuth cancelled/failed
- Generic unexpected error

Presentation:

- Form-level error banner at top of the form
- Do not leak sensitive details (keep messages user-friendly)

## Success Handling Requirements

- After successful login (email/password or Google):
    - Redirect/navigate to `/`
    - Future: support a `redirect` / `next` query param (“return to where you came from”)
    - Auth state relies on cookies + server session (no client-side user state required initially)
    - Post-login destination is `/` for now

## Confirmed Decisions

- Sign up is a separate page (not part of `/login`).
- “Forgot password” is deferred.
- Password policy (for now): minimum length `>= 6`.
- Google OAuth users are auto-created on first sign-in.

## Acceptance Criteria

- `/login` renders and is reachable.
- Email/password form validates via Zod and blocks submit until valid.
- Google button initiates OAuth via `better-auth`.
- Successful auth navigates to `/`.
- Zod errors show next to fields; server errors show clearly without breaking layout.
