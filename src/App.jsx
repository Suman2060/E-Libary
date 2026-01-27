import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";

function App() {
  const [query, setQuery] = useState("");
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);

  // 📦 Load shelf from localStorage
  const [shelf, setShelf] = useState(() => {
    try {
      const saved = localStorage.getItem("shelf");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 🔍 Fetch books from API
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

  // ⏳ DEBOUNCING LOGIC
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

  // 💾 Save shelf to localStorage
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
          <div key={b.key} style ={{border:"1px solid #ccc",padding:"10px"}}>
            <h3>{b.title}</h3>
            <img
            src={b.cover_i ? `https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg` : "https://via.placeholder.com/150?text=No+Cover"}
            alt={b.title}
            style={{width:"50%"}}
            />
            <p>{b.author_name ? b.author_name[0] : "Unknown author"}</p>
            <button onClick={()=> removeFromShelf(b.key)}>Remove</button>
          </div>
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
            <div
              key={b.key}
              style={{ border: "1px solid #ccc", padding: "10px" }}
            >
              <h3>{b.title}</h3>

              <img
                src={
                  b.cover_i
                    ? `https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg`
                    : "https://via.placeholder.com/150?text=No+Cover"
                }
                alt={b.title}
                style={{ width: "50%" }}
              />

              <p>{b.author_name ? b.author_name[0] : "Unknown author"}</p>

              <button
                onClick={() => addToShelf(b)}
                disabled={shelf.some((book) => book.key === b.key)}
              >
                {shelf.some((book) => book.key === b.key)
                  ? "Already Saved"
                  : "Save to My Shelf"}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
