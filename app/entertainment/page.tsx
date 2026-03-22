"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Film, Star, Search, Calendar, ChevronRight, Flame } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { categories } from "@/data/entertaiment/data"
import { useSearchParams } from "next/navigation"

// types
import type { MoviesApiResponse } from "@/types/entertainment/movies/popular-movies"

// hooks
import { useFetchPopularMovies } from "@/hooks/entertainment/fetch/useFetchPopularMovies"

// components
import { Spinner } from "@/components/ui/spinner"
import PaginationControls from "@/components/custom/entertainment/movies/PaginationControls"

// for the preview images
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"

function getRatingColor(rating: number) {
  if (rating >= 8) return "text-emerald-400"
  if (rating >= 6.5) return "text-amber-400"
  return "text-rose-400"
}

export default function MovieHub() {
  // pagination stuff
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1

  const { data, isFetching, isError, error } =
    useFetchPopularMovies(currentPage)
  const popularMovies = data as MoviesApiResponse | undefined

  if (isFetching)
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Spinner className="h-6 w-6 text-primary" />
      </div>
    )

  if (!popularMovies || isError) {
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

  const featuredMovie = popularMovies.results[0]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Hero Banner (first movie as backdrop) ── */}
      {featuredMovie.backdrop_path && (
        <div className="relative h-72 w-full overflow-hidden">
          <Image
            src={`https://image.tmdb.org/t/p/w1280${featuredMovie.backdrop_path}`}
            alt={featuredMovie.title}
            fill
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
              <Link href="#">
                <Button className="bg-primary font-bold text-background shadow-lg shadow-primary/20 transition-all hover:bg-primary/80">
                  <Film className="mr-2 h-4 w-4" />
                  Browse All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-6 pb-16">
        {/* ── Search + Categories bar ── */}
        <div className="sticky top-0 z-20 -mx-6 mb-8 border-b border-border bg-background/80 px-6 py-4 backdrop-blur-md">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted" />
              <Input
                placeholder="Search movies, genres…"
                className="border-border bg-muted pl-9 text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary"
              />
            </div>

            {/* Category pills */}
            <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-0.5">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant={index === 0 ? "default" : "outline"}
                  className={
                    index === 0
                      ? "shrink-0 bg-primary text-xs font-semibold whitespace-nowrap text-background hover:bg-primary/80"
                      : "shrink-0 border-border text-xs whitespace-nowrap text-muted-foreground hover:border-primary hover:bg-muted hover:text-primary"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Movie Grid ── */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-primary" />
              <h2 className="text-xs font-semibold tracking-widest text-primary uppercase">
                Now Trending
              </h2>
            </div>
            <span className="text-xs font-medium text-muted-foreground">
              {popularMovies.results.length} results
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {popularMovies.results.map((movie) => (
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
                      {movie.vote_average ? movie.vote_average.toFixed(1) : "NR"}
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
        </div>

        {/* Pagination */}
        {popularMovies.total_pages > 1 && (
          <div className="mt-14 flex justify-center">
            <PaginationControls
              currentPage={currentPage}
              // Even though it says a lot of pages, TMDB only returns 500 movies in popular section
              totalPages={Math.min(popularMovies.total_pages, 500)}
              route="/entertainment"
            />
          </div>
        )}
      </div>
    </div>
  )
}
