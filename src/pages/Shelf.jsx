import React from "react";
import Navbar from "../Components/Navbar";
import BookCard from "../Components/BookCard";
import { useShelf } from "../context/ShelfContext";

const Shelf = () => {
  const { shelf, removeFromShelf } = useShelf();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">My Shelf</h1>
        {/* {shelf.length>0 && (<button
        onClick={clearShelf}
        className="text-3xl bg-red-600 text-amber-100 border rounded-2xl"
        >CLear Shelf</button>)} */}

        {shelf.length === 0 ? (
          <p className="text-gray-500">Your shelf is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {shelf.map((book) => (
              <BookCard
                key={book.key}
                book={book}
                isSaved={true}
                onRemove={() => removeFromShelf(book.key)}
                onViewDetail={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shelf;
