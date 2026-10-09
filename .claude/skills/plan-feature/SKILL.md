---
name: plan-feature
description: Plan a new Linkbase feature before any code is written. Enters Plan Mode, writes a short technical plan (files to create or change, linked to the relevant docs/ files, plus QA scenarios), waits for explicit approval, then saves it to plans/<current-branch>.md. Use whenever the user starts planning, scoping, designing or kicking off a new feature ("let's add…", "I want to build…", "plan the … feature", "how should we implement…"), before writing any code for it.
---

# Plan a feature

Run this at the start of every new feature. **No code is written until the user explicitly approves the plan.**

## 1. Enter Plan Mode

Call `EnterPlanMode` before doing anything else. While in Plan Mode, only read: no edits, no file creation, no commands that change state.

## 2. Gather context

- Read the docs that apply. Always read `docs/architecture.md`. Read `docs/database.md` if the feature touches data. Also read the docs for the feature area (see the "Project docs" list in `CLAUDE.md`), for example `auth.md`, `routing.md`, `data-mutations.md`, `data-fetching.md`, `errors-and-validation.md`, `security.md` or `ui.md`.
- Look at the existing code the feature will touch so the plan matches what is really in the repo.
- If a requirement is unclear and changes the plan, ask before writing it.

## 3. Write the plan

Keep it short and technical. Use this structure:

```markdown
# <Feature name>

## Goal
One or two sentences on what the feature does and for whom.

## Conventions
- `docs/<file>.md`: the rule from this doc that shapes the plan (one line each).

## Files
### Create
- `src/...`: what it contains and why.
### Change
- `src/...`: what changes.

## Notes
Open questions, risks or decisions (only if any).

## QA Scenarios
1. **Happy path:** <what the user does> → <what should happen>.
2. **Auth boundary:** <what the user does> → <what should happen>.
3. **Validation:** <what the user does> → <what should happen>.
4. **Edge case:** <what the user does> → <what should happen>.
```

Rules for the plan:

- Every file in **Files** must follow the folder structure and naming in `docs/architecture.md`.
- Cite each relevant doc under **Conventions**. Never cite a doc you did not read.
- **QA Scenarios**: 3 to 6 scenarios, one line each. Together they must cover the happy path, an auth boundary (signed out, or another user's data), validation (bad or missing input) and at least one edge case.

## 4. Wait for approval

Present the plan with `ExitPlanMode`. Only an explicit approval from the user counts. If they ask for changes, revise the plan and present it again. Do not start coding while the plan is pending.

## 5. Save the approved plan

Once approved, before any implementation:

1. Run `git branch --show-current` to get the branch name.
2. Write the approved plan, exactly as approved, to `./plans/<branch>.md`. Branch names like `feat/link-cards` create a subfolder (`plans/feat/link-cards.md`); create any missing folders.
3. If no branch is checked out (detached HEAD, empty output), ask the user for the branch name instead of guessing.
4. Tell the user where the plan was saved, then hand off to implementation.
