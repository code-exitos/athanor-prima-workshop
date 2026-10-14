---
Status: Approved
---

# User Stories

Stories exist for built features F-1, F-2, F-4 and F-5 only. F-3 has none yet.

## F-1: Administrator creates a pass

### US-1: Create a pass

- **Priority:** P1
- **Serves:** G-1 (via F-1)
- **Personas:** P-1
- **Journeys:** J-1

#### Why This Priority

Without a created pass nothing else in the flow works. It ships first.

#### Story Statement

- **As a** P-1 Marissa (administrator),
- **I want** to create a visitor pass for a building, a visitor name and dates,
- **so that** the visitor can enter without a call to the lobby.

#### Independent Test

Fill in the form on PG-1 and press **Generate QR code**. A signed pass is created without any other story being done.

#### Technical Context

Building is one of four. The visitor name is 2 to 40 characters after trimming. `validUntil` must not be before `validFrom` and must not be in the past (R-1). The pass is signed as a token (R-2). Entities: E-1 Pass, E-2 Token, in `.athanor/context/engineering/data-model.md`. The end date is included (D-1) and `validUntil` equal to `validFrom` is allowed (D-8), in `.athanor/context/engineering/prd.md`.

#### Acceptance Criteria

- **AC-1:** Given I am on the New visitor pass page, when I choose a building, type a visitor name and pick valid dates and submit, then a signed pass is created.
- **AC-2:** Given the visitor name is shorter than 2 or longer than 40 characters after trimming, when I submit, then I see an error next to the name field and no pass is created.
- **AC-3:** Given the end is before the start, when I submit, then I see an error and no pass is created.
- **AC-4:** Given the end is in the past, when I submit, then I see an error and no pass is created.
- **AC-5:** Given no building is chosen, when I submit, then I see an error and no pass is created.

#### Edge Cases

- **Not stated:** The sources list no further edge cases.

#### Design/UX References

- **Journey:** J-1
- **IA page:** PG-1
- **UI Design Prompt:** UIP-1, `.athanor/context/design/ui-design-prompt.md` (administrator screen).

#### Dependencies

- No dependencies

#### Out of Scope

- Showing the QR code (US-2).
- Storing passes. The app does not store passes (D-4).

#### Test Plan

- **Unit:** AC-1, AC-2, AC-3, AC-4, AC-5
- **Integration:** Not stated.
- **E2E (if applicable):** Not stated.

---

## F-2: QR code

### US-2: See the QR code

- **Priority:** P1
- **Serves:** G-1 (via F-2)
- **Personas:** P-1
- **Journeys:** J-1

#### Why This Priority

The QR code is what gets scanned at the lobby. Without it the pass cannot be used.

#### Story Statement

- **As a** P-1 Marissa (administrator),
- **I want** to see a QR code for the pass I created,
- **so that** it can be scanned at the lobby.

#### Independent Test

Create a pass and check that the result shows a QR code with a text alternative and the note about email, and no link text and no copy button.

#### Technical Context

The QR code encodes the verify URL, `<origin><path>?p=<token>`, built from `window.location.origin` (R-3; E-2 Token). There is no link text, no copy button and no typed code (D-3). Page: PG-1, in `.athanor/context/design/information-architecture.md`.

#### Acceptance Criteria

- **AC-1:** Given a pass was created, when the result appears, then I see a QR code with a text alternative.
- **AC-2:** Given a pass was created, when the result appears, then I see the note "In a full version, this QR code could be sent to the visitor by email."
- **AC-3:** Given a pass was created, when the result appears, then there is no link text and no copy button.
- **AC-4:** Given a pass was created, when the QR code is read, then it encodes the verify URL with the signed token.

#### Edge Cases

- **Not stated:** The sources list no edge cases.

#### Design/UX References

- **Journey:** J-1
- **IA page:** PG-1
- **UI Design Prompt:** UIP-1, `.athanor/context/design/ui-design-prompt.md` (administrator screen).

#### Dependencies

- US-1: a pass must exist to show a QR code.

#### Out of Scope

- Sending the QR code to the visitor (NG-2).

#### Test Plan

- **Unit:** AC-4
- **Integration:** AC-1, AC-2, AC-3
- **E2E (if applicable):** Not stated.

---

## F-3: Guard verifies a pass

No stories yet. To be specced as GitHub issues, in the three-story split planned in `.athanor/context/business/features.md` (F-3).

---

## F-4: Entry log view and export

### US-3: See the log

- **Priority:** P1
- **Serves:** G-4 (via F-4)
- **Personas:** P-1
- **Journeys:** J-3

#### Why This Priority

The administrator must see entries before exporting them (US-4).

#### Story Statement

- **As a** P-1 Marissa (administrator),
- **I want** to see the entries,
- **so that** I know who came in and who was refused.

#### Independent Test

Open `#/log` with no entries, then with stored entries, and check what is shown.

