import { Link } from 'react-router-dom'
import { Download, Trash2 } from 'lucide-react'
import EmptyState from '../components/EmptyState.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { useApp } from '../context/AppContext.jsx'
import { formatDuration, peso } from '../utils/format.js'

export default function Planner() {
  const { plan, removeFromItinerary, clearItinerary } = useApp()

  const handleExport = () => {
    const content = [
      'Respawn Routes - Trip Plan',
      `Created: ${new Date().toLocaleDateString()}`,
      '',
      ...plan.items.flatMap((item, index) => [
        `${index + 1}. ${item.name} (${item.itemType})`,
        `   Estimated cost: ${peso(item.estimatedCost)}`,
        `   Estimated duration: ${formatDuration(item.duration)}`,
        '',
      ]),
      `Estimated total cost: ${peso(plan.totalBudget)}`,
      `Estimated total duration: ${formatDuration(plan.totalDuration)}`,
      '',
      'Budgets and durations are estimates, not live prices or travel times.',
    ].join('\n')
    const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'respawn-routes-itinerary.txt'
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const handleClear = () => {
    if (window.confirm('Remove everything from your itinerary?')) clearItinerary()
  }

  return (
    <>
      <PageHeader title="Trip Planner" subtitle="Your itinerary is saved in this browser." />
      <div className="container-page mt-6">
        {plan.getItemCount() === 0 ? (
          <EmptyState title="Your itinerary is empty" text="Add destinations or experiences to start planning.">
            <Link to="/explore" className="btn-primary">Explore destinations</Link>
            <Link to="/escape-finder" className="btn-outline">Use the Escape Finder</Link>
          </EmptyState>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            <ul className="space-y-3 lg:col-span-2">
              {plan.items.map((item) => (
                <li key={item.id} className="card flex items-center justify-between gap-3 p-4">
                  <div>
                    <p className="font-bold text-ink">{item.name}</p>
                    <p className="text-sm text-slate-500">{item.itemType === 'destination' ? 'Destination' : 'Experience'} · {peso(item.estimatedCost)} · {formatDuration(item.duration)}</p>
                  </div>
                  <button className="btn-danger" onClick={() => removeFromItinerary(item.id)} aria-label={`Remove ${item.name}`}><Trash2 className="h-4 w-4" aria-hidden="true" /> Remove</button>
                </li>
              ))}
            </ul>
            <aside className="card h-fit space-y-2 p-5">
              <h2 className="text-xl font-bold">Trip summary</h2>
              <p className="flex justify-between"><span>Items</span><strong>{plan.getItemCount()}</strong></p>
              <p className="flex justify-between"><span>Estimated total cost</span><strong>{peso(plan.totalBudget)}</strong></p>
              <p className="flex justify-between"><span>Estimated duration</span><strong>{formatDuration(plan.totalDuration)}</strong></p>
              <button className="btn-outline mt-3 w-full" onClick={handleExport}><Download className="h-4 w-4" aria-hidden="true" /> Download itinerary</button>
              <button className="btn-danger mt-3 w-full" onClick={handleClear}>Clear itinerary</button>
            </aside>
          </div>
        )}
      </div>
    </>
  )
}
