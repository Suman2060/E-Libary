import React from 'react'


const Navbar = ({query,setQuery,shelf}) => {
  return (
    <nav className='w-full border-b bg-white'>
       <div className='max-w 7xl mx-auto px-6 h-16 flex items-center justify-between'>
        {/* Left: Title */}
        <h1 className='text-2xl font-bold text-blue'>
            Book Libary
        </h1>
        {/* RIght side for search bar and shelf */}
        <div className='flex items-center gap-4 '>
            {/* search */}
            <input 
                type='text'
                placeholder='Search Books...'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className='hidden md:block w-72 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-300'
            />
            {/* for Shelf buttom */}
            <button className='px-4 py-2 text-sm font-medium border border-black bg-amber-300 rounded-md hover:bg-amber-400 transition'>
                My Shelf({shelf.length})
            </button>
        </div>
       </div>
    </nav>
    
  )
}

export default Navbar
