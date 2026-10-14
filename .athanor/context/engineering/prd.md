---
Status: Approved
---

# PRD: Building Access, increment 1

## Increment Overview

- **Increment name:** Building Access, increment 1
- **Linked GitHub Milestone:** Not stated in discovery.
- **Goal of this increment:** Let the administrator create signed visitor passes for the four Contoso HQ buildings, show each pass as a QR code, and keep a record of entries, with no server. See `.athanor/context/business/problem-statement.md` (G-1 to G-5) and `.athanor/context/business/vision.md`.

## Features in This Increment

### F-1: Administrator creates a pass

- **Stories included:** US-1
- **State:** Built

### F-2: QR code

- **Stories included:** US-2
- **State:** Built

### F-3: Guard verifies a pass

- **Stories included:** None yet. To be specced.
- **State:** Next. Not built.

### F-4: Entry log view and export

- **Stories included:** US-3, US-4
- **State:** Built

### F-5: Blocklist data

- **Stories included:** US-5, US-6
- **State:** Built

## In Scope

- All stories under F-1, F-2, F-4 and F-5 (US-1 to US-6), already built.
- F-3: the stories are to be written when F-3 is specced (`.athanor/context/business/features.md`).

## Out of Scope

- Sign-in and user accounts (NG-1).
- Sending the pass to the visitor, for example by email (NG-2). The screen only notes that a full version could do this.
- A server and notifications (NG-4).

## User Impact

- **Primary personas affected:** P-1 (Marissa, facilities administrator), P-2 (Ed, lobby security guard)
- **Primary journeys supported:** J-1 (administrator creates a pass), J-2 (guard verifies a pass, not built yet), J-3 (administrator reviews the log), J-4 (administrator updates the blocklist)
- **Demo note:** The QR code on the administrator's laptop screen is scanned with a phone. That simulates the guard scanning the visitor's code at the lobby.

## Requirements

### R-1: The administrator form validates its input

The form requires a building. It requires a visitor name of 2 to 40 characters after trimming. It requires that `validUntil` is not before `validFrom` and not in the past.

- **Serves:** G-1
- **Verified by:** US-1

### R-2: A created pass is signed

A created pass is signed with ECDSA P-256 / SHA-256. The token format is in `data-model.md` (E-1, E-2).

- **Serves:** G-1
- **Verified by:** US-1, US-2

### R-3: The verify URL uses the current origin

The verify URL is built from `window.location.origin`, never a fixed host. Its format is `<origin><path>?p=<token>`. The token is in the query string, not the `#fragment`, because sign-in redirects (for example Codespaces port forwarding) drop the fragment but keep the query.

- **Serves:** G-5
- **Verified by:** US-2

### R-4: The log screen handles an empty log

The log screen shows "No entries yet" when empty, and lists entries newest first otherwise. **Export CSV** is disabled when empty.

- **Serves:** G-4
- **Verified by:** US-3, US-4

### R-5: The verify route is a placeholder until F-3 is built

The verify route shows "Verification is not implemented yet" until F-3 is built.

- **Serves:** G-2 (placeholder until F-3 is built)
- **Verified by:** Not applicable. No story yet.

### R-6: Verification policy (F-3, not built)

The policy is applied in this order. It stops at the first failure. Each failure has one fixed reason text (D-5):

| Step | Check | Reason shown and logged when it fails |
| --- | --- | --- |
| 0 | The link has a token that can be read: two parts, and the payload decodes to a pass with every field of E-1 | No valid pass in this link |
| 1 | Signature valid | Pass is not authentic |
| 2 | Blocklist check (`isBlocked` on the visitor name). It overrides every later rule, including a valid pass. | Visitor is blocked |
| 3a | `now` is not before `validFrom` | Pass is not valid yet |
| 3b | `now` is not after `validUntil` (the end is included, D-1) | Pass has expired |
| 4 | All checks passed | Pass is valid (granted) |

A link with no `p` value is not a verify link: it opens the New pass page (PG-1). Verification needs no network call after the page has loaded: the whole check runs in the browser (R-8).

`verifyPass(token, now, blocklist, publicKey)` is a pure function. Time is a parameter (ADR 0002). The verify page reads the clock once when it loads and passes it in. Side effects (log entry, screen) happen outside `verifyPass` (D-7). There are six reason texts in total.

