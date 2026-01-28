import React from 'react'


const Navbar = ({query,setQuery,shelf}) => {
  return (
    <nav style={{display:"flex",justifyContent:"space-between",padding:"1rem",background:"#eee"}}>
        {/* left side of table */}
        <h1>Welcome to Book Libary </h1>
        {/* this is for search Section */}
        <div >
            <input
                type="text"
                placeholder="Search books..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                    width: "280px",
                    height: "40px",
                    padding: "0 12px",
                    fontSize: "16px",
                    border: "1px solid #462b7c",
                    borderRadius: "6px",
                    outline: "none",
                }}
            />
            
        </div>

        {/* this is for saved shelf where we can see user saved book */}
        <div>
            <button style={{
                    width: "150px",
                    height: "40px",
                    padding: "0 12px",
                    fontSize: "18px",
                    border: "1px solid #462b7c",
                    borderRadius: "6px",
                    outline: "none"}}> 
                My shelf({shelf.length})
            </button>
        </div>
    </nav>
    
  )
}

export default Navbar
