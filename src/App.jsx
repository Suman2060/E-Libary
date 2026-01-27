import { useState } from "react"
import Navbar from "./Components/Navbar";

function App(){
  const [query,setQuery] =useState("")
  const [shelf,setshelf] =useState([])
  const [book,setBook] =  useState([])
  const [loading,setloading] = useState(false)  


 const searchBooks = async () => {
  if (!query) return; // do nothing if empty

  setloading(true)
  try {
    const res = await fetch(`https://openlibrary.org/search.json?q=${query}`);
    const data = await res.json();
    setBook(data.docs);
  } catch (error) {
    console.error("Error fetching books", error);
  }
  finally {setloading(false)}
};


  return(
    <div>
      <Navbar
      query={query}
      setQuery={setQuery}
      shelf={shelf}
      onSearch={searchBooks}
      />
      <div>
        
      {loading && <p>Wait books are being loaded..</p>}

      
        {!loading && book.map(book =>(
          <div key={book.key}>
            <h3>{book.title}</h3>
            <img
            src={'`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg'}
            alt={book.title}/>
          </div>
        ))}
      </div>
    </div>
  )
}
export default App;