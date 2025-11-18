import { useState } from "react";
import "./App.css";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function BoardRow({ row, values, handleClick }) {
  return (
    <div>
      <Square
        value={values[0]}
        onSquareClick={() => handleClick(row * 3 + 0)}
      />
      <Square
        value={values[1]}
        onSquareClick={() => handleClick(row * 3 + 1)}
      />
      <Square
        value={values[2]}
        onSquareClick={() => handleClick(row * 3 + 2)}
      />
    </div>
  );
}

function Board({ player, switchPlayer }) {
  // store each squares status in the parent
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [prevSquares, setPrev] = useState(Array(9).fill(""));

  let title = player + " Player Go!";
  if (solved(squares)) title = player + " Wins!";

  function handleClick(i) {
    // only allow players to change empty cells
    if (!solved(squares) && squares[i] == "") {
      const nextSquares = squares.slice();
      nextSquares[i] = player;
      setPrev(squares);
      setSquares(nextSquares);
      if (!solved(nextSquares)) switchPlayer();
    }
  }

  // check if a 3x3 tic-tac-toe board is solved
  function solved(board) {
    // check rows
    for (let i = 0; i < 9; i += 3) {
      if (
        board[i] != "" &&
        board[i] == board[i + 1] &&
        board[i] == board[i + 2]
      )
        return true;
    }

    // check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[i] != "" &&
        board[i] == board[i + 3] &&
        board[i] == board[i + 6]
      )
        return true;
    }

    // check diagonals
    if (board[0] != "" && board[0] == board[4] && board[0] == board[8])
      return true;
    if (board[2] != "" && board[2] == board[4] && board[2] == board[6])
      return true;

    return false;
  }

  return (
    <>
      <Title message={title} />
      <BoardRow
        row={0}
        values={squares.slice(0, 3)}
        handleClick={handleClick}
      />
      <BoardRow
        row={1}
        values={squares.slice(3, 6)}
        handleClick={handleClick}
      />
      <BoardRow
        row={2}
        values={squares.slice(6, 9)}
        handleClick={handleClick}
      />
    </>
  );
}

function Title({ message }) {
  return <h2>{message}</h2>;
}

function App() {
  const [player, setPlayer] = useState("X");

  function switchPlayer() {
    if (player == "X") setPlayer("O");
    else setPlayer("X");
  }

  return <Board player={player} switchPlayer={switchPlayer} />;
}

export default App;
