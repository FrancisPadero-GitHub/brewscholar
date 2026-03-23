"use client"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "motion/react"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import type { JSX } from "react"

// helpers
import { BACKDROP_BASE_URL } from "@/constants/image-size"

// types
import { useFetchMovieDetails } from "@/hooks/entertainment/fetch/useFetchMovieDetails"

// components
import VidKingPlayer from "@/components/custom/entertainment/player/VidKingNet"
import VidSrcMe from "@/components/custom/entertainment/player/VidSrcMe"
import MovieInfoPanel from "@/components/custom/entertainment/watch/movie-info-panel"
import RelatedMoviesSection from "@/components/custom/entertainment/watch/related-movies"

// zustand
import { ACTIVE_PLAYER } from "@/features/zustand/entertainment/player-buttons-store"
import { usePlayerStore } from "@/features/zustand/entertainment/player-buttons-store"
import VidLinkPro from "@/components/custom/entertainment/player/VidLinkPro"

// Main Watch page
const Watch = () => {
  const params = useParams()
  const movieId = params.id as string
  const { data: movie } = useFetchMovieDetails(movieId)

  // store for the movie players
  const { setActivePlayer, activePlayer } = usePlayerStore()

  // map of player id -> component (keeps rendering logic explicit)
  const playerComponents: Record<string, JSX.Element> = {
    "Player 1": <VidLinkPro id={movieId} />,
    "Player 2": <VidKingPlayer id={movieId} />,
    "Player 3": <VidSrcMe id={movieId} />,
  }

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
      <div className="relative z-10 mx-auto max-w-6xl space-y-6 px-4 pt-8 pb-20">
        {/* ── Top nav row */}
        <div className="flex items-center gap-4">
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
          <h1 className="text-xl font-black tracking-tight text-foreground">
            Now <span className="text-primary">Watching</span>
          </h1>
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
        <div className="flex items-center justify-between gap-2">
          <span className="indent-5 text-xs text-primary">
            Experiencing any issues? Try these alternative players
          </span>
          <div className="flex gap-2">
            {ACTIVE_PLAYER.map((player) => {
              const isActivePlayer = activePlayer === player
              return (
                <Button
                  key={player}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setActivePlayer(player)
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
        <RelatedMoviesSection />
      </div>
    </main>
  )
}

export default Watch
