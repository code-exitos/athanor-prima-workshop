---
Status: Approved
---

# UI Design Prompt

## UIP-1: Building Access screens

- **Related journey(s):** J-1, J-2, J-3
- **Related story/stories:** US-1, US-2, US-3, US-4
- **Related IA pages:** PG-1, PG-2, PG-3

## Sourced Constraints

- **Brand personality / tone:** Calm, clear, short. Plain English. Say what happened and what to do (`.athanor/context/design/brand-guidelines.md`).
- **Component principles:** CP-1, CP-2, CP-3, CP-4, CP-5
- **Visual direction:** Colours `#0B4F9C` primary, `#0B6B2E` granted, `#B3261E` denied, white surface, `#1A1A1A` text. System font stack, base 1rem. Calm, plain look.
- **Accessibility rules:** WCAG 2.1 AA contrast. Results never rely on colour alone. Tap targets at least 44px. Result text at least 2rem.
- **Navigation rules relevant to these screens:** A header "Contoso HQ · Visitor access" with **New pass** and **Entry log**. The verify page has no navigation (`.athanor/context/design/information-architecture.md`).

## Screens to Generate

### PG-1: New visitor pass

- **States needed:** Default, Error, Success

### PG-2: Entry log

- **States needed:** Default, Empty

### PG-3: Verify

- **States needed:** Default (granted), Error (denied)

## Reference / Inspiration

- Not stated in discovery.

## Negative Prompt

- No real names. Use fake visitor names only.
- Do not rely on colour alone to show a result.
- Do not show link text or a copy button for the QR code.
- Do not invent navigation that is not in the IA.
- Do not add sign-in or accounts.

---

## The Prompt

```text
You are generating three screens for "Building Access", a web app for Contoso HQ, a corporate campus with four buildings. An administrator creates visitor passes as QR codes. A lobby guard scans the QR code with a phone camera and sees a full-screen result.

Brand: calm, clear, short. Tone: plain English, no jargon. Say what happened and what to do.

Design constraints:
- CP-1: Results never rely on colour alone. Show text (ACCESS GRANTED or ACCESS DENIED), an icon (check mark or cross), and colour.
- CP-2: Tap targets at least 44px.
- CP-3: Result text at least 2rem, very large and readable at a glance on a phone. Some guards have poor eyesight.
- CP-4: Every form field has a visible label and a text error message next to the field.
- CP-5: Every image has a text alternative. The QR code has a text alternative that says what it is.
- Colours: #0B4F9C primary, #0B6B2E granted, #B3261E denied, white surface, #1A1A1A text. System font stack.
- Accessibility: WCAG AA contrast.

Generate these screens, each with its full set of interaction states:
1. PG-1 New visitor pass (#/), the administrator screen on a laptop. Header bar "Contoso HQ · Visitor access" with links "New pass" and "Entry log". A form with: a building select (Main Tower, East Wing, West Wing, Annex), a visitor name text field, a "Valid from" field, a "Valid until" field, and a large "Generate QR code" button. Error messages appear in text next to the field. After success, show ONLY the QR code, with a text alternative, and the note "In a full version, this QR code could be sent to the visitor by email." Do not show the link as text. Do not show a copy button.
2. PG-2 Entry log (#/log): same header. A simple table (time, result, reason, pass id, building, visitor name) and an "Export CSV" button that is disabled when the table is empty. Show "No entries yet" when empty.
3. PG-3 Verification result (?p=<token>), the guard screen on a company phone. The guard scans the QR code with the phone camera, and the link opens this page. No header and no navigation. A full-screen panel. Green with a check icon and the text ACCESS GRANTED, or red with a cross icon and the text ACCESS DENIED, plus one line with the reason. All result text is at least 2rem. Granted also shows the building and the visitor name. Denied shows the reason only. The reason texts are fixed: "Pass is valid", "No valid pass in this link", "Pass is not authentic", "Visitor is blocked", "Pass is not valid yet", "Pass has expired" (`.athanor/context/engineering/prd.md`, R-6).

For each screen, specify:
- Component breakdown and layout
- Responsive behavior (mobile, tablet, desktop breakpoints)
- Exact copy for all visible text (labels, empty states, error messages)
- Data shown and its source (Pass E-1, Token E-2, Entry log E-4)

Do NOT: use real names (use fake visitor names only), rely on colour alone to show a result, show link text or a copy button, add sign-in, or invent navigation not described above.

Output format: not stated; assume static HTML/CSS and TypeScript, to match the static-file hosting in the tech stack document.
```

## Generation Output

Not generated yet.

## Implementation Notes

- **References for engineering/QA:** `.athanor/context/design/brand-guidelines.md`, `.athanor/context/design/information-architecture.md`, `.athanor/context/engineering/data-model.md`.
- **Constraints inherited from brand/IA not fully captured by the prompt:** Keyboard use and zoom up to 200% (brand guidelines). Until F-3 is built, the verify page shows the placeholder "Verification is not implemented yet" (information architecture).
