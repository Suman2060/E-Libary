import React from 'react'

const Navbar = ({query,setQuery,onSearch,shelf}) => {
  return (
    <nav style={{display:"flex",justifyContent:"space-between",padding:"1rem",background:"#eee"}}>
        {/* left side of table */}
        <h1>Welcome to Book Libary </h1>
        {/* this is for search Section */}
        <div>
            <input type='text' placeholder='Search Books..' value={query} onChange={(e)=>setQuery(e.target.value)}/>
            {/* <button onClick={onSearch}>Search</button> */}
        </div>

        {/* this is for saved shelf where we can see user saved book */}
        <div>
            <button>
                My shelf({shelf.length})
            </button>
        </div>
    </nav>
    
  )
}

export default Navbar
