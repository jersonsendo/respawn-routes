import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import ItineraryItem from '../models/ItineraryItem.js'
import TravelPlan from '../models/TravelPlan.js'
import UserPreferences from '../models/UserPreferences.js'

const AppContext = createContext(null)

// useState that also saves its value in localStorage so it survives a page refresh.
function useStoredState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : initial
    } catch {
      return initial
    }
  })
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* storage unavailable */ }
  }, [key, value])
  return [value, setValue]
}

export function AppProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useStoredState('rr-favorites', [])
  const [savedItems, setSavedItems] = useStoredState('rr-itinerary', [])
  const [savedPrefs, setSavedPrefs] = useStoredState('rr-preferences', null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!message) return
    const timer = setTimeout(() => setMessage(''), 2500)
    return () => clearTimeout(timer)
  }, [message])

  // Turn the saved plain objects back into class instances.
  const plan = useMemo(() => new TravelPlan('my-plan', savedItems.map((i) => new ItineraryItem(i))), [savedItems])
  const preferences = useMemo(() => (savedPrefs ? new UserPreferences(savedPrefs) : null), [savedPrefs])

  const isFavorite = (id) => favoriteIds.includes(id)

  const toggleFavorite = (id) => {
    setMessage(isFavorite(id) ? 'Removed from favorites' : 'Saved to favorites')
    setFavoriteIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  // Duplicates are blocked and the user is told why.
  const addToItinerary = (item) => {
    if (plan.hasItem(item.id)) {
      setMessage(`${item.name} is already in your itinerary`)
      return false
    }
    setSavedItems((prev) => [...prev, { ...item }])
    setMessage(`Added ${item.name} to your itinerary`)
    return true
  }

  const removeFromItinerary = (id) => setSavedItems((prev) => prev.filter((i) => i.id !== id))
  const clearItinerary = () => setSavedItems([])
  const savePreferences = useCallback((prefs) => setSavedPrefs(prefs ? { ...prefs } : null), [setSavedPrefs])

  const value = { favoriteIds, isFavorite, toggleFavorite, plan, addToItinerary, removeFromItinerary, clearItinerary, preferences, savePreferences, message }
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
