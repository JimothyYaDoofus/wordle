import './Bootstrap/css/bootstrap.css';
import './App.css';
import React from 'react';
import answerList from './wordle-answers.txt';
import guessList from './wordle-guesses.txt';
import KeyBoard from './KeyBoard';
import Leaderboard from './Leaderboard';
import { createKey, updateData } from './Session';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


let wOfD = "";
let tList = "";

let pos = 0;
let rowStart = 0;
let rowEnd = rowStart + 4;

let noLetter = false;

function focusCurrent() {
  let inputCurrent = document.getElementsByClassName("guessBox")[pos];
  inputCurrent.disabled = false;
  inputCurrent.focus();
}

// Differentiate between event and str params
function handleKeyPress(event, letter) {
  
  if(event === "" && (letter !== "backspace" && letter !== "enter")) {
    let inputCurrent = document.getElementsByClassName("guessBox")[pos];
    inputCurrent.value = letter;
  } else if (event.key === "Enter" || (letter === "enter")) {
    // Virtual enter key pressed
    handleClick();
  }

  const regex = /^[a-zA-Z]+$/;
  let inputCurrent = document.getElementsByClassName("guessBox")[pos];

  if (pos === rowStart && letter === "backspace" && pos !== rowEnd) {
    inputCurrent.value = "";
  } else if (letter === "backspace" && regex.test(inputCurrent.value) === false) {
    pos--;
    focusCurrent();
  } else if (letter === "backspace"  && regex.test(inputCurrent.value) && pos !== rowEnd) {
    inputCurrent.value = "";
    pos--;
    focusCurrent();
  } 

  else if (letter === "backspace"  && noLetter === false && pos === rowEnd) {
    setTimeout(() => {
      inputCurrent.value = "";
    }, 1); 
    noLetter = true;
  }

  else if (letter === "backspace" && noLetter === true && pos === rowEnd) {
    pos--;
    focusCurrent();
    noLetter = false;
    inputCurrent.value = "";
  }

  if ((event.key === "Backspace") && regex.test(inputCurrent.value) && pos !== rowStart) {
        setTimeout(() => {
          pos--;
          focusCurrent();
        }, 1); 

  } else if ((event.key === "Backspace") && regex.test(inputCurrent.value) === false && pos !== rowEnd && pos !== rowStart) {
    setTimeout(() => {
      pos--;
      focusCurrent();
    }, 1);

  } else if ((event.key === "Backspace") && noLetter === false && pos !== rowStart) {
    noLetter = true;

  } else if ((event.key === "Backspace") && noLetter === true) {
    setTimeout(() => {
      pos--;
      focusCurrent();
      noLetter = false;
    }, 1);
  }
  
  // Auto tab -- if not end of row and key was not backspace
  if (pos !== rowEnd && event.key !== "Backspace" && letter !== "backspace" && event.key !== "Enter" && letter !== "enter") {
    pos++;

    setTimeout(() => {
      focusCurrent();
      // Disable previous box
      let inputPrevious = document.getElementsByClassName("guessBox")[pos - 1];
      inputPrevious.disabled = true;
    }, 1);
  }
  
}

function handleClick() {

  let letters = document.getElementsByClassName("guessBox");
  let guessedWord = "";

  for (let i = rowStart; i < rowEnd + 1; i++) {
    guessedWord += letters[i].value;
  }

  guessedWord = guessedWord.toLowerCase();

  console.log("WORD OF DAY: " + wOfD);
  console.log("Guessed Word: " + guessedWord);
  console.log(tList);

  // Check to see if input is in word list
  let isValidWord = validateWord(tList, guessedWord);

  // Check for match
  let match = findMatch(wOfD, guessedWord);
  if (match === true) {
    // Color code letters
    colorCode(wOfD, guessedWord);

    toast.success('You guessed the word!', {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2500

    })

    let win = true;
    updateData(win);

    setTimeout(reloadPage, 3000);

  } else if (isValidWord === false) {

    toast.error('Word is not in word list', { 
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2500
    })

    // Refocus box -- 
    let input = document.getElementsByClassName("guessBox")[pos];
    input.disabled = false;
    input.focus();

  } else if (isValidWord === true) {
    // color code letters
    colorCode(wOfD, guessedWord);
    // End game case
    if (rowEnd !== 29) {
      // Update rows
      rowStart = rowEnd + 1;


      // Switch row (focus nextBox)
      let inputNext = document.getElementsByClassName("guessBox")[rowStart];
      inputNext.disabled = false;
      inputNext.focus();

      // color code boxes in row based on guess

      // Disable last box .. rowEnd
      let inputPrevious = document.getElementsByClassName("guessBox")[rowEnd];
      inputPrevious.disabled = true;

      rowEnd = rowStart + 4;
      pos++;

    } else {

      toast('Better luck next time. The word was: ' + wOfD.toUpperCase(), {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2500
      })

      let win = false;
      updateData(win);

      setTimeout(reloadPage, 3000);
    }

  }

}

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      isDisabled: true,
      selectedBox: 0,
    }

  }

  // Auto focus first box after boxes render
  componentDidMount() {
    let box = document.getElementsByClassName("guessBox")[0];
    box.disabled = false;
    box.focus();
  }

  render() {
    return (
      <div className="box">
        <input 
          type="text" 
          inputMode='none'
          maxLength="1"
          className='guessBox'
          disabled={this.state.isDisabled}
          onKeyDown={(e) => {isAlpha(e)}}
        >
        </input>
        {this.state.value}
      </div>
    );
  }
}

