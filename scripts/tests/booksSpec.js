describe('Testing Functionality', function () {
    let App,
    bookData,
    bookObj;

    beforeEach(function() {
        App = window.App;

        mockBookVolumeInfo = {
            authors: 'Book Author',
            description: 'Book Description',
            imageLinks: {
                thumbnail: 'Book Image'
            },
            publisher: 'Book Publisher',
            title: 'Book Title',
            infoLink: 'www.books.google.com'
        };
    
        bookObj = {
            authors: 'Book Author',
            description: 'Book Description',
            image: 'Book Image',
            publishingCompany: 'Book Publisher',
            title: 'Book Title',
            moreInfoLink: 'www.books.google.com'
        }
    });
    
    it("creates a Book Object", function () {
        const Book = Books.createBookObject(mockBookVolumeInfo);
        expect(Book).toEqual(bookObj);
    });
})