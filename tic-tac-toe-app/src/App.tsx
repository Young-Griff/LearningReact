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

function Board({ player, squares, onPlay }) {
  // store each squares status in the parent
  let title = player + " Player Go!";
  if (solved(squares)) title = player + " Wins!";

  function handleClick(i) {
    // only allow players to change empty cells when board playable
    if (solved(squares) || squares[i] != "") return;
    const nextSquares = squares.slice();
    if (player == "X") nextSquares[i] = "X";
    else nextSquares[i] = "O";
    onPlay(nextSquares, solved(nextSquares));
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
      <h2>{title}</h2>
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

function History({ history, goBack }) {
  const moves = history.map((board, move) => {
    let description = "Go to Move " + (move + 1);

    return (
      <li key={move}>
        <button onClick={() => goBack(move)}>{description}</button>
      </li>
    );
  });

  return <>{moves}</>;
}

function Game() {
  const [player, setPlayer] = useState("X");
  const [history, setHistory] = useState([Array(9).fill("")]);
  const curBoard = history[history.length - 1];

  function switchPlayer() {
    if (player == "X") setPlayer("O");
    else setPlayer("X");
  }

  function onPlay(newBoard, solved) {
    setHistory([...history, newBoard]);
    if (!solved) {
      if (player == "X") setPlayer("O");
      else setPlayer("X");
    }
  }

  function goBack(move) {
    if (move % 2 == 0) setPlayer("X");
    else setPlayer("O");
    setHistory(history.slice(0, move + 1));
  }

  return (
    <div className="game">
      <div className="board">
        <Board player={player} squares={curBoard} onPlay={onPlay} />
      </div>
      <div className="game-info">
        <ol>
          <History history={history} goBack={goBack} />
        </ol>
      </div>
    </div>
  );
}

function App() {
  return <Game />;
}

export default App;
