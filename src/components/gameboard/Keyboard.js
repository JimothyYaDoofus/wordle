//keyboard
const KeyBoard = () => {
	return (
		
		<div id="keyboard">
		<div className="base">
			<div className="line">
				<div className="key" onClick={() => selectKey("Q")}>Q</div>
				<div className="key" onClick={() => selectKey("W")}>W</div>
				<div className="key" onClick={() => selectKey("E")}>E</div>
				<div className="key" onClick={() => selectKey("R")}>R</div>
				<div className="key" onClick={() => selectKey("T")}>T</div>
				<div className="key" onClick={() => selectKey("Y")}>Y</div>
				<div className="key" onClick={() => selectKey("U")}>U</div>
				<div className="key" onClick={() => selectKey("I")}>I</div>
				<div className="key" onClick={() => selectKey("O")}>O</div>
				<div className="key" onClick={() => selectKey("P")}>P</div>
			</div>
			<div className="line">
				<div className="key" onClick={() => selectKey("A")}>A</div>
				<div className="key" onClick={() => selectKey("S")}>S</div>
				<div className="key" onClick={() => selectKey("D")}>D</div>
				<div className="key" onClick={() => selectKey("F")}>F</div>
				<div className="key" onClick={() => selectKey("G")}>G</div>
				<div className="key" onClick={() => selectKey("H")}>H</div>
				<div className="key" onClick={() => selectKey("J")}>J</div>
				<div className="key" onClick={() => selectKey("K")}>K</div>
				<div className="key" onClick={() => selectKey("L")}>L</div>
			</div>
			<div className="line">
				<div id="enter" onClick={() => selectKey("enter")}>Enter</div>
				<div className="key" onClick={() => selectKey("Z")}>Z</div>
				<div className="key" onClick={() => selectKey("X")}>X</div>
				<div className="key" onClick={() => selectKey("C")}>C</div>
				<div className="key" onClick={() => selectKey("V")}>V</div>
				<div className="key" onClick={() => selectKey("B")}>B</div>
				<div className="key" onClick={() => selectKey("N")}>N</div>
				<div className="key" onClick={() => selectKey("M")}>M</div>
				<div id="backspace" onClick={() => selectKey("backspace")}>&lt;</div>
			</div>

		</div>
		</div>
	);
};

function selectKey(button) {
	console.log(button + " button pressed");
	switch (button) {
		case "enter":
			//getWord();
			break;
		case "backspace":
			// DO BACKSPACE STUFF HERE
			break;
		default:
			// GET ACCESS TO SELECTED BOX // = button;
	}
}

export default KeyBoard;



/*
<div id="keyboard">
    <div class="base">
		<div class="line1">
			<span>Q</span>
			<span>W</span>
			<span>E</span>
			<span>R</span>
			<span>T</span>
			<span>Y</span>
			<span>U</span>
			<span>I</span>
			<span>O</span>
			<span>P</span>
		</div>
		<div class="line2">
			<span>A</span>
			<span>S</span>
			<span>D</span>
			<span>F</span>
			<span>G</span>
			<span>H</span>
			<span>J</span>
			<span>K</span>
			<span>L</span>
		</div>
		<div class="line3">
            <span>Enter</span>
            <span>Z</span>
			<span>X</span>
			<span>C</span>
			<span>V</span>
			<span>B</span>
			<span>N</span>
			<span>M</span>
			<span><svg baseProfile="tiny" id="backspace" version="1.2" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M19.5,5h-10C8.234,5,6.666,5.807,5.93,6.837L3.32,10.49c-0.642,0.898-1.182,1.654-1.199,1.679  C2,12.344,1.999,12.661,2.124,12.833c0.023,0.033,0.555,0.777,1.188,1.664l2.619,3.667C6.666,19.193,8.233,20,9.5,20h10  c1.379,0,2.5-1.122,2.5-2.5v-10C22,6.122,20.879,5,19.5,5z M17.207,14.793c0.391,0.391,0.391,1.023,0,1.414  C17.012,16.402,16.756,16.5,16.5,16.5s-0.512-0.098-0.707-0.293L13.5,13.914l-2.293,2.293C11.012,16.402,10.756,16.5,10.5,16.5  s-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414l2.293-2.293l-2.293-2.293c-0.391-0.391-0.391-1.023,0-1.414  s1.023-0.391,1.414,0l2.293,2.293l2.293-2.293c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414L14.914,12.5L17.207,14.793z"/></svg></span>
		</div>

	</div>
</div>*/