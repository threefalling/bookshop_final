const API_KEY = 'AIzaSyBzaMdIVnOnK6fIv33Ko16iNlxs9tuvlo4';
const API_URL = `https://www.googleapis.com/books/v1/volumes?key=${API_KEY}&printType=books&maxResults=6&langRestrict=en`;

async function fetchBooks(category, startIndex = 0) {
    const response = await fetch(`${API_URL}&q=subject:${category}&startIndex=${startIndex}`);
    if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return [];
    }
    const data = await response.json();
    console.log('Fetched data:', data);
    return data.items || [];
}

export { fetchBooks };
