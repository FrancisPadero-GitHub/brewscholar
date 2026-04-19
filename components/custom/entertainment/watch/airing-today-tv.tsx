import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { useState, useRef } from "react"
import { Star, MonitorPlay, ChevronLeft, ChevronRight, CalendarClock } from "lucide-react"

// components
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// types
import type { AiringTodayTvSeriesResult } from "@/types/entertainment/tv-series/airing-today"

// helper
import { IMAGE_BASE_URL } from "@/constants/image-size"
import { getRatingColor } from "@/helpers/entertainment/movie-details/movie-details"

// hooks
import { useFetchAiringTodayTvSeries } from "@/hooks/entertainment/fetch/tv-series/useFetchAiringToday"

function AiringTodayTvCard({ tvShow }: { tvShow: AiringTodayTvSeriesResult }) {
  const ratingColor = getRatingColor(tvShow.vote_average)
  const year = tvShow.first_air_date ? tvShow.first_air_date.split("-")[0] : "TBA"

  return (
    <Link href={`/entertainment/watch-tv/${tvShow.id}`}>
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="group relative w-36 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-border bg-card shadow-md transition-shadow hover:shadow-xl hover:shadow-primary/15 sm:w-40"
      >
        <div className="relative aspect-2/3 w-full overflow-hidden">
          {tvShow.poster_path ? (
            <Image
              src={`${IMAGE_BASE_URL}${tvShow.poster_path}`}
              alt={tvShow.name}
              fill
              sizes="160px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <MonitorPlay className="h-10 w-10 text-muted-foreground" />
            </div>
          )}

          <div
            className={`absolute top-2 left-2 flex items-center gap-1 rounded-md bg-card/80 px-1.5 py-0.5 text-xs font-bold backdrop-blur-sm ${ratingColor}`}
          >
            <Star className="h-3 w-3 fill-current" />
            {tvShow.vote_average.toFixed(1)}
          </div>
        </div>

        <div className="p-2.5">
          <p className="truncate text-xs leading-snug font-semibold text-foreground">
            {tvShow.name}
          </p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">{year}</p>
        </div>
      </motion.div>
    </Link>
  )
}

export default function AiringTodayTvSection() {
  const [page, setPage] = useState(1)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { data, isFetching } = useFetchAiringTodayTvSeries(page)

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
      if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 5) {
        setPage((p) => Math.min(totalPagesFiltered, p + 1))
      } else {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
      }
    }
  }

  const totalPagesRaw = data?.total_pages ?? 0
  const totalPagesFiltered = Math.min(totalPagesRaw, 500)
  const tvShows = data?.results ?? []

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-1 text-xs font-semibold tracking-widest text-primary uppercase sm:gap-2 sm:text-sm">
          <CalendarClock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          Airing Today
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
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 left-2 z-10 h-8 w-8 -translate-y-1/2 rounded-full border-2 border-primary bg-background/95 text-primary shadow-xl transition-none hover:bg-primary hover:text-primary-foreground sm:h-10 sm:w-10"
              onClick={scrollLeft}
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>

            <motion.div
              ref={scrollRef}
              key={page}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border no-scrollbar flex gap-3 overflow-x-auto pb-3"
            >
              {tvShows.map((tvShow) => (
                <AiringTodayTvCard key={tvShow.id} tvShow={tvShow} />
              ))}
            </motion.div>

            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 right-2 z-10 h-8 w-8 -translate-y-1/2 rounded-full border-2 border-primary bg-background/95 text-primary shadow-xl transition-none hover:bg-primary hover:text-primary-foreground sm:h-10 sm:w-10"
              onClick={scrollRight}
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </>
        )}
      </div>
    </section>
  )
}
