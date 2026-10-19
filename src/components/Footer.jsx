import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-16 bg-ink text-white/80">
      <div className="container-page flex flex-col gap-3 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg font-bold text-white">Respawn Routes</p>
          <p>Take a break. Find your next adventure. Respawn refreshed.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link to="/explore" className="hover:text-lime">Explore</Link>
          <Link to="/escape-finder" className="hover:text-lime">Escape Finder</Link>
          <Link to="/about" className="hover:text-lime">About</Link>
        </div>
      </div>
      <p className="border-t border-white/10 py-3 text-center text-xs">Educational demo. Budgets are rough estimates, not live prices.</p>
    </footer>
  )
}
