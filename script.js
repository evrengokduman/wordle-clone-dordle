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

    for (let j = 0; j < 5; j++) {
      //this loop, each time it runs, it's gonna create a box with a class of letter-box
      console.log("second loop");
      let box = document.createElement("div");
      box.className = "letter-box";
      row.appendChild(box);
    }

    board.appendChild(row);
  }
}
console.log("done");
initBoard();

document.addEventListener("keyup", (e) => {
  if (guessesRemaining === 0) {
    return;
  }

  let pressedKey = String(e.key);
  if (pressedKey === "Backspace" && nextLetter !== 0) {
    //if you press backspace, it's gonna delete the letter
    deleteLetter();
    return;
  }

  if (pressedKey === "Enter") {
    //if you press enter, it's gonna check the guess
    checkGuess();
    return;
  }

  let found = pressedKey.match(/[a-z]/gi);
  if (!found || found.length > 1) {
    return; //if you press a key that's not a letter, it's gonna return
  } else {
    insertLetter(pressedKey); //if you press a letter, it's gonna insert the letter
  }
});

function insertLetter(pressedKey) {
  if (nextLetter === 5) {
    return;
  }
  pressedKey = pressedKey.toLowerCase();

  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]; //this is the row that we're on

  let box = row.children[nextLetter]; //this is the box that we're on
  box.textContent = pressedKey;
  box.classList.add("filled-box");
  currentGuess.push(pressedKey);
  nextLetter += 1;
}
