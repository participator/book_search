(function() {

    const exports = {};
    window.App = exports;

    let page = 0;

    window.onload = () => {
        const searchForm = document.forms.bookSearch;
        searchForm.addEventListener('submit', exports.searchBooksOnFormSubmitEvent);
    }

    window.onscroll = (event) => {
        if ( (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            
            page++;
            exports.searchBooksOnScrollEvent(event.target.bookSearch.elements.query);
        }
    }

    exports.searchBooksOnFormSubmitEvent = (event) => {
        event.preventDefault();
        window.scrollTo(0,0);

        const userInput = exports.getUserInput(event.target.elements.query);

        if (!exports.isValidUserInput(userInput)) {
            exports.displayInvalidUserInputMessage();
            return;
        }
        
        exports.callBooksAPI(userInput).then(jsonData => {
            return exports.parseBooks(jsonData);
        }).then(books => {
            const contentElement = document.querySelector('.content');

            exports.clearBooks(contentElement);
            exports.displayBooks(contentElement, books);
        });
    }

    exports.searchBooksOnScrollEvent = (inputElement) => {
        const userInput = exports.getUserInput(inputElement);

        if (!exports.isValidUserInput(userInput)) {
            exports.displayInvalidUserInputMessage();
            return;
        }
        
        exports.callBooksAPI(userInput).then(jsonData => {
            return exports.parseBooks(jsonData);
        }).then(books => {
            const contentElement = document.querySelector('.content');

            exports.displayBooks(contentElement, books);
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

    exports.clearBooks = (contentElement) => {
        contentElement.innerHTML = "";
    }

    exports.displayBooks = (contentElement, books) => {
        books.forEach(book => {
            contentElement.appendChild(exports.createBookElement(book));
        })
    }

    exports.createBookElement = (book) => {
        const bookElements = {
            author: exports.createBookTextElementAndAppendContent('p', book.author.join(', ')),
            description: exports.createBookTextElementAndAppendContent('p', book.description),
            image: exports.createBookImageElement(book.image, book.title),
            moreInfoLink: exports.createBookLinkElement(book.moreInfoLink, 'More Information', 'No more information'),
            publishingCompany: exports.createBookTextElementAndAppendContent('p', book.publishingCompany),
            title: exports.createBookTextElementAndAppendContent('h2', book.title),
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
        if (!src) return null;

        const imageElement = document.createElement('img');
        imageElement.alt = altText + ' Image';
        imageElement.classList.add('book_image');
        imageElement.src = src;
        return imageElement;
    }

    exports.createBookLinkElement = (url, successfulInnerText, failureInnerText) => {
        if (!url) return null;

        const linkElement = document.createElement('a');

        try {
            linkElement.href = new URL(url).href;
            linkElement.innerText = successfulInnerText;
            linkElement.target = "_blank";
        }
        catch {
            linkElement.innerText = failureInnerText;
        }

        return linkElement;
    }

    exports.createBookContainerElement = ({author, description, image, moreInfoLink, publishingCompany, title}) => {
        const bookContainerElement = document.createElement('div');
        bookContainerElement.classList.add('book');
        
        if (image) {
            bookContainerElement.appendChild(image);
        }

        const detailsElementFront = exports.createBookDetailsFrontContainerElement({author, publishingCompany, title});
        bookContainerElement.appendChild(detailsElementFront);

        const detailsElementBack = exports.createBookDetailsBackContainerElement({description, moreInfoLink});
        bookContainerElement.appendChild(detailsElementBack);

        return bookContainerElement;
    }

    exports.createBookDetailsFrontContainerElement = ({author, publishingCompany, title}) => {
        const detailsContainerElement = document.createElement('div');
        detailsContainerElement.classList.add('book_details_front');

        if (title) {
            detailsContainerElement.appendChild(title);
        }

        if (author) {
            detailsContainerElement.appendChild(author);
        }
        
        if (publishingCompany) {
            detailsContainerElement.appendChild(publishingCompany);
        }

        return detailsContainerElement;
    }

    exports.createBookDetailsBackContainerElement = ({description, moreInfoLink}) => {
        const detailsContainerElement = document.createElement('div');
        detailsContainerElement.classList.add('book_details_back');

        if (description) {
            detailsContainerElement.appendChild(description);
        }

        if (moreInfoLink) {
            detailsContainerElement.appendChild(moreInfoLink);
        }

        return detailsContainerElement;
    }

})()