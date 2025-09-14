import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);
  const [placeholderCards, setPlaceholderCards] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchPlaceholders, setSearchPlaceholders] = useState([]);
  const [favouriteMovies, setFavouriteMovies] = useState([]);

  // Load favourite movies from localStorage on app startup
  useEffect(() => {
    const savedFavourites = localStorage.getItem("favouriteMovies");
    if (savedFavourites) {
      try {
        const parsedFavourites = JSON.parse(savedFavourites);
        setFavouriteMovies(parsedFavourites);
      } catch (error) {
        console.error("Error parsing favourite movies:", error);
        localStorage.removeItem("favouriteMovies");
      }
    }
  }, []);

  // Save favourite movies to localStorage whenever favourites change
  useEffect(() => {
    localStorage.setItem("favouriteMovies", JSON.stringify(favouriteMovies));
  }, [favouriteMovies]);

  // Add movie to favourites
  const addToFavourites = (movie) => {
    const movieExists = favouriteMovies.find(
      (favouriteMovie) => favouriteMovie.id === movie.id
    );

    if (!movieExists) {
      setFavouriteMovies((prevFavourites) => [...prevFavourites, movie]);
      toast.success("Movie added to favourites!", {
        icon: "⭐",
      });
      return true;
    } else {
      toast("Movie already exists in favourites", {
        icon: "⭐",
      });
      return false;
    }
  };

  // Remove movie from favourites
  const removeFromFavourites = (movieId) => {
    const movieExists = favouriteMovies.find(
      (favouriteMovie) => favouriteMovie.id === movieId
    );

    if (movieExists) {
      setFavouriteMovies((prevFavourites) =>
        prevFavourites.filter((movie) => movie.id !== movieId)
      );
      toast.success("Removed from favourites!", {
        icon: "💔",
      });
      return true;
    } else {
      toast.error("Movie not found in favourites");
      return false;
    }
  };

  // Toggle movie favourite status
  const toggleFavourite = (movie) => {
    const movieExists = favouriteMovies.find(
      (favouriteMovie) => favouriteMovie.id === movie.id
    );

    if (movieExists) {
      return removeFromFavourites(movie.id);
    } else {
      return addToFavourites(movie);
    }
  };

  // Check if movie is in favourites
  const isFavourite = (movieId) => {
    return favouriteMovies.some((movie) => movie.id === movieId);
  };

  // Clear all favourites
  const clearFavourites = () => {
    setFavouriteMovies([]);
    toast.success("All favourites cleared!", {
      icon: "🧹",
    });
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        searchedMovies,
        setSearchedMovies,
        title,
        setTitle,
        loading,
        setLoading,
        currentPage,
        setCurrentPage,
        hasMoreMovies,
        setHasMoreMovies,
        placeholderCards,
        setPlaceholderCards,
        searchLoading,
        setSearchLoading,
        searchPlaceholders,
        setSearchPlaceholders,
        favouriteMovies,
        setFavouriteMovies,
        addToFavourites,
        removeFromFavourites,
        toggleFavourite,
        isFavourite,
        clearFavourites,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

// Default export should be the context (components import default as MovieContext)
export default MovieContext;
