import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Film, Star, TrendingUp, Clock, Search } from "lucide-react";
import Link from "next/link";
import { categories } from "@/data/entertaiment/data";
import PaginationControls from "@/components/custom/entertainment/movies/PaginationControls";
import { ApiResponse } from "@/types/entertainment/movies/movie";

async function getMovies(page: string) {
  const res = await fetch(
    `https://vidsrc-embed.ru/movies/latest/page-${page}.json`,
    {
      next: { revalidate: 3600 }, // Cache data for 1 hour
    },
  );

  if (!res.ok) return null;
  return res.json() as Promise<ApiResponse>;
}

export default async function MovieHub({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const currentPage = typeof params.page === "string" ? params.page : "1";
  const data = await getMovies(currentPage);

  if (!data || !data.result) {
    return (
      <div className="min-h-screen bg-[#1E1E1E] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-400">Failed to load movies.</p>
          <p className="text-sm text-gray-500 mt-2">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#FFD700] mb-2">
                Movie Hub
              </h1>
              <p className="text-gray-400">
                Your Gateway to Entertainment - Page {currentPage}
              </p>
            </div>
            <Link href="/entertainment/watch">
              <Button className="bg-[#FFD700] text-[#1E1E1E] hover:bg-[#E6C200] font-semibold transition-all duration-300">
                <Film className="mr-2 h-4 w-4" />
                Browse All
              </Button>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search for movies, shows, or genres..."
              className="pl-10 bg-[#2A2A2A] border-[#3A3A3A] text-white placeholder:text-gray-500"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={index === 0 ? "default" : "outline"}
              className={
                index === 0
                  ? "bg-[#FFD700] text-[#1E1E1E] hover:bg-[#E6C200] font-semibold whitespace-nowrap transition-all duration-300"
                  : "border-[#3A3A3A] text-white hover:bg-[#2A2A2A] hover:border-[#FFD700] whitespace-nowrap transition-all duration-300"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-[#2A2A2A] border-[#3A3A3A] hover:border-[#FFD700] transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Movies
              </CardTitle>
              <Film className="h-4 w-4 text-[#FFD700]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {data.result.length}
              </div>
              <p className="text-xs text-gray-500 mt-1">On this page</p>
            </CardContent>
          </Card>

          <Card className="bg-[#2A2A2A] border-[#3A3A3A] hover:border-[#FFD700] transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Trending Now
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-[#FFD700]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">567</div>
              <p className="text-xs text-gray-500 mt-1">+23% this week</p>
            </CardContent>
          </Card>

          <Card className="bg-[#2A2A2A] border-[#3A3A3A] hover:border-[#FFD700] transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Watch Time
              </CardTitle>
              <Clock className="h-4 w-4 text-[#FFD700]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">89h</div>
              <p className="text-xs text-gray-500 mt-1">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Movie Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-white">
            Featured Content
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.result.map((movie) => (
              <Card
                key={movie.imdb_id}
                className="bg-[#2A2A2A] border-[#3A3A3A] hover:border-[#FFD700] hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-white group-hover:text-[#FFD700] transition-colors text-base line-clamp-2">
                        {movie.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400 text-sm mt-1">
                        <span className="text-xs text-[#FFD700] uppercase font-medium">
                          {movie.quality}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="bg-[#FFD700] p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <Film className="h-5 w-5 text-[#1E1E1E]" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gray-400">
                      ID: {movie.tmdb_id}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-[#FFD700] fill-[#FFD700]" />
                      <span className="text-sm text-white">4.5</span>
                    </div>
                  </div>
                  <a
                    href={movie.embed_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-[#FFD700] text-[#1E1E1E] hover:bg-[#E6C200] font-semibold transition-all duration-300">
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
  );
}
