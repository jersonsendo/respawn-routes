# Oral Exam Guide

## 30-second pitch
"Respawn Routes is a tourism app for people with limited time and money. You pick your mood, time, budget and setting, and it filters local Cebu destinations to match. It is built with React, Vite, Tailwind, React Router and Hooks, with no backend."

## Key files to know
`src/models/*` (classes) · `src/data/*` (records) · `src/context/AppContext.jsx` (state) · `src/pages/EscapeFinder.jsx` (signature feature) · `src/App.jsx` (routes).

## The 5 classes
- **Destination** – a place (name, category, budget, duration, tips). Has `matchesSearch()`.
- **Experience** – an activity; `destinationId` links it to a Destination.
- **ItineraryItem** – a planner row made from a Destination or Experience; its `id` blocks duplicates.
- **UserPreferences** – the Escape Finder choices; `matchesDestination()` decides if a place fits.
- **TravelPlan** – holds ItineraryItems and totals them.
Relationships: Experience → Destination (many-to-one), TravelPlan contains many ItineraryItems (composition), UserPreferences uses Destination for matching, ItineraryItem is created from a Destination or Experience.

## Dynamic data
Data files export `new Destination({...})` objects. Pages import them and use `.map()` to draw cards. No destination text is typed inside components.

## Routing
`BrowserRouter` wraps the app; `<Routes>` in App.jsx maps paths to pages; `/destinations/:id` uses `useParams()` and `getDestinationById()`; unknown IDs show a "not found" state; `*` shows a 404 page.

## Filtering
`destinations.filter(search).filter(category).filter(budget).sort(...)`. Each `.filter()` returns a new array.

## Escape Finder logic
On submit, a `UserPreferences` object is created. A destination is kept if: cost ≤ chosen budget limit, duration ≤ time limit, category = setting, and it shares at least one interest with the mood. Results are sorted by shared interests, and `explain()` builds the reason text. Blank = no preference. Not AI.

## State management
`useState` for forms; Context shares favorites, itinerary and preferences across pages; `useEffect` saves to localStorage; `useMemo` rebuilds the `TravelPlan` from saved items.

## Budget calculation
`TravelPlan.recalculate()` uses `reduce()` to add up `estimatedCost` and `duration`. Totals are never typed by hand.

## Likely questions
- *Why classes?* They keep data and its helper methods together and show OOP (encapsulation).
- *Why Context?* Many pages need the same favorites and itinerary, so it avoids passing props through every level.
- *Why store durations in hours?* So totals can be added as numbers.
- *Limits?* Estimates only, sample data entries, photos must be added, no real bookings.
