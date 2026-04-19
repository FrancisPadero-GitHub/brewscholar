"use client"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "motion/react"
import { ArrowLeft, Minus, Plus } from "lucide-react"
import Image from "next/image"
import type { JSX } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AlertTriangle, ExternalLink } from "lucide-react"

// helpers
import { BACKDROP_BASE_URL } from "@/constants/image-size"

// types
import { useFetchTvDetails } from "@/hooks/entertainment/fetch/tv-series/useFetchTvDetails"

// components
import VidKingPlayer from "@/components/custom/entertainment/player/VidKingNet"
import VidSrcMe from "@/components/custom/entertainment/player/VidSrcMe"
import VidLinkPro from "@/components/custom/entertainment/player/VidLinkPro"

import TvInfoPanel from "@/components/custom/entertainment/watch/tv-info-panel"
import TvEpisodeInfoPanel from "@/components/custom/entertainment/watch/tv-episode-info-panel"
import PopularTvSection from "@/components/custom/entertainment/watch/popular-tv"
import TopRatedTvSection from "@/components/custom/entertainment/watch/top-rated-tv"
import AiringTodayTvSection from "@/components/custom/entertainment/watch/airing-today-tv"
import OnTheAirTvSection from "@/components/custom/entertainment/watch/on-the-air-tv"

// zustand
import {
  ACTIVE_PLAYER,
  usePlayerStore,
} from "@/features/zustand/entertainment/player-buttons-store"
import { useWatchTracker } from "@/hooks/entertainment/progress-tracker/useWatchTracker"
import type { WatchProgress } from "@/hooks/entertainment/progress-tracker/useWatchTracker"

