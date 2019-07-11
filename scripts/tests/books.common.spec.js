let Common = window.Books.Common;

describe("isUserInputValid method", function() {

    it("not given anything, return undefined", function () {
        const isUserInputValid = Common.isUserInputValid();
        expect(isUserInputValid).toBe(undefined);
    })

    it("not given a RegEx type, return undefined", function () {
        let regexPatternToMatch = '',
            userInput = '';

        const isUserInputValid = Common.isUserInputValid(regexPatternToMatch, userInput);
        expect(isUserInputValid).toBe(undefined);
    })

    it("not given userInput, return undefined", function () {
        let regexPatternToMatch,
            userInput;

        const isUserInputValid = Common.isUserInputValid(regexPatternToMatch);
        expect(isUserInputValid).toBe(undefined);
    })

    it("given regex with matching data, return true", function() {
        let regexPatternToMatch = /abc/g,
            userInput = 'My favorite three letters are: abc. However, I have three more too.';

            const isUserInputValid = Common.isUserInputValid(regexPatternToMatch, userInput);
            expect(isUserInputValid).toBe(true);
    })

    it("given regex with nonmatching data, return false", function() {
        let regexPatternToMatch = /abc/g,
            userInput = 'My favorite three letters are: def. However, I have three more too.';

            const isUserInputValid = Common.isUserInputValid(regexPatternToMatch, userInput);
            expect(isUserInputValid).toBe(false);
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