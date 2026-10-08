# Linkbase Git Conventions

How commits, branches and pull requests are written and merged. Read it before creating a branch, a commit or a PR.

## Commits

Commits follow **[Conventional Commits](https://www.conventionalcommits.org/)**:

```
<type>(<optional scope>): <subject>
```

| Type       | Use for                                                 |
| ---------- | ------------------------------------------------------- |
| `feat`     | A new feature for the user                              |
| `fix`      | A bug fix                                               |
| `docs`     | Documentation only (`docs/`, `README.md`, `CLAUDE.md`)  |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `test`     | Adding or changing tests                                |
| `chore`    | Tooling, config, dependencies, anything else            |

**The subject is short and imperative**: it completes the sentence "This commit will…".

- Lowercase, no period at the end, around 50 characters (72 max).
- Imperative mood: `add`, `fix`, `remove`. Not `added`, `fixes` or `removing`.
- A body is optional. Use it to explain **why**, not what, separated from the subject by a blank line.

```bash
# Good
feat: add link creation form
fix(auth): redirect to sign-in when session expires
docs: add security conventions

# Bad
Added links            # no type, past tense
feat: Fixed the bug.   # wrong type, capitalized, period, vague
```

## Branches

Branches are named **`<type>/<feature>`**, using the same types as commits and a short kebab-case description:

```
feat/add-links
fix/session-redirect
docs/security-guide
refactor/link-queries
```

- One branch per feature or fix. Don't mix unrelated changes in one branch.
- Branch from an up-to-date `main`.

## Pull requests

**Never commit straight to `main`.** Every change is built on its own branch and merged through a pull request.

1. Create a branch from `main`: `git switch -c feat/add-links`.
2. Commit in small, focused Conventional Commits.
3. Push the branch and open a PR to `main`.
4. **A human reviews and approves the PR before it is merged.** No PR is merged without that review, including PRs opened by an AI agent.
5. Merge, then delete the branch.

PR rules:

- **The title follows the commit format** (`feat: add link creation form`), since it becomes the commit on `main` when squashed.
- The description says what changed, why, and how it was checked (`npm run lint`, `npm run build`).
- **Keep history clean**: squash-merge so each PR lands as one commit on `main`. Before review, clean up "wip"/"fix typo" commits on the branch.
- Keep PRs small. A PR that does two things is two PRs.
