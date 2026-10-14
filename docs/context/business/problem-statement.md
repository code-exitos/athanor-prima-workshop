---
title: Problem statement and goals
status: Approved
owner: Product owner (Residencial Los Pinos board liaison)
last_updated: 2026-10-14
---

# Problem statement and goals

## Problem

Guards at Residencial Los Pinos record visitors in a paper notebook. They often cannot confirm with a resident whether a visitor is expected. The notebook cannot be searched. The board cannot quickly see who entered, and cannot reliably stop banned people from entering.

## Who is affected

- **Residents** who want their visitors to enter without delay.
- **Guards** who must decide at the gate, often at night, with a basic phone.
- **The administrator and board** who must answer for what happens at the gate.

## Goals

1. A resident can create a visitor pass in under one minute.
2. A guard can decide "allow" or "deny" in a few seconds, with a clear result.
3. Banned people never enter, even with a valid pass.
4. The board can review who entered and who was refused.
5. The first version runs with no server and almost no running cost.

## Non-goals (first version)

- Real resident accounts or sign-in.
- Recurring access for domestic staff.
- Payments, messaging, or camera-based plate reading.

## Constraints

Small budget. No server at launch. Mixed phone types. Visitors must not be identified by real names. See `docs/discovery/constraints.md`.

## Success measures

- Notebook retired within three months of launch.
- A guard decision takes under 10 seconds in a test with real guards.
- Zero entries by blocklisted persons.
