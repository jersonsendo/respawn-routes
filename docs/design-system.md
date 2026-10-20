# Respawn Routes — Figma Handoff

This document is a design handoff for recreating the implemented application in Figma. It is not a published Figma file or prototype link.

## Product summary

Respawn Routes helps travelers explore Cebu destinations, discover activities, compare planning estimates, save favorites, and build an itinerary. Camping information must show its verification state. Do not imply that access, permits, facilities, or fees are confirmed unless an authoritative source and review date are recorded.

## Figma file setup

- Create pages: `00 Cover`, `01 Foundations`, `02 Components`, and `03 Application Screens`.
- Use desktop frames at 1440 px wide and mobile frames at 390 px wide.
- Use an 8 px spacing grid and a centered content area no wider than 1152 px.
- Create default, hover, focus, selected, disabled, and empty variants where applicable.
- Prototype navigation between Home, Explore, destination details, Escape Finder, Experiences, Planner, Favorites, Dashboard, and About.

## Foundations

| Token | Value | Use |
|---|---|---|
| Ink | `#0F2A3D` | Headings, primary text, footer |
| Teal | `#0E7C86` | Primary actions, links, selected controls |
| Teal soft | `#DFF1F2` | Match explanations and supporting surfaces |
| Mist | `#F4F7F6` | Application background |
| Sun | `#F28C28` | High-emphasis accent action |
| White | `#FFFFFF` | Cards and form surfaces |
| Body font | Instrument Sans | Paragraphs, labels, navigation |
| Display font | Bricolage Grotesque | Headings and brand |

Typography: H1 48/32 px desktop/mobile, H2 30/24 px, H3 18 px, body 16 px, supporting text 14 px. Use 16 px card corners and 12 px form and button corners.

## Reusable components

- **Navigation:** desktop route links; mobile menu button, expanded menu, active-route state, and keyboard focus.
- **Buttons:** teal primary, orange accent, outline, and destructive variants, each with hover and focus states.
- **Fields:** labeled search inputs and selects with a visible focus state.
- **Choice pill:** radio group with unselected and selected states.
- **Destination card:** photo or fallback, category, title, location, summary, estimated budget, duration, favorite action, details action, optional match reasons.
- **Experience card:** category, title, summary, linked destination, interests, estimate, duration, add-to-itinerary action.
- **Feedback:** empty state, accessible toast, and camping verification notice.
- **Camping verification notice:** status badge, note, source name/link, and last-reviewed date. With no source, show `Not verified`, `No source recorded`, and `Not yet verified`.
- **Planner summary:** item count, estimated total cost, estimated duration, download action, and clear action.

## Application frames

Create desktop and mobile frames for each screen:

1. **Home** — photo-led hero, destination search, Escape Finder call-to-action, three featured destinations including Osmeña Peak, category links, experience-category links.
2. **Explore** — title, search/category/budget/sort controls, results count, three-column desktop grid, and empty state. Stack controls on mobile.
3. **Destination details** — image and summary, budget and duration, favorite/planner actions, activities and tips. Show the camping verification panel on Osmeña Peak.
4. **Escape Finder** — mood, time, budget, and setting choices; submit/reset actions; result cards with match explanations; empty and no-preference states.
5. **Experiences** — search, category selector, category sections, responsive activity cards.
6. **Trip Planner** — itinerary list and summary sidebar on desktop; stacked layout on mobile; empty state; download and clear actions.
7. **Favorites** — saved destination grid and empty state.
8. **Dashboard** — favorite, itinerary, and budget statistics; preference summary; suggested destination.
9. **About** — product summary, features, intended users, limitations, Escape Finder call-to-action.

## Interaction and content rules

- Preserve actual labels, categories, routes, and content from the application.
- Keep costs visibly labeled as estimates.
- Do not design a booking confirmation, confirmed campsite, live price, or availability state; those services are not connected.
- Camping must appear unverified until an authoritative source, source URL, and review date have been recorded.
- Ensure controls have visible focus states, labels, and sufficient contrast. Do not rely on color alone to communicate verification status.
- On mobile, stack content in reading order and avoid horizontal scrolling.

## Handoff checklist

- [ ] Add desktop and mobile frames for all nine screens.
- [ ] Create component variants for interactive and empty states.
- [ ] Add prototype links for primary navigation and calls to action.
- [ ] Review the camping verification notice and estimate disclaimers.
- [ ] Review the 390 px mobile layout and keyboard-focus states.
- [ ] Share the Figma view link with the project owner before adding it to the README.
