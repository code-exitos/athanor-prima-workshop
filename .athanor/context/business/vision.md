---
Status: Approved
---

# Product Vision

Every visitor to Contoso HQ arrives with a pass the administrator created, and every guard can trust a clear green or red answer at the lobby. The administrator picks a building, the dates and the visitor's name. The app creates a pass, signs it so it cannot be forged, and shows it as a QR code. The guard scans the QR code with a phone, and the app shows access granted or access denied. The first version needs no server: everything runs in the browser.

## Value Proposition

- **Target user:** The administrator and the guards of Contoso HQ.
- **Core problem solved:** Visitors are recorded in a paper log that cannot be searched, and the lobby cannot reliably stop banned people.
- **Primary value delivered:** The administrator creates a pass in under a minute without calling the lobby. Guards get one clear answer on a phone screen, with a reason when access is denied. The facilities team gets a searchable record of entries and refusals, and a blocklist that always wins.
- **Key differentiators:** No server is needed. Passes are signed so they cannot be forged. The blocklist overrides every pass.
- **Why this is better than alternatives:** The alternative today is a paper log. It cannot be searched and cannot stop a banned person. This gives a searchable record and a result in seconds.

## Guiding Principles

- **GP-1:** Simple first. Fewer screens, fewer words, big results.
- **GP-2:** Private by default. The first version uses fake names only and stores nothing on a server.
- **GP-3:** Safe at the lobby. When in doubt, the answer is deny, and the reason is shown.
- **GP-4:** Cheap to run. Static hosting only, until the facilities team decides otherwise.
