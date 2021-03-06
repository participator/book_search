let UI = window.Books.UI;

describe("moveLogoToPageTop method", function() {
    it("given an HTMLElement, add class 'logoMove'", function() {
        const element = document.createElement('div');
        UI.moveLogoToPageTop(element);
        expect(element.classList.contains('logoMove')).toBe(true);
    })
})

describe("getUserInput method", function() {
    it("not given anything, return undefined", function() {
        const userInput = UI.getUserInput();
        expect(userInput).toBe(undefined);
    })

    it("not given a HTMLInputElement, return undefined", function() {
        const inputElement = '';
        const userInput = UI.getUserInput(inputElement);
        expect(userInput).toBe(undefined);
    })

    it("given a HTMLInputElement, return text of element", function() {
        const text = 'inside no more';
        const inputElement = document.createElement('input');
        inputElement.value = text;
        const userInput = UI.getUserInput(inputElement);

        expect(userInput).toBe(text);
    })
    
})

describe("isSearchFormUserInputValid method", function() {
    it('not given anything return undefined', function() {
        const isValid = UI.isSearchFormUserInputValid();
        expect(isValid).toBe(undefined);
    })

    it('not given valid input, return false', function() {
        const input = ' 12321312';
        const isValid = UI.isSearchFormUserInputValid(input);
        expect(isValid).toBe(false);
    })

    it('given valid input, return true', function() {
        const input = 'a12321312';
        const isValid = UI.isSearchFormUserInputValid(input);
        expect(isValid).toBe(true);
    })
})

describe("unhideThenHideInvalidUserInputMessageAfterXms", function() {

    it("not given a ms, add then remove class hideVisibility", function() {
        const element = document.createElement('div');
        UI.unhideThenHideInvalidUserInputMessageAfterXms(element);
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
            
            UI.unhideThenHideInvalidUserInputMessageAfterXms(element, ms);
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
        UI.unhideInvalidUserInputMessage(element);
        expect(element.classList.contains('hideVisibility')).toBe(false);
    })
})

describe("hideInvalidUserInputMessage method", function() {
    it("given an HTMLElement, add class hideVisibility", function() {
        let element = document.createElement('div');
        UI.hideInvalidUserInputMessage(element);
        expect(element.classList.contains('hideVisibility')).toBe(true);
    })
})

describe("clearBooks", function() {
    
    it("not given a HTMLElement, do not clear its contents", function() {
        let contentElement = document.createTextNode('div');
        UI.clearBooks(contentElement);
        expect(contentElement.textContent === 'div').toBe(true);
    })
    
    it("given a HTMLElement, clear all of its content", function() {
        let contentElement = document.createElement('div');
        contentElement.innerText = 'div';
        UI.clearBooks(contentElement);
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
            UI.displayBooks(contentElement, books);
        })
        
        it("child Element contains and element for every object in the array passed in", function() {
            expect(contentElement.children.length).toBe(books.length);
        })
    })
})

describe("createBookElement method", function() {
    describe("not given anything", function() {
        it("return undefined", function() {
            const element = UI.createBookElement();
            expect(element === undefined).toBe(true);
        })
    })

    describe("given an empty object", function() {
        let book,
        element;

        beforeEach(function() {
            book = {};
            element = UI.createBookElement(book);
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
            element = UI.createBookElement(book);
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
            element = UI.createBookElement(book);
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
            element = UI.createBookElement(book);
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
            element = UI.createBookElement(book);
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
            element = UI.createBookElement(book);
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
            element = UI.createBookElement(book);
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
            const element = UI.createBookTextElementAndAppendContent();
            expect(element).toBe(undefined);
        })

        it("a type, return undefined", function() {
            const element = UI.createBookTextElementAndAppendContent(undefined, content);
            expect(element).toBe(undefined);
        })

        it("a content, return undefined", function() {
            const element = UI.createBookTextElementAndAppendContent(type, undefined);
            expect(element).toBe(undefined);
        })
    })

    describe("given everything expected", function() {
        let element;

        beforeEach(function() {
            element = UI.createBookTextElementAndAppendContent(type, content);
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
            const actual = UI.createBookImageElement();
            expect(actual).toBe(undefined);
        })

        it("a url, return undefined", function() {
            const actual = UI.createBookImageElement(undefined, "Random text");
            expect(actual).toBe(undefined);
        })

        it("a description, return undefined", function() {
            const actual = UI.createBookImageElement("https://www.randompicture.rp", undefined);
            expect(actual).toBe(undefined);
        })

        it("a proper url, return undefined", function() {
            const actual = UI.createBookImageElement("www.randompicture.rp", "Random text");
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
            src = "https://www.randompicture.fake/";
            textAppendedAtEndOfDescription = "appended text";
            element = UI.createBookImageElement(src, description, textAppendedAtEndOfDescription, fakePageUrl);
        })

        it("return HTMLImageElement", function() {
            expect(element instanceof HTMLImageElement).toBe(true);
        })

        it("return element with encoded src", function() {
            element = UI.createBookImageElement(src, description, textAppendedAtEndOfDescription);
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
            src = "https://www.randompicture.fake/";
            textAppendedAtEndOfDescription = "appended text";
        })

        it("return element with href as https", function() {
            const element = UI.createBookImageElement(src, description, textAppendedAtEndOfDescription, fakePageUrl);
            expect(element.src === src).toBe(true);
        })
    })
})