#### Technical Context

Entries are stored on one device only (E-4 Entry log, `.athanor/context/engineering/data-model.md`). Empty state text is "No entries yet" (R-4).

#### Acceptance Criteria

- **AC-1:** Given no entries are stored, when I open `#/log`, then I see "No entries yet".
- **AC-2:** Given entries are stored, when I open `#/log`, then I see them listed.

#### Edge Cases

- **The log shows only this device:** Entries written on other devices are not visible.

#### Design/UX References

- **Journey:** J-3
- **IA page:** PG-2
- **UI Design Prompt:** UIP-1, `.athanor/context/design/ui-design-prompt.md` (entry log screen).

#### Dependencies

- No dependencies. Entries are written by F-3, which is not built.

#### Out of Scope

- Writing entries (F-3).

#### Test Plan

- **Unit:** Not stated.
- **Integration:** AC-1, AC-2
- **E2E (if applicable):** Not stated.

---

### US-4: Export the log

- **Priority:** P2
- **Serves:** G-4 (via F-4)
- **Personas:** P-1
- **Journeys:** J-3

#### Why This Priority

Marissa wants a report in a spreadsheet at month end, but needs the log view (US-3) first.

#### Story Statement

- **As a** P-1 Marissa (administrator),
- **I want** to export the log as CSV,
- **so that** I can open it in a spreadsheet.

#### Independent Test

Open `#/log` with and without entries and check the **Export CSV** button.

#### Technical Context

**Export CSV** is disabled when the log is empty (R-4). Entity: E-4 Entry log. CSV columns: `at,result,reason,passId,building,visitorName`.

#### Acceptance Criteria

- **AC-1:** Given entries exist, when I press **Export CSV**, then a CSV file downloads.
- **AC-2:** Given no entries exist, when I look at **Export CSV**, then it is disabled.

#### Edge Cases

- **Not stated:** The sources list no further edge cases.

#### Design/UX References

- **Journey:** J-3
- **IA page:** PG-2
- **UI Design Prompt:** UIP-1, `.athanor/context/design/ui-design-prompt.md` (entry log screen).

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

### US-5: Keep a blocklist

- **Priority:** P1
- **Serves:** G-3 (via F-5)
- **Personas:** P-1
- **Journeys:** J-4

#### Why This Priority

The blocklist must exist before any check can use it (US-6).

#### Story Statement

- **As a** P-1 Marissa (administrator),
- **I want** a list of blocked visitor names in the code,
- **so that** banned people can be stopped.

#### Independent Test

Read `src/data/blocklist.ts` and check its contents.

#### Technical Context

The list lives in `src/data/blocklist.ts` and changes with a deploy (E-3 Blocklist, `.athanor/context/engineering/data-model.md`). Names are fake only.

#### Acceptance Criteria

- **AC-1:** Given the blocklist file, when I read it, then it contains fake demo visitor names only.

#### Edge Cases

- **Not stated:** The sources list no edge cases.

#### Design/UX References

- **Journey:** J-4
- **IA page:** Not applicable. No screen uses the blocklist yet.
- **UI Design Prompt:** None. This story has no screen.

#### Dependencies

- No dependencies

#### Out of Scope

- Using the blocklist on any screen (F-3).

#### Test Plan

- **Unit:** AC-1
- **Integration:** Not stated.
- **E2E (if applicable):** Not stated.

---

### US-6: Check a name

- **Priority:** P1
- **Serves:** G-3 (via F-5)
- **Personas:** P-1
- **Journeys:** J-2, J-4

#### Why This Priority

Screens need one function to ask whether a visitor name is blocked; F-3 will rely on it.

#### Story Statement

- **As the system** (acting for P-1 Marissa's blocklist),
- **I want** an `isBlocked` function,
- **so that** screens can ask if a visitor name is blocked.

#### Independent Test

Call `isBlocked` with a name that is in the list and one that is not.

#### Technical Context

`isBlocked(name)` matches the visitor name exactly and is case-sensitive (D-6 in `.athanor/context/engineering/prd.md`; a known demo limit). Entity: E-3 Blocklist. Pure function; time is not involved.

#### Acceptance Criteria

- **AC-1:** Given a name that is in the list, when I call `isBlocked`, then it returns true.
- **AC-2:** Given a name that is not in the list, when I call `isBlocked`, then it returns false.

#### Edge Cases

- **Not stated:** The sources list no edge cases.

#### Design/UX References

- **Journey:** J-2, J-4
- **IA page:** Not applicable. No screen uses the blocklist yet.
- **UI Design Prompt:** None. This story has no screen.

#### Dependencies

- US-5: the list must exist.

#### Out of Scope

- Using `isBlocked` in the verification policy (F-3).

#### Test Plan

- **Unit:** AC-1, AC-2
- **Integration:** Not stated.
- **E2E (if applicable):** Not stated.
