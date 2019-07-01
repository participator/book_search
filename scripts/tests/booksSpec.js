describe("moveLogoToPageTop method", function() {
    it("given an HTMLElement, add class 'logoMove'", function() {
        const element = document.createElement('div');
        Books.moveLogoToPageTop(element);
        expect(element.classList.contains('logoMove')).toBe(true);
    })
})

describe("getUserInput method", function() {
    it("not given anything, return undefined", function() {
        const userInput = Books.getUserInput();
        expect(userInput).toBe(undefined);
    })

    it("not given a HTMLInputElement, return undefined", function() {
        const inputElement = '';
        const userInput = Books.getUserInput(inputElement);
        expect(userInput).toBe(undefined);
    })

    it("given a HTMLInputElement, return text of element", function() {
        const text = 'inside no more';
        const inputElement = document.createElement('input');
        inputElement.value = text;
        const userInput = Books.getUserInput(inputElement);

        expect(userInput).toBe(text);
    })
    
})

describe("isSearchFormUserInputValid method", function() {
    it('not given anything return undefined', function() {
        const isValid = Books.isSearchFormUserInputValid();
        expect(isValid).toBe(undefined);
    })

    it('not given valid input, return false', function() {
        const input = ' 12321312';
        const isValid = Books.isSearchFormUserInputValid(input);
        expect(isValid).toBe(false);
    })

    it('given valid input, return true', function() {
        const input = 'a12321312';
        const isValid = Books.isSearchFormUserInputValid(input);
        expect(isValid).toBe(true);
    })
})

describe("isUserInputValid method", function() {

    it("not given anything, return undefined", function () {
        const isUserInputValid = Books.isUserInputValid();
        expect(isUserInputValid).toBe(undefined);
    })

    it("not given a RegEx type, return undefined", function () {
        let regexPatternToMatch = '',
            userInput = '';

        const isUserInputValid = Books.isUserInputValid(regexPatternToMatch, userInput);
        expect(isUserInputValid).toBe(undefined);
    })

    it("not given userInput, return undefined", function () {
        let regexPatternToMatch,
            userInput;

        const isUserInputValid = Books.isUserInputValid(regexPatternToMatch);
        expect(isUserInputValid).toBe(undefined);
    })

    it("given regex with matching data, return true", function() {
        let regexPatternToMatch = /abc/g,
            userInput = 'My favorite three letters are: abc. However, I have three more too.';

            const isUserInputValid = Books.isUserInputValid(regexPatternToMatch, userInput);
            expect(isUserInputValid).toBe(true);
    })

    it("given regex with nonmatching data, return false", function() {
        let regexPatternToMatch = /abc/g,
            userInput = 'My favorite three letters are: def. However, I have three more too.';

            const isUserInputValid = Books.isUserInputValid(regexPatternToMatch, userInput);
            expect(isUserInputValid).toBe(false);
    })
})

describe("unhideThenHideInvalidUserInputMessageAfterXms", function() {

    it("not given a ms, add then remove class hideVisibility", function() {
        const element = document.createElement('div');
        Books.unhideThenHideInvalidUserInputMessageAfterXms(element);
        expect(element.classList.contains('hideVisibility')).toBe(false);
    })

    describe("given an HTMLElement and ms", function() {
        let asyncFunction = (callback, ms) => {
            setTimeout(function() {
                callback();
            }, ms)
        }
        
        beforeEach(function() {
            jasmine.clock().install();
        })

        afterEach(function() {
            jasmine.clock().uninstall();
        })

        xit("after x ms remove class hideVisibility", function() {
            let element = document.createElement('div');
            let ms = 100000;
            
            Books.unhideThenHideInvalidUserInputMessageAfterXms(element, ms);
            expect(element.classList.contains('hideVisibility')).toBe(true);

            const callback = jasmine.createSpy('callback');
            asyncFunction(callback, ms);
            jasmine.clock().tick(ms);
            expect(element.classList.contains('hideVisiblity')).toBe(false);
        })
    })
})

describe("unhideInvalidUserInputMessage", function() {
    it("given an HTMLElement, add class hideVisibility", function() {
        let element = document.createElement('div');
        Books.unhideInvalidUserInputMessage(element);
        expect(element.classList.contains('hideVisibility')).toBe(false);
    })
})

describe("hideInvalidUserInputMessage method", function() {
    it("given an HTMLElement, add class hideVisibility", function() {
        let element = document.createElement('div');
        Books.hideInvalidUserInputMessage(element);
        expect(element.classList.contains('hideVisibility')).toBe(true);
    })
})

