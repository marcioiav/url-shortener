
export function isValidISODate(d: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/
  if (!regex.test(d)) return false
  const date = new Date(d + 'T00:00:00Z')
  return !isNaN(date.getTime())
}

export function dayBounds(dateISO: string) {
  const start = new Date(dateISO + 'T00:00:00Z')
  const end = new Date(dateISO + 'T23:59:59.999Z')
  return { start, end }
}
