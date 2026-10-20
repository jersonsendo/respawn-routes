# Respawn Routes

*Take a break. Find your next adventure. Respawn refreshed.*

A personalized travel discovery and trip-planning app for students, working students, gamers, anime fans, movie fans, basketball fans and adventure seekers. Focused on affordable escapes in Cebu and the Philippines (featuring Badian, Cebu). Theme: **Hospitality & Tourism**. Midterm Practical Exam project.

## Features
- **Home** `/` – hero, destination search, featured destinations, category shortcuts, Escape Finder button
- **Explore** `/explore` – search, category filter, budget filter, sort by name or budget, empty state
- **Destination Details** `/destinations/:id` – activities, tips, budget, duration, add to itinerary, favorite toggle, invalid-ID handling
- **Escape Finder** `/escape-finder` – mood, time, budget and setting inputs; matching destinations with reasons; reset; empty state
- **Experiences** `/experiences` – five categories, search and category filter
- **Trip Planner** `/planner` – add/remove items, clear with confirmation, dynamic totals, duplicates blocked, download a text itinerary
- **Favorites** `/favorites`, **Dashboard** `/dashboard`, **About** `/about`
- Responsive navbar with active-route highlight, an Escape-key closable mobile menu, and mobile menu controls announced to assistive technology

## Tech stack
React 18, Vite, JavaScript (ES6+), Tailwind CSS 3, React Router DOM 6, React Hooks, Lucide React (icons). No backend, database, external API, authentication or payments.

## Install and run
```bash
npm install
npm run dev      # development server (usually http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # preview the build
```
Add your own photos to `public/images/` (see `public/images/README.txt`). Without them, a fallback block is shown.

## Folder structure
```text
respawn-routes/
├── docs/                 class-diagram.png/.pdf/.mmd, figma-blueprint.md, oral-exam-guide.md, testing-checklist.md
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
- Escape Finder: `UserPreferences.matchesDestination()` keeps a destination only if it fits the chosen budget (cost ≤ upper limit), time (duration ≤ limit: few hours 4, one day 12, weekend 72), setting (category) and mood (shares at least one mood interest). Results are sorted by number of shared interests, and `explain()` writes the reasons. Blank groups mean "no preference". It uses plain rules, not AI or live data.

## Routing and state
`BrowserRouter` in `main.jsx`; `Routes` in `App.jsx`; `useParams` reads `:id`; `useSearchParams` pre-fills Explore/Experiences filters from Home links. `AppContext` (Context + `useState`, `useEffect`, `useMemo`) stores favorites (IDs), itinerary items and preferences, saved in `localStorage` under `rr-favorites`, `rr-itinerary`, `rr-preferences`.

## Budget calculations
`TravelPlan.recalculate()` sums `estimatedCost` and `duration` over its items. The Planner and Dashboard show `plan.totalBudget`, `plan.totalDuration` and `plan.getItemCount()`. Adding the same item twice is rejected with a message.

## Figma and class diagram
- UML: `docs/class-diagram.png` (also `.pdf` and Mermaid source `.mmd`)
- Figma: **not created yet** – see `docs/figma-blueprint.md` for frame-by-frame specs. Add your Figma view link here after recreating it: `FIGMA_LINK_HERE`
- Oral exam guide: `docs/oral-exam-guide.md`; checks performed: `docs/testing-checklist.md`

## Known limitations
- Educational demo: no booking, live prices, maps or availability. Budgets are rough estimates and may be out of date.
- Entries marked "(Sample Data)" are fictional demonstration venues.
- Travel photos must be added by you; fallback blocks are shown otherwise.
- Data lives only in the browser's localStorage.
- The itinerary download is a plain-text snapshot of current items and estimates; it does not book travel or include live availability.

## Publish to GitHub
```bash
git init
git add .
git commit -m "Respawn Routes midterm project"
git branch -M main
git remote add origin https://github.com/<your-username>/respawn-routes.git
git push -u origin main
```
Create the empty repository on github.com first. `node_modules/` and `dist/` are already in `.gitignore`.
