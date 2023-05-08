import { WORDS } from "./words.js";

const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = []; // array of letters in current guess
let nextLetter = 0; // index of next letter to guess
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]; // random word from WORDS array
console.log(rightGuessString);

//generates rows, gives the class
function initBoard() {
  let board = document.getElementById("game-board");
  //this loop, each time it runs, it's gonna create a row with a class of letterRow
  for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
    console.log("first loop");
    let row = document.createElement("div");
    row.className = "letter-row";
    //loop 5 times and creates boxes and it's gonna nest each of those boxes inside of row
    for (let j = 0; j < 5; j++) {
      console.log("second loop");
      let box = document.createElement("div");
      box.className = "letter-box";
      row.appendChild(box);
    }
    //what is the problem here?
    board.appendChild(row);
  }
}
console.log("done");
initBoard();
