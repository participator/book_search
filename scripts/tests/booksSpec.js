describe("createBookObject when", function () {
    let Books;

    beforeEach(function() {
        Books = window.Books;
    });
    
    it("volumenInfo has expected data, it returns a bookObject with data", function() {

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

    it("volumeInfo has unexpected data, it returns bookObject with null properties", function() {
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

    it("volumeInfo is undefined, it returns undefined", function() {
        let mockBookVolumeInfo;

        const Book = Books.createBookObject(mockBookVolumeInfo);
        expect(Book).toBe(undefined);
    });
})

describe("collapseSearchForm method", function() {
    let Books,
    footerElement,
    searchToggleElement;

    beforeEach(function() {
        Books = window.Books;
        footerElement = document.createElement('footer');
        searchToggleElement = document.createElement('button');
    })

    describe("given a HTMLELEMENT for the footerElement parameter", function() {
        it("without class 'footer--collapsed', it adds footer--collapsed class to footerElement", function() {
            Books.collapseSearchForm(footerElement);
            expect(footerElement.classList.contains('footer--collapsed')).toBe(true);
        })
    
        it("with class 'footer--collapsed', it removes footer--collapsed class to footerElement", function() {
            Books.collapseSearchForm(footerElement);
            Books.expandSearchForm(footerElement);
            expect(footerElement.classList.contains('footer--collapsed')).toBe(false);
        })
    })

    describe("given a HTMLElement for the searchToggleElement parameter", function() {
        it("it sets dataset.collapsed attribute to true", function() {
            Books.collapseSearchForm(undefined, searchToggleElement);
            expect(searchToggleElement.dataset.collapsed).toBe("true");
        })
    
        it("it adds search_toggle--collapsed class to searchToggleElement", function() {
            Books.collapseSearchForm(undefined, searchToggleElement);
            expect(searchToggleElement.classList.contains('search_toggle--collapsed')).toBe(true);
        })
    
        it("it sets innerText of searchToggleElement to 'Expand Search'", function() {
            Books.collapseSearchForm(undefined, searchToggleElement);
            expect(searchToggleElement.innerText).toBe('Expand Search');
        })
    })
})

describe('showExpandStateForSearchToggleElement', function() {
    it("given a non-HTMLElement, it does not set searchToggleElement's data.collapsed attribute to false", function() {
        const emptyObject = {}
        Books.showExpandStateForSearchToggleElement(emptyObject)
        expect(emptyObject).toEqual({})
    })

    describe('given a HTMLElement', function() {
        beforeEach(function() {
            searchToggleElement = document.createElement('button');
        })

        it("it sets dataset.collapsed attribute to true", function() {
            Books.collapseSearchForm(undefined, searchToggleElement);
            expect(searchToggleElement.dataset.collapsed).toBe("true");
        })
    
        it("it adds search_toggle--collapsed class to searchToggleElement", function() {
            Books.collapseSearchForm(undefined, searchToggleElement);
            expect(searchToggleElement.classList.contains('search_toggle--collapsed')).toBe(true);
        })
    
        it("it sets innerText of searchToggleElement to 'Expand Search'", function() {
            Books.collapseSearchForm(undefined, searchToggleElement);
            expect(searchToggleElement.innerText).toBe('Expand Search');
        })
    })
})