describe("getPageStartIndex method", function() {
    it("not given anything", function() {
        const startIndex = Books.getPageStartIndex();
        expect(startIndex).toBe(0);
    })
    
    it("not given a number", function() {
        const startIndex = Books.getPageStartIndex('');
        expect(startIndex).toBe(0);
    })
    
    it("given a negative number", function() {
        const startIndex = Books.getPageStartIndex(-2019);
        expect(startIndex).toBe(0);
    })

    it("given a positive number", function() {
        const startIndex = Books.getPageStartIndex(10);
        const expected = (10 * 10) - 1;
        expect(startIndex).toBe(expected);
    })
    
})

describe("createBooksAPIURL method", function() {
    it("not given anything, return undefined", function() {
        const booksAPIURL = Books.createBooksAPIURL();
        expect(booksAPIURL).toBe(undefined);
    })

    describe("not given expected data", function() {
        let parameters;

        it("userQuery is undefined, return undefined", function() {
            parameters = [undefined, 'akdjalj', 0];
            const booksAPIURL = Books.createBooksAPIURL(...parameters);
            expect(booksAPIURL).toBe(undefined);
        })

        it("API_KEY is undefined, return undefined", function() {
            parameters = ['book search', undefined, 0];
            const booksAPIURL = Books.createBooksAPIURL(...parameters);
            expect(booksAPIURL).toBe(undefined);
        })

        it("pageStartIndex is less than 0, return undefined", function() {
            parameters = ['book search', undefined, 0];
            const booksAPIURL = Books.createBooksAPIURL(...parameters);
            expect(booksAPIURL).toBe(undefined);
        })
        
    })

    describe("given expected data", function() {
        let parameters,
        booksAPIURL;

        beforeEach(function() {
            parameters = ['book search', 'akdjalj', 0];
            booksAPIURL = Books.createBooksAPIURL(...parameters);
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
        const parseBooks = Books.parseBooks();
        expect(parseBooks).toBe(undefined);
    })

    it("given an object without items property defined, return undefined", function() {
        const mockJsonData = { title: "" };
        const parseBooks = Books.parseBooks(mockJsonData);
        
        expect(parseBooks).toBe(undefined);
    })

    it("given an object without items property as an Array, return undefined", function() {
        const mockJsonData = { items: "" };
        const parseBooks = Books.parseBooks(mockJsonData);
        
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

        const parsedBooks = Books.parseBooks(mockJsonData);
        expect(parsedBooks).toEqual(books);
    })
})

describe("createBookObjects method", function() {
    it("not given anything, return undefined", function() {
        const bookObjects = Books.createBookObjects();
        expect(bookObjects).toBe(undefined);
    })
    it("not given an Array, return undefined", function() {
        const bookObjects = Books.createBookObjects('');
        expect(bookObjects).toBe(undefined);
    })
    it("given an empty Array, return an empty Array", function() {
        const bookObjects = Books.createBookObjects([]);
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
            const bookObjects = Books.createBookObjects(mockBookData);
            expect(bookObjects.length).toBe(2);
        })
    })
})

describe("createBookObject method", function () {

    it("volumeInfo is undefined, return undefined", function() {
        let bookObject = Books.createBookObject();
        expect(bookObject).toBe(undefined);
    })
    
    it("volumeInfo is an empty object, return undefined", function() {
        const mockVolumeInfo = {};

        let bookObject = Books.createBookObject(mockVolumeInfo);
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

        let bookObject = Books.createBookObject(mockVolumeInfo);
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

        const Book = Books.createBookObject(mockBookVolumeInfo);
        expect(Book).toEqual(bookObj);
    });
})

describe("clearBooks", function() {
    
    it("not given a HTMLElement, do not clear its contents", function() {
        let contentElement = document.createTextNode('div');
        Books.clearBooks(contentElement);
        expect(contentElement.textContent === 'div').toBe(true);
    })
    
    it("given a HTMLElement, clear all of its content", function() {
        let contentElement = document.createElement('div');
        contentElement.innerText = 'div';
        Books.clearBooks(contentElement);
        expect(contentElement.textContent).toBe('');
    })
})

