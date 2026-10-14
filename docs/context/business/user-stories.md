---
title: User stories
status: Approved
owner: Product owner (Residencial Los Pinos board liaison)
last_updated: 2026-10-14
---

# User stories

Stories exist for built features F-01, F-02, F-04 and F-05 only.

## F-01 Resident creates pass

### US-01.1 Create a pass
As a resident, I want to create a pass for my visitor, so that the visitor can enter.

- **Given** I am on the resident form, **when** I choose a unit, type an alias, pick a type and valid dates and submit, **then** a signed pass is created.
- **Given** the alias is shorter than 2 or longer than 24 characters after trimming, **when** I submit, **then** I see an error next to the alias field and no pass is created.
- **Given** the end date is before the start date, **when** I submit, **then** I see an error and no pass is created.

### US-01.2 Choose the pass type
As a resident, I want one-time and date-range passes, so that I can fit a delivery or a weekend visit.

- **Given** the form, **when** I open the pass type field, **then** I can choose `one-time` or `date-range`.

## F-02 QR code and shareable link

### US-02.1 See a QR code
As a resident, I want to see a QR code for my pass, so that my visitor can show it at the gate.

- **Given** a pass was created, **when** the result appears, **then** I see a QR code with a text alternative.

### US-02.2 Copy a link
As a resident, I want to copy a verify link, so that I can send it by WhatsApp.

- **Given** a pass was created, **when** I press **Copy verify link**, **then** the link is on my clipboard and I see a confirmation.
- **Given** the app is served from any origin, **when** the link is built, **then** it starts with the current origin, not a fixed host.

## F-04 Entry log view and export

### US-04.1 See the log
As an administrator, I want to see entries, so that I know who came in.

- **Given** no entries are stored, **when** I open `#/log`, **then** I see "No entries yet".
- **Given** entries are stored, **when** I open `#/log`, **then** I see them listed.

### US-04.2 Export the log
As an administrator, I want to export the log as CSV, so that I can open it in a spreadsheet.

- **Given** entries exist, **when** I press **Export CSV**, **then** a CSV file downloads.
- **Given** no entries exist, **when** I look at **Export CSV**, **then** it is disabled.

## F-05 Blocklist data

### US-05.1 Keep a blocklist
As an administrator, I want a list of blocked aliases in the code, so that the board can ban people.

- **Given** the blocklist file, **when** I read it, **then** it contains fake demo aliases only.

### US-05.2 Check an alias
As the system, I want an `isBlocked` function, so that screens can ask if an alias is blocked.

- **Given** an alias that is in the list, **when** I call `isBlocked`, **then** it returns true.
- **Given** an alias that is not in the list, **when** I call `isBlocked`, **then** it returns false.

## F-03 Guard verifies a pass from the QR link

To be specced as GitHub issues.
