import './Bootstrap/css/bootstrap.css';
import './App.css';
import React from 'react';
import answerList from './wordle-answers.txt';
import guessList from './wordle-guesses.txt';
import KeyBoard from './components/gameboard/KeyBoard';

let pos = 0;
let rowStart = 0;
let rowEnd = rowStart + 4;

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

  handleKeyPress(e) {
    if (e.key === "Backspace") {
      let inputCurrent = document.getElementsByClassName("guessBox")[pos];

      if (pos === 0 || pos === rowStart) {
        console.log("none");
      } else if (inputCurrent.value !== "") {
        console.log("contains text");
      } else {
        pos--;

        this.setState({ selectedBox: pos }, () => {
          let inputPrevious = document.getElementsByClassName("guessBox")[this.state.selectedBox + 1];
          inputPrevious.disabled = true;
  
          // Enable current box
          let ip = document.getElementsByClassName("guessBox")[this.state.selectedBox];
          ip.disabled = false;
          ip.focus();
        });

      }

    } else if (e.key === "Tab" && pos !== rowEnd) {
      pos++;

      this.setState({ selectedBox: pos }, () => {
        // Disable previous box
        let inputPrevious = document.getElementsByClassName("guessBox")[this.state.selectedBox - 1];
        inputPrevious.disabled = true;
  
        // Enable next/current box
        let inputCurrent = document.getElementsByClassName("guessBox")[this.state.selectedBox];
        inputCurrent.disabled = false;
      });

    }

    else if (pos === rowEnd) {
      // Block next row
      let inputNext = document.getElementsByClassName("guessBox")[pos + 1];
      console.log(this.state.selectedBox);
      if(inputNext) {
        inputNext.disabled = true;
      }

    }

  }

  render() {
    return (
      <div className="box">
        <input 
          type="text" 
          maxLength="1"
          className='guessBox'
          disabled={this.state.isDisabled}
          //onClick={() => this.props.onClick}
          //onChange={(e) => {this.handleChange(e)}}
          onKeyDown={(e) => {this.handleKeyPress(e)}}
        >
        </input>
        {this.state.value}
      </div>
    );
  }
}

class Gameboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vals: 0,

    };
  }


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
    this.logic();
  }

  logic() {
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

      // Update word of day
      this.setState({ wOfD: WORD_OF_DAY, tList: totalList});
      
    }));
  }

  handleClick(wOfD, tList) {
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
      alert("You guessed the word!");
      window.location.reload(false);
    } else if (isValidWord === false) {
      alert("Word is not in word list");

      let inputNext = document.getElementsByClassName("guessBox")[rowEnd];
      inputNext.disabled = false;
      inputNext.focus();

    } else if (isValidWord === true) {
      // End game case
      if (rowEnd !== 29) {
        // Update rows
        rowStart = rowEnd + 1;
        rowEnd = rowStart + 4;
        pos++;

        // Switch row (focus nextBox)
        let inputNext = document.getElementsByClassName("guessBox")[rowStart];
        inputNext.disabled = false;
        inputNext.focus();

        // color code boxes in row based on guess

        // Disable last box
        let inputPrevious = document.getElementsByClassName("guessBox")[rowEnd];
        inputPrevious.disabled = true;
      } else {
        alert("Better luck next time. The word was: " + wOfD.toUpperCase());
        window.location.reload(false);
      }

    }

  }

  render() {
    return (
      <div className="d-flex flex-column text-center align-items-center justify-content-center p-2">
        <h1>Wordle</h1>
        <Gameboard/>
        <button onClick={() => this.handleClick(this.state.wOfD, this.state.tList)} id="guess" className="btn btn-primary p-2 m-4">Check Word</button>
      </div>
    );
  }
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


    // Get input row from user (if 5 letters in row)
    document.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        console.log("enter key pressed");
      }
    });



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
  

}

export default function App() {
  return (
    <div className="App">
      <h1>WORDLE</h1>
      <Gameboard/>
    </div>
  )
}

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}



//export {Logic}

