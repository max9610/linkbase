# Linkbase Database

How the app talks to MongoDB. Read with `architecture.md` for folder structure and naming.

All paths below are relative to `src/`.

## Stack

**Mongoose** handles schemas, validation and connection pooling. No other database client or query layer is used.

```
src/lib/db/
├── connect.ts      # connection helper (single cached connection)
├── models/         # one file per model, kebab-case (link.ts, user.ts…)
└── queries/        # cached read functions (see data-fetching.md)
```

## Connection

One cached connection is reused across all Server Actions, in both development and production. The helper stores the connection promise on `globalThis`, so hot reloads in dev and repeated calls in production never open a new pool.

```ts
// src/lib/db/connect.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("MONGODB_URI is not set");

const globalForMongoose = globalThis as unknown as {
  mongoose?: Promise<typeof mongoose>;
};

export const connectDb = async () => {
  globalForMongoose.mongoose ??= mongoose.connect(MONGODB_URI);
  return globalForMongoose.mongoose;
};
```

Call `await connectDb()` at the top of every Server Action or server function that queries the database. Never call `mongoose.connect` anywhere else.

## Models

Models live in `lib/db/models/`. Every schema uses:

- **Strict mode** (`strict: true`, Mongoose's default; never turn it off). Fields that are not in the schema are dropped.
- **Timestamps** (`timestamps: true`), which adds `createdAt` and `updatedAt`.
- **Indexes on `userId` and `handle`.** `handle` is the public username in `/user/[handle]`, so its index is unique.

Reuse the compiled model if it exists (`models.X ?? model(...)`). Otherwise hot reload throws `OverwriteModelError`.

```ts
// src/lib/db/models/link.ts
import { Schema, model, models, type InferSchemaType } from "mongoose";

const linkSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
  },
  { strict: true, timestamps: true },
);

export type Link = InferSchemaType<typeof linkSchema>;
export const LinkModel = models.Link ?? model("Link", linkSchema);
```

Shared types that the UI needs go in `lib/types/`. Don't import model files into Client Components.

## Data scoping

**Every query is scoped to the signed-in user's id**, so a user can only ever read or change their own data.

- Get `userId` from the session through the auth helpers in `lib/auth/`. Never take it from form data, params or any other client input.
- Put `userId` in the filter of **every** query, including updates and deletes. Never look up a document by `_id` alone.

```ts
"use server";

export const deleteLink = async (linkId: string) => {
  const { userId } = await requireUser(); // from lib/auth
  await connectDb();
  await LinkModel.deleteOne({ _id: linkId, userId });
};
```

The one exception is the public profile `/user/[handle]`, which reads published data by `handle`. Only fields that are meant to be public may be returned there.
