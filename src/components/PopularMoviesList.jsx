import MovieCard from "./MovieCard";

function PopularMoviesList({ movies }) {
  return (
    <div className="mx-8 pb-8 rounded-xl bg-gradient-to-br from-blue-100 via-white to-blue-300 shadow-xl">
      <h2 className="py-8 text-4xl font-extrabold text-blue-900 text-center tracking-wide drop-shadow-lg">
        <span className="inline-block bg-gradient-to-r from-blue-700 via-blue-400 to-blue-700 bg-clip-text text-transparent">
          Trending Movies
        </span>
        <span>🌍</span>
      </h2>
      <div className="grid grid-cols-3 gap-10 max-md:grid-cols-1 max-lg:grid-cols-2">
        {movies.map((movie) => (
          <div className="transition-transform duration-300 hover:scale-105 hover:z-10">
            <MovieCard movie={movie} key={movie.id} />
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <section className="mx-auto pb-12 rounded-3xl bg-gradient-to-br from-blue-100 via-white to-blue-300 shadow-2xl max-w-7xl">
      <h2 className="py-10 text-5xl font-extrabold text-blue-900 text-center tracking-wide drop-shadow-xl mb-8">
        <span className="inline-block bg-gradient-to-r from-blue-700 via-blue-400 to-blue-700 bg-clip-text text-transparent">
          Trending Movies 🌍
        </span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 px-4 md:px-8">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </section>
  );
}

export default PopularMoviesList;
