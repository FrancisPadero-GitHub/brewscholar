import Image from "next/image"
import {
  Star,
  Clock,
  Calendar,
  Globe,
  MonitorPlay,
  CalendarClock,
} from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

// components
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// types
import type { TvSeriesDetailsApiResponse } from "@/types/entertainment/tv-series/tv-details"
import { getRatingColor } from "@/helpers/entertainment/movie-details/movie-details"
import { buildTvDetailsPath } from "@/lib/utils"

// helper
import { IMAGE_BASE_URL } from "@/constants/image-size"

// hooks
import { useFetchTvDetails } from "@/hooks/entertainment/fetch/tv-series/useFetchTvDetails"
import { useFetchTvImages } from "@/hooks/entertainment/fetch/tv-series/useFetchTvImages"
import type { TvImagesApiResponse } from "@/types/entertainment/tv-series/tv-images"

// ─── Tv info panel (details beneath the player)
export default function TvInfoPanel({ tvId }: { tvId: string }) {
  const { data, isFetching } = useFetchTvDetails(tvId)
  const tvShow = data as TvSeriesDetailsApiResponse | undefined

  const { data: imagesData } = useFetchTvImages(tvId)
  const tvImages = imagesData as TvImagesApiResponse | undefined
  const logo = tvImages?.logos?.find((l) => l.iso_639_1 === "en") || tvImages?.logos?.[0]

  if (isFetching) {
    return (
      <div className="flex items-start gap-5 rounded-xl border border-border bg-card p-5">
        <Skeleton className="h-24 w-16 shrink-0 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-3.5 w-1/2" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>
      </div>
    )
  }

  if (!tvShow) return null

  const ratingColor = getRatingColor(tvShow.vote_average)
  const firstAirYear = tvShow.first_air_date
    ? tvShow.first_air_date.split("-")[0]
    : "TBA"
  const episodeRuntime = tvShow.episode_run_time?.[0] || 0

  const isNewOrUpcoming = (() => {
    if (!tvShow.first_air_date) return true
    const releaseDate = new Date(tvShow.first_air_date)
    const today = new Date()
    const diffTime = today.getTime() - releaseDate.getTime()
    const diffDays = diffTime / (1000 * 60 * 60 * 24)
    return diffDays < 120 || releaseDate > today
  })()

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5 shadow-sm sm:flex-row sm:items-start"
      >
        {/* Poster thumbnail */}
        {tvShow.poster_path && (
          <div className="relative h-28 w-20 shrink-0 overflow-hidden rounded-lg border border-border shadow-md">
            <Image
              src={`${IMAGE_BASE_URL}${tvShow.poster_path}`}
              alt={tvShow.name}
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
        )}

        {/* Details */}
        <div className="flex-1 space-y-3">
          {/* Genres */}
          {tvShow.genres.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tvShow.genres.map((g) => (
                <Badge
                  key={g.id}
                  variant="outline"
                  className="border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] text-primary"
                >
                  {g.name}
                </Badge>
              ))}
            </div>
          )}

          {/* Name */}
          <div>
            {logo ? (
              <div className="relative h-10 w-44 md:h-14 md:w-56 overflow-hidden">
                <Image
                  src={`${IMAGE_BASE_URL}${logo.file_path}`}
                  alt={tvShow.name}
                  fill
                  sizes="(max-width: 768px) 176px, 224px"
                  className="object-contain object-left drop-shadow-lg"
                  priority
                />
              </div>
            ) : (
              <h2 className="text-lg leading-tight font-black tracking-tight text-foreground md:text-xl">
                {tvShow.name}
              </h2>
            )}
            {tvShow.tagline && (
              <p className="mt-0.5 text-xs text-muted-foreground italic">
                &ldquo;{tvShow.tagline}&rdquo;
              </p>
            )}
          </div>

          {/* Quick stats row */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span
              className={`flex items-center gap-1 font-bold ${ratingColor}`}
            >
              <Star className="h-3.5 w-3.5 fill-current" />
              {tvShow.vote_average.toFixed(1)}
              <span className="font-normal text-muted-foreground">/10</span>
            </span>

            {episodeRuntime > 0 && (
              <>
                <span className="text-border">|</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  {episodeRuntime} min
                </span>
              </>
            )}

            <span className="text-border">|</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-primary" />
              {firstAirYear}
            </span>

            <span className="text-border">|</span>
            <span className="flex items-center gap-1 uppercase">
              <Globe className="h-3.5 w-3.5 text-primary" />
              {tvShow.original_language}
            </span>

            <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
              {tvShow.status}
            </span>
          </div>

          {/* Overview */}
          {tvShow.overview && (
            <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
              {tvShow.overview}
            </p>
          )}

          {/* Action links */}
          <div className="flex items-center gap-2 pt-1">
            <Link href={buildTvDetailsPath(tvShow.id, tvShow.name)}>
              <Button
                variant="outline"
                size="sm"
                className="h-7 gap-1.5 border-border/60 text-xs hover:border-primary hover:text-primary"
              >
                <MonitorPlay className="h-3.5 w-3.5" />
                Full Details
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Friendly Availability Alert */}
      <div
        className={`relative overflow-hidden rounded-2xl border p-4 transition-all duration-300 ${
          isNewOrUpcoming
            ? "border-amber-500/30 bg-amber-500/10 text-amber-200"
            : "border-border/60 bg-muted/30 text-zinc-300"
        }`}
      >
        <div className="flex gap-3">
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
              isNewOrUpcoming
                ? "bg-amber-500/20 text-amber-400"
                : "bg-zinc-800 text-zinc-400"
            }`}
          >
            <CalendarClock className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <h3
              className={`text-sm font-bold tracking-tight ${isNewOrUpcoming ? "text-amber-300" : "text-zinc-200"}`}
            >
              {isNewOrUpcoming
                ? "⚡ Release Notice & Playback Info"
                : "💡 Series Availability Notice"}
            </h3>
            <p className="text-xs/relaxed text-zinc-400">
              {isNewOrUpcoming
                ? `Since this TV series is brand new or recently aired (first air date: ${tvShow.first_air_date ? new Date(tvShow.first_air_date).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "TBA"}), player servers may still be compiling and indexing the episodes. Some episodes might take time to become available.`
                : "Playback sources are provided by public third-party player APIs. If a source experiences playback latency or is unavailable, please try switching between the alternative players inside the watch room."}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
