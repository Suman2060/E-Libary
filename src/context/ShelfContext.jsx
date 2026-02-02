import { createContext, useContext, useEffect, useState } from "react";

const ShelfContext = createContext(null);

export const ShelfProvider = ({ children }) => {
  const [shelf, setShelf] = useState(() => {
  const savedShelf=localStorage.getItem('bookShelf') 
  return savedShelf ? JSON.parse(savedShelf) : []     
  }
)

// Save to localStorage
useEffect(()=>{
    localStorage.setItem('bookShelf',JSON.stringify(shelf))
},[shelf])

  const addToShelf = (book) => {
    setShelf((prev) => {
      if (prev.some((b) => b.key === book.key)) return prev;
      return [...prev, book];
    });
  };

  const removeFromShelf = (bookKey) => {
    setShelf((prev) => prev.filter((b) => b.key !== bookKey));
  };

  return (
    <ShelfContext.Provider value={{ shelf, addToShelf, removeFromShelf }}>
      {children}
    </ShelfContext.Provider>
  );
};

export const useShelf = () => {
  const context = useContext(ShelfContext);
  if (!context) {
    throw new Error("useShelf must be used inside ShelfProvider");
  }
  return context;
};
