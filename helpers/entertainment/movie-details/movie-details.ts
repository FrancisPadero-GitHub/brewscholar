export function getRatingColor(rating: number) {
  if (rating >= 8) return "text-emerald-400"
  if (rating >= 6.5) return "text-amber-400"
  return "text-rose-400"
}

export function formatRuntime(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

export function formatCurrency(amount: number) {
  if (!amount) return "N/A"
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amount)
}
