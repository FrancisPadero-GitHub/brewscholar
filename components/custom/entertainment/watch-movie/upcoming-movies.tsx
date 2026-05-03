import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { useEffect, useState, useRef } from "react"
import {
  Star,
  Film,
  ChevronLeft,
  ChevronRight,
  CalendarClock,
  Plus,
  Mouse,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// components
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// types
import type { MovieResult } from "@/types/entertainment/movies/upcoming-movies"

// helper
import { IMAGE_BASE_URL } from "@/constants/image-size"
import { getRatingColor } from "@/helpers/entertainment/movie-details/movie-details"
import { buildMovieDetailsPath } from "@/lib/utils"

// hooks
import { useFetchUpcomingMovies } from "@/hooks/entertainment/fetch/movies/useFetchUpcomingMovies"

// Upcoming movie card
function UpcomingMovieCard({ movie }: { movie: MovieResult }) {
  const ratingColor = getRatingColor(movie.vote_average)
  const year = movie.release_date ? movie.release_date.split("-")[0] : "TBA"

  return (
    <Link href={buildMovieDetailsPath(movie.id, movie.title)}>
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="group relative w-36 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-border bg-card shadow-md transition-shadow hover:shadow-xl hover:shadow-primary/15 sm:w-40"
      >
        {/* Poster */}
        <div className="relative aspect-2/3 w-full overflow-hidden">
          {movie.poster_path ? (
            <Image
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              fill
              sizes="160px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <Film className="h-10 w-10 text-muted-foreground" />
            </div>
          )}

          {/* Rating badge */}
          <div
            className={`absolute top-2 left-2 flex items-center gap-1 rounded-md bg-card/80 px-1.5 py-0.5 text-xs font-bold backdrop-blur-sm ${ratingColor}`}
          >
            <Star className="h-3 w-3 fill-current" />
            {movie.vote_average.toFixed(1)}
          </div>
        </div>

        {/* Info */}
        <div className="p-2.5">
          <p className="truncate text-xs leading-snug font-semibold text-foreground">
            {movie.title}
          </p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">{year}</p>
        </div>
      </motion.div>
    </Link>
  )
}

// Upcoming movies carousel with pagination
export default function UpcomingMoviesSection() {
  const [page, setPage] = useState(1)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const holdTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const holdIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const { data, isFetching } = useFetchUpcomingMovies(page)

  const clearHoldTimers = () => {
    if (holdTimeoutRef.current) {
      clearTimeout(holdTimeoutRef.current)
      holdTimeoutRef.current = null
    }
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current)
      holdIntervalRef.current = null
    }
  }

  const updateScrollButtons = () => {
    const el = scrollRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 5)
  }

  const scrollLeft = () => {
    if (scrollRef.current) {
      if (scrollRef.current.scrollLeft <= 0) {
        setPage((p) => Math.max(1, p - 1))
      } else {
        scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
      }
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      // Allow a small 5px threshold for varying sub-pixel or browser calculations
      if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 5) {
        setPage((p) => Math.min(totalPagesFiltered, p + 1))
      } else {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
      }
    }
  }

  const startContinuousScroll = (direction: "left" | "right") => {
    const action = direction === "left" ? scrollLeft : scrollRight
    clearHoldTimers()
    action()
    holdTimeoutRef.current = setTimeout(() => {
      holdIntervalRef.current = setInterval(action, 220)
    }, 260)
  }

  useEffect(() => {
    if (isFetching) {
      clearHoldTimers()
    }
  }, [isFetching])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleResize = () => updateScrollButtons()
    updateScrollButtons()

    el.addEventListener("scroll", updateScrollButtons, { passive: true })
    window.addEventListener("resize", handleResize)

    return () => {
      el.removeEventListener("scroll", updateScrollButtons)
      window.removeEventListener("resize", handleResize)
    }
  }, [page, isFetching])

  useEffect(() => {
    return () => {
      clearHoldTimers()
    }
  }, [])

  const totalPagesRaw = data?.total_pages ?? 1
  const totalPagesFiltered = Math.min(totalPagesRaw, 500)
  const movies = data?.results ?? []

  return (
    <section className="space-y-4">
      {/* Header + Pagination controls */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-1 text-xs font-semibold tracking-widest text-primary uppercase sm:gap-2 sm:text-sm">
          <CalendarClock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Upcoming Movies
        </h2>

        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-[10px] text-muted-foreground tabular-nums sm:text-xs">
            Page {page} / {totalPagesFiltered}
          </span>
          <Button
            variant="outline"
            size="icon"
            className="h-6 w-6 border-border/60 hover:border-primary hover:text-primary sm:h-7 sm:w-7"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1 || isFetching}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 border-border/60 hover:border-primary hover:text-primary"
            onClick={() => setPage((p) => Math.min(totalPagesFiltered, p + 1))}
            disabled={page >= totalPagesFiltered || isFetching}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Horizontal scrollable catalog */}
      <div className="group/scroll relative">
        {isFetching ? (
          <div className="flex gap-3 overflow-hidden pb-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="w-36 shrink-0 sm:w-40">
                <Skeleton className="aspect-2/3 w-full rounded-xl" />
                <Skeleton className="mt-2 h-3 w-3/4 rounded" />
                <Skeleton className="mt-1 h-2.5 w-1/2 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Scroll Left Button */}
            {canScrollLeft && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="default"
                    size="icon"
                    className="absolute top-1/2 left-5 z-10 h-8 w-8 cursor-pointer rounded-full border-2 border-primary bg-primary/70 hover:bg-primary sm:h-10 sm:w-10"
                    onPointerDown={() => startContinuousScroll("left")}
                    onPointerUp={clearHoldTimers}
                    onPointerLeave={clearHoldTimers}
                    onPointerCancel={clearHoldTimers}
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold">Shift</span>
                    <Plus className="h-3 w-3" />
                    <Mouse className="h-4 w-4" />
                    <ArrowUp className="h-4 w-4" />
                  </div>
                </TooltipContent>
              </Tooltip>
            )}

            <motion.div
              ref={scrollRef}
              key={page}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              onScroll={updateScrollButtons}
              className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border no-scrollbar flex gap-3 overflow-x-auto pb-3"
            >
              {movies.map((movie) => (
                <UpcomingMovieCard key={movie.id} movie={movie} />
              ))}
            </motion.div>

            {/* Scroll Right Button */}
            {canScrollRight && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="default"
                    size="icon"
                    className="absolute top-1/2 right-5 z-10 h-8 w-8 cursor-pointer rounded-full border-2 border-primary bg-primary/70 hover:bg-primary sm:h-10 sm:w-10"
                    onPointerDown={() => startContinuousScroll("right")}
                    onPointerUp={clearHoldTimers}
                    onPointerLeave={clearHoldTimers}
                    onPointerCancel={clearHoldTimers}
                  >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold">Shift</span>
                    <Plus className="h-3 w-3" />
                    <Mouse className="h-4 w-4" />
                    <ArrowDown className="h-4 w-4" />
                  </div>
                </TooltipContent>
              </Tooltip>
            )}
          </>
        )}
      </div>
    </section>
  )
}
