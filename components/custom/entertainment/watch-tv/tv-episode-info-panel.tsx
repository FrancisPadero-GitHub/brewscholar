import Image from "next/image"
import { Star, Clock, Calendar } from "lucide-react"
import { motion } from "motion/react"

// components
import { Skeleton } from "@/components/ui/skeleton"

// helper
import { IMAGE_BASE_URL } from "@/constants/image-size"
import { getRatingColor } from "@/helpers/entertainment/movie-details/movie-details"

// hooks
import { useFetchTvEpisodeDetails } from "@/hooks/entertainment/fetch/tv-series/useFetchTvEpisodeDetails"

// ─── Tv episode info panel 
export default function TvEpisodeInfoPanel({
  seriesId,
  seasonNumber,
  episodeNumber,
}: {
  seriesId: string
  seasonNumber: number
  episodeNumber: number
}) {
  const { data: episode, isFetching } = useFetchTvEpisodeDetails(
    seriesId,
    seasonNumber,
    episodeNumber
  )

  if (isFetching) {
    return (
      <div className="flex items-start gap-5 rounded-xl border border-border bg-card p-5">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-3.5 w-1/4" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>
      </div>
    )
  }

  // If no episode data found, just return null
  if (!episode) return null

  const ratingColor = getRatingColor(episode.vote_average)
  const airYear = episode.air_date ? episode.air_date.split("-")[0] : "TBA"

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5 shadow-sm sm:flex-row sm:items-start"
    >
      {/* Still image */}
      {episode.still_path && (
        <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-lg border border-border shadow-md">
          <Image
            src={`${IMAGE_BASE_URL}${episode.still_path}`}
            alt={episode.name || "Episode still"}
            fill
            sizes="160px"
            className="object-cover"
          />
        </div>
      )}

      {/* Details */}
      <div className="flex-1 space-y-3">
        {/* Name and Episode Number */}
        <div>
          <h2 className="text-lg leading-tight font-black tracking-tight text-foreground md:text-xl">
            S{seasonNumber}:E{episodeNumber} - {episode.name}
          </h2>
        </div>

        {/* Quick stats row */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className={`flex items-center gap-1 font-bold ${ratingColor}`}>
            <Star className="h-3.5 w-3.5 fill-current" />
            {episode.vote_average.toFixed(1)}
            <span className="font-normal text-muted-foreground">/10</span>
          </span>

          {episode.runtime > 0 && (
            <>
              <span className="text-border">|</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-primary" />
                {episode.runtime} min
              </span>
            </>
          )}

          {episode.air_date && (
            <>
              <span className="text-border">|</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                {airYear}
              </span>
            </>
          )}
        </div>

        {/* Overview */}
        {episode.overview && (
          <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
            {episode.overview}
          </p>
        )}
      </div>
    </motion.div>
  )
}
