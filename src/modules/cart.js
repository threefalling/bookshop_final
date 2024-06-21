const cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(book) {
    cart.push(book);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function removeFromCart(bookId) {
    const index = cart.findIndex(item => item.id === bookId);
    if (index > -1) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }
}

function updateCartCount() {
    document.querySelector('.cart-badge').textContent = cart.length;
}

export { cart, addToCart, removeFromCart, updateCartCount };
