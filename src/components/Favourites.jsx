import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MovieContext from "../context/MovieContext";
import AuthContext from "../context/AuthContext";
import MovieCard from "./MovieCard";

export default function Favourites() {
  const navigate = useNavigate();
  const { favouriteMovies, removeFromFavourites, clearFavourites } =
    useContext(MovieContext);
  const { isLoggedIn, loading } = useContext(AuthContext);

  // Additional authentication check at component level
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate("/profile", { replace: true });
    }
  }, [isLoggedIn, loading, navigate]);

  // Show loading while authentication is being checked
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300 flex items-center justify-center">
        <div className="flex items-center space-x-2 text-blue-900">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
          <span className="text-xl font-semibold">Loading...</span>
        </div>
      </div>
    );
  }

  // If not logged in, return null (useEffect will handle redirect)
  if (!isLoggedIn) {
    return null;
  }

  if (!favouriteMovies || favouriteMovies.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300 px-4 md:px-10 py-8 pb-32">
        <div className="max-w-2xl mx-auto text-center">
          <button
            className="transition ease-in-out transform hover:scale-105 hover:translate-y-1 duration-300 mb-8 py-2 px-6 text-lg border-2 border-blue-300 rounded-full text-blue-900 bg-white shadow hover:bg-blue-100"
            onClick={() => navigate(-1)}
          >
            <i className="fa-solid fa-arrow-left"></i> Back
          </button>

          <div className="bg-white/90 rounded-2xl shadow-xl border border-blue-200 p-12">
            <div className="text-8xl mb-6">❌</div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              No Favourite Movies Yet
            </h2>
            <p className="text-blue-600 mb-6 text-lg">
              You haven't added any movies to your favourites yet. Start
              exploring and add some movies you love!
            </p>
            <Link
              to="/"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-800 font-semibold transition-all duration-200 inline-block"
            >
              Explore Movies
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300 px-4 md:px-10 py-8 pb-32">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <button
            className="transition ease-in-out transform hover:scale-105 hover:translate-y-1 duration-300 py-2 px-6 text-lg border-2 border-blue-300 rounded-full text-blue-900 bg-white shadow hover:bg-blue-100"
            onClick={() => navigate(-1)}
          >
            <i className="fa-solid fa-arrow-left"></i> Back
          </button>

          {favouriteMovies.length > 0 && (
            <button
              onClick={clearFavourites}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-200"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Title and Count */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 bg-clip-text text-transparent drop-shadow-lg">
            Your Favourite Movies ⭐
          </h1>
          <p className="text-blue-700 text-lg">
            {favouriteMovies.length} movie
            {favouriteMovies.length !== 1 ? "s" : ""} in your collection
          </p>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {favouriteMovies.map((movie) => (
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
      </div>
    </div>
  );
}
