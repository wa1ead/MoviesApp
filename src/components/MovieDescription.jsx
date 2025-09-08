import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaStar,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import MovieContext from "../context/MovieContext";
import fetchMovieDetails from "../services/fetchMovieDetails";
import fetchMovieTrailer from "../services/fetchMovieTrailer";

export default function MovieDescription() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(MovieContext);
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchMovieDetails({ id });
        setMovie(data);
        const trailer = await fetchMovieTrailer(id);
        if (trailer) setTrailerKey(trailer.key);
      } catch (err) {
        console.error("Error: ", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, setLoading]);

  if (loading || !movie) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-200 via-white to-blue-400">
        <span className="text-3xl text-blue-900 font-bold animate-pulse">
          Loading...
        </span>
      </div>
    );
  }

  const title = movie.original_title || movie.title || "Untitled";
  const overview = movie.overview || "No description available.";
  const rating =
    typeof movie.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : "N/A";
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : null;
  const runtime = movie.runtime ? `${movie.runtime} min` : null;
  const release = movie.release_date || null;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-blue-300 text-blue-900 pb-32">
      {/* Hero Image Section */}
      {poster && (
        <div className="w-full relative">
          <img
            src={poster}
            alt={title}
            className="w-full max-h-[85vh] object-cover object-center shadow-lg"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-blue-100/70" />
        </div>
      )}

      {/* Content Section Below Image */}
      <div className="max-w-5xl mx-auto px-4 lg:px-6 -mt-10 relative z-10">
        <div className="bg-white/90 backdrop-blur rounded-3xl shadow-2xl border border-blue-200 p-8 md:p-10">
          <button
            onClick={() => navigate(-1)}
            className="group mb-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-blue-300 shadow hover:shadow-lg hover:bg-blue-50 transition"
          >
            <FaArrowLeft className="text-blue-700 group-hover:-translate-x-0.5 transition" />
            <span className="font-semibold">Back</span>
          </button>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow-lg leading-tight bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 bg-clip-text text-transparent">
                {title}
              </h1>
              <div className="flex items-center gap-3 bg-white rounded-xl px-5 py-3 shadow border border-blue-200 self-start md:self-auto">
                <FaStar className="text-yellow-500 text-3xl" />
                <span className="text-3xl font-bold text-blue-900">
                  {rating}
                </span>
                <span className="text-sm text-blue-700">/10</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm font-medium">
              {release && (
                <span className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-2 rounded-full">
                  <FaCalendarAlt className="text-blue-600" /> {release}
                </span>
              )}
              {runtime && (
                <span className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-2 rounded-full">
                  <FaClock className="text-blue-600" /> {runtime}
                </span>
              )}
              {movie.status && (
                <span className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-2 rounded-full">
                  Status: {movie.status}
                </span>
              )}
              {movie.original_language && (
                <span className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-800 px-4 py-2 rounded-full uppercase">
                  Lang: {movie.original_language}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              {trailerKey && (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold shadow-lg transition"
                >
                  <MdOutlineSlowMotionVideo /> Play Trailer
                </button>
              )}
            </div>

            <p className="text-lg leading-relaxed text-blue-900 font-medium">
              <span className="block text-blue-700 font-semibold mb-2">
                Overview
              </span>
              {overview}
            </p>

            {movie.genres && movie.genres.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-3 text-blue-800">Genres</h3>
                <div className="flex flex-wrap gap-3">
                  {movie.genres.map((g) => (
                    <span
                      key={g.id}
                      className="px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm shadow"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {movie.production_companies &&
              movie.production_companies.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold mb-3 text-blue-800">
                    Production
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {movie.production_companies.slice(0, 6).map((c) =>
                      c.logo_path ? (
                        <div className="w-20 h-20">
                          <img
                            key={c.id}
                            src={`https://image.tmdb.org/t/p/original${c.logo_path}`}
                            alt={c.name}
                            className="size-full object-contain"
                          />
                        </div>
                      ) : (
                        <div
                          key={c.id}
                          className="px-4 py-1.5 flex justify-center items-center rounded-full bg-white border border-blue-200 text-blue-700 text-sm shadow-sm"
                        >
                          <span>{c.name}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

            <div className="mt-4 flex flex-wrap gap-4">
              {movie.homepage && (
                <a
                  href={movie.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-semibold shadow-lg transition"
                >
                  Official Site <FaExternalLinkAlt className="text-sm" />
                </a>
              )}
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/80 hover:bg-white text-blue-800 font-semibold shadow border border-blue-300 transition"
              >
                <FaArrowLeft /> Back
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative w-full max-w-3xl aspect-video bg-black rounded-xl shadow-2xl overflow-hidden">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-3 right-3 z-10 bg-white/90 text-blue-800 px-3 py-1 rounded-full shadow hover:bg-white"
            >
              ✕
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Trailer"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
