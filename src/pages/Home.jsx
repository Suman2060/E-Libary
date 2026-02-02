import React from "react";
import Navbar from "../Components/Navbar";
import BookCard from "../Components/BookCard";
import dummyBooks from "../data/dummyBooks";
import { useShelf } from "../context/ShelfContext";

const Home = () => {
  const { shelf, addToShelf, removeFromShelf } = useShelf();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar query="" setQuery={() => {}} shelf={shelf} />

      {/* Hero Section */}
      <section className="relative w-full h-96 bg-blue-600  flex items-center justify-center text-center text-white hover:bg-gray-200 hover:text-blue-400 font-mono underline-offset-8">
        <div className="px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome To Book Library
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Discover new pages to start your new life
          </p>
        </div>
      </section>

      {/* Featured Books */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Featured Books
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dummyBooks.map((book) => {
            const isSaved = shelf.some((b) => b.key === book.key);

            return (
              <BookCard
                key={book.key}
                book={book}
                isSaved={isSaved}
                onSave={addToShelf}
                onRemove={removeFromShelf}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
