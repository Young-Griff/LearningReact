// this file contains the code for setting up and playing the game
import { useState } from "react";
import Board from "./Board";
import Games from "../assets/boards.json";

// create an interface to pass to the board
function Game() {
    // set up components for the board
    const startBoard = Games.easyOne;
    const [squares, setSquares] = useState(Games.easyOne);

    function getVal(i, start=false) {
        if (start == false) return squares[i];
        else return startBoard[i];
    }

    function onSquareChange(i, newVal) {
        const newSquares = squares.slice()
        newSquares[i] = newVal;
        setSquares(newSquares);
    }


    return <Board getVal={getVal} onSquareChange={onSquareChange}/>;
}

export default Game;