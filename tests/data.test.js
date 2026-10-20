import test from 'node:test'
import assert from 'node:assert/strict'
import destinations from '../src/data/destinations.js'
import experiences from '../src/data/experiences.js'
import UserPreferences from '../src/models/UserPreferences.js'

test('destination and experience identifiers are unique', () => {
  assert.equal(new Set(destinations.map((destination) => destination.id)).size, destinations.length)
  assert.equal(new Set(experiences.map((experience) => experience.id)).size, experiences.length)
})

test('every experience points to an existing destination', () => {
  const destinationIds = new Set(destinations.map((destination) => destination.id))
  for (const experience of experiences) {
    assert.ok(destinationIds.has(experience.destinationId), `${experience.name} must reference a destination`)
  }
})

test('outdoor mood recommends Osmeña Peak with a useful match explanation', () => {
  const destination = destinations.find((item) => item.id === 'osmena-peak')
  const preferences = new UserPreferences({
    travelMood: 'Camping and the Outdoors',
    preferredSetting: 'Mountains',
  })

  assert.ok(destination)
  assert.equal(preferences.matchesDestination(destination), true)
  assert.match(preferences.explain(destination).join(' '), /camping|outdoors|hiking/i)
})

test('camping information stays unverified until a source is recorded', () => {
  const destination = destinations.find((item) => item.id === 'osmena-peak')

  assert.ok(destination?.campingVerification)
  assert.equal(destination.campingVerification.status, 'unverified')
  assert.equal(destination.campingVerification.sourceName, '')
  assert.equal(destination.campingVerification.sourceUrl, '')
  assert.equal(destination.campingVerification.lastVerified, '')
  assert.match(destination.campingVerification.notes, /independently confirmed/i)
})

test('camping experience links to the destination carrying its verification status', () => {
  const experience = experiences.find((item) => item.id === 'exp-osmena-camping')
  const destination = destinations.find((item) => item.id === experience?.destinationId)

  assert.ok(experience)
  assert.equal(destination?.id, 'osmena-peak')
  assert.equal(destination.campingVerification.status, 'unverified')
  assert.match(experience.description, /availability is not verified/i)
})
