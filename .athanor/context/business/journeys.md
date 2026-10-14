---
Status: Approved
---

# User Journeys

## J-1: Resident creates and shares a pass

- **Primary persona:** P-1
- **Goal of the journey:** Create a pass for a visitor and get a link to them without calling the gate. Supports F-1, F-2.

### Primary Path

1. Lucy opens the app at `#/` (PG-1).
2. She picks her unit, types an alias for the visitor, chooses the pass type and dates.
3. She presses **Create pass**. The app creates and signs the pass.
4. The app shows a QR code, the verify link, and a **Copy verify link** button.
5. She copies the link and sends it by text message.

### Alternate Paths

- **Not stated:** The sources describe no alternate path.

### Failure / Recovery Paths

- **The input is wrong:** The form shows what to fix, and Lucy corrects it and presses **Create pass** again.

### Outcome

- **Successful end state:** The visitor has a link that opens the verify page.
- **Related success signal (optional):** Not stated in discovery. G-1 has no metric yet.

---

## J-2: Guard verifies a pass

- **Primary persona:** P-2
- **Goal of the journey:** Decide in seconds whether to let a visitor in, with a clear result. Supports F-3 (not built yet).

### Primary Path

1. The visitor shows the QR code, or the guard opens the link.
2. The verify page (PG-3) runs the **verification policy**, in this order:
   1. The signature is valid.
   2. The visitor alias is not on the blocklist. The blocklist overrides everything after it.
   3. The current time is inside the pass validity window.
   4. For a one-time pass, the pass has not been used before (ledger check).
   5. Grant or deny, with a specific reason.
3. Every attempt, granted or denied, is written to the entry log.
4. The guard sees a full-screen result: green **ACCESS GRANTED** or red **ACCESS DENIED**, always with text and an icon, never colour alone.

### Alternate Paths

- **The guard prefers typing a short code to scanning:** Not resolved. See the open questions in `.athanor/context/engineering/prd.md`.

### Failure / Recovery Paths

- **The ledger and the log live in one device's browser storage:** A pass used at another device is not seen.
- **The demo keys are public:** Anyone can forge a pass with the committed private key (see `.athanor/docs/adr/0001-signed-token-pass.md`).
- **Any check fails:** The guard sees ACCESS DENIED with the specific reason.

### Outcome

- **Successful end state:** The guard has a clear granted or denied answer, and the attempt is in the entry log.
- **Related success signal (optional):** M-2, M-3

---

## J-3: Administrator reviews the log

- **Primary persona:** P-3
- **Goal of the journey:** See who entered and open the records in a spreadsheet. Supports F-4.

### Primary Path

1. Marissa opens `#/log` (PG-2).
2. She sees the entries.
3. She presses **Export CSV** and opens the file in a spreadsheet.

### Alternate Paths

- **There are no entries:** She sees "No entries yet", and **Export CSV** is disabled.

### Failure / Recovery Paths

- **The log shows only entries written on the device she is using:** Entries from other devices are not visible to her.

### Outcome

- **Successful end state:** Marissa has the entries as a CSV file in a spreadsheet.
- **Related success signal (optional):** M-1

---

## J-4: Board updates the blocklist

- **Primary persona:** P-3
- **Goal of the journey:** Get a new banned alias onto the blocklist. Supports F-5.

### Primary Path

1. The administrator gives the board a new alias to block.
2. A developer adds it to `src/data/blocklist.ts` and deploys.
3. The blocklist check uses the new list on the next page load.

### Alternate Paths

- **Not stated:** The sources describe no alternate path.

### Failure / Recovery Paths

- **Not stated:** The sources describe no failure path.

### Outcome

- **Successful end state:** The new alias is blocked on the next page load.
- **Related success signal (optional):** M-3
