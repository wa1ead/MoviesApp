import { useState, useEffect, useContext } from "react";
import MovieContext from "../context/MovieContext";
import MovieCard from "./MovieCard";
import fetchGenres from "../services/fetchGenres";
import fetchMoviesByGenre from "../services/fetchMoviesByGenre";

function Categories() {
  const { loading, setLoading } = useContext(MovieContext);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMovies, setLoadingMovies] = useState(false);

  useEffect(() => {
    async function loadGenres() {
      try {
        setLoading(true);
        const genresData = await fetchGenres();
        setGenres(genresData);
      } catch (err) {
        console.error("Error loading genres:", err);
      } finally {
        setLoading(false);
      }
    }
    loadGenres();
  }, [setLoading]);

  useEffect(() => {
    if (selectedGenre) {
      loadMoviesForGenre(selectedGenre.id, currentPage);
    }
  }, [selectedGenre, currentPage]);

  const loadMoviesForGenre = async (genreId, page = 1) => {
    try {
      setLoadingMovies(true);
      const moviesData = await fetchMoviesByGenre(genreId, page);
      setMovies(moviesData);
      setTotalPages(Math.min(25, Math.ceil(500 / 20))); // Assuming max 500 movies, 20 per page
    } catch (err) {
      console.error("Error loading movies for genre:", err);
    } finally {
      setLoadingMovies(false);
    }
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
    setMovies([]);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  };

  if (loading && genres.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-200 via-white to-blue-400">
        <span className="text-3xl text-blue-900 font-bold animate-pulse">
          Loading...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300 px-4 md:px-10 py-8 pb-32">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 bg-clip-text text-transparent drop-shadow-lg">
          Browse by Categories
        </h1>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="bg-white/90 rounded-2xl shadow-xl border border-blue-200 p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              Select a Category:
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {genres.map((genre) => (
                <button
                  key={genre.id}
                  onClick={() => handleGenreSelect(genre)}
                  className={`px-4 py-2 rounded-xl border transition-all duration-200 font-medium ${
                    selectedGenre?.id === genre.id
                      ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                      : "bg-white text-blue-900 border-blue-200 hover:bg-blue-50 hover:border-blue-400"
                  }`}
                  disabled={selectedGenre?.id === genre.id}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Category Movies */}
        {selectedGenre && (
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                {selectedGenre.name.charAt(0)}
              </span>
              {selectedGenre.name} Movies
              {movies.length > 0 && (
                <span className="text-lg text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                  Page {currentPage}
                </span>
              )}
            </h2>

            {loadingMovies ? (
              <div className="flex items-center justify-center py-16">
                <span className="text-xl text-blue-900 animate-pulse">
                  Loading movies...
                </span>
              </div>
            ) : movies.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
                  {movies.map((movie) => (
                    <div
                      key={movie.id}
                      className="transition-transform duration-300 hover:scale-105"
                    >
                      <MovieCard movie={movie} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-white/90 rounded-xl border border-blue-200 shadow-md hover:bg-blue-50 transition disabled:opacity-50 disabled:cursor-not-allowed text-blue-900 font-semibold"
                  >
                    Previous
                  </button>

                  <div className="flex gap-1">
                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                      const pageNum = Math.max(1, currentPage - 2) + i;
                      if (pageNum > totalPages) return null;

                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-3 py-2 rounded-xl border border-blue-200 shadow-md transition font-semibold ${
                            currentPage === pageNum
                              ? "bg-blue-600 text-white"
                              : "bg-white/90 text-blue-900 hover:bg-blue-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-white/90 rounded-xl border border-blue-200 shadow-md hover:bg-blue-50 transition disabled:opacity-50 disabled:cursor-not-allowed text-blue-900 font-semibold"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <span className="text-xl text-gray-500">
                  No movies found for this category.
                </span>
              </div>
            )}
          </div>
        )}

        {/* Initial State */}
        {!selectedGenre && !loading && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-2xl font-bold text-blue-900 mb-2">
              Choose a Category Above
            </h3>
            <p className="text-blue-700">
              Select any category to explore movies in that genre
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Categories;
