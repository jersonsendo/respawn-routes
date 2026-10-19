# Figma Blueprint (manual recreation)

**Status: no Figma file was created.** No Figma tool was available. Recreate these frames, then paste the view link into README.md.

## Styles
- **Colors:** Ink `#0F2A3D` (headings), Teal `#0E7C86` (primary), Teal Soft `#DFF1F2`, Mist `#F4F7F6` (page background), Sun `#F28C28` (accent buttons), Lime `#B7E04A` (footer hover only), White cards.
- **Fonts:** Bricolage Grotesque 700/800 for headings (H1 48 desktop / 32 mobile, H2 30, H3 18); Instrument Sans 400/600 for body 16, small 14.
- **Spacing:** 8-pt grid; page max width 1152, side padding 24 (16 mobile); card radius 16; button radius 12; field radius 12; card shadow Y1 blur 3, 5% ink.
- **Frames:** Desktop 1440 wide; Mobile 390 wide.

## Components (create once, reuse)
Navbar (desktop links / mobile hamburger + open menu), Button (primary, accent, outline, danger), Chip, Input/Select, Radio Pill (selected = teal fill), Destination Card, Experience Card, Empty State, Toast, Footer.

## Frames (desktop 1440 + mobile 390 for each)
1. **Home** – hero photo with navy gradient, H1 "Take a break. Find your next adventure.", search field + Search button, "Choose Your Escape" button; "Your Next Adventure" grid of 3 cards (3 cols / 1 col); setting chips; experience chips.
2. **Explore** – header; filter card (Search, Category, Budget, Sort in 4 cols / stacked); result count; card grid; empty-state variant.
3. **Destination Details** – back link; image left, info right (stacked on mobile); budget and duration; buttons Add to itinerary / Add to favorites / Back to destinations; Activities and Travel tips cards; related experiences.
4. **Escape Finder** – form card with four radio-pill groups (mood, time, budget, setting), buttons Find my escape and Reset; results grid where each card has a teal-soft "why it matches" box; empty-state variant.
5. **Experiences** – search + category; sections per category with experience cards.
6. **Trip Planner** – item list with Remove buttons (left, 2 cols) and Trip summary card (right: items, total cost, duration, Clear itinerary); empty-state variant.
7. **Favorites** – card grid and empty state.
8. **Dashboard** – three stat cards, preferences card, suggested destination card.
9. **About** – three list cards (Features, Who it is for, Limitations) and CTA.

Use the exact labels from the React app. Use the same photos named in `public/images/README.txt`.
