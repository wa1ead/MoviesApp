import axios from "axios";

export default async function fetchPopularMovies(page = 1, isLoadMore = false) {
  const config = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_API_KEY,
    },
  };

  try {
    if (!isLoadMore && page === 1) {
      // Initial load - fetch first 3 pages for a good starting set
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
      return {
        movies: allMovies,
        currentPage: 3,
        totalPages: responses[0].data.total_pages,
      };
    } else {
      // Load more - fetch single page
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?page=${page}`,
        config
      );

      console.log(`Page ${page} movies fetched:`, response.data.results.length);
      return {
        movies: response.data.results,
        currentPage: page,
        totalPages: response.data.total_pages,
      };
    }
  } catch (err) {
    console.error("Error fetching popular movies:", err);
    throw err;
  }
}
