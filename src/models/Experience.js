import { peso, formatDuration } from '../utils/format.js'

// An activity tied to one Destination through `destinationId`. `duration` is in HOURS.
export default class Experience {
  constructor({ id, name, category, description, destinationId, estimatedCost, duration, interests = [] }) {
    this.id = id
    this.name = name
    this.category = category
    this.description = description
    this.destinationId = destinationId
    this.estimatedCost = estimatedCost
    this.duration = duration
    this.interests = interests
  }

  getCostLabel() { return peso(this.estimatedCost) }
  getDurationLabel() { return formatDuration(this.duration) }

  matchesSearch(query) {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return [this.name, this.category, this.description, ...this.interests]
      .join(' ').toLowerCase().includes(q)
  }
}
