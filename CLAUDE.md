# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

All commands run from `linkbase/` (the Next.js app lives in this subfolder of `Project_1_Linkbase/`).

```bash
npm run dev      # dev server (Turbopack) on http://localhost:3000
npm run build    # production build — also type-checks
npm run start    # serve the production build
npm run lint     # ESLint (flat config, eslint-config-next core-web-vitals + typescript)
npm run format   # Prettier --write (format:check to only verify)
npx tsc --noEmit # type-check only
```

Prettier uses default options (`.prettierrc` is `{}`). `docs/design-system.md` and `docs/ui.md` are in `.prettierignore` so their hand-written formatting is kept.

No test framework is configured yet.

## Stack and project state

Freshly scaffolded with `create-next-app`; `src/app/page.tsx` and the `metadata` in `src/app/layout.tsx` are still template placeholders. No app-specific features exist yet.

- **Next.js 16.4 (App Router) + React 19.3**, TypeScript strict. Versions are newer than most training data — per `AGENTS.md`, consult `node_modules/next/dist/docs/` (`01-app/`, `03-architecture/`, …) before using any Next.js API.
- **`next.config.ts` enables `cacheComponents` and `partialPrefetching`.** With Cache Components on, data fetching/dynamic access is uncached by default and must be opted into caching (`"use cache"`) or wrapped in `<Suspense>`; read the docs before writing data-loading code.
- **Tailwind CSS v4** is wired through a Turbopack loader rule (`@tailwindcss/turbopack` on `*.css`) in `next.config.ts` — there is no `postcss.config` or `tailwind.config`. Theme tokens are defined in `src/app/globals.css` via `@theme inline` (`--color-background`, `--color-foreground`, Geist font variables); dark mode follows `prefers-color-scheme`.
- Route components use Next's global typed helpers (e.g. `LayoutProps<"/">`) generated into `.next/types` — no import needed.
- Path alias: `@/*` → `src/*`.

## Doc Convention

Whenever a new file is created in `docs/`, add it to the Project docs list below with one line on what it covers and when to read it.

### Project docs

- `docs/architecture.md`: rendering model (Server vs Client Components, Server Actions), folder structure (`app/`, `components/ui`, `components/[feature]`, `lib/`) and naming conventions. Read it before creating any new file, route or Server Action.
- `docs/database.md`: Mongoose setup, the single cached connection helper, model conventions (strict, timestamps, `userId`/`handle` indexes) and per-user query scoping. Read it before writing any model, query or Server Action that touches data.
- `docs/auth.md`: NextAuth setup, protected `(dashboard)` routes vs public `/user/[handle]`, the three enforcement layers (`proxy.ts`, dashboard layout, `requireUser()` in every Server Action) and ownership rules. Read it before adding a route, a Server Action or anything that reads the session.
- `docs/routing.md`: route map (public `/` and `/user/[handle]`, `(auth)` and protected `(dashboard)` groups), per-route `layout`/`loading`/`error` files, and Route Handlers (webhooks/callbacks only) vs Server Actions. Read it before adding or moving a page, layout or API route.
- `docs/coding-standards.md`: TypeScript strict, Prettier + ESLint, import order, component style (function declarations, typed props, named exports), async/await, `Error` objects, no `any`/unexplained `@ts-ignore`. Read it before writing any code.

- `docs/design-system.md`: design tokens (colors, typography, spacing, radius, shadows, breakpoints, motion) and the Tailwind v4 `@theme` setup. Read it before writing styles or changing `globals.css`.
- `docs/ui.md`: component specs (Button, Input, LinkButton, LinkCard, NavRail…), page layouts (`/[username]`, `/admin`, `/register/username`, `/`), icon libraries and accessibility rules. Read it before building or changing any UI component or page.
