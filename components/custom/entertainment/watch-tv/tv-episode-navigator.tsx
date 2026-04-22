"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import {
  Play,
  Film,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  MonitorPlay,
  Eye,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// components
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

// hooks
import { useFetchTvSeasonDetails } from "@/hooks/entertainment/fetch/tv-series/useFetchTvSeasonDetails"

// constants
import { IMAGE_BASE_URL } from "@/constants/image-size"

// types
import type { Season } from "@/types/entertainment/tv-series/tv-details"

// ─── Episode Navigator ─────────────────────────────────────────────────────
interface TvEpisodeNavigatorProps {
  seriesId: string
  seasons: Season[]
  currentSeason: number
  currentEpisode: number
  onSeasonChange: (season: number) => void
  onEpisodeChange: (episode: number) => void
  isEpisodeWatched?: (season: number, episode: number) => boolean
  watchedCountForSeason?: (season: number, totalEpisodes: number) => number
}

export default function TvEpisodeNavigator({
  seriesId,
  seasons,
  currentSeason,
  currentEpisode,
  onSeasonChange,
  onEpisodeChange,
  isEpisodeWatched,
  watchedCountForSeason,
}: TvEpisodeNavigatorProps) {
  const { data: seasonData, isFetching } = useFetchTvSeasonDetails(
    seriesId,
    currentSeason
  )

  // Scroll active episode into view
  const episodeGridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!episodeGridRef.current) return
    const activeEl = episodeGridRef.current.querySelector(
      `[data-episode="${currentEpisode}"]`
    )
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      })
    }
  }, [currentEpisode, seasonData])

  // Filter out specials (season 0)
  const filteredSeasons = seasons.filter((s) => s.season_number > 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="space-y-4 rounded-2xl border border-border bg-card/60 p-4 shadow-lg shadow-primary/5 backdrop-blur-sm sm:p-5"
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 shadow-inner">
            <Film className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-black tracking-widest text-foreground/90 uppercase sm:text-base">
              Episodes
            </h3>
            <div className="flex items-center gap-2 text-[10px] font-medium text-muted-foreground/80">
              <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                {seasonData?.name || `Season ${currentSeason}`}
              </span>
              {seasonData?.episodes && (
                <>
                  <span>•</span>
                  <span>{seasonData.episodes.length} Episodes</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Season quick nav arrows */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 border-border/60 bg-background/70 hover:border-primary hover:text-primary disabled:opacity-30"
            onClick={() => {
              const idx = filteredSeasons.findIndex(
                (s) => s.season_number === currentSeason
              )
              if (idx > 0) {
                onSeasonChange(filteredSeasons[idx - 1].season_number)
                onEpisodeChange(1)
              }
            }}
            disabled={
              filteredSeasons.findIndex(
                (s) => s.season_number === currentSeason
              ) <= 0
            }
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 border-border/60 bg-background/70 hover:border-primary hover:text-primary disabled:opacity-30"
            onClick={() => {
              const idx = filteredSeasons.findIndex(
                (s) => s.season_number === currentSeason
              )
              if (idx < filteredSeasons.length - 1) {
                onSeasonChange(filteredSeasons[idx + 1].season_number)
                onEpisodeChange(1)
              }
            }}
            disabled={
              filteredSeasons.findIndex(
                (s) => s.season_number === currentSeason
              ) >=
              filteredSeasons.length - 1
            }
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* ── Season Buttons ── */}
      <ScrollArea className="w-full">
        <div className="flex gap-2 pb-2">
          {filteredSeasons.map((s) => {
            const isActive = currentSeason === s.season_number
            const seasonWatched = watchedCountForSeason
              ? watchedCountForSeason(s.season_number, s.episode_count)
              : 0
            const allWatched =
              seasonWatched > 0 && seasonWatched >= s.episode_count
            return (
              <Button
                key={s.id}
                variant="ghost"
                size="sm"
                onClick={() => {
                  onSeasonChange(s.season_number)
                  onEpisodeChange(1)
                }}
                className={[
                  "relative shrink-0 text-xs font-bold transition-colors duration-200",
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
                ].join(" ")}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSeason"
                    className="absolute inset-0 rounded-lg bg-primary shadow-lg shadow-primary/25"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1">
                  Season {s.season_number}
                  <span
                    className={[
                      "text-[10px] opacity-70",
                      isActive ? "text-primary-foreground/80" : "",
                    ].join(" ")}
                  >
                    ({s.episode_count})
                  </span>
                  {seasonWatched > 0 && (
                    <span
                      className={[
                        "ml-0.5 flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9px] font-bold",
                        allWatched
                          ? isActive
                            ? "bg-emerald-500/30 text-emerald-100"
                            : "bg-emerald-500/15 text-emerald-500"
                          : isActive
                            ? "bg-white/20 text-primary-foreground/90"
                            : "bg-muted-foreground/10 text-muted-foreground",
                      ].join(" ")}
                    >
                      {allWatched ? (
                        <CheckCircle className="h-2.5 w-2.5" />
                      ) : (
                        <Eye className="h-2.5 w-2.5" />
                      )}
                      {seasonWatched}/{s.episode_count}
                    </span>
                  )}
                </span>
              </Button>
            )
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* ── Episode Grid ── */}
      <AnimatePresence mode="wait">
        {isFetching ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex gap-3 rounded-xl border border-border bg-background/40 p-3"
              >
                <Skeleton className="h-16 w-28 shrink-0 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))}
          </motion.div>
        ) : seasonData?.episodes && seasonData.episodes.length > 0 ? (
          <motion.div
            key={`season-${currentSeason}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            ref={episodeGridRef}
            className="grid max-h-[420px] grid-cols-1 gap-2.5 overflow-y-auto pr-1 sm:grid-cols-2"
          >
            {seasonData.episodes.map((ep) => {
              const isActive = currentEpisode === ep.episode_number
              const episodeWatched = isEpisodeWatched
                ? isEpisodeWatched(currentSeason, ep.episode_number)
                : false
              return (
                <motion.button
                  key={ep.id}
                  data-episode={ep.episode_number}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onEpisodeChange(ep.episode_number)}
                  className={[
                    "group relative flex gap-3 overflow-hidden rounded-xl border p-2.5 text-left transition-all duration-300 sm:p-3",
                    isActive
                      ? "border-primary/50 bg-primary/5 shadow-[0_0_20px_rgba(var(--primary),0.05)] ring-1 ring-primary/20"
                      : episodeWatched
                        ? "border-emerald-500/20 bg-emerald-500/3 hover:border-emerald-500/40 hover:bg-emerald-500/5"
                        : "border-border/40 bg-background/40 hover:border-primary/30 hover:bg-primary/2",
                  ].join(" ")}
                >
                  {/* Left Active Indicator Bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeEpisodeBar"
                      className="absolute top-0 bottom-0 left-0 w-1 bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Left Watched Indicator Bar (non-active watched episodes) */}
                  {!isActive && episodeWatched && (
                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-emerald-500/60" />
                  )}

                  {/* Thumbnail */}
                  <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border border-border/30 sm:h-16 sm:w-28">
                    {ep.still_path ? (
                      <Image
                        src={`${IMAGE_BASE_URL}${ep.still_path}`}
                        alt={ep.name || `Episode ${ep.episode_number}`}
                        fill
                        sizes="112px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted/50">
                        <Film className="h-5 w-5 text-muted-foreground/40" />
                      </div>
                    )}

                    {/* Play overlay */}
                    {isActive && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary shadow-lg">
                          <Play className="h-3 w-3 fill-foreground text-foreground" />
                        </div>
                      </div>
                    )}

                    {/* Episode number badge */}
                    <div className="absolute top-1 left-1 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-white backdrop-blur-sm">
                      E{ep.episode_number}
                    </div>

                    {/* Watched badge */}
                    {episodeWatched && !isActive && (
                      <div className="absolute right-1 bottom-1 flex items-center gap-0.5 rounded-md bg-emerald-600/90 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-sm backdrop-blur-sm">
                        <CheckCircle className="h-2.5 w-2.5" />
                        Watched
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
                    <div className="flex items-center gap-1.5">
                      <h4
                        className={[
                          "line-clamp-1 text-xs font-bold tracking-tight sm:text-sm",
                          isActive
                            ? "text-primary"
                            : episodeWatched
                              ? "text-emerald-500 group-hover:text-emerald-400"
                              : "text-foreground group-hover:text-primary",
                        ].join(" ")}
                      >
                        {ep.name}
                      </h4>
                      {episodeWatched && isActive && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <MonitorPlay className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Now Watching</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground">
                      {ep.vote_average > 0 && (
                        <span className="flex items-center gap-0.5 font-semibold">
                          <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                          {ep.vote_average.toFixed(1)}
                        </span>
                      )}
                      {ep.runtime > 0 && (
                        <span className="flex items-center gap-0.5">
                          <Clock className="h-2.5 w-2.5" />
                          {ep.runtime}m
                        </span>
                      )}
                    </div>

                    {/* Overview */}
                    {ep.overview && (
                      <p className="line-clamp-2 text-[10px] leading-tight text-muted-foreground/70 sm:text-[11px]">
                        {ep.overview}
                      </p>
                    )}
                  </div>
                </motion.button>
              )
            })}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 py-8 text-muted-foreground">
            <Film className="h-8 w-8 opacity-30" />
            <p className="text-sm">No episodes found for this season</p>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
