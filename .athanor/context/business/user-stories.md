---
Status: Approved
---

# User Stories

Stories exist for built features F-1, F-2, F-4 and F-5 only. F-3 has none yet.

## F-1: Resident creates pass

### US-1: Create a pass

- **Priority:** P1
- **Serves:** G-1 (via F-1)
- **Personas:** P-1
- **Journeys:** J-1

#### Why This Priority

Without a created pass nothing else in the flow works. It ships first within F-1.

#### Story Statement

- **As a** P-1 Lucy (resident),
- **I want** to create a pass for my visitor,
- **so that** the visitor can enter.

#### Independent Test

Fill in the resident form and submit. A signed pass is created without any other story being done.

#### Technical Context

Alias is 2 to 24 characters after trimming and `validUntil` must not be before `validFrom` (R-1). The pass is signed as a token (R-2). Entities: E-1 Pass, E-2 Token. Fields are in `.athanor/context/engineering/data-model.md`.

#### Acceptance Criteria

- **AC-1:** Given I am on the resident form, when I choose a unit, type an alias, pick a type and valid dates and submit, then a signed pass is created.
- **AC-2:** Given the alias is shorter than 2 or longer than 24 characters after trimming, when I submit, then I see an error next to the alias field and no pass is created.
- **AC-3:** Given the end date is before the start date, when I submit, then I see an error and no pass is created.

#### Edge Cases

- **Not stated:** The sources list no further edge cases.

#### Design/UX References

- **Journey:** J-1
- **IA page:** PG-1
- **UI Design Prompt:** Not drafted yet.

#### Dependencies

- No dependencies

#### Out of Scope

- Not stated.

#### Test Plan

- **Unit:** AC-1, AC-2, AC-3
- **Integration:** Not stated.
- **E2E (if applicable):** Not stated.

---

### US-2: Choose the pass type

- **Priority:** P2
- **Serves:** G-1 (via F-1)
- **Personas:** P-1
- **Journeys:** J-1

#### Why This Priority

The form works with one type, but residents need both a delivery and a weekend visit.

#### Story Statement

- **As a** P-1 Lucy (resident),
- **I want** one-time and date-range passes,
- **so that** I can fit a delivery or a weekend visit.

#### Independent Test

Open the pass type field on the form and check the choices.

#### Technical Context

Pass `type` is `"one-time"` or `"date-range"` (E-1 Pass, `.athanor/context/engineering/data-model.md`).

#### Acceptance Criteria

- **AC-1:** Given the form, when I open the pass type field, then I can choose `one-time` or `date-range`.

#### Edge Cases

- **Not stated:** The sources list no edge cases.

#### Design/UX References

- **Journey:** J-1
- **IA page:** PG-1
- **UI Design Prompt:** Not drafted yet.

#### Dependencies

- No dependencies

#### Out of Scope

- Recurring passes for domestic staff (F-6).

#### Test Plan

- **Unit:** AC-1
- **Integration:** Not stated.
- **E2E (if applicable):** Not stated.

---

## F-2: QR code and shareable link

### US-3: See a QR code

- **Priority:** P1
- **Serves:** G-1 (via F-2)
- **Personas:** P-1
- **Journeys:** J-1

#### Why This Priority

The QR code is what the visitor shows at the gate. The link (US-4) is the alternative way to share.

#### Story Statement

- **As a** P-1 Lucy (resident),
- **I want** to see a QR code for my pass,
- **so that** my visitor can show it at the gate.

#### Independent Test

Create a pass and check that the result shows a QR code with a text alternative.

#### Technical Context

The QR code encodes the verify URL with the signed token (E-2 Token; `.athanor/context/design/information-architecture.md`, PG-1).

#### Acceptance Criteria

- **AC-1:** Given a pass was created, when the result appears, then I see a QR code with a text alternative.

#### Edge Cases

- **Not stated:** The sources list no edge cases.

#### Design/UX References

- **Journey:** J-1
- **IA page:** PG-1
- **UI Design Prompt:** Not drafted yet.

#### Dependencies

- US-1: a pass must exist to show a QR code.

#### Out of Scope

- Not stated.

#### Test Plan

- **Unit:** Not stated.
- **Integration:** AC-1
- **E2E (if applicable):** Not stated.

---

### US-4: Copy a link

- **Priority:** P1
- **Serves:** G-1 (via F-2)
- **Personas:** P-1
- **Journeys:** J-1

#### Why This Priority

Lucy wants to send a link by text message instead of a picture.

#### Story Statement

- **As a** P-1 Lucy (resident),
- **I want** to copy a verify link,
- **so that** I can send it by text message.

#### Independent Test

Create a pass, press **Copy verify link**, and check the clipboard and the confirmation.

#### Technical Context

The verify URL is built from `window.location.origin`, never a fixed host (R-3). Format: `<origin><path>#/verify?p=<token>`.

#### Acceptance Criteria

- **AC-1:** Given a pass was created, when I press **Copy verify link**, then the link is on my clipboard and I see a confirmation.
- **AC-2:** Given the app is served from any origin, when the link is built, then it starts with the current origin, not a fixed host.

#### Edge Cases

- **Not stated:** The sources list no further edge cases.

#### Design/UX References

- **Journey:** J-1
- **IA page:** PG-1
- **UI Design Prompt:** Not drafted yet.

#### Dependencies

- US-1: a pass must exist to build a link.

#### Out of Scope

- Not stated.

#### Test Plan

- **Unit:** AC-2
- **Integration:** AC-1
- **E2E (if applicable):** Not stated.

