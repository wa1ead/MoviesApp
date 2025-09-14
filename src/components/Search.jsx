import { useContext, useEffect, useRef, useCallback, useState } from "react";
import MovieContext from "../context/MovieContext";
import MovieCard from "./MovieCard";
import PlaceholderCard from "./PlaceholderCard";
import fetchSearchedMovies from "../services/fetchSearchedMovies";

function Search() {
  const { 
    searchedMovies, 
    setSearchedMovies, 
    title, 
    setTitle,
    searchLoading,
    setSearchLoading,
    searchPlaceholders,
    setSearchPlaceholders
  } = useContext(MovieContext);
  
  const inputRef = useRef(null);
  const [loadingMovies, setLoadingMovies] = useState({});

  // Function to create placeholder cards
  const createSearchPlaceholders = useCallback((count) => {
    const placeholders = Array.from({ length: count }, (_, index) => ({
      id: `search-placeholder-${Date.now()}-${index}`,
      isPlaceholder: true
    }));
    return placeholders;
  }, []);

  // Focus on input when component mounts
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Enhanced fetch function with placeholders
  const searchWithPlaceholders = useCallback(async (searchTitle) => {
    if (!searchTitle.trim()) {
      setSearchedMovies([]);
      setSearchPlaceholders([]);
      return;
    }

    try {
      setSearchLoading(true);
      
      // Show placeholder cards immediately (estimate 8-12 results)
      const newPlaceholders = createSearchPlaceholders(10);
      setSearchPlaceholders(newPlaceholders);
      
      // Clear previous results
      setSearchedMovies([]);
      
      // Fetch search results
      await fetchSearchedMovies({ title: searchTitle, setSearchedMovies });
      
      // After getting results, hide placeholders and show real data with stagger
      setTimeout(() => {
        setSearchPlaceholders([]);
        setSearchLoading(false);
      }, 800); // Give time for smooth transition
      
    } catch (error) {
      console.error("Error fetching movies:", error);
      setSearchedMovies([]);
      setSearchPlaceholders([]);
      setSearchLoading(false);
    }
  }, [setSearchedMovies, setSearchPlaceholders, setSearchLoading, createSearchPlaceholders]);

  // Fetch movies when title changes with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchWithPlaceholders(title);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [title, searchWithPlaceholders]);

  // Add form submit handler to allow search on Enter
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      searchWithPlaceholders(title);
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

      {/* Show "No results" only when search is complete and no results found */}
      {title.trim() && searchedMovies.length === 0 && searchPlaceholders.length === 0 && !searchLoading && (
        <p className="text-center text-gray-600 my-8">
          No results found for "{title}"
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {/* Display search placeholder cards while loading */}
        {searchPlaceholders.map((placeholder, index) => (
          <div
            key={placeholder.id}
            className="transition-all duration-500 ease-in-out"
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            <PlaceholderCard isLoading={true} />
          </div>
        ))}
        
        {/* Display actual search results */}
        {searchedMovies.map((movie, index) => (
          <div
            className={`transition-all duration-500 hover:scale-105 hover:z-10 ${
              searchPlaceholders.length === 0 ? 'animate-fade-up' : ''
            }`}
            key={movie.id}
            style={{
              animationDelay: `${index * 50}ms`
            }}
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
