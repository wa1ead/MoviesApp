import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieContext from "../context/MovieContext";
import fetchMovieDetails from "../services/fetchMovieDetails";

export default function Description() {
  const { id } = useParams();
  const navigate = useNavigate();
  //THE MOVIE DATA STATE
  const [movie, setMovie] = useState({});
  const { loading, setLoading } = useContext(MovieContext);
  console.log(id);

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);
        //SETTING DATA COMMING FROM FETCH FUNCTION INTO VARIABLE
        const movieData = await fetchMovieDetails({ id });
        //SETTING THE DATA VARIABLE INTO MOVIE STATE
        setMovie(movieData);
      } catch (err) {
        console.error("Error: ", err);
        throw err;
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id]);
  console.log(movie);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-200 via-white to-blue-400">
        <span className="text-3xl text-blue-900 font-bold animate-pulse">
          Loading...
        </span>
      </div>
    );
  }

  const safeTitle = movie?.original_title || movie?.title || "Untitled";
  const safeOverview = movie?.overview || "No description available.";
  const safeRating =
    typeof movie?.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : "N/A";
  const posterSrc = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300 px-0 py-10 flex flex-col items-center">
      <button
        className="transition ease-in-out transform hover:scale-105 hover:translate-y-1 duration-300 my-4 self-start py-2 px-6 text-lg border-2 border-blue-300 rounded-full text-blue-900 bg-white shadow hover:bg-blue-100"
        onClick={() => navigate(-1)}
      >
        <i className="fa-solid fa-arrow-left"></i> Back
      </button>
      <div className="w-full max-w-3xl py-8 flex flex-col gap-8 bg-white/90 rounded-3xl shadow-2xl border border-blue-200">
        <div className="flex w-full justify-between px-8 items-center">
          <h2 className="text-4xl font-extrabold text-blue-900 drop-shadow-lg">
            {safeTitle}
          </h2>
          <p className="text-yellow-500 font-bold text-xl flex items-center gap-2">
            <span className="text-2xl">
              <i className="fa-solid fa-star"></i>
            </span>
            {safeRating}
            <span className="text-blue-900">/10</span>
          </p>
        </div>
        {posterSrc && (
          <a
            href={movie?.homepage || "#"}
            target="_blank"
            rel="noreferrer"
            className="mx-auto"
          >
            <img
              className="w-80 h-96 object-cover rounded-2xl shadow-lg border-4 border-blue-200 mx-auto"
              src={posterSrc}
              alt={safeTitle}
            />
          </a>
        )}
        <p className="mx-8 text-lg text-blue-900 font-semibold">
          <span className="font-light text-lg text-blue-700">
            Description:{" "}
          </span>
          {safeOverview}
        </p>
      </div>
    </div>
  );
}
