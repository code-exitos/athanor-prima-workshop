---
Status: Approved
---

# Brand Guidelines

## Brand Personality

- **We are:** Calm, clear, short. In practice: plain English, no jargon, and every message says what happened and what to do. For the guard, the answer is big and obvious. The product is called Building Access, and its header reads "Contoso HQ · Visitor access".
- **We are not:** Not stated in discovery.

## Tone of Voice

### Rule: Say what happened and what to do

- **Do:** Use plain English and short sentences. Say what happened and what to do.
- **Example:** "No entries yet". On the guard's screen: "Pass has expired".
- **Do not:** Use jargon.
- **Example:** Not stated in discovery.

## Visual Direction

- **Color:** Tokens below. Granted and denied fill the whole guard screen, with white text.

  | Token | Hex | Use | Contrast on white |
  | --- | --- | --- | --- |
  | `--text` | `#1A1A1A` | Body text | about 17:1 |
  | `--muted` | `#595959` | Secondary text | about 7:1 |
  | `--primary` | `#0B4F9C` | Buttons, links | about 8:1 |
  | `--granted` | `#0B6B2E` | Access granted background (white text) | about 6.6:1 |
  | `--denied` | `#B3261E` | Access denied background (white text) | about 6.5:1 |
  | `--surface` | `#FFFFFF` | Page background | n/a |

- **Typography:** System font stack. Base size 1rem (16px). Line height 1.5. Result text is at least 2rem.
- **Spacing/density:** Not stated in discovery.
- **Imagery/iconography:** Simple inline shapes: a check mark for granted, a cross for denied. They are decorative when text is present, and are hidden from screen readers. Every image has a text alternative. The QR code on the administrator screen has a text alternative that says what it is.

## Component Principles

- **CP-1:** On the guard's screen, results never rely on colour alone. A granted or denied result always shows text (**ACCESS GRANTED** or **ACCESS DENIED**) and an icon (a check mark or a cross), as well as colour.
- **CP-2:** Tap targets are at least 44 by 44 CSS pixels.
- **CP-3:** Result text is at least 2rem, so a guard can read it at a glance on a company phone. Some guards have poor eyesight (`.athanor/docs/discovery/constraints.md`).
- **CP-4:** Every form field on the administrator screen has a visible label and an error message in text, next to the field.
- **CP-5:** Every image has a text alternative. The QR code has a text alternative that says what it is.

## Accessibility Rules

- **Contrast requirements:** All text and controls meet WCAG 2.1 AA contrast: 4.5:1 for normal text, 3:1 for large text and interface parts.
- **Text sizing:** Base size 1rem (16px). Result text is at least 2rem. The page is usable with zoom up to 200%.
- **Motion/animation guidance:** Not stated in discovery.
- **Keyboard:** The page is usable with a keyboard.
