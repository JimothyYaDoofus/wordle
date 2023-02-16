import React from "react";
import { handleKeyPress } from "./App";

function KeyBoard() {
	let event = "";
	return (
		<div id="keyboard">
		<div className="base">
			<div className="line">
				<div className="key" onClick={() => handleKeyPress(event, "Q")}>Q</div>
				<div className="key" onClick={() => handleKeyPress(event, "W")}>W</div>
				<div className="key" onClick={() => handleKeyPress(event, "E")}>E</div>
				<div className="key" onClick={() => handleKeyPress(event, "R")}>R</div>
				<div className="key" onClick={() => handleKeyPress(event, "T")}>T</div>
				<div className="key" onClick={() => handleKeyPress(event, "Y")}>Y</div>
				<div className="key" onClick={() => handleKeyPress(event, "U")}>U</div>
				<div className="key" onClick={() => handleKeyPress(event, "I")}>I</div>
				<div className="key" onClick={() => handleKeyPress(event, "O")}>O</div>
				<div className="key" onClick={() => handleKeyPress(event, "P")}>P</div>
			</div>
			<div className="line">
				<div className="key" onClick={() => handleKeyPress(event, "A")}>A</div>
				<div className="key" onClick={() => handleKeyPress(event, "S")}>S</div>
				<div className="key" onClick={() => handleKeyPress(event, "D")}>D</div>
				<div className="key" onClick={() => handleKeyPress(event, "F")}>F</div>
				<div className="key" onClick={() => handleKeyPress(event, "G")}>G</div>
				<div className="key" onClick={() => handleKeyPress(event, "H")}>H</div>
				<div className="key" onClick={() => handleKeyPress(event, "J")}>J</div>
				<div className="key" onClick={() => handleKeyPress(event, "K")}>K</div>
				<div className="key" onClick={() => handleKeyPress(event, "L")}>L</div>
			</div>
			<div className="line">
				<div id="enter" onClick={() => handleKeyPress(event, "enter")}>Enter</div>
				<div className="key" onClick={() => handleKeyPress(event, "Z")}>Z</div>
				<div className="key" onClick={() => handleKeyPress(event, "X")}>X</div>
				<div className="key" onClick={() => handleKeyPress(event, "C")}>C</div>
				<div className="key" onClick={() => handleKeyPress(event, "V")}>V</div>
				<div className="key" onClick={() => handleKeyPress(event, "B")}>B</div>
				<div className="key" onClick={() => handleKeyPress(event, "N")}>N</div>
				<div className="key" onClick={() => handleKeyPress(event, "M")}>M</div>
				<div id="backspace" onClick={() => handleKeyPress(event, "backspace")}>Del</div>
			</div>

		</div>
		</div>
	);
}

export default KeyBoard;