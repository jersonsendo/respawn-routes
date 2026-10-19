// Small helper functions used by the models and the pages.
export const peso = (amount) => `₱${Number(amount).toLocaleString('en-PH')}`

export function formatDuration(hours) {
  if (hours < 1) return `${Math.round(hours * 60)} min`
  if (hours <= 12) return `${hours} hr${hours === 1 ? '' : 's'}`
  const days = Math.round((hours / 24) * 10) / 10
  return `${days} day${days === 1 ? '' : 's'}`
}
