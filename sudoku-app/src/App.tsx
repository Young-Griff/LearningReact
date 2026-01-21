import { useState } from "react";
import "./App.css";

function App() {
  const [squares, setSquares] = useState(Array(81).fill(0));
  const newSquares = squares.slice();
  console.log("Squares: ", squares);
  newSquares[8 * 9] = 9;
  console.log(newSquares);

  return <div>Hello</div>;
}

export default App;
