"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Film,
  Star,
  Search,
  Calendar,
  // ChevronRight,
  Flame,
  X,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useCallback, useRef, useState, useEffect } from "react"

// types
import type { MoviesApiResponse } from "@/types/entertainment/movies/popular-movies"
import type { NowPlayingMoviesResponse } from "@/types/entertainment/movies/now-playing-movies"
import type { TopRatedMoviesResponse } from "@/types/entertainment/movies/top-rated-movies"
import type { UpcomingMoviesResponse } from "@/types/entertainment/movies/upcoming-movies"
import type { SearchMoviesResponse } from "@/types/entertainment/movies/search-movies"

// hooks
import { useFetchPopularMovies } from "@/hooks/entertainment/fetch/useFetchPopularMovies"
import { useFetchNowPlayingMovie } from "@/hooks/entertainment/fetch/useFetchNowPlayingMovie"
import { useFetchTopRatedMovies } from "@/hooks/entertainment/fetch/useFetchTopRatedMovies"
import { useFetchUpcomingMovies } from "@/hooks/entertainment/fetch/useFetchUpcomingMovies"
import { useFetchSearchedMovies } from "@/hooks/entertainment/fetch/useFetchSearchedMovies"

// components
import PaginationControls from "@/components/custom/entertainment/PaginationControls"
import SearchResults from "@/components/custom/entertainment/SearchResults"

// helper
import { IMAGE_BASE_URL } from "@/constants/image-size"
import { getRatingColor } from "@/helpers/entertainment/movie-details/movie-details"
import { Separator } from "@/components/ui/separator"

// state management
import {
  useFilterStore,
  CATEGORY_TABS,
} from "@/features/zustand/entertainment/filter-buttons-store"

/** TODO:
 * - Add search
 * - Add more movie sections
 * - Add favorites
 * - Add watchlists
 */

