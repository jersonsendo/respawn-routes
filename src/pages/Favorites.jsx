import { Link } from 'react-router-dom'
import destinations from '../data/destinations.js'
import DestinationCard from '../components/DestinationCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { useApp } from '../context/AppContext.jsx'

export default function Favorites() {
  const { favoriteIds } = useApp()
  const saved = destinations.filter((d) => favoriteIds.includes(d.id))
  return (
    <>
      <PageHeader title="Favorites" subtitle="Destinations you saved for later." />
      <div className="container-page mt-6">
        {saved.length === 0 ? (
          <EmptyState title="No favorites yet" text="Tap the heart on any destination to save it here."><Link to="/explore" className="btn-primary">Explore destinations</Link></EmptyState>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{saved.map((d) => <DestinationCard key={d.id} destination={d} />)}</div>
        )}
      </div>
    </>
  )
}
