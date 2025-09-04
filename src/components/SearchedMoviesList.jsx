import { useContext } from "react";
import MovieContext from "../context/MovieContext";
import MovieCard from "./MovieCard";

const SearchedMoviesList = () => {
  const { searchedMovies, setSearchedMovies, title, setTitle } =
    useContext(MovieContext);

  //DISPLAYING LIST OF SEARCHED MOVIES
  useEffect(() => {
    async function searchedMoviesFunc() {
      try {
        setLoading(true);
        const searchedMoviesData = await fetchSearchedMovies({ query: title });
        setSearchedMovies(searchedMoviesData);
      } catch (err) {
        console.error("Error: ", err);
        throw err;
      } finally {
        setLoading(false);
      }
    }
    searchedMoviesFunc();
  }, [title, setSearchedMovies, setLoading]);

  return (
    <div className="mx-16 pb-4">
      <h2 className="my-10 text-3xl font-semibold text-blue-950">
        {title}🎬 :{" "}
      </h2>
      <div className=" grid grid-cols-4 gap-16 max-md:grid-cols-1 max-lg:grid-cols-2 ">
        {searchedMovies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default SearchedMoviesList;