describe("createBookLinkElement method", function() {
    describe("not given anything", function() {
        it("return undefined", function() {
            const element = UI.createBookLinkElement();
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
            const element = UI.createBookLinkElement(...mockObject);
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
            const element = UI.createBookLinkElement(...mockObject);
            expect(element.innerText === successfulInnerText).toBe(true);
        })
        
        it("return element with given encoded href", function() {
            const element = UI.createBookLinkElement(...mockObject);
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
            const element = UI.createBookLinkElement(...mockObject);
            expect(element.innerText === failureInnerText).toBe(true);
        })
        
        it("return element with empty href", function() {
            const element = UI.createBookLinkElement(...mockObject);
            expect(element.href === '').toBe(true);
        })
    })
})

describe("createBookContainerElement method", function() {
    describe("not given anything", function() {
        it("return undefined", function() {
            const element = UI.createBookContainerElement();
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
            const element = UI.createBookContainerElement(elementsObj);
            expect(element instanceof HTMLDivElement).toBe(true);
        })

        it("return an element that has class 'book'", function() {
            const element = UI.createBookContainerElement(elementsObj);
            expect(element.classList.contains('book')).toBe(true);
        })
        
        it("return an element that has one child", function() {
            const element = UI.createBookContainerElement(elementsObj);
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
            const element = UI.createBookContainerElement(elementsObj);
            expect(element instanceof HTMLDivElement).toBe(true);
        })

        it("return an element that has class 'book'", function() {
            const element = UI.createBookContainerElement(elementsObj);
            expect(element.classList.contains('book')).toBe(true);
        })
        
        it("return an element that has one child", function() {
            const element = UI.createBookContainerElement(elementsObj);
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
            const element = UI.createBookContainerElement(elementsObj);
            expect(element instanceof HTMLDivElement).toBe(true);
        })

        it("return an element that has class 'book'", function() {
            const element = UI.createBookContainerElement(elementsObj);
            expect(element.classList.contains('book')).toBe(true);
        })
        
        it("return an element that has one child", function() {
            const element = UI.createBookContainerElement(elementsObj);
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
            const element = UI.createBookContainerElement(elementsObj);
            expect(element instanceof HTMLDivElement).toBe(true);
        })

        it("return an element that has class 'book'", function() {
            const element = UI.createBookContainerElement(elementsObj);
            expect(element.classList.contains('book')).toBe(true);
        })
        
        it("return an element that has one child", function() {
            const element = UI.createBookContainerElement(elementsObj);
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
            const element = UI.createBookContainerElement(elementsObj);
            expect(element instanceof HTMLDivElement).toBe(true);
        })

        it("return an element that has class 'book'", function() {
            const element = UI.createBookContainerElement(elementsObj);
            expect(element.classList.contains('book')).toBe(true);
        })
        
        it("return an element that has one child", function() {
            const element = UI.createBookContainerElement(elementsObj);
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
            const element = UI.createBookContainerElement(elementsObj);
            expect(element instanceof HTMLDivElement).toBe(true);
        })

        it("return an element that has class 'book'", function() {
            const element = UI.createBookContainerElement(elementsObj);
            expect(element.classList.contains('book')).toBe(true);
        })
        
        it("return an element that has one child", function() {
            const element = UI.createBookContainerElement(elementsObj);
            expect(element.children.length).toBe(1);
        })
    })
})

