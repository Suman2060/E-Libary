import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import dummyBooks from '../data/dummyBooks'
import Navbar from '../Components/Navbar'

const BookDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  // Debug logs
  console.log(`Book detail -recived id ${id}`)
  console.log(`Type of id - ${typeof id}`)


  // Find the book this compare the id from url and key
  const book = dummyBooks.find((b) => b.key == id)

  console.log("Found book:", book)
  //  this is related with if book is not found
  useEffect(() => {
    if (!book) {
      console.log("Book is not found, available books:", dummyBooks.map(b => b.key))
      const timer = setTimeout(() => {
        navigate('/')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [book, navigate])

  if (!book) {
    return (
      <div className='min-h-screen bg-gray-50 py-10 p-6'>
        <div className='max-w-2xl mx-auto text-center'>
          <h1 className='text-red font-bold text-center text-4xl'>Book not Found</h1>
          <p className='text-xl text-center font-bold'>Sorry, We can't find your book</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
        >
          Return to Home
        </button>
      </div>

    )
  }
  return (
    <>
    <Navbar/>
    <div className='min-h-screen bg-gray-50 py-10'>
      <div className='p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg'>
        <h1 className='text-4xl font-bold mb-6 text-gray-800 border-b pb-4'>{book.title}</h1>

        <div className='flex flex-col md:flex-row gap-8'>
          <div className='md:w-1/3'>
            <img
              src={
                book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                  : "https://via.placeholder.com/300x450?text=No+Cover+Available"
              }
              alt={book.title}
              className='w-full rounded-lg shadow-md'
            />
          </div>

          <div className='md:w-2/3'>
            <div className='mb-6'>
              <h2 className='text-xl font-semibold text-gray-700 mb-2'>Author</h2>
              <p className='text-lg text-gray-800'>
                {book.author_name ? book.author_name[0] : "Unknown Author"}
              </p>
            </div>

            <div className='mb-6'>
              <h2 className='text-xl font-semibold text-gray-700 mb-2'>Description</h2>
              <p className='text-lg text-gray-700 leading-relaxed'>
                {book.description || "No description available for this book."}
              </p>
            </div>

            <div className='mt-8 pt-6 border-t'>
              <p className='text-sm text-gray-500'>
                Book ID: <span className='font-mono bg-gray-100 p-1 rounded'>{book.key}</span>
              </p>
            <button
                onClick={() => navigate('/')}
                className=' m-1.5 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
              >
                Return to Home
           </button>
           <button 
           onClick={()=>onSave(book)}
           className='m-1.5 px-6 py-2 bg-amber-300 rounded-lg hover:bg-amber-400 transition-colors'
           >
            Add to Shelf</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default BookDetail