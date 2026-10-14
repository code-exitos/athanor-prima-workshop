---
title: "ADR 0002: Time as a parameter"
status: Approved
owner: Tech lead
last_updated: 2026-10-14
---

# ADR 0002: Time as a parameter

## Context

Pass rules depend on the current time. Code that reads the clock inside is hard to test and hides bugs at the edges of a window.

## Decision

Domain functions never read the clock. They receive `now` as a parameter, as in `createPass(input, now)` and `verifyPass(token, now, ledger, blocklist, publicKey)`. Only the UI layer creates the current date and passes it in. Nothing in `src/domain` calls `Date.now()` or `new Date()` without an argument.

## Consequences

- Tests fix `now` and can check exact boundaries.
- Functions stay pure and easy to read.
- Callers must pass the time. This is a small cost.
