(function() {

    if (window.Books) throw new Error('Unable to load Books package');

    // Parent Namespace
    let Books = {};
    window.Books = Books;

    // Dependencies
    let UI;

    let API_KEY,
    contentElement,
    currentPageNumber = 0,
    userInput;

    window.onload = () => {
        UI = Books.UI;
        API_KEY = Books.API.getAPIKey();
        const searchForm = document.forms.bookSearch;

        searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            // Initalize Page
            const logoElement = document.querySelector('.logo');
            UI.moveLogoToPageTop(logoElement);

            const inputElement = document.forms.bookSearch.elements.query;
            userInput = UI.getUserInput(inputElement);

            // Prepare Page for New Data
            window.scrollTo(0,0);
            currentPageNumber = 0;

            if (!UI.isSearchFormUserInputValid(userInput)) {
                invalidUserInputMessageElement = document.querySelector('.search_form_invalidMessage');
                UI.unhideThenHideInvalidUserInputMessageAfterXms(invalidUserInputMessageElement, 3000);
                return;
            }

            contentElement = document.querySelector('.content');
            UI.searchBooksOnFormSubmitEvent(API_KEY, userInput, currentPageNumber).then(bookObjects => {
                UI.clearBooks(contentElement);
                UI.displayBooks(contentElement, bookObjects);
            });
        });

        const searchToggleElement = document.querySelector('.search_toggle');
        const footerElement = document.querySelector('footer');
        searchToggleElement.addEventListener('click', () => {
            UI.changeSearchFormState(footerElement, searchToggleElement);
        });
    }

    let isScrollEventActive = false;
    window.onscroll = () => {
        if ( (window.innerHeight + window.scrollY) >= document.body.offsetHeight && !isScrollEventActive) {
            
            isScrollEventActive = true;
            currentPageNumber++;

            if (!UI.isSearchFormUserInputValid(userInput)) {
                invalidUserInputMessageElement = document.querySelector('.search_form_invalidMessage');
                UI.unhideThenHideInvalidUserInputMessageAfterXms(invalidUserInputMessageElement, 3000);
                return;
            }
            
            UI.searchBooksOnScrollEvent(API_KEY, userInput, currentPageNumber).then(books => {
                UI.displayBooks(contentElement, books);
                isScrollEventActive = false;
            });
        }
    }
    
})()