import { createContext, useState, useEffect, useCallback } from "react";
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
  const [currentUserEmail, setCurrentUserEmail] = useState(null);

  // Load favourite movies from localStorage for current user
  const loadUserFavourites = useCallback((userEmail) => {
    if (userEmail) {
      const userFavouritesKey = `favouriteMovies_${userEmail}`;
      const savedFavourites = localStorage.getItem(userFavouritesKey);
      if (savedFavourites) {
        try {
          const parsedFavourites = JSON.parse(savedFavourites);
          setFavouriteMovies(parsedFavourites);
        } catch (error) {
          console.error("Error parsing favourite movies:", error);
          localStorage.removeItem(userFavouritesKey);
          setFavouriteMovies([]);
        }
      } else {
        setFavouriteMovies([]);
      }
      setCurrentUserEmail(userEmail);
    }
  }, []);

  // Clear favourites when user logs out
  const clearUserFavourites = useCallback(() => {
    setFavouriteMovies([]);
    setCurrentUserEmail(null);
    // Also clear from localStorage
    if (currentUserEmail) {
      localStorage.removeItem(`favouriteMovies_${currentUserEmail}`);
    }
  }, [currentUserEmail]);

  // Save favourite movies to localStorage whenever favourites change
  useEffect(() => {
    if (currentUserEmail && favouriteMovies.length >= 0) {
      const userFavouritesKey = `favouriteMovies_${currentUserEmail}`;
      localStorage.setItem(userFavouritesKey, JSON.stringify(favouriteMovies));
    }
  }, [favouriteMovies, currentUserEmail]);

  // Add movie to favourites
  const addToFavourites = (movie) => {
    if (!currentUserEmail) {
      toast.error("Please log in to add movies to favourites", {
        icon: "🔐",
      });
      return false;
    }

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
    if (!currentUserEmail) {
      toast.error("Please log in to manage favourites", {
        icon: "🔐",
      });
      return false;
    }

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
    if (!currentUserEmail) {
      toast.error("Please log in to manage favourites", {
        icon: "🔐",
      });
      return false;
    }

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
    if (!currentUserEmail) {
      toast.error("Please log in to manage favourites", {
        icon: "🔐",
      });
      return false;
    }

    setFavouriteMovies([]);
    toast.success("All favourites cleared!", {
      icon: "🧹",
    });
    return true;
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
        loadUserFavourites,
        clearUserFavourites,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

// Default export should be the context (components import default as MovieContext)
export default MovieContext;
