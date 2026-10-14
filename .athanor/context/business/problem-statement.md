---
Status: Approved
---

# Problem Statement

Visitors at Contoso HQ sign a paper log at the lobby. Guards often cannot confirm with the employee host whether a visitor is expected, and the paper log cannot be searched. Two people feel this: the facilities administrator, who must answer for who entered which building, and the guards, who must decide at the lobby. Security cannot quickly see who entered and cannot reliably stop banned people from entering. The first version must work on a small budget, with no server, on company phones and a laptop, and without storing real visitor names (source: `.athanor/docs/discovery/constraints.md`).

## Goals

- **G-1:** An administrator can create a visitor pass in under one minute.
- **G-2:** A guard can decide "allow" or "deny" in a few seconds, with a clear result.
- **G-3:** Banned people never enter, even with a valid pass.
- **G-4:** The facilities team can review who entered and who was refused.
- **G-5:** The first version runs with no server and almost no running cost.

## Success Metrics

### M-1: Paper log retired

- **Definition:** Whether the paper log is still used at the lobby. The data source is not yet defined.
- **Target:** Paper log retired within three months of launch.
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

- **NG-1:** Sign-in or user accounts. There are only two users, the administrator and the guard, and the first version has no login.
- **NG-2:** Sending the pass to the visitor, for example by email. A full version could do this. Out of scope for the first version.
- **NG-3:** Payments, messaging, or camera-based face or plate recognition. Out of scope for the first version.
- **NG-4:** A server and notifications. Out of scope for now.
