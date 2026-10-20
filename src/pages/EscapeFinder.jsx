import { useState } from 'react'
import { RotateCcw, Sparkles } from 'lucide-react'
import destinations from '../data/destinations.js'
import experiences from '../data/experiences.js'
import UserPreferences, { BUDGETS, MOODS, SETTINGS, TIMES } from '../models/UserPreferences.js'
import DestinationCard from '../components/DestinationCard.jsx'
import ExperienceCard from '../components/ExperienceCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { useApp } from '../context/AppContext.jsx'

const emptyForm = { travelMood: '', availableTime: '', budget: '', preferredSetting: '' }

function Choice({ legend, name, options, value, onChange }) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-bold text-ink">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm font-semibold ${value === o ? 'border-teal bg-teal text-white' : 'border-ink/20 bg-white text-ink hover:bg-teal-soft'}`}>
            <input type="radio" name={name} value={o} checked={value === o} onChange={() => onChange(o)} className="sr-only" />
            {o}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export default function EscapeFinder() {
  const { preferences, savePreferences } = useApp()
  const [form, setForm] = useState(preferences ? { ...emptyForm, ...preferences } : emptyForm)
  const [submitted, setSubmitted] = useState(preferences ?? null)

  const set = (field) => (value) => setForm((f) => ({ ...f, [field]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const prefs = new UserPreferences(form)
    savePreferences(prefs)
    setSubmitted(prefs)
  }

  const handleReset = () => { setForm(emptyForm); setSubmitted(null); savePreferences(null) }

  const prefs = submitted ? new UserPreferences(submitted) : null
  const matches = prefs
    ? destinations.filter((d) => prefs.matchesDestination(d)).sort((a, b) => prefs.score(b) - prefs.score(a) || a.estimatedBudget - b.estimatedBudget)
    : []
  const matchIds = matches.map((d) => d.id)
  const extraExperiences = prefs
    ? experiences.filter((e) => matchIds.includes(e.destinationId) && prefs.fitsBudget(e.estimatedCost))
    : []

  return (
    <>
      <PageHeader title="Choose Your Escape" subtitle="Tell us your mood, time, budget and setting—from a quiet beach break to a mountain hike or camping trip. We match your choices to the destinations and activities in the app." />
      <div className="container-page mt-6">
        <form onSubmit={handleSubmit} className="card space-y-5 p-5">
          <Choice legend="Travel mood" name="mood" options={Object.keys(MOODS)} value={form.travelMood} onChange={set('travelMood')} />
          <Choice legend="Available time" name="time" options={Object.keys(TIMES)} value={form.availableTime} onChange={set('availableTime')} />
          <Choice legend="Budget" name="budget" options={Object.keys(BUDGETS)} value={form.budget} onChange={set('budget')} />
          <Choice legend="Preferred setting" name="setting" options={SETTINGS} value={form.preferredSetting} onChange={set('preferredSetting')} />
          <div className="flex flex-wrap gap-3">
            <button className="btn-accent px-6"><Sparkles className="h-4 w-4" aria-hidden="true" /> Find my escape</button>
            <button type="button" className="btn-outline" onClick={handleReset}><RotateCcw className="h-4 w-4" aria-hidden="true" /> Reset</button>
          </div>
        </form>

        <div className="mt-8" aria-live="polite">
          {!prefs && <p className="text-center text-slate-600">Pick at least one option above, then press “Find my escape”. Leave a group blank if you have no preference.</p>}
          {prefs && prefs.isEmpty() && <EmptyState title="Nothing selected yet" text="Choose at least one preference so we can narrow things down." />}
          {prefs && !prefs.isEmpty() && matches.length === 0 && (
            <EmptyState title="No matching escapes" text="No destination fits every choice. Try a bigger budget, more time, or fewer filters." >
              <button className="btn-primary" onClick={handleReset}>Reset choices</button>
            </EmptyState>
          )}
          {prefs && !prefs.isEmpty() && matches.length > 0 && (
            <>
              <h2 className="text-2xl font-extrabold">{matches.length} escape{matches.length === 1 ? '' : 's'} for you</h2>
              <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {matches.map((d) => <DestinationCard key={d.id} destination={d} reasons={prefs.explain(d)} />)}
              </div>
              {extraExperiences.length > 0 && (
                <>
                  <h2 className="mt-10 text-2xl font-extrabold">Experiences at these places</h2>
                  <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {extraExperiences.map((e) => <ExperienceCard key={e.id} experience={e} />)}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
