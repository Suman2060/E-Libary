// bookAPI.js - Updated with pagination support

const BASE_URL = "https://openlibrary.org";

export const searchBooks = async (query, page = 1) => {
  try {
    const limit = 20; // Books per page
    const offset = (page - 1) * limit;
    
    const response = await fetch(
      `${BASE_URL}/search.json?q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    const data = await response.json();

    const books = data.docs.map((book) => ({
      key: book.key,
      title: book.title,
      author: book.author_name?.[0] || "Unknown Author",
      coverImage: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : "/placeholder-book.png", // Fallback image
      firstPublishYear: book.first_publish_year,
      isbn: book.isbn?.[0],
      subjects: book.subject?.slice(0, 3) || [],
    }));

    return {
      books,
      totalResults: data.numFound || 0,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const getBookDetails = async (bookKey) => {
  try {
    const response = await fetch(`${BASE_URL}${bookKey}.json`);

    if (!response.ok) {
      throw new Error("Failed to fetch book details");
    }

    const data = await response.json();

    return {
      key: data.key,
      title: data.title,
      description:
        typeof data.description === "string"
          ? data.description
          : data.description?.value || "No description available",
      authors: data.authors || [],
      subjects: data.subjects || [],
      covers: data.covers || [],
    };
  } catch (error) {
    console.error("Error fetching book details:", error);
    throw error;
  }
};