import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <div
      className="bg-white/90 rounded-2xl shadow-xl border border-blue-100 hover:shadow-2xl transition duration-300 flex flex-col overflow-hidden max-w-xs mx-auto my-6 hover:-translate-y-1 hover:scale-105"
      key={movie.id}
    >
      <div className="w-full h-64 bg-gradient-to-br from-blue-200 via-white to-blue-300 overflow-hidden rounded-t-2xl flex items-center justify-center">
        <img
          className="w-full h-full object-cover rounded-t-2xl transition duration-300 hover:scale-110 shadow-lg border-2 border-blue-200"
          src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
          alt={movie.title}
          onClick={() => navigate(`/description/${movie.id}`)}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="p-5 flex flex-col justify-between flex-1 gap-2">
        <h3
          className="text-xl font-extrabold text-blue-900 mb-1 truncate drop-shadow-md"
          title={movie.title}
        >
          {movie.title}
        </h3>
        <p className="text-gray-700 text-sm mb-2 line-clamp-3">
          {movie.overview}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-yellow-500 font-bold text-lg drop-shadow">
            ⭐ {movie.vote_average.toFixed(1)}
          </span>
          <button
            className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-700 text-xs font-bold shadow transition"
            onClick={() => {
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
                  toast("Movie already exists in favourites ", { icon: "⭐" });
                }
              } else {
                const timeout = setTimeout(() => {
                  setClickTimeout(null);
                }, 200);
                setClickTimeout(timeout);
              }
            }}
            title="Add to Favourites"
          >
            ⭐ Favourite
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
