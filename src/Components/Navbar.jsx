import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, BookMarked, Home } from "lucide-react";

const Navbar = ({ query, setQuery }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Redirect to search page with query
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            <BookMarked size={32} />
            <span className="hidden sm:block">BookLib</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search books, authors, topics..."
                className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>
          </form>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                location.pathname === "/"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Home size={20} />
              <span className="hidden md:block">Home</span>
            </Link>

            <Link
              to="/shelf"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                location.pathname === "/shelf"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <BookMarked size={20} />
              <span className="hidden md:block">My Shelf</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;