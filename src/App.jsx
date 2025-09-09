import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { MovieProvider } from "./context/MovieContext";
import Home from "./components/Home";
import MovieDescription from "./components/MovieDescription";
import Favourites from "./components/Favourites";
import Search from "./components/Search";
import Navigation from "./components/Navigation";
import Categories from "./components/Categories";

function App() {
  return (
    <>
      <MovieProvider>
        <Toaster />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/description/:id" element={<MovieDescription />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/search" element={<Search />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
        {/* Bottom Navigation Bar */}
        <Navigation />
      </MovieProvider>
    </>
  );
}

export default App;
