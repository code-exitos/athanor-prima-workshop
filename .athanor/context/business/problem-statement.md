---
Status: Approved
---

# Problem Statement

Guards at Tartan Fields record visitors in a paper notebook. They often cannot confirm with a resident whether a visitor is expected, and the notebook cannot be searched. Residents, guards and the board feel this: residents want their visitors to enter without delay, guards must decide at the gate (often at night, with a basic phone), and the administrator and board must answer for what happens there. The board cannot quickly see who entered and cannot reliably stop banned people from entering. The first version must work on a small budget, with no server, on mixed phone types, and without identifying visitors by real name (source: `.athanor/docs/discovery/constraints.md`).

## Goals

<!-- Every goal is coded G-# (see context-doc-coding-scheme.md in the athanor-context-doc skill);
features.md and the PRD's requirements reference a goal by this code, so keep it stable once
assigned. -->

- **G-1:** A resident can create a visitor pass in under one minute.
- **G-2:** A guard can decide "allow" or "deny" in a few seconds, with a clear result.
- **G-3:** Banned people never enter, even with a valid pass.
- **G-4:** The board can review who entered and who was refused.
- **G-5:** The first version runs with no server and almost no running cost.

## Success Metrics

### M-1: Notebook retired

- **Definition:** Whether the paper notebook is still used at the gate. The data source is not yet defined.
- **Target:** Notebook retired within three months of launch.
- **Measures:** G-4

### M-2: Guard decision time

- **Definition:** Time a guard takes to decide, measured in a test with real guards. The data source is not yet defined.
- **Target:** Under 10 seconds.
- **Measures:** G-2

### M-3: Blocklisted entries

- **Definition:** Number of entries by blocklisted persons. The data source is not yet defined.
- **Target:** Zero.
- **Measures:** G-3

## Non-Goals

- **NG-1:** Real resident accounts or sign-in. Out of scope for the first version.
- **NG-2:** Recurring access for domestic staff. Out of scope for the first version.
- **NG-3:** Payments, messaging, or camera-based plate reading. Out of scope for the first version.
- **NG-4:** A server and notifications. Out of scope for now (source: former "Out of scope for now" section of the vision).
