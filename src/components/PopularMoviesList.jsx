import { useContext } from "react";
import MovieContext from "../context/MovieContext";
import MovieCard from "./MovieCard";

function PopularMoviesList() {
  const { movies } = useContext(MovieContext);
  const displayMovies = movies.slice(1); // skip featured first movie

  return (
    <div className="mx-8 pb-8 rounded-xl bg-gradient-to-br from-blue-100 via-white to-blue-300 shadow-xl">
      <h2 className="py-8 text-4xl font-extrabold text-blue-900 text-center tracking-wide drop-shadow-lg">
        <span className="inline-block bg-gradient-to-r from-blue-700 via-blue-400 to-blue-700 bg-clip-text text-transparent">
          Trending Movies
        </span>
        <span>🌍</span>
      </h2>
      <div className="grid grid-cols-3 gap-10 max-md:grid-cols-1 max-lg:grid-cols-2 px-10">
        {displayMovies.map((movie) => (
          <div
            className="transition-transform duration-300 hover:scale-105 hover:z-10"
            key={movie.id}
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PopularMoviesList;
