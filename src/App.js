import './Bootstrap/css/bootstrap.css';
import './App.css';
import React from 'react';
import answerList from './wordle-answers.txt';
import guessList from './wordle-guesses.txt';
import KeyBoard from './KeyBoard';
import Session from './Session';
import Leaderboard from './Leaderboard';
import { createKey, updateData } from './Session';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
    const regex = /^[a-zA-Z]+$/;

    if (e.key === "Backspace") {
      let inputCurrent = document.getElementsByClassName("guessBox")[pos];

      if ((pos !== 0 && pos !== rowStart) && !(inputCurrent.value !== "" && pos === rowEnd)) {
        pos--;

        this.setState({ selectedBox: pos }, () => {
          let inputPrevious = document.getElementsByClassName("guessBox")[this.state.selectedBox + 1];
          inputPrevious.disabled = true;
  
          // Enable current box
          let ip = document.getElementsByClassName("guessBox")[this.state.selectedBox];
          ip.disabled = false;
          ip.value = "";
          ip.focus();
        });

      }

    } else if (e.key === "Enter" && pos === rowEnd) {
      //this.handleClick(this.state.wOfD, this.state.tList)

    } else if (regex.test(e.key) && pos !== rowEnd) {
      setTimeout(() => {
        pos++;

        this.setState({ selectedBox: pos }, () => {
          // Disable previous box
          let inputPrevious = document.getElementsByClassName("guessBox")[this.state.selectedBox - 1];
          inputPrevious.disabled = true;
    
          // Enable next/current box
          let inputCurrent = document.getElementsByClassName("guessBox")[this.state.selectedBox];
          inputCurrent.disabled = false;
          inputCurrent.focus();
        });
      }, 1);

    } else if (pos === rowEnd) {
      // Block next row
      let inputNext = document.getElementsByClassName("guessBox")[pos + 1];
      console.log(this.state.selectedBox);
      if(inputNext) {
        inputNext.disabled = true;
      }

    } else {
      e.preventDefault();
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



  // Only execute at end of session !!!
  testFunction() {
    new Session(1, 1, 0, 0);
  }

  logic() {
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

      // Update word of day
      this.setState({ wOfD: WORD_OF_DAY, tList: totalList});
      
    }));
  }

  handleClick(wOfD, tList) {
    //rm
    this.testFunction();

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
      // Update stats !!
      /////////////////////////////////
      let win = true;
      updateData(win);

      // also update stats on loss 
      /////////////////////////////////

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
        //alert("Better luck next time. The word was: " + wOfD.toUpperCase());
        let win = false;
        updateData(win);

        setTimeout(reloadPage, 3000);
      }

    }

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
      <div className="d-flex flex-column p-0 m-0">
        <div className="w-100 justify-content-end border-bottom border-secondary">
          <div className='row'>
            <div className='col text-start m-2'>
              <h2 className='m-2 p-2'>Wordle</h2>
            </div>
            <div className='col justify-content-end d-flex flex-row m-2'>
              <button className='btn btn-secondary m-2 p-2' onClick={this.renderTutorial}>Tutorial</button>
              <Leaderboard></Leaderboard>
            </div>
          </div>


        </div>


        <div className='ruleContainer pt-3'></div>

        <Gameboard/>
        <button onClick={() => this.handleClick(this.state.wOfD, this.state.tList)} id="guess" className="btn btn-primary p-2 m-4">Check Word</button>
      </div>
    );
  }
}

//function renderTutorial() {}

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

var coll = document.getElementsByClassName("leaderboard");
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

function colorCode(wOfD, guessedWord) {
  let input = document.getElementsByClassName("guessBox");

  for (let i = 0; i < 5; i++) {
  // rowStart is being assigned to entire row
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

export default App;