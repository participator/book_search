(function() {
    
    // Parent Namespace
    if (!window.Books) {
        const Books = {};
        window.Books = Books;
    }
    
    // Dependencies
    if (!Books.Common) throw new Error('Unable to load Books.Common module');
    const Common = Books.Common;

    if (!Books.API) throw new Error('Unable to load Books.API module');
    const API = Books.API;

    // Namespace
    if (Books && Books.UI) throw new Error('Collision when trying to load Books.UI module');
    const UI = {};
    Books.UI = UI;

    UI.moveLogoToPageTop = (logoElement) => {
        logoElement.classList.add('logoMove');
    }

    UI.getUserInput = (inputElement) => {
        if (!inputElement ||
            !inputElement instanceof HTMLElement) 
            return;
        return inputElement.value;
    }

    UI.isSearchFormUserInputValid = (userInput) => {
        if (!userInput) return;
        const searchFormRegExValidation = /^[\S][\s\w\$\*\.:!@#&,'"]*$/g;
        return Common.isUserInputValid(searchFormRegExValidation, userInput);
    }

    UI.unhideThenHideInvalidUserInputMessageAfterXms = (invalidUserInputMessageElement, hideAferXms) => {
        UI.unhideInvalidUserInputMessage(invalidUserInputMessageElement);

        setTimeout(function() {
            UI.hideInvalidUserInputMessage(invalidUserInputMessageElement);
        }, hideAferXms);
    }

    UI.unhideInvalidUserInputMessage = (invalidUserInputMessageElement) => {
        invalidUserInputMessageElement.classList.remove('hideVisibility');
    }

    UI.hideInvalidUserInputMessage = (invalidUserInputMessageElement) => {
        invalidUserInputMessageElement.classList.add('hideVisibility');
    }

    UI.searchBooksOnFormSubmitEvent = (API_KEY, userInput, currentPageNumber) => {
       return API.getBooksAPIJsonData(API_KEY, userInput, currentPageNumber)
       .then(jsonBookData => API.parseBooks(jsonBookData))
       .then(parsedBooks => API.createBookObjects(parsedBooks))
    }

    UI.searchBooksOnScrollEvent = (API_KEY, userInput, currentPageNumber) => {
        return API.getBooksAPIJsonData(API_KEY, userInput, currentPageNumber)
        .then(jsonBookData => API.parseBooks(jsonBookData))
        .then(parsedBooks => API.createBookObjects(parsedBooks));
    }

    UI.clearBooks = (contentElement) => {
        contentElement.innerHTML = "";
    }

    UI.displayBooks = (contentElement, books) => {
        let fragmentElement = document.createDocumentFragment();
        books.forEach(book => {
            fragmentElement.appendChild(UI.createBookElement(book));
        })

        contentElement.appendChild(fragmentElement);
    }

    UI.changeSearchFormState = (footerElement, searchToggleElement) => {
        if (searchToggleElement.dataset.collapsed === "true") {
            UI.expandSearchForm(footerElement, searchToggleElement);
        }
        else {
            UI.collapseSearchForm(footerElement, searchToggleElement);
        }
    }

    UI.expandSearchForm = (footerElement, searchToggleElement) => {
        UI.showExpandStateForFooterElement(footerElement);
        UI.showExpandStateForSearchToggleElement(searchToggleElement);
    }

    UI.collapseSearchForm = (footerElement, searchToggleElement) => {
        UI.showCollapseStateForFooterElement(footerElement);
        UI.showCollapseStateForSearchToggleElement(searchToggleElement);
    }
    
    UI.showExpandStateForFooterElement = (footerElement) => {
        footerElement.classList.remove('footer--collapsed');
    }

    UI.showExpandStateForSearchToggleElement = (searchToggleElement) => {
        searchToggleElement.dataset.collapsed = false;
        searchToggleElement.classList.remove('search_toggle--collapsed');
        searchToggleElement.innerText = 'Collapse Search';
    }
    
    UI.showCollapseStateForFooterElement = (footerElement) => {
        footerElement.classList.add('footer--collapsed');
    }
    
    UI.showCollapseStateForSearchToggleElement = (searchToggleElement) => {
        searchToggleElement.dataset.collapsed = true;
        searchToggleElement.classList.add('search_toggle--collapsed');
        searchToggleElement.innerText = 'Expand Search';
    }

    UI.createBookElement = (book) => {
        if (!book || book.isEmpty()) return;

        const bookElements = {
            authorElement: UI.createBookAuthorElementAndAppendContent('p', book.authors),
            descriptionElement: UI.createBookTextElementAndAppendContent('p', book.description),
            imageElement: UI.createBookImageElement(book.image, book.title, "Image"),
            moreInfoLinkElement: UI.createBookLinkElement(book.moreInfoLink, 'More Information', 'No more information'),
            publishingCompanyElement: UI.createBookTextElementAndAppendContent('p', book.publishingCompany),
            titleElement: UI.createBookTextElementAndAppendContent('h2', book.title),
        }
        
        if (!bookElements || bookElements.isEmpty()) return;
        
        const bookElement = UI.createBookContainerElement(bookElements);

        return bookElement;
    }

    UI.createBookAuthorElementAndAppendContent = (type, content) => {
        if (!content || !Array.isArray(content)) return;
        return UI.createBookTextElementAndAppendContent(type, content.join(', '));
    }

    UI.createBookTextElementAndAppendContent = (type, content) => {
        if (!type || !content) return;

        const element = document.createElement(type);
        element.append(content);

        return element;
    }

    UI.createBookImageElement = (url, description, textAppendedAtEndOfDescription, pageUrl) =>{
        if (!url || !description) return;

        const imageElement = document.createElement('img');
        imageElement.alt = description + " " + textAppendedAtEndOfDescription;
        imageElement.classList.add('book_image');
        
        let urlValidated;

        try {
            urlValidated = Common.validateUrl(url);
        } catch (error) {
            return;
        }

        let httpsUrl = Common.replaceHttpWithHttpsBasedWhenPageUrlIsHttp(urlValidated, pageUrl);

        const encodedUrl = Common.encodeUrl(httpsUrl || urlValidated) || "";
        
        imageElement.src = encodedUrl;
        return imageElement;
    }

    UI.createBookLinkElement = (url, successfulInnerText, failureInnerText, pageUrl) => {
        if (!url) return;

        const linkElement = document.createElement('a');
        
        let urlValidated;
        try {
            urlValidated = Common.validateUrl(url);
            linkElement.innerText = successfulInnerText;
        }
        catch {
            linkElement.innerText = failureInnerText;
        }

        let httpsUrl = Common.replaceHttpWithHttpsBasedWhenPageUrlIsHttp(urlValidated, pageUrl);

        const encodedUrl = Common.encodeUrl(httpsUrl || urlValidated) || "";
        if (encodedUrl) {
            linkElement.href = encodedUrl;
        }
        linkElement.target = "_blank";
        linkElement.rel = "noopener";

        return linkElement;
    }

    UI.createBookContainerElement = (bookElements = {authorElement, descriptionElement, imageElement, moreInfoLinkElement, publishingCompanyElement, titleElement} = {}) => {
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
            const bookDetailsElement = UI.createBookDetailsElement(detailsElements);
            bookContainerElement.appendChild(bookDetailsElement);
        }

        return bookContainerElement;
    }

    UI.createBookDetailsElement = (detailsElements = {authorElement, descriptionElement, moreInfoLinkElement, publishingCompanyElement, titleElement} = {}) => {
        if (!detailsElements || detailsElements.isEmpty()) return;

        const bookDetailsElement = document.createElement('div');
        bookDetailsElement.classList.add('book_details');
       
        var  {authorElement, publishingCompanyElement, titleElement} = {...detailsElements};
        const bookDetailsFrontElements = {authorElement, publishingCompanyElement, titleElement};
        const detailsElementFront = UI.createBookDetailsFrontContainerElement(bookDetailsFrontElements);
        
        if (detailsElementFront) {
            bookDetailsElement.appendChild(detailsElementFront);
        }
        
        const {descriptionElement, moreInfoLinkElement} = {...detailsElements};
        const bookDetailsBackElements = {descriptionElement, moreInfoLinkElement};
        const detailsElementBack = UI.createBookDetailsBackContainerElement(bookDetailsBackElements);
        
        if (detailsElementBack) {
            bookDetailsElement.appendChild(detailsElementBack);
        }

        return bookDetailsElement;
    }

    UI.createBookDetailsFrontContainerElement = (frontElements = {authorElement, publishingCompanyElement, titleElement} = {}) => {
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

    UI.createBookDetailsBackContainerElement = (backElements = {descriptionElement, moreInfoLinkElement} = {}) => {
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

})()