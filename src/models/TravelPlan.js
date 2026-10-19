// A trip plan: a list of ItineraryItems. Totals are recalculated from the items.
export default class TravelPlan {
  constructor(id = 'my-plan', items = []) {
    this.id = id
    this.items = [...items]
    this.totalBudget = 0
    this.totalDuration = 0
    this.recalculate()
  }

  recalculate() {
    this.totalBudget = this.items.reduce((sum, item) => sum + item.estimatedCost, 0)
    this.totalDuration = this.items.reduce((sum, item) => sum + item.duration, 0)
  }

  hasItem(id) { return this.items.some((item) => item.id === id) }

  // Returns false (and changes nothing) when the item is already in the plan.
  addItem(item) {
    if (this.hasItem(item.id)) return false
    this.items.push(item)
    this.recalculate()
    return true
  }

  removeItem(id) {
    this.items = this.items.filter((item) => item.id !== id)
    this.recalculate()
  }

  clear() {
    this.items = []
    this.recalculate()
  }

  getItemCount() { return this.items.length }
}
