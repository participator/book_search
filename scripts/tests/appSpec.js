describe('Testing Functionality', function () {
    let App,
    bookData,
    bookObj;

    beforeEach(function() {
        App = window.App;

        mockBookData = {
            volumeInfo: {
                authors: 'Book Author',
                description: 'Book Description',
                imageLinks: {
                    thumbnail: 'Book Image'
                },
                publisher: 'Book Publisher',
                title: 'Book Title',
                infoLink: 'www.google.com'
            }
        }
    
        bookObj = {
            authors: 'Book Author',
            description: 'Book Description',
            image: 'Book Image',
            publishingCompany: 'Book Publisher',
            title: 'Book Title',
            moreInfoLink: 'www.google.com'
        }
    });
    
    it("creates a Book Object", function () {
        const Book = App.createBook(mockBookData);
        expect(Book).toEqual(bookObj);
    });
})