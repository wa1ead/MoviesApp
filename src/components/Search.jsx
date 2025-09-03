import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import MovieContext from "../context/MovieContext";
import SearchBar from "./SearchBar";

function Search() {
  const { searchedMovies } = useContext(MovieContext);
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-8">
      <SearchBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {searchedMovies && searchedMovies.length > 0 ? (
          searchedMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-md overflow-hidden cursor-pointer hover:scale-105 transition"
              onClick={() => navigate(`/description/${movie.id}`)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-48 object-contain bg-white"
              />
              <div className="p-3">
                <h3 className="text-lg font-bold text-blue-900 mb-1">
                  {movie.title}
                </h3>
                <p className="text-sm text-gray-700 line-clamp-2">
                  {movie.overview}
                </p>
                <span className="text-yellow-500 font-bold">
                  ⭐ {movie.vote_average}
                </span>
              </div>
            </div>
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
