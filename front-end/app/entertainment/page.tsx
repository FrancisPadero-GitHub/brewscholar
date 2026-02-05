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

import { movies, categories } from "@/data/entertaiment/data";

const MovieHub = () => {
  // Placeholder movie data

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#FFD700] mb-2">
              Movie Hub
            </h1>
            <p className="text-gray-400">Your Gateway to Entertainment</p>
          </div>
          <Button className="bg-[#FFD700] text-[#1E1E1E] hover:bg-[#FFD700]/90 font-semibold">
            <Film className="mr-2 h-4 w-4" />
            Browse All
          </Button>
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
                ? "bg-[#FFD700] text-[#1E1E1E] hover:bg-[#FFD700]/90 font-semibold whitespace-nowrap"
                : "border-[#3A3A3A] text-white hover:bg-[#2A2A2A] whitespace-nowrap"
            }
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Movies
            </CardTitle>
            <Film className="h-4 w-4 text-[#FFD700]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1,234</div>
            <p className="text-xs text-gray-500 mt-1">+180 from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
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

        <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
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
        <h2 className="text-2xl font-bold mb-4">Featured Content</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <Card
              key={movie.id}
              className="bg-[#2A2A2A] border-[#3A3A3A] hover:border-[#FFD700] transition-all cursor-pointer group"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-white group-hover:text-[#FFD700] transition-colors">
                      {movie.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-sm mt-1">
                      {movie.subtitle}
                    </CardDescription>
                  </div>
                  <div className="bg-[#FFD700] p-2 rounded-lg">
                    <Film className="h-5 w-5 text-[#1E1E1E]" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    {movie.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-[#FFD700] fill-[#FFD700]" />
                    <span className="text-sm text-white">4.5</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-[#FFD700] text-[#1E1E1E] hover:bg-[#FFD700]/90 font-semibold">
                  Watch Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieHub;
