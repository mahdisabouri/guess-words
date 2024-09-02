const inputs = document.querySelector(".inputs"),
  resetBtn = document.querySelector(".reset-btn"),
  hint = document.querySelector(".Hint span"),
  guessLeft = document.querySelector(".guess-left span"),
  wrongLetter = document.querySelector(".wrong-letter span"),
  typingInput = document.querySelector(".typing-input");

let word,
  maxGuesses,
  corrects = [],
  incorrects = [];

function randomword() {
  //getting random Object from wrdList
  let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
  // getting word of random object
  word = ranObj.word;
  // By default maxGusses value is 8 :
  maxGuesses = 8;
  corrects = [];
  incorrects = [];

  // console.log(word);

  hint.innerText = ranObj.hint;
  wrongLetter.innerText = incorrects;
  guessLeft.innerText = maxGuesses;

  let html = "";
  for (let i = 0; i < word.length; i++) {
    html += `<input type="text" disabled >`;
  }
  inputs.innerHTML = html;
}
randomword();

function initGame(e) {
  let key = e.target.value;
  if (
    key.match(/^[A-Za-z]+$/) &&
    !incorrects.includes(`${key}`) &&
    !corrects.includes(key)
  ) {
    // console.log(key);
    // if user letter found in the word :
    if (word.includes(key)) {
      // console.log("letter found")
      for (let i = 0; i < word.length; i++) {
        //show match letter in th input value :
        if (word[i] === key) {
          corrects.push(key);
          inputs.querySelectorAll("input")[i].value = key;
        }
      }
    } else {
      // decrement maxGuesses by 1 :
      maxGuesses--;
      incorrects.push(`${key}`);
    }
    guessLeft.innerText = maxGuesses;

    wrongLetter.innerText = incorrects;
  }
  typingInput.value = "";

  setTimeout(() => {
    // if user could found all letters:
    if (corrects.length === word.length) {
      alert(`Congrates ! You found the word ${word.toUpperCase()}`);
      // calling randomword func , so the game reset :
      randomword();
    } else if (maxGuesses < 1) {
      // if user couldn't found all letters:
      alert("Game Over! you don't have remaining Guesses");
      for (let i = 0; i < word.length; i++) {
        //show match letter in th input  :
        inputs.querySelectorAll("input")[i].value = word[i];
      }
    }
  });
}

resetBtn.addEventListener("click", randomword);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());
