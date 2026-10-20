import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Sparkles } from 'lucide-react'
import destinations, { DESTINATION_CATEGORIES, getDestinationById } from '../data/destinations.js'
import { EXPERIENCE_CATEGORIES } from '../data/experiences.js'
import DestinationCard from '../components/DestinationCard.jsx'
import SmartImage from '../components/SmartImage.jsx'

export default function Home() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const featured = [
    getDestinationById('badian-matutinao'),
    getDestinationById('kawasan-falls'),
    getDestinationById('osmena-peak'),
  ].filter(Boolean)

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/explore?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink">
        <SmartImage src="/images/matutinao.jpg" alt="Calm coastline in Badian, Cebu" label="Badian, Cebu" className="absolute inset-0 -z-10 h-full w-full opacity-60" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/60 to-transparent" />
        <div className="container-page py-20 sm:py-28">
          <h1 className="max-w-2xl text-4xl font-extrabold text-white sm:text-6xl">Take a break. Find your next adventure.</h1>
          <p className="mt-4 max-w-xl text-lg text-white/90">Discover Cebu's coastlines, mountain trails and outdoor escapes. Find camping and adventure ideas, compare estimated costs, and plan around your schedule.</p>
          <form onSubmit={handleSearch} className="mt-8 flex max-w-xl flex-col gap-2 sm:flex-row" role="search">
            <label htmlFor="home-search" className="sr-only">Search destinations</label>
            <input id="home-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try “beach”, “waterfall” or “Badian”" className="field flex-1" />
            <button className="btn-accent"><Search className="h-4 w-4" aria-hidden="true" /> Search</button>
          </form>
          <Link to="/escape-finder" className="btn-accent mt-4 px-6 py-3 text-base"><Sparkles className="h-5 w-5" aria-hidden="true" /> Choose Your Escape</Link>
        </div>
      </section>

      <section className="container-page mt-14">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-extrabold sm:text-3xl">Your Next Adventure</h2>
          <Link to="/explore" className="text-sm font-semibold text-teal hover:underline">Explore Mode: see all</Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((d) => <DestinationCard key={d.id} destination={d} />)}
        </div>
      </section>

      <section className="container-page mt-14">
        <h2 className="text-2xl font-extrabold sm:text-3xl">Browse by setting</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {DESTINATION_CATEGORIES.map((c) => (
            <Link key={c} to={`/explore?category=${encodeURIComponent(c)}`} className="btn-outline">{c}</Link>
          ))}
        </div>
        <h2 className="mt-10 text-2xl font-extrabold sm:text-3xl">Travel experiences</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {EXPERIENCE_CATEGORIES.map((c) => (
            <Link key={c} to={`/experiences?category=${encodeURIComponent(c)}`} className="btn-outline">{c}</Link>
          ))}
        </div>
      </section>
    </>
  )
}
