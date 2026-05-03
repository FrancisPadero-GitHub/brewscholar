import Image from "next/image"
import Link from "next/link"
import { Play, Info, Clapperboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { IMAGE_BASE_URL } from "@/constants/image-size"
import { StarRating } from "./star-rating"
import {
  buildMovieDetailsPath,
  buildTvDetailsPath,
  buildWatchMoviePath,
  buildWatchTvPath,
} from "@/lib/utils"

export function SpotlightCard({
  movie,
  isMovie,
}: {
  movie: {
    id: number
    title?: string
    name?: string
    poster_path: string | null
    backdrop_path: string | null
    vote_average: number
    release_date?: string
    first_air_date?: string
    overview: string
  }
  isMovie: boolean
}) {
  return (
    <div className="relative my-10 overflow-hidden rounded-2xl border border-zinc-700/50 bg-zinc-900/80">
      {/* Backdrop */}
      {movie.backdrop_path && (
        <>
          <Image
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            alt={movie.title || movie.name || "Spotlight"}
            fill
            sizes="100vw"
            className="object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-linear-to-r from-zinc-900 via-zinc-900/80 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-transparent to-zinc-900/50" />
        </>
      )}

      {/* Content */}
      <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-end sm:p-10">
        {/* Poster (hidden on mobile, visible on sm+) */}
        <div className="hidden shrink-0 sm:block">
          <div className="relative h-[240px] w-[160px] overflow-hidden rounded-xl border-2 border-zinc-700 shadow-2xl">
            {movie.poster_path ? (
              <Image
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title || movie.name || "Poster"}
                fill
                sizes="160px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-zinc-800">
                <Clapperboard className="h-10 w-10 text-zinc-600" />
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col gap-3">
          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-sm bg-primary/20 px-2 py-0.5 font-bold text-primary">
              {movie.vote_average ? movie.vote_average.toFixed(1) : "NR"}
            </span>
            <span className="text-zinc-400">
              {(movie.release_date || movie.first_air_date)?.split("-")[0] ||
                "TBA"}
            </span>
            <StarRating rating={movie.vote_average} />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            {movie.title || movie.name}
          </h3>

          {/* Description */}
          <p className="line-clamp-3 max-w-xl text-sm leading-relaxed text-zinc-300">
            {movie.overview || "No description available."}
          </p>

          {/* Actions */}
          <div className="mt-2 flex items-center gap-3">
            <Link
              href={
                isMovie
                  ? buildWatchMoviePath(movie.id, movie.title)
                  : buildWatchTvPath(movie.id, movie.name)
              }
            >
              <Button className="gap-2 rounded-full bg-primary px-6 font-bold text-primary-foreground hover:bg-primary/90">
                <Play className="h-4 w-4 fill-current" />
                Watch
              </Button>
            </Link>
            <Link
              href={
                isMovie
                  ? buildMovieDetailsPath(movie.id, movie.title)
                  : buildTvDetailsPath(movie.id, movie.name)
              }
            >
              <Button
                variant="outline"
                className="gap-2 rounded-full border-zinc-600 text-zinc-300 hover:border-zinc-400 hover:text-white"
              >
                <Info className="h-4 w-4" />
                Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
