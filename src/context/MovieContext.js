import { createContext } from "react";

const MovieContext = createContext();

const MovieProvider = () => {
  //THE MOVIES DATA STATE
  const [movies, setMovies] = useState([]);
  //The searched movies state
  const [searchedMovies, setSearchedMovies] = useState([]);
  //The searchBar input state
  const [title, setTitle] = useState("");
  //THE LOADING STATE
  const [loading, setLoading] = useState(true);

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        searchedMovies,
        setSearchedMovies,
        title,
        setTitle,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
