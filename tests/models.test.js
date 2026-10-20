import test from 'node:test'
import assert from 'node:assert/strict'
import ItineraryItem from '../src/models/ItineraryItem.js'
import TravelPlan from '../src/models/TravelPlan.js'
import Destination from '../src/models/Destination.js'

const destination = new Destination({
  id: 'test-destination',
  name: 'Test Trail',
  location: 'Cebu',
  category: 'Mountains',
  description: 'A test hiking destination.',
  image: '/images/osmena.jpg',
  estimatedBudget: 700,
  duration: 6,
})

test('destination search matches names and locations without case sensitivity', () => {
  assert.equal(destination.matchesSearch('test trail'), true)
  assert.equal(destination.matchesSearch('CEBU'), true)
  assert.equal(destination.matchesSearch('no match'), false)
  assert.equal(destination.matchesSearch('  '), true)
})

test('travel plan blocks duplicates and recalculates totals after changes', () => {
  const destinationItem = ItineraryItem.fromDestination(destination)
  const campingItem = new ItineraryItem({
    itemType: 'experience',
    referenceId: 'camping',
    name: 'Overnight camping',
    estimatedCost: 800,
    duration: 24,
  })
  const plan = new TravelPlan()

  assert.equal(plan.addItem(destinationItem), true)
  assert.equal(plan.addItem(destinationItem), false)
  assert.equal(plan.addItem(campingItem), true)
  assert.equal(plan.getItemCount(), 2)
  assert.equal(plan.totalBudget, 1500)
  assert.equal(plan.totalDuration, 30)

  plan.removeItem(destinationItem.id)
  assert.equal(plan.getItemCount(), 1)
  assert.equal(plan.totalBudget, 800)
  assert.equal(plan.totalDuration, 24)

  plan.clear()
  assert.equal(plan.getItemCount(), 0)
  assert.equal(plan.totalBudget, 0)
  assert.equal(plan.totalDuration, 0)
})
