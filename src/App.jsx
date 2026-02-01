import React from 'react'
import Home from "./pages/Home" 
import { Route, Routes } from 'react-router-dom'
import BookDetail from './pages/BookDetail'

const App = () => {
  return (
    
      <Routes>
        <Route path='/' element={<Home/>} />
        {/* Change this to match your navigation path */}
        <Route path="/book/:id" element={<BookDetail/>} />
      </Routes>
  )
}

export default App