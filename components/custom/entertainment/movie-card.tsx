import Link from "next/link"
import Image from "next/image"
import { Star, Clapperboard, Heart, Eye } from "lucide-react"

import { IMAGE_BASE_URL } from "@/constants/image-size"
import { getRatingColor } from "@/helpers/entertainment/movie-details/movie-details"
import { buildMovieDetailsPath, buildTvDetailsPath } from "@/lib/utils"

export function MovieCard({
  movie,
  isMovie,
}: {
  movie: {
    id: number
    title?: string
    name?: string
    poster_path: string | null
    vote_average: number
    original_language: string
    release_date?: string
    first_air_date?: string
  }
  isMovie: boolean
}) {
  const detailsHref = isMovie
    ? buildMovieDetailsPath(movie.id, movie.title)
    : buildTvDetailsPath(movie.id, movie.name)

  return (
    <Link href={detailsHref} className="group block">
      <div className="relative aspect-2/3 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10">
        {/* Poster */}
        {movie.poster_path ? (
          <Image
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title || movie.name || "Poster"}
            fill
            unoptimized
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

        {/* Language badge */}
        <div className="absolute top-2 left-2 rounded-sm bg-black/60 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-zinc-300 uppercase backdrop-blur-sm">
          {movie.original_language}
        </div>

        {/* Bottom info (visible on hover) */}
        <div className="absolute inset-x-0 bottom-0 translate-y-2 px-3 pb-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {/* Action icons */}
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

      {/* Title + Year below poster */}
      <div className="mt-2 space-y-0.5 px-0.5">
        <p className="line-clamp-1 text-sm font-bold text-foreground transition-colors group-hover:text-primary">
          {movie.title || movie.name}
        </p>
        <div className="flex items-center gap-2 text-[11px] text-zinc-500">
          <span>
            {(movie.release_date || movie.first_air_date)?.split("-")[0] ||
              "TBA"}
          </span>
          <span>•</span>
          <div
            className={`flex items-center gap-0.5 ${getRatingColor(movie.vote_average)}`}
          >
            <Star className="h-2.5 w-2.5 fill-current" />
            <span className="font-medium">
              {movie.vote_average ? movie.vote_average.toFixed(1) : "NR"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
