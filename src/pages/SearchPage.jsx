import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import BookCard from "../Components/BookCard";
import { useShelf } from "../context/ShelfContext";
import { useQuery } from "@tanstack/react-query";
import { searchBooks } from "../services/bookAPI";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

const SearchPage = () => {
  const { shelf, addToShelf, removeFromShelf } = useShelf();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const queryParam = searchParams.get("q") || "";
  const [query, setQuery] = useState(queryParam);
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [currentPage, setCurrentPage] = useState(1);

  // Update search term when URL param changes
  useEffect(() => {
    const q = searchParams.get("q") || "";
    setQuery(q);
    setSearchTerm(q);
    setCurrentPage(1);
  }, [searchParams]);

  // Fetch data with pagination
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["books", searchTerm, currentPage],
    queryFn: () => searchBooks(searchTerm, currentPage),
    enabled: searchTerm.length > 0,
    keepPreviousData: true,
  });

  // Debouncing effect when user stops typing
  useEffect(() => {
    if (!query || query.trim() === "") {
      return;
    }

    const timer = setTimeout(() => {
      setSearchTerm(query.trim());
      setCurrentPage(1);
      // Update URL
      navigate(`/search?q=${encodeURIComponent(query.trim())}`, { replace: true });
    }, 500);

    return () => clearTimeout(timer);
  }, [query, navigate]);

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

  // Pagination handlers
  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const totalPages = Math.ceil((data?.totalResults || 0) / 20);
    const maxPagesToShow = 5;
    const pages = [];

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <Navbar query={query} setQuery={setQuery} />

      {/* Search Header */}
      <section className="relative w-full bg-gradient-to-r from-Blye-600 via-blue-700 to-indigo-700 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-white mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Search Books
            </h1>
            <p className="text-lg md:text-xl text-purple-100">
              Find your next favorite book
            </p>
          </div>

          {/* Search Input */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for books, authors, topics..."
                className="w-full pl-14 pr-4 py-4 rounded-full text-lg focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* Title and result count */}
        {searchTerm && (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Results for "{searchTerm}"
              </h2>
            </div>
            {data && (
              <div className="flex items-center gap-4">
                <p className="text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm">
                  📚 {data.totalResults?.toLocaleString()} books found
                </p>
                <p className="text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm">
                  Page {currentPage}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Empty State - No search yet */}
        {!searchTerm && (
          <div className="text-center py-32">
            <div className="text-8xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Start Searching
            </h3>
            <p className="text-gray-600 text-lg">
              Enter a search term above to find books
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && searchTerm && (
          <div className="flex flex-col justify-center items-center py-32">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mb-4"></div>
            <p className="text-gray-600 text-lg">Searching for "{searchTerm}"...</p>
          </div>
        )}

        {/* Error State */}
        {isError && searchTerm && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4"></div>
            <p className="text-red-500 text-xl mb-2">Oops! Something went wrong</p>
            <p className="text-gray-600 mb-6">{error.message}</p>
            <button
              className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Books Grid */}
        {!isLoading && !isError && data && data.books.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
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

            {/* Pagination Controls */}
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-2 flex-wrap justify-center">
                {/* Previous Button */}
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-purple-600 hover:bg-purple-50 shadow-md hover:shadow-lg"
                  }`}
                >
                  <ChevronLeft size={20} />
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-2">
                  {getPageNumbers().map((pageNum, index) => (
                    <button
                      key={index}
                      onClick={() => typeof pageNum === "number" && handlePageClick(pageNum)}
                      disabled={pageNum === "..."}
                      className={`min-w-[40px] h-10 rounded-lg font-medium transition-all duration-300 ${
                        pageNum === currentPage
                          ? "bg-purple-600 text-white shadow-lg scale-110"
                          : pageNum === "..."
                          ? "bg-transparent text-gray-400 cursor-default"
                          : "bg-white text-gray-700 hover:bg-purple-50 shadow-md hover:shadow-lg"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNextPage}
                  disabled={!data || currentPage >= Math.ceil(data.totalResults / 20)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    !data || currentPage >= Math.ceil(data.totalResults / 20)
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-purple-600 hover:bg-purple-50 shadow-md hover:shadow-lg"
                  }`}
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Page Info */}
              <p className="text-gray-600 text-sm">
                Showing page {currentPage} of {Math.ceil((data?.totalResults || 0) / 20)}
              </p>
            </div>
          </>
        )}

        {/* No Results */}
        {!isLoading && !isError && data && data.books.length === 0 && searchTerm && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-gray-700 text-xl mb-2">
              No books found for "{searchTerm}"
            </p>
            <p className="text-gray-500 mb-6">Try a different search term</p>
            <button
              onClick={() => {
                setQuery("");
                setSearchTerm("");
              }}
              className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Clear Search
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchPage;