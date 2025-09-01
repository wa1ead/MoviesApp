import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Favourites() {
  const navigate = useNavigate();
  //SAVING MOVIES FROM LOCALSTORAGE TO FAVOURITES VARIABLE
  const favouriteMovies = JSON.parse(localStorage.getItem("favouriteMovies"));
  console.log(favouriteMovies);

  if (!favouriteMovies) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-300">
        <h2 className="text-2xl font-bold text-blue-900 drop-shadow-lg">
          You have not added any movie to favourites yet.
        </h2>
      </div>
    );
  }
  return (
    <div className="min-h-screen px-0 py-10 bg-gradient-to-br from-blue-100 via-white to-blue-300 flex flex-col gap-6 items-center">
      <button
        className="transition ease-in-out transform hover:scale-105 hover:translate-y-1 duration-300 self-start py-2 px-6 text-lg border-2 border-blue-300 rounded-full text-blue-900 bg-white shadow hover:bg-blue-100"
        onClick={() => navigate(-1)}
      >
        <i className="fa-solid fa-arrow-left"></i> Back
      </button>
      <h1 className="font-extrabold text-4xl text-center text-blue-900 mb-8 drop-shadow-lg">
        Favourite Movies List ⭐
      </h1>
      <div className="flex flex-col gap-8 w-full max-w-4xl">
        {favouriteMovies.map((fav) => (
          <Link
            to={`/description/${fav.id}`}
            key={fav.id}
            className="hover:scale-101 transition"
          >
            <div className="bg-white/90 h-80 border rounded-2xl shadow-xl flex flex-col sm:flex-row overflow-hidden hover:shadow-2xl border-blue-200">
              <div className="shrink-0 relative w-full sm:w-60 md:w-72 h-60 sm:h-full rounded-t-2xl sm:rounded-s-2xl overflow-hidden">
                <img
                  className="w-full h-full object-cover rounded-t-2xl sm:rounded-s-2xl border-2 border-blue-200"
                  src={"https://image.tmdb.org/t/p/w500" + fav.poster_path}
                  alt={fav.title}
                />
              </div>
              <div className="flex flex-wrap w-full">
                <div className="p-6 flex flex-col h-full justify-between">
                  <h3 className="text-xl font-extrabold text-blue-900 mb-2 truncate drop-shadow-md">
                    {fav.title}
                  </h3>
                  <p className="text-gray-700 text-sm mb-2 line-clamp-3">
                    {fav.overview}
                  </p>
                  <div className="mt-5 sm:mt-auto">
                    <p className="text-yellow-500 font-bold text-lg drop-shadow">
                      ⭐ Rating: <b>{fav.vote_average.toFixed(1)}</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
