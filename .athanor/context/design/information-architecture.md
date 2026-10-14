---
Status: Approved
---

# Information Architecture

## IA Summary

- **Primary navigation model:** One page with hash routing. There is no sign-in. A small header has two links: **New pass** (`#/`) and **Entry log** (`#/log`). The verify route has no navigation, so a guard sees only the result.
- **Entry points:** Residents open `#/`. The administrator opens `#/log`. A guard arrives from a verify link, `<origin><path>#/verify?p=<token>`. The origin comes from `window.location.origin`. The token is the signed pass: `base64url(payload).base64url(signature)`.
- **Core content/objects:** Pass (E-1), Token (E-2), Blocklist (E-3), Ledger (E-4), Entry log (E-5). See `.athanor/context/engineering/data-model.md`.

## Page Tree / Sitemap

- New pass, `#/` (PG-1)
- Entry log, `#/log` (PG-2)
- Verify, `#/verify?p=<token>` (PG-3)

## Page Responsibilities

### PG-1: Resident form

- **Purpose:** Let a resident create a pass and share it. Route `#/`. Audience: resident (P-1). Features: F-1, F-2.
- **Primary actions:** Select a unit (12 demo units), enter an alias, choose the pass type, set start and end, and press **Create pass**. After success, copy the link with **Copy verify link**.
- **Data shown:** Form fields. After success: QR code, link text, and the **Copy verify link** button.

### PG-2: Entry log

- **Purpose:** Let the administrator review entry attempts and export them. Route `#/log`. Audience: administrator (P-3). Feature: F-4.
- **Primary actions:** Read the table. Press **Export CSV**.
- **Data shown:** Table with time, result, reason, pass id, unit, alias. Empty state: "No entries yet".

### PG-3: Verify

- **Purpose:** Show a guard the result of a pass check. Route `#/verify?p=<token>`. Audience: guard (P-2). Feature: F-3 (not built yet).
- **Primary actions:** None. The guard only reads the result.
- **Data shown:** Today, the verify page shows a panel with the placeholder "Verification is not implemented yet". After F-3, it shows a full-screen result with text, icon and reason. Granted also shows the unit and alias, and for a one-time pass the line "One-time pass. It cannot be used again." Denied shows the reason only (`.athanor/context/engineering/prd.md`, R-6, D-7, D-9).

## Navigation Rules

- **Header links:** On PG-1 and PG-2, the header shows **New pass** (`#/`) and **Entry log** (`#/log`).
- **Verify has no navigation:** On PG-3 there is no header navigation, so a guard sees only the result.
- **No sign-in:** There is no sign-in on any page.

## Content Types

### Content type: Pass form and share panel

- **Rendered on:** PG-1
- **Sourced from:** E-1, E-2
- **Key fields shown:** Unit, alias, pass type, start, end. After success: QR code, link text.

### Content type: Entry log row

- **Rendered on:** PG-2
- **Sourced from:** E-5
- **Key fields shown:** Time, result, reason, pass id, unit, alias.

### Content type: Verification result

- **Rendered on:** PG-3
- **Sourced from:** E-1, E-2, E-3, E-4
- **Key fields shown:** Not built yet. After F-3: result text, icon and reason, plus unit and alias when granted (D-9).

## Required States

- **Every page covers:** Loading, Empty, Error, Success
- **Exceptions:** Not stated in discovery.
