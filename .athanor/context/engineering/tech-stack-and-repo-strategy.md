---
Status: Approved
---

# Tech Stack & Repository Strategy

## Overview

A single repo with one app. TypeScript in `strict` mode, built and served in development by Vite, tested with Vitest, run with Node 20 or later and npm. The UI is plain TypeScript with small render helpers and no framework. The one runtime dependency is `qrcode`; signing uses the browser's Web Crypto API. This supports increment 1 (`prd.md`): a static app with no backend, as the board asked (`.athanor/docs/discovery/constraints.md`).

## Architecture Pattern

- **Chosen pattern:** Static single-page app that issues signed token passes. Pure domain rules, with time as a parameter.
- **Options rejected:** A backend: the board does not want to run, secure or pay for a server. A crypto library: the Web Crypto API is enough (ADR 0001).
- **What in the PRD/discovery justifies this choice:** No server at launch, static hosting, small budget, and a guard phone that must decide from the pass alone (`.athanor/docs/discovery/constraints.md`, `prd.md` R-8).
- **ADR with the full comparison:** `.athanor/docs/adr/0001-signed-token-pass.md` and `.athanor/docs/adr/0002-time-as-parameter.md`. These two records state the decisions, not a full option comparison.

## Technology Choices

### Frontend

| Layer | Choice | Rationale |
| --- | --- | --- |
| Framework/library | Plain TypeScript with small render helpers. No framework. | Not stated in discovery. |
| State management | None. Ledger and entry log sit in `localStorage` behind a key-value interface. | Not stated in discovery. |
| Styling | Plain CSS (`src/ui/styles.css`) | Not stated in discovery. |

### Backend

| Layer | Choice | Rationale |
| --- | --- | --- |
| Language/runtime | None. There is no backend. | The board wants no server (`constraints.md`). |
| Framework | None | Same |
| Data access | `localStorage` through `KeyValueStore` (`src/services/storage.ts`) | No database is allowed at launch. |

### Infrastructure

| Layer | Choice | Rationale |
| --- | --- | --- |
| Hosting/deploy target | Any static host serving `dist/` | Plain static files (`constraints.md`). |
| Observability | None yet | Not stated in discovery. See `infrastructure-architecture.md` § Observability Approach. |

### Testing

| Layer | Choice | Rationale |
| --- | --- | --- |
| Unit/integration | Vitest (`vitest run`, never watch) | Not stated in discovery. |
| View tests (screens) | Vitest with `jsdom`, chosen per file with the first line `// @vitest-environment jsdom`. Other tests keep the `node` environment. | Screens must be tested without a real browser, and every acceptance criterion needs a test. `jsdom` is a `devDependency` (version 26, works on Node 20 and later), so nothing ships to users. It is the only extra test dependency. Decided by the workshop facilitator, 2026-10-14. |
| E2E | None | Not stated in discovery. |
| Test file locations | see § Repository Structure → Test locations | |

## Repository Strategy

- **Decision:** Single repo
- **Rationale:** One small app with one team.
- **Workspace tooling:** None

## Repository Structure

```
src/domain/    pure rules: pass, blocklist, ledger types (no I/O, no clock)
src/services/  signing, storage, ledger, entry log
src/data/      demo keys, units, blocklist (fake data)
src/lib/       small helpers: base64url, urls, datetime
src/ui/        router, views, DOM helpers
```

`.devcontainer/` and `.claude/` are workshop infrastructure, not product.

### Test locations

- **Unit/integration:** `*.test.ts` files next to the code (Vitest includes `src/**/*.test.ts`).
- **E2E:** None.
- **Diverges from the defaults:** No.

## Environments

| Aspect | Dev | UAT (only if adopted below) | Prod |
| --- | --- | --- | --- |
| Git branch | Not stated in discovery | | Not stated in discovery |
| Deploy target | Not stated in discovery | | Not stated in discovery |

## Branch and PR Strategy

- **Long-lived branches:** `checkpoint-1` (default branch): discovery and two approved docs. `checkpoint-2`: full context and the app without verification.
- **`uat`: not adopted.** No `uat` branch exists in this repo.
  - **Reason either way:** Not stated in discovery.
- **Additional long-lived branches:** none.
- **Feature branch convention:** One branch per Feature issue. All of that Feature's User Story issues are built on the same branch.
- **Merge rules:** Conventional commits. Small, logical commits. No force-push. A PR is merged only with explicit human approval. CI must pass (typecheck, tests, build).
- **Third-party reviewers on PRs:** Not stated in discovery.
- **Auto-delete branches on merge:** Not stated in discovery.
- **Release path:** Not stated in discovery.

## GitHub Issues Structure

- **Hierarchy:** Feature (parent) → User Story (sub-issue).
- **Task issues:** Not stated in discovery.

## Engineering Standards

### Language/runtime

- **Compiler/runtime settings:** TypeScript `strict`, plus `noUncheckedIndexedAccess`, `noImplicitOverride`, `noFallthroughCasesInSwitch`, `isolatedModules`, `verbatimModuleSyntax` (`tsconfig.json`). Node 20 or later (`package.json` engines).
- **Type safety rules:** `strict` mode is enforced by `npm run typecheck`. Small pure functions with clear names. No cleverness.
- **Time rule:** Time is always a parameter. Nothing in `src/domain` calls `Date.now()` or `new Date()` without an argument (ADR 0002).

### API Design

- **Style:** Not applicable. There is no API.
- **Validation boundary:** Not applicable.
- **Error shape/codes:** Not applicable.
- **Versioning policy:** None. The token has a format version `v` and storage keys have a `.v1` suffix (`data-model.md`).

### Feature Flags

- **Strategy:** None yet.
- **Where flags are defined and who can toggle them:** Not applicable.

### Database

- **Schema source of truth:** `data-model.md` and the types in `src/domain`. There is no database.
- **Migration workflow:** Not applicable.

### Security

- **Secrets handling:** No secrets in the repo.
- **Input validation:** The resident form is validated in `createPass` (`src/domain/pass.ts`). Every user string reaches the DOM through `textContent`.
- **Auth enforcement points:** None. There are no accounts. Trust comes from the signature check.

### Testing Standards

- **Coverage/acceptance-mapping rule:** Every acceptance criterion has at least one test. Tests first.
- **CI gate before merge:** Typecheck, tests and build pass. CI runs `npm ci`, `npm run typecheck`, `npm test`, `npm run build` on push and pull request (GitHub Actions, Node 20).

### Code Style

- **Formatter/linter:** None configured.
- **Git hooks:** None configured.
- **Dependencies:** Add only when needed. Pin versions through the lockfile.
