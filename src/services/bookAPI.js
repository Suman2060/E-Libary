const BASE_URL = 'https://openlibrary.org';

export const searchBooks = async (query, page = 1, limit = 20) => {
    if (!query || query.trim() === '') {
        return { books: [], numFound: 0 }
    }

    const response = await fetch(
        `${BASE_URL}/search.json?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
    )
    if (!response.ok) {
        throw new Error('Failed to fetch Books.');
    }

    const data = await response.json()

    // this transform data to usable format
    return {
        books: data.docs.map(book => ({
            key: book.key,
            title: book.title || 'UnTitled',
            author: book.author_name?.[0] || "Unknown Author",
            authors: book.author_name || ["Unknown author"],
            coverUrl: book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : null,
            firstPublishYear: book.first_publish_year || null,
            isbn: book.isbn?.[0],
            publisher: book.publisher?.[0],

        })),
        totalResults: data.numFound,
    }
}


export const getBookDetails = async (bookKey) => {
    const response = await fetch(`${BASE_URL}${bookKey}.json`);

    if (!response.ok) {
        throw new Error('Failed to fetch books details')
    }

    const data = await response.json()
    console.log("Raw book detail Response", data)

    return {
        key: data.key,
        title: data.title || 'Untitled',
        description: typeof data.description === 'string' ? data.description : data.description?.value || 'No description available',
        subjects: data.subjects || [],
        covers: data.covers || [],
        coverUrl: data.covers?.[0] ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg` : null,
    }



}