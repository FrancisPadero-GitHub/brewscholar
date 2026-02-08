"use client";

import { useEffect, useState } from "react";

interface ApiResponse {
  result?: any[];
}

const SimpleMovieList = () => {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          "https://vidsrc-embed.ru/movies/latest/page-1.json",
        );
        const data: ApiResponse = await res.json();
        setMovies(data.result || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    fetchMovies();
  }, []);

  console.log(movies);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Latest Movies</h1>
      {movies.length === 0 && <p>No movies found.</p>}

      <ul className="space-y-2">
        {movies.map((movie, idx) => (
          <li key={movie.id || idx} className="border p-2 rounded">
            <p>
              <strong>Title:</strong> {movie.title}
            </p>
            {movie.year && (
              <p>
                <strong>Year:</strong> {movie.year}
              </p>
            )}
            {movie.description && <p>{movie.description}</p>}
            {movie.imdb_id && (
              <a
                href={`https://www.imdb.com/title/${movie.imdb_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                IMDB Link
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SimpleMovieList;
