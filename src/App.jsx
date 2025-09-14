import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { MovieProvider } from "./context/MovieContext";
import { AuthProvider } from "./context/AuthContext";
import Home from "./components/Home";
import MovieDescription from "./components/MovieDescription";
import Favourites from "./components/Favourites";
import Search from "./components/Search";
import Navigation from "./components/Navigation";
import Categories from "./components/Categories";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <AuthProvider>
        <MovieProvider>
          <Toaster />
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/description/:id" element={<MovieDescription />} />
            <Route path="/search" element={<Search />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favourites" element={<Favourites />} />
          </Routes>
          {/* Bottom Navigation Bar */}
          <Navigation />
        </MovieProvider>
      </AuthProvider>
    </>
  );
}

export default App;
