---
Status: Approved
---

# Data Model

## Overview

All data is fake demo data. There is no database and no backend (see `infrastructure-architecture.md`, C-4). Records live in code, inside a signed token, or in the browser's `localStorage`. This document covers every entity of increment 1 (`prd.md`). All four entities are net-new; nothing is inherited. The Pass (E-1) is not stored on its own: it travels inside the Token (E-2). The Blocklist (E-3) is a fixed list in code. The Entry log (E-4) is the only stored data, and it is single-device.

## Entity Relationship Diagram

```mermaid
erDiagram
    PASS ||--|| TOKEN : "is the payload of"
    PASS ||--o{ ENTRY_LOG_ENTRY : "may be referenced by"
    BLOCKLIST_NAME }o--o{ PASS : "matched against visitorName"
```

## Entities

### E-1: Pass

| Field | Type | Constraints | Notes |
| --- | --- | --- | --- |
| `v` | `1` | Required | Format version |
| `id` | string | Required, unique | UUID |
| `building` | string | Required | One of the 4 buildings: Main Tower, East Wing, West Wing, Annex |
| `validFrom` | string | Required | ISO 8601 UTC |
| `validUntil` | string | Required. Must not be before `validFrom`. | ISO 8601 UTC. This instant is inside the window (`prd.md`, D-1, D-8). |
| `visitorName` | string | Required, 2 to 40 characters after trimming | Fake names only. |

Every pass is valid from `validFrom` to `validUntil`. There is only one kind of pass.

- **Ownership / source of truth:** The administrator's browser creates it (`createPass` in `src/domain/pass.ts`). The signed token is the only copy.
- **Lifecycle:** Created by F-1 (administrator form, PG-1). Carried in the token and shown as a QR code by F-2. Read by the verify route when F-3 is built.
- **Deletion model:** Not stored, so nothing is deleted. The pass exists only inside the token that was shown as a QR code.

### E-2: Token

| Field | Type | Constraints | Notes |
| --- | --- | --- | --- |
| payload | string | Required | `base64url(JSON of E-1)` |
| signature | string | Required | `base64url(ECDSA P-256 / SHA-256 signature)` over the ASCII bytes of the payload segment |

The token is `base64url(JSON payload) + "." + base64url(signature)`. A verifier needs only the public key (ADR 0001, `.athanor/docs/adr/0001-signed-token-pass.md`). The QR code encodes the verify URL `<origin><path>?p=<token>`.

- **Ownership / source of truth:** Signed in the administrator's browser (`src/services/signing.ts`) with the demo private key in `src/data/demo-keys.ts`.
- **Lifecycle:** Created and signed by F-1. Shown as a QR code by F-2. Never stored by the app.
- **Deletion model:** Not stored by the app. A shown token cannot be recalled. There is no revoke feature; the administrator uses the blocklist instead (`prd.md`, D-2).

### E-3: Blocklist

| Field | Type | Constraints | Notes |
| --- | --- | --- | --- |
| name | string | Required | A fake blocked visitor name, for example "Mr Nobody" or "XX". Matching is by visitor name (`prd.md`, assumptions). Order in the policy: `prd.md` R-6. |

- **Ownership / source of truth:** `src/data/blocklist.ts`, a fake list. It is demo data.
- **Lifecycle:** Edited in code by a developer, then deployed (J-4). Read by `isBlocked(name)` in `src/domain/blocklist.ts`, which is an exact, case-sensitive match (`prd.md`, D-6). How a real list would reach every phone is out of scope for this demo.
- **Deletion model:** Not applicable. It is a list in the source code.

### E-4: Entry log

| Field | Type | Constraints | Notes |
| --- | --- | --- | --- |
| `at` | string | Required | ISO 8601 UTC time of the attempt |
| `result` | `"granted"` or `"denied"` | Required | |
| `reason` | string | Required | One of the six fixed texts in `prd.md` R-6 |
| `passId` | string | Optional | A token with a bad signature has no trusted fields. |
| `building` | string | Optional | Same as above |
| `visitorName` | string | Optional | Same as above |

A list of entries in storage key `na.entries.v1`, single device only. CSV columns: `at,result,reason,passId,building,visitorName`.

- **Ownership / source of truth:** The browser's `localStorage` on the device that verifies (`src/services/entry-log.ts`).
- **Lifecycle:** Appended by `appendEntry`, one entry per verification attempt, including every reload of a verify link (`prd.md`, D-7). A failed log write never changes the screen. Nothing writes entries yet because F-3 is not built. Read and exported as CSV by F-4 (PG-2).
- **Deletion model:** Retained until the user clears site data. The app has no delete function.

## Relationships

- **E-1 Pass to E-2 Token:** One to one. The token payload is the pass.
- **E-1 Pass to E-4 Entry log:** A pass may appear in many entries, by `passId`. The reference is optional and no cascade applies.
- **E-3 Blocklist to E-1 Pass:** Matched by `visitorName`, because the visitor name is the only identity we store.

## Migration Strategy

- **Tooling:** None. There is no database.
- **Backward-compatible vs. breaking change policy:** Not stated in discovery. The storage key carries a version suffix (`.v1`) and the pass has a format version (`v`).
- **Backfill approach for existing data:** Not applicable. The project is greenfield.
- **Rollback plan for a failed migration:** Not stated in discovery. No migration exists.

## Data Classification & Privacy

- **PII / sensitive fields:** `visitorName`. Visitor names are personal data, so the first version uses fake names only (`.athanor/docs/discovery/constraints.md`). All data is fake.
- **Retention / deletion requirements:** Not stated in discovery. Today the log stays until site data is cleared.
- **Cross-border / residency constraints:** Not stated in discovery.

## Indexing & Query Patterns

- **Access patterns this schema must serve well:** Check a visitor name against the blocklist. List all entries and export them as CSV.
- **Indexes added and why:** None. There is no database.
- **Query patterns intentionally left unindexed:** The entry log is read as a whole list. Demo data only. The log is per device and per browser profile.
