import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaStar,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import MovieContext from "../context/MovieContext";
import fetchMovieDetails from "../services/fetchMovieDetails";

export default function MovieDescription() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(MovieContext);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchMovieDetails({ id });
        setMovie(data);
      } catch (e) {
        console.error(e);
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
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;
  const runtime = movie.runtime ? `${movie.runtime} min` : null;
  const release = movie.release_date || null;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-blue-300 text-blue-900">
      <div className="max-w-7xl mx-auto px-4 lg:px-10 py-8">
        <button
          onClick={() => navigate(-1)}
          className="group mb-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur border border-blue-300 shadow hover:shadow-lg hover:bg-white transition"
        >
          <FaArrowLeft className="text-blue-700 group-hover:-translate-x-0.5 transition" />
          <span className="font-semibold">Back</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-10 w-full bg-white/90 rounded-3xl shadow-2xl border border-blue-200 p-8">
          {poster && (
            <div className="flex-shrink-0 mx-auto lg:mx-0 w-72 sm:w-80">
              <img
                src={poster}
                alt={title}
                className="w-full h-[430px] object-cover rounded-2xl shadow-lg border-4 border-blue-200"
              />
            </div>
          )}

          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow-lg leading-tight bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 bg-clip-text text-transparent">
                {title}
              </h1>
              <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-2 shadow border border-blue-200 self-start md:self-auto">
                <FaStar className="text-yellow-500 text-2xl" />
                <span className="text-2xl font-bold text-blue-900">
                  {rating}
                </span>
                <span className="text-sm text-blue-700">/10</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-6 text-sm font-medium">
              {release && (
                <span className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-800 px-3 py-1.5 rounded-full">
                  <FaCalendarAlt className="text-blue-600" /> {release}
                </span>
              )}
              {runtime && (
                <span className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-800 px-3 py-1.5 rounded-full">
                  <FaClock className="text-blue-600" /> {runtime}
                </span>
              )}
              {movie.status && (
                <span className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-800 px-3 py-1.5 rounded-full">
                  Status: {movie.status}
                </span>
              )}
              {movie.original_language && (
                <span className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-800 px-3 py-1.5 rounded-full uppercase">
                  Lang: {movie.original_language}
                </span>
              )}
            </div>

            <p className="mt-8 text-lg leading-relaxed text-blue-900 font-medium">
              <span className="block text-blue-700 font-semibold mb-1">
                Overview
              </span>
              {overview}
            </p>

            {movie.genres && movie.genres.length > 0 && (
              <div className="mt-8">
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
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-3 text-blue-800">
                    Production
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {movie.production_companies.slice(0, 6).map((c) => (
                      <span
                        key={c.id}
                        className="px-4 py-1.5 rounded-full bg-white border border-blue-200 text-blue-700 text-sm shadow-sm"
                      >
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            <div className="mt-10 flex flex-wrap gap-4">
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
    </div>
  );
}
