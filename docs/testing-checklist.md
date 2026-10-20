# Testing Checklist (what was actually run)

The production build was run after the latest changes. Browser interaction testing remains a manual check.

## Executed in the sandbox
| # | Check | Result |
|---|---|---|
| 1 | `npm run build` | PASS |
| 2 | Syntax check of all `.js`/`.jsx` files with `tsc` (parse only) | PASS – 0 syntax errors |
| 3 | Data load: 13 destinations, 18 experiences, unique IDs, every `destinationId` resolves | PASS |
| 4 | Escape Finder logic (Node): Chill + ₱500–1,000 + One Day + Beach → 1 result (Matutinao Shoreline) with 4 reasons | PASS |
| 5 | Escape Finder logic: Sports + Under ₱500 + Few Hours + Beach → 0 results (empty state path) | PASS |
| 6 | TravelPlan logic: add item, duplicate rejected, add second, totals (₱900, 10 hrs), remove, totals update | PASS |
| 7 | UML diagram attributes and methods compared to the real classes by script | PASS – exact match |
| 8 | All 5 classes imported and used by the app | PASS |
| 9 | No ₱ amounts hardcoded in pages/components | PASS |
| 10 | Browser smoke test: Explore and Experiences load selected URL categories; mobile menu closes with Escape | PASS |

## NOT run – do these on your computer
Then in the browser:
- [ ] Every route loads (`/`, `/explore`, `/destinations/badian-matutinao`, `/escape-finder`, `/experiences`, `/planner`, `/favorites`, `/dashboard`, `/about`)
- [ ] `/destinations/wrong-id` shows "Destination not found"
- [ ] Explore: search "beach", category, budget, and sort change the list; nonsense search shows empty state
- [ ] Heart toggles favorites; Favorites page and Dashboard count update; refresh keeps them
- [ ] Add to itinerary; adding twice shows "already in your itinerary"; Remove and Clear (confirm) work; totals update
- [ ] Download itinerary includes each item and the current estimated totals
- [ ] Escape Finder: different choices give different results; Reset clears
- [ ] Mobile menu opens/closes with its button and Escape; resize to 390px with no horizontal scroll
- [ ] Navigate between different Home category links while already on Explore/Experiences; the selected filter updates
