import { Link } from "react-router-dom";

export default function FeaturedFilm({ movie }) {
  // Debug: Check if movie and movie.id exist
  console.log("Featured movie data:", movie);

  if (!movie) {
    return <div>Loading featured movie...</div>;
  }

  return (
    <section className="mx-auto my-10 p-8 bg-white/90 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center gap-10 max-w-5xl">
      <img
        className="w-72 h-96 object-cover rounded-2xl shadow-lg border-4 border-blue-200"
        src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
        alt={movie.title}
      />
      <div className="flex-1 flex flex-col gap-4">
        <h2 className="text-4xl font-extrabold text-blue-900 mb-2 drop-shadow-lg">
          {movie.title}
        </h2>
        <p className="text-gray-700 text-lg mb-2 line-clamp-5">
          {movie.overview}
        </p>
        <p className="text-yellow-500 font-bold text-xl mb-2">
          ⭐ {movie.vote_average.toFixed(1)}
        </p>
        <Link
          to={`/description/${movie.id}`}
          className="mt-4 px-8 py-3 bg-blue-900 text-white rounded-xl hover:bg-blue-700 shadow-md font-semibold text-lg transition inline-block text-center"
        >
          View Description
        </Link>
      </div>
    </section>
  );
}
