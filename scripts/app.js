(function() {

    const exports = {};
    window.App = exports;

    window.onload = function() {
        const searchForm = document.forms.bookSearch;
        searchForm.addEventListener('submit', exports.searchBooks);
    }    

    exports.searchBooks = (event) => {
        event.preventDefault();
        const userInput = exports.getUserInput(event.target.elements.query);

        if (!exports.isValidUserInput(userInput)) {
            exports.displayInvalidUserInputMessage();
            return;
        }
        
        exports.callBooksAPI(userInput).then(jsonData => {
            return exports.parseBooks(jsonData);
        }).then(books => {
            exports.displayBooks(books);
        });
    }

    exports.getUserInput = (inputElement) => {
        return inputElement.value;
    }

    exports.isValidUserInput = (userInput) => {
        const validInputRegEx = /^[\w\$\*\.:!@#&,][\s\w\$\*\.:!@#&,]*$/g;        
        return validInputRegEx.test(userInput);
    }

    exports.displayInvalidUserInputMessage = () => {
        const invalidUserInputMessage = document.querySelector('.search_form_invalidMessage');
        invalidUserInputMessage.classList.remove('hideVisibility');

        setTimeout(function() {
            invalidUserInputMessage.classList.add('hideVisibility');
        }, 3000);
    }

    exports.callBooksAPI = (userQuery) => {
        // TODO: Make query accept users query
        const booksAPIURL = 'https://www.googleapis.com/books/v1/volumes?q=harry+potter';
        
        return fetch(booksAPIURL, {
            method: 'get',
        }).then(response => response.json());
    }

    exports.parseBooks = (jsonData) => {
        const parsedJsonBooks = jsonData.items;

        books = parsedJsonBooks.map(jsonBook => {
            return exports.createBook(jsonBook);            
        })

        return books;
    }
    
    exports.createBook = (jsonBook) => {
        const volume = jsonBook.volumeInfo;
        const Book = {
            author: volume.authors,
            description: volume.description,
            title: volume.title,
            publishingCompany: volume.publisher,
            image: volume.imageLinks.thumbnail,
            moreInfoLink: volume.infoLink
        }

        return Book;
    }

    exports.displayBooks = (books) => {
        const content = document.querySelector('.content');

        books.forEach(book => {
            content.appendChild(exports.createBookElement(book));
        })
    }

    exports.createBookElement = (book) => {
        const bookElements = {
            title: exports.createBookTextElementAndAppendContent('h2', book.title),
            author: exports.createBookTextElementAndAppendContent('p', book.author.join(', ')),
            publishingCompany: exports.createBookTextElementAndAppendContent('p', book.publishingCompany),
            bookImage: exports.createBookImageElement(book.image, book.title)
        }
        
        const container = exports.createBookContainerElement(bookElements);

        return container;
    }

    exports.createBookTextElementAndAppendContent = (type, content) => {
        if (!content) return null;

        const element = document.createElement(type);
        element.append(content);

        return element;
    }

    exports.createBookImageElement = (src, altText) =>{
        const imageElement = document.createElement('img');
        imageElement.src = src;
        imageElement.alt = altText + ' Image';
        return imageElement;
    }

    exports.createBookContainerElement = ({author, bookImage, publishingCompany, title}) => {
        const bookContainerElement = document.createElement('div');
        bookContainerElement.classList.add('book');
        
        if (bookImage) {
            bookContainerElement.appendChild(bookImage);
        }

        if (title) {
            bookContainerElement.appendChild(title);
        }

        if (author) {
            bookContainerElement.appendChild(author);
        }
        
        if (publishingCompany) {
            bookContainerElement.appendChild(publishingCompany);
        }

        return bookContainerElement;
    }

})()