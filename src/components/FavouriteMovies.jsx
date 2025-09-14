import { Link } from "react-router-dom";
import { useContext } from "react";
import MovieContext from "../context/MovieContext";
import MovieCard from "./MovieCard";

function FavouriteMovies() {
  const { favouriteMovies, removeFromFavourites } = useContext(MovieContext);

  return (
    <div className="bg-white/90 rounded-2xl shadow-xl border border-blue-200 p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-blue-900">
          Your Favourite Movies
        </h2>
        <Link
          to="/favourites"
          className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
        >
          View All →
        </Link>
      </div>

      {favouriteMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {favouriteMovies.slice(0, 12).map((movie) => (
            <div key={movie.id} className="relative group">
              <div className="transition-transform duration-300 hover:scale-105">
                <MovieCard
                  movie={movie}
                  onFavouriteClick={() => removeFromFavourites(movie.id)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">💔</div>
          <h3 className="text-xl font-bold text-blue-900 mb-2">
            No Favourite Movies Yet
          </h3>
          <p className="text-blue-600 mb-4">
            Start adding movies to your favourites by double-clicking on any
            movie card!
          </p>
          <Link
            to="/"
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-800 font-semibold transition-all duration-200 inline-block"
          >
            Explore Movies
          </Link>
        </div>
      )}
    </div>
  );
}

export default FavouriteMovies;
