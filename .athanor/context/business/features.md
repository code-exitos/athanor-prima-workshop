---
Status: Approved
---

# Features

## Must Have

### F-1: Resident creates pass

- **Description:** A resident picks a unit, enters an alias, chooses a pass type (`one-time` or `date-range`) and dates. The app validates the input, creates the pass, and signs it. Built.
- **Rationale:** Without a pass there is nothing to verify at the gate (R-1, R-2 in `.athanor/context/engineering/prd.md`).
- **Serves:** G-1
- **Est. story count:** 2 (US-1, US-2)

### F-2: QR code and shareable link

- **Description:** The signed token is shown as a QR code and as a verify URL built from the current origin. A **Copy verify link** button copies the URL. Built.
- **Rationale:** The visitor needs something to show or receive; the resident wants a link to send by text message (R-3; `.athanor/docs/discovery/stakeholder-notes.md`).
- **Serves:** G-1
- **Est. story count:** 2 (US-3, US-4)

### F-3: Guard verifies a pass from the QR link

- **Description:** The verify route opens from the QR link and applies the verification policy: signature, blocklist, validity window, one-time ledger, then grant or deny with a reason, and a log entry for every attempt. The exact check order, the fixed reason texts, one-time pass handling and the screens are settled in `.athanor/context/engineering/prd.md` (R-6, D-1 to D-12). Not built. The verify route today only shows "Verification is not implemented yet" (R-5).
- **Rationale:** It is the next feature in the PRD ("Next. To be specced.") and the one that delivers the guard's decision and the blocklist rule.
- **Serves:** G-2, G-3, G-4
- **Est. story count:** 3, to be specced as GitHub issues. Planned split: (1) `verifyPass`, the pure policy with the fixed reason texts (`prd.md` R-6); (2) the verify screen, which reads the clock once, writes the ledger on a grant of a one-time pass, and shows the result (D-7, D-9); (3) the log entry for every attempt, with the fields in D-9.

### F-4: Entry log view and export

- **Description:** The `#/log` screen lists stored entries and exports them as CSV. Built. Nothing writes entries yet, because verification (F-3) is not built.
- **Rationale:** The administrator wants an entries report that opens in a spreadsheet (R-4).
- **Serves:** G-4
- **Est. story count:** 2 (US-5, US-6)

### F-5: Blocklist data

- **Description:** A fake blocklist in `src/data/blocklist.ts` and the `isBlocked` function. Built. The blocklist is not yet used by any screen.
- **Rationale:** The administrator keeps the list of banned people, and the blocklist must override every pass (see the verification policy in the PRD).
- **Serves:** G-3
- **Est. story count:** 2 (US-7, US-8)

## Won't Have (for now)

### F-6: Recurring passes for domestic staff

- **Reason for exclusion:** Domestic staff come every week. The community bylaws say only that they follow rules approved by the board, and no rules have been given (`.athanor/docs/discovery/bylaws-excerpt.md`). It is not planned and needs rules from the board before it can come back in. See NG-2.

## Dependencies / Notes

- F-3 depends on F-1 (signed pass), F-5 (blocklist) and F-4 (the log it writes to).
- F-4 shows no entries until F-3 writes them.
- F-5 is not used by any screen until F-3 is built.
- Bucket placement and Est. story count were set when the document was converted to the Athanor format: all in-scope features are listed as Must Have because the sources give no ranking among them.
