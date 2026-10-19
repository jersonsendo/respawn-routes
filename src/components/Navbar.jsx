import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Compass, Menu, X } from 'lucide-react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/explore', label: 'Explore' },
  { to: '/escape-finder', label: 'Escape Finder' },
  { to: '/experiences', label: 'Experiences' },
  { to: '/planner', label: 'Trip Planner' },
  { to: '/favorites', label: 'Favorites' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${isActive ? 'bg-teal text-white' : 'text-ink hover:bg-teal-soft'}`

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-extrabold text-ink" onClick={() => setOpen(false)}>
          <Compass className="h-6 w-6 text-teal" aria-hidden="true" /> Respawn Routes
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass}>{l.label}</NavLink>
          ))}
        </nav>
        <button className="rounded-lg p-2 text-ink lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="container-page flex flex-col gap-1 pb-4 lg:hidden" aria-label="Mobile navigation">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={linkClass} onClick={() => setOpen(false)}>{l.label}</NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
