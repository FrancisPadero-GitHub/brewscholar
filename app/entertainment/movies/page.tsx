import PaginationControls from "@/components/custom/entertainment/movies/PaginationControls"
import type { ApiResponse } from "@/types/entertainment/movies/movies"

async function getMovies(page: string) {
  const res = await fetch(
    `https://vidsrc-embed.ru/movies/latest/page-${page}.json`,
    {
      next: { revalidate: 3600 }, // Cache data for 1 hour
    }
  )

  if (!res.ok) return null
  return res.json() as Promise<ApiResponse>
}

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // Await searchParams as it's now a Promise in Next.js
  const params = await searchParams

  // Default to page 1 if no param is provided
  const currentPage = typeof params.page === "string" ? params.page : "1"
  const data = await getMovies(currentPage)

  if (!data || !data.result) {
    return <div className="p-10 text-center">Failed to load movies.</div>
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="mb-6 text-3xl font-bold text-white">
        Latest Movies - Page {currentPage}
      </h1>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
        {data.result.map((movie) => (
          <div
            key={movie.imdb_id}
            className="group cursor-pointer rounded-lg border border-[#3A3A3A] bg-[#2A2A2A] p-4 transition-all duration-300 hover:scale-105 hover:border-[#FFD700]"
          >
            <h3 className="truncate text-sm font-semibold text-white transition-colors group-hover:text-[#FFD700]">
              {movie.title}
            </h3>
            <span className="text-xs font-medium text-[#FFD700] uppercase">
              {movie.quality}
            </span>
            <h4 className="text-xs text-gray-400 uppercase">{movie.tmdb_id}</h4>
            <a
              href={movie.embed_url}
              target="_blank"
              className="mt-2 block rounded bg-[#FFD700] py-2 text-center text-xs font-semibold text-[#1E1E1E] transition-all duration-300 hover:bg-[#E6C200]"
            >
              Watch Now
            </a>
          </div>
        ))}
      </div>
      <PaginationControls currentPage={Number(currentPage)} />
    </main>
  )
}
