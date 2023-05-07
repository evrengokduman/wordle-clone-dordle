import { WORDS } from "./words.js";
const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = []; // array of letters in current guess
let nextLetter = 0; // index of next letter to guess
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]; // random word from WORDS array
console.log(rightGuessString);

function initBoard() {
  let board = document.getElementById("game-board");
  row.className = "letter-row"; // this will be the class name for all rows
  for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
    // loop through the number of guesses
    let row = document.createElement("div");
    row.className = "letter-row";

    for (let j = 0; j < 5; j++) {
      // loop through the number of boxes
      let box = document.createElement("div"); // create a div for each box
      box.className = "letter-box"; // create a div for each box
      row.appendChild(box); // append box to row
    }
  }
}

initBoard();
