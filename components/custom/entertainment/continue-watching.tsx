import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Play,
  Film,
  Clock,
  Trash,
} from "lucide-react"
import { Button } from "@/components/ui/button"

// helper
import { IMAGE_BASE_URL } from "@/constants/image-size"

// hooks
import type { WatchProgress } from "@/hooks/entertainment/progress-tracker/useWatchTracker"
import { useFetchMovieDetails } from "@/hooks/entertainment/fetch/movies/useFetchMovieDetails"
import { useFetchTvDetails } from "@/hooks/entertainment/fetch/tv-series/useFetchTvDetails"
import { useEntertainmentMode } from "@/features/zustand/entertainment/entertaiment-mode"
import { useTvEpisodeStore } from "@/features/zustand/entertainment/tv-episode-store"
import { buildWatchMoviePath, buildWatchTvPath } from "@/lib/utils"

function ContinueWatchingCard({ item }: { item: WatchProgress }) {
  const isTv = item.mode === "TV series"
  const { data: movie } = useFetchMovieDetails(isTv ? "" : item.mediaId)
  const { data: tvShow } = useFetchTvDetails(isTv ? item.mediaId : "")
  const { setSeasonAndEpisode } = useTvEpisodeStore()

  const mediaName = isTv ? tvShow?.name : movie?.title
  const displayTitle = mediaName || item.title || `Media ${item.mediaId}`

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
      href={
        isTv
          ? buildWatchTvPath(item.mediaId, displayTitle)
          : buildWatchMoviePath(item.mediaId, displayTitle)
      }
      className="group block w-full"
      onClick={handleClick}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
        {/* Poster */}
        {imagePath ? (
          <Image
            src={`${IMAGE_BASE_URL}${imagePath}`}
            alt={displayTitle}
            fill
            sizes="(max-width: 640px) 140px, 165px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Film className="h-10 w-10 text-zinc-700" />
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Continue badge */}
        <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-primary/90 px-2 py-0.5 text-[9px] font-bold tracking-wider text-primary-foreground uppercase shadow-sm backdrop-blur-sm">
          <Play className="h-2.5 w-2.5 fill-current" />
          Continue
        </div>

        {/* Play icon on hover */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30">
            <Play className="ml-0.5 h-5 w-5 fill-current" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-zinc-700/60">
          <div
            className="h-full bg-primary transition-all"
            style={{
              width: `${Math.min(Math.max(item.percentage, 0), 100)}%`,
            }}
          />
        </div>
      </div>

      {/* Info below poster */}
      <div className="mt-2 w-full space-y-0.5">
        <p className="line-clamp-1 text-sm font-bold text-foreground transition-colors group-hover:text-primary">
          {displayTitle}
        </p>
        <div className="flex items-center justify-between text-[10px] text-zinc-500">
          <div className="flex items-center gap-1">
            {isTv && item.season && item.episode && (
              <span className="font-semibold text-primary/80">
                S{item.season} E{item.episode}
              </span>
            )}
            <div className="flex items-center gap-0.5">
              <Clock className="h-2.5 w-2.5" />
              <span>
                {Math.floor(item.currentTime / 60)}
                {item.duration > 0
                  ? ` / ${Math.floor(item.duration / 60)}m`
                  : "m"}
              </span>
            </div>
          </div>
          <span className="font-bold text-primary">
            {Math.floor(item.percentage)}%
          </span>
        </div>
      </div>
    </Link>
  )
}

export function ContinueWatching() {
  const [history, setHistory] = useState<WatchProgress[]>([])
  const [isExpanded, setIsExpanded] = useState(false)
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
        setHistory(sorted)
      } catch {
        setHistory([])
      }
    }

    readHistory()

    const onStorage = (e: StorageEvent) => {
      if (e.key === "watchHistory") readHistory()
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const filteredHistory = history.filter((item) => item.mode === mode)

  if (filteredHistory.length === 0) return null

  const displayItems = isExpanded
    ? filteredHistory
    : filteredHistory.slice(0, 5)

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Left: header */}
        <div className="flex items-center gap-1.5">
          <Play className="h-4 w-4 fill-current text-primary" />
          <h2 className="text-sm font-bold tracking-wide text-foreground">
            Continue Watching
          </h2>
        </div>

        {/* Right: clear */}
        <Button
          variant="ghost"
          size="xs"
          className="group flex items-center gap-1.5 rounded-full border border-red-500/20 px-2.5 py-1 text-[10px] text-red-400/70 transition-all hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 sm:text-xs"
          onClick={() => {
            localStorage.removeItem("watchHistory")
            setHistory([])
          }}
        >
          <Trash className="h-3 w-3 transition-transform group-hover:scale-110" />
          <span className="hidden font-medium sm:inline">Clear History</span>
        </Button>
      </div>

      {/* Responsive Grid layout */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {displayItems.map((item) => (
          <ContinueWatchingCard key={item.mediaId} item={item} />
        ))}
      </div>

      {/* See More / Show Less Button */}
      {filteredHistory.length > 5 && (
        <div className="flex justify-center pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="border-zinc-700 bg-black/40 text-xs font-semibold text-white backdrop-blur-md hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
          >
            {isExpanded ? "Show Less" : `See More (${filteredHistory.length - 5} more)`}
          </Button>
        </div>
      )}
    </div>
  )
}
