# Meeting Room Booking System

## Stack

- Package manager: Bun (`bun.lock`).
- Frontend: TanStack Start (Vite) + TanStack Router + React Query.
- Backend: Convex (`convex/`).
- Auth: `better-auth` (Google OAuth configured).
- Styling: Tailwind CSS v4 (via `@tailwindcss/vite`).
- UI components: shadcn (Base UI template) + Base UI primitives (`@base-ui/react`).
- Validation: Zod v4 (use v4 APIs/docs, not Zod v3).

## Repo Layout

- `src/routes/`: File-based routes (TanStack Router).
- `src/router.tsx`: Router + React Query + Convex client wiring (uses `VITE_CONVEX_URL`).
- `src/styles/app.css`: Tailwind v4 entry + shadcn styles + animations + theme tokens.
- `src/lib/utils/env.ts`: Zod-validated env access (currently Google OAuth vars).
- `src/lib/utils/auth.ts`: `better-auth` configuration.
- `convex/`: Convex functions + schema.
    - `convex/myFunctions.ts`: Example query/mutation/action.
    - `convex/schema.ts`: DB schema (tables/types).
    - `convex/_generated/`: Generated Convex types/api (do not edit).
- `src/routeTree.gen.ts`: Generated route tree (do not edit).

## Common Commands (Bun)

- Install: `bun install`
- Dev (web + convex): `bun run dev`
- Web only: `bun run dev:web` (Vite on port 3000)
- Convex only: `bun run dev:convex`
- Typecheck watch: `bun run dev:ts`
- Build: `bun run build`
- Run prod build: `bun run start` (serves `.output/server/index.mjs`)
- Lint: `bun run lint`
- Format: `bun run format`

Notes:

- `dev` uses `concurrently` with `npm:` subcommands; if you don’t have `npm` available, run `bun run dev:web` and `bun run dev:convex` in separate terminals.
- Scripts currently invoke `npx convex ...`. If `npx` causes issues in your environment, replace with `bunx convex ...`.

Expected vars (based on current code/config):

- `CONVEX_DEPLOYMENT`: used by `convex dev` (in `.env.local`).
- `VITE_CONVEX_URL`: Convex URL exposed to the client (used in `src/router.tsx`).
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`: used for Google OAuth (`src/lib/utils/env.ts`, `src/lib/utils/auth.ts`).
- `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`: used by `better-auth` (present in `.env`).

## Dev Workflow Notes

- Frontend route changes happen in `src/routes/*.tsx`.
- Backend changes happen in `convex/*.ts`; `convex dev` updates generated types in `convex/_generated/`.
- Client data access uses `@convex-dev/react-query` + `@tanstack/react-query`:
    - Queries via `useSuspenseQuery(convexQuery(api.module.fn, args))`
    - Mutations/actions via `useMutation(...)` / `useAction(...)` from `convex/react`

## UI Notes (shadcn + Base UI)

- This project’s shadcn setup is intended to use the Base UI template; prefer Base UI primitives from `@base-ui/react` (not Radix).
- When adding shadcn components, ensure they are the Base UI variants and do not introduce `@radix-ui/*` dependencies unless explicitly requested.
- Tailwind animation utilities come from `tw-animate-css` (imported in `src/styles/app.css`).

## Conventions

- TypeScript is `strict` (`tsconfig.json`).
- ESLint config is TanStack + Convex (`eslint.config.mjs`).
- Prefer keeping generated files untouched: `convex/_generated/` and `src/routeTree.gen.ts`.
- If you hit unfamiliar/changed APIs (latest library changes), use Context7 to fetch up-to-date docs/examples for the specific library before implementing.
