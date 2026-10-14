---
Status: Approved
---

# Information Architecture

## IA Summary

- **Primary navigation model:** One page with hash routing. There is no sign-in. The header reads "Contoso HQ · Visitor access" and has two links: **New pass** (`#/`) and **Entry log** (`#/log`). The verify page has no navigation, so a guard sees only the result.
- **Entry points:** The administrator opens `#/` or `#/log` on a laptop. A guard arrives by scanning a QR code with the phone camera. The QR code opens the verify link, `<origin><path>?p=<token>`. The token is the signed pass: `base64url(payload).base64url(signature)`. In the demo, the administrator's QR code on the laptop screen is scanned with a phone. That simulates the guard scanning the visitor's code at the lobby.
- **Core content/objects:** Pass (E-1), Token (E-2), Blocklist (E-3), Entry log (E-4). See `.athanor/context/engineering/data-model.md`.

## Page Tree / Sitemap

- New visitor pass, `#/` (PG-1)
- Entry log, `#/log` (PG-2)
- Verify, `?p=<token>` (PG-3)

## Page Responsibilities

### PG-1: New visitor pass

- **Purpose:** Let the administrator create a visitor pass and show it as a QR code. Route `#/`. Audience: administrator (P-1). Features: F-1, F-2.
- **Primary actions:** Choose a building (Main Tower, East Wing, West Wing, Annex), enter the visitor name, set valid from and valid until, and press **Generate QR code**.
- **Data shown:** The form fields. After success, only the QR code and the note "In a full version, this QR code could be sent to the visitor by email." No link text and no copy button are shown.

### PG-2: Entry log

- **Purpose:** Let the administrator review entry attempts and export them. Route `#/log`. Audience: administrator (P-1). Feature: F-4.
- **Primary actions:** Read the table. Press **Export CSV**.
- **Data shown:** Table with time, result, reason, pass id, building and visitor name. Empty state: "No entries yet". Nothing writes entries until F-3 is built.

### PG-3: Verify

- **Purpose:** Show a guard the result of a pass check. Route `?p=<token>`. Audience: guard (P-2). Feature: F-3 (not built yet).
- **Primary actions:** None. The guard only reads the result.
- **Data shown:** Until F-3, the page shows the placeholder "Verification is not implemented yet". After F-3, it shows a full-screen result. Granted shows ACCESS GRANTED, the reason, the building and the visitor name. Denied shows ACCESS DENIED and the reason only (`.athanor/context/engineering/prd.md`, R-5, R-6, D-7).

## Navigation Rules

- **Header links:** On PG-1 and PG-2, the header shows **New pass** (`#/`) and **Entry log** (`#/log`).
- **Verify has no navigation:** On PG-3 there is no header navigation, so a guard sees only the result.
- **No sign-in:** There is no sign-in on any page.

## Content Types

### Content type: Pass form and QR panel

- **Rendered on:** PG-1
- **Sourced from:** E-1, E-2
- **Key fields shown:** Building, visitor name, valid from, valid until. After success: the QR code and the email note.

### Content type: Entry log row

- **Rendered on:** PG-2
- **Sourced from:** E-4
- **Key fields shown:** Time, result, reason, pass id, building, visitor name.

### Content type: Verification result

- **Rendered on:** PG-3
- **Sourced from:** E-1, E-2, E-3, E-4
- **Key fields shown:** Not built yet. After F-3: result text, icon and reason, plus building and visitor name when granted (D-7).

## Required States

- **Every page covers:** Loading, Empty, Error, Success
- **Exceptions:** Not stated in discovery.