export default function MovieHub() {
  // Pagination stuff
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // search variable container
  const [searchQuery, setSearchQuery] = useState<string>("")
  // search bar
  const searchInputRef = useRef<HTMLInputElement>(null)

  // clear search
  const clearFilters = useCallback(() => {
    // 1. Clear the React state
    setSearchQuery("")

    // 2. Clear the actual visual input box
    if (searchInputRef.current) {
      searchInputRef.current.value = ""
    }
  }, [])

  // Tab filters Store
  const { activeFilter, setActiveFilter, pages, setPage } = useFilterStore()
  const currentPage = pages[activeFilter] || 1

  // Sync URL page with store if a user shares a link directly
  useEffect(() => {
    const pageFromUrl = Number(searchParams.get("page"))
    if (pageFromUrl && pageFromUrl !== pages[activeFilter]) {
      setPage(activeFilter, pageFromUrl)
    }
  }, [searchParams, activeFilter, pages, setPage])

  // Search movies
  const {
    data: searchedMovie,
    isFetching: searchedMovieIsFetching,
    isError: searchedMovieIsError,
    error: searchedMovieError,
  } = useFetchSearchedMovies(searchQuery)

  const searchResult = searchedMovie as SearchMoviesResponse | undefined

  // Category Movies Fetching
  const isPopular = activeFilter === "Popular"
  const isNowPlaying = activeFilter === "Now Playing"
  const isTopRated = activeFilter === "Top Rated"
  const isUpcoming = activeFilter === "Upcoming"

  const {
    data: popularData,
    isFetching: popularIsFetching,
    isError: popularIsError,
    error: popularError,
  } = useFetchPopularMovies(currentPage, isPopular)
  const {
    data: nowPlayingData,
    isFetching: nowPlayingIsFetching,
    isError: nowPlayingIsError,
    error: nowPlayingError,
  } = useFetchNowPlayingMovie(currentPage, isNowPlaying)
  const {
    data: topRatedData,
    isFetching: topRatedIsFetching,
    isError: topRatedIsError,
    error: topRatedError,
  } = useFetchTopRatedMovies(currentPage, isTopRated)
  const {
    data: upcomingData,
    isFetching: upcomingIsFetching,
    isError: upcomingIsError,
    error: upcomingError,
  } = useFetchUpcomingMovies(currentPage, isUpcoming)

  // Determine which data and error states to use based on the active filter
  const categoryData = isPopular
    ? popularData
    : isNowPlaying
      ? nowPlayingData
      : isTopRated
        ? topRatedData
        : upcomingData
  const isFetching = isPopular
    ? popularIsFetching
    : isNowPlaying
      ? nowPlayingIsFetching
      : isTopRated
        ? topRatedIsFetching
        : upcomingIsFetching
  const isError = isPopular
    ? popularIsError
    : isNowPlaying
      ? nowPlayingIsError
      : isTopRated
        ? topRatedIsError
        : upcomingIsError
  const error = isPopular
    ? popularError
    : isNowPlaying
      ? nowPlayingError
      : isTopRated
        ? topRatedError
        : upcomingError

  const movies = categoryData as
    | MoviesApiResponse
    | NowPlayingMoviesResponse
    | TopRatedMoviesResponse
    | UpcomingMoviesResponse
    | undefined

  if (isFetching)
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Spinner className="h-6 w-6 text-primary" />
      </div>
    )

  if (!movies || isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">
        <div className="space-y-2 text-center">
          <Film className="mx-auto h-10 w-10 text-muted" />
          <p className="text-lg font-medium">
            {error?.message || "Failed to load movies."}
          </p>
          <p className="text-sm text-zinc-600">Please try again later.</p>
        </div>
      </div>
    )
  }

  const featuredMovie = movies.results[0]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Hero Banner (first movie as backdrop) ── */}
      {featuredMovie.backdrop_path && (
        <div className="relative h-72 w-full overflow-hidden">
          <Image
            src={`https://image.tmdb.org/t/p/w1280${featuredMovie.backdrop_path}`}
            alt={featuredMovie.title}
            fill
            sizes="100vw"
            className="object-cover object-top opacity-30"
            priority
          />
          {/* layered linear: top dark → transparent → strong bottom */}
          <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background" />
          <div className="absolute inset-0 bg-linear-to-r from-background via-transparent to-transparent" />

          {/* Floating header text inside hero */}
          <div className="absolute bottom-8 left-1/2 w-full max-w-7xl -translate-x-1/2 px-6">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-4xl font-black tracking-tight text-foreground">
                  Movie<span className="text-primary">Hub</span>
                </h1>
              </div>
              {/* <Link href="#">
                <Button className="bg-primary font-bold text-background shadow-lg shadow-primary/20 transition-all hover:bg-primary/80">
                  <Film className="mr-2 h-4 w-4" />
                  Browse All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link> */}
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-6 pb-16">
        {/* ── Search + Categories bar ── */}
        <div className="sticky top-0 z-20 -mx-6 mb-8 space-y-5 border-border bg-background/80 px-6 backdrop-blur-md">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search movies, genres…"
                ref={searchInputRef}
                defaultValue={searchQuery}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setSearchQuery(searchInputRef.current?.value ?? "")
                  }
                }}
                // Added pr-28 to leave space for the button on the right
                className="border-border bg-muted pr-28 pl-9 text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary"
              />

              {/* Only show the clear button if there is actually a search query */}
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  // Added absolute positioning to pin it to the right
                  className="absolute top-0 right-1 h-7 gap-1 px-2 text-xs text-muted-foreground hover:bg-transparent hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear
                </Button>
              )}
            </div>

            {/* Category pills */}
            <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-0.5">
              {CATEGORY_TABS.map((category) => {
                const isActive = activeFilter === category
                return (
                  <Button
                    key={category}
                    size="sm"
                    onClick={() => {
                      setActiveFilter(category)
                      router.push(`${pathname}?page=${pages[category] || 1}`)
                    }}
                    variant={isActive ? "default" : "outline"}
                    className={
                      isActive
                        ? "shrink-0 bg-primary text-xs font-semibold whitespace-nowrap text-background hover:bg-primary/80"
                        : "shrink-0 border-border text-xs whitespace-nowrap text-muted-foreground hover:border-primary hover:bg-muted hover:text-primary"
                    }
                  >
                    {category}
                  </Button>
                )
              })}
            </div>
          </div>
          <Separator />
        </div>

        {/* ── Movie Grid ── */}
        <main>
          {/* Search results Here */}
          <SearchResults
            searchResult={searchResult}
            searchQuery={searchQuery}
            isFetching={searchedMovieIsFetching}
            isError={searchedMovieIsError}
            error={searchedMovieError}
          />

          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-primary" />
              <h2 className="text-xs font-semibold tracking-widest text-primary uppercase">
                {activeFilter}
              </h2>
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              {movies.results.length} results
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {movies.results.map((movie) => (
              <Link
                key={movie.id}
                href={`/entertainment/movie-details/${movie.id}`}
                className="group block"
              >
                <Card className="flex h-full flex-col gap-0 overflow-hidden border-border bg-muted p-0 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-xl hover:shadow-primary/5">
                  {/* Poster */}
                  <div className="relative aspect-2/3 overflow-hidden bg-muted">
                    {movie.poster_path ? (
                      <Image
                        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                        alt={movie.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Film className="h-10 w-10 text-muted" />
                      </div>
                    )}

                    {/* linear overlay on hover */}
                    <div className="absolute inset-0 bg-linear-to-t from-muted via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Rating badge */}
                    <div
                      className={`absolute top-2 right-2 flex items-center gap-1 rounded-full bg-background/80 px-2 py-0.5 text-xs font-bold backdrop-blur-sm ${getRatingColor(movie.vote_average)}`}
                    >
                      <Star className="h-2.5 w-2.5 fill-current" />
                      {movie.vote_average
                        ? movie.vote_average.toFixed(1)
                        : "NR"}
                    </div>

                    {/* Language tag */}
                    <div className="absolute top-2 left-2 rounded-sm bg-background/70 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-muted-foreground uppercase backdrop-blur-sm">
                      {movie.original_language}
                    </div>
                  </div>

                  {/* Info */}
                  <CardHeader className="p-3 pb-1">
                    <CardTitle className="line-clamp-1 text-sm leading-tight font-bold text-foreground transition-colors group-hover:text-primary">
                      {movie.title}
                    </CardTitle>
                    <div className="mt-1 flex items-center gap-1">
                      <Calendar className="h-2.5 w-2.5 text-muted" />
                      <span className="text-[11px] text-muted-foreground">
                        {movie.release_date
                          ? movie.release_date.split("-")[0]
                          : "TBA"}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="mt-auto p-3 pt-2">
                    <CardDescription className="line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
                      {movie.overview || "No description available."}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </main>

        {/* Pagination */}
        {movies.total_pages > 1 && (
          <div className="mt-14 flex justify-center">
            <PaginationControls
              currentPage={currentPage}
              // Even though it says a lot of pages, TMDB only returns 500 movies in popular section
              totalPages={Math.min(movies.total_pages, 500)}
              route="/entertainment"
              onPageChange={(page) => {
                setPage(activeFilter, page)
                router.push(`${pathname}?page=${page}`)
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
