import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import MovieContext from "../context/MovieContext";
import LoginRegister from "./LoginRegister";
import FavouriteMovies from "./FavouriteMovies";

function Profile() {
  const { isLoggedIn, user, logout, loading } = useContext(AuthContext);
  const { favouriteMovies, loadUserFavourites, clearUserFavourites } = useContext(MovieContext);

  // Sync favourites with auth state
  useEffect(() => {
    if (isLoggedIn && user?.email) {
      loadUserFavourites(user.email);
    } else if (!loading) {
      clearUserFavourites();
    }
  }, [isLoggedIn, user?.email, loading, loadUserFavourites, clearUserFavourites]);

  // Show loading spinner while auth is being checked
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300 flex items-center justify-center">
        <div className="flex items-center space-x-2 text-blue-900">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div>
          <span className="text-xl font-semibold">Loading...</span>
        </div>
      </div>
    );
  }

  // Show login/register form if user is not logged in
  if (!isLoggedIn) {
    return <LoginRegister />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300 px-4 md:px-10 py-8 pb-32">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white/90 rounded-2xl shadow-xl border border-blue-200 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-900">
                  Welcome back, {user?.name}!
                </h1>
                <p className="text-blue-600">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-200"
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-900">
                {favouriteMovies.length}
              </div>
              <div className="text-blue-600">Favourite Movies</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-900">Active</div>
              <div className="text-green-600">Account Status</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-purple-900">Member</div>
              <div className="text-purple-600">Account Type</div>
            </div>
          </div>
        </div>

        {/* Favourite Movies Section */}
        <FavouriteMovies />
      </div>
    </div>
  );
}

export default Profile;
