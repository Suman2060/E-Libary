import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import Shelf from "./pages/Shelf";
import BookDetail from "./pages/BookDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/shelf" element={<Shelf />} />
      <Route path="/book/:bookKey" element={<BookDetail />} />
    </Routes>
  );
}

export default App;