import { fetchBooks } from '../modules/books1';
import { cart, addToCart, removeFromCart, updateCartCount } from '../modules/cart';

const booksContainer = document.querySelector('.books__list');
const categoriesList = document.querySelector('.categories__list');
let category = 'Architecture';
let startIndex = 0;

function createStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    let starsHtml = '';
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<span class="star full">★</span>';
    }
    if (halfStar) {
        starsHtml += '<span class="star half">★</span>';
    }
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<span class="star gray">★</span>';
    }
    return starsHtml;
}

async function loadBooks() {
    const books = await fetchBooks(category, startIndex);
    if (!books) {
        console.error('No books found');
        return;
    }
    books.forEach(book => {
        if (!book.id) {
                console.warn('Book without an id encountered:', book);
                return;
            }
        const bookCard = document.createElement('div');
        bookCard.classList.add('books__book-card');
        bookCard.setAttribute('data-id', book.id);

        const { volumeInfo, saleInfo } = book;
        const title = volumeInfo.title;
        const authors = volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown';
        const thumbnail = volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/150';
        const rating = volumeInfo.averageRating ? volumeInfo.averageRating : 0;
        const ratingText = volumeInfo.ratingsCount ? `${volumeInfo.ratingsCount} review` : 'No reviews';
        const description = volumeInfo.description ? volumeInfo.description.substring(0, 100) + '...' : 'No description available';
        const price = saleInfo.listPrice ? `${saleInfo.listPrice.amount} ${saleInfo.listPrice.currencyCode}` : '';

        const isInCart = cart.some(item => item.id === book.id);
        const buttonText = isInCart ? 'IN THE CART' : 'BUY NOW';

        bookCard.innerHTML = `
            <img src="${thumbnail}" alt="${title}">
            <div class="books__book-info">
                <div class="author">${authors}</div>
                <h3>${title}</h3>
                <div class="rating">${createStarRating(rating)} <span>${ratingText}</span></div>
                <div class="description">${description}</div>
                <div class="price">${price}</div>
                <button class="buy-now ${isInCart ? "in-cart" : ""}" data-id="${book.id}">${buttonText}</button>
            </div>
        `;

        if (isInCart) {
            bookCard.classList.add('in-cart');
        }

        booksContainer.appendChild(bookCard);
    });
}

function clearBooks() {
    booksContainer.innerHTML = '';
}

function updateCategory(newCategory) {
    category = newCategory;
    startIndex = 0;
    clearBooks();
    loadBooks();
}

categoriesList.addEventListener('click', (event) => {
    if (event.target.classList.contains('categories__item')) {
        event.preventDefault();
        updateCategory(event.target.dataset.category);
        document.querySelectorAll('.categories__item').forEach(item => {
            item.classList.remove('active');
        });
        event.target.classList.add('active');
    }
});

document.querySelector('.books__load-more').addEventListener('click', () => {
    startIndex += 6;
    loadBooks();
});

loadBooks();

booksContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('buy-now')) {
        const bookButton = event.target;
        const bookId = bookButton.dataset.id;
        const book = cart.find(item => item.id === bookId);
        if (!book) {
            const newBook = { id: bookId };
            addToCart(newBook);
            bookButton.classList.add('in-cart');
            bookButton.textContent = 'IN THE CART';
        } else {
            removeFromCart(bookId);
            bookButton.classList.remove('in-cart');
            bookButton.textContent = 'BUY NOW';
        }
    }
});

updateCartCount();