"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Clapperboard,
  Star,
  Search,
  CalendarClock,
  Flame,
  X,
  Play,
  ChevronLeft,
  ChevronRight,
  Info,
  Film,
  Tv,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useCallback, useRef, useState, useEffect } from "react"
import type { ComponentType, SVGProps } from "react"

// types
import type { SearchMoviesResponse } from "@/types/entertainment/movies/search-movies"
import type { SearchTvSeriesResponse } from "@/types/entertainment/tv-series/search-tv-series"

// hooks
import { useFetchPopularMovies } from "@/hooks/entertainment/fetch/movies/useFetchPopularMovies"
import { useFetchNowPlayingMovie } from "@/hooks/entertainment/fetch/movies/useFetchNowPlayingMovie"
import { useFetchTopRatedMovies } from "@/hooks/entertainment/fetch/movies/useFetchTopRatedMovies"
import { useFetchUpcomingMovies } from "@/hooks/entertainment/fetch/movies/useFetchUpcomingMovies"
import { useFetchSearchedMovies } from "@/hooks/entertainment/fetch/movies/useFetchSearchedMovies"
import { useFetchSearchedTvSeries } from "@/hooks/entertainment/fetch/tv-series/useFetchSearchedTvSeries"

// tv hooks
import { useFetchPopularTvSeries } from "@/hooks/entertainment/fetch/tv-series/useFetchPopular"
import { useFetchAiringTodayTvSeries } from "@/hooks/entertainment/fetch/tv-series/useFetchAiringToday"
import { useFetchOnTheAirTvSeries } from "@/hooks/entertainment/fetch/tv-series/useFetchOnTheAir"
import { useFetchTopRatedTvSeries } from "@/hooks/entertainment/fetch/tv-series/useFetchTopRated"

import PaginationControls from "@/components/custom/entertainment/PaginationControls"
import SearchResults from "@/components/custom/entertainment/SearchResults"
import { ContinueWatching } from "@/components/custom/entertainment/continue-watching"
import { StarRating } from "@/components/custom/entertainment/star-rating"
import { SpotlightCard } from "@/components/custom/entertainment/spotlight-card"
import { MovieCard } from "@/components/custom/entertainment/movie-card"
import {
  EntertainmentSkeleton,
  HeroSkeleton,
  FilterBarSkeleton,
} from "@/components/custom/entertainment/entertainment-skeleton"
import {
  buildMovieDetailsPath,
  buildTvDetailsPath,
  buildWatchMoviePath,
  buildWatchTvPath,
} from "@/lib/utils"

// state management
import {
  useFilterStore,
  MOVIE_CATEGORY_TABS,
  TV_CATEGORY_TABS,
  type MovieFiltersTab,
  type TvFiltersTab,
} from "@/features/zustand/entertainment/entertainment-filter-buttons-store"
import { useEntertainmentMode } from "@/features/zustand/entertainment/entertaiment-mode"

