document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('bookForm');
    const bookList = document.getElementById('bookList');

    // API URL'si
    const API_URL = 'http://127.0.0.1:5000/books';

    // Kitapları yükle ve göster
    function loadBooks() {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                bookList.innerHTML = '';
                data.forEach(book => {
                    const bookItem = document.createElement('li');
                    bookItem.className = 'book-item';
                    bookItem.innerHTML = `
                        <span>${book.title} by ${book.author} (${book.published})</span>
                        <button onclick="deleteBook(${book.id})">Delete</button>
                        <button onclick="editBook(${book.id})">Edit</button>
                    `;
                    bookList.appendChild(bookItem);
                });
            });
    }

    // Kitap ekle
    bookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newBook = {
            title: document.getElementById('title').value,
            author: document.getElementById('author').value,
            published: document.getElementById('published').value
        };

        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        })
        .then(response => response.json())
        .then(() => {
            bookForm.reset();
            loadBooks();
        });
    });

    // Kitap sil
    window.deleteBook = function(id) {
        fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        })
        .then(() => loadBooks());
    };

    // Kitap düzenle
    window.editBook = function(id) {
        const title = prompt("New Title:");
        const author = prompt("New Author:");
        const published = prompt("New Published Year:");

        const updatedBook = {
            title: title,
            author: author,
            published: published
        };

        fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBook)
        })
        .then(response => response.json())
        .then(() => loadBooks());
    };

    // İlk yüklemede kitapları göster
    loadBooks();
});
