---
Status: Approved
---

# User Personas

Three personas, built only from `.athanor/docs/discovery/`. First names are the ones used in the stakeholder notes; all people are fictional.

## P-1: Lucy, the resident

- **Confidence:** Proto-persona
- **Short description:** A resident of Tartan Fields who often has relatives and deliveries visiting.
- **Context of use:** Lives in section 7 with two children. Uses the product from her phone.

### Goals

- Create a pass in under a minute from her phone.
- Send it by text message as a link.
- Create passes for one visit or for a weekend.

### Pain Points

- Calling the gate.
- Explaining a picture to a guest.
- Having a relative's full name stored in a system.

### Behaviors

- Fills in the pass form, copies the verify link, and shares it.

### Constraints

- Does not want guests' full names stored in a system.

### What Success Looks Like

- A pass created in under a minute and sent as a link, with no call to the gate and no full name stored.

### Related Journeys

- J-1

---

## P-2: Ed, the guard

- **Confidence:** Proto-persona
- **Short description:** The night-shift guard at the main gate.
- **Context of use:** In a booth at the main gate. Uses an older Android phone with a small, sometimes cracked screen.

### Goals

- Decide in seconds.
- See a big, obvious green or red answer.

### Pain Points

- Cameras and scanning that take a minute.
- Small text at 3 am.
- Not being sure who is allowed.

### Behaviors

- Opens the pass the visitor shows and reads the result.
- Prefers typing a short code to scanning. This version supports the QR code and the link only (`.athanor/context/engineering/prd.md`, D-4).

### Constraints

- Older Android phone with a small, sometimes cracked screen.
- Works nights, in a booth.

### What Success Looks Like

- A big green or red answer in seconds, without small text or a slow scan.

### Related Journeys

- J-2

---

## P-3: Marissa, the administrator

- **Confidence:** Proto-persona
- **Short description:** The board-appointed administrator who handles complaints and keeps the list of banned people.
- **Context of use:** Works in the office on weekdays.

### Goals

- A modern look the board will approve.
- A monthly entries report that opens in a spreadsheet.
- A blocklist that always works.

### Pain Points

- Searching the paper notebook.
- Answering for incidents without records.

### Behaviors

- Reviews the entry log, exports it as CSV, and maintains the blocklist data.

### Constraints

- Cannot see passes that were created but never used. The app does not store passes (`.athanor/context/engineering/prd.md`, D-5).
- Cannot revoke a single pass. She stops a visitor by adding the alias to the blocklist (D-2).

### What Success Looks Like

- A monthly CSV of entries in a spreadsheet and a blocklist that always works, in a look the board approves.

### Related Journeys

- J-3
- J-4
