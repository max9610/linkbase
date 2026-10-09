# Linkbase Data Fetching

How the app reads data and caches it. Read with `database.md` for models and scoping, `auth.md` for the session, and `errors-and-validation.md` for the write side (Server Actions).

All paths below are relative to `src/`.

## Rules

- **Reads happen in Server Components, calling the database directly.** No `fetch` to the app's own API routes (those are only for webhooks and callbacks, see `routing.md`).
- **Every query is scoped**: private data by the signed-in user's `userId`, public profile pages by `handle`.
- **Cache where it helps**, always with a tag, so mutations can clear it.
- **Client Components never query the database.** They receive data as props from a Server Component.

## Read functions

Read functions live in `lib/db/queries/`, one file per domain (kebab-case). Pages and layouts call them; they are never imported into Client Components.

Return **plain, serializable objects**: use `.lean()` and convert `ObjectId` and `Date` values. A Mongoose document can't be cached or passed as a prop to a Client Component.

```ts
// src/lib/db/queries/links.ts
import { cacheTag } from "next/cache";

import { connectDb } from "@/lib/db/connect";
import { LinkModel } from "@/lib/db/models/link";

export const getLinksForUser = async (userId: string) => {
  "use cache";
  cacheTag(`links:${userId}`);

  await connectDb();
  const links = await LinkModel.find({ userId }).sort({ createdAt: 1 }).lean();
  return links.map((link) => ({
    id: link._id.toString(),
    title: link.title,
    url: link.url,
  }));
};
```

## Scoping

| Data                            | Scoped by | Where the value comes from                       |
| ------------------------------- | --------- | ------------------------------------------------ |
| Private (dashboard)             | `userId`  | The session, via `requireUser()` (see `auth.md`) |
| Public profile `/user/[handle]` | `handle`  | The route param, returning only public fields    |

**Cached functions can't read cookies or headers**, so they can't call `requireUser()` themselves. Read the session in the page, outside the cache, and pass `userId` as an argument. The argument becomes part of the cache key, so each user gets their own cache entry.

```tsx
// src/app/(dashboard)/dashboard/page.tsx
import { requireUser } from "@/lib/auth";
import { getLinksForUser } from "@/lib/db/queries/links";
import { LinkList } from "@/components/dashboard/link-list";

export default async function DashboardPage() {
  const { userId } = await requireUser();
  const links = await getLinksForUser(userId);

  return <LinkList links={links} />; // Client Component gets plain props
}
```

## Caching

`next.config.ts` enables **Cache Components** (`cacheComponents: true`). In this mode:

- **Use the `"use cache"` directive with `cacheTag()`** to cache database reads. In Next.js 16, `unstable_cache` is replaced by `"use cache"` (see `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/unstable_cache.md`). Don't use `unstable_cache`.
- **Use `fetch` with `next: { tags: [...] }`** only for external HTTP APIs.
- **Uncached reads are dynamic.** Wrap them in `<Suspense>` (or give the route a `loading.tsx`), otherwise the build fails.
- Only cache when it helps: data that is read often and changes rarely, like a public profile. Don't cache every query by default.

### Tags

Every cached read has a tag that names exactly what it holds:

| Tag                 | Holds                                     |
| ------------------- | ----------------------------------------- |
| `links:${userId}`   | A user's links in the dashboard           |
| `profile:${handle}` | The public profile page data for a handle |

## Clearing the cache after mutations

Every Server Action that changes data clears the tags it affects, after the write succeeds.

- **`updateTag(tag)`** for data the user who made the change sees next (read-your-own-writes). Only works in Server Actions.
- **`revalidateTag(tag, "max")`** for data where a short delay is fine, such as the public profile. Also the one to use in Route Handlers (webhooks). The single-argument form is deprecated.

```ts
"use server";

import { revalidateTag, updateTag } from "next/cache";

export const createLink = async (/* ... */) => {
  const { userId, handle } = await requireUser();
  // ...validate and write (see errors-and-validation.md)

  updateTag(`links:${userId}`); // dashboard shows the new link right away
  revalidateTag(`profile:${handle}`, "max"); // public profile refreshes in the background
};
```
