# Linkbase Coding Standards

Rules for writing code in this repo. Read with `architecture.md` for folder structure and naming.

## Language and tooling

- **TypeScript with `strict: true`** (set in `tsconfig.json`). All code is `.ts` / `.tsx`.
- **Prettier** formats all code. Don't hand-format or argue about style that Prettier decides.
- **ESLint** lints with the Next.js config (`eslint-config-next` core-web-vitals + typescript, in `eslint.config.mjs`). `eslint-config-prettier` turns off ESLint rules that conflict with Prettier.

```bash
npm run lint          # ESLint
npm run format        # Prettier --write
npm run format:check  # Prettier --check (no changes)
npx tsc --noEmit      # type-check
```

## Imports

Group imports in this order, with a blank line between groups:

1. External packages
2. Internal aliases (`@/lib/...`, `@/components/...`)
3. Relative imports

```ts
import { redirect } from "next/navigation";
import { Types } from "mongoose";

import { requireUser } from "@/lib/auth";
import { LinkModel } from "@/lib/db/models/link";
import { Button } from "@/components/ui/button";

import { LinkRow } from "./link-row";
```

## Components

- Components are **function declarations** with **typed props**.
- **Named exports only.** No default exports, except where Next.js requires them.

```tsx
type LinkCardProps = {
  title: string;
  url: string;
  onEdit?: () => void;
};

export function LinkCard({ title, url, onEdit }: LinkCardProps) {
  // ...
}
```

Default exports are allowed only in:

- Route files under `app/`: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `template.tsx`, `default.tsx`, `global-error.tsx`
- Tool config files that require them (`next.config.ts`, `eslint.config.mjs`)

## Async code

Use **`async`/`await`**. Never use `.then()` / `.catch()` chains.

```ts
// ✅
const user = await UserModel.findOne({ handle });

// ❌
UserModel.findOne({ handle }).then((user) => {
  /* ... */
});
```

## Errors

Throw **real `Error` objects** (or subclasses), never strings or plain objects.

```ts
// ✅
throw new Error("Link not found");

// ❌
throw "Link not found";
throw { message: "Link not found" };
```

## Type safety

- **No `any`.** Use `unknown` and narrow it, or write the real type.
- **No `@ts-ignore` without a comment explaining why.** Prefer `@ts-expect-error`, which fails when the error goes away.

```ts
// @ts-expect-error -- next-auth beta types don't include `handle` on Session yet
session.user.handle;
```
