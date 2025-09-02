import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//IMPORTING FETCHING MOVIES FUNCTION FROM SERVICES FOLDER
import fetchPopularMovies from "../services/fetchPopularMovies";
// import fetchSearchedMovies from "../services/fetchSearchedMovies";
//IMPORTING OTHER COMPONENTS
import SearchBar from "./SearchBar";
import Modal from "./Modal";
import PopularMoviesList from "./PopularMoviesList";
import SearchedMoviesList from "./SearchedMoviesList";
import MovieContext from "../context/MovieContext";

//DECLARING FETCH SEARCHED MOVIES FUNCTION IN HOME COMPONENT DUE TO AN UNEXPECTED IMPORTING ERROR
async function fetchSearchedMovies({ query }) {
  if (!query || query.trim() === "") return [];

  const url = `https://api.themoviedb.org/3/search/movie?query=${query.trim()}`;
  const config = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_API_KEY,
    },
  };

  try {
    // Axios handles JSON parsing automatically
    const response = await axios.get(url, config);
    const searchedMoviesData = response.data.results;
    console.log("searched:", searchedMoviesData);
    return searchedMoviesData;
  } catch (err) {
    console.error("Error fetching searched movies:", err);
    throw err;
  }
}

export default function Home() {
  //THE MOVIES DATA STATE
  const [movies, setMovies] = useState([]);
  //The searched movies state
  const [searchedMovies, setSearchedMovies] = useState([]);
  //The searchBar input state
  const [title, setTitle] = useState("");
  //THE DISPLAY MODAL STATE
  const [modal, setModal] = useState(false);
  //THE FORMDATA INPUTTED STATE
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    poster: "",
    rating: 0,
  });
  //THE LOADING STATE
  const [loading, setLoading] = useState(true);

  //INSERTING DATA INTO MOVIES STATE
  useEffect(() => {
    async function popularMovies() {
      try {
        //SETTING THE LOADER TO TRUE
        setLoading(true);
        //GETTING MOVIES DATA FROM API FETCHING FUNCTION
        const popularMoviesData = await fetchPopularMovies();
        //SETTING FETCHED MOVIES DATA INTO THE MOVIES STATE
        setMovies(popularMoviesData);
      } catch (err) {
        console.error(err);
        throw err;
      } finally {
        setLoading(false);
      }
    }
    popularMovies();
  }, []);

  console.log("home popular:", movies);

  //HANDLING SEARCHBAR INPUT
  function handleSearch(e) {
    setTitle(e.target.value);
  }
  console.log(title);

  //DISPLAYING LIST OF SEARCHED MOVIES
  useEffect(() => {
    async function searchedMovies() {
      try {
        //SETTING THE LOADER TO TRUE
        setLoading(true);
        //GETTING SEARCHED MOVIES DATA FROM API FETCHING FUNCTION
        const searchedMoviesData = await fetchSearchedMovies({ query: title });
        //SETTING SEARCHED MOVIES DATA INTO THE SEARCHED MOVIES STATE
        setSearchedMovies(searchedMoviesData);
      } catch (err) {
        console.error("Error: ", err);
        throw err;
      } finally {
        setLoading(false);
      }
    }
    searchedMovies();
  }, [title]);
  console.log("home searched:", searchedMovies);

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

  // Wrap the app in MovieContext.Provider
  return (
    <MovieContext.Provider
      value={{ title, setTitle, searchedMovies, setSearchedMovies }}
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300 px-0 md:px-10">
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-10 bg-white/95 rounded-b-3xl shadow-2xl mb-8 border-b-4 border-blue-200">
          <Link to="/" className="flex items-center">
            <img
              src="../moviesapp-logo.png"
              alt="MoviesApp Logo"
              className="w-32 h-16 drop-shadow-xl hover:scale-105 transition rounded-xl border-2 border-blue-200 bg-blue-50"
            />
          </Link>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="rounded-lg bg-blue-100 shadow-md px-2 py-1 flex gap-2 items-center border border-blue-200">
              <SearchBar />
              <Modal
                modal={modal}
                handleClickModal={handleClickModal}
                handleInputChange={handleInputChange}
                handleSaveMovie={handleSaveMovie}
              />
            </div>
            <Link
              to="/favourites"
              className="font-bold text-blue-900 text-lg md:text-xl hover:underline hover:text-blue-700 transition px-4 py-2 rounded-lg bg-blue-50 shadow hover:bg-blue-100 border border-blue-200"
            >
              <span className="inline-block align-middle">⭐ Favourites</span>
            </Link>
          </div>
        </header>
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
    </MovieContext.Provider>
  );
}
