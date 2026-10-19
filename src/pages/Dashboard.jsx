import { Link } from 'react-router-dom'
import destinations from '../data/destinations.js'
import DestinationCard from '../components/DestinationCard.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { useApp } from '../context/AppContext.jsx'
import { peso } from '../utils/format.js'

function Stat({ label, value }) {
  return (
    <div className="card p-5">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 font-display text-3xl font-extrabold text-ink">{value}</p>
    </div>
  )
}

export default function Dashboard() {
  const { favoriteIds, plan, preferences } = useApp()
  const inPlan = plan.items.filter((i) => i.itemType === 'destination').map((i) => i.referenceId)

  // Suggestion: best match for saved preferences, otherwise the cheapest destination not yet saved or planned.
  const candidates = destinations.filter((d) => !favoriteIds.includes(d.id) && !inPlan.includes(d.id))
  const suggested = preferences && !preferences.isEmpty()
    ? [...candidates].filter((d) => preferences.matchesDestination(d)).sort((a, b) => preferences.score(b) - preferences.score(a))[0]
    : [...candidates].sort((a, b) => a.estimatedBudget - b.estimatedBudget)[0]

  return (
    <>
      <PageHeader title="Dashboard" subtitle="A summary of your saved places and trip plan." />
      <div className="container-page mt-6 space-y-8">
        <div className="grid gap-4 sm:grid-cols-3">
          <Stat label="Favorite destinations" value={favoriteIds.length} />
          <Stat label="Itinerary items" value={plan.getItemCount()} />
          <Stat label="Estimated trip budget" value={peso(plan.totalBudget)} />
        </div>
        <section className="card p-5">
          <h2 className="text-xl font-bold">Current travel preferences</h2>
          {preferences && !preferences.isEmpty() ? (
            <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              <div><dt className="text-slate-500">Mood</dt><dd className="font-semibold text-ink">{preferences.travelMood || 'Any'}</dd></div>
              <div><dt className="text-slate-500">Available time</dt><dd className="font-semibold text-ink">{preferences.availableTime || 'Any'}</dd></div>
              <div><dt className="text-slate-500">Budget</dt><dd className="font-semibold text-ink">{preferences.budget || 'Any'}</dd></div>
              <div><dt className="text-slate-500">Setting</dt><dd className="font-semibold text-ink">{preferences.preferredSetting || 'Any'}</dd></div>
            </dl>
          ) : (
            <p className="mt-2 text-sm text-slate-600">No preferences saved yet. <Link to="/escape-finder" className="font-semibold text-teal hover:underline">Choose your escape</Link>.</p>
          )}
        </section>
        <section>
          <h2 className="text-xl font-bold">Suggested destination</h2>
          {suggested ? (
            <div className="mt-4 max-w-sm"><DestinationCard destination={suggested} reasons={preferences && !preferences.isEmpty() ? preferences.explain(suggested) : undefined} /></div>
          ) : (
            <p className="mt-2 text-sm text-slate-600">No new suggestion right now. Try changing your preferences in the Escape Finder.</p>
          )}
        </section>
      </div>
    </>
  )
}
