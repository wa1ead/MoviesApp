import axios from "axios";

export default async function fetchMoviesByGenre(genreId, page = 1) {
  const config = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_API_KEY,
    },
  };

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&page=${page}&sort_by=popularity.desc`,
      config
    );
    return response.data.results;
  } catch (err) {
    console.error("Error fetching movies by genre:", err);
    throw err;
  }
}