---
title: Brand guidelines
status: Approved
owner: Product owner (Tartan Fields board liaison)
last_updated: 2026-10-14
---

# Brand guidelines

## Tone

Calm, clear, short. Plain English. No jargon. Say what happened and what to do.

## Colour tokens

| Token | Hex | Use | Contrast on white |
| --- | --- | --- | --- |
| `--text` | `#1A1A1A` | Body text | about 17:1 |
| `--muted` | `#595959` | Secondary text | about 7:1 |
| `--primary` | `#0B4F9C` | Buttons, links | about 8:1 |
| `--granted` | `#0B6B2E` | Access granted background (white text) | about 6.6:1 |
| `--denied` | `#B3261E` | Access denied background (white text) | about 6.5:1 |
| `--surface` | `#FFFFFF` | Page background | n/a |

## Accessibility rules (required)

- **Results never rely on colour alone.** A granted or denied result always shows text (**ACCESS GRANTED** or **ACCESS DENIED**) and an icon (a check mark or a cross), as well as colour.
- **All text and controls meet WCAG 2.1 AA contrast:** 4.5:1 for normal text, 3:1 for large text and interface parts.
- Tap targets are at least 44 by 44 CSS pixels.
- Result text is at least 2rem. Guards read it on small phones at night.
- Every image has a text alternative. The QR code has a text alternative that says what it is.
- Every form field has a visible label and an error message in text.
- The page is usable with a keyboard and zoom up to 200%.

## Typography

System font stack. Base size 1rem (16px). Line height 1.5.

## Icons

Simple inline shapes: check mark for granted, cross for denied. They are decorative when text is present, and are hidden from screen readers.
