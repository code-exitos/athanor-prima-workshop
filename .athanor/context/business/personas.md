---
Status: Approved
---

# User Personas

Two personas, built only from `.athanor/docs/discovery/`. First names are the ones used in `.athanor/docs/discovery/stakeholder-notes.md`; all people are fictional. There are only two kinds of user and no sign-in (`.athanor/docs/discovery/constraints.md`).

## P-1: Marissa, the facilities administrator

- **Confidence:** Proto-persona
- **Short description:** The facilities administrator at Contoso HQ. She creates visitor passes, keeps the list of banned people and handles complaints.
- **Context of use:** Works in the facilities office on weekdays, on a laptop with a modern browser.

### Goals

- Create a visitor pass before the visit: choose the building, the dates and the visitor's name.
- Show a QR code when the pass is created. "It looks modern and security will approve it faster."
- Get a report of entries that opens in a spreadsheet at month end.
- Keep a list of banned people that always works.

### Pain Points

- The paper log cannot be searched. After a security audit the facilities team spent two days reading pages.
- Answering complaints about visitors without records.

### Behaviors

- Creates passes, reviews the entry log, exports it as CSV, and keeps the blocklist.
- For the demo, her QR code on the laptop screen is scanned with a phone. This simulates the guard scanning the visitor's code at the lobby.

### Constraints

- Cannot see passes that were created but never used. The app does not store passes (`.athanor/context/engineering/prd.md` D-4).
- Cannot revoke a single pass. To stop a visitor before the pass expires she adds the visitor's name to the blocklist (`.athanor/context/engineering/prd.md` D-2).
- The QR code is not sent to the visitor. She said a later version could email it (`.athanor/context/engineering/prd.md` D-3).

### What Success Looks Like

- A pass created in under a minute, a monthly CSV of entries in a spreadsheet, and a blocklist that always works.

### Related Journeys

- J-1
- J-3
- J-4

---

## P-2: Ed, the lobby security guard

- **Confidence:** Proto-persona
- **Short description:** A lobby security guard at Contoso HQ. He decides whether a visitor may enter.
- **Context of use:** Works shifts at the Main Tower lobby. Uses a company phone: recent iPhones and mid-range Android phones. Some guards have poor eyesight (`.athanor/docs/discovery/constraints.md`).

### Goals

- Scan the QR code with the phone camera.
- See a clear answer right after the scan: a big green screen or a big red screen.
- On the red screen, see the reason, so he can tell the visitor why.

### Pain Points

- Small text. "I do not want to read small text."
- Phoning the employee host to ask if a visitor is expected. The host often does not answer.

### Behaviors

- Scans the QR code on the visitor's pass and reads the result.
- Does not create passes and does not edit the banned list.

### Constraints

- Company phone, no app from a store. A web page is acceptable.
- Sees only the result. The verify page has no navigation (`.athanor/context/engineering/prd.md` D-7).

### What Success Looks Like

- A big green or red answer in seconds, with the reason when access is denied, and no small text.

### Related Journeys

- J-2
