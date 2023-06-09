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
    deleteLetter(); //define here, code later
    return;
  }

  if (pressedKey === "Enter") {
    //if you press enter, it's gonna check the guess
    checkGuess(); //define here, code later
    return;
  }

  let found = pressedKey.match(/[a-z]/gi);
  if (!found || found.length > 1) {
    return; //if you press a key that's not a letter, it's gonna return
  } else {
    insertLetter(pressedKey); //if you press a letter, it's gonna insert the letter define here code later
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
  nextLetter++;
}

function deleteLetter() {
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining]; //this is the row that we're on
  let box = row.children[nextLetter - 1]; //this is the box that we're on
  box.textContent = "";
  box.classList.remove("filled-box");
  currentGuess.pop();
  nextLetter--;
}
//this function is gonna check the guess
/* Makes sure the guess is 5 letters
Makes sure the guess is a valid list
Checks each letter of the word and shades them
Tells the user about the end of the game */
function checkGuess() {
  let row = document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let guessString = "";
  let rightGuess = Array.from(rightGuessString); //turns the string into an array

  for (const val of currentGuess) {
    //for each value in currentGuess
    guessString += val;
  }
  if (guessString.length !== 5) {
    alert("Not enough letters!");
    return;
  }
  if (!WORDS.includes(guessString)) {
    alert("Word not in list!");
    return;
  }

  for (let i = 0; i < 5; i++) {
    //this loop is gonna check the guess
    let letterColor = "";
    let box = row.children[i];
    let letter = currentGuess[i];
    let letterPosition = rightGuess.indexOf(currentGuess[i]); //this is gonna check if the letter is in the right position
    if (letterPosition === -1) {
      //how to fix this?
      letterColor = "grey";
    } else {
      //if the letter is in the right position, it's gonna be green, if it's in the wrong position, it's gonna be yellow
      if (currentGuess[i] === rightGuess[i]) {
        letterColor = "green";
      } else {
        letterColor = "yellow";
      }
      rightGuess[letterPosition] = null; //this is gonna make sure that the letter is not gonna be checked again
    }
    let delay = 250 * i;
    setTimeout(() => {
      //this is gonna change the color of the box
      box.style.backgroundColor = letterColor;
      shadeKeyBoard(letter, letterColor);
    }, delay); //this is gonna change the color of the keyboard
  }

  if (guessString === rightGuessString) {
    alert("You win!");
    guessesRemaining = 0;
    return;
  } else {
    guessesRemaining--; // this is gonna decrease the guesses remaining
    currentGuess = []; //this is gonna reset the guess
    nextLetter = 0; //this is gonna reset the guess
    if (guessesRemaining === 0) {
      alert("You've run out of guesses! Game over!");
      alert(`The right word was: "${rightGuessString}"`);
    }
  }
  function shadeKeyBoard(letter, color) {
    //this is gonna change the color of the keyboard
    for (const elem of document.getElementsByClassName("keyboard-button")) {
      if (elem.textContent === letter) {
        //this is gonna check if the letter is in the keyboard
        let oldColor = elem.style.backgroundColor; //does it have a color?
        if (oldColor === "green") {
          return;
        }
        if (oldColor === "yellow" && color !== "green") {
          return;
        }
        elem.style.backgroundColor = color;
        break;
      }
    }
  }
}

document.getElementById("keyboard-cont").addEventListener("click", (e) => {
  const target = e.target;

  if (!target.classList.contains("keyboard-button")) {
    return;
  }
  let key = target.textContent;
  if (key === "Del") {
    key = "Backspace";
  }

  //for everything else

  document.dispatchEvent(new KeyboardEvent("keyup", { key: key })); //this is gonna dispatch a keyup event

  //we are creating a keyup event, mimicking a keyup event
});
