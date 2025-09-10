import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieContext from "../context/MovieContext";
import MovieCard from "./MovieCard";
import fetchMoviesByGenre from "../services/fetchMoviesByGenre";
import fetchGenres from "../services/fetchGenres";

function CategoryPage() {
  const { genreId } = useParams();
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(MovieContext);
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function loadCategoryData() {
      try {
        setLoading(true);

        // Get genre name
        const genres = await fetchGenres();
        const genre = genres.find((g) => g.id === parseInt(genreId));
        if (genre) {
          setGenreName(genre.name);
        }

        // Get movies for this genre
        const moviesData = await fetchMoviesByGenre(genreId, currentPage);
        setMovies(moviesData);

        // Calculate total pages (assuming 20 movies per page and max 500 movies)
        setTotalPages(Math.min(25, Math.ceil(500 / 20)));
      } catch (err) {
        console.error("Error loading category data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadCategoryData();
  }, [genreId, currentPage, setLoading]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading && movies.length === 0) {
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
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-white/90 rounded-xl border border-blue-200 shadow-md hover:bg-blue-50 transition flex items-center gap-2 text-blue-900 font-semibold"
          >
            <span>←</span> Back
          </button>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 bg-clip-text text-transparent drop-shadow-lg">
            {genreName} Movies
          </h1>
        </div>

        {/* Movies Grid */}
        {movies.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mb-8">
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
            <div className="flex justify-center items-center gap-2 mt-12">
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
            <span className="text-2xl text-gray-500">
              No movies found for this genre.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