describe("createBookDetailsFrontContainerElement method", function() {
    describe("not given anything", function() {
        it("return 'undefined'", function() {
            const element = UI.createBookDetailsFrontContainerElement();
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
            const element = UI.createBookDetailsFrontContainerElement(elementsObj);
            expect(element instanceof HTMLDivElement).toBe(true);
        })
        
        it("return an element that has class 'book_details_front'", function() {
            const element = UI.createBookDetailsFrontContainerElement(elementsObj);
            expect(element.classList.contains('book_details_front')).toBe(true);
        })

        it("return an element that has zero child elements", function() {
            const element = UI.createBookDetailsFrontContainerElement(elementsObj);
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
            const element = UI.createBookDetailsFrontContainerElement(elementsObj);
            expect(element instanceof HTMLDivElement).toBe(true);
        })
        
        it("return an element that has class 'book_details_front'", function() {
            const element = UI.createBookDetailsFrontContainerElement(elementsObj);
            expect(element.classList.contains('book_details_front')).toBe(true);
        })

        it("return an element that has one child element", function() {
            const element = UI.createBookDetailsFrontContainerElement(elementsObj);
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
            const element = UI.createBookDetailsFrontContainerElement(elementsObj);
            expect(element instanceof HTMLDivElement).toBe(true);
        })
        
        it("return an element that has class 'book_details_front'", function() {
            const element = UI.createBookDetailsFrontContainerElement(elementsObj);
            expect(element.classList.contains('book_details_front')).toBe(true);
        })

        it("return an element that has one child element", function() {
            const element = UI.createBookDetailsFrontContainerElement(elementsObj);
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
            const element = UI.createBookDetailsFrontContainerElement(elementsObj);
            expect(element instanceof HTMLDivElement).toBe(true);
        })
        
        it("return an element that has class 'book_details_front'", function() {
            const element = UI.createBookDetailsFrontContainerElement(elementsObj);
            expect(element.classList.contains('book_details_front')).toBe(true);
        })

        it("return an element that has one child element", function() {
            const element = UI.createBookDetailsFrontContainerElement(elementsObj);
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
            const element = UI.createBookDetailsFrontContainerElement(elementsObj);
            expect(element instanceof HTMLDivElement).toBe(true);
        })
        
        it("return an element that has class 'book_details_front'", function() {
            const element = UI.createBookDetailsFrontContainerElement(elementsObj);
            expect(element.classList.contains('book_details_front')).toBe(true);
        })

        it("return an element that has three child elements", function() {
            const element = UI.createBookDetailsFrontContainerElement(elementsObj);
            expect(element.children.length).toBe(3);
        })
    })
})

describe("createBookDetailsBackContainerElement method", function() {
    
    describe("not given anything", function() {

        it("return a undefined'", function() {
            const element = UI.createBookDetailsBackContainerElement();
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
            const element = UI.createBookDetailsBackContainerElement(elementsObj);
            expect(element instanceof HTMLDivElement).toBe(true);
        })
        
        it("return an element that has class 'book_details_back'", function() {
            const element = UI.createBookDetailsBackContainerElement(elementsObj);
            expect(element.classList.contains('book_details_back')).toBe(true);
        })

        it("return an element that has zero child elements", function() {
            const element = UI.createBookDetailsBackContainerElement(elementsObj);
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
            const element = UI.createBookDetailsBackContainerElement(elementsObj);
            expect(element instanceof HTMLDivElement).toBe(true);
        })
        
        it("return an element that has class 'book_details_back'", function() {
            const element = UI.createBookDetailsBackContainerElement(elementsObj);
            expect(element.classList.contains('book_details_back')).toBe(true);
        })

        it("return an element that has one child element", function() {
            const element = UI.createBookDetailsBackContainerElement(elementsObj);
            expect(element.children.length).toBe(1);
        })

        it("return an element with one child element that has class 'book_details_back_description'", function() {
            const element = UI.createBookDetailsBackContainerElement(elementsObj);
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
            const element = UI.createBookDetailsBackContainerElement(elementsObj);
            expect(element instanceof HTMLDivElement).toBe(true);
        })
        
        it("return an element that has class 'book_details_back'", function() {
            const element = UI.createBookDetailsBackContainerElement(elementsObj);
            expect(element.classList.contains('book_details_back')).toBe(true);
        })

        it("return an element that has one child element", function() {
            const element = UI.createBookDetailsBackContainerElement(elementsObj);
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
            const element = UI.createBookDetailsBackContainerElement(elementsObj);
            expect(element instanceof HTMLDivElement).toBe(true);
        })
        
        it("return an element that has class 'book_details_back'", function() {
            const element = UI.createBookDetailsBackContainerElement(elementsObj);
            expect(element.classList.contains('book_details_back')).toBe(true);
        })

        it("return an element that has two child element", function() {
            const element = UI.createBookDetailsBackContainerElement(elementsObj);
            expect(element.children.length).toBe(2);
        })

        it("return an element with one child element that has class 'book_details_back_description'", function() {
            const element = UI.createBookDetailsBackContainerElement(elementsObj);
            expect(element.children[0].classList.contains('book_details_back_description')).toBe(true);
        })
    })
})

