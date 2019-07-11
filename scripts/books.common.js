(function() {

    // Parent Namespace
    if (!window.Books) {
        const Books = {};
        window.Books = Books;
    }

    // Namespace
    if (Books && Books.Common) throw new Error('Collision when trying to load Books.Common module');
    const Common = {};
    Books.Common = Common;

    Common.isUserInputValid = (regexPatternToMatch, userInput) => {
        if (!regexPatternToMatch || 
            !regexPatternToMatch instanceof RegExp ||
            !userInput) return;

        return regexPatternToMatch.test(userInput);
    }

    Common.replaceHttpWithHttpsBasedWhenPageUrlIsHttp = (url, pageUrl) => {
        if (!url) return;

        let httpsUrl;
        if (pageUrl && pageUrl.startsWith('https:')) {
            httpsUrl = Common.replaceHttpWithHttps(url);
        }
        else if (window.location.href.startsWith('https:')) {
            httpsUrl = Common.replaceHttpWithHttps(url);
        }
        return httpsUrl;
    }

    Common.replaceHttpWithHttps = url => url.replace('http:', 'https:');

    Common.validateUrl = url => new URL(url).href;

    Common.encodeUrl = url => url && encodeURI(url);

    Object.prototype.isEmpty = function isEmpty() {
        for(var prop in this) {
            if (this.hasOwnProperty(prop)) {
                return false;
            }
        }
        return true;
    }

})()