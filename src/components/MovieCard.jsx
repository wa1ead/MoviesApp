import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MovieCard = ({ movie, onFavouriteClick = () => {} }) => {
  const navigate = useNavigate();
  const [clickTimeout, setClickTimeout] = useState(null);

  const handleClick = (e) => {
    if (clickTimeout) {
      // If a second click happens within the timeout, it's a double-click
      clearTimeout(clickTimeout); // Clear the single-click timeout
      setClickTimeout(null); // Reset the timeout state

      // Save the movie details to localStorage
      const favouriteMovies =
        JSON.parse(localStorage.getItem("favouriteMovies")) || [];
      const movieExists = favouriteMovies.find(
        (favouriteMovie) => favouriteMovie.id === movie.id
      );

      if (!movieExists) {
        favouriteMovies.push(movie);
        localStorage.setItem(
          "favouriteMovies",
          JSON.stringify(favouriteMovies)
        );
        toast.success("Movie added to favourites!");
      } else {
        toast("Movie already exists in favourites ", {
          icon: "⭐",
        });
      }
    } else {
      // Set a timeout for single-click detection
      const timeout = setTimeout(() => {
        navigate(`/description/${movie.id}`);
        setClickTimeout(null); // Reset the timeout state after execution
      }, 200);
      setClickTimeout(timeout); // Save the timeout ID to state
    }
  };

  return (
    <Link to={`/description/${movie.id}`} className="block group">
      <div className="relative rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer h-[400px] bg-black">
        {/* Poster Image */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-contain md:object-cover transition-all duration-300 group-hover:blur-sm group-hover:brightness-50"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="text-white text-lg font-bold mb-2 line-clamp-2">
            {movie.title}
          </h3>
          <p className="text-gray-200 text-sm mb-3 line-clamp-3">
            {movie.overview}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-yellow-400 font-bold flex items-center gap-1">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                onFavouriteClick(movie);
              }}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1.5 rounded-lg shadow hover:from-pink-600 hover:to-purple-600 font-semibold text-sm transition-all"
            >
              ♥ Favourite
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
