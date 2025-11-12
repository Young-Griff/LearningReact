import { useState } from 'react'
import './App.css'


function Square({ value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      { value }
    </button>
  );
}

function BoardRow({ row, values, handleClick }) {
  return (
    <div>
      <Square value={values[0]} onSquareClick={() => handleClick(row * 3 + 0)}/>
      <Square value={values[1]} onSquareClick={() => handleClick(row * 3 + 1)}/>
      <Square value={values[2]} onSquareClick={() => handleClick(row * 3 + 2)}/>
    </div>
  );
}

function Board({ player, switchPlayer }) {
  // store each squares status in the parent
  const [squares, setSquares] = useState(Array(9).fill(''));
  let alert = null;
  
  function handleClick(i) {
    // only allow players to change empty cells
    if (squares[i] == '') {
      const nextSquares = squares.slice();
      nextSquares[i] = player;
      setSquares(nextSquares);
      if (solved()) console.log("Solved by " + player);
      switchPlayer();
    }
    else alert = null;
  }

  function solved() {

    // check rows
    for (let i = 0; i < 9; i += 3) {
      if (squares[i] != '' && squares[i] == squares[i + 1] 
        && squares[i] == squares[i + 2]) return true;
    }

    // check columns
    for (let i = 0; i < 3; i++) {
      if (squares[i] != '' && squares[i] == squares[i + 3] 
        && squares[i] == squares[i + 6]) return true;
    }

    // check diagonals
    if (squares[0] != '' && squares[0] == squares[4] && squares[0] == squares[8]) return true;
    if (squares[2] != '' && squares[2] == squares[4] && squares[0] == squares[6]) return true;
    
    return false;
  }

  return (
    <>
      { alert }
      <BoardRow row={0} values={squares.slice(0,3)} handleClick={handleClick}/>
      <BoardRow row={1} values={squares.slice(3,6)} handleClick={handleClick}/>
      <BoardRow row={2} values={squares.slice(6,9)} handleClick={handleClick}/>
    </>
  );
}

function App() {

  const [player, setPlayer] = useState('X');

  function switchPlayer() {

    if (player == 'X') setPlayer('O');
    else setPlayer('X');

  }

  return <Board player={player} switchPlayer={switchPlayer}/>;
}

export default App
