---
name: create-feature
description: Build a Linkbase feature from its approved plan. Reads the plan in plans/<current-branch>.md, the docs/ files it cites and live library docs through Context7, then writes the code. Code only, so no tests, QA or commits. Use whenever the user starts building or implementing a feature whose plan has been approved ("build it", "implement the plan", "let's start coding", "go ahead", "start the feature"), right after plan-feature.
---

# Create a feature

Run this once a plan has been approved (see `plan-feature`). It writes code only. **No tests, no QA, no commits.** The user runs `write-tests` and `run-qa-suite` themselves when ready.

## 1. Load the approved plan

1. Run `git branch --show-current` and read `./plans/<branch>.md`.
2. If the file is missing or no branch is checked out, stop and ask the user which plan to build. Do not build from memory or guess a plan.
3. The plan is the scope. Build what it lists, nothing more.

## 2. Read the conventions

- Always read `docs/architecture.md` and `docs/coding-standards.md`.
- Read every doc cited under the plan's **Conventions**, plus any other doc the work touches (see the "Project docs" list in `CLAUDE.md`). For example: `database.md` for models or queries, `data-fetching.md` for pages that load data, `data-mutations.md` and `errors-and-validation.md` for Server Actions and forms, `auth.md` for routes or session reads, `security.md` for user content or env vars, `ui.md` and `design-system.md` for components and styles.
- Read the existing code each planned file touches before changing it.

## 3. Pull live library docs

Before writing code that uses a third-party library (Next.js, React, Mongoose, NextAuth, Zod, Tailwind CSS…):

1. Check the version pinned in `package.json`.
2. Use Context7: `resolve-library-id`, then `query-docs` for the exact APIs you are about to use.
3. For Next.js, also read the relevant guide in `node_modules/next/dist/docs/` (see `AGENTS.md`).
4. If Context7 has no entry for a library, say so and name the source used instead (bundled docs in `node_modules`, the official site or type definitions).

## 4. Build

- Create and change the files listed in the plan's **Files** section, following the docs read in step 2.
- If the plan turns out to be wrong or incomplete (a missing file, a conflict with a doc or the existing code), stop and ask the user before deviating.
- When done, run `npx tsc --noEmit` and `npm run lint`, and fix the errors in the code you wrote.

Do not:

- Write or change tests.
- Run the QA scenarios, the dev server or browser checks.
- Stage, commit, push or open a PR.
- Add work the plan does not list.

## 5. Report and hand back

Stop and reply in 2 to 3 lines: what was built, the main files created or changed, and any deviation from the plan. Then wait. Do not start `write-tests` or `run-qa-suite` on your own.
