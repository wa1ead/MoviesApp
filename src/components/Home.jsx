import { useState, useEffect, useContext } from "react";
//IMPORTING FETCHING MOVIES FUNCTION FROM SERVICES FOLDER
import fetchPopularMovies from "../services/fetchPopularMovies";
//IMPORTING SEARCHED MOVIES FUNCTION FROM SERVICES FOLDER
import fetchSearchedMovies from "../services/fetchSearchedMovies";
//IMPORTING OTHER COMPONENTS
import PopularMoviesList from "./PopularMoviesList";
import SearchedMoviesList from "./SearchedMoviesList";
import MovieContext from "../context/MovieContext";

export default function Home() {
  const {
    movies,
    setMovies,
    searchedMovies,
    setSearchedMovies,
    title,
    setTitle,
    loading,
    setLoading,
  } = useContext(MovieContext);
  //THE DISPLAY MODAL STATE
  const [modal, setModal] = useState(false);
  //THE FORMDATA INPUTTED STATE
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    poster: "",
    rating: 0,
  });

  //INSERTING DATA INTO MOVIES STATE
  useEffect(() => {
    async function popularMovies() {
      try {
        setLoading(true);
        const popularMoviesData = await fetchPopularMovies();
        setMovies(popularMoviesData);
      } catch (err) {
        console.error(err);
        throw err;
      } finally {
        setLoading(false);
      }
    }
    popularMovies();
  }, [setMovies, setLoading]);

  //HANDLING CLICK ADD MOVIE BUTTON EVENT
  function handleClickModal() {
    setModal(!modal);
  }

  //HANDLING CHANGE FORM DATA INPUT
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  //SAVING FORMDATA OBJECT INTO MOVIES ARRAY
  function handleSaveMovie(e) {
    e.preventDefault();
    //INSERTING MOVIE DATA INTO MOVIES JSON FILE
    setMovies((prevMovies) => [...prevMovies, formData]);
    // console.log(formData);
    setModal(false);
    setFormData({
      title: "",
      description: "",
      poster: "",
      rating: 0,
    });
    // console.log(formData);
  }

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-200 via-white to-blue-400">
        <span className="text-3xl text-blue-900 font-bold animate-pulse">
          Loading...
        </span>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300 px-0 md:px-10 pb-24">
      {/* Featured Film Section */}
      {searchedMovies.length === 0 && movies.length > 0 && (
        <section className="mx-auto my-10 p-8 bg-white/90 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center gap-10 max-w-5xl">
          <img
            className="w-72 h-96 object-cover rounded-2xl shadow-lg border-4 border-blue-200"
            src={"https://image.tmdb.org/t/p/w500" + movies[0].poster_path}
            alt={movies[0].title}
          />
          <div className="flex-1 flex flex-col gap-4">
            <h2 className="text-4xl font-extrabold text-blue-900 mb-2 drop-shadow-lg">
              {movies[0].title}
            </h2>
            <p className="text-gray-700 text-lg mb-2 line-clamp-5">
              {movies[0].overview}
            </p>
            <p className="text-yellow-500 font-bold text-xl mb-2">
              ⭐ {movies[0].vote_average.toFixed(1)}
            </p>
            <button
              className="mt-4 px-8 py-3 bg-blue-900 text-white rounded-xl hover:bg-blue-700 shadow-md font-semibold text-lg transition"
              onClick={() =>
                (window.location.href = `/description/${movies[0].id}`)
              }
            >
              View Description
            </button>
          </div>
        </section>
      )}
      {/* Trending Films List */}
      <main className="mt-8">
        {searchedMovies.length > 0 ? (
          <SearchedMoviesList movies={searchedMovies} title={title} />
        ) : (
          <PopularMoviesList movies={movies.slice(1)} />
        )}
      </main>
    </div>
  );
}
