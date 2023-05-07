import { WORDS } from "./words.js";
const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = []; // array of letters in current guess
let nextLetter = 0; // index of next letter to guess
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]; // random word from WORDS array
console.log(rightGuessString);
