import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      // Redirect to profile (which shows login) if not authenticated
      navigate("/profile", { replace: true });
    }
  }, [isLoggedIn, loading, navigate]);

  // Show loading while checking authentication
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

  // If user is authenticated, render the protected component
  if (isLoggedIn) {
    return children;
  }

  // If not authenticated, return null (navigation will handle redirect)
  return null;
}

export default ProtectedRoute;
