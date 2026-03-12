# Circles Tab — Prototype

## What We're Building
A new tab called **Circles** for an existing mobile app. The tab lets members find and publish opportunities to meet other members in person.

This is a **research prototype** used in user interviews. The goal is to learn what's needed for a first release — specifically, what would give people:
1. The desire to visit the tab
2. The desire to engage with content already there
3. The desire to create their own opportunity

## Prototype Principles
- **Speed over perfection.** We're building to learn, not to ship.
- **Fake data is fine.** Hardcoded content is preferred over real backends.
- **Consistency matters.** Visual and interaction consistency is important for research validity — participants should feel like they're using a real, coherent app.
- **Mobile-first.** Designed for phone. Should feel native.
- **Minimal scope.** Only build what's needed to support the interview tasks.

## Tech Stack
| | |
|---|---|
| Framework | React 18 + Vite 5 |
| Routing | React Router v6 (`HashRouter` — required for GitHub Pages) |
| Styling | Tailwind CSS v3 |
| Hosting | GitHub Pages |
| Deploy | GitHub Actions (auto-deploys on push to `main`) |

**Live URL:** https://tyler-aston-mutual.github.io/events-groups/

**Local dev note:** Node 20 is keg-only. Prefix npm commands with:
`PATH="/opt/homebrew/opt/node@20/bin:$PATH"`

## File Structure
```
src/
  screens/     # One file per screen/view
  components/  # Shared UI components
  data/        # Hardcoded mock data
  assets/      # Icons, images
```

## Design System Rule
Before creating any new UI — colors, text styles, spacing, buttons, cards, etc. — always check:
1. `tailwind.config.js` for existing tokens
2. `src/components/` for existing components

If a new component seems warranted, flag it to the user before building it. Don't create new things when existing ones can be reused or extended.

## Work Status
Maintain `WORK_STATUS.md` in the project root. Update it at the start and end of every working session. Include:
- What screens exist and their state (built / placeholder / wired up)
- Key decisions made and why
- What's fake vs real
- Anything useful for picking up mid-stream

## Planning
Use plan mode for any task that involves 3+ steps or an architectural decision. If something goes sideways mid-task, stop and re-plan rather than pushing through.
