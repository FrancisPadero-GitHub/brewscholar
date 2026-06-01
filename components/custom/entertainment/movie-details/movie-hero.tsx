"use client"

import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink,
  Film,
  Globe,
  Play,
  Star,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { IMAGE_BASE_URL, BACKDROP_BASE_URL } from "@/constants/image-size"
import { buildWatchMoviePath } from "@/lib/utils"
import {
  getRatingColor,
  formatRuntime,
} from "@/helpers/entertainment/movie-details/movie-details"
import type { MovieDetailsApiResponse } from "@/types/entertainment/movies/movie-details"
import type { VideoItem } from "@/types/entertainment/movies/movie-videos"
import type { ImageItem } from "@/types/entertainment/movies/movie-images"

interface MovieHeroProps {
  movie: MovieDetailsApiResponse
  movieVideos?: VideoItem[]
  bgVideo?: VideoItem
  logo?: ImageItem
  isLogoLoading?: boolean
  minimal?: boolean
  backUrl?: string
  onWatchTrailer?: (key: string) => void
}

export function MovieHero({
  movie,
  bgVideo,
  logo,
  isLogoLoading,
  minimal = false,
  backUrl = "/entertainment",
  onWatchTrailer,
}: MovieHeroProps) {
  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "TBA"
  const ratingColor = getRatingColor(movie.vote_average)

  if (minimal) {
    return (
      <>
        {/* ── HERO BACKDROP (Minimal Mode) ── */}
        <div className="pointer-events-none absolute top-0 left-0 z-0 h-[50vh] w-full overflow-hidden bg-zinc-950">
          {/* Backdrop image */}
          <div className="absolute inset-0 opacity-50">
            {movie.backdrop_path ? (
              <Image
                src={`${BACKDROP_BASE_URL}${movie.backdrop_path}`}
                alt={movie.title}
                fill
                sizes="100vw"
                className="object-cover object-top"
                priority
              />
            ) : (
              <div className="h-full w-full bg-muted" />
            )}
          </div>

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-background/10" />
          <div className="absolute inset-0 bg-linear-to-r from-background via-transparent to-transparent" />
        </div>

        {/* Back button and logo floating in hero */}
        <div className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 pt-7">
          <Link href={backUrl}>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-zinc-700 bg-black/40 text-white backdrop-blur-md hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>

          <Link href="/entertainment" className="flex items-center gap-2 group">
            <div className="relative h-7 w-7 sm:h-9 sm:w-9 shrink-0 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/brewscholar-yellow.png"
                alt="BrewScholar Logo"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 28px, 36px"
                priority
              />
            </div>
            <span className="text-2xl font-black tracking-tight text-white drop-shadow-md sm:text-4xl">
              Movie<span className="text-primary">Hub</span>
            </span>
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      {/* ── HERO BACKDROP ── */}
      <div className="relative h-[58vh] w-full overflow-hidden bg-zinc-950">
        {/* Backdrop image */}
        <div className="absolute inset-0 opacity-50">
          {movie.backdrop_path ? (
            <Image
              src={`${BACKDROP_BASE_URL}${movie.backdrop_path}`}
              alt={movie.title}
              fill
              sizes="100vw"
              className="object-cover object-top"
              priority
            />
          ) : (
            <div className="h-full w-full bg-muted" />
          )}
        </div>

        {/* Gradient overlays – same layered approach as MovieHub */}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-background/10" />
        <div className="absolute inset-0 bg-linear-to-r from-background via-transparent to-transparent" />

        {/* Back button floating in hero */}
        <div className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 pt-7">
          <Link href={backUrl}>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-zinc-700 bg-black/40 text-white backdrop-blur-md hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>

          <Link href="/entertainment" className="flex items-center gap-2 group">
            <div className="relative h-7 w-7 sm:h-9 sm:w-9 shrink-0 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/brewscholar-yellow.png"
                alt="BrewScholar Logo"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 28px, 36px"
                priority
              />
            </div>
            <span className="text-2xl font-black tracking-tight text-white drop-shadow-md sm:text-4xl">
              Movie<span className="text-primary">Hub</span>
            </span>
          </Link>
        </div>
      </div>

      {/* ── HERO FOREGROUND CONTENT ── */}
      <div className="relative mx-auto -mt-44 max-w-6xl px-6 pb-4">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end">
          {/* Poster */}
          <div className="relative z-10 h-64 w-44 shrink-0 overflow-hidden rounded-xl border-2 border-zinc-700 shadow-2xl shadow-black/40 md:h-80 md:w-56">
            {movie.poster_path ? (
              <Image
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                fill
                sizes="(max-width: 768px) 176px, 224px"
                className="object-cover"
                loading="eager"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <Film className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Title block */}
          <div className="z-10 flex-1 space-y-3 pb-2">
            {/* Genre badges */}
            <div className="flex flex-wrap gap-2">
              {movie.genres.map((g) => (
                <Badge
                  key={g.id}
                  variant="outline"
                  className="border-primary/40 bg-primary/10 text-primary"
                >
                  {g.name}
                </Badge>
              ))}
            </div>

            {isLogoLoading ? (
              <div className="h-16 w-64 animate-pulse rounded-lg bg-zinc-800 md:h-24 md:w-80" />
            ) : logo ? (
              <div className="relative h-16 w-64 overflow-hidden md:h-24 md:w-80">
                <Image
                  src={`${IMAGE_BASE_URL}${logo.file_path}`}
                  alt={movie.title}
                  fill
                  sizes="(max-width: 768px) 256px, 320px"
                  className="object-contain object-left drop-shadow-lg"
                  priority
                />
              </div>
            ) : (
              <h1 className="text-3xl font-black tracking-tight text-foreground md:text-5xl">
                {movie.title.toUpperCase()}
              </h1>
            )}

            {movie.original_title !== movie.title && (
              <p className="text-sm text-muted-foreground italic">
                {movie.original_title}
              </p>
            )}

            {movie.tagline && (
              <p className="text-base font-medium text-accent-foreground italic">
                &ldquo;{movie.tagline}&rdquo;
              </p>
            )}

            {/* Quick stats row */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-sm text-muted-foreground">
              {/* Rating */}
              <span
                className={`flex items-center gap-1 text-base font-bold ${ratingColor}`}
              >
                <Star className="h-4 w-4 fill-current" />
                {movie.vote_average.toFixed(1)}
                <span className="text-xs font-normal text-muted-foreground">
                  / 10
                </span>
              </span>

              <span className="text-border">|</span>

              {movie.runtime > 0 && (
                <>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    {formatRuntime(movie.runtime)}
                  </span>
                  <span className="text-border">|</span>
                </>
              )}

              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                {releaseYear}
              </span>

              <span className="text-border">|</span>

              <span className="flex items-center gap-1 uppercase">
                <Globe className="h-3.5 w-3.5 text-primary" />
                {movie.original_language}
              </span>

              {/* Status */}
              <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary">
                {movie.status}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Official Site */}
              {movie.homepage && (
                <Link
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="sm"
                    className="mt-1 cursor-pointer gap-2 rounded-full bg-accent font-semibold text-accent-foreground shadow-md shadow-accent/20 hover:bg-primary hover:text-primary-foreground"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Official Site
                  </Button>
                </Link>
              )}

              {/* Watch Trailer */}
              {bgVideo && onWatchTrailer && (
                <Button
                  size="sm"
                  onClick={() => onWatchTrailer(bgVideo.key)}
                  className="mt-1 animate-pulse cursor-pointer gap-2 rounded-full border border-zinc-700 bg-black/40 font-semibold text-white shadow-md backdrop-blur-md transition-all hover:bg-white hover:text-black"
                >
                  <Film className="h-3.5 w-3.5 text-primary" />
                  Watch Trailer
                </Button>
              )}

              {/* Play now */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Link href={buildWatchMoviePath(movie.id, movie.title)}>
                  <Button
                    size="sm"
                    className="mt-1 cursor-pointer gap-2 rounded-full border border-primary/50 bg-primary font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/40"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    Play Now
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
