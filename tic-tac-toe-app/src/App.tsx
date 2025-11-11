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

function Board() {
  // store each squares status in the parent
  const [squares, setSquares] = useState(Array(9).fill(''));
  
  function handleClick(i) {
    const nextSquares = squares.slice();
    nextSquares[i] = 'X';
    setSquares(nextSquares);
  }

  return (
    <>
      <BoardRow row={0} values={squares.slice(0,3)} handleClick={handleClick}/>
      <BoardRow row={1} values={squares.slice(3,6)} handleClick={handleClick}/>
      <BoardRow row={2} values={squares.slice(6,9)} handleClick={handleClick}/>
    </>
  );
}

function App() {
  return <Board />;
}

export default App