---

## F-3: Guard verifies a pass from the QR link

No stories yet. To be specced as GitHub issues, in the three-story split planned in `.athanor/context/business/features.md` (F-3).

---

## F-4: Entry log view and export

### US-5: See the log

- **Priority:** P1
- **Serves:** G-4 (via F-4)
- **Personas:** P-3
- **Journeys:** J-3

#### Why This Priority

The administrator must see entries before exporting them (US-6).

#### Story Statement

- **As a** P-3 Marissa (administrator),
- **I want** to see entries,
- **so that** I know who came in.

#### Independent Test

Open `#/log` with no entries, then with stored entries, and check what is shown.

#### Technical Context

Entries are stored on one device only (E-5 Entry log, `.athanor/context/engineering/data-model.md`). Empty state text is "No entries yet" (R-4).

#### Acceptance Criteria

- **AC-1:** Given no entries are stored, when I open `#/log`, then I see "No entries yet".
- **AC-2:** Given entries are stored, when I open `#/log`, then I see them listed.

#### Edge Cases

- **The log shows only this device:** Entries written on other devices are not visible.

#### Design/UX References

- **Journey:** J-3
- **IA page:** PG-2
- **UI Design Prompt:** Not drafted yet.

#### Dependencies

- No dependencies. Entries are written by F-3, which is not built.

#### Out of Scope

- Writing entries (F-3).

#### Test Plan

- **Unit:** Not stated.
- **Integration:** AC-1, AC-2
- **E2E (if applicable):** Not stated.

---

### US-6: Export the log

- **Priority:** P2
- **Serves:** G-4 (via F-4)
- **Personas:** P-3
- **Journeys:** J-3

#### Why This Priority

Marissa wants a monthly report in a spreadsheet, but needs the log view (US-5) first.

#### Story Statement

- **As a** P-3 Marissa (administrator),
- **I want** to export the log as CSV,
- **so that** I can open it in a spreadsheet.

#### Independent Test

Open `#/log` with and without entries and check the **Export CSV** button.

#### Technical Context

**Export CSV** is disabled when the log is empty (R-4). Entity: E-5 Entry log.

#### Acceptance Criteria

- **AC-1:** Given entries exist, when I press **Export CSV**, then a CSV file downloads.
- **AC-2:** Given no entries exist, when I look at **Export CSV**, then it is disabled.

#### Edge Cases

- **Not stated:** The sources list no further edge cases.

#### Design/UX References

- **Journey:** J-3
- **IA page:** PG-2
- **UI Design Prompt:** Not drafted yet.

#### Dependencies

- No dependencies

#### Out of Scope

- Not stated.

#### Test Plan

- **Unit:** Not stated.
- **Integration:** AC-1, AC-2
- **E2E (if applicable):** Not stated.

---

## F-5: Blocklist data

### US-7: Keep a blocklist

- **Priority:** P1
- **Serves:** G-3 (via F-5)
- **Personas:** P-3
- **Journeys:** J-4

#### Why This Priority

The blocklist must exist before any check can use it (US-8).

#### Story Statement

- **As a** P-3 Marissa (administrator),
- **I want** a list of blocked aliases in the code,
- **so that** the board can ban people.

#### Independent Test

Read `src/data/blocklist.ts` and check its contents.

#### Technical Context

The list lives in `src/data/blocklist.ts` and changes with a deploy (E-3 Blocklist; assumption in `.athanor/context/engineering/prd.md`).

#### Acceptance Criteria

- **AC-1:** Given the blocklist file, when I read it, then it contains fake demo aliases only.

#### Edge Cases

- **Not stated:** The sources list no edge cases.

#### Design/UX References

- **Journey:** J-4
- **IA page:** Not applicable. No screen uses the blocklist yet.
- **UI Design Prompt:** Not drafted yet.

#### Dependencies

- No dependencies

#### Out of Scope

- Using the blocklist on any screen (F-3).

#### Test Plan

- **Unit:** AC-1
- **Integration:** Not stated.
- **E2E (if applicable):** Not stated.

---

### US-8: Check an alias

- **Priority:** P1
- **Serves:** G-3 (via F-5)
- **Personas:** P-3
- **Journeys:** J-2, J-4

#### Why This Priority

Screens need one function to ask whether an alias is blocked; F-3 will rely on it.

#### Story Statement

- **As the system** (acting for P-3 Marissa's blocklist),
- **I want** an `isBlocked` function,
- **so that** screens can ask if an alias is blocked.

#### Independent Test

Call `isBlocked` with an alias that is in the list and one that is not.

#### Technical Context

Blocklist matching is by visitor alias, because aliases are all that is stored (assumption in `.athanor/context/engineering/prd.md`). Entity: E-3 Blocklist. Pure function; time is not involved.

#### Acceptance Criteria

- **AC-1:** Given an alias that is in the list, when I call `isBlocked`, then it returns true.
- **AC-2:** Given an alias that is not in the list, when I call `isBlocked`, then it returns false.

#### Edge Cases

- **Not stated:** The sources list no edge cases.

#### Design/UX References

- **Journey:** J-2, J-4
- **IA page:** Not applicable. No screen uses the blocklist yet.
- **UI Design Prompt:** Not drafted yet.

#### Dependencies

- US-7: the list must exist.

#### Out of Scope

- Using `isBlocked` in the verification policy (F-3).

#### Test Plan

- **Unit:** AC-1, AC-2
- **Integration:** Not stated.
- **E2E (if applicable):** Not stated.