describe("displayBooks method", function() {
    let books,
        contentElement;

    beforeEach(function () {
        books = [{ authors: ['Random', 'Random'] }];
        contentElement = document.createElement('div');
    })

    describe("given expected arguments", function() {
        let books,
        contentElement;

        beforeEach(function() {
            books = [{
                authors: ['Random', 'Random'], 
            },{
                authors: ['Random', 'Random'], 
            },{
                authors: ['Random', 'Random'], 
            }];
            contentElement = document.createElement('div');
            Books.displayBooks(contentElement, books);
        })
        
        it("child Element contains and element for every object in the array passed in", function() {
            expect(contentElement.children.length).toBe(books.length);
        })
    })
})

describe("createBookElement method", function() {
    describe("not given anything", function() {
        it("return undefined", function() {
            const element = Books.createBookElement();
            expect(element === undefined).toBe(true);
        })
    })

    describe("given an empty object", function() {
        let book,
        element;

        beforeEach(function() {
            book = {};
            element = Books.createBookElement(book);
        })

        it("return undefined", function() {
            expect(element === undefined).toBe(true);
        })
    })

    describe("given an object with authors", function() {
        let book,
        element;

        beforeEach(function() {
            book = {
                authors: ['Random, Random']
            };
            element = Books.createBookElement(book);
        })

        it("return HTMLDivElement", function() {
            expect(element instanceof HTMLDivElement).toBe(true);
        })

        it("return element with one child", function() {
            expect(element.children.length).toBe(1);
        })
    })

    describe("given an object with a description", function() {
        let book,
        element;

        beforeEach(function() {
            book = {
                description: ['Random, Random']
            };
            element = Books.createBookElement(book);
        })

        it("return HTMLDivElement", function() {
            expect(element instanceof HTMLDivElement).toBe(true);
        })

        it("return element with one child", function() {
            expect(element.children.length).toBe(1);
        })
    })

    describe("given an object with image", function() {
        let book,
        element;

        beforeEach(function() {
            book = {
                image: 'https://fakeimg.pl/128x125/?text=Hello'
            };
            element = Books.createBookElement(book);
        })

        it("return HTMLDivElement", function() {
            expect(element instanceof HTMLDivElement).toBe(true);
        })

        it("return element with one child", function() {
            expect(element.children.length).toBe(1);
        })
    })

    describe("given an object with moreInfoLink", function() {
        let book,
        element;

        beforeEach(function() {
            book = {
                moreInfoLink: ['Random, Random']
            };
            element = Books.createBookElement(book);
        })

        it("return HTMLDivElement", function() {
            expect(element instanceof HTMLDivElement).toBe(true);
        })

        it("return element with one child", function() {
            expect(element.children.length).toBe(1);
        })
    })

    describe("given an object with publishingCompany", function() {
        let book,
        element;

        beforeEach(function() {
            book = {
                publishingCompany: 'Random'
            };
            element = Books.createBookElement(book);
        })

        it("return HTMLDivElement", function() {
            expect(element instanceof HTMLDivElement).toBe(true);
        })

        it("return element with one child", function() {
            expect(element.children.length).toBe(1);
        })
    })

    describe("given an object with title", function() {
        let book,
        element;

        beforeEach(function() {
            book = {
                title: 'Random'
            };
            element = Books.createBookElement(book);
        })

        it("return HTMLDivElement", function() {
            expect(element instanceof HTMLDivElement).toBe(true);
        })

        it("return element with one child", function() {
            expect(element.children.length).toBe(1);
        })
    })


})

describe("createBookTextElementAndAppendContent", function() {
    let m,
        content;

    beforeEach(function() {
        type = "m";
        content = "Content of Element";
    })
    describe("not given", function() {
        it("anything, return undefined", function() {
            const element = Books.createBookTextElementAndAppendContent();
            expect(element).toBe(undefined);
        })

        it("a type, return undefined", function() {
            const element = Books.createBookTextElementAndAppendContent(undefined, content);
            expect(element).toBe(undefined);
        })

        it("a content, return undefined", function() {
            const element = Books.createBookTextElementAndAppendContent(type, undefined);
            expect(element).toBe(undefined);
        })
    })

    describe("given everything expected", function() {
        let element;

        beforeEach(function() {
            element = Books.createBookTextElementAndAppendContent(type, content);
        })

        it("return HTMLElement", function() {
            expect(element instanceof HTMLElement).toBe(true);
        })

        it("return element with expected text content", function() {
            expect(element.innerText).toBe(content);
        })
    })
})

