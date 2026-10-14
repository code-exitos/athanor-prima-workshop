---
Status: Approved
---

# Product Vision

Every visitor to Tartan Fields arrives with a pass their resident created, and every guard can trust a clear green or red answer at the gate. A resident fills in a short form. The app creates a pass and signs it so it cannot be forged. The pass is shown as a QR code and a link. The guard opens the link, and the app shows access granted or access denied. The first version needs no server: everything runs in the browser.

## Value Proposition

- **Target user:** Residents, guards, and the administrator and board of Tartan Fields.
- **Core problem solved:** Visitors are recorded in a paper notebook that cannot be searched, and the gate cannot reliably stop banned people.
- **Primary value delivered:** Residents create and share a pass in under a minute without calling the gate. Guards get one clear answer on a phone screen, with a reason when access is denied. The board gets a searchable record of entries and refusals, and a blocklist that always wins.
- **Key differentiators:** No server is needed. Passes are signed so they cannot be forged. The blocklist overrides every pass.
- **Why this is better than alternatives:** The alternative today is a paper notebook. It cannot be searched and cannot stop a banned person. This gives a searchable record and a result in seconds.

## Guiding Principles

<!-- Every principle is coded GP-# (see context-doc-coding-scheme.md in the athanor-context-doc skill);
engineering trade-off decisions and ADRs may cite one as rationale. -->

- **GP-1:** Simple first. Fewer screens, fewer words, big results.
- **GP-2:** Private by default. Visitors are identified by an alias, never a legal name.
- **GP-3:** Safe at the gate. When in doubt, the answer is deny, and the reason is shown.
- **GP-4:** Cheap to run. Static hosting only, until the board decides otherwise.
