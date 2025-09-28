import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import {
  FaPlay,
  FaHeart,
  FaStar,
  FaCalendarAlt,
  FaClock,
  FaGlobe,
} from "react-icons/fa";
import MovieContext from "../context/MovieContext";
import AuthContext from "../context/AuthContext";

export default function FeaturedFilm({ movie }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { toggleFavourite, isFavourite } = useContext(MovieContext);
  const { isLoggedIn } = useContext(AuthContext);

  console.log("Featured movie data:", movie);

  if (!movie) {
    return (
      <div className="w-full h-96 bg-gradient-to-r from-blue-200 to-blue-400 flex items-center justify-center">
        <div className="text-2xl text-blue-900 font-bold animate-pulse">
          Loading featured movie...
        </div>
      </div>
    );
  }

  const handleFavouriteClick = () => {
    if (!isLoggedIn) {
      window.location.href = "/profile";
      return;
    }
    toggleFavourite(movie);
  };

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";
  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : `https://image.tmdb.org/t/p/original${movie.poster_path}`;

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={backdropUrl}
          alt={movie.title}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Movie Poster */}
            <div className="lg:col-span-3 flex justify-center lg:justify-start">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-64 h-96 object-cover rounded-2xl shadow-2xl border-4 border-white/20 transform hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Movie Information */}
            <div className="lg:col-span-9 text-white space-y-6">
              {/* Title and Year */}
              <div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-2 text-white drop-shadow-2xl leading-tight">
                  {movie.title}
                </h1>
                {movie.original_title !== movie.title && (
                  <p className="text-xl md:text-2xl text-gray-300 font-light italic">
                    {movie.original_title}
                  </p>
                )}
              </div>

              {/* Movie Stats */}
              <div className="flex flex-wrap items-center gap-6 text-lg">
                <div className="flex items-center gap-2 bg-yellow-500/20 px-4 py-2 rounded-full border border-yellow-500/30">
                  <FaStar className="text-yellow-400" />
                  <span className="font-bold text-yellow-300">
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span className="text-gray-300 text-sm">
                    ({movie.vote_count?.toLocaleString()} votes)
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full border border-blue-500/30">
                  <FaCalendarAlt className="text-blue-400" />
                  <span className="text-blue-300 font-semibold">
                    {releaseYear}
                  </span>
                </div>

                {movie.adult !== undefined && (
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                      movie.adult
                        ? "bg-red-600/80 text-red-200 border border-red-500/50"
                        : "bg-green-600/80 text-green-200 border border-green-500/50"
                    }`}
                  >
                    {movie.adult ? "18+" : "All Ages"}
                  </div>
                )}

                <div className="flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full border border-purple-500/30">
                  <FaGlobe className="text-purple-400" />
                  <span className="text-purple-300 font-semibold uppercase">
                    {movie.original_language}
                  </span>
                </div>
              </div>

              {/* Overview */}
              <div className="max-w-4xl">
                <p className="text-lg md:text-xl leading-relaxed text-gray-200 font-light">
                  {movie.overview}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to={`/description/${movie.id}`}
                  className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transform hover:scale-105 transition-all duration-200"
                >
                  <FaPlay className="text-sm" />
                  Watch Details
                </Link>

                <button
                  onClick={handleFavouriteClick}
                  className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transform hover:scale-105 transition-all duration-200 ${
                    isFavourite(movie.id)
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-white/20 hover:bg-white/30 text-white border border-white/30"
                  }`}
                >
                  <FaHeart
                    className={`text-sm ${
                      isFavourite(movie.id) ? "text-white" : "text-pink-400"
                    }`}
                  />
                  {isFavourite(movie.id)
                    ? "Remove from Favourites"
                    : "Add to Favourites"}
                </button>

                {movie.popularity && (
                  <div className="flex items-center gap-2 bg-orange-500/20 px-6 py-4 rounded-xl border border-orange-500/30">
                    <span className="text-orange-300 font-bold text-lg">
                      🔥 {Math.round(movie.popularity)} Popularity
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade to content */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-100 to-transparent"></div>
    </section>
  );
}
