import { useContext, useEffect, useRef } from "react";
import MovieContext from "../context/MovieContext";
import MovieCard from "./MovieCard";
import fetchSearchedMovies from "../services/fetchSearchedMovies";

function Search() {
  const { searchedMovies, setSearchedMovies, title, setTitle } =
    useContext(MovieContext);
  const inputRef = useRef(null);

  // Focus on input when component mounts
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Fetch movies when title changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (title.trim()) {
        try {
          await fetchSearchedMovies({ title, setSearchedMovies });
          console.log("Search query:", title);
        } catch (error) {
          console.error("Error fetching movies:", error);
          setSearchedMovies([]);
        }
      } else {
        setSearchedMovies([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [title, setSearchedMovies]);

  // Add form submit handler to allow search on Enter
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      fetchSearchedMovies({ title, setSearchedMovies });
    }
  };

  return (
    <div className="pt-4 pb-24 px-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Search Movies
      </h1>

      <form onSubmit={handleSubmit} className="relative mb-8 mx-auto max-w-2xl">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for movies..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full py-3 px-12 border border-blue-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-lg"
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <button type="submit" className="hidden">
          Search
        </button>
      </form>

      {title.trim() && searchedMovies.length === 0 && (
        <p className="text-center text-gray-600 my-8">
          No results found for "{title}"
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {searchedMovies.map((movie) => (
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

export default Search;
