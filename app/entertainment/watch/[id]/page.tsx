"use client"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "motion/react"
import { ArrowLeft } from "lucide-react"
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
import { useFetchMovieDetails } from "@/hooks/entertainment/fetch/useFetchMovieDetails"

// components
import VidKingPlayer from "@/components/custom/entertainment/player/VidKingNet"
import VidSrcMe from "@/components/custom/entertainment/player/VidSrcMe"
import MovieInfoPanel from "@/components/custom/entertainment/watch/movie-info-panel"
import PopularMovieSection from "@/components/custom/entertainment/watch/popular-movies"
import TopRatedMoviesSection from "@/components/custom/entertainment/watch/top-rated-movies"
import UpcomingMoviesSection from "@/components/custom/entertainment/watch/upcoming-movies"
import NowPlayingMoviesSection from "@/components/custom/entertainment/watch/now-playing-movies"

// zustand
import { ACTIVE_PLAYER } from "@/features/zustand/entertainment/player-buttons-store"
import { usePlayerStore } from "@/features/zustand/entertainment/player-buttons-store"
import { useWatchTracker } from "@/hooks/entertainment/progress-tracker/useWatchTracker"
import type { WatchProgress } from "@/hooks/entertainment/progress-tracker/useWatchTracker"
import VidLinkPro from "@/components/custom/entertainment/player/VidLinkPro"

/** TODO:
 * - [done] add more players
 * - [done] add watch progress
 */

// Main Watch page
const Watch = () => {
  const params = useParams()
  const movieId = params.id as string
  const { data: movie } = useFetchMovieDetails(movieId)

  // start time for tracking progress resumption
  const [startTime, setStartTime] = useState<number>(0)

  // track watch progress
  useWatchTracker(movieId, movie?.title)

  useEffect(() => {
    // Defer reading from local storage and updating state to prevent synchronous cascaded renders.
    const timeoutId = setTimeout(() => {
      const stored = localStorage.getItem("watchHistory")
      if (stored) {
        try {
          const history: Record<string, WatchProgress | undefined> =
            JSON.parse(stored)
          const progress = history[movieId]
          if (progress && progress.currentTime > 0) {
            // VidLink uses seconds for time parameter, we pass integer seconds
            const initialTime = Math.floor(progress.currentTime)
            setStartTime(initialTime)
          }
        } catch {
          // ignore errors
        }
      }
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [movieId])

  // store for the movie players
  const { setActivePlayer, activePlayer } = usePlayerStore()

  // map of player id -> component (keeps rendering logic explicit)
  const playerComponents: Record<string, JSX.Element> = {
    "Player 1": <VidLinkPro id={movieId} startTime={startTime} />,
    "Player 2": <VidSrcMe id={movieId} startTime={startTime} />,
    "Player 3": <VidKingPlayer id={movieId} startTime={startTime} />,
  }

  /**
   * Used to warn about the popup redirect ads on player 3
   */
  const [isMobile, setIsMobile] = useState(false)
  const [showPlayer3Warning, setShowPlayer3Warning] = useState(false)

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 500)
    updateIsMobile()
    window.addEventListener("resize", updateIsMobile)
    return () => window.removeEventListener("resize", updateIsMobile)
  }, [])

  if (!movieId)
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        <Spinner />
        <span className="ml-3">Movie ID is missing.</span>
      </div>
    )

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      {/* ── Backdrop image behind player ── */}
      {movie?.backdrop_path && (
        // FIX 1: Removed -z-10 and replaced with z-0 so it isn't hidden behind bg-background
        <div className="pointer-events-none absolute top-0 left-0 z-0 h-[50vh] w-full overflow-hidden">
          <Image
            src={`${BACKDROP_BASE_URL}${movie.backdrop_path}`}
            alt={movie.title || "Backdrop"}
            fill
            sizes="100vw"
            className="object-cover object-top"
            priority
          />
          {/* Gradient overlays for readability */}
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-background/10" />
          <div className="absolute inset-0 bg-linear-to-r from-background via-transparent to-transparent" />
        </div>
      )}

      {/* ── Main Content ── */}
      {/* FIX 2: Added `relative z-10` here so this entire block stacks ON TOP of the absolute backdrop */}
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
              Movie<span className="text-primary">Hub</span>
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
          {/* Player selection (uses explicit map above) */}
          {playerComponents[activePlayer]}
        </motion.div>
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

        {/* ── Movie info panel */}
        <MovieInfoPanel movieId={movieId} />

        {/* ── Divider */}
        <div className="h-px w-full bg-border/50" />

        {/* ── Related movies catalog with pagination */}
        <PopularMovieSection />

        {/* ── Now Playing movies catalog with pagination */}
        <NowPlayingMoviesSection />

        {/* ── Upcoming movies catalog with pagination */}
        <UpcomingMoviesSection />

        {/* ── Top Rated movies catalog with pagination */}
        <TopRatedMoviesSection />
      </div>

      {/* ── Player 3 Warning Dialog for Mobile ── */}
      <AlertDialog
        open={showPlayer3Warning}
        onOpenChange={setShowPlayer3Warning}
      >
        <AlertDialogContent className="w-[95vw] max-w-[360px] gap-0 rounded-3xl border border-primary/20 bg-background/95 p-0 shadow-2xl shadow-primary/10 backdrop-blur-xl">
          {/* Header band */}
          <div className="flex items-center gap-3.5 rounded-t-3xl bg-primary/10 px-5 py-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/20 shadow-inner shadow-primary/10">
              <AlertTriangle className="h-5 w-5 text-primary drop-shadow-sm" />
            </div>
            <div>
              <AlertDialogHeader className="gap-0 p-0 text-left">
                <AlertDialogTitle className="text-base font-black tracking-tight leading-none">
                  Ad <span className="text-primary">Warning</span>
                </AlertDialogTitle>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  Player 3 · Third-party server
                </p>
              </AlertDialogHeader>
            </div>
          </div>

          {/* Body */}
          <div className="px-5 pt-4 pb-2 space-y-3">
            <AlertDialogDescription className="text-[13px] leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">Player 3</span>{" "}
              may show intrusive pop-ups and redirect you to external apps or
              sites - especially on mobile.
            </AlertDialogDescription>

            {/* Safe alternatives */}
            <div className="space-y-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
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

            {/* Tip banner */}
            <div className="flex items-start gap-2 rounded-xl bg-muted/30 px-3 py-2.5">
              <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-40" />
              <span className="text-[11px] italic leading-relaxed text-muted-foreground">
                An ad-blocker is strongly recommended if you proceed.
              </span>
            </div>
          </div>

          {/* Footer */}
          <AlertDialogFooter className="flex-row gap-2 px-5 pb-5 pt-3">
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

export default Watch
