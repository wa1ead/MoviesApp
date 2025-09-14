import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import MovieContext from "../context/MovieContext";

const MovieCard = ({ movie, onFavouriteClick = () => {} }) => {
  const navigate = useNavigate();
  const [clickTimeout, setClickTimeout] = useState(null);
  const [imageError, setImageError] = useState(false);
  const { toggleFavourite, isFavourite } = useContext(MovieContext);

  const handleClick = (e) => {
    if (clickTimeout) {
      // If a second click happens within the timeout, it's a double-click
      clearTimeout(clickTimeout); // Clear the single-click timeout
      setClickTimeout(null); // Reset the timeout state

      // Add to favourites using context
      toggleFavourite(movie);
    } else {
      // Set a timeout for single-click detection
      const timeout = setTimeout(() => {
        navigate(`/description/${movie.id}`);
        setClickTimeout(null); // Reset the timeout state after execution
      }, 200);
      setClickTimeout(timeout); // Save the timeout ID to state
    }
  };

  const handleFavouriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite(movie);
    onFavouriteClick(movie);
  };

  return (
    <Link to={`/description/${movie.id}`} className="block group">
      <div className="relative rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer h-[400px] bg-black">
        {/* Poster Image or Placeholder */}
        {!imageError && movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover transition-all duration-300 group-hover:blur-sm group-hover:brightness-50"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center text-white p-4 transition-all duration-300 group-hover:brightness-75">
            <div className="text-6xl mb-4 opacity-60">🎬</div>
            <h3 className="text-lg font-bold text-center mb-2 line-clamp-2">
              {movie.title}
            </h3>
            <div className="text-yellow-400 font-bold">
              ⭐ {movie.vote_average.toFixed(1)}
            </div>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          {!imageError && movie.poster_path && (
            <>
              <h3 className="text-white text-lg font-bold mb-2 line-clamp-2">
                {movie.title}
              </h3>
              <p className="text-gray-200 text-sm mb-3 line-clamp-3">
                {movie.overview}
              </p>
            </>
          )}
          {(imageError || !movie.poster_path) && (
            <p className="text-gray-200 text-sm mb-3 line-clamp-3">
              {movie.overview}
            </p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-yellow-400 font-bold flex items-center gap-1">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
            <button
              onClick={handleFavouriteClick}
              className={`px-3 py-1.5 rounded-lg shadow font-semibold text-sm transition-all ${
                isFavourite(movie.id)
                  ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                  : "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
              }`}
            >
              {isFavourite(movie.id) ? "❌ Remove" : "♥ Favourite"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
