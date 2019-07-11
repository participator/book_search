let API = window.Books.API;

describe("getPageStartIndex method", function() {
    it("not given anything", function() {
        const startIndex = API.getPageStartIndex();
        expect(startIndex).toBe(0);
    })
    
    it("not given a number", function() {
        const startIndex = API.getPageStartIndex('');
        expect(startIndex).toBe(0);
    })
    
    it("given a negative number", function() {
        const startIndex = API.getPageStartIndex(-2019);
        expect(startIndex).toBe(0);
    })

    it("given a positive number", function() {
        const startIndex = API.getPageStartIndex(10);
        const expected = (10 * 10) - 1;
        expect(startIndex).toBe(expected);
    })
    
})

describe("createBooksAPIURL method", function() {
    it("not given anything, return undefined", function() {
        const booksAPIURL = API.createBooksAPIURL();
        expect(booksAPIURL).toBe(undefined);
    })

    describe("not given expected data", function() {
        let parameters;

        it("userQuery is undefined, return undefined", function() {
            parameters = [undefined, 'akdjalj', 0];
            const booksAPIURL = API.createBooksAPIURL(...parameters);
            expect(booksAPIURL).toBe(undefined);
        })

        it("API_KEY is undefined, return undefined", function() {
            parameters = ['book search', undefined, 0];
            const booksAPIURL = API.createBooksAPIURL(...parameters);
            expect(booksAPIURL).toBe(undefined);
        })

        it("pageStartIndex is less than 0, return undefined", function() {
            parameters = ['book search', undefined, 0];
            const booksAPIURL = API.createBooksAPIURL(...parameters);
            expect(booksAPIURL).toBe(undefined);
        })
        
    })

    describe("given expected data", function() {
        let parameters,
        booksAPIURL;

        beforeEach(function() {
            parameters = ['book search', 'akdjalj', 0];
            booksAPIURL = API.createBooksAPIURL(...parameters);
        })

        it("replace query parameter's spaces with '+'", function() {
            expected = "q=book+search&";
            expect(booksAPIURL.includes(expected)).toBe(true);
        })

        it("return correct url", function() {
            expected = 'https://www.googleapis.com/books/v1/volumes?q=book+search&printType=books&startIndex=0&key=akdjalj';
            expect(booksAPIURL).toBe(expected);
        })
    })
})

describe("parseBooks method", function() {
    it("not given anything, return undefined", function() {
        const parseBooks = API.parseBooks();
        expect(parseBooks).toBe(undefined);
    })

    it("given an object without items property defined, return undefined", function() {
        const mockJsonData = { title: "" };
        const parseBooks = API.parseBooks(mockJsonData);
        
        expect(parseBooks).toBe(undefined);
    })

    it("given an object without items property as an Array, return undefined", function() {
        const mockJsonData = { items: "" };
        const parseBooks = API.parseBooks(mockJsonData);
        
        expect(parseBooks).toBe(undefined);
    })

    it("given object with items property as an Array, returns items property", function() {
        const mockJsonData = {
            items: [
                {
                    volumeInfo: {
                        authors: 'Book Author',
                        description: 'Book Description',
                        imageLinks: {
                            thumbnail: 'Book Image'
                        },
                        publisher: 'Book Publisher',
                        title: 'Book Title',
                        infoLink: 'www.books.google.com'
                    },
                    volumeInfo: {
                        authors: 'Book Author',
                        description: 'Book Description',
                        imageLinks: {
                            thumbnail: 'Book Image'
                        },
                        publisher: 'Book Publisher',
                        title: 'Book Title',
                        infoLink: 'www.books.google.com'
                    }
                }
            ]
        };

        const books =  [
            {
                volumeInfo: {
                    authors: 'Book Author',
                    description: 'Book Description',
                    imageLinks: {
                        thumbnail: 'Book Image'
                    },
                    publisher: 'Book Publisher',
                    title: 'Book Title',
                    infoLink: 'www.books.google.com'
                },
                volumeInfo: {
                    authors: 'Book Author',
                    description: 'Book Description',
                    imageLinks: {
                        thumbnail: 'Book Image'
                    },
                    publisher: 'Book Publisher',
                    title: 'Book Title',
                    infoLink: 'www.books.google.com'
                }
            }
        ]

        const parsedBooks = API.parseBooks(mockJsonData);
        expect(parsedBooks).toEqual(books);
    })
})

describe("createBookObjects method", function() {
    it("not given anything, return undefined", function() {
        const bookObjects = API.createBookObjects();
        expect(bookObjects).toBe(undefined);
    })
    it("not given an Array, return undefined", function() {
        const bookObjects = API.createBookObjects('');
        expect(bookObjects).toBe(undefined);
    })
    it("given an empty Array, return an empty Array", function() {
        const bookObjects = API.createBookObjects([]);
        expect(bookObjects.length).toEqual(0);
    })
    
    describe("given array of expected data", function() {
        let mockBookData = [
            {
                authors: 'Book Author',
                description: null,
                title: null,
                publishingCompany: null,
                image: null,
                moreInfoLink: null
            },
            {
                authors: 'Book Author',
                description: 'Book Description',
                imageLinks: {
                    thumbnail: 'Book Image'
                },
                publisher: 'Book Publisher',
                title: 'Book Title',
                infoLink: 'www.books.google.com'

            }
        ];

        it("return an object with children count matching the array length", function() {
            const bookObjects = API.createBookObjects(mockBookData);
            expect(bookObjects.length).toBe(2);
        })
    })
})

describe("createBookObject method", function () {

    it("volumeInfo is undefined, return undefined", function() {
        let bookObject = API.createBookObject();
        expect(bookObject).toBe(undefined);
    })
    
    it("volumeInfo is an empty object, return undefined", function() {
        const mockVolumeInfo = {};

        let bookObject = API.createBookObject(mockVolumeInfo);
        expect(bookObject).toEqual(undefined);
    })
    
    it("volumeInfo is has a defined property, return bookObject with a property with data and the other are null", function() {
        const mockVolumeInfo = {
            authors: 'Book Author'
        };
        const expectedBookObj = {
            authors: 'Book Author',
            description: null,
            title: null,
            publishingCompany: null,
            image: null,
            moreInfoLink: null
        };

        let bookObject = API.createBookObject(mockVolumeInfo);
        expect(bookObject).toEqual(expectedBookObj);
    })
    
    it("volumeInfo has expected data, return a bookObject with data", function() {

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

        const Book = API.createBookObject(mockBookVolumeInfo);
        expect(Book).toEqual(bookObj);
    });
})