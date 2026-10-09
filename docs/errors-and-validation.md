# Linkbase Errors and Validation

How input is validated and how errors reach (or don't reach) the user. Read with `auth.md` and `database.md` for the rest of the Server Action flow.

All paths below are relative to `src/`.

## Two kinds of errors

| Kind                 | Example                                | How it's handled                                                  |
| -------------------- | -------------------------------------- | ----------------------------------------------------------------- |
| **Validation error** | empty title, invalid URL, handle taken | **Returned** as a typed result, rendered inline next to the field |
| **Unexpected error** | database down, bug, missing env var    | **Thrown**, caught by the nearest `error.tsx`, logged on server   |

Never throw a validation error. Never return an unexpected error to the form.

## Validation with Zod

**All input is validated with Zod at the Server Action boundary, before touching the database.** Treat everything from the client (form data, arguments) as `unknown` until it passes a schema.

Shared schemas live in `lib/validation/`, one file per domain (kebab-case), so the same schema can be reused by several actions and by the form for client-side hints.

```ts
// src/lib/validation/link.ts
import { z } from "zod";

export const linkInputSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(100),
  url: z.url("Enter a valid URL"),
});

export type LinkInput = z.infer<typeof linkInputSchema>;
```

## Action result type

Validation errors come back as a typed result object that the form can render inline.

```ts
// src/lib/types/action-result.ts
export type ActionResult<T = void> =
  | { ok: true; data: T }
  | {
      ok: false;
      fieldErrors: Partial<Record<string, string[]>>;
      formError?: string; // safe, user-facing message not tied to one field
    };
```

## Server Action flow

Order inside every Server Action: **auth → validate → database**.

```ts
"use server";

import { z } from "zod";

import { requireUser } from "@/lib/auth";
import { connectDb } from "@/lib/db/connect";
import { LinkModel } from "@/lib/db/models/link";
import type { ActionResult } from "@/lib/types/action-result";
import { linkInputSchema } from "@/lib/validation/link";

export const createLink = async (
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> => {
  const { userId } = await requireUser();

  const parsed = linkInputSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  await connectDb();
  await LinkModel.create({ ...parsed.data, userId });
  return { ok: true, data: undefined };
};
```

- Use `safeParse`, never `parse`: `parse` throws, and validation errors must not be thrown.
- Only `parsed.data` goes to the database, never the raw input.
- `userId` comes from the session, never from the parsed input (see `auth.md`).

The form reads the result with `useActionState` and shows each message next to its field:

```tsx
"use client";

const [state, formAction, pending] = useActionState(createLink, null);
// ...
{
  state?.ok === false && state.fieldErrors.url?.[0];
}
```

## Unexpected errors

- **Throw them** as real `Error` objects (see `coding-standards.md`). Don't catch them just to return a result.
- They are **caught by the nearest `error.tsx`** (see `routing.md`). Each route that needs custom error UI adds one.
- **Log them on the server with enough context to debug**: what failed, the action or route name, the relevant ids (`userId`, `linkId`) and the original error. Never log passwords, tokens or full secrets.

```ts
try {
  await LinkModel.create({ ...parsed.data, userId });
} catch (error) {
  console.error("[createLink] failed to create link", { userId, error });
  throw new Error("Failed to create link", { cause: error });
}
```

Only add a `try/catch` like this when it adds context. Otherwise let the error bubble up.

## What the client may see

**Never expose raw error messages or stack traces to the client.**

- `fieldErrors` and `formError` contain only messages written for users (the Zod schema's messages or a fixed string).
- `error.tsx` shows a generic message and a retry button. It never renders `error.message` or `error.stack`. In production, Next.js replaces the message of server errors anyway; use `error.digest` to match the error in the client with the server log.
- Never put a caught error, a database error or `String(error)` into `formError`.
