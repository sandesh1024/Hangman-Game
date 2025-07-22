const wordsWithHints = [
  { word: "elephant", hint: "A large animal with a trunk" },
  { word: "giraffe", hint: "Tall animal with a long neck" },
  { word: "dolphin", hint: "Smart sea creature" },
  { word: "penguin", hint: "Bird that can't fly but swims" },
  { word: "kangaroo", hint: "Australian animal that hops" },
  { word: "zebra", hint: "Striped African animal" }
];

let selected = wordsWithHints[Math.floor(Math.random() * wordsWithHints.length)];
let word = selected.word.toUpperCase();
let hint = selected.hint;

const blanksParent = document.querySelector(".blanks_parent");
const buttonsParent = document.querySelector(".buttons-parent");
const hintDiv = document.getElementById("hint");
const playAgainBtn = document.getElementById("play-again");

let guessedLetters = [];
let wrongGuesses = 0;

function displayWord() {
  blanksParent.innerHTML = "";
  for (let letter of word) {
    const letterEl = document.createElement("p");
    letterEl.textContent = guessedLetters.includes(letter) ? letter : "";
    blanksParent.appendChild(letterEl);
  }
}

function createButtons() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let letter of alphabet) {
    const button = document.createElement("button");
    button.textContent = letter;
    button.onclick = () => handleGuess(letter, button);
    buttonsParent.appendChild(button);
  }
}

function handleGuess(letter, button) {
  button.disabled = true;

  if (word.includes(letter)) {
    guessedLetters.push(letter);
    button.classList.add("greenBtn");
  } else {
    wrongGuesses++;
    button.classList.add("redBtn");
    const part = document.querySelector(`.class-${wrongGuesses}`);
    if (part) part.style.visibility = "visible";
  }

  displayWord();
  checkGameStatus();
}

function checkGameStatus() {
  if ([...word].every(letter => guessedLetters.includes(letter))) {
    setTimeout(() => {
      alert("🎉 You won!");
      playAgainBtn.style.display = "inline-block";
    }, 100);
  } else if (wrongGuesses >= 10) {
    setTimeout(() => {
      alert(`💀 Game Over! The word was: ${word}`);
      playAgainBtn.style.display = "inline-block";
    }, 100);
  }
}

function initGame() {
  guessedLetters = [];
  wrongGuesses = 0;
  buttonsParent.innerHTML = "";
  blanksParent.innerHTML = "";
  playAgainBtn.style.display = "none";
  hintDiv.textContent = "Hint: " + hint;

  for (let i = 1; i <= 10; i++) {
    const part = document.querySelector(`.class-${i}`);
    if (part) part.style.visibility = "hidden";
  }

  displayWord();
  createButtons();
}

playAgainBtn.onclick = () => {
  location.reload();
};

initGame();
