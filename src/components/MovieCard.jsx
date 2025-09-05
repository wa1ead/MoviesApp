import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function MovieCard({ movie }) {
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
    <Link to={`/description/${movie.id}`} className="block">
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg overflow-hidden transition-transform duration-200 hover:scale-102 cursor-pointer border border-gray-200 h-[480px] flex flex-col">
        {/* Poster Section */}
        <div className="w-full h-80 flex items-center justify-center bg-gray-100">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="object-cover h-full w-full"
          />
        </div>
        {/* Content Section */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-lg font-bold mb-2 text-gray-800 font-sans line-clamp-1">
            {movie.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3 font-sans line-clamp-3 h-[60px]">
            {movie.overview}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-yellow-500 font-bold">
              ⭐ {movie.vote_average.toFixed(1)}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                // Double click logic for favourites
                if (clickTimeout) {
                  clearTimeout(clickTimeout);
                  setClickTimeout(null);
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
                  const timeout = setTimeout(() => {
                    setClickTimeout(null);
                  }, 200);
                  setClickTimeout(timeout);
                }
              }}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded shadow hover:from-pink-600 hover:to-purple-600 font-sans text-sm"
            >
              Favourite
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
