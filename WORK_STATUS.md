# Work Status

## Current State
Project scaffolded and live with design system integrated. No feature screens built yet — waiting on Figma designs and interview task definition.

## Live URL
https://tyler-aston-mutual.github.io/events-groups/

## Screens
| Screen | Status | Notes |
|--------|--------|-------|
| Home | Placeholder | Just a heading, no real content |

## Design System
Integrated from `Design System - Web (React)/` into `src/design-system/`.

**Theme:** Mutual Light (`brandPrimary: #000080`, font: Goldman Sans)

**Available components** (import from `'../design-system'`):
- `ThemedButton` / `PrimaryButton` / `SecondaryButton` / `OutlineButton` / `TextButton`
- `ThemedText` / `Heading1–4` / `BodyText` / `SecondaryTitle`
- `Chip` / `ChipStack`
- `Banner`
- `ThemedDialog`

**Available hooks:**
- `useTheme()` — access `colors`, `semantic`, `brand`

**Rule:** Always check `src/design-system/components/` and tokens before creating anything new.

## Decisions Made
- **HashRouter** over BrowserRouter — GitHub Pages has no server-side routing, hash-based URLs work without config
- **Tailwind v3** — kept alongside design system; used for screen-level layout, design system handles all UI components
- **Hardcoded data** — no backend needed, all content will be faked for interviews
- **`max-w-sm mx-auto`** on root — constrains layout to phone width even if opened on desktop
- **TypeScript added** — design system is .tsx; tsconfig.json added, project is now mixed JS/TS

## What's Fake vs Real
- Everything is fake at this stage

## Next Up
- Share Figma designs
- Define interview tasks / flows to prototype
- Build first screen
