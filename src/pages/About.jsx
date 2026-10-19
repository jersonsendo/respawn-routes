import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'

const features = ['Search, filter and sort destinations', 'Personalized Escape Finder with plain-language reasons', 'Experiences grouped by mood', 'Trip Planner with estimated totals', 'Favorites and a summary dashboard']
const users = ['Students and working students with limited free time', 'Gamers, anime fans, movie fans and basketball players', 'Anyone who wants an affordable local escape']
const limits = ['Educational demonstration project, not a booking system', 'No live prices, availability or maps; budgets are rough estimates', 'Entries marked “Sample Data” are fictional', 'Recommendations come from simple filtering rules, not artificial intelligence', 'Data is saved only in your browser (localStorage)']

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
        <p className="max-w-3xl">Respawn Routes is a tourism planner for people who need short, affordable breaks. It focuses on Cebu and the Philippines and helps you match a trip to your mood, time and budget.</p>
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