// Main Watch TV page
const WatchTv = () => {
  const params = useParams()
  const tvId = params.id as string

  const { data: tvShow } = useFetchTvDetails(tvId)
  const mediaTitle = tvShow?.name
  const mediaBackdrop = tvShow?.backdrop_path

  // start time for tracking progress resumption
  const [startTime, setStartTime] = useState<number>(0)
  const [season, setSeason] = useState<number>(1)
  const [episode, setEpisode] = useState<number>(1)

  // track watch progress
  useWatchTracker(tvId, mediaTitle, "TV series", season, episode)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const stored = localStorage.getItem("watchHistory")
      if (stored) {
        try {
          const history: Record<string, WatchProgress | undefined> =
            JSON.parse(stored)
          const progress = history[tvId]
          if (progress) {
            if (progress.currentTime > 0 && progress.mode === "TV series") {
              setStartTime(Math.floor(progress.currentTime))
            }
            if (progress.mode === "TV series") {
              if (progress.season) setSeason(progress.season)
              if (progress.episode) setEpisode(progress.episode)
            }
          }
        } catch {
          // ignore errors
        }
      }
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [tvId])

  // store for the players
  const { setActivePlayer, activePlayer } = usePlayerStore()

  // map of player id -> component
  const playerBaseProps = {
    id: tvId,
    type: "tv",
    season: season.toString(),
    episode: episode.toString(),
  }

  const playerComponents: Record<string, JSX.Element> = {
    "Player 1": <VidLinkPro {...playerBaseProps} startTime={startTime} />,
    "Player 2": <VidSrcMe {...playerBaseProps} />,
    "Player 3": <VidKingPlayer {...playerBaseProps} startTime={startTime} />,
  }

  const [isMobile, setIsMobile] = useState(false)
  const [showPlayer3Warning, setShowPlayer3Warning] = useState(false)

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 500)
    updateIsMobile()
    window.addEventListener("resize", updateIsMobile)
    return () => window.removeEventListener("resize", updateIsMobile)
  }, [])

  if (!tvId)
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        <Spinner />
        <span className="ml-3">TV Show ID is missing.</span>
      </div>
    )

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      {/* ── Backdrop image ── */}
      {mediaBackdrop && (
        <div className="pointer-events-none absolute top-0 left-0 z-0 h-[50vh] w-full overflow-hidden">
          <Image
            src={`${BACKDROP_BASE_URL}${mediaBackdrop}`}
            alt={mediaTitle || "Backdrop"}
            fill
            sizes="100vw"
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-background/10" />
          <div className="absolute inset-0 bg-linear-to-r from-background via-transparent to-transparent" />
        </div>
      )}

      {/* ── Main Content ── */}
      <div className="relative z-10 mx-auto max-w-6xl space-y-4 px-3 pt-4 pb-16 sm:space-y-6 sm:px-4 sm:pt-8 sm:pb-20">
        {/* ── Top nav row */}
        <div className="flex items-center gap-3">
          <Link href="/entertainment">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-border/60 bg-background/70 hover:border-primary hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </Link>
          <h1 className="hidden text-base font-black tracking-tight text-foreground sm:block sm:text-xl">
            Now <span className="text-primary">Watching</span>
          </h1>
          <Link href="/entertainment" className="ml-auto">
            <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-4xl">
              TV<span className="text-primary">Hub</span>
            </h1>
          </Link>
        </div>

        {/* ── Player ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/10"
        >
          {playerComponents[activePlayer]}
        </motion.div>

        {/* ── TV Series specific UI ── */}
        <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-card/50 p-3 sm:p-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-muted-foreground">
              Season
            </span>
            <div className="flex items-center rounded-md border border-border bg-background">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none rounded-l-md hover:bg-muted"
                onClick={() => setSeason((s) => Math.max(1, s - 1))}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="flex w-10 items-center justify-center text-sm font-medium">
                {season}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none rounded-r-md hover:bg-muted"
                onClick={() => setSeason((s) => s + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-muted-foreground">
              Episode
            </span>
            <div className="flex items-center rounded-md border border-border bg-background">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none rounded-l-md hover:bg-muted"
                onClick={() => setEpisode((e) => Math.max(1, e - 1))}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="flex w-10 items-center justify-center text-sm font-medium">
                {episode}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none rounded-r-md hover:bg-muted"
                onClick={() => setEpisode((e) => e + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
          {tvShow?.seasons && (
            <span className="text-xs text-muted-foreground">
              Max Seasons: {tvShow.seasons.length}
            </span>
          )}
        </div>

        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs text-primary sm:indent-5">
            Experiencing any issues? Try these alternative players
          </span>
          <div className="flex flex-wrap gap-2">
            {ACTIVE_PLAYER.map((player) => {
              const isActivePlayer = activePlayer === player
              return (
                <Button
                  key={player}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (player === "Player 3" && isMobile) {
                      setShowPlayer3Warning(true)
                    } else {
                      setActivePlayer(player)
                    }
                  }}
                  className={[
                    "shrink-0 text-xs font-semibold whitespace-nowrap transition-all duration-200",
                    isActivePlayer
                      ? "scale-105 bg-primary text-foreground shadow-md ring-2 ring-primary/70 hover:bg-primary/90 hover:ring-primary"
                      : "border-border bg-background/80 text-muted-foreground opacity-80 hover:border-primary hover:bg-muted hover:text-primary hover:opacity-100",
                  ].join(" ")}
                >
                  {player}
                </Button>
              )
            })}
          </div>
        </div>

        {/* ── TV Episode info panel */}
        <TvEpisodeInfoPanel
          seriesId={tvId}
          seasonNumber={season}
          episodeNumber={episode}
        />

        {/* ── TV info panel */}
        <TvInfoPanel tvId={tvId} />

        {/* ── Divider */}
        <div className="h-px w-full bg-border/50" />

        {/* ── Related TV catalogs */}
        <PopularTvSection />
        <AiringTodayTvSection />
        <OnTheAirTvSection />
        <TopRatedTvSection />
      </div>

      {/* ── Player 3 Warning Dialog ── */}
      <AlertDialog
        open={showPlayer3Warning}
        onOpenChange={setShowPlayer3Warning}
      >
        <AlertDialogContent className="w-[95vw] max-w-[360px] gap-0 rounded-3xl border border-primary/20 bg-background/95 p-0 shadow-2xl shadow-primary/10 backdrop-blur-xl">
          <div className="flex items-center gap-3.5 rounded-t-3xl bg-primary/10 px-5 py-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/20 shadow-inner shadow-primary/10">
              <AlertTriangle className="h-5 w-5 text-primary drop-shadow-sm" />
            </div>
            <div>
              <AlertDialogHeader className="gap-0 p-0 text-left">
                <AlertDialogTitle className="text-base leading-none font-black tracking-tight">
                  Ad <span className="text-primary">Warning</span>
                </AlertDialogTitle>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  Player 3 · Third-party server
                </p>
              </AlertDialogHeader>
            </div>
          </div>

          <div className="space-y-3 px-5 pt-4 pb-2">
            <AlertDialogDescription className="text-[13px] leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">Player 3</span>{" "}
              may show intrusive pop-ups and redirect you to external apps or
              sites - especially on mobile.
            </AlertDialogDescription>

            <div className="space-y-1.5">
              <p className="text-[11px] font-semibold tracking-widest text-muted-foreground/60 uppercase">
                Safer alternatives
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setActivePlayer("Player 1")
                    setShowPlayer3Warning(false)
                  }}
                  className="flex-1 rounded-xl border border-border/60 bg-muted/40 py-2.5 text-xs font-bold text-foreground transition-all duration-200 hover:border-primary/50 hover:bg-primary/10 hover:text-primary active:scale-95"
                >
                  ▶ Player 1
                </button>
                <button
                  onClick={() => {
                    setActivePlayer("Player 2")
                    setShowPlayer3Warning(false)
                  }}
                  className="flex-1 rounded-xl border border-border/60 bg-muted/40 py-2.5 text-xs font-bold text-foreground transition-all duration-200 hover:border-primary/50 hover:bg-primary/10 hover:text-primary active:scale-95"
                >
                  ▶ Player 2
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2 rounded-xl bg-muted/30 px-3 py-2.5">
              <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-40" />
              <span className="text-[11px] leading-relaxed text-muted-foreground italic">
                An ad-blocker is strongly recommended if you proceed.
              </span>
            </div>
          </div>

          <AlertDialogFooter className="flex-row gap-2 px-5 pt-3 pb-5">
            <AlertDialogCancel className="mt-0 flex-1 rounded-xl border-border/50 bg-background/50 text-xs font-semibold hover:bg-muted">
              Go Back
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setActivePlayer("Player 3")
                setShowPlayer3Warning(false)
              }}
              className="flex-1 rounded-xl bg-primary text-xs font-bold text-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
            >
              Continue Anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  )
}

export default WatchTv
