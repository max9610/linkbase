# Linkbase Architecture

How the app is structured and named. Read with `ui.md` for component specs and `design-system.md` for tokens.

All paths below are relative to `src/` (imported via the `@/*` alias).

## Rendering model

The app uses the Next.js App Router (`src/app/`).

- **Server Components are the default.** Every component is a Server Component unless it needs interactivity.
- **Client Components only where interactivity is needed**: state, effects, event handlers or browser APIs. Add `"use client"` at the top of the file. Keep these components small and as deep in the tree as possible, so the rest of the page stays on the server.
- Mutations go through **Server Actions** (`"use server"`).

## Folder structure

```
src/
├── app/                  # routes, layouts, pages (App Router)
├── components/
│   ├── ui/               # UI primitives (Button, Input, Switch…)
│   └── [feature]/        # feature components, one folder per feature
└── lib/
    ├── db/               # database client
    ├── auth/             # auth helpers
    ├── types/            # shared TypeScript types
    └── validation/       # shared Zod schemas
```

- **`lib/`** holds shared, non-UI code. The database client, auth helpers, types and validation schemas each live in their own folder.
- **`components/ui/`** holds generic primitives with no feature knowledge. Their specs are in `ui.md`.
- **`components/[feature]/`** holds components for one feature (for example `components/dashboard/`). They can use `components/ui/` and `lib/`, but `components/ui/` never imports from a feature folder.

## Naming

| What              | Convention           | Example                                     |
| ----------------- | -------------------- | ------------------------------------------- |
| Files and folders | kebab-case           | `link-card.tsx`, `lib/auth/get-session.ts`  |
| React components  | PascalCase           | `export function LinkCard()`                |
| Server Actions    | verb-first camelCase | `createLink`, `updateProfile`, `deleteLink` |