describe("createBookImageElement method", function() {
    describe("not given", function() {

        it("anything, return undefined", function() {
            const actual = Books.createBookImageElement();
            expect(actual).toBe(undefined);
        })

        it("a url, return undefined", function() {
            const actual = Books.createBookImageElement(undefined, "Random text");
            expect(actual).toBe(undefined);
        })

        it("a description, return undefined", function() {
            const actual = Books.createBookImageElement("https://www.randompicture.rp", undefined);
            expect(actual).toBe(undefined);
        })

        it("a proper url, return undefined", function() {
            const actual = Books.createBookImageElement("www.randompicture.rp", "Random text");
            expect(actual).toBe(undefined);
        })
    })

    describe("given all expected values", function() {
        let element,
        description,
        fakePageUrl,
        src,
        textAppendedAtEndOfDescription;

        beforeEach(function(){
            description = "A giraffe";
            fakePageUrl = 'https://random.fake/';
            src = "https://www.randompicture.rp/";
            textAppendedAtEndOfDescription = "appended text";
            element = Books.createBookImageElement(src, description, textAppendedAtEndOfDescription, fakePageUrl);
        })

        it("return HTMLImageElement", function() {
            expect(element instanceof HTMLImageElement).toBe(true);
        })

        it("return element with encoded src", function() {
            element = Books.createBookImageElement(src, description, textAppendedAtEndOfDescription);
            expect(element.src === encodeURI(src)).toBe(true);
        })
        
        it("return element that starts with text in alt attribute", function () {
            expect(element.alt.startsWith(description)).toBe(true);
        })

        it("return element that appends textAppendedAtEndOfDescription", function() {
            expect(element.alt.endsWith(textAppendedAtEndOfDescription)).toBe(true);
        })
    })

    describe("given an https url", function() {
        let description,
        fakePageUrl,
        src,
        textAppendedAtEndOfDescription;

        beforeEach(function() {
            description = "A giraffe";
            fakePageUrl = "https://random.fake/";
            src = "https://www.randompicture.rp/";
            textAppendedAtEndOfDescription = "appended text";
        })

        it("return element with href as https", function() {
            const element = Books.createBookImageElement(src, description, textAppendedAtEndOfDescription, fakePageUrl);
            expect(element.src === src).toBe(true);
        })
    })
})

describe("createBookLinkElement method", function() {
    describe("not given anything", function() {
        it("return undefined", function() {
            const element = Books.createBookLinkElement();
            expect(element).toBe(undefined);
        })
    })

    describe("not given an url", function() {
        let mockObject,
        url;

        beforeEach(function() {
            mockObject = [url, 'successfulInnerText', 'failureInnerText'];
        })

        it("return undefined", function() {
            const element = Books.createBookLinkElement(...mockObject);
            expect(element).toBe(undefined);
        })
    })
    
    describe("given an url", function() {
        let mockObject,
        url;

        beforeEach(function() {
            url = 'https://www.google.com/',
            successfulInnerText = 'successfulInnerText',
            mockObject = [url, successfulInnerText, 'failureInnerText'];
        })

        it("return element with successfulInnerText", function() {
            const element = Books.createBookLinkElement(...mockObject);
            expect(element.innerText === successfulInnerText).toBe(true);
        })
        
        it("return element with given encoded href", function() {
            const element = Books.createBookLinkElement(...mockObject);
            expect(element.href === encodeURI(url)).toBe(true);
        })
    })
    
    describe("given a improper url", function() {
        let mockObject,
        url;

        beforeEach(function() {
            url = 'www.google.com/',
            failureInnerText = 'failureInnerText',
            mockObject = [url, 'successfulInnerText', failureInnerText];
        })

        it("return element with failureInnerText", function() {
            const element = Books.createBookLinkElement(...mockObject);
            expect(element.innerText === failureInnerText).toBe(true);
        })
        
        it("return element with empty href", function() {
            const element = Books.createBookLinkElement(...mockObject);
            expect(element.href === '').toBe(true);
        })
    })
})

