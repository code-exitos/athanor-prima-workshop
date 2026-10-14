---
title: Product requirements document (increment 1)
status: Approved
owner: Product owner (Residencial Los Pinos board liaison)
last_updated: 2026-10-14
---

# PRD: Neighborhood Access, increment 1

## Purpose

Let residents create signed visitor passes and let the board keep a record, with no server. See `problem-statement.md` and `vision.md`.

## Scope of this increment

| Feature | State |
| --- | --- |
| F-01 Resident creates pass | Built |
| F-02 QR code and shareable link | Built |
| F-04 Entry log view and export | Built |
| F-05 Blocklist data | Built |
| F-03 Guard verifies a pass | **Next. To be specced.** |
| F-06 Recurring passes for domestic staff | Out of scope |

## Functional requirements

- **R-1** The resident form validates alias length (2 to 24 characters after trimming) and that `validUntil` is not before `validFrom`.
- **R-2** A created pass is signed with ECDSA P-256 / SHA-256. The token format is in `data-model.md`.
- **R-3** The verify URL is built from `window.location.origin`, never a fixed host.
- **R-4** The log screen shows "No entries yet" when empty. **Export CSV** is disabled when empty.
- **R-5** The verify route shows "Verification is not implemented yet" until F-03 is built.

## Verification policy (for F-03)

Applied in this order:

1. Signature valid.
2. Blocklist check. It overrides every later rule, including a valid pass.
3. Validity window.
4. One-time ledger check.
5. Grant or deny with a specific reason. Every attempt is logged.

`verifyPass(token, now, ledger, blocklist, publicKey)` is a pure function. Time is a parameter.

## Non-functional requirements

- Works on mixed phones in a modern browser.
- Result text is large and never relies on colour alone. WCAG AA.
- No server, no cost per user.
- Every user string is escaped. Fake data only.

## Known limitations

- **Single-device ledger and log.** One-time passes are tracked per device. The log shows one device only.
- **Demo keys.** Anyone can forge a pass with the committed private key. For demo only.

## Open questions and assumptions

These come from the discovery packet. They are **not resolved**. Resolve them when specifying F-03.

1. **End date.** The Reglamento says a pass is valid "until" the end date. Is that instant included or not?
2. **Revocation.** Who may revoke a pass: the resident, the administrator, the guard? How does a revocation reach a device with no server?
3. **No signal.** What should happen when the guard's phone has no signal? Can the page open at all?
4. **Domestic staff.** Mentioned once, with no rules. Out of scope until the board gives rules (F-06).
5. **Typed code vs QR.** The guard wants a short typed code. The board wants QR. The resident wants a link. Which are supported?

Assumptions in use (change if wrong):

- The blocklist ships inside the app and changes with a deploy. The board wants a simple solution, yet a blocklist that always wins needs the list to reach every guard phone. These two goals pull in different directions.
- Blocklist matching is by visitor alias, because aliases are all we store.
