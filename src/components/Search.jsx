import { useContext } from "react";
import MovieContext from "../context/MovieContext";
import SearchBar from "./SearchBar";
import MovieCard from "./MovieCard";

function Search() {
  const { searchedMovies } = useContext(MovieContext);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-8">
      <SearchBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {searchedMovies && searchedMovies.length > 0 ? (
          searchedMovies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500 py-8">
            No movies found.
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