export default function MovieHub() {
  // Pagination stuff
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // search variable container
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [showCategoryPills, setShowCategoryPills] = useState(false)
  const [heroIndex, setHeroIndex] = useState(0)
  // search bar
  const searchInputRef = useRef<HTMLInputElement>(null)

  // clear search
  const clearFilters = useCallback(() => {
    setSearchQuery("")
    if (searchInputRef.current) {
      searchInputRef.current.value = ""
    }
  }, [])

  // Entertainment Mode Store
  const { mode, setMode } = useEntertainmentMode()
  const isMovie = mode === "Movie"

  // Tab filters Store
  const {
    activeMovieFilter,
    setActiveMovieFilter,
    moviePages,
    setMoviePage,
    activeTvFilter,
    setActiveTvFilter,
    tvPages,
    setTvPage,
  } = useFilterStore()

  const activeFilter = isMovie ? activeMovieFilter : activeTvFilter
  const tabs = isMovie ? MOVIE_CATEGORY_TABS : TV_CATEGORY_TABS

  const currentPage = isMovie
    ? moviePages[activeMovieFilter] || 1
    : tvPages[activeTvFilter] || 1

  // Reset hero index when tab, mode, or search changes (derive state during render)
  const currentFilterKey = `${activeFilter}-${mode}-${searchQuery}`
  const [prevFilterKey, setPrevFilterKey] = useState(currentFilterKey)
  if (currentFilterKey !== prevFilterKey) {
    setPrevFilterKey(currentFilterKey)
    setHeroIndex(0)
  }

  // Sync URL page with store
  useEffect(() => {
    const pageFromUrl = Number(searchParams.get("page"))
    if (!pageFromUrl) return

    if (isMovie) {
      if (pageFromUrl !== moviePages[activeMovieFilter]) {
        setMoviePage(activeMovieFilter, pageFromUrl)
      }
    } else {
      if (pageFromUrl !== tvPages[activeTvFilter]) {
        setTvPage(activeTvFilter, pageFromUrl)
      }
    }
  }, [
    searchParams,
    activeMovieFilter,
    activeTvFilter,
    isMovie,
    moviePages,
    tvPages,
    setMoviePage,
    setTvPage,
  ])

  // Search movies
  const {
    data: searchedMovie,
    isFetching: searchedMovieIsFetching,
    isError: searchedMovieIsError,
    error: searchedMovieError,
  } = useFetchSearchedMovies(isMovie ? searchQuery : "")

  // Search TV series
  const {
    data: searchedTv,
    isFetching: searchedTvIsFetching,
    isError: searchedTvIsError,
    error: searchedTvError,
  } = useFetchSearchedTvSeries(!isMovie ? searchQuery : "")

  const searchResult:
    | SearchMoviesResponse
    | SearchTvSeriesResponse
    | undefined = isMovie ? searchedMovie : searchedTv

  const searchIsFetching = isMovie
    ? searchedMovieIsFetching
    : searchedTvIsFetching
  const searchIsError = isMovie ? searchedMovieIsError : searchedTvIsError
  const searchError = isMovie ? searchedMovieError : searchedTvError

  // Category Movies Fetching
  const isPopular = activeFilter === "Popular"
  const isNowPlaying = activeFilter === "Now Playing"
  const isTopRated = activeFilter === "Top Rated"
  const isUpcoming = activeFilter === "Upcoming"
  const isAiringToday = activeFilter === "Airing Today"
  const isOnTheAir = activeFilter === "On The Air"

  const {
    data: popularData,
    isFetching: popularIsFetching,
    isError: popularIsError,
    error: popularError,
  } = useFetchPopularMovies(currentPage, isMovie && isPopular)
  const {
    data: nowPlayingData,
    isFetching: nowPlayingIsFetching,
    isError: nowPlayingIsError,
    error: nowPlayingError,
  } = useFetchNowPlayingMovie(currentPage, isMovie && isNowPlaying)
  const {
    data: topRatedData,
    isFetching: topRatedIsFetching,
    isError: topRatedIsError,
    error: topRatedError,
  } = useFetchTopRatedMovies(currentPage, isMovie && isTopRated)
  const {
    data: upcomingData,
    isFetching: upcomingIsFetching,
    isError: upcomingIsError,
    error: upcomingError,
  } = useFetchUpcomingMovies(currentPage, isMovie && isUpcoming)

  const {
    data: popularTvData,
    isFetching: popularTvIsFetching,
    isError: popularTvIsError,
    error: popularTvError,
  } = useFetchPopularTvSeries(currentPage, !isMovie && isPopular)
  const {
    data: airingTodayTvData,
    isFetching: airingTodayTvIsFetching,
    isError: airingTodayTvIsError,
    error: airingTodayTvError,
  } = useFetchAiringTodayTvSeries(currentPage, !isMovie && isAiringToday)
  const {
    data: topRatedTvData,
    isFetching: topRatedTvIsFetching,
    isError: topRatedTvIsError,
    error: topRatedTvError,
  } = useFetchTopRatedTvSeries(currentPage, !isMovie && isTopRated)
  const {
    data: onTheAirTvData,
    isFetching: onTheAirTvIsFetching,
    isError: onTheAirTvIsError,
    error: onTheAirTvError,
  } = useFetchOnTheAirTvSeries(currentPage, !isMovie && isOnTheAir)

  // Determine active data
  const categoryData = isMovie
    ? isPopular
      ? popularData
      : isNowPlaying
        ? nowPlayingData
        : isTopRated
          ? topRatedData
          : upcomingData
    : isPopular
      ? popularTvData
      : isAiringToday
        ? airingTodayTvData
        : isTopRated
          ? topRatedTvData
          : onTheAirTvData

  const isFetching = isMovie
    ? isPopular
      ? popularIsFetching
      : isNowPlaying
        ? nowPlayingIsFetching
        : isTopRated
          ? topRatedIsFetching
          : upcomingIsFetching
    : isPopular
      ? popularTvIsFetching
      : isAiringToday
        ? airingTodayTvIsFetching
        : isTopRated
          ? topRatedTvIsFetching
          : onTheAirTvIsFetching

  const isError = isMovie
    ? isPopular
      ? popularIsError
      : isNowPlaying
        ? nowPlayingIsError
        : isTopRated
          ? topRatedIsError
          : upcomingIsError
    : isPopular
      ? popularTvIsError
      : isAiringToday
        ? airingTodayTvIsError
        : isTopRated
          ? topRatedTvIsError
          : onTheAirTvIsError

  const error = isMovie
    ? isPopular
      ? popularError
      : isNowPlaying
        ? nowPlayingError
        : isTopRated
          ? topRatedError
          : upcomingError
    : isPopular
      ? popularTvError
      : isAiringToday
        ? airingTodayTvError
        : isTopRated
          ? topRatedTvError
          : onTheAirTvError

  const movies = categoryData as
    | {
        results: Array<{
          id: number
          title?: string
          name?: string
          poster_path: string | null
          backdrop_path: string | null
          vote_average: number
          original_language: string
          release_date?: string
          first_air_date?: string
          overview: string
        }>
        total_pages: number
      }
    | undefined

  // Map each category to an icon
  const filterIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
    Popular: Flame,
    "Now Playing": Clapperboard,
    "Top Rated": Star,
    Upcoming: CalendarClock,
    "Airing Today": CalendarClock,
    "On The Air": Clapperboard,
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-400">
        <div className="space-y-2 text-center">
          <Clapperboard className="mx-auto h-10 w-10 text-zinc-600" />
          <p className="text-lg font-medium">
            {error?.message || "Failed to load movies."}
          </p>
          <p className="text-sm text-zinc-600">Please try again later.</p>
        </div>
      </div>
    )
  }

  const maxHeroItems = Math.min(5, movies?.results.length || 0)
  const validHeroIndex = heroIndex < maxHeroItems ? heroIndex : 0
  const featuredMovie = movies?.results[validHeroIndex]
  // Spotlight will pick a movie after the ones in the hero, if available
  const spotlightMovie = movies?.results[maxHeroItems] || movies?.results[1]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ══════════════════════ HERO BANNER ══════════════════════ */}
      <section className="relative h-[420px] w-full overflow-hidden bg-zinc-950 sm:h-[500px]">
        {/* Backdrop image */}
        {featuredMovie?.backdrop_path && (
          <>
            <Image
              src={`https://image.tmdb.org/t/p/w1280${featuredMovie.backdrop_path}`}
              alt={featuredMovie.title || featuredMovie.name || "Featured"}
              fill
              sizes="100vw"
              className="object-cover object-top opacity-50"
              priority
            />
            {/* Layered gradients */}
            <div className="absolute inset-0 bg-linear-to-b from-background/60 via-transparent to-background" />
            <div className="absolute inset-0 bg-linear-to-r from-background via-background/40 to-transparent" />
          </>
        )}

        {/* Hero content */}
        {isFetching ? (
          <HeroSkeleton />
        ) : (
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto flex w-full max-w-7xl flex-col items-end justify-between px-6 pb-10 sm:flex-row">
              <div className="w-full max-w-2xl space-y-4">
                {/* Mode pill */}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-xs font-bold tracking-wide text-primary uppercase backdrop-blur-sm">
                  {isMovie ? (
                    <Film className="h-3 w-3" />
                  ) : (
                    <Tv className="h-3 w-3" />
                  )}
                  {isMovie ? "Movie" : "TV Series"}
                </span>

                {/* Title */}
                <h1 className="text-4xl leading-none font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {(
                    featuredMovie?.title ||
                    featuredMovie?.name ||
                    ""
                  ).toUpperCase()}
                </h1>

                {/* Description */}
                <p className="line-clamp-3 max-w-lg text-sm leading-relaxed text-zinc-300 sm:text-base">
                  {featuredMovie?.overview}
                </p>

                {/* Rating */}
                {featuredMovie && (
                  <StarRating rating={featuredMovie.vote_average} />
                )}

                {/* CTA buttons */}
                {featuredMovie && (
                  <div className="flex items-center gap-3 pt-1">
                    <Link
                      href={
                        isMovie
                          ? buildWatchMoviePath(
                              featuredMovie.id,
                              featuredMovie.title
                            )
                          : buildWatchTvPath(
                              featuredMovie.id,
                              featuredMovie.name
                            )
                      }
                    >
                      <Button className="gap-2 rounded-full bg-primary px-7 py-2.5 font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-primary/40">
                        <Play className="h-4 w-4 fill-current" />
                        Watch Now
                      </Button>
                    </Link>
                    <Link
                      href={
                        isMovie
                          ? buildMovieDetailsPath(
                              featuredMovie.id,
                              featuredMovie.title
                            )
                          : buildTvDetailsPath(
                              featuredMovie.id,
                              featuredMovie.name
                            )
                      }
                    >
                      <Button
                        variant="outline"
                        className="gap-2 rounded-full border-zinc-500 px-6 py-2.5 text-zinc-200 backdrop-blur-sm hover:border-zinc-300 hover:text-white"
                      >
                        <Info className="h-4 w-4" />
                        Details
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Pagination Controls */}
              {maxHeroItems > 1 && (
                <div className="mt-6 flex flex-col items-end gap-3 sm:mt-0">
                  {/* Dots indicator */}
                  <div className="flex items-center gap-2">
                    {Array.from({ length: maxHeroItems }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setHeroIndex(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === validHeroIndex
                            ? "w-8 bg-primary"
                            : "w-2 bg-zinc-600 hover:bg-zinc-400"
                        }`}
                        aria-label={`Go to featured movie ${i + 1}`}
                      />
                    ))}
                  </div>

                  {/* Left/Right Arrows */}
                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        setHeroIndex(
                          (i) => (i - 1 + maxHeroItems) % maxHeroItems
                        )
                      }
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-primary hover:text-primary-foreground"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() =>
                        setHeroIndex((i) => (i + 1) % maxHeroItems)
                      }
                      className="flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-primary hover:text-primary-foreground"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* ══════════════════════ STICKY FILTER BAR ══════════════════════ */}
      {isFetching ? (
        <FilterBarSkeleton />
      ) : (
        <div className="sticky top-0 z-30 border-b border-zinc-800/60 bg-background/80 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6 py-4">
            {/* Row 1: Mode toggle + Search */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                {/* Mode toggle */}
                <div className="flex overflow-hidden rounded-full border border-zinc-700 bg-zinc-900/50">
                  <button
                    onClick={() => setMode("Movie")}
                    className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold transition-all ${
                      isMovie
                        ? "bg-primary text-primary-foreground"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <Film className="h-3.5 w-3.5" />
                    Movies
                  </button>
                  <button
                    onClick={() => setMode("TV series")}
                    className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold transition-all ${
                      !isMovie
                        ? "bg-primary text-primary-foreground"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    <Tv className="h-3.5 w-3.5" />
                    Series
                  </button>
                </div>

                {/* Search hint */}
                {searchQuery && (
                  <span className="hidden text-xs text-zinc-500 sm:block">
                    {isMovie
                      ? "Looking for a TV show? Switch modes."
                      : "Looking for a movie? Switch modes."}
                  </span>
                )}
              </div>

              {/* Search bar */}
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <Input
                  placeholder={`Search ${isMovie ? "movies" : "TV series"}...`}
                  ref={searchInputRef}
                  defaultValue={searchQuery}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSearchQuery(searchInputRef.current?.value ?? "")
                    }
                  }}
                  className="rounded-full border-zinc-700 bg-zinc-900/50 pr-20 pl-9 text-sm text-foreground placeholder:text-zinc-600 focus-visible:border-primary focus-visible:ring-primary/30"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="absolute top-1/2 right-1 -translate-y-1/2 gap-1 rounded-full px-2 text-xs text-zinc-500 hover:bg-transparent hover:text-zinc-200"
                  >
                    <X className="h-3.5 w-3.5" />
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {/* Row 2: Category tabs */}
            <div className="mt-3 flex items-center gap-1">
              {/* Mobile toggle */}
              <div className="flex md:hidden">
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => setShowCategoryPills((prev) => !prev)}
                  className="px-2 py-1 text-[11px] text-zinc-400"
                >
                  {showCategoryPills ? "Hide" : "Categories"}
                </Button>
              </div>

              {/* Category pills */}
              <div
                className={`${showCategoryPills ? "flex flex-wrap" : "hidden md:flex"} gap-1`}
              >
                {tabs.map((category) => {
                  const isActive = activeFilter === category
                  const Icon = filterIcons[category] ?? Clapperboard
                  return (
                    <button
                      key={category}
                      onClick={() => {
                        if (isMovie) {
                          const mCategory = category as MovieFiltersTab
                          setActiveMovieFilter(mCategory)
                          router.push(
                            `${pathname}?page=${moviePages[mCategory] || 1}`
                          )
                        } else {
                          const tCategory = category as TvFiltersTab
                          setActiveTvFilter(tCategory)
                          router.push(
                            `${pathname}?page=${tvPages[tCategory] || 1}`
                          )
                        }
                      }}
                      className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-primary/15 text-primary ring-1 ring-primary/30"
                          : "text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300"
                      }`}
                    >
                      <Icon className="h-3 w-3" />
                      {category}
                      {isActive && (
                        <span className="ml-0.5 h-1.5 w-1.5 rounded-full bg-primary" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════ MAIN CONTENT ══════════════════════ */}
      <div className="mx-auto max-w-7xl px-6 pt-6 pb-16">
        <main>
          {/* Continue Watching */}
          {!searchQuery && <ContinueWatching />}

          {/* Search Results */}
          <SearchResults
            searchResult={searchResult}
            searchQuery={searchQuery}
            isFetching={searchIsFetching}
            isError={searchIsError}
            error={searchError}
          />

          {/* Section header */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {(() => {
                const Icon = filterIcons[activeFilter] ?? Clapperboard
                return <Icon className="h-4 w-4 text-primary" />
              })()}
              <h2 className="text-sm font-bold tracking-wide text-foreground">
                {activeFilter}
              </h2>
            </div>
            <span className="text-xs font-medium text-zinc-500">
              {movies?.results.length} results
            </span>
          </div>

          {/* ── Movie Grid ── */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {isFetching ? (
              <EntertainmentSkeleton count={20} />
            ) : (
              movies?.results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} isMovie={isMovie} />
              ))
            )}
          </div>

          {/* Spotlight after grid (if enough items) */}
          {spotlightMovie && !isFetching && !searchQuery && (
            <SpotlightCard movie={spotlightMovie} isMovie={isMovie} />
          )}
        </main>

        {/* Pagination */}
        {Number(movies?.total_pages) > 1 && (
          <div className="mt-14 flex justify-center">
            <PaginationControls
              currentPage={currentPage}
              totalPages={Math.min(Number(movies?.total_pages), 500)}
              route="/entertainment"
              onPageChange={(page) => {
                if (isMovie) {
                  setMoviePage(activeFilter as MovieFiltersTab, page)
                } else {
                  setTvPage(activeFilter as TvFiltersTab, page)
                }
                router.push(`${pathname}?page=${page}`)
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
