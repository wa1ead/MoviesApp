import { useContext } from "react";
import { FaHome, FaThList, FaSearch, FaUser, FaHeart } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navigation = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleFavouritesClick = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      navigate("/profile");
    } else {
      navigate("/favourites");
    }
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const getNavLinkClasses = (path) => {
    const baseClasses =
      "flex-1 flex flex-col items-center py-3 transition duration-200";
    const activeClasses = "bg-blue-500 text-white shadow-lg";
    const inactiveClasses = "hover:bg-blue-100 text-blue-700";

    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  const getIconClasses = (path) => {
    const baseClasses = "text-2xl mb-1 transition duration-200";
    const activeClasses = "text-white";
    const inactiveClasses = "text-blue-700";

    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  const getTextClasses = (path) => {
    const baseClasses = "font-semibold text-sm transition duration-200";
    const activeClasses = "text-white";
    const inactiveClasses = "text-blue-900";

    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white/95 border-t-2 border-blue-200 shadow-2xl flex justify-between items-center z-50">
      <Link to="/" className={getNavLinkClasses("/")}>
        <FaHome className={getIconClasses("/")} />
        <span className={getTextClasses("/")}>Home</span>
      </Link>
      <Link to="/categories" className={getNavLinkClasses("/categories")}>
        <FaThList className={getIconClasses("/categories")} />
        <span className={getTextClasses("/categories")}>Categories</span>
      </Link>
      <Link to="/search" className={getNavLinkClasses("/search")}>
        <FaSearch className={getIconClasses("/search")} />
        <span className={getTextClasses("/search")}>Search</span>
      </Link>
      <button
        onClick={handleFavouritesClick}
        className={`${getNavLinkClasses("/favourites")} border-none ${
          isActive("/favourites") ? "bg-blue-500" : "bg-transparent"
        }`}
      >
        <FaHeart className={getIconClasses("/favourites")} />
        <span className={getTextClasses("/favourites")}>Favourites</span>
      </button>
      <Link to="/profile" className={getNavLinkClasses("/profile")}>
        <FaUser className={getIconClasses("/profile")} />
        <span className={getTextClasses("/profile")}>Profile</span>
      </Link>
    </nav>
  );
};

export default Navigation;
