---
title: Tech stack and repository strategy
status: Approved
owner: Tech lead
last_updated: 2026-10-14
---

# Tech stack and repository strategy

## Stack

| Concern | Choice |
| --- | --- |
| Build and dev server | Vite |
| Language | TypeScript, `strict` mode |
| Tests | Vitest (`vitest run`, never watch) |
| UI | Plain TypeScript with small render helpers. No framework. |
| QR | `qrcode` (the only runtime dependency) |
| Crypto | Browser Web Crypto API. No crypto library. |
| CI | GitHub Actions, Node 20 |

## Code layout

```
src/domain/    pure rules: pass, blocklist, ledger types (no I/O, no clock)
src/services/  signing, storage, ledger, entry log
src/data/      demo keys, units, blocklist (fake data)
src/lib/       small helpers: base64url, urls, datetime
src/ui/        router, views, DOM helpers
```

Tests sit next to the code as `*.test.ts`.

## Rules for code

- Small pure functions with clear names. No cleverness.
- Time is always a parameter. Nothing in `src/domain` calls `Date.now()` or `new Date()` without an argument.
- Every user string reaches the DOM through `textContent`.
- Dependencies: add only when needed. Pin versions through the lockfile.

## Repository strategy

- `checkpoint-1` (default branch): discovery and two approved docs.
- `checkpoint-2`: full context and the app without verification.
- Conventional commits, small logical commits, no force-push.
- CI runs `npm ci`, `npm run typecheck`, `npm test`, `npm run build` on push and pull request.
- `.devcontainer/` and `.claude/` are workshop infrastructure, not product.
