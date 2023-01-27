import './Bootstrap/css/bootstrap.css';
import './App.css';

const WORDLE_GUESSES_NUM = 6;
const WORDLE_GUESSES_DICTIONARY = "./wordle-guesses";
const WORDLE_ANSWERS_DICTIONARY = "./wordle-answers";

function App() {
  return (
    <div className="App">
      <h1>Wordle</h1>
    </div>
  );
}

function Logic() {
  let win = false;
  while (win === false) {
    //let wordleAnswer = random.choice(open("./wordle-answers.txt").read().splitlines())
    //let guesses = []
    for (let i = 0; i < WORDLE_GUESSES_NUM; i++) {
      while (true) {
        // GET INPUT
        // if length of input = 5
          // if input in guesses, error
          // if input in guesses or answers dictionary, do something
          // else, error
        // else, error

        // add input to guesses
        break;
      }
      break;
    }
  }
  
  return (
    <p>Content Here</p>
  );
}

export {App, Logic}