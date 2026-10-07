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
npx tsc --noEmit # type-check only
```

No test framework is configured yet.

## Stack and project state

Freshly scaffolded with `create-next-app`; `src/app/page.tsx` and the `metadata` in `src/app/layout.tsx` are still template placeholders. No app-specific features exist yet.

- **Next.js 16.4 (App Router) + React 19.3**, TypeScript strict. Versions are newer than most training data — per `AGENTS.md`, consult `node_modules/next/dist/docs/` (`01-app/`, `03-architecture/`, …) before using any Next.js API.
- **`next.config.ts` enables `cacheComponents` and `partialPrefetching`.** With Cache Components on, data fetching/dynamic access is uncached by default and must be opted into caching (`"use cache"`) or wrapped in `<Suspense>`; read the docs before writing data-loading code.
- **Tailwind CSS v4** is wired through a Turbopack loader rule (`@tailwindcss/turbopack` on `*.css`) in `next.config.ts` — there is no `postcss.config` or `tailwind.config`. Theme tokens are defined in `src/app/globals.css` via `@theme inline` (`--color-background`, `--color-foreground`, Geist font variables); dark mode follows `prefers-color-scheme`.
- Route components use Next's global typed helpers (e.g. `LayoutProps<"/">`) generated into `.next/types` — no import needed.
- Path alias: `@/*` → `src/*`.
