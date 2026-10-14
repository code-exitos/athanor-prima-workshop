---
Status: Approved
---

# PRD: Neighborhood Access, increment 1

## Increment Overview

- **Increment name:** Neighborhood Access, increment 1
- **Linked GitHub Milestone:** Not stated in discovery.
- **Goal of this increment:** Let residents create signed visitor passes and let the board keep a record, with no server. See `.athanor/context/business/problem-statement.md` (G-1 to G-5) and `.athanor/context/business/vision.md`.

## Features in This Increment

### F-1: Resident creates pass

- **Stories included:** US-1, US-2
- **State:** Built

### F-2: QR code and shareable link

- **Stories included:** US-3, US-4
- **State:** Built

### F-3: Guard verifies a pass

- **Stories included:** None yet. To be specced.
- **State:** Next. Not built.

### F-4: Entry log view and export

- **Stories included:** US-5, US-6
- **State:** Built

### F-5: Blocklist data

- **Stories included:** US-7, US-8
- **State:** Built

## In Scope

- All stories under F-1, F-2, F-4 and F-5 (US-1 to US-8), already built.
- F-3: the stories are to be written when F-3 is specced (`.athanor/context/business/features.md`).

## Out of Scope

- F-6 Recurring passes for domestic staff. Out of scope until the board gives rules (NG-2).

## User Impact

- **Primary personas affected:** P-1 (Lucy, resident), P-2 (Ed, guard), P-3 (Marissa, administrator)
- **Primary journeys supported:** J-1 (resident creates and shares a pass), J-2 (guard verifies a pass, not built yet), J-3 (administrator reviews the log), J-4 (board updates the blocklist)

## Requirements

### R-1: The resident form validates its input

The form validates alias length (2 to 24 characters after trimming) and that `validUntil` is not before `validFrom`.

- **Serves:** G-1
- **Verified by:** US-1

### R-2: A created pass is signed

A created pass is signed with ECDSA P-256 / SHA-256. The token format is in `data-model.md` (E-1, E-2).

- **Serves:** G-1
- **Verified by:** US-1, US-3

### R-3: The verify URL uses the current origin

The verify URL is built from `window.location.origin`, never a fixed host.

- **Serves:** G-5
- **Verified by:** US-4

### R-4: The log screen handles an empty log

The log screen shows "No entries yet" when empty. **Export CSV** is disabled when empty.

- **Serves:** G-4
- **Verified by:** US-5, US-6

### R-5: The verify route is a placeholder until F-3 is built

The verify route shows "Verification is not implemented yet" until F-3 is built.

- **Serves:** G-2 (placeholder until F-3 is built)
- **Verified by:** Not applicable. No story yet.

### R-6: Verification policy (F-3, not built)

The policy is applied in this order. It stops at the first failure.

1. Signature valid.
2. Blocklist check. It overrides every later rule, including a valid pass.
3. Validity window.
4. One-time ledger check.
5. Grant or deny with a specific reason. Every attempt is logged.

`verifyPass(token, now, ledger, blocklist, publicKey)` is a pure function. Time is a parameter (ADR 0002).

- **Serves:** G-2, G-3, G-4
- **Verified by:** No story yet. To be specced with F-3.

### R-7: Works on mixed phones

Works on mixed phones in a modern browser.

- **Serves:** G-2

### R-8: No server, no cost per user

No server and no cost per user.

- **Serves:** G-5

### R-9: Readable results

Result text is large and never relies on colour alone. WCAG AA.

- **Serves:** G-2

### R-10: User strings are escaped

Every user string is escaped.

- **Compliance source:** SC-1 (`infrastructure-architecture.md` § Security & Compliance)

### R-11: CSV export is safe in a spreadsheet

CSV cells that start with `=`, `+`, `-` or `@` are neutralised.

- **Compliance source:** SC-2

### R-12: Fake data only, no secrets

Fake data only. No secrets and no real names in the repo.

- **Compliance source:** SC-3

### R-13: Passes cannot be edited

Passes are signed, so dates and units cannot be edited. The demo private key is committed and is demo-only. Anyone can forge a pass with it.

- **Compliance source:** SC-4

## Success Metrics

### Metric: M-1 (from `problem-statement.md`)

- **Measurement method:** Not stated in discovery.

### Metric: M-2 (from `problem-statement.md`)

- **Measurement method:** Not stated in discovery.

### Metric: M-3 (from `problem-statement.md`)

- **Measurement method:** Not stated in discovery.

## Definition of Done (Increment-Level)

- All in-scope `US-#` are merged to `dev` with their acceptance criteria verified, at every priority listed in scope and not just Must/P1.
- No **Blocking** gap in `.athanor/docs/discovery-summary.md` remains unresolved for any in-scope feature or story.
- CI is green on the current `dev` head, and no findings above nit level are open on any in-scope PR. This is the same final bar `resolve-external-review` holds every PR to before human approval, not a lighter one for increment sign-off.
- Every metric above has a measurement mechanism in place, though its target need not be hit yet.

## Assumptions

These come from the discovery packet. Change them if wrong.

- The blocklist is a fake list in `src/data/blocklist.ts`. It is demo data. How a real list would reach every phone is out of scope for this demo.
- Blocklist matching is by visitor alias, because aliases are all we store.

Open questions. They are **not resolved**. Resolve them when specifying F-3.

1. **End date.** The bylaws say a pass is valid "until" the end date. Is that instant included or not?
2. **Revocation.** Who may revoke a pass: the resident, the administrator, the guard? How does a revocation reach a device with no server?
3. **Domestic staff.** Mentioned once, with no rules. Out of scope until the board gives rules (F-6).
4. **Typed code vs QR.** The guard wants a short typed code. The board wants QR. The resident wants a link. Which are supported?

## Risks

- **Single-device ledger and log.** One-time passes are tracked per device. The log shows one device only. Owner not stated.
- **Demo keys.** Anyone can forge a pass with the committed private key. For demo only. Owner not stated.
