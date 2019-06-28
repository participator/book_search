(function() {

    const Books = {};
    window.Books = Books;

    Books.moveLogoToPageTop = (logoElement) => {
        logoElement.classList.add('logoMove');
    }

    Books.searchBooksOnFormSubmitEvent = (API_KEY, userInput, currentPageNumber) => {
       return Books.getBooksAPIJsonData(API_KEY, userInput, currentPageNumber)
       .then(jsonBookData => Books.parseBooks(jsonBookData))
       .then(parsedBooks => Books.createBookObjects(parsedBooks))
    }

    Books.searchBooksOnScrollEvent = (API_KEY, userInput, currentPageNumber) => {
        return Books.getBooksAPIJsonData(API_KEY, userInput, currentPageNumber)
        .then(jsonBookData => Books.parseBooks(jsonBookData))
        .then(parsedBooks => Books.createBookObjects(parsedBooks));
    }

    Books.getUserInput = (inputElement) => {
        return inputElement.value;
    }

    Books.isSearchFormUserInputValid = (userInput) => {
        const searchFormRegExValidation = /^[\S][\s\w\$\*\.:!@#&,'"]*$/g;
        return Books.isUserInputValid(searchFormRegExValidation, userInput);
    }

    Books.isUserInputValid = (regexPatternToMatch, userInput) => {
        return regexPatternToMatch.test(userInput);
    }

    Books.unhideThenHideInvalidUserInputMessageAfterXms = (invalidUserInputMessageElement, hideAferXms) => {
        Books.unhideInvalidUserInputMessage(invalidUserInputMessageElement);
        setTimeout(function() {
            Books.hideInvalidUserInputMessage(invalidUserInputMessageElement);
        }, hideAferXms);
    }

    Books.unhideInvalidUserInputMessage = (invalidUserInputMessageElement) => {
        invalidUserInputMessageElement.classList.remove('hideVisibility');
    }

    Books.hideInvalidUserInputMessage = (invalidUserInputMessageElement) => {
        invalidUserInputMessageElement.classList.add('hideVisibility');
    }

    Books.getBooksAPIJsonData = (API_KEY, userQuery, currentPageNumber) => {
        const pageStartIndex = Books.getPageStartIndex(currentPageNumber);
        const booksUrl = Books.createBooksAPIURL(userQuery, API_KEY, pageStartIndex);

        return Books.getAPIJsonData(booksUrl);
    }

    Books.getAPIKey = () => {
        return 'AIzaSyC8YoC2vugrIsUpfieEtNGwdhUDHR8WKQ0';
    }

    Books.getPageStartIndex = (currentPageNumber) => {
        const startIndex = currentPageNumber <= 0 ? 0 : (currentPageNumber * 10) - 1;
        return startIndex;
    }

    Books.createBooksAPIURL = (userQuery, API_KEY, pageStartIndex) => {
        const booksAPIURL = `https://www.googleapis.com/books/v1/volumes?q=${userQuery.trim().replace(/\s/g, '+')}&printType=books&startIndex=${pageStartIndex}&key=${API_KEY}`;
        return booksAPIURL;
    }

    Books.getAPIJsonData = (url) => {
        return fetch(url, {
            method: 'get',
        }).then(response => response.json());
    }

    Books.parseBooks = (jsonData) => {
        const parsedJsonBooks = jsonData.items;
        return parsedJsonBooks;
    }

    Books.createBookObjects = (booksData) => {
        return booksData.map(book => {
            return Books.createBookObject(book.volumeInfo);
        });
    }
    
    Books.createBookObject = (volumeInfo) => {
        if ( !volumeInfo ) return;

        const bookObject = {
            authors: volumeInfo.authors || null,
            description: volumeInfo.description || null,
            title: volumeInfo.title || null,
            publishingCompany: volumeInfo.publisher || null,
            image: volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail || null,
            moreInfoLink: volumeInfo.infoLink || null
        }

        return bookObject;
    }

    Books.clearBooks = (contentElement) => {
        contentElement.innerHTML = "";
    }

    Books.displayBooks = (contentElement, books) => {
        let fragmentElement = document.createDocumentFragment();
        books.forEach(book => {
            fragmentElement.appendChild(Books.createBookElement(book));
        })
        contentElement.appendChild(fragmentElement);
    }

    Books.createBookElement = (book) => {
        const bookElements = {
            authorElement: Books.createBookTextElementAndAppendContent('p', book.authors),
            descriptionElement: Books.createBookTextElementAndAppendContent('p', book.description),
            imageElement: Books.createBookImageElement(book.image, book.title),
            moreInfoLinkElement: Books.createBookLinkElement(book.moreInfoLink, 'More Information', 'No more information'),
            publishingCompanyElement: Books.createBookTextElementAndAppendContent('p', book.publishingCompany),
            titleElement: Books.createBookTextElementAndAppendContent('h2', book.title),
        }
        
        const bookElement = Books.createBookContainerElement(bookElements);

        return bookElement;
    }

    Books.createBookTextElementAndAppendContent = (type, content) => {
        if (!content) return null;

        const element = document.createElement(type);
        element.append(content);

        return element;
    }

    Books.createBookImageElement = (src, altText) =>{
        if (!src) return null;

        const imageElement = document.createElement('img');
        imageElement.alt = altText + ' Image';
        imageElement.classList.add('book_image');
        imageElement.src = window.location.href.startsWith('https') ? src.replace('http', 'https') : src;
        return imageElement;
    }

    Books.createBookLinkElement = (url, successfulInnerText, failureInnerText) => {
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

    Books.createBookContainerElement = ({authorElement, descriptionElement, imageElement, moreInfoLinkElement, publishingCompanyElement, titleElement} = {}) => {
        const bookContainerElement = document.createElement('div');
        bookContainerElement.classList.add('book');
        
        if (imageElement && imageElement instanceof HTMLElement) {
            bookContainerElement.appendChild(imageElement);
        }

        const bookDetailsElement = Books.createBookDetailsElement({authorElement, descriptionElement, moreInfoLinkElement, publishingCompanyElement, titleElement});
        bookContainerElement.appendChild(bookDetailsElement);

        return bookContainerElement;
    }

    Books.createBookDetailsElement = ({authorElement, descriptionElement, moreInfoLinkElement, publishingCompanyElement, titleElement} = {}) => {
        const bookDetailsElement = document.createElement('div');
        bookDetailsElement.classList.add('book_details');        

        const detailsElementFront = Books.createBookDetailsFrontContainerElement({authorElement, publishingCompanyElement, titleElement});
        bookDetailsElement.appendChild(detailsElementFront);

        const detailsElementBack = Books.createBookDetailsBackContainerElement({descriptionElement, moreInfoLinkElement});
        bookDetailsElement.appendChild(detailsElementBack);

        return bookDetailsElement;
    }

    Books.createBookDetailsFrontContainerElement = ({authorElement, publishingCompanyElement, titleElement} = {}) => {
        const detailsFrontContainerElement = document.createElement('div');
        detailsFrontContainerElement.classList.add('book_details_front');

        if (titleElement && titleElement instanceof HTMLElement) {
            detailsFrontContainerElement.appendChild(titleElement);
        }

        if (authorElement && authorElement instanceof HTMLElement) {
            detailsFrontContainerElement.appendChild(authorElement);
        }
        
        if (publishingCompanyElement && publishingCompanyElement instanceof HTMLElement) {
            detailsFrontContainerElement.appendChild(publishingCompanyElement);
        }

        return detailsFrontContainerElement;
    }

    Books.createBookDetailsBackContainerElement = ({descriptionElement, moreInfoLinkElement} = {}) => {
        const detailsBackContainerElement = document.createElement('div');
        detailsBackContainerElement.classList.add('book_details_back');

        if (descriptionElement && descriptionElement instanceof HTMLElement) {
            descriptionElement.classList.add('book_details_back_description');
            detailsBackContainerElement.appendChild(descriptionElement);
        }

        if (moreInfoLinkElement && moreInfoLinkElement instanceof HTMLElement) {
            detailsBackContainerElement.appendChild(moreInfoLinkElement);
        }

        return detailsBackContainerElement;
    }

    Books.changeSearchFormState = (footerElement, searchToggleElement) => {
        if (searchToggleElement.dataset.collapsed === "true") {
            Books.expandSearchForm(footerElement, searchToggleElement);
        }
        else {
            Books.collapseSearchForm(footerElement, searchToggleElement);
        }
    }

    Books.expandSearchForm = (footerElement, searchToggleElement) => {
        if (footerElement && footerElement instanceof HTMLElement) {
            Books.showExpandStateForFooterElement(footerElement);
        }
        if (searchToggleElement && searchToggleElement instanceof HTMLElement) {
            Books.showExpandStateForSearchToggleElement(searchToggleElement);
        }
    }

    Books.collapseSearchForm = (footerElement, searchToggleElement) => {
        if (footerElement && footerElement instanceof HTMLElement) {
            Books.showCollapseStateForFooterElement(footerElement);
        }
        if (searchToggleElement && searchToggleElement instanceof HTMLElement) {
            Books.showCollapseStateForSearchToggleElement(searchToggleElement);
        }
    }

    Books.showExpandStateForSearchToggleElement = (searchToggleElement) => {
        if (searchToggleElement && searchToggleElement instanceof HTMLElement === false) return;
        searchToggleElement.dataset.collapsed = false;
        searchToggleElement.classList.remove('search_toggle--collapsed');
        searchToggleElement.innerText = 'Collapse Search';
    }
    
    Books.showExpandStateForFooterElement = (footerElement) => {
        if (footerElement && footerElement instanceof HTMLElement === false) return;
        footerElement.classList.remove('footer--collapsed');
    }
    
    Books.showCollapseStateForSearchToggleElement = (searchToggleElement) => {
        if (searchToggleElement && searchToggleElement instanceof HTMLElement === false) return;
        searchToggleElement.dataset.collapsed = true;
        searchToggleElement.classList.add('search_toggle--collapsed');
        searchToggleElement.innerText = 'Expand Search';
    }
    
    Books.showCollapseStateForFooterElement = (footerElement) => {
        if (footerElement instanceof HTMLElement === false) return;
        footerElement.classList.add('footer--collapsed');
    }

})()