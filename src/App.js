import './Bootstrap/css/bootstrap.css';
import './App.css';
import answerList from './wordle-answers.txt';
import guessList from './wordle-guesses.txt';

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

function getInput() {
  const input = prompt("Guess the word: _ _ _ _ _");
  return input;
}

function generateWord(list) {
  // Pick random word from list
  const NUMBER_OF_WORDS = list.length - 1;
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

  for (let i = 0; i < word.length; i++) {
    if (inputArr[i] === wordArr[i]) {
      //console.log("correct letter and pos: " + inputArr[i]);
      updatedWord[i] = inputArr[i];
    } else if (wordArr.includes(inputArr[i])) {
      //console.log("correct letter / wrong pos: " + inputArr[i]);
      updatedWord[i] = "*" + inputArr[i];
    } else {
      //console.log("wrong letter: " + inputArr[i]);
      updatedWord[i] = "_";
    }
  }

  // Return str with chars and letters
  let formattedWord = updatedWord.join(['  ']);
  return formattedWord;
}

function combineList(...lists) {
  let totalList = [];

  lists.forEach(list => {
    totalList.push(...list)
  });

  return totalList;
}

function validateWord(tList, guessedWord) {
  // Check to see if input is in word list
  if (tList.includes(guessedWord)) {
    return true;
  } else {
    return false;
  }

}

function Logic() {
  let newArr = [];

  // Generate total word list
  readFile(guessList).then(list => {
    newArr = list;
  });

  (readFile(answerList).then(list => {
    // Combine both lists so that user can guess words from each
    let totalList = combineList(newArr, list);

    // Generate word from answer list
    const WORD_OF_DAY = generateWord(list);
    console.log("Word of day: " + WORD_OF_DAY);

    const TOTAL_GUESSES = 6;
    let win = false;
    let currentGuess = 0;
    let guessesLeft = 0;

    let input = getInput();

    while (win === false) {
      // Check to see if input is in word list
      let isValidWord = validateWord(totalList, input);

      // Check for match
      let match = findMatch(WORD_OF_DAY, input);
      if (match === true) {
        alert("You guessed the word!");
        break;
      } 
      
      if (isValidWord === false) {
        alert("word is not in word list");
        input = getInput();
      } else if (isValidWord === true) {
        // Update word count if valid guess
        currentGuess++;
        guessesLeft = TOTAL_GUESSES - currentGuess;

        // End game after x guesses
        if (currentGuess === TOTAL_GUESSES) {
          alert("Better luck next time. The word was: " + WORD_OF_DAY.toUpperCase());
          break;
        } else {
          alert(`WRONG!!! You have ${guessesLeft} guesses left.`);

          // CHECK TO SEE IF ANY LETTERS MATCH
          let updatedWord = containsLetter(WORD_OF_DAY, input);
          input = prompt(updatedWord);
        }

      }

    }
    
  }));

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="text-center w-50 bg-primary rounded">
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

