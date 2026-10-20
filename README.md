# Respawn Routes

*Take a break. Find your next adventure. Respawn refreshed.*

A destination discovery and trip-planning application focused on Cebu, Philippines. Respawn Routes helps travelers explore destinations, compare estimated budgets, find activities that match their interests, and organize a personal itinerary.

## Features
- **Home** `/` – hero, destination search, featured destinations, category shortcuts, Escape Finder button
- **Explore** `/explore` – search, category filter, budget filter, sort by name or budget, empty state
- **Destination Details** `/destinations/:id` – activities, tips, budget, duration, add to itinerary, favorite toggle, invalid-ID handling
- **Escape Finder** `/escape-finder` – mood, time, budget and setting inputs; camping, hiking and nature recommendations with match reasons; reset; empty state
- **Experiences** `/experiences` – activity categories including outdoor adventure, camping, hiking and nature; search and category filter
- **Trip Planner** `/planner` – add/remove items, clear with confirmation, dynamic totals, duplicates blocked, download a text itinerary
- **Favorites** `/favorites`, **Dashboard** `/dashboard`, **About** `/about`
- Responsive navbar with active-route highlight, an Escape-key closable mobile menu, and mobile menu controls announced to assistive technology

## Tech stack
React 18, Vite, JavaScript (ES6+), Tailwind CSS 3, React Router DOM 6, React Hooks and Lucide React.

## Install and run
```bash
npm install
npm run dev      # development server (usually http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # preview the build
```
Destination photos are stored in `public/images/`. If an image is unavailable, the application displays a labeled fallback.

## Folder structure
```text
respawn-routes/
├── docs/                 class-diagram.png/.pdf/.mmd, testing-checklist.md
├── public/images/        travel photos
├── src/
│   ├── components/       Navbar, Footer, DestinationCard, ExperienceCard, SmartImage, EmptyState, PageHeader, Toast, ScrollToTop
│   ├── context/          AppContext.jsx (favorites, itinerary, preferences, localStorage)
│   ├── data/             destinations.js, experiences.js
│   ├── models/           Destination, Experience, ItineraryItem, UserPreferences, TravelPlan
│   ├── pages/            Home, Explore, DestinationDetails, EscapeFinder, Experiences, Planner, Favorites, Dashboard, About, NotFound
│   ├── utils/format.js   peso() and formatDuration()
│   ├── App.jsx, main.jsx, index.css
└── package.json, vite.config.js, tailwind.config.js, postcss.config.js
```

## OOP models (`src/models/`)
| Class | Purpose |
|---|---|
| `Destination` | A place: all spec fields plus `getBudgetLabel()`, `getDurationLabel()`, `matchesSearch()` |
| `Experience` | An activity linked to a destination by `destinationId` |
| `ItineraryItem` | One planner row; `fromDestination()` / `fromExperience()` build it; its `id` (`type-referenceId`) prevents duplicates |
| `UserPreferences` | Escape Finder choices; `matchesDestination()`, `score()`, `explain()` do the recommendation matching |
| `TravelPlan` | Holds `ItineraryItem`s; `addItem()`, `removeItem()`, `clear()`, `recalculate()` keep `totalBudget` and `totalDuration` correct |

`duration` is stored in **hours** (e.g. 8, 30, 48) and shown as "8 hrs" or "1.3 days" by `formatDuration()`.

## Dynamic rendering, filtering and recommendations
- Destinations and experiences are `new Destination({...})` / `new Experience({...})` instances exported from `src/data/`. No records are hardcoded in components.
- Lists are rendered with `.map()` using unique `id` keys.
- Explore and Experiences use `.filter()` (search, category, budget) and `.sort()`.
- Escape Finder: `UserPreferences.matchesDestination()` keeps a destination only if it fits the chosen budget (cost ≤ upper limit), time (duration ≤ limit: few hours 4, one day 12, weekend 72), setting (category) and mood (shares at least one mood interest). Camping and outdoor interests are included in the recommendations. Results are sorted by number of shared interests, and `explain()` writes the reasons. Blank groups mean "no preference". It uses plain rules, not AI or live data.

## Routing and state
`BrowserRouter` in `main.jsx`; `Routes` in `App.jsx`; `useParams` reads `:id`; `useSearchParams` pre-fills Explore/Experiences filters from Home links. `AppContext` (Context + `useState`, `useEffect`, `useMemo`) stores favorites (IDs), itinerary items and preferences, saved in `localStorage` under `rr-favorites`, `rr-itinerary`, `rr-preferences`.

## Budget calculations
`TravelPlan.recalculate()` sums `estimatedCost` and `duration` over its items. The Planner and Dashboard show `plan.totalBudget`, `plan.totalDuration` and `plan.getItemCount()`. Adding the same item twice is rejected with a message.

## Architecture and verification
- UML class diagram: `docs/class-diagram.png` (also available as PDF and Mermaid source)
- Verification summary: `docs/testing-checklist.md`

## Project scope
- Destination budgets and activity costs are planning estimates, not live quotes. Confirm prices, schedules, transport and venue availability before traveling.
- Camping is a planning suggestion. Confirm legal campsite access, permits, facilities, weather and safety guidance with local authorities before departure.
- The Escape Finder matches saved preferences against the destination information included in the app.
- Favorites, preferences and itinerary items are stored in the current browser using `localStorage`.
- The itinerary download is a text summary of the current plan; it does not make reservations.

## GitHub workflow
```bash
git add .
git commit -m "Finalize Respawn Routes"
git push
```
`node_modules/` and `dist/` are excluded from version control.