describe("createBookContainerElement method", function() {
    describe("not given anything", function() {
        it("return undefined", function() {
            const element = Books.createBookContainerElement();
            expect(element === undefined).toBe(true);
        })
    })
    
    describe("given a HTMLElement for the authorElement property", function() {
        let elementsObj;

        beforeEach(function() {
            elementsObj = {
                authorElement: document.createElement('div')
            }
        })

        it("return an HTMLDIVElement", function() {
            const element = Books.createBookContainerElement(elementsObj);
            expect(element instanceof HTMLDivElement).toBe(true);
        })

        it("return an element that has class 'book'", function() {
            const element = Books.createBookContainerElement(elementsObj);
            expect(element.classList.contains('book')).toBe(true);
        })
        
        it("return an element that has one child", function() {
            const element = Books.createBookContainerElement(elementsObj);
            expect(element.children.length).toBe(1);
        })
    })
    
    describe("given a HTMLElement for the descriptionElement property", function() {
        let elementsObj;

        beforeEach(function() {
            elementsObj = {
                descriptionElement: document.createElement('div')
            }
        })

        it("return an HTMLDIVElement", function() {
            const element = Books.createBookContainerElement(elementsObj);
            expect(element instanceof HTMLDivElement).toBe(true);
        })

        it("return an element that has class 'book'", function() {
            const element = Books.createBookContainerElement(elementsObj);
            expect(element.classList.contains('book')).toBe(true);
        })
        
        it("return an element that has one child", function() {
            const element = Books.createBookContainerElement(elementsObj);
            expect(element.children.length).toBe(1);
        })
    })
    
    describe("given a HTMLElement for the imageElement property", function() {
        let elementsObj;

        beforeEach(function() {
            elementsObj = {
                imageElement: document.createElement('div')
            }
        })

        it("return an HTMLDIVElement", function() {
            const element = Books.createBookContainerElement(elementsObj);
            expect(element instanceof HTMLDivElement).toBe(true);
        })

        it("return an element that has class 'book'", function() {
            const element = Books.createBookContainerElement(elementsObj);
            expect(element.classList.contains('book')).toBe(true);
        })
        
        it("return an element that has one child", function() {
            const element = Books.createBookContainerElement(elementsObj);
            expect(element.children.length).toBe(2);
        })
    })
    
    describe("given a HTMLElement for the moreInfoLinkElement property", function() {
        let elementsObj;

        beforeEach(function() {
            elementsObj = {
                moreInfoLinkElement: document.createElement('div')
            }
        })

        it("return an HTMLDIVElement", function() {
            const element = Books.createBookContainerElement(elementsObj);
            expect(element instanceof HTMLDivElement).toBe(true);
        })

        it("return an element that has class 'book'", function() {
            const element = Books.createBookContainerElement(elementsObj);
            expect(element.classList.contains('book')).toBe(true);
        })
        
        it("return an element that has one child", function() {
            const element = Books.createBookContainerElement(elementsObj);
            expect(element.children.length).toBe(1);
        })
    })
    
    describe("given a HTMLElement for the publishingCompanyElement property", function() {
        let elementsObj;

        beforeEach(function() {
            elementsObj = {
                publishingCompanyElement: document.createElement('div')
            }
        })

        it("return an HTMLDIVElement", function() {
            const element = Books.createBookContainerElement(elementsObj);
            expect(element instanceof HTMLDivElement).toBe(true);
        })

        it("return an element that has class 'book'", function() {
            const element = Books.createBookContainerElement(elementsObj);
            expect(element.classList.contains('book')).toBe(true);
        })
        
        it("return an element that has one child", function() {
            const element = Books.createBookContainerElement(elementsObj);
            expect(element.children.length).toBe(1);
        })
    })
    
    describe("given a HTMLElement for the titleElement property", function() {
        let elementsObj;

        beforeEach(function() {
            elementsObj = {
                titleElement: document.createElement('div')
            }
        })

        it("return an HTMLDIVElement", function() {
            const element = Books.createBookContainerElement(elementsObj);
            expect(element instanceof HTMLDivElement).toBe(true);
        })

        it("return an element that has class 'book'", function() {
            const element = Books.createBookContainerElement(elementsObj);
            expect(element.classList.contains('book')).toBe(true);
        })
        
        it("return an element that has one child", function() {
            const element = Books.createBookContainerElement(elementsObj);
            expect(element.children.length).toBe(1);
        })
    })
})

