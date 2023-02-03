import './Bootstrap/css/bootstrap.css';
import './App.css';
import answerList from './wordle-answers.txt';
import guessList from './wordle-guesses.txt';

// creates instance of App
function App() {
  return (
    <div className="App">
      <h1>Wordle</h1>
    </div>
  );
}

// gets data from text files
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

// gets input from users
function getInput() {
  const input = prompt("Guess the word: _ _ _ _ _");
  return input;
}

// picks correct answer at random
function generateWord(list) {
  // Pick random word from list
  const NUMBER_OF_WORDS = list.length - 1;
  let wordIndex = Math.floor(Math.random() * NUMBER_OF_WORDS);

  return list[wordIndex];
}

// checks user input for correct answer
function findMatch(WORD_OF_DAY, input) {
  return WORD_OF_DAY === input;
}

// checks user input for correct letter
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

// merges lists
function combineList(...lists) {
  let totalList = [];

  lists.forEach(list => {
    totalList.push(...list)
  });

  return totalList;
}

// checks to see if input is valid
function validateWord(tList, guessedWord) {
  return tList.includes(guessedWord);
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
    <div id="container">
    <div id="gameBoard">
        <div class="row">
            <div class="box"><input type="text" maxlength="1"/></div>
            <div class="box"><input type="text" maxlength="1"/></div>
            <div class="box"><input type="text" maxlength="1"/></div>
            <div class="box"><input type="text" maxlength="1"/></div>
            <div class="box"><input type="text" maxlength="1"/></div>
            <div class="box"><input type="text" maxlength="1"/></div>
        </div>

        <div class="row">
            <div class="box"><input type="text" maxlength="1"/></div>
            <div class="box"><input type="text" maxlength="1"/></div>
            <div class="box"><input type="text" maxlength="1"/></div>
            <div class="box"><input type="text" maxlength="1"/></div>
            <div class="box"><input type="text" maxlength="1"/></div>
            <div class="box"><input type="text" maxlength="1"/></div>
        </div>

        <div class="row">
            <div class="box"><input type="text" maxlength="1"/></div>
            <div class="box"><input type="text" maxlength="1"/></div>
            <div class="box"><input type="text" maxlength="1"/></div>
            <div class="box"><input type="text" maxlength="1"/></div>
            <div class="box"><input type="text" maxlength="1"/></div>
            <div class="box"><input type="text" maxlength="1"/></div>
        </div>

        <div class="row">
            <div class="box"><input type="text" maxlength="1"/></div>
            <div class="box"><input type="text" maxlength="1"/></div>
            <div class="box"><input type="text" maxlength="1"/></div>
            <div class="box"><input type="text" maxlength="1"/></div>
            <div class="box"><input type="text" maxlength="1"/></div>
            <div class="box"><input type="text" maxlength="1"/></div>
        </div>

        <div class="row">
            <div class="box"><input type="text" maxlength="1"/></div>
            <div class="box"><input type="text" maxlength="1"/></div>
            <div class="box"><input type="text" maxlength="1"/></div>
            <div class="box"><input type="text" maxlength="1"/></div>
            <div class="box"><input type="text" maxlength="1"/></div>
            <div class="box"><input type="text" maxlength="1"/></div>
        </div>
    
      

    </div>
</div>
  );
}

export {App, Logic}

