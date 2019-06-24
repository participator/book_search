## Features
- User can type in a query and display a list of books matching that query.
- Each item in the list should include the book's:
    - author
    - title
    - publishing company
    - a picture of the book
    - Link to more information about the book
        - could be on a page within your application
        - or link out to an external site

## Approach to Solution
- Simplfy requirements
- Research Google Books API
    - Learn how to interact with it
        > I'm looking for a JavaScript interface that does not need a server-side code
        
        > If unavailable, I'll use node.js to connect with the API
- Build UI
    - [Design UI](https://www.figma.com/file/DRSrrfXVc9ZoVuSelFQqq52L/8-Book-Search)
    - Implement in Code Using Static Query
    - Design changes made as book images did not look good as backgrounds
    - Add animations/transitions
- Research and Add Test
    - Chose Jasmine as testing framework as it appears to work in the browser

# Clarafications
- No public data is required
- Responsiveness is not required