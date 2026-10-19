import { Link } from 'react-router-dom'
import { Clock, Heart, Wallet } from 'lucide-react'
import SmartImage from './SmartImage.jsx'
import { useApp } from '../context/AppContext.jsx'

export default function DestinationCard({ destination: d, reasons }) {
  const { isFavorite, toggleFavorite } = useApp()
  const fav = isFavorite(d.id)
  return (
    <article className="card flex flex-col overflow-hidden">
      <div className="relative">
        <SmartImage src={d.image} alt={d.name} label={d.name} className="h-44 w-full" />
        <button
          onClick={() => toggleFavorite(d.id)}
          aria-pressed={fav}
          aria-label={fav ? `Remove ${d.name} from favorites` : `Add ${d.name} to favorites`}
          className="absolute right-3 top-3 rounded-full bg-white/95 p-2 shadow"
        >
          <Heart className={`h-5 w-5 ${fav ? 'fill-sun text-sun' : 'text-ink'}`} />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="chip self-start">{d.category}</span>
        <h3 className="mt-2 text-lg font-bold leading-snug">{d.name}</h3>
        <p className="text-sm text-slate-500">{d.location}</p>
        <p className="mt-2 flex-1 text-sm">{d.description}</p>
        {reasons && (
          <ul className="mt-3 list-disc space-y-1 rounded-xl bg-teal-soft p-3 pl-6 text-xs text-ink">
            {reasons.map((r) => <li key={r}>{r}</li>)}
          </ul>
        )}
        <div className="mt-3 flex items-center gap-4 text-sm font-semibold text-ink">
          <span className="flex items-center gap-1"><Wallet className="h-4 w-4 text-teal" aria-hidden="true" />{d.getBudgetLabel()}</span>
          <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-teal" aria-hidden="true" />{d.getDurationLabel()}</span>
        </div>
        <Link to={`/destinations/${d.id}`} className="btn-primary mt-4">View details</Link>
      </div>
    </article>
  )
}
