import React from 'react'
import Home from "./pages/Home" 
import { Route, Routes } from 'react-router-dom'
import BookDetail from './pages/BookDetail'
import Shelf from './pages/Shelf'

const App = () => {
  return (
    
      <Routes>
        <Route path='/' element={<Home/>} />
        {/* Change this to match your navigation path */}
        <Route path="/book/:id" element={<BookDetail/>} />
        <Route path='/shelf' element={<Shelf/>}/>
      </Routes>
  )
}

export default App