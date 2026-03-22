import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Film, Star, Calendar, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { SearchMoviesResponse } from "@/types/entertainment/movies/search-movies"
import { IMAGE_BASE_URL } from "@/constants/image-size"
import { getRatingColor } from "@/helpers/entertainment/movie-details/movie-details"

interface SearchResultsProps {
  searchResult: SearchMoviesResponse | undefined
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
  if (!searchQuery) return null

  if (isFetching) {
    return (
      <div className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 animate-pulse text-primary" />
            <h2 className="text-xs font-semibold tracking-widest text-primary uppercase">
              Searching...
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="aspect-2/3 animate-pulse rounded-xl bg-muted/60"
            />
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="mb-12 rounded-xl border border-dashed border-destructive/50 bg-destructive/10 p-8 text-center">
        <Search className="mx-auto mb-3 h-8 w-8 text-destructive/80" />
        <p className="text-sm font-medium text-destructive">
          {error?.message || "Failed to load search results."}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Please try your search again later.
        </p>
      </div>
    )
  }

  if (!searchResult || searchResult.results.length === 0) {
    return (
      <div className="mb-12 rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
        <Search className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
        <p className="text-sm font-medium text-foreground">
          No results found for &quot;{searchQuery}&quot;
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Try adjusting your search or explore the popular movies below.
        </p>
      </div>
    )
  }

  return (
    <div className="mb-12 space-y-5">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-primary" />
          <h2 className="text-xs font-semibold tracking-widest text-primary uppercase">
            Search Results
          </h2>
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          {searchResult.total_results} results
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {searchResult.results.map((movie) => (
          <Link
            key={movie.id}
            href={`/entertainment/movie-details/${movie.id}`}
            className="group block"
          >
            <Card className="flex h-full flex-col gap-0 overflow-hidden border-border bg-muted p-0 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/5">
              {/* Poster */}
              <div className="relative aspect-2/3 overflow-hidden bg-muted">
                {movie.poster_path ? (
                  <Image
                    src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                    alt={movie.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Film className="h-10 w-10 text-muted" />
                  </div>
                )}

                {/* linear overlay on hover */}
                <div className="absolute inset-0 bg-linear-to-t from-muted via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Rating badge */}
                <div
                  className={`absolute top-2 right-2 flex items-center gap-1 rounded-full bg-background/80 px-2 py-0.5 text-xs font-bold backdrop-blur-sm ${getRatingColor(movie.vote_average)}`}
                >
                  <Star className="h-2.5 w-2.5 fill-current" />
                  {movie.vote_average ? movie.vote_average.toFixed(1) : "NR"}
                </div>

                {/* Language tag */}
                <div className="absolute top-2 left-2 rounded-sm bg-background/70 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-muted-foreground uppercase backdrop-blur-sm">
                  {movie.original_language}
                </div>
              </div>

              {/* Info */}
              <CardHeader className="p-3 pb-1">
                <CardTitle className="line-clamp-1 text-sm leading-tight font-bold text-foreground transition-colors group-hover:text-primary">
                  {movie.title}
                </CardTitle>
                <div className="mt-1 flex items-center gap-1">
                  <Calendar className="h-2.5 w-2.5 text-muted" />
                  <span className="text-[11px] text-muted-foreground">
                    {movie.release_date
                      ? movie.release_date.split("-")[0]
                      : "TBA"}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="mt-auto p-3 pt-2">
                <CardDescription className="line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
                  {movie.overview || "No description available."}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <Separator />
    </div>
  )
}
