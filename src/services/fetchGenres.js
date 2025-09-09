import axios from "axios";

export default async function fetchGenres() {
  const config = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_API_KEY,
    },
  };

  try {
    const response = await axios.get("https://api.themoviedb.org/3/genre/movie/list", config);
    return response.data.genres;
  } catch (err) {
    console.error("Error fetching genres:", err);
    throw err;
  }
}