function isAlpha(event) {
  if (event.key !== "Enter" && event.key !== "Delete") {
    let inputCurrent = document.getElementsByClassName("guessBox")[pos];
    inputCurrent.value = "";
  }

  let rand = "";
  const regex = /^[a-zA-Z]+$/;

  if (regex.test(event.key)) {
    handleKeyPress(event, rand);
  } else {
    let inputCurrent = document.getElementsByClassName("guessBox")[pos];
    inputCurrent.value = " ";
  }

}

class Gameboard extends React.Component {

  renderBox(i) {
    return (
      <Box
        value={i}
      />
    );
  }

  render() {
    return (
      <div className="d-flex flex-column text-center align-items-center justify-content-center p-2">
        <div className="row">
          {this.renderBox(0)}
          {this.renderBox(1)}
          {this.renderBox(2)}
          {this.renderBox(3)}
          {this.renderBox(4)}
        </div>
        <div className="row">
          {this.renderBox(5)}
          {this.renderBox(6)}
          {this.renderBox(7)}
          {this.renderBox(8)}
          {this.renderBox(9)}
        </div>
        <div className="row">
          {this.renderBox(10)}
          {this.renderBox(11)}
          {this.renderBox(12)}
          {this.renderBox(13)}
          {this.renderBox(14)}
        </div>
        <div className="row">
          {this.renderBox(15)}
          {this.renderBox(16)}
          {this.renderBox(17)}
          {this.renderBox(18)}
          {this.renderBox(19)}
        </div>
        <div className="row">
          {this.renderBox(20)}
          {this.renderBox(21)}
          {this.renderBox(22)}
          {this.renderBox(23)}
          {this.renderBox(24)}
        </div>
        <div className="row">
          {this.renderBox(25)}
          {this.renderBox(26)}
          {this.renderBox(27)}
          {this.renderBox(28)}
          {this.renderBox(29)}
        </div>
        <KeyBoard></KeyBoard>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wOfD: null,
      tList: null,
    }

  }

  componentDidMount() {
    document.getElementById("allContent").addEventListener("click", function() {
      let inputCurrent = document.getElementsByClassName("guessBox")[pos];
      inputCurrent.disabled = false;
      inputCurrent.focus();
    });
  }

  renderTutorial() {
    let ruleContainer = document.getElementsByClassName('ruleContainer')[0];

    if (ruleContainer.textContent === "") {
      const h1 = document.createElement("h5");
      const p = document.createElement("p");
      const header = document.createTextNode("How To Play");
      const body1 = document.createTextNode("The Object of the Game is to Guess a 5 Letter Word.");
      const body2 = document.createTextNode(" You will have six opportunities to guess this word. Along the way there will be help.");
      const body3 = document.createTextNode(" If one of the letters are Green it is in the correct spot. If one of the letters are yellow it is in the word but, in the wrong spot. If there is no color it is not used in the word.");

      h1.appendChild(header);
      p.appendChild(body1);
      p.appendChild(body2);
      p.appendChild(body3);
      ruleContainer.appendChild(h1);
      ruleContainer.appendChild(p);
    } else {
      ruleContainer.textContent = "";
    }
  }

  render() {
    return (
      <div id="allContent" className="d-flex flex-column p-0 ms-2 me-2">
        <div className="w-100 justify-content-end border-bottom border-secondary">
          <div className='row m-2'>
            <div className='col text-start d-flex flex-row m-1 p-0'>
              <h2 id="test" className='ms-0 mt-0 mb-0 p-2 justify-content-center align-items-center'>Wordle</h2>
            </div>
            <div className='col justify-content-end d-flex flex-row m-1 p-0'>
              <button id="btnTest" className='btn btn-secondary m-2 p-2 h-60' onClick={this.renderTutorial}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-question-diamond" viewBox="0 0 16 16">
  <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"/>
  <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
</svg></button>
              <Leaderboard></Leaderboard>
            </div>
          </div>
        </div>

        <div className='ruleContainer pt-3'></div>
        <Gameboard/>

      </div>
    );
  }
}

logic();
function logic() {
  // Create session key
  createKey();

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

    wOfD = WORD_OF_DAY;
    tList = totalList;
    
  }));
}

// Get data from text files
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

// Select random word
function generateWord(list) {
  const NUMBER_OF_WORDS = list.length - 1;
  let wordIndex = Math.floor(Math.random() * NUMBER_OF_WORDS);

  return list[wordIndex];
}

// Merge lists
function combineList(...lists) {
  let totalList = [];

  lists.forEach(list => {
    totalList.push(...list)
  });

  return totalList;
}

// Checks to see if input is valid
function validateWord(tList, guessedWord) {
  return tList.includes(guessedWord);
}

// Checks user input for correct answer
function findMatch(WORD_OF_DAY, input) {
  return WORD_OF_DAY === input;
}

function colorCode(wOfD, guessedWord) {
  let input = document.getElementsByClassName("guessBox");

  for (let i = 0; i < 5; i++) {
    if (guessedWord[i] === wOfD[i]) {
      input[rowStart + i].style.backgroundColor = "#538d4e";
    } else if (wOfD.includes(guessedWord[i])) {
      input[rowStart + i].style.backgroundColor = "#b59f3b";
    } else {
      input[rowStart + i].style.backgroundColor = "#3a3a3c";
    }
  }
}

function reloadPage() {
  window.location.reload(false);
}

export {handleKeyPress}
export default App;