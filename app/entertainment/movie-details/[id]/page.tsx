"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import {
  Star,
  Clock,
  Calendar,
  Globe,
  Film,
  DollarSign,
  TrendingUp,
  ArrowLeft,
  ExternalLink,
  Play,
  Users,
  Award,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// helpers
import {
  getRatingColor,
  formatRuntime,
  formatCurrency,
} from "@/helpers/entertainment/movie-details/movie-details"
import { IMAGE_BASE_URL, BACKDROP_BASE_URL } from "@/constants/image-size"

// hooks
import { useFetchMovieDetails } from "@/hooks/entertainment/fetch/movies/useFetchMovieDetails"

// types
import type { MovieDetailsApiResponse } from "@/types/entertainment/movies/movie-details"

// components
import { MovieDetailsSkeleton } from "@/components/custom/entertainment/movie-details/skeleton"
import { StatPill } from "@/components/custom/entertainment/movie-details/stat-pill"

// ─── Main page
export default function MovieDetails() {
  const params = useParams()
  const movieId = params.id as string

  const { data, isFetching, isError, error } = useFetchMovieDetails(movieId)
  const movie = data as MovieDetailsApiResponse | undefined

  // ── Loading state
  if (isFetching) return <MovieDetailsSkeleton />

  // ── Error state
  if (isError || !movie) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background text-foreground">
        <Film className="h-14 w-14 text-muted-foreground" />
        <h1 className="text-2xl font-bold">Movie Not Found</h1>
        <p className="text-muted-foreground">
          {error?.message ?? "Something went wrong. Please try again."}
        </p>
        <Link href="/entertainment">
          <Button variant="outline" className="mt-2 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Movie Hub
          </Button>
        </Link>
      </div>
    )
  }

  const releaseYear = movie.release_date.split("-")[0] || "TBA"
  const ratingColor = getRatingColor(movie.vote_average)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── HERO BACKDROP  */}
      <div className="relative h-[58vh] w-full overflow-hidden">
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

        {/* Gradient overlays – same layered approach as MovieHub */}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-background/10" />
        <div className="absolute inset-0 bg-linear-to-r from-background via-transparent to-transparent" />

        {/* Back button floating in hero */}
        <div className="absolute top-6 left-6">
          <Link href="/entertainment">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-border/60 bg-background/70 text-foreground backdrop-blur-md hover:bg-background/90 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>
      </div>

      {/* ── MAIN CONTENT  */}
      <div className="mx-auto max-w-6xl px-6 pb-24">
        {/* ── Poster + Title Row  */}
        <div className="-mt-44 flex flex-col items-start gap-8 md:flex-row md:items-end">
          {/* Poster */}
          <div className="relative z-10 h-64 w-44 shrink-0 overflow-hidden rounded-xl border border-border shadow-2xl shadow-black/40 md:h-80 md:w-56">
            {movie.poster_path ? (
              <Image
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                fill
                sizes="(max-width: 768px) 176px, 224px"
                className="object-cover"
                priority
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

            <h1 className="text-3xl font-black tracking-tight text-foreground md:text-5xl">
              {movie.title}
            </h1>

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

            <div className="flex items-center gap-5">
              {/* Official Site */}
              {movie.homepage && (
                <Link
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="sm"
                    className="mt-1 gap-2 bg-accent font-semibold text-accent-foreground shadow-md shadow-accent/20 hover:bg-primary hover:text-primary-foreground"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Official Site
                  </Button>
                </Link>
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
                <Link href={`/entertainment/watch/${movie.id}`}>
                  <Button
                    size="sm"
                    className="shadow-[0_0_20px_--spacing(1)_var(--primary)]transition-all mt-1 gap-2 border border-primary/50 bg-primary font-bold text-primary-foreground duration-300 hover:bg-primary/90 hover:shadow-[0_0_30px_--spacing(1.5)_var(--primary)]"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    Play Now
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        <Separator className="my-10 border-border" />

        {/* ── Details Grid  */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Left: Overview + Stats  */}
          <div className="space-y-8 lg:col-span-2">
            {/* Overview */}
            <section>
              <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-widest text-primary uppercase">
                <Film className="h-4 w-4" />
                Overview
              </h2>
              <p className="leading-relaxed text-muted-foreground md:text-base">
                {movie.overview || "No overview available."}
              </p>
            </section>

            {/* Box Office Stats */}
            {(movie.budget > 0 || movie.revenue > 0) && (
              <section>
                <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-widest text-primary uppercase">
                  <DollarSign className="h-4 w-4" />
                  Box Office
                </h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {movie.budget > 0 && (
                    <StatPill
                      icon={DollarSign}
                      label="Budget"
                      value={formatCurrency(movie.budget)}
                    />
                  )}
                  {movie.revenue > 0 && (
                    <StatPill
                      icon={TrendingUp}
                      label="Revenue"
                      value={formatCurrency(movie.revenue)}
                    />
                  )}
                  {movie.vote_count > 0 && (
                    <StatPill
                      icon={Users}
                      label="Vote Count"
                      value={movie.vote_count.toLocaleString()}
                    />
                  )}
                  {movie.popularity > 0 && (
                    <StatPill
                      icon={Award}
                      label="Popularity"
                      value={movie.popularity.toFixed(1)}
                    />
                  )}
                </div>
              </section>
            )}

            {/* Production Companies */}
            {movie.production_companies.length > 0 && (
              <section>
                <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-widest text-primary uppercase">
                  <Award className="h-4 w-4" />
                  Production Companies
                </h2>
                <div className="flex flex-wrap gap-3">
                  {movie.production_companies.map((company) => (
                    <Card
                      key={company.id}
                      className="flex flex-row items-center gap-3 border-border bg-card px-4 py-2 shadow-none"
                    >
                      {company.logo_path ? (
                        <div className="relative flex h-10 w-20 shrink-0 items-center justify-center rounded-lg bg-white p-1.5 shadow-xs transition-transform hover:scale-105">
                          <Image
                            src={`${IMAGE_BASE_URL}${company.logo_path}`}
                            alt={company.name}
                            fill
                            sizes="80px"
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex h-10 w-20 shrink-0 items-center justify-center rounded-lg bg-muted/40 transition-transform hover:scale-105">
                          <Film className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                      <CardContent className="p-0">
                        <p className="text-sm font-semibold text-foreground">
                          {company.name}
                        </p>
                        {company.origin_country && (
                          <p className="text-xs text-muted-foreground">
                            {company.origin_country}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right: Meta sidebar  */}
          <aside className="space-y-6">
            {/* Movie facts card */}
            <Card className="border-border bg-card shadow-sm">
              <CardContent className="space-y-4 p-5">
                <h2 className="text-xs font-semibold tracking-widest text-primary uppercase">
                  Movie Facts
                </h2>

                <dl className="space-y-3 text-sm">
                  <div>
                    <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      Release Date
                    </dt>
                    <dd className="mt-0.5 font-medium text-foreground">
                      {movie.release_date
                        ? new Date(movie.release_date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : "TBA"}
                    </dd>
                  </div>

                  {movie.runtime > 0 && (
                    <div>
                      <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                        Runtime
                      </dt>
                      <dd className="mt-0.5 font-medium text-foreground">
                        {formatRuntime(movie.runtime)}
                      </dd>
                    </div>
                  )}

                  <div>
                    <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      Original Language
                    </dt>
                    <dd className="mt-0.5 font-medium text-foreground uppercase">
                      {movie.original_language}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      Status
                    </dt>
                    <dd className="mt-0.5">
                      <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary">
                        {movie.status}
                      </span>
                    </dd>
                  </div>

                  {movie.adult && (
                    <div>
                      <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                        Rating
                      </dt>
                      <dd className="mt-0.5">
                        <span className="rounded-full bg-destructive/15 px-2.5 py-0.5 text-xs font-semibold text-destructive">
                          Adult
                        </span>
                      </dd>
                    </div>
                  )}
                </dl>
              </CardContent>
            </Card>

            {/* TMDB link */}
            {movie.imdb_id && (
              <Link
                href={`https://www.themoviedb.org/movie/${movie.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button
                  variant="outline"
                  className="w-full gap-2 border-border hover:border-primary hover:text-primary"
                >
                  <ExternalLink className="h-4 w-4" />
                  View on TMDB
                </Button>
              </Link>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
