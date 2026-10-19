import Destination from '../models/Destination.js'

// All destination records live here. Budgets are rough per-person ESTIMATES in pesos
// (transport + fees + food) and can change. Entries marked "(Sample Data)" are fictional
// demonstration entries, NOT real venues.
const destinations = [
  new Destination({
    id: 'badian-matutinao', name: 'Matutinao Shoreline, Badian', location: 'Badian, Cebu', category: 'Beach',
    description: 'A quiet stretch of coast in southwest Cebu, a good pick for slow mornings and sunset walks away from the busier resort areas.',
    image: '/images/badian.jpg', interests: ['chill', 'relax', 'peaceful', 'sunset', 'beach', 'photography'],
    estimatedBudget: 800, duration: 8, atmosphere: 'Peaceful and slow-paced',
    activities: ['Sunset beach walk', 'Swimming', 'Coastal photography', 'Local seafood meal'],
    travelTips: ['Leave early from Cebu City because the bus ride to Badian takes several hours.', 'Bring cash; small coastal areas may have limited ATMs.', 'Check sea conditions before swimming.'],
  }),
  new Destination({
    id: 'kawasan-falls', name: 'Kawasan Falls', location: 'Badian, Cebu', category: 'Nature',
    description: 'A well-known turquoise waterfall in Badian that is also the starting area for canyoneering tours.',
    image: '/images/kawasan.jpg', interests: ['nature', 'waterfalls', 'adventure', 'hiking', 'canyoneering', 'photography'],
    estimatedBudget: 1200, duration: 8, atmosphere: 'Lively and adventurous',
    activities: ['Walk to the falls', 'Swimming in the pools', 'Guided canyoneering (separate fee)'],
    travelTips: ['Wear water shoes and bring a dry bag.', 'Go on a weekday to avoid crowds.', 'Fees change, so confirm prices on arrival.'],
  }),
  new Destination({
    id: 'moalboal-panagsama', name: 'Panagsama Beach, Moalboal', location: 'Moalboal, Cebu', category: 'Beach',
    description: 'A laid-back beach town in southwest Cebu known for snorkeling and diving close to shore.',
    image: '/images/moalboal.jpg', interests: ['beach', 'chill', 'relax', 'adventure', 'sunset', 'exploration'],
    estimatedBudget: 3000, duration: 30, atmosphere: 'Relaxed with an active water scene',
    activities: ['Snorkeling', 'Beachfront dinner', 'Sunset watching'],
    travelTips: ['Overnight stays are easier than a rushed day trip.', 'Use reef-safe sunscreen.', 'Never touch marine life.'],
  }),
  new Destination({
    id: 'osmena-peak', name: 'Osmeña Peak', location: 'Dalaguete, Cebu', category: 'Mountains',
    description: 'The highest point in Cebu, with a short hike and wide views of jagged green ridges.',
    image: '/images/osmena.jpg', interests: ['hiking', 'adventure', 'nature', 'photography', 'exploration', 'sports'],
    estimatedBudget: 700, duration: 6, atmosphere: 'Open-air and energizing',
    activities: ['Short summit hike', 'Sunrise viewing', 'Photography'],
    travelTips: ['Start early for cooler weather and clearer views.', 'Wear shoes with grip.', 'Bring water; stalls near the trail are limited.'],
  }),
  new Destination({
    id: 'tops-lookout', name: 'Tops Lookout', location: 'Busay, Cebu City', category: 'City',
    description: 'A hilltop viewpoint above Cebu City, ideal for a short evening break between school or work.',
    image: '/images/tops.jpg', interests: ['chill', 'relax', 'sunset', 'photography', 'peaceful'],
    estimatedBudget: 300, duration: 3, atmosphere: 'Calm with city lights',
    activities: ['City view', 'Sunset photos', 'Snack stop'],
    travelTips: ['Go before sunset for the best light.', 'Evenings can be windy and cool.', 'Plan your ride back before dark.'],
  }),
  new Destination({
    id: 'cebu-heritage-walk', name: 'Cebu Heritage Walk', location: 'Downtown Cebu City', category: 'City',
    description: 'A walkable cluster of historic sites in downtown Cebu City, including Magellan\'s Cross, the Basilica del Santo Niño and Fort San Pedro.',
    image: '/images/heritage.jpg', interests: ['exploration', 'photography', 'nature', 'adventure'],
    estimatedBudget: 400, duration: 4, atmosphere: 'Historic and walkable',
    activities: ['Visit Magellan\'s Cross', 'Tour Fort San Pedro', 'Street food stop'],
    travelTips: ['Wear comfortable shoes.', 'Dress modestly for the Basilica.', 'Start in the morning to avoid midday heat.'],
  }),
  new Destination({
    id: 'mantayupan-falls', name: 'Mantayupan Falls', location: 'Barili, Cebu', category: 'Nature',
    description: 'A tall waterfall in Barili with a cool pool at the base, suited to a half-day nature break.',
    image: '/images/mantayupan.jpg', interests: ['nature', 'waterfalls', 'relax', 'peaceful', 'photography', 'hiking'],
    estimatedBudget: 600, duration: 5, atmosphere: 'Cool and green',
    activities: ['Waterfall viewing', 'Swimming at the pool', 'Picnic'],
    travelTips: ['Bring a change of clothes.', 'Trails can be slippery after rain.', 'Confirm entrance fees locally.'],
  }),
  new Destination({
    id: 'camotes-islands', name: 'Camotes Islands', location: 'Camotes, Cebu', category: 'Beach',
    description: 'An island group east of Cebu with quiet beaches, caves and lagoons, best for a weekend away.',
    image: '/images/camotes.jpg', interests: ['beach', 'chill', 'relax', 'peaceful', 'exploration', 'adventure'],
    estimatedBudget: 3500, duration: 48, atmosphere: 'Slow island life',
    activities: ['Beach hopping', 'Cave visits', 'Island motorbike ride'],
    travelTips: ['Check ferry schedules in advance.', 'Book accommodation early on holiday weekends.', 'Carry cash for island fees.'],
  }),
  new Destination({
    id: 'bantayan-island', name: 'Bantayan Island', location: 'Bantayan, Cebu', category: 'Beach',
    description: 'A northern Cebu island with long white-sand beaches, known for relaxed weekend stays.',
    image: '/images/bantayan.jpg', interests: ['beach', 'chill', 'relax', 'peaceful', 'sunset'],
    estimatedBudget: 4000, duration: 48, atmosphere: 'Quiet and sunny',
    activities: ['Beach lounging', 'Island tour', 'Sunset dinner'],
    travelTips: ['Plan for a long travel day (land plus ferry).', 'Pack light for island hopping.', 'Book ferry and stay ahead of time.'],
  }),
  new Destination({
    id: 'cebu-mall-cinema', name: 'Cebu Mall Cinema Night', location: 'Cebu City', category: 'Entertainment Venues',
    description: 'A budget-friendly movie-and-snacks night at any Cebu City mall cinema. Pick the mall nearest your route.',
    image: '/images/cinema.jpg', interests: ['movies', 'entertainment', 'pop culture', 'chill', 'relax'],
    estimatedBudget: 450, duration: 4, atmosphere: 'Cozy and indoor',
    activities: ['Watch a film', 'Dinner or snacks', 'Window shopping'],
    travelTips: ['Check showtimes online first.', 'Go on a weekday for cheaper tickets, where offered.', 'Plan transport home after late shows.'],
  }),
  new Destination({
    id: 'sample-arcade-lounge', name: 'Sample Arcade & Gaming Lounge (Sample Data)', location: 'Cebu City (fictional)', category: 'Entertainment Venues',
    description: 'Sample demonstration entry, not a real venue. Represents a gaming lounge with console stations and arcade cabinets.',
    image: '/images/sample-arcade.jpg', interests: ['gaming', 'arcade', 'entertainment', 'pop culture'],
    estimatedBudget: 350, duration: 3, atmosphere: 'Playful and social',
    activities: ['Console sessions', 'Arcade games', 'Snack counter'],
    travelTips: ['This is sample data; search for a real gaming cafe near you.', 'Set a time and budget limit before you start.'],
  }),
  new Destination({
    id: 'sample-hoops-court', name: 'Sample Pickup Hoops Court (Sample Data)', location: 'Cebu City (fictional)', category: 'Entertainment Venues',
    description: 'Sample demonstration entry, not a real venue. Represents a community basketball court for casual pickup games.',
    image: '/images/sample-hoops.jpg', interests: ['basketball', 'sports', 'adventure', 'entertainment'],
    estimatedBudget: 200, duration: 3, atmosphere: 'Energetic and friendly',
    activities: ['Pickup games', 'Shooting drills', 'Cool-down snack'],
    travelTips: ['This is sample data; look for a public court near you.', 'Bring water and a towel.'],
  }),
  new Destination({
    id: 'sample-anime-popup', name: 'Sample Anime & Collectibles Pop-up (Sample Data)', location: 'Cebu City (fictional)', category: 'Entertainment Venues',
    description: 'Sample demonstration entry, not a real event. Represents a convention-style pop-up with merchandise stalls and cosplay photo spots.',
    image: '/images/sample-anime.jpg', interests: ['anime', 'pop culture', 'collectibles', 'movies', 'entertainment'],
    estimatedBudget: 500, duration: 4, atmosphere: 'Fun and colorful',
    activities: ['Browse merchandise stalls', 'Cosplay photos', 'Trivia corner'],
    travelTips: ['This is sample data; watch local event pages for real conventions.', 'Set a souvenir budget before you go.'],
  }),
]

export default destinations
export const getDestinationById = (id) => destinations.find((d) => d.id === id)
export const DESTINATION_CATEGORIES = ['Beach', 'Mountains', 'City', 'Nature', 'Entertainment Venues']
