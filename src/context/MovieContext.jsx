import { createContext, useState } from "react";

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
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

// Default export should be the context (components import default as MovieContext)
export default MovieContext;