- **Serves:** G-2, G-3, G-4
- **Verified by:** No story yet. To be specced with F-3.

### R-7: Works on mixed phones

Works on mixed phones in a modern browser.

- **Serves:** G-2

### R-8: No server, no cost per user

No server and no cost per user.

- **Serves:** G-5

### R-9: Readable results

Result text is at least 2rem and never relies on colour alone. WCAG AA.

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

Passes are signed, so the building, dates and visitor name cannot be edited. The demo private key is committed and is demo-only. Anyone can forge a pass with it.

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
- No blocking gap remains in the context documents for any in-scope feature or story.
- CI is green on the current `dev` head, and no findings above nit level are open on any in-scope PR. This is the same final bar `resolve-external-review` holds every PR to before human approval, not a lighter one for increment sign-off.
- Every metric above has a measurement mechanism in place, though its target need not be hit yet.

## Assumptions

These come from the discovery packet. Change them if wrong.

- The blocklist is a fake list in `src/data/blocklist.ts`. It is demo data. How a real list would reach every phone is out of scope for this demo.
- Blocklist matching is by visitor name, because the visitor name is the only identity we store.

## Decisions

These settle the points the discovery packet left unclear. Decided by the product owner, on 2026-10-14, taking the recommended (easy and logical) option each time. Change them if wrong.

- **D-1 End date is included.** A pass is valid from `validFrom` up to and including `validUntil`. A verification at exactly `validUntil` is granted. Reason: pass creation already accepts an end date equal to now (`src/domain/pass.ts`).
- **D-2 No revoke feature.** A pass stops working when it expires. To stop a visitor sooner, the administrator adds the visitor's name to the blocklist (E-3). Guards cannot revoke. Reason: there is no server (ADR 0001), and the blocklist already overrides every pass.
- **D-3 QR code only, no link text, no copy button, no typed code.** A note on the screen says a full version could email the QR code. Reason: the token is self-contained and signed (ADR 0001). A short typed code would need a server to look it up.
- **D-4 Unused passes are not visible.** The entry log shows verification attempts only. Reason: the app does not store passes (E-1).
- **D-5 Deny reasons are fixed texts.** They are the six texts in the R-6 table. The log `reason` column uses the same text. Reason: the guard needs a short plain sentence, and the log should match the screen.
- **D-6 The blocklist matches the visitor name exactly, as built.** `isBlocked` is an exact, case-sensitive match. It is not changed. A different spelling or case of a blocked name is not blocked. This is a known limitation of the demo (see Risks).
- **D-7 One log entry per attempt, and what the screens show.** Every page load of the verify link, including a reload, appends one entry (`at` is the time the page read the clock when it loaded, see R-6; then `result` and `reason`). The entry also carries `passId`, `building` and `visitorName` whenever the signature was valid. It omits them when the token is missing, unreadable or has a bad signature, because those fields are not trusted. The granted screen shows ACCESS GRANTED, the reason, the building and the visitor name. A denied screen shows ACCESS DENIED and the reason only. All text is set with `textContent`.
- **D-8 A pass with `validUntil` equal to `validFrom` is allowed.** With D-1 it is valid at exactly that instant. F-1 is not changed.
- **D-9 Screens are tested with `jsdom`.** The verify screen test runs in the `jsdom` environment, set on that test file only with `// @vitest-environment jsdom` (`.athanor/context/engineering/tech-stack-and-repo-strategy.md`, Testing). `jsdom` version 26 is a `devDependency` and works on Node 20. Do not add any other dependency for F-3.
- **D-10 The verify page does not check the building.** A guard phone has no sign-in and no building setting (NG-1), so any valid pass is granted on any guard phone. The granted screen shows the building so the guard can check that it is the right one.

## Risks

- **Exact blocklist match.** Matching is case-sensitive and exact (D-6), so "mr nobody" is not blocked by an entry for "Mr Nobody". Owner not stated.
- **Reload.** Each reload of the verify link is a new attempt and a new log entry (D-7). Owner not stated.
- **Single-device log.** The log shows one device only. Owner not stated.
- **Demo keys.** Anyone can forge a pass with the committed private key. For demo only. Owner not stated.
