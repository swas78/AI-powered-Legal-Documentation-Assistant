# DESIGN.md: Nyay Saathi (Mobile App)

> **Draft note:** I could not open the reference image (Pinterest blocks automated access). This file is based only on its description ("an app with buttons and lights on it") and the needs of our app. Upload the image or a screenshot and I will match the colours, shapes and layout to it exactly.

## 1. Design idea
A calm, trustworthy app with **big, tactile buttons** and **status lights**. Legal work feels scary, so the app should feel like a simple control panel: press a button, see a light change, know where you are.

- **Buttons** are large, rounded and clearly pressable.
- **Lights** are small coloured dots that show status: ready, needs attention, problem.
- Plain words, lots of space, one action per screen.

## 2. Colours
| Token | Use | Value |
|---|---|---|
| `bg` | Screen background | `#F2F5F4` |
| `surface` | Cards | `#FFFFFF` |
| `ink` | Main text | `#16231F` |
| `muted` | Helper text | `#5B6B66` |
| `primary` | Main buttons | `#0E5A4F` |
| `on-primary` | Text on primary | `#FFFFFF` |
| `light-green` | OK / complete | `#2E9E5B` |
| `light-amber` | Check this / warning | `#E0A100` |
| `light-red` | Problem / missing | `#D1433A` |
| `highlight` | Blank to fill | `#FFE9A8` |

Dark mode: swap `bg` to `#0F1715`, `surface` to `#17221F`, `ink` to `#E8F0ED`, `primary` to `#5CC7B3`.

Colour is never the only signal. Every light also has an icon or a word.

## 3. Type
- Headings: Noto Serif Bold (feels like a document)
- Body and buttons: Hanken Grotesk (Hindi fallback: Noto Sans Devanagari)
- Sizes: 28 title, 20 section, 16 body, 13 helper
- Minimum body size 16 for readability

## 4. Spacing and shape
- Base unit 8 px; screen padding 20 px
- Card radius 14 px; button radius 12 px
- Minimum touch target 48 x 48 px

## 5. Components
**Primary button:** full width, height 56, `primary` fill, bold white text, slightly darker on press and a small shadow that flattens when pressed.

**Secondary button:** same size, outlined in `primary`.

**Toggle (Plain / Legal):** two-segment switch at the top of the Draft screen; active side filled.

**Status light:** 12 px dot with a soft glow.
- Green: step complete
- Amber: warning ("Lease over 11 months needs registration")
- Red: required field missing

**Progress strip (Form):** row of small lights, one per question, lit as answered.

**Document card (Home):** icon, title, one-line description, light showing if a draft is saved.

**Warning card:** amber left border, one sentence on the problem, one sentence on the fix.

**Blank field highlight:** `highlight` background inside the draft text.

## 6. Screens
1. **Home:** title, language switch, three large document cards, "Free legal help" link at the bottom.
2. **Form:** one question per screen, progress lights at the top, big input, Next button pinned at the bottom.
3. **Draft:** Plain / Legal toggle, clause list with numbered headings, warning cards, blanks highlighted.
4. **Share:** three big buttons: Save PDF, WhatsApp, Print.
5. **Help:** call a lawyer, open DLSA free legal aid, short disclaimer.

## 7. Motion and feedback
- Button press: 100 ms scale to 0.97
- Light turning on: 200 ms fade
- Light haptic tap on important actions (Android and iOS)
- Respect "reduce motion" system setting

## 8. Accessibility
- Contrast at least 4.5:1 for text
- Labels for every input and light (for screen readers)
- Works with large system font sizes
- Hindi and English text both tested

## 9. Tone of words
Short and friendly. Say "The tenant pays" and not "The Lessee shall". Never scare the user; every warning says what to do next.

## 10. Disclaimer line (every draft)
"This is a draft to help you, not legal advice."