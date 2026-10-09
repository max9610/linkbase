# Linkbase Security

Secrets, security headers, rate limiting and safe rendering of user content. Read with `auth.md` for access control and `errors-and-validation.md` for input validation.

All paths below are relative to `src/` unless they start at the project root.

## Secrets

**Secrets live in environment variables. Never in code, never in the repo.**

| File           | Committed | Purpose                                                        |
| -------------- | --------- | -------------------------------------------------------------- |
| `.env.local`   | **No**    | Real values for local development. Gitignored.                 |
| `.env.example` | **Yes**   | Template: every variable the app needs, with empty/fake values |

```bash
# .env.example
MONGODB_URI=
AUTH_SECRET=
```

- When you add a variable, add it to `.env.example` in the same change, with a comment if its format isn't obvious.
- `.gitignore` ignores `.env*`, so it must also contain `!.env.example` for the template to be committed.
- Production values are set in the hosting provider's environment settings, never in a committed file.
- Only variables prefixed with `NEXT_PUBLIC_` reach the browser. **Never put a secret in a `NEXT_PUBLIC_` variable.**
- Read secrets only in server code (Server Components, Server Actions, `lib/`). Never pass them as props to a Client Component.
- Never log a secret, token or full connection string (see `errors-and-validation.md`).

## Security headers

Security headers are set for every route in `headers()` in **`next.config.ts`** (project root). See `node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md`.

```ts
// next.config.ts
const isDev = process.env.NODE_ENV === "development";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`;

const nextConfig: NextConfig = {
  // ...existing options
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "Content-Security-Policy", value: cspHeader.replace(/\n/g, "") },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      ],
    },
  ],
};
```

| Header                    | Value                             | Why                                                      |
| ------------------------- | --------------------------------- | -------------------------------------------------------- |
| `Content-Security-Policy` | see above                         | Limits where scripts, styles, images and frames can load |
| `X-Frame-Options`         | `DENY`                            | Blocks clickjacking (legacy twin of `frame-ancestors`)   |
| `Referrer-Policy`         | `strict-origin-when-cross-origin` | Outbound links never leak full Linkbase URLs             |

- `'unsafe-eval'` is only allowed in development (React needs it for debugging).
- Adding an external origin (images, fonts, an auth provider) means adding it to the matching CSP directive. Add only that origin, never `*`.

## Rate limiting

**Sign-in attempts and link creation are rate limited** to stop brute force and spam.

| Action      | Key               | Limit               |
| ----------- | ----------------- | ------------------- |
| Sign-in     | IP + email/handle | 5 attempts / 15 min |
| Create link | `userId`          | 30 links / hour     |

- The limiter is a single helper in `lib/rate-limit.ts`. Don't reimplement it per action.
- Counters live in a **shared store** (e.g. a MongoDB collection with a TTL index, see `database.md`). An in-memory `Map` does not work: each server instance would have its own counter.
- The check runs in the Server Action **right after the session/identity step and before validation or any write** (see `data-mutations.md`). For link creation the key is the `userId` from `requireUser()`, never client input.
- Hitting the limit is an expected failure: return an `ActionResult` with a `formError` such as `"Too many attempts. Try again later."`. Never throw it.

```ts
const { userId } = await requireUser();

const limited = await rateLimit(`create-link:${userId}`, {
  max: 30,
  windowMs: 60 * 60 * 1000,
});
if (!limited.ok) {
  return {
    ok: false,
    fieldErrors: {},
    formError: "Too many links created. Try again later.",
  };
}
```

## User-generated content

Link URLs, titles, handles and any other text a user typed are **untrusted** and are escaped on render.

- Render them as normal JSX text (`{link.title}`). React escapes it.
- **Never use `dangerouslySetInnerHTML`** with user content.
- Never build HTML strings with user content, and never put it in inline `<script>` or `style` attributes.
- Escaping does not protect `href`: a `javascript:` URL is still dangerous. **Link URLs only accept `http:` and `https:`**, enforced in the Zod schema (see `errors-and-validation.md`):

```ts
url: z.url({ protocol: /^https?$/, error: "Enter a valid http(s) URL" }),
```

## Outbound links

Every link to a user-submitted URL opens in a new tab with `rel="noopener noreferrer"`:

```tsx
<a href={link.url} target="_blank" rel="noopener noreferrer">
  {link.title}
</a>
```

- `noopener` stops the opened page from controlling the Linkbase tab through `window.opener`.
- `noreferrer` stops sending the Linkbase URL to the destination.
- Use this in `LinkButton`/`LinkCard` (see `ui.md`) so every outbound link gets it. Internal links use `next/link` without these attributes.
