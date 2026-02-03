import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import BookCard from "../Components/BookCard";
import { useShelf } from "../context/ShelfContext";
import { useQuery } from "@tanstack/react-query";
import { searchBooks } from "../services/bookAPI";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { shelf, addToShelf, removeFromShelf } = useShelf();
  const [query, setQuery] = useState(""); // Fix 1: added ""
  const [searchTerm, setSearchTerm] = useState("fiction"); // Fix 1: added default value
  const navigate = useNavigate();

  // Fetch data
  const { data, isLoading, isError, error } = useQuery({ // Fix 2: Error → error
    queryKey: ["books", searchTerm],
    queryFn: () => searchBooks(searchTerm),
    enabled: searchTerm?.length > 0, // Fix 3: added ?. to prevent crash when undefined
  });

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchTerm(query.trim());
    }
  };

  // Debouncing effect when user stops typing
  React.useEffect(() => {
    if (!query || query.trim() === "") return; // Fix: added !query check

    const timer = setTimeout(() => {
      setSearchTerm(query.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Check if book is in shelf
  const isBookInShelf = (bookKey) => {
    return shelf.some((b) => b.key === bookKey);
  };

  // Add or remove from shelf
  const handleToggleShelf = (book) => {
    if (isBookInShelf(book.key)) {
      removeFromShelf(book.key);
    } else {
      addToShelf(book);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar query={query} setQuery={setQuery} />

      {/* Hero Section */}
      <section className="relative w-full h-96 bg-blue-600 flex items-center justify-center text-center text-white font-mono">
        <div className="px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome To Book Library
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Discover new pages to start your new life
          </p>
        </div>
      </section>

      {/* Search Result */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* Title and result count */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-center md:text-3xl">
            {searchTerm ? `Result for "${searchTerm}"` : "Featured Books"}
          </h2>
          {data && (
            <p className="text-gray-500 text-sm">
              {data.totalResults.toLocaleString()} books found {/* Fix 4: toLocalString → toLocaleString */}
            </p>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-20">
            <p className="text-red-500 text-lg">
              Error: {error.message} {/* Fix 6: Error → error */}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-amber-300 rounded-md hover:bg-amber-400"
              onClick={() => setSearchTerm("fiction")} // Fix 5: searchTerm → setSearchTerm
            >
              Try Again
            </button>
          </div>
        )}

        {/* Fetching data using API */}
        {!isLoading && !isError && data && data.books.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.books.map((book) => (
              <BookCard
                key={book.key}
                book={book}
                isSaved={isBookInShelf(book.key)}
                onToggleSave={() => handleToggleShelf(book)}
                onViewDetail={() => navigate(`/book${book.key}`)}
              />
            ))}
          </div>
        )}

        {/* No Result */}
        {!isLoading && !isError && data && data.books.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No books found for "{searchTerm}"
            </p>
            <button
              onClick={() => {
                setQuery("");
                setSearchTerm("fiction");
              }}
              className="mt-4 px-4 py-2 bg-amber-300 rounded-md hover:bg-amber-400"
            >
              Browse Fiction
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;