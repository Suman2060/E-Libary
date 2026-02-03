import React from "react";

const BookCard = ({ book, isSaved, onToggleSave, onViewDetail }) => {
  // Add this to debug
  console.log("BookCard props:", { isSaved, onToggleSave, onViewDetail });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      {/* Cover Image */}
      <div
        className="h-64 bg-gray-200 flex items-center justify-center cursor-pointer"
        onClick={onViewDetail}
      >
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <span className="text-6xl">📚</span>
            <span className="text-gray-400 text-sm mt-2">No Cover</span>
          </div>
        )}
      </div>

      {/* Book Info */}
      <div className="p-4">
        <h3
          className="font-semibold text-lg mb-1 line-clamp-2 cursor-pointer hover:text-blue-600"
          onClick={onViewDetail}
        >
          {book.title}
        </h3>

        <p className="text-gray-500 text-sm mb-1">
          {book.author || "Unknown Author"}
        </p>

        {book.firstPublishYear && (
          <p className="text-gray-400 text-xs mb-3">
            Published: {book.firstPublishYear}
          </p>
        )}

        {/* This is the ONLY button — uses onToggleSave */}
        <button
          onClick={() => {
            console.log("Button clicked! isSaved:", isSaved);
            onToggleSave();                                     
          }}
          className={`w-full py-2 rounded-md font-medium transition ${
            isSaved
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-amber-300 text-black hover:bg-amber-400"
          }`}
        >
          {isSaved ? "Remove from Shelf" : "Add to Shelf"}
        </button>
      </div>
    </div>
  );
};

export default BookCard;