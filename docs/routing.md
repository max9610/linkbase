# Linkbase Routing

Which routes exist, who can reach them and how they are organized. Read with `auth.md` for how protection is enforced and `architecture.md` for folder structure.

All paths below are relative to `src/`.

## Route map

Route groups (`(name)`) organize files and share layouts. **They are not part of the URL.**

```
src/app/
├── page.tsx                      # /                 landing page (public)
├── user/[handle]/page.tsx        # /user/[handle]    public profile (public)
├── (auth)/
│   └── sign-in/page.tsx          # /sign-in          sign-in page
├── (dashboard)/                  # protected
│   ├── layout.tsx                # session check + dashboard shell
│   └── dashboard/
│       ├── page.tsx              # /dashboard
│       └── add-links/page.tsx    # /dashboard/add-links
└── api/                          # webhooks and third-party callbacks only
    └── auth/[...nextauth]/route.ts
```

| URL                    | Group         | Access                 |
| ---------------------- | ------------- | ---------------------- |
| `/`                    | –             | Public                 |
| `/user/[handle]`       | –             | Public                 |
| `/sign-in`             | `(auth)`      | Public                 |
| `/dashboard`           | `(dashboard)` | Authenticated          |
| `/dashboard/add-links` | `(dashboard)` | Authenticated          |
| `/api/*`               | –             | Depends on the handler |

## Public routes

- **`/`**: landing page.
- **`/user/[handle]`**: public profile. Open to everyone, signed in or not. Reads data by `handle` and returns only public fields (see `database.md`).

## Authenticated routes: `(dashboard)`

Every page under `app/(dashboard)/` requires an authenticated session. The middleware (`proxy.ts` in Next.js 16) redirects unauthenticated users to `/sign-in`, and `app/(dashboard)/layout.tsx` checks the session again on the server. See `auth.md` for all enforcement layers.

All dashboard pages live under the `/dashboard` URL prefix, so the proxy matcher is a single `/dashboard/:path*`. Add new protected pages inside `app/(dashboard)/dashboard/` to keep that true.

## Auth routes: `(auth)`

Sign-in and other auth screens live in `app/(auth)/`, with their own layout (no dashboard shell). The `(auth)` group is public.

## Per-route files

Each route owns its own special files, **only where needed**:

- `layout.tsx`: shared UI for the route and its children.
- `loading.tsx`: loading UI while the route streams (it becomes a `<Suspense>` boundary).
- `error.tsx`: error UI for the route. It must be a Client Component (`"use client"`).

Don't add these files "just in case". Add one when the route needs its own layout, loading state or error handling.

## Route Handlers vs Server Actions

**Route Handlers (`app/api/**/route.ts`) are reserved for webhooks and third-party callbacks only.** For example:

- `app/api/auth/[...nextauth]/route.ts` (NextAuth OAuth callbacks)
- Incoming webhooks from external services

**Everything else goes through Server Actions**: forms, mutations and any data the app's own UI needs. Don't create an API route for something the app calls itself.
