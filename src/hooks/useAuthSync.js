import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import MovieContext from "../context/MovieContext";

// Custom hook to sync auth state with favourites
export const useAuthSync = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const { loadUserFavourites, clearUserFavourites } = useContext(MovieContext);

  useEffect(() => {
    if (isLoggedIn && user?.email) {
      // Load user's favourites when logged in
      loadUserFavourites(user.email);
    } else {
      // Clear favourites when logged out
      clearUserFavourites();
    }
  }, [isLoggedIn, user?.email, loadUserFavourites, clearUserFavourites]);
};

export default useAuthSync;
