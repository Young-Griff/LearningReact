// this file contains the code for setting up and playing the game
import { useState } from "react";
import Board from "./Board";
import Games from "../assets/boards.json";
import Solver from "./Solver/Solver.tsx";

// create an interface to pass to the board
function Game() {
  // set up components for the board
  const startBoard = Games.trivial;
  const [squares, setSquares] = useState(Games.trivial);
  // return the value of the given index (from current or initial board state)
  function getVal(i: number, start: boolean) {
    if (start == false) return squares[i];
    else return startBoard[i];
  }

  // update the board state given some input and the changed index
  function onSquareChange(i: number, newVal: number) {
    // handle movement
    if (newVal == -1) {
      // TODO: Select cell with id of passed i (index) value
      const newCell = document.getElementById(i);
      newCell.focus()
    }
    // handle deletions or input
    else {
      const newSquares = squares.slice();
      newSquares[i] = newVal;
      console.log("Solved: ", Solver.isSolved(newSquares));
      setSquares(newSquares);
    }
  }

  return <Board getVal={getVal} onSquareChange={onSquareChange} />;
}

export default Game;
