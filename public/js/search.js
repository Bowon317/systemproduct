function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value;
    window.location.href = `/products/search?q=${encodeURIComponent(searchTerm)}`;
}
