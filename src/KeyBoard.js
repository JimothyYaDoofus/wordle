import App from "./App";

//keyboard
const KeyBoard = () => {
	return (
		
		<div id="keyboard">
		<div className="base">
			<div className="line">
				<div className="key" onClick={() => onclick("W")}>W</div>
				<div className="key" onClick={() => onclick("Q")}>Q</div>
				<div className="key" onClick={() => onclick("E")}>E</div>
				<div className="key" onClick={() => onclick("R")}>R</div>
				<div className="key" onClick={() => onclick("T")}>T</div>
				<div className="key" onClick={() => onclick("Y")}>Y</div>
				<div className="key" onClick={() => onclick("U")}>U</div>
				<div className="key" onClick={() => onclick("I")}>I</div>
				<div className="key" onClick={() => onclick("O")}>O</div>
				<div className="key" onClick={() => onclick("P")}>P</div>
			</div>
			<div className="line">
				<div className="key" onClick={() => onclick("A")}>A</div>
				<div className="key" onClick={() => onclick("S")}>S</div>
				<div className="key" onClick={() => onclick("D")}>D</div>
				<div className="key" onClick={() => onclick("F")}>F</div>
				<div className="key" onClick={() => onclick("G")}>G</div>
				<div className="key" onClick={() => onclick("H")}>H</div>
				<div className="key" onClick={() => onclick("J")}>J</div>
				<div className="key" onClick={() => onclick("K")}>K</div>
				<div className="key" onClick={() => onclick("L")}>L</div>
			</div>
			<div className="line">
				<div id="enter" onClick={() => onclick("enter")}>Enter</div>
				<div className="key" onClick={() => onclick("Z")}>Z</div>
				<div className="key" onClick={() => onclick("X")}>X</div>
				<div className="key" onClick={() => onclick("C")}>C</div>
				<div className="key" onClick={() => onclick("V")}>V</div>
				<div className="key" onClick={() => onclick("B")}>B</div>
				<div className="key" onClick={() => onclick("N")}>N</div>
				<div className="key" onClick={() => onclick("M")}>M</div>
				<div id="backspace" onClick={() => onclick("backspace")}>Del</div>
			</div>

		</div>
		</div>
	);
};

export default KeyBoard;