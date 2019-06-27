describe("createBookObject", function () {
    let Books;

    beforeEach(function() {
        Books = window.Books;
    });
    
    it("Return a bookObject with data when given volumeInfo with data", function() {

        const mockBookVolumeInfo = {
            authors: 'Book Author',
            description: 'Book Description',
            imageLinks: {
                thumbnail: 'Book Image'
            },
            publisher: 'Book Publisher',
            title: 'Book Title',
            infoLink: 'www.books.google.com'
        };
    
        const bookObj = {
            authors: 'Book Author',
            description: 'Book Description',
            image: 'Book Image',
            publishingCompany: 'Book Publisher',
            title: 'Book Title',
            moreInfoLink: 'www.books.google.com'
        }

        const Book = Books.createBookObject(mockBookVolumeInfo);
        expect(Book).toEqual(bookObj);
    });

    it("Returns bookObject with null properties when given an empty object", function() {
        const mockBookVolumeInfo = {};
    
        const bookObj = {
            authors: null,
            description: null,
            image: null,
            publishingCompany: null,
            title: null,
            moreInfoLink: null
        }

        const Book = Books.createBookObject(mockBookVolumeInfo);
        expect(Book).toEqual(bookObj);
    });

    it("Returns undefined when given undefined", function() {
        let mockBookVolumeInfo;

        const Book = Books.createBookObject(mockBookVolumeInfo);
        expect(Book).toBe(undefined);
    });
})

describe("collapseSearchForm", function() {
    let Books,
    footerElement,
    searchToggleElement;

    beforeEach(function() {
        Books = window.Books;
        footerElement = document.createElement('footer');
        searchToggleElement = document.createElement('button');
    })

    it("Sets searchToggleElement's dataset.collapsed attribute to true", function() {
        Books.collapseSearchForm = (footerElement, searchToggleElement);
        expect(searchToggleElement.dataset.collapsed).toBe("true");
    })

    it("Adds search_toggle--collapsed class to searchToggleElement", function() {
        Books.collapseSearchForm = (footerElement, searchToggleElement);
        expect(searchToggleElement.classList.contains('search_toggle--collapsed')).toBe(true);
    })

    it("Sets innerText of searchToggleElement to 'Expand Search'", function() {
        Books.collapseSearchForm = (footerElement, searchToggleElement);
        expect(searchToggleElement.innerText).toBe('Expand Search');
    })


})