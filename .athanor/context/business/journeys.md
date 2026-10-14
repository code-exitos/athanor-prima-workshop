---
Status: Approved
---

# User Journeys

For the demo, the QR code that the administrator sees on the laptop screen is scanned with a phone. This simulates the guard scanning the visitor's QR code at the lobby.

## J-1: Administrator creates a pass

- **Primary persona:** P-1
- **Goal of the journey:** Create a visitor pass and get a QR code for it, without calling the lobby. Supports F-1, F-2.

### Primary Path

1. Marissa opens the New visitor pass page at `#/` (PG-1).
2. She picks the building (Main Tower, East Wing, West Wing or Annex), types the visitor's name, and sets the valid from and valid until dates.
3. She presses **Generate QR code**. The app validates the input, creates the pass and signs it.
4. The app shows the signed pass as a QR code, with a text alternative and a short note: "In a full version, this QR code could be sent to the visitor by email."

### Alternate Paths

- **Not stated:** The sources describe no alternate path.

### Failure / Recovery Paths

- **The input is wrong:** The form shows what to fix (no building, name shorter than 2 or longer than 40 characters, end before start, end in the past). Marissa corrects it and presses **Generate QR code** again.
- **No link text, copy button or typed code:** The QR code is the only way to share the pass (`.athanor/context/engineering/prd.md` D-3).

### Outcome

- **Successful end state:** A QR code for the pass is on the screen, ready to be scanned.
- **Related success signal (optional):** Not stated in discovery. G-1 has no metric yet.

---

## J-2: Guard verifies a pass

- **Primary persona:** P-2
- **Goal of the journey:** Decide in seconds whether to let a visitor in, with a clear result. Supports F-3 (not built yet).

### Primary Path

1. Ed scans the QR code on the visitor's pass with the phone camera. The phone opens the verify link (PG-3).
2. The verify page reads the clock once and runs the **verification policy**, in this order, stopping at the first failure:
   1. The link has a token that can be read.
   2. The signature is valid.
   3. The visitor is not on the blocklist. The blocklist overrides every rule after it.
   4. The time is not before the valid from date, and not after the valid until date. The end date is included (`.athanor/context/engineering/prd.md` D-1).
   5. Grant or deny, with a reason.
3. Every attempt, granted or denied, is written to the entry log, including reloads of the verify link (`.athanor/context/engineering/prd.md` D-7).
4. Ed sees a full-screen result: green **ACCESS GRANTED** with the reason, the building and the visitor's name, or red **ACCESS DENIED** with the reason only. The result never relies on colour alone.

### Alternate Paths

- **Not stated:** The sources describe no alternate path.

### Failure / Recovery Paths

- **Any check fails:** Ed sees ACCESS DENIED with one of the fixed reasons: "No valid pass in this link", "Pass is not authentic", "Visitor is blocked", "Pass is not valid yet", "Pass has expired" (`.athanor/context/engineering/prd.md` D-5).
- **The log lives in one device's browser storage:** An attempt on another device is not in this device's log.
- **The demo keys are public:** Anyone can forge a pass with the committed key (see `.athanor/docs/adr/0001-signed-token-pass.md`).

### Outcome

- **Successful end state:** Ed has a clear granted or denied answer, and the attempt is in the entry log.
- **Related success signal (optional):** M-2, M-3

---

## J-3: Administrator reviews the log

- **Primary persona:** P-1
- **Goal of the journey:** See who entered and who was refused, and open the records in a spreadsheet. Supports F-4.

### Primary Path

1. Marissa opens the Entry log page at `#/log` (PG-2).
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

## J-4: Administrator updates the blocklist

- **Primary persona:** P-1
- **Goal of the journey:** Get a new banned visitor name onto the blocklist. Supports F-5.

### Primary Path

1. Marissa gives a developer the visitor name to block.
2. The developer adds it to `src/data/blocklist.ts` and deploys.
3. The blocklist check uses the new list on the next page load.

### Alternate Paths

- **Not stated:** The sources describe no alternate path.

### Failure / Recovery Paths

- **The name differs in spelling or case:** The match is exact and case-sensitive. This is a known demo limit (`.athanor/context/engineering/prd.md` D-6).

### Outcome

- **Successful end state:** The new name is blocked on the next page load, even for a pass that is otherwise valid.
- **Related success signal (optional):** M-3
