import { Star } from "lucide-react"

export function StarRating({ rating }: { rating: number }) {
  const stars = Math.round(rating / 2)
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= stars
              ? "fill-amber-400 text-amber-400"
              : "fill-none text-zinc-500"
          }`}
        />
      ))}
    </div>
  )
}
