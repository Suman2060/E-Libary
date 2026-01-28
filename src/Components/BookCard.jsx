import React from 'react'

const BookCard = ({book, onViewDetail, onSave, onRemove, isSaved}) => {
  return (
    <div style={{border:"1px solid #ccc",padding:"10px"}}>
        <h3>{book.title}</h3>
        <img src={book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`

        : "https://via.placeholder.com/150?text=No+Cover"} 
        
        alt={book.title}
        style={{width:"50%"}}
        />
        <p>{book.author_name? book.author_name[0]: "Unknown Author"}</p>

        {/* view detail button */}
        <button onClick={() => onViewDetail(book)}>View Detail</button>

        {/* save and remove buttom */}
        {isSaved ?(
            <button onClick={() => onRemove(book.key)}>Remove</button>
        ):(
            <button onClick={() => onSave(book)}>Save to shelf</button>
        )}

        
    </div>
  )
}

export default BookCard
