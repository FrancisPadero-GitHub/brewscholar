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

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Await searchParams as it's now a Promise in Next.js
  const params = await searchParams;

  // Default to page 1 if no param is provided
  const currentPage = typeof params.page === "string" ? params.page : "1";
  const data = await getMovies(currentPage);

  if (!data || !data.result) {
    return <div className="p-10 text-center">Failed to load movies.</div>;
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">
        Latest Movies - Page {currentPage}
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data.result.map((movie) => (
          <div
            key={movie.imdb_id}
            className="bg-gray-800 p-4 rounded-lg border border-gray-700"
          >
            <h3 className="text-sm font-semibold truncate text-white">
              {movie.title}
            </h3>
            <span className="text-xs text-blue-400 uppercase">
              {movie.quality}
            </span>
            <h4 className="text-xs text-gray-400 uppercase">{movie.tmdb_id}</h4>
            <a
              href={movie.embed_url}
              target="_blank"
              className="block mt-2 text-center bg-blue-600 text-xs py-1 rounded hover:bg-blue-500 transition"
            >
              Watch Now
            </a>
          </div>
        ))}
      </div>
      <PaginationControls currentPage={Number(currentPage)} />
    </main>
  );
}