describe("expandSearchForm method", function() {
    let footerElement,
    searchToggleElement;

    beforeEach(function() {
        footerElement = document.createElement('footer');
        searchToggleElement = document.createElement('button');
        UI.collapseSearchForm(footerElement, searchToggleElement);
    })

    describe("given a HTMLELEMENT for the footerElement parameter and for the searchToggleElement parameter", function() {
        it("with class 'footer--collapsed', remove footer--collapsed class to footerElement", function() {
            UI.expandSearchForm(footerElement, searchToggleElement);
            expect(footerElement.classList.contains('footer--collapsed')).toBe(false);
        })

        it("set dataset.collapsed attribute to false", function() {
            UI.expandSearchForm(footerElement, searchToggleElement);
            expect(searchToggleElement.dataset.collapsed).toBe("false");
        })
    
        it("remove search_toggle--collapsed class to searchToggleElement", function() {
            UI.expandSearchForm(footerElement, searchToggleElement);
            expect(searchToggleElement.classList.contains('search_toggle--collapsed')).toBe(false);
        })
    
        it("set innerText of searchToggleElement to 'Collapse Search'", function() {
            UI.expandSearchForm(footerElement, searchToggleElement);
            expect(searchToggleElement.innerText).toBe('Collapse Search');
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
            UI.collapseSearchForm(footerElement, searchToggleElement);
            expect(footerElement.classList.contains('footer--collapsed')).toBe(true);
        })

        it("add search_toggle--collapsed class to searchToggleElement", function () {
            UI.collapseSearchForm(footerElement, searchToggleElement);
            expect(searchToggleElement.classList.contains('search_toggle--collapsed')).toBe(true);
        })

        it("set dataset.collapsed attribute to true on searchToggleElement", function () {
            UI.collapseSearchForm(footerElement, searchToggleElement);
            expect(searchToggleElement.dataset.collapsed).toBe("true");
        })

        it("set innerText of searchToggleElement to 'Expand Search'", function () {
            UI.collapseSearchForm(footerElement, searchToggleElement);
            expect(searchToggleElement.innerText).toBe('Expand Search');
        })
    })
})

describe('showExpandStateForFooterElement method', function() {
    describe('given a HTMLElement', function() {
        beforeEach(function() {
            footerToggleElement = document.createElement('button');
            UI.showCollapseStateForFooterElement(footerToggleElement);
        })
    
        it("remove footer--collapsed class to footerToggleElement", function() {
            UI.showExpandStateForFooterElement(footerToggleElement);
            expect(footerToggleElement.classList.contains('footer--collapsed')).toBe(false);
        })
    })
})

describe('showExpandStateForSearchToggleElement method', function() {
    describe('given a HTMLElement', function() {
        beforeEach(function() {
            searchToggleElement = document.createElement('button');
            UI.showCollapseStateForSearchToggleElement(searchToggleElement);
        })

        it("set dataset.collapsed attribute to false", function() {
            UI.showExpandStateForSearchToggleElement(searchToggleElement);
            expect(searchToggleElement.dataset.collapsed).toBe('false');
        })
    
        it("remove search_toggle--collapsed class to searchToggleElement", function() {
            UI.showExpandStateForSearchToggleElement(searchToggleElement);
            expect(searchToggleElement.classList.contains('search_toggle--collapsed')).toBe(false);
        })
    
        it("set innerText of searchToggleElement to 'Collapse Search'", function() {
            UI.showExpandStateForSearchToggleElement(searchToggleElement);
            expect(searchToggleElement.innerText).toBe('Collapse Search');
        })
    })
})

describe('showCollapseStateForFooterElement method', function() {
    describe('given a HTMLElement', function() {
        beforeEach(function() {
            footerToggleElement = document.createElement('button');
            UI.showExpandStateForFooterElement(footerToggleElement);
        })
    
        it("add footer--collapsed class to footerToggleElement", function() {
            UI.showCollapseStateForFooterElement(footerToggleElement);
            expect(footerToggleElement.classList.contains('footer--collapsed')).toBe(true);
        })
    })
})

describe('showCollapseStateForSearchToggleElement method', function() {
    describe('given a HTMLElement', function() {
        beforeEach(function() {
            searchToggleElement = document.createElement('button');
            UI.showExpandStateForSearchToggleElement(searchToggleElement);
        })

        it("set dataset.collapsed attribute to true", function() {
            UI.showCollapseStateForSearchToggleElement(searchToggleElement);
            expect(searchToggleElement.dataset.collapsed).toBe('true');
        })
    
        it("add search_toggle--collapsed class to searchToggleElement", function() {
            UI.showCollapseStateForSearchToggleElement(searchToggleElement);
            expect(searchToggleElement.classList.contains('search_toggle--collapsed')).toBe(true);
        })
    
        it("set innerText of searchToggleElement to 'Expand Search'", function() {
            UI.showCollapseStateForSearchToggleElement(searchToggleElement);
            expect(searchToggleElement.innerText).toBe('Expand Search');
        })
    })
})