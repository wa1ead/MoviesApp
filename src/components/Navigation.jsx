import { FaHome, FaThList, FaSearch, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white/95 border-t-2 border-blue-200 shadow-2xl flex justify-between items-center z-50">
      <Link
        to="/"
        className="flex-1 flex flex-col items-center py-3 hover:bg-blue-100 transition"
      >
        <FaHome className="text-blue-700 text-2xl mb-1" />
        <span className="text-blue-900 font-semibold text-sm">Home</span>
      </Link>
      <Link
        to="/categories"
        className="flex-1 flex flex-col items-center py-3 hover:bg-blue-100 transition"
      >
        <FaThList className="text-blue-700 text-2xl mb-1" />
        <span className="text-blue-900 font-semibold text-sm">Categories</span>
      </Link>
      <Link
        to="/search"
        className="flex-1 flex flex-col items-center py-3 hover:bg-blue-100 transition cursor-pointer"
      >
        <FaSearch className="text-blue-700 text-2xl mb-1" />
        <span className="text-blue-900 font-semibold text-sm">Search</span>
      </Link>
      <Link
        to="/profile"
        className="flex-1 flex flex-col items-center py-3 hover:bg-blue-100 transition"
      >
        <FaUser className="text-blue-700 text-2xl mb-1" />
        <span className="text-blue-900 font-semibold text-sm">Profile</span>
      </Link>
    </nav>
  );
};

export default Navigation;
