import './Bootstrap/css/bootstrap.css';
import './App.css';
import guessList from './wordle-guesses.txt';
import answerList from './wordle-answers.txt';

// const WORDLE_GUESSES_NUM = 6;
// const WORDLE_GUESSES_DICTIONARY = "./wordle-guesses";
// const WORDLE_ANSWERS_DICTIONARY = "./wordle-answers";
const NUMBER_OF_WORDS = 4;

function App() {
  return (
    <div className="App">
      <h1>Wordle</h1>
    </div>
  );
}

async function readFile(fileName) {
  let list = [];
  await fetch(fileName)
    .then(data => data.text())
    .then(text => {
      list = text.split("\n")
      .map(chars => chars.trim());
    });

  return list;
}

function printFile(list) {
  for (let i in list) {
    console.log(list[i]);
  }
}

function getInput() {
  const input = prompt("Guess the word: _ _ _ _ _");
  return input;
}

function generateWord(list) {
  // Pick random word from list
  let wordIndex = Math.floor(Math.random() * NUMBER_OF_WORDS);

  return list[wordIndex];
}

function findMatch(WORD_OF_DAY, input) {
  if (WORD_OF_DAY === input) {
    return true;
  } else {
    return false;
  }
}

function containsLetter(word, input) {
  // Check to see if userInput contains letter in WORD_OF_DAY
  let updatedWord = [];

  // Indicate if
    // letter is in wrong pos
    // letter is in correct pos
    // letter is not in word

  let wordArr = word.split("");
  let inputArr = input.split("");
  console.log(wordArr);
  console.log(inputArr);

  for (let i = 0; i < word.length; i++) {
    if (inputArr[i] === wordArr[i]) {
      console.log("correct letter and pos: " + inputArr[i]);
      updatedWord[i] = inputArr[i];
    } else if (wordArr.includes(inputArr[i])) {
      console.log("correct letter / wrong pos: " + inputArr[i]);
      updatedWord[i] = "*" + inputArr[i];
    } else {
      console.log("wrong letter: " + inputArr[i]);
      updatedWord[i] = "_";
    }
  }

  console.log(updatedWord);

  // Return str with chars and letters
  let formattedWord = updatedWord.join(['  ']);
  return formattedWord;
}

function Logic() {
  readFile(guessList).then(list => {
    // Logs list
    // printFile(list);

    const WORD_OF_DAY = generateWord(list);
    const TOTAL_GUESSES = 6;
    let win = false;
    let currentGuess = 0;
    let guessesLeft = 0;

    let input = getInput();

    while (win === false) {
      currentGuess++;
      guessesLeft = TOTAL_GUESSES - currentGuess;

      // Check for match
      let match = findMatch(WORD_OF_DAY, input);
      if (match === true) {
        alert("You guessed the word!");
        break;
      } else {
        alert(`WRONG!!! You have ${guessesLeft} guesses left.`);
        // CHECK TO SEE IF ANY LETTERS MATCH
        let updatedWord = containsLetter(WORD_OF_DAY, input);

        // Update input
        input = prompt(updatedWord);
      }

      // End game after x guesses
      if (currentGuess >= TOTAL_GUESSES) {
        alert("Better luck next time. You are out of attempts!");
        alert(WORD_OF_DAY);
        break;
      }
    }
  });

  return (
    <div className={"d-flex justify-content-center align-items-center"}>
      <div className={"text-center w-50 bg-primary rounded"}>
        <p>grid row</p>
        <p>grid row</p>
        <p>grid row</p>
        <p>grid row</p>
        <p>grid row</p>
        <p>grid row</p>
        <p>grid row</p>
        <p>grid row</p>
        <p>grid row</p>
        <p>grid row</p>
        <p>grid row</p>
        <p>grid row</p>
      </div>
    </div>
  );
}

export {App, Logic}