describe("createBookDetailsFrontContainerElement method", function() {
    describe("not given anything", function() {
        it("return 'undefined'", function() {
            const element = Books.createBookDetailsFrontContainerElement();
            expect(element === undefined).toBe(true);
        })
    })
    
    describe("not given a HTMLElement on any property", function() {
        let elementsObj;

        beforeEach(function() {
            elementsObj = {
                authorElement: "",
                publishingCompanyElement: "",
                titleElement: "",
            }
        })

        it("return a HTMLDIVElement'", function() {
            const element = Books.createBookDetailsFrontContainerElement(elementsObj);
            expect(element instanceof HTMLDivElement).toBe(true);
        })
        
        it("return an element that has class 'book_details_front'", function() {
            const element = Books.createBookDetailsFrontContainerElement(elementsObj);
            expect(element.classList.contains('book_details_front')).toBe(true);
        })

        it("return an element that has zero child elements", function() {
            const element = Books.createBookDetailsFrontContainerElement(elementsObj);
            expect(element.children.length).toBe(0);
        })
    })

    describe("given a HTMLElement for the authorElement property", function() {
        let elementsObj;

        beforeEach(function() {
            elementsObj = {
                authorElement: document.createElement('div')
            }
        })

        it("return a HTMLDIVElement'", function() {
            const element = Books.createBookDetailsFrontContainerElement(elementsObj);
            expect(element instanceof HTMLDivElement).toBe(true);
        })
        
        it("return an element that has class 'book_details_front'", function() {
            const element = Books.createBookDetailsFrontContainerElement(elementsObj);
            expect(element.classList.contains('book_details_front')).toBe(true);
        })

        it("return an element that has one child element", function() {
            const element = Books.createBookDetailsFrontContainerElement(elementsObj);
            expect(element.children.length).toBe(1);
        })
    })

    describe("given a HTMLElement for publishingCompanyElement properties", function() {
        let elementsObj;

        beforeEach(function() {
            elementsObj = {
                publishingCompanyElement: document.createElement('div')
            }
        })

        it("return a HTMLDIVElement'", function() {
            const element = Books.createBookDetailsFrontContainerElement(elementsObj);
            expect(element instanceof HTMLDivElement).toBe(true);
        })
        
        it("return an element that has class 'book_details_front'", function() {
            const element = Books.createBookDetailsFrontContainerElement(elementsObj);
            expect(element.classList.contains('book_details_front')).toBe(true);
        })

        it("return an element that has one child element", function() {
            const element = Books.createBookDetailsFrontContainerElement(elementsObj);
            expect(element.children.length).toBe(1);
        })
    })

    describe("given a HTMLElement for titleElement properties", function() {
        let elementsObj;

        beforeEach(function() {
            elementsObj = {
                titleElement: document.createElement('div')
            }
        })

        it("return a HTMLDIVElement'", function() {
            const element = Books.createBookDetailsFrontContainerElement(elementsObj);
            expect(element instanceof HTMLDivElement).toBe(true);
        })
        
        it("return an element that has class 'book_details_front'", function() {
            const element = Books.createBookDetailsFrontContainerElement(elementsObj);
            expect(element.classList.contains('book_details_front')).toBe(true);
        })

        it("return an element that has one child element", function() {
            const element = Books.createBookDetailsFrontContainerElement(elementsObj);
            expect(element.children.length).toBe(1);
        })
    })

    describe("given a HTMLElement for all properties", function() {
        let elementsObj;

        beforeEach(function() {
            elementsObj = {
                authorElement: document.createElement('div'),
                publishingCompanyElement: document.createElement('div'),
                titleElement: document.createElement('div')
            }
        })

        it("return a HTMLDIVElement'", function() {
            const element = Books.createBookDetailsFrontContainerElement(elementsObj);
            expect(element instanceof HTMLDivElement).toBe(true);
        })
        
        it("return an element that has class 'book_details_front'", function() {
            const element = Books.createBookDetailsFrontContainerElement(elementsObj);
            expect(element.classList.contains('book_details_front')).toBe(true);
        })

        it("return an element that has three child elements", function() {
            const element = Books.createBookDetailsFrontContainerElement(elementsObj);
            expect(element.children.length).toBe(3);
        })
    })
})

