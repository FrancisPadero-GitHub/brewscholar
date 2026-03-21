import { notFound } from "next/navigation";

// this is to demonstrate how to segment in dynamic routes work
// and how to handle not found cases in server components. In a real app, you would
// fetch the movie data from a database or an API instead of hardcoding it.

interface Movie {
  slug: string;
  title: string;
  year: number;
}

async function getMovieBySlug(slug: string): Promise<Movie | null> {
  const movies: Movie[] = [
    { slug: "inception", title: "Inception", year: 2010 },
    { slug: "matrix", title: "The Matrix", year: 1999 },
  ];

  return movies.find((movie) => movie.slug === slug) ?? null;
}

// The params are passed as a promise to demonstrate that you can await them in the server component.
// The value here is provided by the dynamic segment in the route, which is [slug] in this case.
// Next.js automatically extracts the slug from the URL and provides it as a parameter to the page component.
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}
// asynchronously fetch the movie data based on the slug and render the page. If the movie is not found, call notFound() to render the 404 page.
// do not use arrow functions for page components in Next.js, when doing async data fetching,
// to ensure that the component is treated as a server component and can use async/await directly.

export default async function MoviePage({ params }: PageProps) {
  // destructure the slug from the params promise and await it to get the actual slug value.
  const { slug } = await params;

  const movie = await getMovieBySlug(slug);

  if (!movie) {
    notFound();
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <div>Year: {movie.year}</div>
      <div>Slug: {slug}</div>
    </main>
  );
}
