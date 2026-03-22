import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { useState } from "react"
import { Star, Film, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react"

// components
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// types
import type { MovieResult } from "@/types/entertainment/movies/popular-movies"

// helper
import { IMAGE_BASE_URL } from "@/constants/image-size"
import { getRatingColor } from "@/helpers/entertainment/movie-details/movie-details"

// hooks
import { useFetchPopularMovies } from "@/hooks/entertainment/fetch/useFetchPopularMovies"

// Related movie card
function RelatedMovieCard({ movie }: { movie: MovieResult }) {
  const ratingColor = getRatingColor(movie.vote_average)
  const year = movie.release_date.split("-")[0] ?? "TBA"

  return (
    <Link href={`/entertainment/movie-details/${movie.id}`}>
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="group relative w-36 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-border bg-card shadow-md transition-shadow hover:shadow-xl hover:shadow-primary/15 sm:w-40"
      >
        {/* Poster */}
        <div className="relative aspect-2/3 w-full overflow-hidden">
          {movie.poster_path ? (
            <Image
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              fill
              sizes="160px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <Film className="h-10 w-10 text-muted-foreground" />
            </div>
          )}

          {/* Rating badge */}
          <div
            className={`absolute top-2 left-2 flex items-center gap-1 rounded-md bg-card/80 px-1.5 py-0.5 text-xs font-bold backdrop-blur-sm ${ratingColor}`}
          >
            <Star className="h-3 w-3 fill-current" />
            {movie.vote_average.toFixed(1)}
          </div>
        </div>

        {/* Info */}
        <div className="p-2.5">
          <p className="truncate text-xs leading-snug font-semibold text-foreground">
            {movie.title}
          </p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">{year}</p>
        </div>
      </motion.div>
    </Link>
  )
}

//  Related movies carousel with pagination
export default function RelatedMoviesSection() {
  const [page, setPage] = useState(1)
  const { data, isFetching } = useFetchPopularMovies(page)

  const totalPagesRaw = data?.total_pages ?? 0
  const totalPagesFiltered = Math.min(totalPagesRaw, 500)
  const movies = data?.results ?? []

  return (
    <section className="space-y-4">
      {/* Header + Pagination controls */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold tracking-widest text-primary uppercase">
          <TrendingUp className="h-4 w-4" />
          Popular Movies
        </h2>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground tabular-nums">
            Page {page} / {totalPagesFiltered}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 border-border/60 hover:border-primary hover:text-primary"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1 || isFetching}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 border-border/60 hover:border-primary hover:text-primary"
            onClick={() => setPage((p) => Math.min(totalPagesFiltered, p + 1))}
            disabled={page >= totalPagesFiltered || isFetching}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Horizontal scrollable catalog */}
      <div className="relative">
        {isFetching ? (
          <div className="flex gap-3 overflow-hidden pb-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="w-36 shrink-0 sm:w-40">
                <Skeleton className="aspect-2/3 w-full rounded-xl" />
                <Skeleton className="mt-2 h-3 w-3/4 rounded" />
                <Skeleton className="mt-1 h-2.5 w-1/2 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border flex gap-3 overflow-x-auto pb-3"
          >
            {movies.map((movie) => (
              <RelatedMovieCard key={movie.id} movie={movie} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
