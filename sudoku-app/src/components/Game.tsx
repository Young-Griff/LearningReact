// this file contains the code for setting up and playing the game
import { useState } from "react";
import Board from "./Board";
import ToolBar from "./ToolBar";
import Games from "../assets/boards.json";
import Solver from "./Solver/Solver.tsx";

// create an interface to pass to the board
function Game() {
  // set up components for the board
  const startBoard = Games.expertOne;
  const [history, setHistory] = useState([startBoard.slice()]);
  const [squares, setSquares] = useState(startBoard.slice());
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
      newCell.focus();
    }
    // handle deletions or input
    else {
      // track history of the board
      setHistory([...history, squares]);
      // set up new square value
      const newSquares = squares.slice();
      newSquares[i] = newVal;
      console.log("Solved: ", Solver.isSolved(newSquares));
      setSquares(newSquares);
      console.log("Hist: ", history);
    }
  }

  function solveBoard () {
    let generator = new Solver(squares);
    setSquares(generator.solve());
    setHistory([...history, squares]);
    console.log(startBoard);
    console.log(Games.easyOne);
  }


  return (
    <> 
      <div className="tools"> 
        <ToolBar history={history} setHistory={setHistory} setSquares={setSquares} solver={solveBoard}/>
      </div>
      <Board getVal={getVal} onSquareChange={onSquareChange} />
    </>
  );
}

export default Game;
