(function() {

    const exports = {};
    window.App = exports;

    window.onload = () => {
        const searchForm = document.forms.bookSearch;
        searchForm.addEventListener('submit', exports.searchBooksOnFormSubmitEvent);

        const searchToggle = document.querySelector('.search_toggle');
        searchToggle.addEventListener('click', exports.changeFormState);
    }


    let page = 0;
    let isActive = false;
    window.onscroll = (event) => {
        if ( (window.innerHeight + window.scrollY) >= document.body.offsetHeight && !isActive) {
            
            page++;
            isActive = true;
            exports.searchBooksOnScrollEvent(event.target.bookSearch.elements.query);
        }
    }

    exports.searchBooksOnFormSubmitEvent = (event) => {
        event.preventDefault();
        window.scrollTo(0,0);
        page = 0;
        const logo = document.querySelector('.logo');
        logo.classList.add('logoMove');

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
            isActive = false;
        });
    }

    exports.getUserInput = (inputElement) => {
        return inputElement.value;
    }

    exports.isValidUserInput = (userInput) => {
        const validInputRegEx = /^[\S][\s\w\$\*\.:!@#&,'"]*$/g;        
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
        const API_KEY = 'AIzaSyC8YoC2vugrIsUpfieEtNGwdhUDHR8WKQ0';
        const startIndex = page <= 0 ? 0 : (page * 10) - 1;
        // TODO: Make query accept users query
        const booksAPIURL = `https://www.googleapis.com/books/v1/volumes?q=${userQuery.replace(/\s/g, '+')}&printType=books&startIndex=${startIndex}&key=${API_KEY}`;
        
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
            authors: volume.authors || null,
            description: volume.description || null,
            title: volume.title || null,
            publishingCompany: volume.publisher || null,
            image: volume.imageLinks && volume.imageLinks.thumbnail || null,
            moreInfoLink: volume.infoLink || null
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
            author: exports.createBookTextElementAndAppendContent('p', book.authors),
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

        const bookDetailsElement = exports.createBookDetailsElement({author, description, moreInfoLink, publishingCompany, title});
        bookContainerElement.appendChild(bookDetailsElement);

        return bookContainerElement;
    }

    exports.createBookDetailsElement = ({author, description, moreInfoLink, publishingCompany, title}) => {
        const bookDetailsElement = document.createElement('div');
        bookDetailsElement.classList.add('book_details');        

        const detailsElementFront = exports.createBookDetailsFrontContainerElement({author, publishingCompany, title});
        bookDetailsElement.appendChild(detailsElementFront);

        const detailsElementBack = exports.createBookDetailsBackContainerElement({description, moreInfoLink});
        bookDetailsElement.appendChild(detailsElementBack);

        return bookDetailsElement;
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
            description.classList.add('book_details_back_description');
            detailsContainerElement.appendChild(description);
        }

        if (moreInfoLink) {
            detailsContainerElement.appendChild(moreInfoLink);
        }

        return detailsContainerElement;
    }

    exports.changeFormState = (event) => {
        const searchToggle = event.target;
        const footer = document.querySelector('footer');

        if (searchToggle.dataset.collapsed == "true") {
            searchToggle.dataset.collapsed = false;
            searchToggle.classList.remove('search_toggle--collapsed');
            searchToggle.innerText = 'Collapse Search';
            footer.classList.remove('footer--collapse');
        }
        else {
            searchToggle.dataset.collapsed = true;
            searchToggle.innerText = 'Expand Search';
            searchToggle.classList.add('search_toggle--collapsed');
            footer.classList.add('footer--collapse');
        }
    }

})()