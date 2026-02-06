import React from "react";
import { Heart, Eye, Calendar, User } from "lucide-react";

const BookCard = ({ book, isSaved, onToggleSave, onViewDetail }) => {
  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
      {/* Book Cover */}
      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/200x300?text=No+Cover";
          }}
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <button
              onClick={onViewDetail}
              className="w-full flex items-center justify-center gap-2 bg-white text-gray-900 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              <Eye size={18} />
              View Details
            </button>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={onToggleSave}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 z-10"
        >
          <Heart
            size={20}
            className={`${
              isSaved
                ? "fill-red-500 text-red-500"
                : "text-gray-600 hover:text-red-500"
            } transition-colors duration-200`}
          />
        </button>

        {/* Year Badge */}
        {book.firstPublishYear && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            {book.firstPublishYear}
          </div>
        )}
      </div>

      {/* Book Info */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
          {book.title}
        </h3>

        {/* Author */}
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <User size={16} />
          <p className="text-sm line-clamp-1">{book.author}</p>
        </div>

        {/* Subjects/Tags */}
        {book.subjects && book.subjects.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {book.subjects.slice(0, 2).map((subject, index) => (
              <span
                key={index}
                className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
              >
                {subject}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-3 border-t border-gray-100">
          <button
            onClick={onViewDetail}
            className="flex-1 bg-blue-50 text-blue-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors duration-200"
          >
            Details
          </button>
          <button
            onClick={onToggleSave}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${
              isSaved
                ? "bg-red-50 text-red-700 hover:bg-red-100"
                : "bg-gray-50 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {isSaved ? "Saved" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;