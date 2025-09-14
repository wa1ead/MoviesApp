import { useContext, useEffect, useRef, useCallback, useState } from "react";
import MovieContext from "../context/MovieContext";
import MovieCard from "./MovieCard";
import PlaceholderCard from "./PlaceholderCard";
import fetchPopularMovies from "../services/fetchPopularMovies";

function PopularMoviesList() {
  const {
    movies,
    setMovies,
    loading,
    setLoading,
    currentPage,
    setCurrentPage,
    hasMoreMovies,
    setHasMoreMovies,
    placeholderCards,
    setPlaceholderCards,
  } = useContext(MovieContext);

  const displayMovies = movies.slice(1); // skip featured first movie
  const loadingRef = useRef(false);
  const [loadingMovies, setLoadingMovies] = useState({});

  // Function to create placeholder cards
  const createPlaceholders = useCallback((count) => {
    const placeholders = Array.from({ length: count }, (_, index) => ({
      id: `placeholder-${Date.now()}-${index}`,
      isPlaceholder: true,
    }));
    return placeholders;
  }, []);

  // Function to load more movies
  const loadMoreMovies = useCallback(async () => {
    if (loadingRef.current || loading || !hasMoreMovies) return;

    try {
      loadingRef.current = true;

      // Create and show placeholder cards immediately
      const newPlaceholders = createPlaceholders(20);
      setPlaceholderCards(newPlaceholders);

      const nextPage = currentPage + 1;
      const response = await fetchPopularMovies(nextPage, true);

      // Mark movies as loading for smooth transition
      const loadingStates = {};
      response.movies.forEach((movie, index) => {
        loadingStates[movie.id] = true;
        // Stagger the data population
        setTimeout(() => {
          setLoadingMovies((prev) => ({ ...prev, [movie.id]: false }));
        }, index * 100);
      });

      setLoadingMovies(loadingStates);

      // Replace placeholders with real movies
      setTimeout(() => {
        setMovies((prevMovies) => [...prevMovies, ...response.movies]);
        setCurrentPage(response.currentPage);
        setHasMoreMovies(response.currentPage < response.totalPages);
        setPlaceholderCards([]);
      }, 500);

      console.log(
        `Loaded page ${nextPage}, total movies: ${
          movies.length + response.movies.length
        }`
      );
    } catch (error) {
      console.error("Error loading more movies:", error);
      setPlaceholderCards([]);
    } finally {
      loadingRef.current = false;
    }
  }, [
    currentPage,
    hasMoreMovies,
    loading,
    setMovies,
    setCurrentPage,
    setHasMoreMovies,
    setPlaceholderCards,
    createPlaceholders,
    movies.length,
  ]);

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (
        loading ||
        !hasMoreMovies ||
        loadingRef.current ||
        placeholderCards.length > 0
      )
        return;

      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.offsetHeight;

      // Trigger load more when user is near the bottom (200px threshold)
      if (
        scrollTop + windowHeight >= documentHeight - 200 &&
        displayMovies.length > 0
      ) {
        loadMoreMovies();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [
    loadMoreMovies,
    loading,
    hasMoreMovies,
    displayMovies.length,
    placeholderCards.length,
  ]);

  return (
    <div className="mx-8 pb-8 rounded-xl bg-gradient-to-br from-blue-100 via-white to-blue-300 shadow-xl">
      <h2 className="py-8 text-4xl font-extrabold text-blue-900 text-center tracking-wide drop-shadow-lg">
        <span className="inline-block bg-gradient-to-r from-blue-700 via-blue-400 to-blue-700 bg-clip-text text-transparent">
          Trending Movies
        </span>
        <span>🌍</span>
      </h2>
      <div className="grid grid-cols-5 gap-10 max-md:grid-cols-1 max-lg:grid-cols-3 px-10">
        {/* Display actual movies */}
        {displayMovies.map((movie, index) => (
          <div
            className="transition-transform duration-300 hover:scale-105 hover:z-10"
            key={movie.id}
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            <MovieCard movie={movie} />
          </div>
        ))}

        {/* Display placeholder cards while loading */}
        {placeholderCards.map((placeholder, index) => (
          <div
            key={placeholder.id}
            className="transition-all duration-500 ease-in-out"
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            <PlaceholderCard isLoading={true} />
          </div>
        ))}
      </div>

      {/* End of content indicator */}
      {!hasMoreMovies &&
        displayMovies.length > 0 &&
        placeholderCards.length === 0 && (
          <div className="text-center py-8">
            <span className="text-blue-700 font-semibold">
              🎬 You've reached the end! No more movies to load.
            </span>
          </div>
        )}
    </div>
  );
}

export default PopularMoviesList;
