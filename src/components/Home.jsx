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

  if (loading) return <p>...!</p>;

  return (
    <div className="bg-blue-200 px-10">
      <div className="flex items-center justify-between p-4 max-md:flex-col gap-4 pb-8 border-b-2 border-blue-950">
        <Link to="/">
          <img
            src="../moviesapp-icon.png"
            alt="moviesApp"
            className="w-36 h-20"
          />
        </Link>
        <div className="rounded-lg bg-gray-200 ">
          <div className="flex">
            <SearchBar handleSearch={handleSearch} />
            <Modal
              modal={modal}
              handleClickModal={handleClickModal}
              handleInputChange={handleInputChange}
              handleSaveMovie={handleSaveMovie}
            />
          </div>
        </div>
        <Link to="/favourites" className="font-bold text-gray-700 text-xl">
          Favourites⭐
        </Link>
      </div>
      {/* Featured Film Section */}
      {searchedMovies.length === 0 && movies.length > 0 && (
        <div className="mx-16 my-10 p-8 bg-white rounded-xl shadow-lg flex flex-col items-center">
          <h2 className="text-4xl font-bold text-blue-950 mb-4">Featured Film</h2>
          <div className="w-full flex flex-col md:flex-row items-center gap-8">
            <img
              className="w-80 h-80 rounded-lg"
              src={"https://image.tmdb.org/t/p/w500" + movies[0].poster_path}
              alt={movies[0].title}
            />
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{movies[0].title}</h3>
              <p className="text-gray-600 mb-2">{movies[0].overview}</p>
              <p className="text-yellow-500 font-bold text-lg mb-2">⭐ {movies[0].vote_average.toFixed(1)}</p>
              <button
                className="mt-4 px-6 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-800 transition"
                onClick={() => window.location.href = `/description/${movies[0].id}`}
              >
                View Description
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Trending Films List */}
      {searchedMovies.length > 0 ? (
        <SearchedMoviesList movies={searchedMovies} title={title} />
      ) : (
        <PopularMoviesList movies={movies.slice(1)} />
      )}
    </div>
  );
}
