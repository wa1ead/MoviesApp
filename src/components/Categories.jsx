import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import MovieContext from "../context/MovieContext";
import fetchGenres from "../services/fetchGenres";

function Categories() {
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(MovieContext);
  const [genres, setGenres] = useState([]);

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

  const handleGenreClick = (genreId) => {
    navigate(`/category/${genreId}`);
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
          Movie Categories
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreClick(genre.id)}
              className="bg-white/90 rounded-2xl shadow-xl border border-blue-200 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 p-8 text-center group"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-2xl font-bold text-white">
                    {genre.name.charAt(0)}
                  </span>
                </div>
              </div>
              <h2 className="text-xl font-bold text-blue-900 group-hover:text-blue-700 transition-colors">
                {genre.name}
              </h2>
              <p className="text-sm text-blue-600 mt-2 opacity-75">
                Explore {genre.name.toLowerCase()} movies
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
