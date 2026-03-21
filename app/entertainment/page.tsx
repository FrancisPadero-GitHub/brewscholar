
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Film, Star, TrendingUp, Clock, Search } from "lucide-react"
import Link from "next/link"
import { categories } from "@/data/entertaiment/data"
import PaginationControls from "@/components/custom/entertainment/movies/PaginationControls"
import type { ApiResponse } from "@/types/entertainment/movies/movie"

async function getMovies(page: string) {
  const res = await fetch(
    `https://vidsrc-embed.su/movies/latest/page-${page}.json`,
    {
      next: { revalidate: 3600 }, // Cache data for 1 hour
    }
  )

  if (!res.ok) return null
  return res.json() as Promise<ApiResponse>
}

export default async function MovieHub({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const currentPage = typeof params.page === "string" ? params.page : "1"
  const data = await getMovies(currentPage)

  if (!data || !data.result) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <p className="text-xl text-muted-foreground">Failed to load movies.</p>
          <p className="mt-2 text-sm text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-primary">
                Movie Hub
              </h1>
              <p className="text-muted-foreground">
                Your Gateway to Entertainment - Page {currentPage}
              </p>
            </div>
            <Link href="/entertainment/watch">
              <Button className="bg-primary font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90">
                <Film className="mr-2 h-4 w-4" />
                Browse All
              </Button>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-muted-foreground" />
            <Input
              placeholder="Search for movies, shows, or genres..."
              className="border-border bg-card pl-10 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-8 flex gap-4 overflow-x-auto pb-2">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={index === 0 ? "default" : "outline"}
              className={
                index === 0
                  ? "bg-primary font-semibold whitespace-nowrap text-primary-foreground transition-all duration-300 hover:bg-primary/90"
                  : "border-border whitespace-nowrap text-foreground transition-all duration-300 hover:border-primary hover:bg-card"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="border-border bg-card transition-all duration-300 hover:border-primary">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Movies
              </CardTitle>
              <Film className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {data.result.length}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">On this page</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card transition-all duration-300 hover:border-primary">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Trending Now
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">567</div>
              <p className="mt-1 text-xs text-muted-foreground">+23% this week</p>
            </CardContent>
          </Card>

          <Card className="border-border bg-card transition-all duration-300 hover:border-primary">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Watch Time
              </CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">89h</div>
              <p className="mt-1 text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Movie Grid */}
        <div>
          <h2 className="mb-6 text-2xl font-bold text-foreground">
            Featured Content
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {data.result.map((movie) => (
              <Card
                key={movie.imdb_id}
                className="group cursor-pointer border-border bg-card transition-all duration-300 hover:scale-105 hover:border-primary"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="line-clamp-2 text-base text-foreground transition-colors group-hover:text-primary">
                        {movie.title}
                      </CardTitle>
                      <CardDescription className="mt-1 text-sm text-muted-foreground">
                        <span className="text-xs font-medium text-primary uppercase">
                          {movie.quality}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="rounded-lg bg-primary p-2 transition-transform duration-300 group-hover:scale-110">
                      <Film className="h-5 w-5 text-primary-foreground" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      ID: {movie.tmdb_id}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm text-foreground">4.5</span>
                    </div>
                  </div>
                  <a
                    href={movie.embed_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-primary font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90">
                      Watch Now
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-8">
          <PaginationControls
            currentPage={Number(currentPage)}
            route="/entertainment"
          />
        </div>
      </div>
    </div>
  )
}
