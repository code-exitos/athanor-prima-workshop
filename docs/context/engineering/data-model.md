---
title: Data model
status: Approved
owner: Tech lead
last_updated: 2026-10-14
---

# Data model

All data is fake demo data. There is no database. Records live in code, in tokens, or in `localStorage`.

## Pass

| Field | Type | Notes |
| --- | --- | --- |
| `v` | `1` | Format version |
| `id` | string | UUID |
| `unit` | string | One of the 12 demo units |
| `type` | `"one-time"` or `"date-range"` | |
| `validFrom` | string | ISO 8601 UTC |
| `validUntil` | string | ISO 8601 UTC. Must not be before `validFrom`. Whether this instant is inside the window is an open question. |
| `visitorAlias` | string | Nickname or initials, 2 to 24 characters. Never a legal name. |

## Token

`base64url(JSON payload) + "." + base64url(signature)`. Signature: ECDSA P-256 with SHA-256, over the ASCII bytes of the first segment. Payload is the Pass.

## Blocklist

A list of aliases in `src/data/blocklist.ts`. Matching rule: see the PRD.

## Ledger (used passes)

A map from pass `id` to the ISO time the pass was used. Key in storage: `na.ledger.v1`. Single device only.

## Entry log

A list of entries in storage key `na.entries.v1`, single device only.

| Field | Notes |
| --- | --- |
| `at` | ISO 8601 UTC time of the attempt |
| `result` | `granted` or `denied` |
| `reason` | Short text |
| `passId`, `unit`, `visitorAlias` | Optional. A token with a bad signature has no trusted fields. |

CSV columns: `at,result,reason,passId,unit,visitorAlias`.

## Verification policy order

1. Signature valid.
2. Blocklist check (overrides everything).
3. Validity window.
4. One-time ledger check.
5. Grant or deny with a specific reason, and a log entry for every attempt.

## Limitations

- Ledger and log are per device and per browser profile. Clearing site data erases them.
- Demo keys are public. Do not use them in production.
