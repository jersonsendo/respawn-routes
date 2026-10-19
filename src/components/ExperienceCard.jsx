import { Link } from 'react-router-dom'
import { Clock, Plus, Wallet } from 'lucide-react'
import ItineraryItem from '../models/ItineraryItem.js'
import { getDestinationById } from '../data/destinations.js'
import { useApp } from '../context/AppContext.jsx'

export default function ExperienceCard({ experience: e }) {
  const { addToItinerary } = useApp()
  const destination = getDestinationById(e.destinationId)
  return (
    <article className="card flex flex-col p-4">
      <span className="chip self-start">{e.category}</span>
      <h3 className="mt-2 text-lg font-bold leading-snug">{e.name}</h3>
      <p className="mt-1 flex-1 text-sm">{e.description}</p>
      {destination && (
        <p className="mt-2 text-sm text-slate-500">
          At <Link className="font-semibold text-teal hover:underline" to={`/destinations/${destination.id}`}>{destination.name}</Link>
        </p>
      )}
      <div className="mt-2 flex flex-wrap gap-1">
        {e.interests.map((i) => <span key={i} className="rounded-full bg-mist px-2 py-0.5 text-xs">{i}</span>)}
      </div>
      <div className="mt-3 flex items-center gap-4 text-sm font-semibold text-ink">
        <span className="flex items-center gap-1"><Wallet className="h-4 w-4 text-teal" aria-hidden="true" />{e.getCostLabel()}</span>
        <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-teal" aria-hidden="true" />{e.getDurationLabel()}</span>
      </div>
      <button className="btn-outline mt-4" onClick={() => addToItinerary(ItineraryItem.fromExperience(e))}>
        <Plus className="h-4 w-4" aria-hidden="true" /> Add to itinerary
      </button>
    </article>
  )
}
