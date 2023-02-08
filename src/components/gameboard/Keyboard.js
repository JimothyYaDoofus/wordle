//keyboard
const Keyboard = () => {
	return (
		
		<div id="keyboard">
		<div class="base">
			<div class="line">
				<div class="key" id="Q">Q</div>
				<div class="key" id="W">W</div>
				<div class="key" id="E">E</div>
				<div class="key" id="R">R</div>
				<div class="key" id="T">T</div>
				<div class="key" id="Y">Y</div>
				<div class="key" id="U">U</div>
				<div class="key" id="I">I</div>
				<div class="key" id="O">O</div>
				<div class="key" id="P">P</div>
			</div>
			<div class="line">
				<div class="key" id="A">A</div>
				<div class="key" id="S">S</div>
				<div class="key" id="D">D</div>
				<div class="key" id="F">F</div>
				<div class="key" id="G">G</div>
				<div class="key" id="H">H</div>
				<div class="key" id="J">J</div>
				<div class="key" id="K">K</div>
				<div class="key" id="L">L</div>
			</div>
			<div class="line">
				<div id="enter" >Enter</div>
				<div class="key" id="Z">Z</div>
				<div class="key" id="X">X</div>
				<div class="key" id="C">C</div>
				<div class="key" id="V">V</div>
				<div class="key" id="B">B</div>
				<div class="key" id="N">N</div>
				<div class="key" id="M">M</div>
				<div id="backspace"></div>
			</div>

		</div>
		</div>
	);
};




export default Keyboard;



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