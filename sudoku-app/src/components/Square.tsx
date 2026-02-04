import { useState } from "react";
import "./Sqaure.css";

function Square({ sqNum, getVal, onSquareChange }) {
  let prefilled = "";
  let val = "";
  if (getVal(sqNum, true) != 0) {
    prefilled = "prefilled";
    val = getVal(sqNum, true);
  } else if (getVal(sqNum, false) != 0) {
    val = getVal(sqNum, false);
  }

  function inputHandler(evt) {
    let newVal = getVal(sqNum, false);
    let newSq = sqNum;
    // handle deletes and moves
    if (evt.key == "Backspace" || evt.key == "Delete") newVal = 0;
    else if (evt.key.charAt(0) < 10 && evt.key.charAt(0) > 0) {
      newVal = evt.key.charAt(0) - 0;
    }
    // switch to handle movement
    else {
      switch (evt.key) {
        case "ArrowDown":
          if (sqNum < 72) {
            newSq = sqNum + 9;
            newVal = -1;
            if (getVal(newSq, true) != 0) {
              while (newSq < 81 && getVal(newSq, true) != 0) newSq += 9;
              if (newSq > 80) newSq = sqNum;
            }
          }
          break;
        case "ArrowUp":
          if (sqNum > 8) {
            newSq = sqNum - 9;
            newVal = -1;
            if (getVal(newSq, true) != 0) {
              while (newSq >= 0 && getVal(newSq, true) != 0) newSq -= 9;
              if (newSq < 0) newSq = sqNum;
            }
          }
          break;
        case "ArrowRight":
          if (sqNum % 9 < 8) {
            newSq = sqNum + 1;
            newVal = -1;
            if (getVal(newSq, true) != 0) {
              while (newSq % 9 < 8 && getVal(newSq, true) != 0) newSq += 1;
              if (Math.floor(newSq / 9) != Math.floor(sqNum / 9)) newSq = sqNum;
              if (newSq % 9 == 8 && getVal(newSq, true) != 0) newSq = sqNum;
            }
          }
          break;
        case "ArrowLeft":
          if (sqNum % 9 > 0) {
            newSq = sqNum - 1;
            newVal = -1;
            if (getVal(newSq, true) != 0) {
              while (newSq % 9 > 0 && getVal(newSq, true) != 0) newSq -= 1;
              if (Math.floor(newSq / 9) != Math.floor(sqNum / 9)) newSq = sqNum;
              if (newSq % 9 == 0 && getVal(newSq, true) != 0) newSq = sqNum;
            }
          }
          break;
      }
    }
    console.log("Res: ", newSq, newVal);
    onSquareChange(newSq, newVal);
  }

  let square = <div></div>;
  if (prefilled == "") square = 
    (<input
      id={sqNum}
      className={prefilled}
      autoComplete="off"
      type="text"
      maxLength={1}
      value={val}
      onKeyUp={(evt) => inputHandler(evt)}
    />);
  else square = 
    (<input
      id={sqNum}
      className={prefilled}
      autoComplete="off"
      type="text"
      maxLength={1}
      readOnly
      value={val}
      onKeyUp={(evt) => inputHandler(evt)}
    />);

  return square;
}

export default Square;
