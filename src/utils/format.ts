export function formatINR(n: number): string {
  const s = String(Math.round(n))
  const last3 = s.slice(-3)
  const rest = s.slice(0, -3)
  const formatted = rest
    ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3
    : last3
  return `₹${formatted}`
}

export function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}
