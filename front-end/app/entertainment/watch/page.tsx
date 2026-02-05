import MoviePlayer from "../player/page"

const Watch = ({params}: {params: {id: string}}) => {
    return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Now Watching</h1>
      
      {/* Example for a Movie */}
      <MoviePlayer id={params.id} type="movie" autoPlay={true} />

      {/* Example for a TV Series Episode */}
      {/* <MoviePlayer id="119051" type="tv" season={1} episode={8} /> */}
    </main>
  );
}

export default Watch