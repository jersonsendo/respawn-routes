import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import destinations, { DESTINATION_CATEGORIES } from '../data/destinations.js'
import { BUDGETS } from '../models/UserPreferences.js'
import DestinationCard from '../components/DestinationCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import PageHeader from '../components/PageHeader.jsx'

export default function Explore() {
  const [params, setParams] = useSearchParams()
  const queryParam = params.get('q') ?? ''
  const categoryParam = params.get('category') ?? 'All'
  const [search, setSearch] = useState(queryParam)
  const [category, setCategory] = useState(categoryParam)
  const [budget, setBudget] = useState('Any')
  const [sort, setSort] = useState('name')

  useEffect(() => setSearch(queryParam), [queryParam])
  useEffect(() => {
    setCategory(DESTINATION_CATEGORIES.includes(categoryParam) ? categoryParam : 'All')
  }, [categoryParam])

  const results = destinations
    .filter((d) => d.matchesSearch(search))
    .filter((d) => category === 'All' || d.category === category)
    .filter((d) => budget === 'Any' || d.estimatedBudget <= BUDGETS[budget])
    .sort((a, b) => {
      if (sort === 'budget-low') return a.estimatedBudget - b.estimatedBudget
      if (sort === 'budget-high') return b.estimatedBudget - a.estimatedBudget
      return a.name.localeCompare(b.name)
    })

  const reset = () => {
    setSearch('')
    setCategory('All')
    setBudget('Any')
    setSort('name')
    setParams({})
  }

  return (
    <>
      <PageHeader title="Explore Destinations" subtitle="Search and filter affordable places around Cebu and the Philippines." />
      <div className="container-page mt-6">
        <div className="card grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label htmlFor="search" className="mb-1 block text-sm font-semibold text-ink">Search</label>
            <input id="search" className="field" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Name, place or interest" />
          </div>
          <div>
            <label htmlFor="category" className="mb-1 block text-sm font-semibold text-ink">Category</label>
            <select id="category" className="field" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>All</option>
              {DESTINATION_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="budget" className="mb-1 block text-sm font-semibold text-ink">Budget (up to)</label>
            <select id="budget" className="field" value={budget} onChange={(e) => setBudget(e.target.value)}>
              <option>Any</option>
              {Object.keys(BUDGETS).map((b) => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="sort" className="mb-1 block text-sm font-semibold text-ink">Sort by</label>
            <select id="sort" className="field" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="name">Name (A to Z)</option>
              <option value="budget-low">Budget (low to high)</option>
              <option value="budget-high">Budget (high to low)</option>
            </select>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate-600">{results.length} destination{results.length === 1 ? '' : 's'} found</p>
        {results.length === 0 ? (
          <div className="mt-6"><EmptyState title="No destinations match" text="Try a shorter search, a different category, or a higher budget."><button className="btn-primary" onClick={reset}>Clear filters</button></EmptyState></div>
        ) : (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((d) => <DestinationCard key={d.id} destination={d} />)}
          </div>
        )}
      </div>
    </>
  )
}
