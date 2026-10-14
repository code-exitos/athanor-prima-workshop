---
title: User journeys
status: Approved
owner: Product owner (Residencial Los Pinos board liaison)
last_updated: 2026-10-14
---

# User journeys

## J-1: Resident creates and shares a pass (F-01, F-02)

1. Lucía opens the app at `#/`.
2. She picks her unit, types an alias for the visitor, chooses the pass type and dates.
3. She presses **Create pass**. If the input is wrong, the form shows what to fix.
4. The app shows a QR code, the verify link, and a **Copy verify link** button.
5. She copies the link and sends it by WhatsApp.

**Done when:** the visitor has a link that opens the verify page.

## J-2: Guard verifies a pass (F-03, not built yet)

1. The visitor shows the QR code, or the guard opens the link.
2. The verify page runs the **verification policy**, in this order:
   1. The signature is valid.
   2. The visitor alias is not on the blocklist. The blocklist overrides everything after it.
   3. The current time is inside the pass validity window.
   4. For a one-time pass, the pass has not been used before (ledger check).
   5. Grant or deny, with a specific reason.
3. Every attempt, granted or denied, is written to the entry log.
4. The guard sees a full-screen result: green **ACCESS GRANTED** or red **ACCESS DENIED**, always with text and an icon, never colour alone.

**Known limits:** the ledger and the log live in one device's browser storage. A pass used at another device is not seen. The demo keys are public (see ADR 0001).

## J-3: Administrator reviews the log (F-04)

1. Marisol opens `#/log`.
2. She sees entries, or "No entries yet" when there are none.
3. She presses **Export CSV** and opens the file in a spreadsheet. The button is disabled when there are no entries.

**Known limit:** the log shows only entries written on the device she is using.

## J-4: Board updates the blocklist (F-05)

1. The administrator gives the board a new alias to block.
2. A developer adds it to `src/data/blocklist.ts` and deploys.
3. The blocklist check uses the new list on the next page load.
