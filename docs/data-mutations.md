# Linkbase Data Mutations

How the app writes data. Read with `errors-and-validation.md` for Zod schemas and the `ActionResult` type, `data-fetching.md` for cache tags, and `auth.md` for the session.

All paths below are relative to `src/`.

## Rules

- **All writes go through Server Actions** (`"use server"`), never API routes. Route Handlers are only for webhooks and third-party callbacks (see `routing.md`).
- Server Actions are named verb-first (`createLink`, `updateLink`, `deleteLink`; see `architecture.md`).
- **Actions return a typed result. They don't throw for expected failures.** Only unexpected errors are thrown.

## The five steps

Every action runs these steps, in this order:

1. **Check the session.** Call `requireUser()` and take `userId` from it (see `auth.md`).
2. **Validate the input** with the matching Zod schema from `lib/validation/` using `safeParse`. On failure, return the field errors.
3. **Scope the query** to the signed-in user: `userId` goes in the filter of every update or delete, and on every new document.
4. **Perform the write** with `parsed.data` only, never the raw input.
5. **Refresh affected views** with `revalidateTag` / `updateTag` or `revalidatePath`.

```ts
"use server";

import { revalidatePath, updateTag } from "next/cache";
import { z } from "zod";

import { requireUser } from "@/lib/auth";
import { connectDb } from "@/lib/db/connect";
import { LinkModel } from "@/lib/db/models/link";
import type { ActionResult } from "@/lib/types/action-result";
import { linkInputSchema } from "@/lib/validation/link";

export const updateLink = async (
  linkId: string,
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> => {
  // 1. Session
  const { userId, handle } = await requireUser();

  // 2. Validate
  const parsed = linkInputSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { ok: false, fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  // 3 + 4. Scoped write
  await connectDb();
  const { matchedCount } = await LinkModel.updateOne(
    { _id: linkId, userId },
    parsed.data,
  );
  if (matchedCount === 0) {
    return { ok: false, fieldErrors: {}, formError: "Link not found" };
  }

  // 5. Refresh views
  updateTag(`links:${userId}`);
  revalidatePath(`/user/${handle}`);

  return { ok: true, data: undefined };
};
```

## Result type

Actions return `ActionResult<T>` from `lib/types/action-result.ts` (defined in `errors-and-validation.md`):

- `{ ok: true, data }` on success. `data` is whatever the form needs back (for example the new link's `id`), or `undefined`.
- `{ ok: false, fieldErrors, formError? }` for **expected failures**, rendered inline by the form.

| Failure                                     | Expected? | What the action does                                 |
| ------------------------------------------- | --------- | ---------------------------------------------------- |
| Input fails the Zod schema                  | Yes       | Return `fieldErrors`                                 |
| Document not found or owned by another user | Yes       | Return `formError` (same message for both, no leaks) |
| Unique value taken (e.g. `handle`)          | Yes       | Return a `fieldErrors` entry for that field          |
| No session                                  | –         | `requireUser()` redirects / throws                   |
| Database down, bug, missing env var         | No        | Throw; the nearest `error.tsx` handles it (logged)   |

A "not found" and a "not yours" result must look the same to the client, so a user can't probe for other users' ids.

## Refreshing views

Call the refresh **after** the write succeeds, never before and never on a failed result.

- **Tags** (preferred) for data read through cached functions (see `data-fetching.md` → Tags):
  - `updateTag(tag)` when the user who made the change sees it next (the dashboard).
  - `revalidateTag(tag, "max")` when a short delay is fine. The single-argument form is deprecated.
- **`revalidatePath(path)`** when a whole page should refresh and its data isn't tagged, for example ``revalidatePath(`/user/${handle}`)``. For a dynamic pattern, pass the type: `revalidatePath("/user/[handle]", "page")`.

Refresh everything the write affects. A link change usually affects both the dashboard and the public profile.
