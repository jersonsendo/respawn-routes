export const MOODS = {
  'Chill and Recharge': ['chill', 'relax', 'peaceful', 'sunset', 'beach'],
  'Gaming and Entertainment': ['gaming', 'arcade', 'movies', 'entertainment'],
  'Anime and Pop Culture': ['anime', 'pop culture', 'collectibles', 'movies'],
  'Sports and Adventure': ['basketball', 'sports', 'adventure', 'hiking', 'canyoneering'],
  'Nature and Exploration': ['nature', 'waterfalls', 'hiking', 'photography', 'exploration', 'outdoors'],
  'Camping and the Outdoors': ['camping', 'outdoors', 'hiking', 'nature', 'adventure'],
}

// Highest amount (pesos) allowed by each budget choice.
export const BUDGETS = {
  'Under ₱500': 500,
  '₱500–₱1,000': 1000,
  '₱1,001–₱2,000': 2000,
  'Above ₱2,000': Infinity,
}

// Longest trip (hours) allowed by each time choice.
export const TIMES = { 'A Few Hours': 4, 'One Day': 12, Weekend: 72 }

export const SETTINGS = ['Beach', 'Mountains', 'City', 'Nature', 'Entertainment Venues']

// Stores what the user picked in the Escape Finder and decides if a Destination matches.
// An empty string means "no preference" for that field.
export default class UserPreferences {
  constructor({ interests = [], budget = '', availableTime = '', preferredSetting = '', travelMood = '' } = {}) {
    this.travelMood = travelMood
    this.availableTime = availableTime
    this.budget = budget
    this.preferredSetting = preferredSetting
    this.interests = interests.length ? interests : MOODS[travelMood] ?? []
  }

  isEmpty() {
    return !this.travelMood && !this.availableTime && !this.budget && !this.preferredSetting
  }

  fitsBudget(cost) { return !this.budget || cost <= BUDGETS[this.budget] }
  fitsTime(hours) { return !this.availableTime || hours <= TIMES[this.availableTime] }
  matchesSetting(category) { return !this.preferredSetting || category === this.preferredSetting }
  sharedInterests(interests) { return this.interests.filter((i) => interests.includes(i)) }

  matchesMood(destination) {
    if (!this.travelMood) return true
    if (this.travelMood === 'Camping and the Outdoors') {
      return destination.interests.includes('camping') || destination.interests.includes('outdoors')
    }
    return this.sharedInterests(destination.interests).length > 0
  }

  // A destination matches when it passes every filter the user filled in.
  matchesDestination(d) {
    return (
      this.fitsBudget(d.estimatedBudget) &&
      this.fitsTime(d.duration) &&
      this.matchesSetting(d.category) &&
      this.matchesMood(d)
    )
  }

  // Higher score = better match (more shared interests).
  score(d) { return this.sharedInterests(d.interests).length }

  // Plain-language reasons shown on each recommendation card.
  explain(d) {
    const reasons = []
    if (this.travelMood) reasons.push(`Fits your "${this.travelMood}" mood through: ${this.sharedInterests(d.interests).join(', ')}.`)
    if (this.preferredSetting) reasons.push(`It is a ${this.preferredSetting.toLowerCase()} setting, as you chose.`)
    if (this.budget) reasons.push(`Estimated ${d.getBudgetLabel()} is within "${this.budget}".`)
    if (this.availableTime) reasons.push(`About ${d.getDurationLabel()} fits "${this.availableTime}".`)
    return reasons
  }
}
