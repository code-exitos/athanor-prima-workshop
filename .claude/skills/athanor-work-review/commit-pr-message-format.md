# Commit & PR Message Format

Based on Conventional Commits, extended with issue linkage since this doubles as the delivery
record. Enforced by the `standardize-commit-pr-messages` skill on every commit and PR the agent
creates.

## Commit Message Format

```
<type>(<scope>): <short summary, imperative mood, ≤72 chars>

<body, what changed and why, wrapped at ~100 chars>

Closes: #<issue-number>
Assumptions: <link to logged assumption(s), if any>
```

### Types

`feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `perf`, `security`

## Title Rules

The one definition of PR and issue titles. `scripts/check-title.sh` holds the same rules as code.

| Kind | Rule |
|---|---|
| **PR title** | Same as a commit subject: `<type>(<scope>): <summary>`, a standard type from the list above, scope optional (lowercase), no period at the end, **≤72 characters**. |
| **Issue title** | **≤72 characters**, no leading/trailing spaces. Bug issues use `BUG-<nn>: <title>` (prefix counts toward the 72). |

Too long? Shorten the title itself — drop qualifiers, don't cut mid-word — and move the detail into the body.

**Enforced before creation, not after.** A PreToolUse hook (`check-title.sh`) blocks `gh pr
create|edit` and `gh issue create|edit` (and GitHub MCP create/update calls) with a bad title,
so a wrong title never reaches a PR and never costs an AI review round. The generated
`.github/workflows/pr-title.yml` is only the backstop for PRs opened outside the agent.

## PR Description Template

```markdown
## Summary

What this PR does and why, in plain language.

## Linked Issue(s)

Closes #<n>

## Changes

- <What changed, described by behavior rather than by file>

## Test Plan

How this was verified. Map each acceptance criterion to the test(s) covering it
(`AC-1 → src/foo/bar.test.ts`), so a reviewer sees coverage without opening the
issue.

## Review Notes

Anything a reviewer should pay special attention to.
```

## Usage

Every commit that lands via `spec-driven-implementation` and every PR opened by the agent must
follow this format exactly. This is what turns raw git history into a usable delivery record
without a separate audit document.
