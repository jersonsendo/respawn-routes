// One row in the trip plan. It copies the name/cost/duration of a Destination or Experience.
export default class ItineraryItem {
  constructor({ id, itemType, referenceId, name, estimatedCost, duration }) {
    this.id = id ?? `${itemType}-${referenceId}` // unique key, also used to stop duplicates
    this.itemType = itemType // 'destination' | 'experience'
    this.referenceId = referenceId
    this.name = name
    this.estimatedCost = estimatedCost
    this.duration = duration
  }

  static fromDestination(d) {
    return new ItineraryItem({ itemType: 'destination', referenceId: d.id, name: d.name, estimatedCost: d.estimatedBudget, duration: d.duration })
  }

  static fromExperience(e) {
    return new ItineraryItem({ itemType: 'experience', referenceId: e.id, name: e.name, estimatedCost: e.estimatedCost, duration: e.duration })
  }
}
