import axios from "axios";

export default async function fetchMovieTrailer(id) {
  const movieId = typeof id === "object" ? id.id : id;
  if (!movieId) return null;
  const config = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_API_KEY,
    },
  };
  try {
    const videoRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      config
    );
    const videos = videoRes.data.results || [];
    const trailer = videos.find(
      (v) => v.site === "YouTube" && /trailer/i.test(v.type)
    );
    return trailer || null;
  } catch (videoErr) {
    console.warn("Trailer fetch failed", videoErr);
    return null;
  }
}
