import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'

const features = ['Search, filter and sort destinations by category and estimated budget', 'Match destinations to interests including camping, hiking, nature and outdoor adventure', 'Browse activities and add destinations or experiences to an itinerary', 'Save favorites and review trip estimates on the dashboard', 'Download a concise copy of your planned itinerary']
const users = ['Travelers exploring Cebu and nearby destinations', 'Outdoor enthusiasts interested in hiking, camping and nature', 'Groups planning a trip around shared interests and an estimated budget']
const limits = ['Prices and durations are planning estimates; confirm details with local providers', 'Check permits, campsite access, weather and safety guidance before outdoor activities', 'Schedules, transport and venue availability can change', 'Favorites, preferences and itineraries are saved in this browser']

function List({ title, items }) {
  return (
    <section className="card p-5">
      <h2 className="text-xl font-bold">{title}</h2>
      <ul className="mt-3 list-disc space-y-1 pl-5">{items.map((i) => <li key={i}>{i}</li>)}</ul>
    </section>
  )
}

export default function About() {
  return (
    <>
      <PageHeader title="About Respawn Routes" subtitle="Take a break. Find your next adventure. Respawn refreshed." />
      <div className="container-page mt-6 space-y-6">
        <p className="max-w-3xl">Respawn Routes is a destination discovery and trip-planning application focused on Cebu. Explore places, compare estimated costs and durations, and organize activities around your interests and available time.</p>
        <div className="grid gap-6 md:grid-cols-3">
          <List title="Features" items={features} />
          <List title="Who it is for" items={users} />
          <List title="Limitations" items={limits} />
        </div>
        <Link to="/escape-finder" className="btn-accent">Choose Your Escape</Link>
      </div>
    </>
  )
}
