import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import experiences, { EXPERIENCE_CATEGORIES } from '../data/experiences.js'
import ExperienceCard from '../components/ExperienceCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import PageHeader from '../components/PageHeader.jsx'

export default function Experiences() {
  const [params] = useSearchParams()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(params.get('category') ?? 'All')

  const results = experiences
    .filter((e) => e.matchesSearch(search))
    .filter((e) => category === 'All' || e.category === category)

  return (
    <>
      <PageHeader title="Experiences" subtitle="Activities grouped by mood. Entries marked “Sample” are fictional demo data, not real venues." />
      <div className="container-page mt-6">
        <div className="card grid gap-3 p-4 sm:grid-cols-2">
          <div>
            <label htmlFor="exp-search" className="mb-1 block text-sm font-semibold text-ink">Search</label>
            <input id="exp-search" className="field" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Name or interest" />
          </div>
          <div>
            <label htmlFor="exp-cat" className="mb-1 block text-sm font-semibold text-ink">Category</label>
            <select id="exp-cat" className="field" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>All</option>
              {EXPERIENCE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        {results.length === 0 ? (
          <div className="mt-6"><EmptyState title="No experiences found" text="Try another keyword or category." /></div>
        ) : (
          EXPERIENCE_CATEGORIES.map((c) => {
            const group = results.filter((e) => e.category === c)
            if (group.length === 0) return null
            return (
              <section key={c} className="mt-8">
                <h2 className="text-2xl font-extrabold">{c}</h2>
                <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{group.map((e) => <ExperienceCard key={e.id} experience={e} />)}</div>
              </section>
            )
          })
        )}
      </div>
    </>
  )
}
