import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

const PlaceholderCard = ({ movie, isLoading = true }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (movie && !isLoading) {
      // Slight delay for smooth transition
      const timer = setTimeout(() => setShowContent(true), 100);
      return () => clearTimeout(timer);
    }
  }, [movie, isLoading]);

  if (isLoading || !movie) {
    // Skeleton placeholder
    return (
      <div className="animate-pulse">
        <div className="relative rounded-xl shadow-lg overflow-hidden h-[400px] bg-gradient-to-br from-gray-200 to-gray-300">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-300/50 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="h-6 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  // Real movie card content
  return <MovieCard movie={movie} />;
};

export default PlaceholderCard;
