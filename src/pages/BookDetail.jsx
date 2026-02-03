import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../Components/Navbar";
import { useShelf } from "../context/ShelfContext";
import { getBookDetails } from "../services/bookAPI";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { shelf, addToShelf, removeFromShelf } = useShelf();

  const bookKey = `/works/${id}`;

  // Fetch book details using React Query
  const { data: book, isLoading, isError, error } = useQuery({
    queryKey: ["book", bookKey],
    queryFn: () => getBookDetails(bookKey),
  });

  // Check if this book is already in shelf
  const isBookInShelf = shelf.some((b) => b.key === bookKey);

  // Add or remove from shelf
  const handleToggleShelf = () => {
    if (isBookInShelf) {
      removeFromShelf(bookKey);
    } else {
      addToShelf({ ...book, key: bookKey });
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
        </div>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto text-center py-20 px-6">
          <h1 className="text-4xl font-bold text-red-500 mb-4">Error</h1>
          <p className="text-lg text-gray-600 mb-6">{error.message}</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // Success State - show book details
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mb-4 text-blue-600 hover:underline flex items-center gap-1"
          >
            ← Back
          </button>

          <h1 className="text-4xl font-bold mb-6 text-gray-800 border-b pb-4">
            {book.title}
          </h1>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Cover Image */}
            <div className="md:w-1/3">
              {book.coverUrl ? (
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full rounded-lg shadow-md"
                />
              ) : (
                <div className="w-full aspect-[2/3] bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-6xl">📚</span>
                </div>
              )}
            </div>

            {/* Book Info */}
            <div className="md:w-2/3">
              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  Description
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {book.description}
                </p>
              </div>

              {/* Subjects */}
              {book.subjects && book.subjects.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-700 mb-2">
                    Subjects
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {book.subjects.slice(0, 8).map((subject, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="mt-8 pt-6 border-t flex flex-wrap gap-3">
                <button
                  onClick={handleToggleShelf}
                  className={`px-6 py-2 rounded-lg font-medium transition ${
                    isBookInShelf
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-amber-300 text-black hover:bg-amber-400"
                  }`}
                >
                  {isBookInShelf ? "Remove from Shelf" : "Add to Shelf"}
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Return to Home
                </button>
              </div>

              {/* Book ID */}
              <p className="text-sm text-gray-400 mt-6">
                Book ID:{" "}
                <span className="font-mono bg-gray-100 p-1 rounded">
                  {bookKey}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetail;