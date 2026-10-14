---
title: "ADR 0001: Signed token pass, no backend"
status: Approved
owner: Tech lead
last_updated: 2026-10-14
---

# ADR 0001: Signed token pass, no backend

## Context

The board wants passes, no server at launch, and a small budget. A guard's phone must be able to decide from the pass alone.

## Decision

A pass is a **signed token**: `base64url(JSON payload) + "." + base64url(signature)`. The signature is ECDSA P-256 with SHA-256, made with the Web Crypto API. The token goes into a verify URL, shown as a QR code and as a link. A verifier needs the pass and the public key only.

We use no backend and no crypto library.

## Why this fits

- The token carries all pass data. No lookup is needed.
- A signature stops a visitor from editing dates or units.
- Static hosting is cheap and simple.

## Consequences

- The ledger and the log live in one browser. They are not shared between devices.
- Revocation and live blocklist updates need a server, or a deploy. Not solved here.
- **Demo keys:** the key pair is committed and the private key is in the bundle. Anyone can forge passes. Real use needs another way to hold the signing key.
- The token includes the unit and the alias. Do not put legal names in aliases.
