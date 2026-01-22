// this file contains the code for setting up and playing the game
import { useState } from "react";
import Board from "./Board";

// create an interface to pass to the board
function Game() {
    // set up components for the board
    const [squares, setSquares] = useState(Array(81).fill(0));
    const newSquares = squares.slice();
    console.log("Squares: ", squares);

    return <Board square={} onSquareChange={onSquareChange}/>;
}

export default Game;