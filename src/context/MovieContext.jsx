import { createContext, useState } from "react";

export const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

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
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

// Default export should be the context (components import default as MovieContext)
export default MovieContext;
