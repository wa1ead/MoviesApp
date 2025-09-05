import { useState, useEffect, useContext } from "react";
//IMPORTING FETCHING MOVIES FUNCTION FROM SERVICES FOLDER
import fetchPopularMovies from "../services/fetchPopularMovies";
//IMPORTING OTHER COMPONENTS
import FeaturedFilm from "./FeaturedFilm";
import PopularMoviesList from "./PopularMoviesList";
import MovieContext from "../context/MovieContext";

export default function Home() {
  const { movies, setMovies, loading, setLoading } = useContext(MovieContext);

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
  console.log(movies);

  if (loading || movies.length === 0)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-200 via-white to-blue-400">
        <span className="text-3xl text-blue-900 font-bold animate-pulse">
          Loading...
        </span>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300 px-0   md:px-10 pb-24">
      {/* Featured Film Section */}
      <FeaturedFilm movie={movies[0]} />
      {/* Trending Films List */}
      <main className="mt-8">
        <PopularMoviesList movies={movies.slice(1)} />
      </main>
    </div>
  );
}
