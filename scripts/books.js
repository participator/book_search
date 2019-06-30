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
        if (!book || book.isEmpty()) return;

        const bookElements = {
            authorElement: Books.createBookTextElementAndAppendContent('p', book.authors),
            descriptionElement: Books.createBookTextElementAndAppendContent('p', book.description),
            imageElement: Books.createBookImageElement(book.image, book.title, "Image"),
            moreInfoLinkElement: Books.createBookLinkElement(book.moreInfoLink, 'More Information', 'No more information'),
            publishingCompanyElement: Books.createBookTextElementAndAppendContent('p', book.publishingCompany),
            titleElement: Books.createBookTextElementAndAppendContent('h2', book.title),
        }
        
        if (!bookElements || bookElements.isEmpty()) return;
        
        const bookElement = Books.createBookContainerElement(bookElements);

        return bookElement;
    }

    Books.createBookTextElementAndAppendContent = (type, content) => {
        if (!type || !content) return;

        const element = document.createElement(type);
        element.append(content);

        return element;
    }

    Books.createBookImageElement = (url, description, textAppendedAtEndOfDescription, pageUrl) =>{
        if (!url || !description) return;

        const imageElement = document.createElement('img');
        imageElement.alt = description + " " + textAppendedAtEndOfDescription;
        imageElement.classList.add('book_image');
        
        let urlValidated;

        try {
            urlValidated = Books.validateUrl(url);
        } catch (error) {
            return;
        }

        let httpsUrl = Books.replaceHttpWithHttpsBasedWhenPageUrlIsHttp(urlValidated, pageUrl);

        const encodedUrl = Books.encodeUrl(httpsUrl || urlValidated) || "";
        
        imageElement.src = encodedUrl;
        return imageElement;
    }

    Books.createBookLinkElement = (url, successfulInnerText, failureInnerText, pageUrl) => {
        if (!url) return;

        const linkElement = document.createElement('a');
        
        let urlValidated;
        try {
            urlValidated = Books.validateUrl(url);
            linkElement.innerText = successfulInnerText;
        }
        catch {
            linkElement.innerText = failureInnerText;
        }

        let httpsUrl = Books.replaceHttpWithHttpsBasedWhenPageUrlIsHttp(urlValidated, pageUrl);

        const encodedUrl = Books.encodeUrl(httpsUrl || urlValidated) || "";
        if (encodedUrl) {
            linkElement.href = encodedUrl;
        }
        linkElement.target = "_blank";
        linkElement.rel = "noopener";

        return linkElement;
    }

    Books.replaceHttpWithHttpsBasedWhenPageUrlIsHttp = (url, pageUrl) => {
        if (!url) return;

        let httpsUrl;
        if (pageUrl && pageUrl.startsWith('https:')) {
            httpsUrl = Books.replaceHttpWithHttps(url);
        }
        else if (window.location.href.startsWith('https:')) {
            httpsUrl = Books.replaceHttpWithHttps(url);
        }
        return httpsUrl;
    }

    Books.replaceHttpWithHttps = url => url.replace('http:', 'https:');

    Books.validateUrl = url => new URL(url).href;

    Books.encodeUrl = url => url && encodeURI(url);

    Books.createBookContainerElement = (bookElements = {authorElement, descriptionElement, imageElement, moreInfoLinkElement, publishingCompanyElement, titleElement} = {}) => {
        if (!bookElements || bookElements.isEmpty()) return;

        const bookContainerElement = document.createElement('div');
        bookContainerElement.classList.add('book');
        
        const {imageElement} = {...bookElements}
        if (imageElement && imageElement instanceof HTMLElement) {
            bookContainerElement.appendChild(imageElement);
        }

        const {authorElement, descriptionElement, moreInfoLinkElement, publishingCompanyElement, titleElement} = {...bookElements};
        const detailsElements = {authorElement, descriptionElement, moreInfoLinkElement, publishingCompanyElement, titleElement};
        
        if (!detailsElements.isEmpty()) {
            const bookDetailsElement = Books.createBookDetailsElement(detailsElements);
            bookContainerElement.appendChild(bookDetailsElement);
        }

        return bookContainerElement;
    }

    Books.createBookDetailsElement = (detailsElements = {authorElement, descriptionElement, moreInfoLinkElement, publishingCompanyElement, titleElement} = {}) => {
        if (!detailsElements || detailsElements.isEmpty()) return;

        const bookDetailsElement = document.createElement('div');
        bookDetailsElement.classList.add('book_details');
       
        var  {authorElement, publishingCompanyElement, titleElement} = {...detailsElements};
        const bookDetailsFrontElements = {authorElement, publishingCompanyElement, titleElement};
        const detailsElementFront = Books.createBookDetailsFrontContainerElement(bookDetailsFrontElements);
        
        if (detailsElementFront) {
            bookDetailsElement.appendChild(detailsElementFront);
        }
        
        const {descriptionElement, moreInfoLinkElement} = {...detailsElements};
        const bookDetailsBackElements = {descriptionElement, moreInfoLinkElement};
        const detailsElementBack = Books.createBookDetailsBackContainerElement(bookDetailsBackElements);
        
        if (detailsElementBack) {
            bookDetailsElement.appendChild(detailsElementBack);
        }

        return bookDetailsElement;
    }

    Books.createBookDetailsFrontContainerElement = (frontElements = {authorElement, publishingCompanyElement, titleElement} = {}) => {
        if (!frontElements || frontElements.isEmpty()) return;

        const detailsFrontContainerElement = document.createElement('div');
        detailsFrontContainerElement.classList.add('book_details_front');

        const {titleElement} = {...frontElements};
        if (titleElement && titleElement instanceof HTMLElement) {
            detailsFrontContainerElement.appendChild(titleElement);
        }

        const {authorElement} = {...frontElements};
        if (authorElement && authorElement instanceof HTMLElement) {
            detailsFrontContainerElement.appendChild(authorElement);
        }
        
        const {publishingCompanyElement} = {...frontElements};
        if (publishingCompanyElement && publishingCompanyElement instanceof HTMLElement) {
            detailsFrontContainerElement.appendChild(publishingCompanyElement);
        }

        return detailsFrontContainerElement;
    }

    Books.createBookDetailsBackContainerElement = (backElements = {descriptionElement, moreInfoLinkElement} = {}) => {
        if (!backElements || backElements.isEmpty()) return;

        const detailsBackContainerElement = document.createElement('div');
        detailsBackContainerElement.classList.add('book_details_back');

        const {descriptionElement} = {...backElements};
        if (descriptionElement && descriptionElement instanceof HTMLElement) {
            descriptionElement.classList.add('book_details_back_description');
            detailsBackContainerElement.appendChild(descriptionElement);
        }

        const {moreInfoLinkElement} = {...backElements};
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

    Object.prototype.isEmpty = function() {
        for(var prop in this) {
            if (this.hasOwnProperty(prop) && prop !== undefined && prop !== null) {
                return false;
            }
        }
        return true;
    }

})()