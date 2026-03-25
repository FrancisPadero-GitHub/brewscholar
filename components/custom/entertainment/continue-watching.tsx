import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, Film, Clock, Trash } from "lucide-react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// helper
import { IMAGE_BASE_URL } from "@/constants/image-size"

// hooks
import type { WatchProgress } from "@/hooks/entertainment/progress-tracker/useWatchTracker"
import { useFetchMovieDetails } from "@/hooks/entertainment/fetch/useFetchMovieDetails"

function ContinueWatchingCard({ item }: { item: WatchProgress }) {
  const { data: movie } = useFetchMovieDetails(item.mediaId)

  const displayTitle = movie?.title || item.title || `Media ${item.mediaId}`

  // Use poster path to match the aspect-2/3 ratio of regular movie cards
  const imagePath = movie?.poster_path || movie?.backdrop_path

  return (
    <Link href={`/entertainment/watch/${item.mediaId}`} className="group block">
      <Card className="flex h-full flex-col gap-0 overflow-hidden border-border bg-muted p-0 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/5">
        <div className="relative aspect-2/3 overflow-hidden bg-muted">
          {imagePath ? (
            <Image
              src={`${IMAGE_BASE_URL}${imagePath}`}
              alt={displayTitle}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Film className="h-10 w-10 text-muted" />
            </div>
          )}

          {/* linear overlay on hover */}
          <div className="absolute inset-0 bg-linear-to-t from-muted via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Continue indicator badge */}
          <div className="absolute top-2 left-2 flex items-center gap-1 rounded-sm bg-primary/90 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-primary-foreground uppercase shadow-sm backdrop-blur-sm">
            <Play className="h-2.5 w-2.5 fill-current" />
            Continue
          </div>

          {/* Play Icon Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
              <Play className="ml-1 h-6 w-6 fill-current" />
            </div>
          </div>

          {/* Progress Bar fixed at bottom of image overlay */}
          <div className="absolute right-0 bottom-0 left-0 h-1.5 bg-secondary/60 backdrop-blur-xs">
            <div
              className="h-full bg-primary"
              style={{
                width: `${Math.min(Math.max(item.percentage, 0), 100)}%`,
              }}
            />
          </div>
        </div>

        <CardHeader className="p-3 pb-3">
          <CardTitle className="line-clamp-1 text-sm leading-tight font-bold text-foreground transition-colors group-hover:text-primary">
            {displayTitle}
          </CardTitle>
          <div className="mt-1.5 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span className="font-medium">
                {Math.floor(item.currentTime / 60)}{" "}
                {item.duration > 0
                  ? `/ ${Math.floor(item.duration / 60)}m`
                  : "m"}
              </span>
            </div>
            <span className="font-bold text-primary">
              {Math.floor(item.percentage)}%
            </span>
          </div>
        </CardHeader>
      </Card>
    </Link>
  )
}

export function ContinueWatching() {
  const [history, setHistory] = useState<WatchProgress[]>([])

  useEffect(() => {
    const readHistory = () => {
      const stored = localStorage.getItem("watchHistory")
      if (!stored) {
        setHistory([])
        return
      }
      try {
        const parsed: Record<string, WatchProgress> = JSON.parse(stored)
        const sorted = Object.values(parsed).sort(
          (a, b) => b.updatedAt - a.updatedAt
        )
        setHistory(sorted.slice(0, 5))
      } catch {
        setHistory([])
      }
    }

    // initial read (replace existing inline logic with this)
    readHistory()

    const onStorage = (e: StorageEvent) => {
      if (e.key === "watchHistory") readHistory()
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  if (history.length === 0) return null

  return (
    <div className="mb-8 space-y-4">
      <div className="flex items-center justify-between">
        {/* Left: Continue Watching */}
        <div className="flex items-center gap-2">
          <Play className="h-4 w-4 fill-current text-primary" />
          <h2 className="text-sm font-semibold tracking-widest text-primary uppercase">
            Continue Watching
          </h2>
        </div>

        {/* Right: Clear Watch History */}
        <Button
          variant="ghost"
          size="xs"
          className="group flex items-center gap-2 rounded-full border border-destructive/30 px-3 py-1.5 text-destructive/70 transition-all duration-200 hover:border-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={() => {
            localStorage.removeItem("watchHistory")
            setHistory([])
          }}
        >
          <Trash className="h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-110" />
          <span className="text-xs font-medium tracking-wide">
            Clear History
          </span>
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {history.map((item) => (
          <ContinueWatchingCard key={item.mediaId} item={item} />
        ))}
      </div>
    </div>
  )
}
