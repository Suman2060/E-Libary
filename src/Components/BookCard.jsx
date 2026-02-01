import React from "react"
import { useNavigate } from "react-router-dom"

const BookCard = ({ book, onSave, onRemove, isSaved }) => { // Removed onViewDetail from props
  const navigate = useNavigate()

  const handleViewDetail = () => {
    console.log("Navigating book is:", book.key, "type:", typeof book.key)
    navigate(`/book/${book.key}`)
  }

  return (
    <div className="bg-gray-100 hover:bg-amber-100 text-xl cursor-pointer border-2 rounded-lg border-blue-200 flex flex-col items-center p-4">

      <h3 className="font-semibold text-center">{book.title}</h3>

      <img
        src={
          book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : "https://via.placeholder.com/150?text=No+Cover"
        }
        alt={book.title}
        className="w-1/2 my-3"
      />

      <p className="text-gray-700">
        {book.author_name ? book.author_name[0] : "Unknown Author"}
      </p>

      {/* FIXED: Remove onViewDetail call, just use navigate directly */}
      <button
        className="mt-2 text-blue-600 hover:text-amber-400"
        onClick={handleViewDetail} // Changed this line
      >
        View Detail
      </button>

      {isSaved ? (
        <button
          className="bg-red-500 text-white px-4 py-1 rounded mt-2"
          onClick={() => onRemove(book.key)} // Changed from book.id to book.key for consistency
        >
          Remove
        </button>
      ) : (
        <button
          className="bg-green-500 text-white px-4 py-1 rounded mt-2"
          onClick={() => onSave(book)}
        >
          Save to shelf
        </button>
      )}
    </div>
  )
}

export default BookCard