---
title: "ADR 0001: Signed token pass, no backend"
status: Approved
owner: Tech lead
last_updated: 2026-10-14
---

# ADR 0001: Signed token pass, no backend

## Context

The administrator needs to create visitor passes, IT wants no server at launch, and the budget is small. A guard's phone must be able to decide from the pass alone.

## Decision

A pass is a **signed token**: `base64url(JSON payload) + "." + base64url(signature)`. The signature is ECDSA P-256 with SHA-256, made with the Web Crypto API. The token goes into a verify URL, `<origin><path>?p=<token>`, and the app shows that URL as a QR code. There is no link text and no copy button. The pass carries the building and the visitor name. A verifier needs the pass and the public key only.

We use no backend and no crypto library.

## Why this fits

- The token carries all pass data. No lookup is needed.
- A signature stops anyone from editing the building, the dates or the visitor name.
- Static hosting is cheap and simple.

## Consequences

- The entry log lives in one browser. It is not shared between devices. There is no other stored data, because a pass needs no lookup.
- The verifier is `verifyPass(token, now, blocklist, publicKey)`. It needs no stored state.
- Revocation and live blocklist updates need a server, or a deploy. Not solved here.
- **Demo keys:** the key pair is committed and the private key is in the bundle. Anyone can forge passes. Real use needs another way to hold the signing key.
- The token includes the building and the visitor name. Use fake names only.
