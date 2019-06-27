(function() {

    if (!window.Books) throw new Error('Unable to load Book package');

    const BooksController = {};
    window.BooksController = BooksController;

    let API_KEY,
    contentElement,
    currentPageNumber = 0,
    userInput;

    window.onload = () => {
        const searchForm = document.forms.bookSearch;

        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            // Initalize Page
            const logoElement = document.querySelector('.logo');
            Books.moveLogoToPageTop(logoElement);

            API_KEY = Books.getAPIKey();
            const inputElement = document.forms.bookSearch.elements.query;
            userInput = Books.getUserInput(inputElement);

            // Prepare Page for New Data
            window.scrollTo(0,0);
            currentPageNumber = 0;

            if (!Books.isSearchFormUserInputValid(userInput)) {
                invalidUserInputMessageElement = document.querySelector('.search_form_invalidMessage');
                Books.unhideThenHideInvalidUserInputMessageAfterXms(invalidUserInputMessageElement, 3000);
                return;
            }

            contentElement = document.querySelector('.content');
            Books.searchBooksOnFormSubmitEvent(API_KEY, userInput, currentPageNumber).then(bookObjects => {
                Books.clearBooks(contentElement);
                Books.displayBooks(contentElement, bookObjects);
            });
        });

        const searchToggleElement = document.querySelector('.search_toggle');
        const footerElement = document.querySelector('footer');
        searchToggleElement.addEventListener('click', event => {
            Books.changeSearchFormState(footerElement, searchToggleElement);
        });
    }

    let isScrollEventActive = false;
    window.onscroll = () => {
        if ( (window.innerHeight + window.scrollY) >= document.body.offsetHeight && !isScrollEventActive) {
            
            isScrollEventActive = true;
            currentPageNumber++;

            if (!Books.isSearchFormUserInputValid(userInput)) {
                invalidUserInputMessageElement = document.querySelector('.search_form_invalidMessage');
                Books.unhideThenHideInvalidUserInputMessageAfterXms(invalidUserInputMessageElement, 3000);
                return;
            }
            
            Books.searchBooksOnScrollEvent(API_KEY, userInput, currentPageNumber).then(books => {
                Books.displayBooks(contentElement, books);
                isScrollEventActive = false;
            });
        }
    }
    
})()