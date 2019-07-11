(function() {

    // Parent Namespace
    if (!window.Books) {
        const Books = {};
        window.Books = Books;
    }
    
    // Namespace
    if (Books && Books.API) throw new Error('Collision when trying to load Books.API module');
    const API = {};
    Books.API = API;

    API.getAPIKey = () => {
        return 'AIzaSyC8YoC2vugrIsUpfieEtNGwdhUDHR8WKQ0';
    }

    API.getBooksAPIJsonData = (API_KEY, userQuery, currentPageNumber) => {
        const pageStartIndex = API.getPageStartIndex(currentPageNumber);
        const booksUrl = API.createBooksAPIURL(userQuery, API_KEY, pageStartIndex);

        return API.getAPIJsonData(booksUrl);
    }

    API.getPageStartIndex = (currentPageNumber) => {
        const startIndex = isNaN(currentPageNumber) || currentPageNumber <= 0 ? 0 : (currentPageNumber * 10) - 1;
        return startIndex;
    }

    API.createBooksAPIURL = (userQuery, API_KEY, pageStartIndex) => {
        if (!userQuery ||
            !API_KEY ||
            pageStartIndex < 0)
            return;

        const APIHost = "www.googleapis.com";
        const APIPath = "books/v1/volumes"
        const APIParameterQ = `q=${userQuery && userQuery.trim().replace(/\s/g, '+')}`;
        const APIParameterPrintType = "printType=books";
        const APIParameterStartIndex = `startIndex=${pageStartIndex}`;
        const APIParameterAPIKey = `key=${API_KEY}`;
        
        const booksAPIURL = `https://${APIHost}/${APIPath}?${APIParameterQ}&${APIParameterPrintType}&${APIParameterStartIndex}&${APIParameterAPIKey}`;
        return booksAPIURL;
    }

    API.getAPIJsonData = (url) => {
        return fetch(url, {
            method: 'get',
        }).then(response => response.json());
    }

    API.parseBooks = (jsonData) => {
        if (!jsonData ||
            jsonData.isEmpty() ||
            !jsonData.items ||
            !Array.isArray(jsonData.items)) return;

        const parsedJsonBooks = jsonData.items;
        return parsedJsonBooks;
    }

    API.createBookObjects = (booksData) => {
        if (!Array.isArray(booksData) || !booksData && !booksData.length) return;

        return booksData.map(book => {
            return API.createBookObject(book.volumeInfo);
        });
    }
    
    API.createBookObject = (volumeInfo) => {
        if ( !volumeInfo || volumeInfo.isEmpty() ) return;

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
})()