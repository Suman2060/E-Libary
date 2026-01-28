import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import BookCard from './Components/BookCard'
import BookModal from "./Components/BookModal";

function App() {
  const [query, setQuery] = useState("");
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);

  // usestae hooks for models
  const[selectedBook, setSelectedBook] = useState(null)
  const[bookDetail, setBookDetail] = useState(null)
  const[LoadingDetail, setLoadingDetail] = useState(false)
  




  // Load shelf from localStorage
  const [shelf, setShelf] = useState(() => {
    try {
      const saved = localStorage.getItem("shelf");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Fetch books from API
  const searchBooks = async () => {
    if (!query) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setBook(data.docs);
    } catch (err) {
      console.error("Error fetching books", err);
    } finally {
      setLoading(false);
    }
  };

  // DEBOUNCING LOGIC
  useEffect(() => {
    if (!query || query.length<3) {
      setBook([]);
      return;
    }

    const timer = setTimeout(() => {
      searchBooks();
    }, 500); // debounce delay

    return () => clearTimeout(timer);
  }, [query]);

  // Save shelf to localStorage
  useEffect(() => {
    localStorage.setItem("shelf", JSON.stringify(shelf));
  }, [shelf]);

  const addToShelf = (book) => {
    if (!shelf.some((b) => b.key === book.key)) {
      setShelf([...shelf, book]);
    }
  };

  const removeFromShelf = (bookkey)=>{
    setShelf(shelf.filter((b)=>b.key !==bookkey))
  }
  return (
    <div>
      <Navbar query={query} setQuery={setQuery} shelf={shelf} />
      {/* my self result */}
      <h2 style={{padding:"1rem"}} >My Shelf Books</h2>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"20px",padding:"1rem"}}>
        {shelf.length === 0 && <p>You haven't saved any Books</p>}
        {shelf.map(b =>(
          <BookCard 
            key={b.key}
            book={b}
            onViewDetails={(book)=> setSelectedBook(book)} // this is used for model
            onRemove={removeFromShelf} // this will trigger remove from shelf
            isSaved={true}  
          />
        ))}
      </div>




    {/* this is code for search result */}
    <h2 style={{padding: "1rem"}}>Search result</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          padding: "1rem",
        }}
      >
        {loading && <p>Wait books are being loaded...</p>}

        {!loading &&
          book.map((b) => (
            <BookCard
            key={b.key}
            book={b}
            onViewDetail={(book)=> setSelectedBook(book)}
            onSave={addToShelf}
            isSaved={shelf.some((s) => s.key === b.key)}
            />
          ))}
      </div>
      {/* Model  */}
      {LoadingDetail && <p>Books Detail is loading....</p>}

      {selectedBook && !LoadingDetail &&(
        <BookModal
        book={selectedBook}
        onClose={()=> setSelectedBook(null)}
        />
      )}
    </div>
  );
}

export default App;
