# Work Status

## Current State
Connect tab prototype is functional with a full feed, detail screens, create flow (event + group forms), filtering, and participant profiles. Ready for interview testing.

## Live URL
https://tyler-aston-mutual.github.io/events-groups/

## Screens
| Screen | Status | Notes |
|--------|--------|-------|
| Home (Connect feed) | Built | For You / Joined tabs, Featured First sort, Speed Dating banner, EventCards with photos, create bottom sheet via '+' button, type filter pills (All/Events/Groups), bottom CTA |
| FilterScreen | Built | Distance and participants filters |
| SpeedDating | Built | Detail screen for Virtual Speed Dating feature |
| DetailScreen | Built | Event/group detail with compact card header, About tab, Participants tab (joined items), join-gating, creator profiles |
| CreateScreen | Built | Shared form for events and groups — name, photo upload, date/time (events), location, description, link, group selector (events), display creator toggle, expiration date, tab visibility toggles |

## Key Components
- **EventCard** — card with 100×100 photo (left), title + info rows (right), Featured chip overlay (bottom-left of photo), type icon (top-right)
- **Create bottom sheet** — slide-up sheet from '+' button with "Create an Event" and "Create a Group" options, now wired to navigate to create forms
- **CreateScreen** — single component rendering both event and group forms via `type` prop; events show Date & Time and Add to Group; groups show Events tab toggle
- **DetailScreen header** — compact card layout: 120×120 photo left, title right, type icon top-right, featured chip on photo
- **Participants tab** — 2-column photo grid with search bar, header row, profile cards (name/age/location overlay), footer banner; only visible for joined items
- **Join-gate dialog** — ThemedDialog blocking Participants/Events/Chat tabs for non-joined items

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
- **HashRouter** over BrowserRouter — GitHub Pages has no server-side routing
- **Tailwind v3** — kept alongside design system; used for screen-level layout
- **Hardcoded data** — no backend, all content faked for interviews
- **`max-w-sm mx-auto`** on root — constrains layout to phone width on desktop
- **TypeScript added** — design system is .tsx; project is mixed JS/TS
- **Route state for detail screens** — item data + joined boolean passed via `navigate()` state
- **Compact detail header** — replaced large hero image with card-style layout (photo + title side-by-side)
- **Single CreateScreen** — one component for both event and group forms, two routes (`/create/event`, `/create/group`)
- **Inline form helpers** — FormInput, FormTextarea, ToggleSwitch, ToggleRow all defined locally in CreateScreen (no design system additions)
- **Event wording** — "Interested" instead of "Join" for events; "interested" instead of "going"

## What's Fake vs Real
- **All data is hardcoded** — 11 items in ALL_ITEMS array in Home.jsx
- **Descriptions, creators, dates** — all fake but realistic
- **Photos** — Unsplash URLs
- **Participants tab** — 4 fake profiles with Unsplash portraits, search is non-functional
- **Create forms** — all fields are visual-only, "Create" button doesn't submit
- **Join button** — visible but non-functional (no state change)
- **Tab toggles on create form** — functional switches but don't persist

## Data Shape (each item in ALL_ITEMS)
```
{ id, type ('event'|'group'), title, image, location, going, featured,
  tag, date, description, createdDate, creator: { name, age, image } }
```

## Routes
| Path | Screen |
|------|--------|
| `/` | Home |
| `/speed-dating` | SpeedDating |
| `/filters` | FilterScreen |
| `/detail/:id` | DetailScreen |
| `/create/event` | CreateScreen (event) |
| `/create/group` | CreateScreen (group) |
