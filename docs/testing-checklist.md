# Testing Checklist (what was actually run)

Environment limits: the build sandbox had **no internet**, so `npm install`, `npm run dev`, `npm run build` and browser testing were **not run**.

## Executed in the sandbox
| # | Check | Result |
|---|---|---|
| 1 | Syntax check of all `.js`/`.jsx` files with `tsc` (parse only) | PASS – 0 syntax errors |
| 2 | Data load: 13 destinations, 18 experiences, unique IDs, every `destinationId` resolves | PASS |
| 3 | Escape Finder logic (Node): Chill + ₱500–1,000 + One Day + Beach → 1 result (Matutinao Shoreline) with 4 reasons | PASS |
| 4 | Escape Finder logic: Sports + Under ₱500 + Few Hours + Beach → 0 results (empty state path) | PASS |
| 5 | TravelPlan logic: add item, duplicate rejected, add second, totals (₱900, 10 hrs), remove, totals update | PASS |
| 6 | UML diagram attributes and methods compared to the real classes by script | PASS – exact match |
| 7 | All 5 classes imported and used by the app | PASS |
| 8 | No ₱ amounts hardcoded in pages/components | PASS |

## NOT run – do these on your computer
`npm install` · `npm run dev` · `npm run build`, then in the browser:
- [ ] Every route loads (`/`, `/explore`, `/destinations/badian-matutinao`, `/escape-finder`, `/experiences`, `/planner`, `/favorites`, `/dashboard`, `/about`)
- [ ] `/destinations/wrong-id` shows "Destination not found"
- [ ] Explore: search "beach", category, budget, and sort change the list; nonsense search shows empty state
- [ ] Heart toggles favorites; Favorites page and Dashboard count update; refresh keeps them
- [ ] Add to itinerary; adding twice shows "already in your itinerary"; Remove and Clear (confirm) work; totals update
- [ ] Escape Finder: different choices give different results; Reset clears
- [ ] Mobile menu opens/closes; resize to 390px with no horizontal scroll
