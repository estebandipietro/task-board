`npm run dev`: run the repo in dev mode
`npm run test`: run the test suite
`npm run coverage`: run test coverage

# Tasks Board
Using React, develop a Board with 4 columns:  `BACKLOG` `TODO` `DOING` `DONE`

## Considerations:
* Cards can only be moved by one column in any direction.
* There can only be two cards in DOING at any time
* Once in Done, cards cannot go back
* Moving cards to DONE will trigger a confirmation dialog
* All actions on the board must be validated client-side
* Board to be stored in Local Storage

## Decision:
* The scaffolding is divided in:
  * components: holds the Board, Column and Card componenets
  * logic: has the validations rules file and the logic for the card movement
  * types: the types for all the app
  * utils: has a file for accessing the local storage
* Used '@hello-pangea/dnd' instead of 'react-beautiful-dnd' because of the lack of support and maintenance of the last one
* There is an implementation of the strategy pattern in validationsV2
* The example board data is placed in the App component
* For the sake of keep it simple, I didn't consider any user interaction besides moving the cards
