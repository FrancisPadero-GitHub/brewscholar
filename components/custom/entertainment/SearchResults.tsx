import { Star, Search, Heart, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { SearchMoviesResponse } from "@/types/entertainment/movies/search-movies"
import type { SearchTvSeriesResponse } from "@/types/entertainment/tv-series/search-tv-series"
import { IMAGE_BASE_URL } from "@/constants/image-size"
import { getRatingColor } from "@/helpers/entertainment/movie-details/movie-details"
import { Button } from "@/components/ui/button"
import { useEntertainmentMode } from "@/features/zustand/entertainment/entertaiment-mode"
import { Separator } from "@/components/ui/separator"
import { Clapperboard } from "lucide-react"
import { EntertainmentSkeleton } from "./entertainment-skeleton"

type SearchResponse = SearchMoviesResponse | SearchTvSeriesResponse

interface SearchResultsProps {
  searchResult: SearchResponse | undefined
  searchQuery: string
  isFetching: boolean
  isError: boolean
  error: Error | null
}

export default function SearchResults({
  searchResult,
  searchQuery,
  isFetching,
  isError,
  error,
}: SearchResultsProps) {
  const { mode, setMode } = useEntertainmentMode()
  const isMovie = mode === "Movie"

  if (!searchQuery) return null

  if (isFetching) {
    return (
      <div className="mb-12">
        <div className="mb-6 flex items-center gap-2">
          <Search className="h-4 w-4 animate-pulse text-primary" />
          <h2 className="text-sm font-bold tracking-wide text-foreground">
            Searching...
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          <EntertainmentSkeleton count={6} />
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="mb-12 rounded-xl border border-dashed border-red-500/30 bg-red-500/5 p-8 text-center">
        <Search className="mx-auto mb-3 h-8 w-8 text-red-400/60" />
        <p className="text-sm font-medium text-red-400">
          {error?.message || "Failed to load search results."}
        </p>
        <p className="mt-1 text-xs text-zinc-500">
          Please try your search again later.
        </p>
      </div>
    )
  }

  if (!searchResult || searchResult.results.length === 0) {
    return (
      <div className="mb-12 rounded-xl border border-dashed border-zinc-700 bg-zinc-900/30 p-8 text-center">
        <Search className="mx-auto mb-3 h-8 w-8 text-zinc-600" />
        <p className="text-sm font-medium text-foreground">
          No results found for &quot;{searchQuery}&quot;
        </p>
        <p className="mt-1 text-xs text-zinc-500">
          Try adjusting your search or explore the popular titles below.
        </p>
      </div>
    )
  }

  return (
    <div className="mb-12 space-y-5">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-bold tracking-wide text-foreground">
            Search Results
          </h2>
        </div>
        <span className="text-xs font-medium text-zinc-500">
          {searchResult.total_results} results
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {searchResult.results.map((item) => {
          const isMovieItem = "title" in item
          const label = isMovieItem
            ? item.title
            : (item as { name: string }).name
          const date = isMovieItem
            ? (item as { release_date: string }).release_date
            : (item as { first_air_date: string }).first_air_date
          const href = isMovieItem
            ? `/entertainment/movie-details/${item.id}`
            : `/entertainment/tv-series-details/${item.id}`

          return (
            <Link key={item.id} href={href} className="group block">
              <div className="relative aspect-2/3 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
                {/* Poster */}
                {item.poster_path ? (
                  <Image
                    src={`${IMAGE_BASE_URL}${item.poster_path}`}
                    alt={label}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Clapperboard className="h-10 w-10 text-zinc-700" />
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Rating badge */}
                <div
                  className={`absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-[11px] font-bold backdrop-blur-sm ${getRatingColor(item.vote_average)}`}
                >
                  <Star className="h-2.5 w-2.5 fill-current" />
                  {item.vote_average ? item.vote_average.toFixed(1) : "NR"}
                </div>

                {/* Language badge */}
                <div className="absolute top-2 left-2 rounded-sm bg-black/60 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-zinc-300 uppercase backdrop-blur-sm">
                  {item.original_language}
                </div>

                {/* Bottom hover icons */}
                <div className="absolute inset-x-0 bottom-0 translate-y-2 px-3 pb-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20">
                      <Heart className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20">
                      <Eye className="h-3.5 w-3.5 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Title + Year */}
              <div className="mt-2 space-y-0.5 px-0.5">
                <p className="line-clamp-1 text-sm font-bold text-foreground transition-colors group-hover:text-primary">
                  {label}
                </p>
                <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                  <span>{date ? date.split("-")[0] : "TBA"}</span>
                  <span>•</span>
                  <div className="flex items-center gap-0.5">
                    <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                    <span>
                      {item.vote_average ? item.vote_average.toFixed(1) : "NR"}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Mode switch suggestion */}
      <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border border-zinc-700/50 bg-zinc-900/50 p-5 sm:flex-row">
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <span className="text-sm font-medium text-foreground">
            {isMovie ? "Looking for a TV show?" : "Looking for a movie?"}
          </span>
          <span className="text-xs text-zinc-500">
            {isMovie
              ? "Try switching to TV series mode to find what you're looking for."
              : "Try switching to Movie mode to find what you're looking for."}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMode(isMovie ? "TV series" : "Movie")}
          className="shrink-0 rounded-full border-zinc-600 text-zinc-300 hover:border-primary hover:text-primary"
        >
          Switch to {isMovie ? "TV series" : "Movies"}
        </Button>
      </div>

      <Separator className="bg-zinc-800" />
    </div>
  )
}
