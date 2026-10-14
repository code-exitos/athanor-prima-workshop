---
title: Infrastructure architecture
status: Approved
owner: Tech lead
last_updated: 2026-10-14
---

# Infrastructure architecture

## Overview

A static single-page app. No backend, no database, no accounts. Everything runs in the user's browser. Any static host can serve the built files (`dist/`).

```
Resident phone                          Guard phone
  form -> createPass -> signPass          open link -> verify page
  token = payload.signature               (F-03) verifyPass(token, now, ledger,
  QR + link  ------------ text message ------> blocklist, publicKey)
                                          ledger + log in localStorage
```

## Components

- **Static host:** serves HTML, JS, CSS. Cost: near zero.
- **Browser:** runs all logic. Uses the Web Crypto API (ECDSA P-256, SHA-256) and `localStorage`.
- **`qrcode` library:** the only runtime dependency. Draws the QR code.

## Signing and trust

The token is `base64url(JSON payload) + "." + base64url(signature)`. The signature covers the payload segment. A verifier needs only the public key. See ADR 0001.

## Verification policy (F-03, not built)

The verify page applies this order and stops at the first failure:

1. Signature is valid.
2. Alias is not on the blocklist. The blocklist overrides everything after it.
3. Current time is inside the validity window.
4. One-time passes: the pass is not already in the ledger.
5. Grant or deny with a specific reason.

Every attempt writes an entry to the entry log. Time is a parameter: `verifyPass(token, now, ledger, blocklist, publicKey)` is a pure function (ADR 0002).

## Known limitations

- **Single-device ledger and log.** They are stored in one browser's `localStorage`. Two guard phones do not share them. A one-time pass can be used once on each device. The administrator sees only the entries of the device she uses.
- **Demo keys.** The key pair is committed and the private key ships in the browser bundle. Anyone can forge a pass. This is acceptable only for the demo. A real launch needs a different key custody model, which the board has not discussed.
- **Blocklist ships with the app.** Changing it needs a new deploy.
- **No offline guarantee.** The app is a web page. Behaviour with no signal is not decided (see PRD open questions).

## Security notes

- User text is never put into `innerHTML`. Use `textContent`.
- CSV export neutralises cells that start with `=`, `+`, `-` or `@`.
- No secrets and no personal data in the repo.
