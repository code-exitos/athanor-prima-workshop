---
Status: Approved
---

# UI Design Prompt

## UIP-1: Neighborhood Access screens

- **Related journey(s):** J-1, J-2, J-3
- **Related story/stories:** US-1, US-2, US-3, US-4, US-5, US-6
- **Related IA pages:** PG-1, PG-2, PG-3

## Sourced Constraints

- **Brand personality / tone:** Calm, clear, short. Plain English. Say what happened and what to do (`.athanor/context/design/brand-guidelines.md`).
- **Component principles:** CP-1, CP-2, CP-3, CP-4, CP-5
- **Visual direction:** Colours `#0B4F9C` primary, `#0B6B2E` granted, `#B3261E` denied, white surface, `#1A1A1A` text. System font stack, base 1rem. Calm, plain look.
- **Accessibility rules:** WCAG 2.1 AA contrast. Results never rely on colour alone. Tap targets at least 44px. Result text at least 2rem.
- **Navigation rules relevant to these screens:** A header with **New pass** and **Entry log**. The verify route has no navigation (`.athanor/context/design/information-architecture.md`).

## Screens to Generate

### PG-1: Resident form

- **States needed:** Default, Loading, Error, Success

### PG-2: Entry log

- **States needed:** Default, Empty, Error

### PG-3: Verify

- **States needed:** Default (granted), Error (denied)

## Reference / Inspiration

- Not stated in discovery.

## Negative Prompt

- No real names. Show only aliases like "Uncle Bob" or "JR".
- Do not rely on colour alone to show a result.
- Do not invent navigation that is not in the IA.

---

## The Prompt

```text
You are generating three screens for "Neighborhood Access", a mobile-first web app for a gated community.

Brand: calm, clear, short. Tone: plain English, no jargon. Say what happened and what to do.

Design constraints:
- CP-1: Results never rely on colour alone. Show text (ACCESS GRANTED or ACCESS DENIED), an icon (check mark or cross), and colour.
- CP-2: Tap targets at least 44px.
- CP-3: Result text at least 2rem, very large and readable on a cracked phone screen at night.
- CP-4: Every form field has a visible label and a text error message.
- CP-5: Every image has a text alternative.
- Colours: #0B4F9C primary, #0B6B2E granted, #B3261E denied, white surface, #1A1A1A text. System font stack.
- Accessibility: WCAG AA contrast.

Generate these screens, each with its full set of interaction states:
1. PG-1 New pass (#/): a short form with a unit select, a visitor alias text field, a pass type choice (one-time or date-range), start and end date-time fields and a large "Create pass" button. After submit, show the QR code and a "Copy verify link" button. Do not show the link as text.
2. PG-2 Entry log (#/log): a simple table (time, result, reason, unit, alias) and an "Export CSV" button. Show "No entries yet" when empty.
3. PG-3 Verification result (?p=<token>): a full-screen panel. Green with a check icon and the text ACCESS GRANTED, or red with a cross icon and the text ACCESS DENIED, plus one line with the reason. Granted also shows the unit and the visitor alias, and for a one-time pass the line "One-time pass. It cannot be used again." Denied shows the reason only. The reason texts are fixed (`.athanor/context/engineering/prd.md`, R-6).

For each screen, specify:
- Component breakdown and layout
- Responsive behavior (mobile, tablet, desktop breakpoints)
- Exact copy for all visible text (labels, empty states, error messages)
- Data shown and its source (Pass E-1, Token E-2, Entry log E-5)

Do NOT: use real names (show only aliases like "Uncle Bob" or "JR"), rely on colour alone to show a result, or invent navigation not described above.

Output format: not stated; assume static HTML/CSS and TypeScript, to match the static-file hosting in the tech stack document.
```

## Generation Output

Not generated yet.

## Implementation Notes

- **References for engineering/QA:** `.athanor/context/design/brand-guidelines.md`, `.athanor/context/design/information-architecture.md`, `.athanor/context/engineering/data-model.md`.
- **Constraints inherited from brand/IA not fully captured by the prompt:** Keyboard use and zoom up to 200% (brand guidelines). Today the verify page shows the placeholder "Verification is not implemented yet" (information architecture).
