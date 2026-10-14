---
title: Information architecture
status: Approved
owner: Product owner (Residencial Los Pinos board liaison)
last_updated: 2026-10-14
---

# Information architecture

The app is one page with hash routing. There is no sign-in.

| Route | Screen | Audience | Feature |
| --- | --- | --- | --- |
| `#/` | Resident form and result (QR, link, copy button) | Resident | F-01, F-02 |
| `#/log` | Entry log and CSV export | Administrator | F-04 |
| `#/verify?p=<token>` | Verification result | Guard | F-03 (placeholder panel for now) |

## Navigation

A small header with two links: **New pass** (`#/`) and **Entry log** (`#/log`). The verify route has no navigation, so a guard sees only the result.

## Verify link

`<origin><path>#/verify?p=<token>`. The origin comes from `window.location.origin`. The token is the signed pass: `base64url(payload).base64url(signature)`.

## Screen contents

- **Resident:** unit select (12 demo units), alias, pass type, start and end, **Create pass**. After success: QR code, link text, **Copy verify link**.
- **Log:** table with time, result, reason, pass id, unit, alias. Empty state: "No entries yet". **Export CSV** button.
- **Verify:** today, a panel "Verification is not implemented yet". After F-03: a full-screen result with text, icon and reason.
