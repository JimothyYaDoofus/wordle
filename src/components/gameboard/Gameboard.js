import { render } from "@testing-library/react";
import {useState, useSyncExternalStore} from "react";
import { ReactDOM } from "react";
import Row from "./Row";

function drawRows() {

}

// get row of input from user - keep track of current row
function getWord() {
    let currentGuess = document.getElementsByClassName("box")[0].value;
    console.log(currentGuess);

}

const Gameboard = () => {

    // Get input row from user (if 5 letters in row)
    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            console.log("enter key pressed");
            //getWord();
        }
        });



    return (

       <div className="d-flex flex-column text-center align-items-center justify-content-center">
            <Row></Row>
            <Row></Row>
            <Row></Row>
            <Row></Row>
            <Row></Row>
            <Row></Row>
       </div>

    );
    
};

export default Gameboard;


/*

<>
    <div id="container">
        <div id="gameBoard">
            <div className="row">
            <div className="box"><input type="text" maxLength="1"/></div>
            <div className="box"><input type="text" maxLength="1"/></div>
            <div className="box"><input type="text" maxLength="1"/></div>
            <div className="box"><input type="text" maxLength="1"/></div>
            <div className="box"><input type="text" maxLength="1"/></div>
            <div className="box"><input type="text" maxLength="1"/></div>
            </div>

            <div className="row">
            <div className="box"><input type="text" maxLength="1"/></div>
            <div className="box"><input type="text" maxLength="1"/></div>
            <div className="box"><input type="text" maxLength="1"/></div>
            <div className="box"><input type="text" maxLength="1"/></div>
            <div className="box"><input type="text" maxLength="1"/></div>
            <div className="box"><input type="text" maxLength="1"/></div>
            </div>

            <div className="row">
            <div className="box"><input type="text" maxLength="1"/></div>
            <div className="box"><input type="text" maxLength="1"/></div>
            <div className="box"><input type="text" maxLength="1"/></div>
            <div className="box"><input type="text" maxLength="1"/></div>
            <div className="box"><input type="text" maxLength="1"/></div>
            <div className="box"><input type="text" maxLength="1"/></div>
            </div>

            <div className="row">
            <div className="box"><input type="text" maxLength="1"/></div>
            <div className="box"><input type="text" maxLength="1"/></div>
            <div className="box"><input type="text" maxLength="1"/></div>
            <div className="box"><input type="text" maxLength="1"/></div>
            <div className="box"><input type="text" maxLength="1"/></div>
            <div className="box"><input type="text" maxLength="1"/></div>
            </div>

            <div className="row">
            <div className="box"><input type="text" maxLength="1"/></div>
            <div className="box"><input type="text" maxLength="1"/></div>
            <div className="box"><input type="text" maxLength="1"/></div>
            <div className="box"><input type="text" maxLength="1"/></div>
            <div className="box"><input type="text" maxLength="1"/></div>
            <div className="box"><input type="text" maxLength="1"/></div>
            </div>
        </div>
    </div>
    </>



*/