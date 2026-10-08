# Linkbase Auth

How users sign in and how access is enforced. Read with `database.md` for ownership checks and `architecture.md` for folder structure.

All paths below are relative to `src/`.

## Stack

**NextAuth** (Auth.js) handles sign-in, sessions and security, following its defaults and industry best practices. Don't build custom session, cookie or password handling.

```
src/
├── lib/auth/            # NextAuth config + helpers (auth, signIn, signOut, requireUser)
├── app/api/auth/[...nextauth]/route.ts   # NextAuth route handler
└── proxy.ts             # route protection (Next.js 16 name for middleware)
```

Sign-in providers are **TBD**.

## Route access

| Routes              | Access                                            |
| ------------------- | ------------------------------------------------- |
| `app/(dashboard)/*` | **Protected.** Requires an authenticated session. |
| `/user/[handle]`    | **Public.** Open to everyone, signed in or not.   |

Everything in the `(dashboard)` route group is protected by default. A new page added there is protected without any extra code.

Access is enforced in three layers. **Each one is required. Never rely on only one.**

### 1. Proxy (middleware)

In Next.js 16 `middleware.ts` is deprecated and renamed to **`proxy.ts`** (see `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`). It redirects unauthenticated requests to sign-in before the page renders.

```ts
// src/proxy.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const proxy = auth((req) => {
  if (!req.auth) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
});

export const config = {
  // Route groups like (dashboard) don't appear in the URL.
  // Every page under app/(dashboard)/ lives under /dashboard.
  matcher: ["/dashboard/:path*"],
};
```

The matcher must stay in sync with the URLs of `app/(dashboard)/`, because a route group is not part of the URL (see `routing.md`). Never add `/user/:path*` to it. The sign-in page is `/sign-in` in the `(auth)` group; set it as `pages.signIn` in the NextAuth config.

### 2. Dashboard layout

`app/(dashboard)/layout.tsx` checks the session again on the server and redirects if there is none. This catches any page the matcher misses.

### 3. Every Server Action

**Identity is enforced on the server in every Server Action.** Server Actions run as POST requests to the page that uses them, so a matcher change can silently skip them in the proxy. Each action calls `requireUser()` first and uses the `userId` it returns.

```ts
"use server";

export const updateLink = async (linkId: string, data: LinkInput) => {
  const { userId } = await requireUser(); // throws if not signed in
  await connectDb();
  await LinkModel.updateOne({ _id: linkId, userId }, data);
};
```

## Ownership

Users can only read and write **their own links**.

- `userId` always comes from the session (`requireUser()`). Never take it from form data, URL params or any other client input.
- **Ownership is enforced at the database level**: every query includes `userId` in the filter, including updates and deletes, so a document that belongs to another user is never matched. See `database.md` → Data scoping.
- The public profile `/user/[handle]` reads by `handle` and returns only public fields. It never exposes `userId`, email or other private data.
