import React from "react";

const BookModal = ({ book, onClose }) => {
  if (!book) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <button style={closeBtn} onClick={onClose}>✖</button>

        <h2>{book.title}</h2>

        <img
          src={
            book.cover_i
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
              : "https://via.placeholder.com/150?text=No+Cover"
          }
          alt={book.title}
          style={{ width: "100%" }}
        />

        <p>
          <b>Author:</b> {book.author_name?.[0] || "Unknown"}
        </p>

        <p>
          <b>First Published:</b> {book.first_publish_year || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default BookModal;

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding:"20px",
  zIndex: 1000,
};

const modalStyle = {
  background: "#fff",
  padding: "20px",
  width: "100%",
  maxWidth: "500px",     
  maxHeight: "80vh",     
  overflowY: "auto",     
  borderRadius: "10px",
  position: "relative",
  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
};


const closeBtn = {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "transparent",
  border: "none",
  fontSize: "18px",
  cursor: "pointer",
};

