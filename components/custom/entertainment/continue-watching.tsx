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
import { useFetchMovieDetails } from "@/hooks/entertainment/fetch/movies/useFetchMovieDetails"
import { useFetchTvDetails } from "@/hooks/entertainment/fetch/tv-series/useFetchTvDetails"
import { useEntertainmentMode } from "@/features/zustand/entertainment/entertaiment-mode"
import { useTvEpisodeStore } from "@/features/zustand/entertainment/tv-episode-store"

function ContinueWatchingCard({ item }: { item: WatchProgress }) {
  const isTv = item.mode === "TV series"
  const { data: movie } = useFetchMovieDetails(isTv ? "" : item.mediaId)
  const { data: tvShow } = useFetchTvDetails(isTv ? item.mediaId : "")
  const { setSeasonAndEpisode } = useTvEpisodeStore()

  const mediaName = isTv ? tvShow?.name : movie?.title
  const displayTitle = mediaName || item.title || `Media ${item.mediaId}`

  // Use poster path to match the aspect-2/3 ratio of regular movie cards
  const imagePath = isTv
    ? tvShow?.poster_path || tvShow?.backdrop_path
    : movie?.poster_path || movie?.backdrop_path

  const handleClick = () => {
    if (isTv && item.season && item.episode) {
      setSeasonAndEpisode(item.season, item.episode)
    }
  }

  return (
    <Link
      href={`/entertainment/${isTv ? "watch-tv" : "watch-movie"}/${item.mediaId}`}
      className="group block"
      onClick={handleClick}
    >
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
          {isTv && item.season && item.episode && (
            <div className="mt-0.5 text-[10px] font-semibold text-muted-foreground">
              S{item.season} E{item.episode}
            </div>
          )}
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
  const { mode } = useEntertainmentMode()

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

  const filteredHistory = history.filter((item) => item.mode === mode)

  if (filteredHistory.length === 0) return null

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Left: Continue Watching */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Play className="h-3.5 w-3.5 fill-current text-primary sm:h-4 sm:w-4" />
          <h2 className="text-xs font-semibold tracking-widest text-primary uppercase sm:text-sm">
            Continue Watching
          </h2>
        </div>

        {/* Right: Clear Watch History */}
        <Button
          variant="ghost"
          size="xs"
          className="group xs:justify-end flex items-center gap-1 rounded-full border border-destructive/30 px-2.5 py-1 text-[10px] text-destructive/70 transition-all duration-200 hover:border-destructive hover:bg-destructive/10 hover:text-destructive sm:gap-2 sm:text-xs"
          onClick={() => {
            localStorage.removeItem("watchHistory")
            setHistory([])
          }}
        >
          <Trash className="h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-110" />
          <span className="hidden text-xs font-medium tracking-wide sm:inline">
            Clear History
          </span>
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filteredHistory.map((item) => (
          <ContinueWatchingCard key={item.mediaId} item={item} />
        ))}
      </div>
    </div>
  )
}
