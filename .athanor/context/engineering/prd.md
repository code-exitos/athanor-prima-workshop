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

The policy is applied in this order. It stops at the first failure. Each failure has one fixed reason text (D-6):

| Step | Check | Reason shown and logged when it fails |
| --- | --- | --- |
| 0 | The link has a token that can be read | No valid pass in this link |
| 1 | Signature valid | Pass is not authentic |
| 2 | Blocklist check (`isBlocked` on the pass alias). It overrides every later rule, including a valid pass. | Visitor is blocked |
| 3a | `now` is not before `validFrom` | Pass is not valid yet |
| 3b | `now` is not after `validUntil` (the end is included, D-1) | Pass has expired |
| 4 | One-time passes only: the pass id is not in the ledger | Pass already used |
| 4b | One-time passes only: the verify page records the use in the ledger, and the write works (D-12) | Could not record pass use |
| 5 | All checks passed | Pass is valid (granted) |

`verifyPass(token, now, ledger, blocklist, publicKey)` is a pure function. Time is a parameter (ADR 0002). The verify page reads the clock once when it loads and passes it in. Side effects (ledger write, log entry, screen) happen outside `verifyPass`, in D-7 and D-9.

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

## Decisions

These settle the points the discovery packet left unclear. Decided by the workshop facilitator in the product owner role, on 2026-10-14, taking the recommended (easy and logical) option each time. Change them if wrong.

- **D-1 End date is included.** A pass is valid from `validFrom` up to and including `validUntil`. A verification at exactly `validUntil` is granted. Reason: the bylaws say valid "until" the end date (Art. 18), and pass creation already accepts an end date equal to now (`src/domain/pass.ts`).
- **D-2 No revoke feature.** A pass stops working when it expires, and a one-time pass stops when used. To stop a visitor sooner, the administrator adds the visitor alias to the blocklist (E-3). Residents and guards cannot revoke. Reason: there is no server (ADR 0001), and the blocklist already overrides every pass.
- **D-3 Domestic staff are out of scope (F-6).** No special handling in this version. Reason: the bylaws give no rules (Art. 23).
- **D-4 QR code and link only, no typed code.** The QR code and the link carry the same signed token. Reason: the token is self-contained and signed (ADR 0001). A short typed code would need a server to look it up.
- **D-5 Unused passes are not visible.** The entry log shows verification attempts only. Reason: the app does not store passes (E-1).
- **D-6 Deny reasons are fixed texts.** They are the eight texts in the R-6 table. The log `reason` column uses the same text. Reason: the guard needs a short plain sentence, and the log should match the screen.
- **D-7 One-time passes are marked used only on a grant.** The first grant writes the pass id to the ledger (E-4). A denied attempt never uses up a pass. Opening the same link again, or reloading, runs the whole check again: a one-time pass that was granted is then denied with "Pass already used". Date-range passes never write the ledger. The granted screen for a one-time pass adds the line "One-time pass. It cannot be used again."
- **D-8 The blocklist matches the alias exactly, as built.** `isBlocked` is an exact, case-sensitive match. It is not changed. A different spelling or case of a blocked alias is not blocked. This is a known limitation of the demo (see Risks).
- **D-9 One log entry per attempt, and what the screens show.** Every page load of the verify route appends one entry (`at` is the time the page read the clock when it loaded, see R-6; then `result` and `reason`). The entry also carries `passId`, `unit` and `visitorAlias` whenever the signature was valid, including blocked, not valid yet, expired and already used. It omits them when the token is missing, unreadable or has a bad signature, because those fields are not trusted. The granted screen shows ACCESS GRANTED, the reason, and the unit and alias. A denied screen shows ACCESS DENIED and the reason only. All text is set with `textContent`.
- **D-10 A pass with `validUntil` equal to `validFrom` is allowed.** With D-1 it is valid at exactly that instant. F-1 is not changed.
- **D-11 Screens are tested with `jsdom`.** The verify screen test runs in the `jsdom` environment, set on that test file only (`.athanor/context/engineering/tech-stack-and-repo-strategy.md`, Testing). `jsdom` is already installed as a `devDependency`. Do not add any other dependency for F-3.
- **D-12 If storage fails, a one-time pass is denied.** If writing the ledger throws (for example `localStorage` is full or blocked), the verify page shows ACCESS DENIED with the reason "Could not record pass use". Reason: a pass that cannot be marked used could be reused. A date-range pass never writes the ledger, so it is not affected. If writing the log entry throws, the result on screen does not change. Nothing else in the app catches storage errors.

## Risks

- **Single-device ledger and log.** One-time passes are tracked per device. The log shows one device only. Owner not stated.
- **Exact blocklist match.** Matching is case-sensitive and exact (D-8), so "mr nobody" is not blocked by an entry for "Mr Nobody". Owner not stated.
- **Reload.** Each reload of the verify link is a new attempt and a new log entry (D-9). A reload after a grant of a one-time pass is denied (D-7). Owner not stated.
- **Demo keys.** Anyone can forge a pass with the committed private key. For demo only. Owner not stated.
