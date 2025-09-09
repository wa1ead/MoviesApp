import axios from "axios";

export default async function fetchPopularMovies() {
  const config = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_API_KEY,
    },
  };

  try {
    // Fetch first 3 pages to get 60 movies (20 per page)
    const promises = [
      axios.get("https://api.themoviedb.org/3/movie/popular?page=1", config),
      axios.get("https://api.themoviedb.org/3/movie/popular?page=2", config),
      axios.get("https://api.themoviedb.org/3/movie/popular?page=3", config),
    ];

    const responses = await Promise.all(promises);

    // Combine results from all pages
    const allMovies = responses.reduce((acc, response) => {
      return acc.concat(response.data.results);
    }, []);

    console.log("Popular movies fetched:", allMovies.length);
    return allMovies;
  } catch (err) {
    console.error("Error fetching popular movies:", err);
    throw err;
  }
}
