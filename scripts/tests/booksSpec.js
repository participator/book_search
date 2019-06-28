describe("createBookDetailsElement method", function() {
    describe("not given anything", function() {
        it("return an HTMLDIVElement", function() {
            const element = Books.createBookContainerElement();
            expect(element instanceof HTMLDivElement).toBe(true);
        })

        it("return an element that has class 'book'", function() {
            const element = Books.createBookContainerElement();
            expect(element.classList.contains('book')).toBe(true);
        })
        
        it("return an element that has one child", function() {
            const element = Books.createBookContainerElement();
            expect(element.children.length).toBe(1);
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
        it("return a HTMLDIVElement'", function() {
            const element = Books.createBookDetailsFrontContainerElement();
            expect(element instanceof HTMLDivElement).toBe(true);
        })

        it("return an element that has class 'book_details_front'", function() {
            const element = Books.createBookDetailsFrontContainerElement();
            expect(element.classList.contains('book_details_front')).toBe(true);
        })

        it("return an element that has zero child elements", function() {
            const element = Books.createBookDetailsFrontContainerElement();
            expect(element.children.length).toBe(0);
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

        it("return a HTMLDIVElement'", function() {
            const element = Books.createBookDetailsBackContainerElement();
            expect(element instanceof HTMLDivElement).toBe(true);
        })

        it("return an element that has class 'book_details_back'", function() {
            const element = Books.createBookDetailsBackContainerElement();
            expect(element.classList.contains('book_details_back')).toBe(true);
        })

        it("return an element that has zero child elements", function() {
            const element = Books.createBookDetailsBackContainerElement();
            expect(element.children.length).toBe(0);
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

describe("createBookObject method", function () {
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
        it("it adds footer--collapsed class to footerElement", function() {
            Books.collapseSearchForm(footerElement);
            expect(footerElement.classList.contains('footer--collapsed')).toBe(true);
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

describe("expandSearchForm method", function() {
    beforeEach(function() {
        footerElement = document.createElement('footer');
        searchToggleElement = document.createElement('button');
        Books.collapseSearchForm(footerElement);
    })

    describe("given a HTMLELEMENT for the footerElement parameter", function() {
        it("with class 'footer--collapsed', it removes footer--collapsed class to footerElement", function() {
            Books.expandSearchForm(footerElement);
            expect(footerElement.classList.contains('footer--collapsed')).toBe(false);
        })
    })

    describe("given a HTMLElement for the searchToggleElement parameter", function() {
        it("it sets dataset.collapsed attribute to false", function() {
            Books.expandSearchForm(undefined, searchToggleElement);
            expect(searchToggleElement.dataset.collapsed).toBe("false");
        })
    
        it("it removes search_toggle--collapsed class to searchToggleElement", function() {
            Books.expandSearchForm(undefined, searchToggleElement);
            expect(searchToggleElement.classList.contains('search_toggle--collapsed')).toBe(false);
        })
    
        it("it sets innerText of searchToggleElement to 'Collapse Search'", function() {
            Books.expandSearchForm(undefined, searchToggleElement);
            expect(searchToggleElement.innerText).toBe('Collapse Search');
        })
    })
})

describe('showExpandStateForSearchToggleElement method', function() {
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