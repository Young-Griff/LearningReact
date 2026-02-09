import { useState, useEffect } from "react";
import "./App.css";

// SVG Icons for Theme Toggle
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sun-fill" viewBox="0 0 16 16">
    <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-moon-fill" viewBox="0 0 16 16">
    <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z" />
  </svg>
);

type SquareProps = {
  value: string;
  onSquareClick: () => void;
  winner: boolean;
};

function Square({ value, onSquareClick, winner }: SquareProps) {
  return (
    <button
      className={`square btn ${winner ? "btn-success" : "btn-outline-primary"}`}
      onClick={onSquareClick}
      style={{ width: '80px', height: '80px', fontSize: '2rem', fontWeight: 'bold' }}
    >
      {value}
    </button>
  );
}

type BoardRowProps = {
  row: number;
  values: string[];
  handleClick: (index: number) => void;
  winSqs: number[];
};

function BoardRow({ row, values, handleClick, winSqs }: BoardRowProps) {
  return (
    <div className="d-flex justify-content-center">
      <Square
        value={values[0]}
        onSquareClick={() => handleClick(row * 3 + 0)}
        winner={winSqs.includes(row * 3 + 0)}
      />
      <Square
        value={values[1]}
        onSquareClick={() => handleClick(row * 3 + 1)}
        winner={winSqs.includes(row * 3 + 1)}
      />
      <Square
        value={values[2]}
        onSquareClick={() => handleClick(row * 3 + 2)}
        winner={winSqs.includes(row * 3 + 2)}
      />
    </div>
  );
}

type BoardProps = {
  player: string;
  squares: string[];
  onPlay: (nextSquares: string[], solved: boolean) => void;
};

function Board({ player, squares, onPlay }: BoardProps) {
  // track squares that constitute a set of 3
  const [winSqs, setWinSqs] = useState<number[]>([-100, -100, -100]);

  function solved(board: string[], update = false) {
    // check rows
    for (let i = 0; i < 9; i += 3) {
      if (
        board[i] != "" &&
        board[i] == board[i + 1] &&
        board[i] == board[i + 2]
      ) {
        if(update) setWinSqs([i, i + 1, i + 2]);
        return true;
      }
    }

    // check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[i] != "" &&
        board[i] == board[i + 3] &&
        board[i] == board[i + 6]
      ) {
        if(update) setWinSqs([i, i + 3, i + 6]);
        return true;
      }
    }

    // check diagonals
    if (board[0] != "" && board[0] == board[4] && board[0] == board[8]) {
      if(update) setWinSqs([0, 4, 8]);
      return true;
    }
    if (board[2] != "" && board[2] == board[4] && board[2] == board[6]) {
      if(update) setWinSqs([2, 4, 6]);
      return true;
    }
    if (!winSqs.includes(-100)) setWinSqs(Array(3).fill(-100));
    return false;
  }

  // store each squares status in the parent
  let title = <span>Next Player: <strong>{player}</strong></span>;
  const isSolved = solved(squares);

  if (isSolved) {
    title = <span className="text-success">Winner: <strong>{player}</strong>!</span>;
  } else if (!squares.includes("")) {
    title = <span className="text-warning">It's a Draw!</span>;
  }

  function handleClick(i: number) {
    if (solved(squares) || squares[i] != "") return;
    const nextSquares = squares.slice();
    nextSquares[i] = player;
    onPlay(nextSquares, solved(nextSquares, true));
  }

  return (
    <div className="text-center">
      <h2 className="mb-4">{title}</h2>
      <div className="board-container mb-3">
        <BoardRow
          row={0}
          values={squares.slice(0, 3)}
          handleClick={handleClick}
          winSqs={winSqs}
        />
        <BoardRow
          row={1}
          values={squares.slice(3, 6)}
          handleClick={handleClick}
          winSqs={winSqs}
        />
        <BoardRow
          row={2}
          values={squares.slice(6, 9)}
          handleClick={handleClick}
          winSqs={winSqs}
        />
      </div>
    </div>
  );
}

type HistoryProps = {
  history: string[][];
  goBack: (move: number) => void;
  currentMove: number;
};

function History({ history, goBack, currentMove }: HistoryProps) {
  return (
    <div className="list-group">
      {history.map((_, move) => {
        const description = move > 0 ? `Go to Move #${move}` : "Restart Game";
        const isActive = move === currentMove;
        return (
          <button
            key={move}
            onClick={() => goBack(move)}
            className={`list-group-item list-group-item-action ${isActive ? "active" : ""}`}
          >
            {move === currentMove ? `You are at move #${move}` : description}
          </button>
        );
      })}
    </div>
  );
}

function Game() {
  const [player, setPlayer] = useState("X");
  const [history, setHistory] = useState<string[][]>([Array(9).fill("")]);
  const [currentMove, setCurrentMove] = useState(0);
  const [theme, setTheme] = useState('light');

  const curBoard = history[currentMove];

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  function onPlay(newBoard: string[], solved: boolean) {
    const nextHistory = [...history.slice(0, currentMove + 1), newBoard];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    if (!solved) {
      if (player == "X") setPlayer("O");
      else setPlayer("X");
    }
  }

  function goBack(move: number) {
    setCurrentMove(move);
    setPlayer(move % 2 === 0 ? "X" : "O");
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-secondary" onClick={toggleTheme}>
          {theme === 'light' ? <MoonIcon /> : <SunIcon />} {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>

      <div className="row justify-content-center align-items-stretch">
        <div className="col-md-6 col-lg-5 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <Board
                player={player}
                squares={curBoard}
                onPlay={onPlay}
              />
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Game History</h5>
            </div>
            {/* Remove fixed max-height to let it fill h-100, but add scroll if needed within a flex container */}
            <div className="card-body p-0 d-flex flex-column" style={{ overflowY: 'auto' }}>
              <div className="flex-grow-1" style={{ minHeight: '0' }}>
                <History history={history} goBack={goBack} currentMove={currentMove} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return <Game />;
}

export default App;
