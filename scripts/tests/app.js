(function() {
    if (!window.App) throw new Error('Failure to load App library');

    window.onload = function() {
        describe('Create a book', function() {
            const bookData = {
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
        
            const bookObj = {
                author: 'Book Author',
                description: 'Book Description',
                image: 'Book Image',
                publishingCompany: 'Book Publisher',
                title: 'Book Title',
                moreInfoLink: 'www.google.com'
            }
        
            it("element", function() {
                const Book = App.createBook(bookData);
                expect(Book).toBe(bookObj);
            })
        })
    };
})();