describe("createBookDetailsBackContainerElement method", function() {
    
    describe("not given anything", function() {

        it("return a undefined'", function() {
            const element = Books.createBookDetailsBackContainerElement();
            expect(element === undefined).toBe(true);
        })

    })
    
    describe("not given a HTMLElement", function() {
        let elementsObj;

        beforeEach(function() {
            elementsObj = {
                descriptionElement: "",
                moreInfoLinkElement: {}
            }
        })

        it("return a HTMLDIVElement'", function() {
            const element = Books.createBookDetailsBackContainerElement(elementsObj);
            expect(element instanceof HTMLDivElement).toBe(true);
        })
        
        it("return an element that has class 'book_details_back'", function() {
            const element = Books.createBookDetailsBackContainerElement(elementsObj);
            expect(element.classList.contains('book_details_back')).toBe(true);
        })

        it("return an element that has zero child elements", function() {
            const element = Books.createBookDetailsBackContainerElement(elementsObj);
            expect(element.children.length).toBe(0);
        })
    })

    describe("given a HTMLElement for the descriptionElement property", function() {
        let elementsObj;

        beforeEach(function() {
            elementsObj = {
                descriptionElement: document.createElement('div'),
                moreInfoLinkElement: {}
            }
        })

        it("return a HTMLDIVElement'", function() {
            const element = Books.createBookDetailsBackContainerElement(elementsObj);
            expect(element instanceof HTMLDivElement).toBe(true);
        })
        
        it("return an element that has class 'book_details_back'", function() {
            const element = Books.createBookDetailsBackContainerElement(elementsObj);
            expect(element.classList.contains('book_details_back')).toBe(true);
        })

        it("return an element that has one child element", function() {
            const element = Books.createBookDetailsBackContainerElement(elementsObj);
            expect(element.children.length).toBe(1);
        })

        it("return an element with one child element that has class 'book_details_back_description'", function() {
            const element = Books.createBookDetailsBackContainerElement(elementsObj);
            expect(element.children[0].classList.contains('book_details_back_description')).toBe(true);
        })
    })

    describe("given a HTMLElement for the moreInfoLinkElement property", function() {
        let elementsObj;

        beforeEach(function() {
            elementsObj = {
                moreInfoLinkElement: document.createElement('div')
            }
        })

        it("return a HTMLDIVElement'", function() {
            const element = Books.createBookDetailsBackContainerElement(elementsObj);
            expect(element instanceof HTMLDivElement).toBe(true);
        })
        
        it("return an element that has class 'book_details_back'", function() {
            const element = Books.createBookDetailsBackContainerElement(elementsObj);
            expect(element.classList.contains('book_details_back')).toBe(true);
        })

        it("return an element that has one child element", function() {
            const element = Books.createBookDetailsBackContainerElement(elementsObj);
            expect(element.children.length).toBe(1);
        })
    })

    describe("given a HTMLElement for all properties", function() {
        let elementsObj;

        beforeEach(function() {
            elementsObj = {
                descriptionElement: document.createElement('div'),
                moreInfoLinkElement: document.createElement('div')
            }
        })

        it("return a HTMLDIVElement'", function() {
            const element = Books.createBookDetailsBackContainerElement(elementsObj);
            expect(element instanceof HTMLDivElement).toBe(true);
        })
        
        it("return an element that has class 'book_details_back'", function() {
            const element = Books.createBookDetailsBackContainerElement(elementsObj);
            expect(element.classList.contains('book_details_back')).toBe(true);
        })

        it("return an element that has two child element", function() {
            const element = Books.createBookDetailsBackContainerElement(elementsObj);
            expect(element.children.length).toBe(2);
        })

        it("return an element with one child element that has class 'book_details_back_description'", function() {
            const element = Books.createBookDetailsBackContainerElement(elementsObj);
            expect(element.children[0].classList.contains('book_details_back_description')).toBe(true);
        })
    })
})

describe("collapseSearchForm method", function () {
    let Books,
        footerElement,
        searchToggleElement;

    beforeEach(function () {
        Books = window.Books;
        footerElement = document.createElement('footer');
        searchToggleElement = document.createElement('button');
    })

    describe("given a HTMLELEMENT for the footerElement parameter and for the searchToggleElement parameter", function () {
        it("add footer--collapsed class to footerElement", function () {
            Books.collapseSearchForm(footerElement, searchToggleElement);
            expect(footerElement.classList.contains('footer--collapsed')).toBe(true);
        })

        it("add search_toggle--collapsed class to searchToggleElement", function () {
            Books.collapseSearchForm(footerElement, searchToggleElement);
            expect(searchToggleElement.classList.contains('search_toggle--collapsed')).toBe(true);
        })

        it("set dataset.collapsed attribute to true on searchToggleElement", function () {
            Books.collapseSearchForm(footerElement, searchToggleElement);
            expect(searchToggleElement.dataset.collapsed).toBe("true");
        })

        it("set innerText of searchToggleElement to 'Expand Search'", function () {
            Books.collapseSearchForm(footerElement, searchToggleElement);
            expect(searchToggleElement.innerText).toBe('Expand Search');
        })
    })
})

