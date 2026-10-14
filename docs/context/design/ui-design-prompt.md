---
title: UI design prompt
status: Approved
owner: Product owner (Tartan Fields board liaison)
last_updated: 2026-10-14
---

# UI design prompt

Use this prompt with a design tool to explore screens. Follow `brand-guidelines.md`.

> Design a mobile-first web app called "Neighborhood Access" for a gated community. Three screens.
>
> 1. **New pass** (`#/`): a short form with a unit select, a visitor alias text field, a pass type choice (one-time or date-range), start and end date-time fields and a large **Create pass** button. After submit, show a QR code, the link as text, and a **Copy verify link** button.
> 2. **Entry log** (`#/log`): a simple table (time, result, reason, unit, alias) and an **Export CSV** button. Show "No entries yet" when empty.
> 3. **Verification result** (`#/verify`): a full-screen panel. Green with a check icon and the text ACCESS GRANTED, or red with a cross icon and the text ACCESS DENIED, plus one line with the reason. Text is very large and readable on a cracked phone screen at night.
>
> Rules: a calm, plain look. Colours `#0B4F9C` primary, `#0B6B2E` granted, `#B3261E` denied, white surface, `#1A1A1A` text. WCAG AA contrast. Results never rely on colour alone. Tap targets at least 44px. No real names; show only aliases like "Uncle Bob" or "JR".
