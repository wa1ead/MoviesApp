import { useState, useEffect, useContext } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import MovieContext from "../context/MovieContext";
import MovieCard from "./MovieCard";
import fetchGenres from "../services/fetchGenres";
import fetchMoviesByGenre from "../services/fetchMoviesByGenre";

function Categories() {
  const { loading, setLoading } = useContext(MovieContext);
  const [genres, setGenres] = useState([]);
  const [expandedGenres, setExpandedGenres] = useState({});
  const [genreMovies, setGenreMovies] = useState({});

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

  const toggleGenre = async (genreId) => {
    const isExpanded = expandedGenres[genreId];
    
    if (!isExpanded) {
      // Load movies for this genre if not already loaded
      if (!genreMovies[genreId]) {
        try {
          setLoading(true);
          const movies = await fetchMoviesByGenre(genreId);
          setGenreMovies(prev => ({ ...prev, [genreId]: movies }));
        } catch (err) {
          console.error("Error loading movies for genre:", err);
        } finally {
          setLoading(false);
        }
      }
    }

    setExpandedGenres(prev => ({ ...prev, [genreId]: !isExpanded }));
  };

  if (loading && genres.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-200 via-white to-blue-400">
        <span className="text-3xl text-blue-900 font-bold animate-pulse">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300 px-4 md:px-10 py-8 pb-32">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 bg-clip-text text-transparent drop-shadow-lg">
          Movie Categories
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {genres.map((genre) => (
            <div key={genre.id} className="bg-white/90 rounded-2xl shadow-xl border border-blue-200 overflow-hidden">
              <button
                onClick={() => toggleGenre(genre.id)}
                className="w-full p-6 flex items-center justify-between hover:bg-blue-50 transition-colors"
              >
                <h2 className="text-xl font-bold text-blue-900">{genre.name}</h2>
                <div className="flex items-center gap-2">
                  {genreMovies[genre.id] && (
                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                      {genreMovies[genre.id].length}
                    </span>
                  )}
                  {expandedGenres[genre.id] ? (
                    <FaChevronUp className="text-blue-700 text-lg" />
                  ) : (
                    <FaChevronDown className="text-blue-700 text-lg" />
                  )}
                </div>
              </button>

              {expandedGenres[genre.id] && (
                <div className="p-4 pt-0 border-t border-blue-100">
                  {loading && !genreMovies[genre.id] ? (
                    <div className="text-center py-4">
                      <span className="text-blue-900 animate-pulse">Loading movies...</span>
                    </div>
                  ) : genreMovies[genre.id] && genreMovies[genre.id].length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {genreMovies[genre.id].slice(0, 6).map((movie) => (
                        <div key={movie.id} className="transition-transform duration-300 hover:scale-105">
                          <MovieCard movie={movie} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <span className="text-gray-500">No movies found for this genre.</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;