describe("expandSearchForm method", function() {
    let footerElement,
    searchToggleElement;

    beforeEach(function() {
        footerElement = document.createElement('footer');
        searchToggleElement = document.createElement('button');
        Books.collapseSearchForm(footerElement, searchToggleElement);
    })

    describe("given a HTMLELEMENT for the footerElement parameter and for the searchToggleElement parameter", function() {
        it("with class 'footer--collapsed', remove footer--collapsed class to footerElement", function() {
            Books.expandSearchForm(footerElement, searchToggleElement);
            expect(footerElement.classList.contains('footer--collapsed')).toBe(false);
        })

        it("set dataset.collapsed attribute to false", function() {
            Books.expandSearchForm(footerElement, searchToggleElement);
            expect(searchToggleElement.dataset.collapsed).toBe("false");
        })
    
        it("remove search_toggle--collapsed class to searchToggleElement", function() {
            Books.expandSearchForm(footerElement, searchToggleElement);
            expect(searchToggleElement.classList.contains('search_toggle--collapsed')).toBe(false);
        })
    
        it("set innerText of searchToggleElement to 'Collapse Search'", function() {
            Books.expandSearchForm(footerElement, searchToggleElement);
            expect(searchToggleElement.innerText).toBe('Collapse Search');
        })
    })
})

describe('showExpandStateForSearchToggleElement method', function() {
    describe('given a HTMLElement', function() {
        beforeEach(function() {
            searchToggleElement = document.createElement('button');
            Books.showCollapseStateForSearchToggleElement(searchToggleElement);
        })

        it("set dataset.collapsed attribute to false", function() {
            Books.showExpandStateForSearchToggleElement(searchToggleElement);
            expect(searchToggleElement.dataset.collapsed).toBe('false');
        })
    
        it("remove search_toggle--collapsed class to searchToggleElement", function() {
            Books.showExpandStateForSearchToggleElement(searchToggleElement);
            expect(searchToggleElement.classList.contains('search_toggle--collapsed')).toBe(false);
        })
    
        it("set innerText of searchToggleElement to 'Collapse Search'", function() {
            Books.showExpandStateForSearchToggleElement(searchToggleElement);
            expect(searchToggleElement.innerText).toBe('Collapse Search');
        })
    })
})

describe('showExpandStateForFooterElement method', function() {
    describe('given a HTMLElement', function() {
        beforeEach(function() {
            footerToggleElement = document.createElement('button');
            Books.showCollapseStateForFooterElement(footerToggleElement);
        })
    
        it("remove footer--collapsed class to footerToggleElement", function() {
            Books.showExpandStateForFooterElement(footerToggleElement);
            expect(footerToggleElement.classList.contains('footer--collapsed')).toBe(false);
        })
    })
})

describe('showCollapseStateForSearchToggleElement method', function() {
    describe('given a HTMLElement', function() {
        beforeEach(function() {
            searchToggleElement = document.createElement('button');
            Books.showExpandStateForSearchToggleElement(searchToggleElement);
        })

        it("set dataset.collapsed attribute to true", function() {
            Books.showCollapseStateForSearchToggleElement(searchToggleElement);
            expect(searchToggleElement.dataset.collapsed).toBe('true');
        })
    
        it("add search_toggle--collapsed class to searchToggleElement", function() {
            Books.showCollapseStateForSearchToggleElement(searchToggleElement);
            expect(searchToggleElement.classList.contains('search_toggle--collapsed')).toBe(true);
        })
    
        it("set innerText of searchToggleElement to 'Expand Search'", function() {
            Books.showCollapseStateForSearchToggleElement(searchToggleElement);
            expect(searchToggleElement.innerText).toBe('Expand Search');
        })
    })
})

describe('showCollapseStateForFooterElement method', function() {
    describe('given a HTMLElement', function() {
        beforeEach(function() {
            footerToggleElement = document.createElement('button');
            Books.showExpandStateForFooterElement(footerToggleElement);
        })
    
        it("add footer--collapsed class to footerToggleElement", function() {
            Books.showCollapseStateForFooterElement(footerToggleElement);
            expect(footerToggleElement.classList.contains('footer--collapsed')).toBe(true);
        })
    })
})

describe('Object is empty method', function() {
    it('given empty object, return true', function() {
        const obj = {};
        expect(obj.isEmpty()).toBe(true);
    })
    it('given non-empty object, return true', function() {
        const obj = {a: 1};
        expect(obj.isEmpty()).toBe(false);
    })
})