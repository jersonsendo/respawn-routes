import { peso, formatDuration } from '../utils/format.js'

// A place a traveller can visit. `duration` is the recommended trip length in HOURS.
export default class Destination {
  constructor({
    id, name, location, category, description, image,
    interests = [], estimatedBudget, duration,
    activities = [], travelTips = [], atmosphere,
  }) {
    this.id = id
    this.name = name
    this.location = location
    this.category = category // Beach | Mountains | City | Nature | Entertainment Venues
    this.description = description
    this.image = image
    this.interests = interests
    this.estimatedBudget = estimatedBudget // pesos per person
    this.duration = duration // hours
    this.activities = activities
    this.travelTips = travelTips
    this.atmosphere = atmosphere
  }

  getBudgetLabel() { return peso(this.estimatedBudget) }
  getDurationLabel() { return formatDuration(this.duration) }

  matchesSearch(query) {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return [this.name, this.location, this.category, this.description, ...this.interests]
      .join(' ').toLowerCase().includes(q)
  }
}
