---
title: Features
status: Approved
owner: Product owner (Tartan Fields board liaison)
last_updated: 2026-10-14
---

# Features

| ID | Feature | Status |
| --- | --- | --- |
| F-01 | Resident creates pass | Built |
| F-02 | QR code and shareable link | Built |
| F-03 | Guard verifies a pass from the QR link | Not built. To be specced. |
| F-04 | Entry log view and export | Built |
| F-05 | Blocklist data | Built |
| F-06 | Recurring passes for domestic staff | Future. Out of scope. |

## F-01 Resident creates pass (built)

A resident picks a unit, enters an alias, chooses a pass type (`one-time` or `date-range`) and dates. The app validates the input, creates the pass, and signs it.

## F-02 QR code and shareable link (built)

The signed token is shown as a QR code and as a verify URL built from the current origin. A **Copy verify link** button copies the URL.

## F-03 Guard verifies a pass from the QR link (not built)

The verify route opens from the QR link and applies the verification policy: signature, blocklist, validity window, one-time ledger, then grant or deny with a reason, and a log entry for every attempt. The verify route today only shows "Verification is not implemented yet".

## F-04 Entry log view and export (built)

The `#/log` screen lists stored entries and exports them as CSV. Nothing writes entries yet, because verification is not built.

## F-05 Blocklist data (built)

A fake blocklist in `src/data/blocklist.ts` and the `isBlocked` function. The blocklist is not yet used by any screen.

## F-06 Recurring passes for domestic staff (future, out of scope)

Domestic staff come every week. The community bylaws say only that they follow rules approved by the board, and no rules have been given. This feature is not planned. It needs rules from the board first.
