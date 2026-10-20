import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, Heart, Plus, Wallet } from 'lucide-react'
import { getDestinationById } from '../data/destinations.js'
import experiences from '../data/experiences.js'
import ItineraryItem from '../models/ItineraryItem.js'
import SmartImage from '../components/SmartImage.jsx'
import ExperienceCard from '../components/ExperienceCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { useApp } from '../context/AppContext.jsx'

export default function DestinationDetails() {
  const { id } = useParams()
  const { isFavorite, toggleFavorite, addToItinerary } = useApp()
  const d = getDestinationById(id)

  if (!d) {
    return (
      <div className="container-page mt-12">
        <EmptyState title="Destination not found" text={`There is no destination with the ID "${id}".`}>
          <Link to="/explore" className="btn-primary">Back to Explore</Link>
        </EmptyState>
      </div>
    )
  }

  const related = experiences.filter((e) => e.destinationId === d.id)
  const fav = isFavorite(d.id)

  return (
    <div className="container-page mt-6">
      <Link to="/explore" className="inline-flex items-center gap-1 text-sm font-semibold text-teal hover:underline"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to destinations</Link>
      <div className="mt-4 grid gap-8 lg:grid-cols-2">
        <SmartImage src={d.image} alt={d.name} label={d.name} className="h-64 w-full rounded-2xl sm:h-96" />
        <div>
          <span className="chip">{d.category}</span>
          <h1 className="mt-2 text-3xl font-extrabold">{d.name}</h1>
          <p className="text-slate-500">{d.location} · {d.atmosphere}</p>
          <p className="mt-4">{d.description}</p>
          <div className="mt-4 flex flex-wrap gap-6 font-semibold text-ink">
            <span className="flex items-center gap-2"><Wallet className="h-5 w-5 text-teal" aria-hidden="true" /> Est. budget {d.getBudgetLabel()}</span>
            <span className="flex items-center gap-2"><Clock className="h-5 w-5 text-teal" aria-hidden="true" /> Recommended {d.getDurationLabel()}</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="btn-primary" onClick={() => addToItinerary(ItineraryItem.fromDestination(d))}><Plus className="h-4 w-4" aria-hidden="true" /> Add to itinerary</button>
            <button className="btn-outline" aria-pressed={fav} onClick={() => toggleFavorite(d.id)}><Heart className={`h-4 w-4 ${fav ? 'fill-sun text-sun' : ''}`} aria-hidden="true" /> {fav ? 'Remove from favorites' : 'Add to favorites'}</button>
            <Link to="/explore" className="btn-outline">Back to destinations</Link>
          </div>
        </div>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <section className="card p-5">
          <h2 className="text-xl font-bold">Activities</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5">{d.activities.map((a) => <li key={a}>{a}</li>)}</ul>
        </section>
        <section className="card p-5">
          <h2 className="text-xl font-bold">Travel tips</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5">{d.travelTips.map((t) => <li key={t}>{t}</li>)}</ul>
        </section>
      </div>
      {d.campingVerification && (
        <section className="card mt-6 p-5" aria-labelledby="camping-verification-heading">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="camping-verification-heading" className="text-xl font-bold">Camping information</h2>
            <span className="chip">{d.campingVerification.status === 'verified' ? 'Source verified' : 'Not verified'}</span>
          </div>
          <p className="mt-3 text-sm">{d.campingVerification.notes}</p>
          <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-slate-500">Information source</dt>
              <dd className="font-semibold text-ink">
                {d.campingVerification.sourceUrl ? (
                  <a className="text-teal underline" href={d.campingVerification.sourceUrl} target="_blank" rel="noreferrer">
                    {d.campingVerification.sourceName || 'View source'}
                  </a>
                ) : d.campingVerification.sourceName || 'No source recorded'}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Last verified</dt>
              <dd className="font-semibold text-ink">{d.campingVerification.lastVerified || 'Not yet verified'}</dd>
            </div>
          </dl>
        </section>
      )}
      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-2xl font-extrabold">Experiences here</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((e) => <ExperienceCard key={e.id} experience={e} />)}</div>
        </section>
      )}
    </div>
  )
}
