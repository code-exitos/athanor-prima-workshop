---
Status: Approved
---

# Features

## Must Have

### F-1: Administrator creates a pass

- **Description:** The administrator picks a building (one of four: Main Tower, East Wing, West Wing, Annex), types the visitor's name, and sets valid from and valid until. The app validates the input, creates the pass and signs it. Built.
- **Rationale:** Without a pass there is nothing for the guard to check (R-1, R-2 in `.athanor/context/engineering/prd.md`; `.athanor/docs/discovery/kickoff-brief.md`).
- **Serves:** G-1, G-5
- **Est. story count:** 1 (US-1)

### F-2: QR code

- **Description:** The signed token is shown as a QR code on the screen, with a text alternative. There is no link text, no copy button and no typed code. A short note says: "In a full version, this QR code could be sent to the visitor by email." Built.
- **Rationale:** Both the administrator and the guard want the pass to be a QR code, and nobody asked for typed codes or links (`.athanor/docs/discovery/stakeholder-notes.md`; D-3).
- **Serves:** G-1
- **Est. story count:** 1 (US-2)

### F-3: Guard verifies a pass

- **Description:** Scanning the QR code opens the verify link. The page applies the verification policy: readable token, signature, blocklist, valid from, valid until, then grant or deny with a reason, and a log entry for every attempt. The guard sees a full-screen green ACCESS GRANTED or red ACCESS DENIED with the reason. The check order, the fixed reason texts and the screens are settled in `.athanor/context/engineering/prd.md` (R-6, D-1, D-5, D-7, D-8). Not built. The verify page today only shows "Verification is not implemented yet" (R-5).
- **Rationale:** It delivers the guard's decision and the rule that banned people never enter. This is the feature the workshop attendees spec and build.
- **Serves:** G-2, G-3, G-4
- **Est. story count:** 3, to be specced as GitHub issues. Planned split: (1) `verifyPass`, the pure policy with the fixed reason texts (`prd.md` R-6, D-5); (2) the verify screen, which reads the clock once and shows the result (D-7); (3) the log entry for every attempt (D-7).

### F-4: Entry log view and export

- **Description:** The `#/log` page lists stored entries and exports them as CSV. Built. Nothing writes entries until F-3 is built.
- **Rationale:** The administrator wants a report of entries that opens in a spreadsheet at month end, and the facilities team wants to see who came in and when (`.athanor/docs/discovery/stakeholder-notes.md`; R-4).
- **Serves:** G-4
- **Est. story count:** 2 (US-3, US-4)

### F-5: Blocklist data

- **Description:** A fake list of visitor names in `src/data/blocklist.ts` and the `isBlocked(name)` function. Built. No screen uses the blocklist until F-3 is built.
- **Rationale:** A banned person must never get in, even with a valid pass (`.athanor/docs/discovery/visitor-policy-excerpt.md`, 4.5; `.athanor/docs/discovery/kickoff-brief.md`).
- **Serves:** G-3
- **Est. story count:** 2 (US-5, US-6)

## Won't Have (for now)

### Sending the QR code to the visitor

- **Reason for exclusion:** The administrator said a full version could email the QR code, "for a later version" (`.athanor/docs/discovery/stakeholder-notes.md`). See NG-2.

### Revoking a pass

- **Reason for exclusion:** There is no revoke feature. A pass stops working when it expires. To stop a visitor sooner, the administrator adds the visitor's name to the blocklist (D-2).

### Sign-in and user accounts

- **Reason for exclusion:** There are only two users and the first version has no accounts (`.athanor/docs/discovery/constraints.md`). See NG-1.

## Dependencies / Notes

- F-2 depends on F-1 (a pass must exist to show a QR code).
- F-3 depends on F-1 (signed pass), F-5 (blocklist) and F-4 (the log it writes to).
- F-4 shows no entries until F-3 writes them.
- F-5 is not used by any screen until F-3 is built.
- Bucket placement and Est. story count: all in-scope features are listed as Must Have because the sources give no ranking among them.
